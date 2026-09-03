ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS cohort_age_group text,
  ADD COLUMN IF NOT EXISTS knowledge_level text;

-- Backfill existing accounts with a sensible default cohort so they are never
-- re-prompted for onboarding retroactively.
UPDATE public.profiles
SET cohort_age_group = COALESCE(cohort_age_group, 'adult'),
    knowledge_level = COALESCE(knowledge_level, 'some')
WHERE cohort_age_group IS NULL OR knowledge_level IS NULL;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_cohort_age_group_chk
  CHECK (cohort_age_group IS NULL OR cohort_age_group IN ('kid','teen','adult'));

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_knowledge_level_chk
  CHECK (knowledge_level IS NULL OR knowledge_level IN ('new','some','experienced'));