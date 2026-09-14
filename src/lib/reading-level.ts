// Reading-level tiers, based on the Lexile Framework.
//
// "pro" is the baseline: the lesson text exactly as authored. "kid" and "teen"
// are AI-reworded versions of the same lesson — same facts, same topic, same
// correct answers, only the vocabulary and sentence complexity change.
export type ReadingLevel = "kid" | "teen" | "pro";

export const READING_LEVELS: ReadingLevel[] = ["kid", "teen", "pro"];

export type ReadingLevelMeta = {
  level: ReadingLevel;
  label: string;
  emoji: string;
  blurb: string;
};

export const READING_LEVEL_META: Record<ReadingLevel, ReadingLevelMeta> = {
  kid: {
    level: "kid",
    label: "Kid",
    emoji: "🌱",
    blurb: "Ages 8–10. Short sentences and everyday words.",
  },
  teen: {
    level: "teen",
    label: "Teen / General",
    emoji: "📗",
    blurb: "Plain general-audience writing, terms briefly explained.",
  },
  pro: {
    level: "pro",
    label: "Professional",
    emoji: "🎓",
    blurb: "The full original wording, with all technical terms.",
  },
};

export const DEFAULT_READING_LEVEL: ReadingLevel = "pro";

/**
 * Picking an age group in Settings also picks the matching reading level, so the
 * age buttons and the reading-level cards can never disagree.
 */
export const READING_LEVEL_BY_AGE_GROUP: Record<
  "kids" | "tweens" | "teens" | "adults" | "pro",
  ReadingLevel
> = {
  kids: "kid",
  tweens: "kid",
  teens: "teen",
  adults: "teen",
  pro: "pro",
};

export function isReadingLevel(v: unknown): v is ReadingLevel {
  return v === "kid" || v === "teen" || v === "pro";
}

export function toReadingLevel(v: unknown): ReadingLevel {
  return isReadingLevel(v) ? v : DEFAULT_READING_LEVEL;
}

/**
 * Cached reworded lessons for a reading level are shared by everyone on that
 * level, so they are stored under one fixed persona key rather than per-person.
 */
export const READING_LEVEL_PERSONA_KEY = "rl";

/** Rewriting brief handed to the AI gateway for a non-baseline level. */
export function readingLevelBrief(level: ReadingLevel): string {
  if (level === "kid") {
    return [
      "Target reading level: Lexile 500L–700L (a strong 8–10 year old reader).",
      "Average sentence length 8–12 words. One idea per sentence.",
      "Use everyday, common words. Replace abstract phrasing with concrete, familiar analogies (school, games, pets, drawing, sports).",
      "Any technical term that must stay (for example 'prompt injection' or 'hallucination') is kept, but immediately explained in kid-friendly words right where it appears.",
      "Friendly and encouraging, never babyish. No workplace, money, dating, violent or frightening examples.",
    ].join(" ");
  }
  if (level === "teen") {
    return [
      "Target reading level: Lexile 1000L–1200L (a general adult/teen reader).",
      "Moderate sentence length, plain general-audience vocabulary, no academic or corporate jargon.",
      "Technical terms are kept, each with a short plain-language explanation the first time it appears.",
      "Clear and direct, concrete real-world examples, no talking down.",
    ].join(" ");
  }
  return "";
}
