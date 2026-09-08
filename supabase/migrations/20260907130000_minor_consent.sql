-- Age-gate + parental-consent recording for under-13 signups.
--
-- Two problems fixed together:
--
-- 1. The self-reported age picked in onboarding never actually reached
--    the server — signUp() never sent it, so every account silently
--    defaulted to age_group = 'adults' regardless of what was chosen.
--    That's fixed here by having the client pass it through signUp()
--    metadata and having this trigger actually read it.
--
-- 2. There was no record of parental consent anywhere. For "kids"
--    (6-10) and "tweens" (11-13) signups — the two brackets COPPA's
--    under-13 rule covers — the client now requires a parent/guardian
--    to be the one entering the account email + password and to check
--    an explicit consent statement before signUp() is ever called (see
--    auth.tsx). This migration adds the columns to record that consent
--    happened and which policy version was shown at the time, so
--    there's an audit trail.
--
-- This is a good-faith technical mechanism, not a legal determination —
-- get an actual lawyer's sign-off on the overall approach before
-- treating this as regulatory compliance.

alter table public.profiles
  add column if not exists is_minor boolean not null default false,
  add column if not exists consent_given_at timestamptz,
  add column if not exists consent_version text;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base_username text;
  candidate text;
  n integer := 0;
  meta_age_group text;
  meta_is_minor boolean;
begin
  base_username := coalesce(
    nullif(regexp_replace(coalesce(new.raw_user_meta_data->>'username',''), '[^A-Za-z0-9._]', '', 'g'), ''),
    'user' || substring(new.id::text, 1, 6)
  );
  base_username := substr(base_username, 1, 18);
  candidate := base_username;
  while exists(select 1 from public.profiles where lower(username::text) = lower(candidate)) loop
    n := n + 1;
    candidate := substr(base_username, 1, 18 - length(n::text)) || n::text;
  end loop;

  -- Validate against the known set rather than trusting client input
  -- outright; fall back to the safest default if anything looks off.
  meta_age_group := coalesce(new.raw_user_meta_data->>'age_group', 'adults');
  if meta_age_group not in ('kids','tweens','teens','adults','pro') then
    meta_age_group := 'adults';
  end if;
  meta_is_minor := coalesce((new.raw_user_meta_data->>'is_minor')::boolean, false);

  insert into public.profiles (id, username, age_group, referral_code, is_minor, consent_given_at, consent_version)
  values (
    new.id,
    candidate,
    meta_age_group,
    upper(substr(replace(new.id::text, '-', ''), 1, 8)),
    meta_is_minor,
    case when meta_is_minor then now() else null end,
    case when meta_is_minor then new.raw_user_meta_data->>'consent_version' else null end
  );
  return new;
end $$;
