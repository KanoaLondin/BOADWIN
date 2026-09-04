ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS persona_used_ai boolean,
  ADD COLUMN IF NOT EXISTS persona_context text,
  ADD COLUMN IF NOT EXISTS persona_goal text,
  ADD COLUMN IF NOT EXISTS persona_key text;

CREATE TABLE IF NOT EXISTS public.lesson_adaptations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id text NOT NULL,
  persona_key text NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (lesson_id, persona_key)
);

GRANT SELECT ON public.lesson_adaptations TO authenticated;
GRANT ALL ON public.lesson_adaptations TO service_role;

ALTER TABLE public.lesson_adaptations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Signed-in learners can read cached lesson wording" ON public.lesson_adaptations;
CREATE POLICY "Signed-in learners can read cached lesson wording"
  ON public.lesson_adaptations FOR SELECT TO authenticated USING (true);