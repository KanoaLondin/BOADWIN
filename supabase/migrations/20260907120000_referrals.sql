-- Referral program.
--
-- Every account gets a short, shareable referral_code (derived from its
-- uuid, so no collision-retry loop is needed). Redeeming someone else's
-- code — via redeem_referral(), called once automatically right after a
-- referred user's first sign-in — links the two accounts and grants gems
-- to both, mirroring the double-sided referral incentive used by
-- Dropbox/Robinhood-style growth loops.

alter table public.profiles
  add column if not exists referral_code text,
  add column if not exists referred_by uuid references public.profiles(id);

-- Backfill codes for any rows that predate this migration.
update public.profiles
set referral_code = upper(substr(replace(id::text, '-', ''), 1, 8))
where referral_code is null;

alter table public.profiles
  alter column referral_code set not null;

create unique index if not exists profiles_referral_code_idx on public.profiles (referral_code);

-- Generate a referral code for every new account (extends the existing
-- signup trigger function rather than adding a second trigger).
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

  insert into public.profiles (id, username, age_group, referral_code)
  values (
    new.id,
    candidate,
    coalesce(new.raw_user_meta_data->>'age_group', 'adults'),
    upper(substr(replace(new.id::text, '-', ''), 1, 8))
  );
  return new;
end $$;

-- Redeem another user's referral code. Security definer because it needs
-- to credit gems onto the referrer's row too, which the caller's own
-- "profiles_update_own" RLS policy would not otherwise allow. Guarded so
-- it can only ever run once per account (referred_by starts null and is
-- never cleared) and can't be used to farm gems against yourself.
create or replace function public.redeem_referral(code text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  referrer_id uuid;
  caller_id uuid := auth.uid();
  already_referred uuid;
  reward integer := 50;
begin
  if caller_id is null then
    return false;
  end if;

  select id into referrer_id from public.profiles where referral_code = upper(trim(code));
  if referrer_id is null or referrer_id = caller_id then
    return false;
  end if;

  select referred_by into already_referred from public.profiles where id = caller_id;
  if already_referred is not null then
    return false;
  end if;

  update public.profiles set referred_by = referrer_id, gems = gems + reward where id = caller_id;
  update public.profiles set gems = gems + reward where id = referrer_id;
  return true;
end;
$$;

revoke execute on function public.redeem_referral(text) from public, anon;
grant execute on function public.redeem_referral(text) to authenticated;
