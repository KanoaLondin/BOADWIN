// Functional effects for AL's cosmetic outfits. Purely presentational content
// helpers — nothing here changes what the correct answer is, only what extra
// coaching is shown around it.
import type { Exercise } from "./course-data";

/** Par time (ms) for the Ninja speed bonus — mirrors the "Speed Demon"
 * achievement wording ("complete a lesson in under 2 minutes"). */
export const NINJA_PAR_MS = 2 * 60 * 1000;

export const NINJA_MULTIPLIER = 1.5;

function correctAnswerText(ex: Exercise): string {
  switch (ex.type) {
    case "multiple-choice":
      return ex.options[ex.correctIndex];
    case "fill-blank":
      return ex.answer;
    case "drag-drop":
      return ex.words.join(" ");
    case "true-false":
      return ex.answer ? "True" : "False";
    case "matching":
      return ex.pairs.map((p) => p.term).join(", ");
    case "short-answer":
      return ex.referenceAnswer ?? "your own reasoning";
  }
}

/** Teacher AL: step-by-step reasoning for *why* the answer holds. */
export function teacherNote(ex: Exercise, lessonTitle: string): string[] {
  const answer = correctAnswerText(ex);
  switch (ex.type) {
    case "multiple-choice":
      return [
        `Read the question again: it asks about ${lessonTitle.toLowerCase()}.`,
        `"${answer}" is the only option that matches that idea directly.`,
        `The other options describe related but different things, so they fail the test the question sets.`,
      ];
    case "fill-blank":
      return [
        `The sentence needs a word that fits both the grammar and the concept.`,
        `"${answer}" is the exact term this lesson uses for that idea.`,
        `Swap in any other word and the sentence stops describing ${lessonTitle.toLowerCase()} accurately.`,
      ];
    case "drag-drop":
      return [
        `Order matters here because each step depends on the one before it.`,
        `The correct sequence is: ${answer}.`,
        `If you move a step earlier, it would rely on information that doesn't exist yet.`,
      ];
    case "true-false":
      return [
        `Break the statement into its claim and its condition.`,
        ex.explanation ?? `The claim is ${answer.toLowerCase()} as stated in this lesson.`,
        `Watch for absolute words like "always" or "never" — they usually decide these.`,
      ];
    case "matching":
      return [
        `Match by definition, not by wording that merely looks similar.`,
        `Each term here has one job, and the definition names that job.`,
        `When two look close, ask which one the lesson used first — that's usually the tighter fit.`,
      ];
    case "short-answer":
      return [
        `A strong answer names the concept, then shows it in an example.`,
        `Reference point: ${answer}.`,
        `Compare yours to that and note anything you left out.`,
      ];
  }
}

const SCIENCE_FACTS: { keys: string[]; fact: string }[] = [
  { keys: ["token", "word", "text"], fact: "Language models don't read words — they read tokens. The word 'unbelievable' is often split into three of them." },
  { keys: ["prompt", "instruction"], fact: "Studies show that simply adding 'think step by step' to a prompt measurably improved accuracy on maths benchmarks — the effect is called chain-of-thought prompting." },
  { keys: ["train", "learn", "data"], fact: "Training a large model can involve trillions of tokens — roughly more text than a person could read in a million lifetimes." },
  { keys: ["neural", "network", "transformer", "attention"], fact: "The transformer's 'attention' maths was published in 2017 in a paper literally titled 'Attention Is All You Need'." },
  { keys: ["hallucinat", "accuracy", "fact"], fact: "Hallucinations happen because models predict plausible text, not verified text — plausibility and truth are different measurements." },
  { keys: ["agent", "tool", "workflow"], fact: "An agent's loop — observe, decide, act — is borrowed from robotics control theory from the 1980s." },
  { keys: ["secur", "attack", "inject", "red"], fact: "Prompt injection was formally named in 2022 and is now tracked as a top risk in the OWASP list for LLM applications." },
  { keys: ["ethic", "bias", "fair"], fact: "Bias in a model is measurable: researchers test it by swapping one word (like a name) and checking whether the output changes." },
  { keys: ["eval", "test", "benchmark"], fact: "Benchmarks 'wear out': once a test set leaks into training data, scores rise without any real improvement in ability." },
  { keys: ["embed", "vector", "search"], fact: "Embeddings turn meaning into coordinates, so 'king' and 'queen' end up close together in a space with thousands of dimensions." },
];

/** Scientist AL: a real-world technical tidbit tied to the lesson topic. */
export function scienceFact(topic: string, seed: number): string {
  const t = topic.toLowerCase();
  const hit = SCIENCE_FACTS.find((f) => f.keys.some((k) => t.includes(k)));
  if (hit) return hit.fact;
  return SCIENCE_FACTS[Math.abs(seed) % SCIENCE_FACTS.length].fact;
}
