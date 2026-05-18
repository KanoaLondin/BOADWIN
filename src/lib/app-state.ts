// Lightweight client-side app state (localStorage backed) for AIED.
// No backend yet — gems, hearts, streak, completed lessons all persist locally.
import { useSyncExternalStore } from "react";

const KEY = "aied:state:v1";

export type AppState = {
  name: string;
  ageGroup: "kids" | "tweens" | "teens" | "adults" | "pro";
  xp: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  streak: number;
  lastActiveISO: string | null;
  completedLessons: string[];
  perfectLessons: string[];
  premium: false | "super" | "max" | "family";
  // Cosmetics
  alOutfit: string; // id
  ownedOutfits: string[];
  streakFreezes: number;
  xpBoostUntil: number | null;
  hintTokens: number;
  // Chest queue (lessons completed since last bronze chest)
  lessonsSinceChest: number;
  // AL tip
  alTip: string | null;
};

const DEFAULT_STATE: AppState = {
  name: "Alex",
  ageGroup: "teens",
  xp: 1240,
  gems: 85,
  hearts: 5,
  maxHearts: 5,
  streak: 7,
  lastActiveISO: new Date().toISOString(),
  completedLessons: ["u1l1"],
  perfectLessons: [],
  premium: false,
  alOutfit: "classic",
  ownedOutfits: ["classic"],
  streakFreezes: 1,
  xpBoostUntil: null,
  hintTokens: 2,
  lessonsSinceChest: 0,
  alTip: "Try a lesson today to keep your streak alive! 🔥",
};

let state: AppState = DEFAULT_STATE;
let initialized = false;
const listeners = new Set<() => void>();

function load(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) } as AppState;
  } catch {
    return DEFAULT_STATE;
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* noop */
  }
}

function ensureInit() {
  if (initialized || typeof window === "undefined") return;
  state = load();
  initialized = true;
}

function emit() {
  for (const l of listeners) l();
}

export function getState(): AppState {
  ensureInit();
  return state;
}

export function setState(updater: (s: AppState) => AppState) {
  ensureInit();
  state = updater(state);
  persist();
  emit();
}

export function useAppState<T>(selector: (s: AppState) => T): T {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => selector(getState()),
    () => selector(DEFAULT_STATE),
  );
}

// ---------- Actions ----------

export function addGems(n: number) {
  setState((s) => ({ ...s, gems: Math.max(0, s.gems + n) }));
}
export function spendGems(n: number): boolean {
  const s = getState();
  if (s.gems < n) return false;
  setState((x) => ({ ...x, gems: x.gems - n }));
  return true;
}
export function addXp(n: number) {
  setState((s) => {
    const boost = s.xpBoostUntil && s.xpBoostUntil > Date.now() ? 2 : 1;
    return { ...s, xp: s.xp + n * boost };
  });
}
export function loseHeart() {
  setState((s) => ({ ...s, hearts: Math.max(0, s.hearts - 1) }));
}
export function refillHearts() {
  setState((s) => ({ ...s, hearts: s.maxHearts }));
}
export function setPremium(p: AppState["premium"]) {
  setState((s) => ({ ...s, premium: p }));
}
export function setName(name: string) {
  setState((s) => ({ ...s, name }));
}
export function setAgeGroup(ageGroup: AppState["ageGroup"]) {
  setState((s) => ({ ...s, ageGroup }));
}
export function activateXpBoost(hours: number) {
  setState((s) => ({ ...s, xpBoostUntil: Date.now() + hours * 3600_000 }));
}
export function addStreakFreeze(n = 1) {
  setState((s) => ({ ...s, streakFreezes: Math.min(2, s.streakFreezes + n) }));
}
export function addHintTokens(n: number) {
  setState((s) => ({ ...s, hintTokens: s.hintTokens + n }));
}
export function ownOutfit(id: string) {
  setState((s) =>
    s.ownedOutfits.includes(id) ? s : { ...s, ownedOutfits: [...s.ownedOutfits, id] },
  );
}
export function equipOutfit(id: string) {
  setState((s) => (s.ownedOutfits.includes(id) ? { ...s, alOutfit: id } : s));
}

// Returns a chest tier to award (or null) after completing a lesson.
export type ChestTier = "bronze" | "silver" | "gold" | "diamond";

export function completeLesson(
  lessonId: string,
  opts: { perfect: boolean; unitDone?: boolean; levelDone?: boolean; baseXp: number },
): {
  gemsEarned: number;
  xpEarned: number;
  chest: ChestTier | null;
} {
  let gemsEarned = 5;
  if (opts.perfect) gemsEarned = 10;
  if (opts.unitDone) gemsEarned += 25;

  setState((s) => {
    const done = s.completedLessons.includes(lessonId)
      ? s.completedLessons
      : [...s.completedLessons, lessonId];
    const perf =
      opts.perfect && !s.perfectLessons.includes(lessonId)
        ? [...s.perfectLessons, lessonId]
        : s.perfectLessons;
    return {
      ...s,
      completedLessons: done,
      perfectLessons: perf,
      lessonsSinceChest: s.lessonsSinceChest + 1,
    };
  });
  addGems(gemsEarned);
  const boost = (getState().xpBoostUntil ?? 0) > Date.now() ? 2 : 1;
  const xpEarned = opts.baseXp * boost;
  addXp(opts.baseXp);

  // Determine chest
  let chest: ChestTier | null = null;
  if (opts.levelDone) chest = "gold";
  else if (opts.unitDone) chest = "silver";
  else if (getState().lessonsSinceChest >= 3) {
    chest = "bronze";
    setState((s) => ({ ...s, lessonsSinceChest: 0 }));
  }
  return { gemsEarned, xpEarned, chest };
}

export function openChest(tier: ChestTier): {
  gems: number;
  items: { id: string; name: string; emoji: string }[];
} {
  const ranges: Record<ChestTier, [number, number]> = {
    bronze: [10, 20],
    silver: [25, 40],
    gold: [50, 100],
    diamond: [150, 200],
  };
  const [lo, hi] = ranges[tier];
  const gems = Math.floor(lo + Math.random() * (hi - lo + 1));
  addGems(gems);

  const itemsPool = [
    { id: "freeze", name: "Streak Freeze", emoji: "❄️", apply: () => addStreakFreeze(1) },
    { id: "heart", name: "Heart Refill", emoji: "❤️", apply: () => refillHearts() },
    { id: "boost", name: "XP Boost (2h)", emoji: "⚡", apply: () => activateXpBoost(2) },
    { id: "hint", name: "Hint Token", emoji: "💡", apply: () => addHintTokens(1) },
  ];
  const rareCount = tier === "bronze" ? 1 : tier === "silver" ? 1 : tier === "gold" ? 2 : 3;
  const items: { id: string; name: string; emoji: string }[] = [];
  for (let i = 0; i < rareCount; i++) {
    const it = itemsPool[Math.floor(Math.random() * itemsPool.length)];
    it.apply();
    items.push({ id: it.id, name: it.name, emoji: it.emoji });
  }
  return { gems, items };
}
