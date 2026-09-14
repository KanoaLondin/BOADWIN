ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS reading_level text NOT NULL DEFAULT 'pro';

ALTER TABLE public.lesson_adaptations ADD COLUMN IF NOT EXISTS reading_level text NOT NULL DEFAULT 'pro';

DO $$
DECLARE c text;
BEGIN
  SELECT conname INTO c FROM pg_constraint
  WHERE conrelid = 'public.lesson_adaptations'::regclass AND contype = 'u';
  IF c IS NOT NULL THEN
    EXECUTE format('ALTER TABLE public.lesson_adaptations DROP CONSTRAINT %I', c);
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS lesson_adaptations_key_uidx
  ON public.lesson_adaptations (lesson_id, persona_key, reading_level);