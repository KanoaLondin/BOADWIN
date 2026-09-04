// Persona-adapted lesson wording.
//
// Only *wording* slots are rewritten. Everything that decides correctness —
// multiple-choice option order and correctIndex, fill-blank answers, ordering
// word lists, matching pairs, true/false booleans — is carried over untouched,
// so answer checking always runs against the exact text shown to the learner.
import type { Exercise, Lesson } from "./course-data";

export type Slot = { id: string; text: string; note?: string };

/** Text the AI is allowed to reword, addressed by a stable id. */
export function extractSlots(lesson: Lesson): Slot[] {
  const slots: Slot[] = [];
  if (lesson.content) slots.push({ id: "content", text: lesson.content, note: "lesson explanation" });
  (lesson.exercises ?? []).forEach((ex, i) => {
    switch (ex.type) {
      case "multiple-choice":
        slots.push({ id: `e${i}.q`, text: ex.question, note: "quiz question" });
        ex.options.forEach((o, oi) =>
          slots.push({
            id: `e${i}.o${oi}`,
            text: o,
            note: "answer option — keep the same meaning, right stays right and wrong stays wrong",
          }),
        );
        break;
      case "fill-blank":
        slots.push({
          id: `e${i}.p`,
          text: ex.prompt,
          note: `fill-in-the-blank sentence — MUST keep a blank written as ______ and the missing word must still be "${ex.answer}"`,
        });
        break;
      case "true-false":
        slots.push({
          id: `e${i}.s`,
          text: ex.statement,
          note: `true/false statement — it must remain ${ex.answer ? "TRUE" : "FALSE"}`,
        });
        if (ex.explanation)
          slots.push({ id: `e${i}.x`, text: ex.explanation, note: "explanation" });
        break;
      case "drag-drop":
        slots.push({ id: `e${i}.i`, text: ex.instruction, note: "instruction only" });
        break;
      case "matching":
        slots.push({ id: `e${i}.i`, text: ex.instruction, note: "instruction only" });
        break;
      case "short-answer":
        slots.push({ id: `e${i}.q`, text: ex.question, note: "open question" });
        break;
    }
  });
  return slots;
}

function clean(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
}

/** Rebuild a lesson from rewritten slots, falling back per-slot when invalid. */
export function applySlots(lesson: Lesson, raw: Record<string, unknown>): Lesson {
  const pick = (id: string, original: string) => clean(raw[id]) ?? original;

  const exercises = (lesson.exercises ?? []).map((ex, i): Exercise => {
    switch (ex.type) {
      case "multiple-choice":
        return {
          ...ex,
          question: pick(`e${i}.q`, ex.question),
          options: ex.options.map((o, oi) => pick(`e${i}.o${oi}`, o)),
        };
      case "fill-blank": {
        const next = pick(`e${i}.p`, ex.prompt);
        // A reworded sentence without a blank would break the exercise.
        const ok = /_{2,}/.test(next);
        return { ...ex, prompt: ok ? next : ex.prompt };
      }
      case "true-false":
        return {
          ...ex,
          statement: pick(`e${i}.s`, ex.statement),
          explanation: ex.explanation ? pick(`e${i}.x`, ex.explanation) : ex.explanation,
        };
      case "drag-drop":
      case "matching":
        return { ...ex, instruction: pick(`e${i}.i`, ex.instruction) };
      case "short-answer":
        return { ...ex, question: pick(`e${i}.q`, ex.question) };
    }
  });

  return {
    ...lesson,
    content: lesson.content ? pick("content", lesson.content) : lesson.content,
    exercises: lesson.exercises ? exercises : undefined,
  };
}
