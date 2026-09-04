// Learner personas. Age band + (for teens/adults only) a short questionnaire
// become a persona that drives how every lesson is worded.
//
// DATA MINIMISATION: children (under-13 / the "kid" cohort band) are never
// asked the business or goal questions. Their persona is derived from age
// alone, which keeps the COPPA posture we built for child accounts intact.
import type { CohortAgeGroup } from "./cohort";

export type PersonaContext = "student" | "employee" | "business_owner" | "other";
export type PersonaGoal = "personal" | "work" | "marketing" | "building";

export type PersonaAnswers = {
  usedAi: boolean | null;
  context: PersonaContext | null;
  goal: PersonaGoal | null;
};

export type Persona = {
  key: string;
  ageGroup: CohortAgeGroup;
  answers: PersonaAnswers;
  /** Human-readable persona name, e.g. "business owner exploring AI for marketing". */
  label: string;
  /** Rewriting brief handed to the AI gateway. */
  styleBrief: string;
};

export const PERSONA_QUESTIONS = {
  usedAi: {
    prompt: "Have you used an AI tool like ChatGPT, Claude or Gemini before?",
    options: [
      { value: true, label: "Yes, I've used one" },
      { value: false, label: "No, this is new to me" },
    ],
  },
  context: {
    prompt: "Which best describes you right now?",
    options: [
      { value: "student" as const, label: "Student" },
      { value: "employee" as const, label: "I work for a company" },
      { value: "business_owner" as const, label: "I run my own business" },
      { value: "other" as const, label: "Something else" },
    ],
  },
  goal: {
    prompt: "What's your main goal here?",
    options: [
      { value: "personal" as const, label: "Personal learning & curiosity" },
      { value: "work" as const, label: "Use AI at work" },
      { value: "marketing" as const, label: "Marketing & growing a business" },
      { value: "building" as const, label: "Building something with AI" },
    ],
  },
};

/** Children skip the questionnaire entirely. */
export function asksQuestionnaire(ageGroup: CohortAgeGroup): boolean {
  return ageGroup !== "kid";
}

const CONTEXT_KEY: Record<PersonaContext, string> = {
  student: "stu",
  employee: "emp",
  business_owner: "biz",
  other: "oth",
};

export function personaKey(ageGroup: CohortAgeGroup, a: PersonaAnswers): string {
  if (ageGroup === "kid") return "kid";
  return [
    ageGroup,
    a.usedAi == null ? "u?" : a.usedAi ? "u1" : "u0",
    a.context ? CONTEXT_KEY[a.context] : "c?",
    a.goal ? a.goal.slice(0, 4) : "g?",
  ].join("-");
}

function label(ageGroup: CohortAgeGroup, a: PersonaAnswers): string {
  if (ageGroup === "kid") return "young curious kid";
  if (a.context === "business_owner" && a.goal === "marketing")
    return "business owner exploring AI for marketing";
  if (a.context === "business_owner") return "business owner adopting AI";
  if (a.goal === "marketing") return "marketer using AI for growth";
  if (a.goal === "building") return "builder shipping something with AI";
  if (a.context === "employee" || a.goal === "work") return "professional upskilling at work";
  if (a.context === "student") return ageGroup === "teen" ? "teen student" : "student learner";
  return a.usedAi ? "general learner with some AI experience" : "curious beginner";
}

function styleBrief(ageGroup: CohortAgeGroup, a: PersonaAnswers): string {
  const lines: string[] = [];
  if (ageGroup === "kid") {
    lines.push(
      "Write for an 8–12 year old: short sentences, everyday words, playful and friendly.",
      "Use safe, cheerful examples (pets, school projects, games, drawing, space).",
      "Never use workplace, money, marketing or scary examples. No jargon without a plain-word explanation.",
    );
    return lines.join(" ");
  }
  if (ageGroup === "teen") {
    lines.push(
      "Write for a 13–17 year old: casual but respectful, concrete examples from school, sports, gaming, social media and side projects.",
    );
  } else {
    lines.push("Write for an adult learner: clear, efficient, professional tone, no talking down.");
  }
  if (a.usedAi === false)
    lines.push("They have never used an AI tool, so define each term the first time it appears.");
  else if (a.usedAi)
    lines.push("They already use AI tools, so skip the absolute basics and get to the point.");

  if (a.context === "business_owner")
    lines.push(
      "They run their own business — frame examples around their own company: customers, offers, operations, staff time.",
    );
  else if (a.context === "employee")
    lines.push("They work for a company — frame examples around workplace tasks and team workflows.");
  else if (a.context === "student")
    lines.push("They're a student — frame examples around study, research and coursework.");

  if (a.goal === "marketing")
    lines.push(
      "Their goal is marketing and growth — use campaign, content, ads, email and customer-audience examples.",
    );
  else if (a.goal === "building")
    lines.push("Their goal is building — use product, prototype and shipping examples.");
  else if (a.goal === "work")
    lines.push("Their goal is using AI at work — use practical on-the-job examples.");
  else if (a.goal === "personal")
    lines.push("Their goal is personal curiosity — use everyday-life examples.");

  return lines.join(" ");
}

export function buildPersona(
  ageGroup: CohortAgeGroup | null | undefined,
  answers?: Partial<PersonaAnswers> | null,
): Persona {
  const age: CohortAgeGroup = ageGroup ?? "adult";
  const a: PersonaAnswers =
    age === "kid"
      ? { usedAi: null, context: null, goal: null }
      : {
          usedAi: answers?.usedAi ?? null,
          context: answers?.context ?? null,
          goal: answers?.goal ?? null,
        };
  return {
    key: personaKey(age, a),
    ageGroup: age,
    answers: a,
    label: label(age, a),
    styleBrief: styleBrief(age, a),
  };
}
