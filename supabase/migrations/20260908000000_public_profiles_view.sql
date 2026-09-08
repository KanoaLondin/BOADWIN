-- Safe, limited-column read access to *other* users' profiles.
--
-- The previous migration (20260907214712) locked `profiles` SELECT down to
-- "your own row only" (`id = auth.uid()`) — the right call, since that
-- table also holds sensitive columns (parent_email, birth_month/year,
-- parental_consent_status, referral_code, etc.) that shouldn't be
-- readable by just anyone signed in. But it also silently breaks anything
-- that needs to look up ANOTHER user's basic info: friend search, the
-- friends list, and a friend's profile page all query `profiles` directly
-- for someone who isn't the caller, and under the new policy those reads
-- now just come back empty (RLS filters rows, it doesn't error) rather
-- than failing loudly.
--
-- This adds a narrow view exposing only the columns that are genuinely
-- fine to show another signed-in user, so that code can go through the
-- view for a look-up-someone-else case while the underlying table stays
-- locked to "own row only" for direct access. Deliberately left off this
-- view: parent_email, birth_month/year, parental_consent_status,
-- referral_code, referred_by, role, premium, state, gems, hearts.
--
-- Not marked security_invoker, on purpose: a plain view runs with the
-- privileges of whoever owns it (the migration-running role), which is
-- how it's able to see rows the querying user's own RLS grant wouldn't
-- otherwise show them — the view's column list is what keeps this narrow,
-- not row-level filtering.
create or replace view public.public_profiles as
select
  id,
  username,
  display_name,
  xp,
  streak,
  weekly_xp,
  al_outfit,
  profile_bg,
  bio,
  is_minor,
  member_since
from public.profiles;

grant select on public.public_profiles to authenticated;
