// Username safety filter. Backed by `obscenity`'s maintained English
// dataset (profanity, slurs, sexual content) rather than a hand-rolled list,
// plus normalisation passes that catch the common evasions: leetspeak
// (pr0f4nity), spaced/punctuated letters (f u c k), and stretched repeats
// (fuuuuck).
//
// This is the CLIENT half of the check — instant feedback while typing.
// The database enforces the same rule independently (see the
// `username_is_allowed` function), so bypassing this file gains nothing.
import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

/** Leetspeak / lookalike characters mapped back to plain letters. */
const LEET: Record<string, string> = {
  "0": "o",
  "1": "i",
  "3": "e",
  "4": "a",
  "5": "s",
  "6": "g",
  "7": "t",
  "8": "b",
  "9": "g",
  "@": "a",
  $: "s",
  "!": "i",
  "|": "l",
  "+": "t",
  "(": "c",
  "<": "c",
};

function deLeet(value: string): string {
  return value
    .toLowerCase()
    .split("")
    .map((ch) => LEET[ch] ?? ch)
    .join("");
}

/** Collapses runs of the same letter: "fuuuuck" -> "fuck". */
function collapseRepeats(value: string): string {
  return value.replace(/(.)\1{1,}/g, "$1");
}

/** Drops separators people hide words behind: "f-u_c k" -> "fuck". */
function stripSeparators(value: string): string {
  return value.replace(/[^a-z0-9]/gi, "");
}

/**
 * Every normalised form we test. Checking several variants (rather than one
 * aggressively-normalised string) keeps false positives low while still
 * catching the obvious dodges.
 */
function variants(raw: string): string[] {
  const lower = raw.toLowerCase();
  const leet = deLeet(lower);
  const packed = stripSeparators(leet);
  return Array.from(
    new Set([lower, leet, packed, collapseRepeats(packed), stripSeparators(lower)]),
  ).filter(Boolean);
}

export const USERNAME_BLOCKED_MESSAGE =
  "That username isn't allowed — please choose another.";

/** True when the text contains profanity, a slur, or sexual content. */
export function containsProfanity(raw: string): boolean {
  if (!raw.trim()) return false;
  return variants(raw).some((v) => matcher.hasMatch(v));
}

/**
 * Validates a username/display name a person typed.
 * Returns a friendly error message, or `null` when it's fine.
 */
export function validateUsername(raw: string, minLength = 3): string | null {
  const value = raw.trim();
  if (value.length < minLength) return `Please use at least ${minLength} characters.`;
  if (value.length > 20) return "Please keep it to 20 characters or fewer.";
  if (!/^[A-Za-z0-9._ -]+$/.test(value))
    return "Letters, numbers, spaces, dots, dashes and underscores only.";
  if (containsProfanity(value)) return USERNAME_BLOCKED_MESSAGE;
  return null;
}
