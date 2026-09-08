/**
 * Additive analytics tracking.
 *
 * Writes one row per real lesson completion and one row per real quiz
 * submission. This is purely for future analytics — it never affects the
 * UI, gameplay state, or the profile-based completed-lesson-ID list, and
 * every call is fire-and-forget so a failure can never block a learner.
 *
 * RLS scopes both tables to the signed-in user's own rows.
 */
import { supabase } from "@/integrations/supabase/client";
import { courseForUnit, findLesson } from "@/lib/course-data";

const PASS_THRESHOLD = 70;

async function currentUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

function courseIdForLesson(lessonId: string): string | null {
  const found = findLesson(lessonId);
  if (!found) return null;
  return courseForUnit(found.unit.id)?.id ?? null;
}

/** True when this lesson is a review quiz rather than a teaching lesson. */
export function lessonIsQuiz(lessonId: string): boolean {
  return findLesson(lessonId)?.lesson.isQuiz === true;
}

/** Record that the signed-in learner finished a lesson. */
export async function recordLessonCompletion(lessonId: string): Promise<void> {
  try {
    const userId = await currentUserId();
    const courseId = courseIdForLesson(lessonId);
    if (!userId || !courseId) return;
    const { error } = await supabase.from("lesson_completions").insert({
      user_id: userId,
      lesson_id: lessonId,
      course_id: courseId,
      completed_at: new Date().toISOString(),
    });
    if (error) console.error("[tracking] lesson completion not recorded", error.message);
  } catch (err) {
    console.error("[tracking] lesson completion failed", err);
  }
}

/**
 * Record a quiz submission with its score (0-100), pass/fail, and which
 * attempt this was for that learner and quiz.
 */
export async function recordQuizAttempt(args: {
  quizId: string;
  correct: number;
  total: number;
}): Promise<void> {
  try {
    const userId = await currentUserId();
    const courseId = courseIdForLesson(args.quizId);
    if (!userId || !courseId) return;

    const score =
      args.total > 0 ? Math.round((Math.max(0, args.correct) / args.total) * 100) : 0;

    const { count } = await supabase
      .from("quiz_attempts")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("quiz_id", args.quizId);

    const { error } = await supabase.from("quiz_attempts").insert({
      user_id: userId,
      quiz_id: args.quizId,
      course_id: courseId,
      score,
      passed: score >= PASS_THRESHOLD,
      attempt_number: (count ?? 0) + 1,
      attempted_at: new Date().toISOString(),
    });
    if (error) console.error("[tracking] quiz attempt not recorded", error.message);
  } catch (err) {
    console.error("[tracking] quiz attempt failed", err);
  }
}
