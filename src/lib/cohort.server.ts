// Server-only scoring for the onboarding knowledge check. The answer key never
// reaches the client, and the user never sees a numeric score.
import type { KnowledgeLevel } from "./cohort";

/** Index of the correct option for each question, in question order. */
const ANSWER_KEY = [
  // q1 is a self-report; "A little" or "Regularly" count as knowing something.
  [1, 2],
  [0],
  [0],
  [0],
  [0],
];

export function scoreKnowledge(answers: number[]): {
  correct: number;
  knowledgeLevel: KnowledgeLevel;
} {
  let correct = 0;
  ANSWER_KEY.forEach((accepted, i) => {
    if (accepted.includes(answers[i])) correct += 1;
  });
  const knowledgeLevel: KnowledgeLevel =
    correct <= 1 ? "new" : correct <= 3 ? "some" : "experienced";
  return { correct, knowledgeLevel };
}
