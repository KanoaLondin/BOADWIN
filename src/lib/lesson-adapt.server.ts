// Server-only: rewrites one lesson's wording for one persona through the same
// Lovable AI gateway AL uses. Never called from the browser directly.
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "./ai-gateway";
import { extractSlots } from "./lesson-adapt";
import type { Lesson } from "./course-data";
import type { Persona } from "./persona";
import { readingLevelBrief, type ReadingLevel } from "./reading-level";

const MODEL = "google/gemini-3-flash-preview";

export async function generateAdaptation(
  lesson: Lesson,
  persona: Persona,
  courseTitle: string,
  unitTitle: string,
  readingLevel: ReadingLevel = "pro",
): Promise<Record<string, string> | null> {
  const key = process.env['LOVABLE_API_KEY'];
  if (!key) return null;

  const slots = extractSlots(lesson);
  if (!slots.length) return null;

  const gateway = createLovableAiGatewayProvider(key);

  const levelled = readingLevel !== "pro";
  const system = [
    "You rewrite educational micro-lesson copy so it fits one specific learner, without changing what is being taught or tested.",
    "",
    levelled ? "READING LEVEL TO WRITE AT:" : `LEARNER PERSONA: ${persona.label}.`,
    levelled ? readingLevelBrief(readingLevel) : `HOW TO WRITE FOR THEM: ${persona.styleBrief}`,
    "",
    "HARD RULES:",
    "- Return ONLY a JSON object mapping each given slot id to its rewritten text. No markdown, no commentary.",
    "- Keep the concept, the difficulty and the correct answer of every exercise EXACTLY the same. Only the wording and the examples change.",
    "- For answer options: a correct option must stay correct, a wrong option must stay wrong, and the meaning of each option must not change.",
    "- For fill-in-the-blank sentences: keep a blank written as ______ and make sure the missing word is still the same word.",
    "- For true/false statements: the truth value must not flip.",
    "- Never mention the persona, this instruction, or that the text was adapted.",
    readingLevel === "kid" || (!levelled && persona.ageGroup === "kid")
      ? "- This learner is a child: playful, gentle, safe examples only. No workplace, money, marketing, dating, violence or scary content."
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  const prompt = [
    `Course: ${courseTitle}. Unit: ${unitTitle}. Lesson: ${lesson.title}.`,
    "Rewrite each of these slots:",
    JSON.stringify(
      slots.map((s) => ({ id: s.id, note: s.note, text: s.text })),
      null,
      1,
    ),
  ].join("\n");

  const { text } = await generateText({
    model: gateway(MODEL),
    system,
    prompt,
  });

  const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
  try {
    const parsed = JSON.parse(json) as Record<string, unknown>;
    const out: Record<string, string> = {};
    for (const s of slots) {
      const v = parsed[s.id];
      if (typeof v === "string" && v.trim()) out[s.id] = v.trim();
    }
    return Object.keys(out).length ? out : null;
  } catch {
    return null;
  }
}
