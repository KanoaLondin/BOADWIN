// XP / Level system for AIED.

export type LevelInfo = {
  level: number;
  name: string;
  minXp: number;
  maxXp: number; // inclusive upper bound (Infinity for last)
  tier: "newcomer" | "learner" | "expert" | "master" | "elite";
};

export const LEVELS: LevelInfo[] = [
  { level: 1,  name: "Newcomer",        minXp: 0,     maxXp: 100,    tier: "newcomer" },
  { level: 2,  name: "Explorer",        minXp: 101,   maxXp: 250,    tier: "newcomer" },
  { level: 3,  name: "Learner",         minXp: 251,   maxXp: 500,    tier: "newcomer" },
  { level: 4,  name: "Thinker",         minXp: 501,   maxXp: 900,    tier: "newcomer" },
  { level: 5,  name: "Prompt Rookie",   minXp: 901,   maxXp: 1400,   tier: "learner" },
  { level: 6,  name: "Prompt Builder",  minXp: 1401,  maxXp: 2000,   tier: "learner" },
  { level: 7,  name: "Prompt Crafter",  minXp: 2001,  maxXp: 2800,   tier: "learner" },
  { level: 8,  name: "Prompt Engineer", minXp: 2801,  maxXp: 3800,   tier: "learner" },
  { level: 9,  name: "AI Specialist",   minXp: 3801,  maxXp: 5000,   tier: "expert" },
  { level: 10, name: "AI Expert",       minXp: 5001,  maxXp: 6500,   tier: "expert" },
  { level: 11, name: "AI Architect",    minXp: 6501,  maxXp: 8500,   tier: "expert" },
  { level: 12, name: "AI Master",       minXp: 8501,  maxXp: 11000,  tier: "master" },
  { level: 13, name: "AI Visionary",    minXp: 11001, maxXp: 14000,  tier: "master" },
  { level: 14, name: "AI Pioneer",      minXp: 14001, maxXp: 18000,  tier: "master" },
  { level: 15, name: "AIED Elite",      minXp: 18001, maxXp: Infinity, tier: "elite" },
];

export function getLevelInfo(xp: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getNextLevelInfo(xp: number): LevelInfo | null {
  const cur = getLevelInfo(xp);
  return LEVELS.find((l) => l.level === cur.level + 1) ?? null;
}

export function getProgressToNext(xp: number): { pct: number; current: number; needed: number } {
  const cur = getLevelInfo(xp);
  const next = getNextLevelInfo(xp);
  if (!next) return { pct: 100, current: xp - cur.minXp, needed: 1 };
  const current = xp - cur.minXp;
  const needed = next.minXp - cur.minXp;
  return { pct: Math.min(100, Math.round((current / needed) * 100)), current, needed };
}

export const TIER_STYLES: Record<LevelInfo["tier"], { color: string; bg: string; ring: string }> = {
  newcomer: { color: "text-muted-foreground", bg: "from-slate-400 to-slate-300", ring: "ring-slate-400" },
  learner:  { color: "text-cyan",             bg: "from-sky-500 to-cyan-400",     ring: "ring-cyan-400" },
  expert:   { color: "text-purple",           bg: "from-purple to-fuchsia-400",   ring: "ring-purple-400" },
  master:   { color: "text-warning",          bg: "from-warning to-amber-300",    ring: "ring-amber-400" },
  elite:    { color: "text-warning",          bg: "from-cyan via-purple to-pink-400", ring: "ring-pink-400" },
};

// Min app-level required to access a course "level" (1-5 = Beginner..Master).
export const COURSE_LEVEL_GATES: Record<number, number> = {
  1: 1,  // Beginner
  2: 1,  // Elementary (sub-tier of free)
  3: 3,  // Intermediate -> requires user level 3
  4: 5,  // Advanced
  5: 8,  // Master tier
};

// Map course index (0-based) to the required user level.
export function gateForCourseIndex(idx: number): number {
  return COURSE_LEVEL_GATES[idx + 1] ?? 1;
}
