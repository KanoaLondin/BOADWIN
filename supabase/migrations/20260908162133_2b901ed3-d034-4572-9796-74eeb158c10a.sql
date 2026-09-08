CREATE TABLE public.lesson_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id text NOT NULL,
  course_id text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX lesson_completions_user_idx ON public.lesson_completions (user_id, completed_at DESC);
CREATE INDEX lesson_completions_course_idx ON public.lesson_completions (course_id, lesson_id);

GRANT SELECT, INSERT ON public.lesson_completions TO authenticated;
GRANT ALL ON public.lesson_completions TO service_role;

ALTER TABLE public.lesson_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY lesson_completions_select_own ON public.lesson_completions
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY lesson_completions_insert_own ON public.lesson_completions
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE TABLE public.quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  quiz_id text NOT NULL,
  course_id text NOT NULL,
  score integer NOT NULL,
  passed boolean NOT NULL,
  attempt_number integer NOT NULL DEFAULT 1,
  attempted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX quiz_attempts_user_idx ON public.quiz_attempts (user_id, attempted_at DESC);
CREATE INDEX quiz_attempts_quiz_idx ON public.quiz_attempts (course_id, quiz_id);

GRANT SELECT, INSERT ON public.quiz_attempts TO authenticated;
GRANT ALL ON public.quiz_attempts TO service_role;

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY quiz_attempts_select_own ON public.quiz_attempts
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY quiz_attempts_insert_own ON public.quiz_attempts
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());