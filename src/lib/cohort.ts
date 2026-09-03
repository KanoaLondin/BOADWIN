// Cohort model: a one-time onboarding signal (age band + prior AI knowledge)
// used to personalize the recommended starting unit and AL's tone.
import type { AppState } from "./app-state";

export type CohortAgeGroup = "kid" | "teen" | "adult";
export type KnowledgeLevel = "new" | "some" | "experienced";

export type Cohort = {
  ageGroup: CohortAgeGroup;
  knowledgeLevel: KnowledgeLevel;
};

/** The four tappable age bands shown in onboarding. */
export const AGE_BANDS: { id: string; label: string; emoji: string; group: CohortAgeGroup }[] = [
  { id: "8-12", label: "8–12", emoji: "🧒", group: "kid" },
  { id: "13-17", label: "13–17", emoji: "🎒", group: "teen" },
  { id: "18-24", label: "18–24", emoji: "🎓", group: "adult" },
  { id: "25+", label: "25+", emoji: "💼", group: "adult" },
];

export type KnowledgeQuestion = {
  id: string;
  prompt: string;
  options: string[];
};

/**
 * The quick knowledge check. Answers are NEVER graded on the client — the
 * correct-answer key lives server-side in cohort.server.ts.
 */
export const KNOWLEDGE_QUESTIONS: KnowledgeQuestion[] = [
  {
    id: "q1",
    prompt: "Have you used an AI chatbot like ChatGPT or Claude before?",
    options: ["Never", "A little", "Regularly"],
  },
  {
    id: "q2",
    prompt: "What is a “prompt” when talking to an AI?",
    options: [
      "The message or instructions you give the AI",
      "The name of the company that made the AI",
      "A pop-up reminder the app shows you",
      "The speed the AI types at",
    ],
  },
  {
    id: "q3",
    prompt: "If you give an AI a couple of examples before asking your real question, what's that called?",
    options: [
      "Few-shot prompting",
      "Firewalling",
      "Overclocking",
      "Cold booting",
    ],
  },
  {
    id: "q4",
    prompt: "True or False: AI chatbots can sometimes sound confident while being completely wrong.",
    options: ["True", "False"],
  },
  {
    id: "q5",
    prompt: "Which of these actually helps an AI solve a tricky math problem more accurately?",
    options: [
      "Asking it to explain its reasoning step by step",
      "Typing the question in ALL CAPS",
      "Asking the same question five times in a row",
      "Adding lots of exclamation marks",
    ],
  },
];

/** Recommended starting unit for each knowledge level. */
export const RECOMMENDED_UNIT: Record<KnowledgeLevel, string> = {
  new: "u1",
  some: "u3",
  experienced: "u5",
};

/** Free-tier fallback so the recommendation is always actually reachable. */
export const RECOMMENDED_UNIT_FREE: Record<KnowledgeLevel, string> = {
  new: "u1",
  some: "u3",
  experienced: "u4",
};

export function recommendedUnitId(
  knowledgeLevel: KnowledgeLevel | null | undefined,
  hasPremium: boolean,
): string {
  const level = knowledgeLevel ?? "new";
  return hasPremium ? RECOMMENDED_UNIT[level] : RECOMMENDED_UNIT_FREE[level];
}

/** Maps the cohort age band onto the app's existing age-group setting. */
export function appAgeGroupFor(group: CohortAgeGroup): AppState["ageGroup"] {
  if (group === "kid") return "kids";
  if (group === "teen") return "teens";
  return "adults";
}

export function isKidCohort(group: CohortAgeGroup | null | undefined): boolean {
  return group === "kid";
}
