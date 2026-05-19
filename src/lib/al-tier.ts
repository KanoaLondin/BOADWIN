// AL Adaptive Intelligence — derives a skill tier from user state.
import type { AppState } from "./app-state";
import { getLevelInfo } from "./level-system";

export type AlTier = 1 | 2 | 3 | 4;

export type AlTierMeta = {
  tier: AlTier;
  label: string;       // e.g. "Beginner Mode"
  emoji: string;       // e.g. "🌱"
  short: string;       // e.g. "Beginner"
  description: string; // one-liner for users
};

export const AL_TIER_META: Record<AlTier, AlTierMeta> = {
  1: { tier: 1, label: "Beginner Mode",     emoji: "🌱", short: "Beginner",
       description: "Simple words, short answers, lots of encouragement." },
  2: { tier: 2, label: "Learner Mode",      emoji: "📚", short: "Learner",
       description: "Real-world examples, key terms defined as we go." },
  3: { tier: 3, label: "Intermediate Mode", emoji: "⚡", short: "Intermediate",
       description: "Standard AI vocabulary, more depth, cross-lesson links." },
  4: { tier: 4, label: "Advanced Mode",     emoji: "🚀", short: "Advanced",
       description: "Full technical depth, peer-level discussion." },
};

const OVERRIDE_KEY = "aied:alTierOverride";

export function getAlTierOverride(): AlTier | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(OVERRIDE_KEY);
  if (v === "1" || v === "2" || v === "3" || v === "4") return Number(v) as AlTier;
  return null;
}

export function setAlTierOverride(t: AlTier | null) {
  if (typeof window === "undefined") return;
  if (t == null) window.localStorage.removeItem(OVERRIDE_KEY);
  else window.localStorage.setItem(OVERRIDE_KEY, String(t));
}

export function deriveAlTier(state: Pick<AppState, "xp" | "ageGroup">): AlTier {
  const lvl = getLevelInfo(state.xp).level;
  // Age group is a strong signal for newcomers/advanced.
  if (state.ageGroup === "kids") return 1;
  if (state.ageGroup === "pro") return 4;

  if (lvl <= 2) return 1;
  if (lvl <= 6) return 2;
  if (lvl <= 10) return 3;
  return 4;
}

export function resolveAlTier(state: Pick<AppState, "xp" | "ageGroup">): {
  tier: AlTier;
  meta: AlTierMeta;
  override: AlTier | null;
  auto: AlTier;
} {
  const auto = deriveAlTier(state);
  const override = getAlTierOverride();
  const tier = override ?? auto;
  return { tier, meta: AL_TIER_META[tier], override, auto };
}
