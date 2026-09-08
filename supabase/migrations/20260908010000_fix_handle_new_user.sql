-- Restore the correct new-signup trigger — this is urgent, not routine.
--
-- Two migrations run directly through the Cloud SQL editor earlier in this
-- project's history (20260907120000_referrals.sql, then
-- 20260907130000_minor_consent.sql) each did
-- `create or replace function public.handle_new_user()`. The second one
-- silently overwrote a more complete trigger this project already had
-- (20260904171003_efc4f399-...sql) — the one that derives
-- is_child / is_minor / parental_consent_status from birth_month/birth_year
-- and records parent_email.
--
-- Since then, the LIVE trigger has been reading `age_group` (which the
-- client does send, so that part looked fine) and an `is_minor` boolean
-- flag that current app code (src/lib/auth.ts's signUp()) never actually
-- sends — it sends birth_month/birth_year/parent_email instead. The result:
-- every signup since that second migration ran has gotten
-- is_child = false, is_minor = false, parental_consent_status =
-- 'not_required', and no birth_month/birth_year/parent_email stored at
-- all — regardless of the person's real age. A child signing up during
-- that window would NOT have been flagged for parental consent. That's a
-- child-safety regression I introduced, not a cosmetic bug, and it's been
-- live since it ran.
--
-- This restores the birth-month-based classification from 20260904171003
-- verbatim, and adds only one thing on top: generating a referral_code,
-- since 20260907120000_referrals.sql separately added a NOT NULL
-- constraint on that column that the original birth-month trigger never
-- knew about — without this, new signups would fail outright.
--
-- This does NOT retroactively fix rows created while the broken trigger
-- was live. Check `public.profiles` for rows with birth_month and
-- birth_year both null (and created_at after this trigger was overwritten)
-- — those signups never got a real age classification and should be
-- treated as unverified, not assumed to be adults.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  base_username text;
  candidate text;
  n integer := 0;
  bm integer;
  byr integer;
  yrs integer;
  child boolean := false;
  minor boolean := false;
  p_email text;
  consent text := 'not_required';
  grp text;
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

  bm := nullif(new.raw_user_meta_data->>'birth_month','')::int;
  byr := nullif(new.raw_user_meta_data->>'birth_year','')::int;
  yrs := public.age_from_birth(bm, byr);
  p_email := lower(nullif(trim(new.raw_user_meta_data->>'parent_email'), ''));

  if yrs is not null then
    child := yrs < 13;
    minor := yrs < 18;
  end if;

  if child then
    consent := 'pending';
    grp := case when yrs < 11 then 'kids' else 'tweens' end;
  elsif minor then
    grp := 'teens';
  else
    grp := coalesce(new.raw_user_meta_data->>'age_group', 'adults');
  end if;

  insert into public.profiles (
    id, username, age_group, birth_month, birth_year,
    is_child, is_minor, parent_email, parental_consent_status, referral_code
  )
  values (
    new.id, candidate, grp, bm, byr,
    child, minor, p_email, consent,
    upper(substr(replace(new.id::text, '-', ''), 1, 8))
  );
  return new;
end $function$;
