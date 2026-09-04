-- 1. Profile columns for date of birth + parental consent
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS birth_month integer,
  ADD COLUMN IF NOT EXISTS birth_year integer,
  ADD COLUMN IF NOT EXISTS is_child boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_minor boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS parent_email text,
  ADD COLUMN IF NOT EXISTS parental_consent_status text NOT NULL DEFAULT 'not_required',
  ADD COLUMN IF NOT EXISTS parental_consent_at timestamptz;

-- 2. Age helper
CREATE OR REPLACE FUNCTION public.age_from_birth(bm integer, byr integer)
RETURNS integer
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE
    WHEN byr IS NULL OR bm IS NULL OR bm < 1 OR bm > 12 THEN NULL
    ELSE date_part('year', age(make_date(byr, bm, 1)))::int
  END
$$;

-- 3. Consent notices
CREATE TABLE IF NOT EXISTS public.parent_consent_notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  parent_email text NOT NULL,
  token text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'queued',
  delivery_error text,
  sent_at timestamptz,
  consented_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS parent_consent_notices_child_idx
  ON public.parent_consent_notices (child_id);

-- The child may see that a notice exists, but never the approval token.
GRANT SELECT (id, child_id, parent_email, status, delivery_error, sent_at, consented_at, created_at, updated_at)
  ON public.parent_consent_notices TO authenticated;
GRANT ALL ON public.parent_consent_notices TO service_role;

ALTER TABLE public.parent_consent_notices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "consent_notices_select_own"
  ON public.parent_consent_notices FOR SELECT TO authenticated
  USING (child_id = auth.uid());

CREATE TRIGGER parent_consent_notices_set_updated_at
  BEFORE UPDATE ON public.parent_consent_notices
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- 4. New signups: derive child status + consent state from the DOB metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
    is_child, is_minor, parent_email, parental_consent_status
  )
  values (
    new.id, candidate, grp, bm, byr,
    child, minor, p_email, consent
  );
  return new;
end $function$;

-- 5. Lock privileged + child-safety columns against client edits
CREATE OR REPLACE FUNCTION public.profiles_protect_privileged()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
begin
  if auth.uid() is not null then
    new.role := old.role;
    new.premium := old.premium;
    new.birth_month := old.birth_month;
    new.birth_year := old.birth_year;
    new.is_child := old.is_child;
    new.is_minor := old.is_minor;
    new.parent_email := old.parent_email;
    new.parental_consent_status := old.parental_consent_status;
    new.parental_consent_at := old.parental_consent_at;

    -- A child account can never re-label itself as teen/adult/professional.
    if old.is_child then
      if new.age_group is distinct from old.age_group
         and new.age_group not in ('kids','tweens') then
        new.age_group := old.age_group;
      end if;
      new.cohort_age_group := 'kid';
    end if;
  end if;
  return new;
end $function$;