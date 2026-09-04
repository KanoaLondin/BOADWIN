// AL's curriculum knowledge. Everything here is derived at call time from the
// SAME data that powers the Courses screens (COURSES in course-data.ts), so
// adding a course or editing a lesson updates AL automatically — there is no
// static snapshot to go stale.
import { COURSES, findLesson, type Exercise, type Lesson } from "./course-data";

/** Compact outline of every course → level → unit → lesson title. */
export function courseCatalogOutline(): string {
  const lines: string[] = [];
  for (const course of COURSES) {
    lines.push(
      `COURSE: ${course.title} — ${course.subtitle}` +
        (course.levelLabel ? ` (${course.levelLabel})` : ""),
    );
    for (const level of course.levels) {
      lines.push(`  LEVEL ${level.title} [${level.tier}]`);
      for (const unit of level.units) {
        lines.push(`    UNIT ${unit.id} ${unit.title} — ${unit.description}`);
        lines.push(
          `      lessons: ${unit.lessons.map((l) => `${l.id} "${l.title}"`).join("; ")}`,
        );
      }
    }
  }
  return lines.join("\n");
}

function exerciseSummary(ex: Exercise, i: number): string {
  switch (ex.type) {
    case "multiple-choice":
      return `${i + 1}. [multiple choice] ${ex.question} → correct: ${ex.options[ex.correctIndex]}`;
    case "fill-blank":
      return `${i + 1}. [fill in the blank] ${ex.prompt} → answer: ${ex.answer}`;
    case "true-false":
      return `${i + 1}. [true/false] ${ex.statement} → ${ex.answer ? "True" : "False"}${
        ex.explanation ? ` (${ex.explanation})` : ""
      }`;
    case "drag-drop":
      return `${i + 1}. [ordering] ${ex.instruction} → ${ex.words.join(" ")}`;
    case "matching":
      return `${i + 1}. [matching] ${ex.pairs
        .map((p) => `${p.term} = ${p.definition}`)
        .join("; ")}`;
    case "short-answer":
      return `${i + 1}. [short answer] ${ex.question}`;
  }
}

/** Full teaching text of one lesson, for deep answers about what's on screen. */
export function lessonDetail(lesson: Lesson): string {
  return [
    `LESSON ${lesson.id}: ${lesson.title}`,
    lesson.content ? `Teaching text: ${lesson.content}` : "",
    (lesson.exercises ?? []).length
      ? ["Exercises in this lesson:", ...(lesson.exercises ?? []).map(exerciseSummary)].join("\n")
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * The knowledge block injected into AL's system prompt: the whole catalogue
 * outline plus the full text of the lesson the learner is on (and its unit
 * siblings), so AL answers from our actual coursework.
 */
export function curriculumContext(lessonId?: string | null): string {
  const parts: string[] = [
    "AIED CURRICULUM (live, generated from the app's own course data):",
    courseCatalogOutline(),
  ];

  const found = lessonId ? findLesson(lessonId) : null;
  if (found) {
    parts.push(
      "",
      `FULL CONTENT OF THE LEARNER'S CURRENT UNIT (${found.unit.title}):`,
      found.unit.lessons.map(lessonDetail).join("\n\n"),
    );
  }

  parts.push(
    "",
    "Use this curriculum as your source of truth. When a question matches something we teach,",
    "answer in the terms this course uses and name the lesson/unit it comes from. Never reveal the",
    "correct answer to an exercise the learner is currently working on — guide them instead.",
  );
  return parts.join("\n");
}
