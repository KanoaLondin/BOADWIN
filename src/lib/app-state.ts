// Client-side app state for AIED — backed by localStorage, and mirrored to
// the signed-in user's Supabase profile so progress follows them across devices.
import { useSyncExternalStore } from "react";
import { getLevelInfo } from "./level-system";
import { supabase } from "@/integrations/supabase/client";

const KEY = "aied:state:v2";

export type StreakColor = "orange" | "blue" | "purple" | "green" | "rainbow";
export type ProfileBg = "none" | "galaxy" | "forest" | "ocean" | "mountains" | "city" | "abstract";
export type BadgeFrame = "none" | "gold" | "neon" | "rainbow" | "fire" | "ice";

export type AppState = {
  name: string;
  ageGroup: "kids" | "tweens" | "teens" | "adults" | "pro";
  // Onboarding cohort (mirrors the cloud profile columns).
  cohortAgeGroup: "kid" | "teen" | "adult" | null;
  knowledgeLevel: "new" | "some" | "experienced" | null;
  xp: number;

  gems: number;
  hearts: number;
  maxHearts: number;
  streak: number;
  lastActiveISO: string | null;
  completedLessons: string[];
  perfectLessons: string[];
  hintedQuestions: string[]; // exerciseId list
  skippedLessons: string[];
  premium: false | "super" | "max" | "family";
  premiumRenewalISO: string | null;

  // Inventory
  streakFreezes: number;
  heartRefills: number;
  skipTokens: number;
  hintTokens: number;
  xpBoostUntil: number | null;

  // Cosmetics
  alOutfit: string;
  ownedOutfits: string[];
  streakColor: StreakColor;
  ownedStreakColors: StreakColor[];
  profileBg: ProfileBg;
  ownedProfileBgs: ProfileBg[];
  badgeFrame: BadgeFrame;
  ownedBadgeFrames: BadgeFrame[];

  // Reward chest queue
  lessonsSinceChest: number;
  // Last seen level so we can fire level-up celebration
  lastSeenLevel: number;
  // For streak freeze notification
  streakFreezeUsedAt: string | null;
  alTip: string | null;
  bgAnimationsOff: boolean;
};

const DEFAULT_STATE: AppState = {
  name: "Alex",
  ageGroup: "teens",
  cohortAgeGroup: null,
  knowledgeLevel: null,
  xp: 60,

  gems: 120,
  hearts: 5,
  maxHearts: 5,
  streak: 3,
  lastActiveISO: new Date().toISOString(),
  completedLessons: [],
  perfectLessons: [],
  hintedQuestions: [],
  skippedLessons: [],
  premium: false,
  premiumRenewalISO: null,

  streakFreezes: 1,
  heartRefills: 0,
  skipTokens: 0,
  hintTokens: 3,
  xpBoostUntil: null,

  alOutfit: "classic",
  ownedOutfits: ["classic"],
  streakColor: "orange",
  ownedStreakColors: ["orange"],
  profileBg: "none",
  ownedProfileBgs: ["none"],
  badgeFrame: "none",
  ownedBadgeFrames: ["none"],

  lessonsSinceChest: 0,
  lastSeenLevel: 1,
  streakFreezeUsedAt: null,
  alTip: "Try a lesson today to keep your streak alive! 🔥",
  bgAnimationsOff: false,
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
  } catch {}
}

function ensureInit() {
  if (initialized || typeof window === "undefined") return;
  state = load();
  // sync lastSeenLevel to xp so we don't fire false level-ups
  const lvl = getLevelInfo(state.xp).level;
  if (state.lastSeenLevel < lvl) state.lastSeenLevel = lvl;
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
  scheduleCloudSave();
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

// ---------- Cloud sync (Supabase) ----------
// Keeps a signed-in user's progress in their `profiles` row so they can log
// in on any device and pick up where they left off. `setState` above is the
// single choke point every mutation in this file goes through, so hooking
// the cloud save in there covers all of them without touching each call site.

let cloudUserId: string | null = null;
let cloudIsAdmin = false;
let hydrating = false;
let saveTimer: ReturnType<typeof setTimeout> | null = null;

export function isAdmin(): boolean {
  return cloudIsAdmin;
}

function scheduleCloudSave() {
  if (!cloudUserId || hydrating || typeof window === "undefined") return;
  if (saveTimer) clearTimeout(saveTimer);
  const userId = cloudUserId;
  saveTimer = setTimeout(() => {
    const s = getState();
    // `role` and `premium` are never sent from the client — a database
    // trigger silently rejects changes to them from anything but a
    // service-role connection, so there's no point (or safety upside) in
    // trying. Everything else about the player's progress lives here.
    supabase
      .from("profiles")
      .update({
        state: JSON.parse(JSON.stringify(s)),
        xp: s.xp,
        streak: s.streak,
        hearts: s.hearts,
        gems: s.gems,
        al_outfit: s.alOutfit,
        profile_bg: s.profileBg,
        display_name: s.name,
        age_group: s.ageGroup,
        last_active_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .then(({ error }) => {
        if (error) console.error("[app-state] cloud save failed", error);
      });
  }, 800);
}

export type CloudProfile = {
  id: string;
  role: string;
  state: unknown;
  xp: number;
  streak: number;
  hearts: number;
  gems: number;
  al_outfit: string;
  profile_bg: string;
  display_name: string | null;
  username?: string | null;
  age_group: string;
  cohort_age_group?: string | null;
  knowledge_level?: string | null;

};

/** Call once right after sign-in with the freshly-fetched profile row. */
export function hydrateFromCloud(profile: CloudProfile) {
  ensureInit();
  hydrating = true;
  cloudUserId = profile.id;
  cloudIsAdmin = profile.role === "admin";
  const cloudState =
    profile.state && typeof profile.state === "object" ? (profile.state as Partial<AppState>) : {};
  // Start from DEFAULT_STATE (not the current in-memory state) so a
  // previous account's leftovers on a shared device never leak into this
  // sign-in — every field this user's cloud data doesn't cover gets reset.
  setState(() => ({
    ...DEFAULT_STATE,
    ...cloudState,
    xp: profile.xp,
    streak: profile.streak,
    hearts: profile.hearts,
    gems: profile.gems,
    alOutfit: profile.al_outfit || DEFAULT_STATE.alOutfit,
    profileBg: (profile.profile_bg as ProfileBg) || DEFAULT_STATE.profileBg,
    // The username the person chose at sign-up is the source of truth for
    // greetings; display_name only wins if they later renamed themselves in
    // onboarding/settings. Never fall back to a placeholder for a real account.
    name: profile.display_name || profile.username || DEFAULT_STATE.name,
    ageGroup: (profile.age_group as AppState["ageGroup"]) || DEFAULT_STATE.ageGroup,
    cohortAgeGroup: (profile.cohort_age_group as AppState["cohortAgeGroup"]) ?? null,
    knowledgeLevel: (profile.knowledge_level as AppState["knowledgeLevel"]) ?? null,

    // Admins see every level and lesson unlocked locally, regardless of
    // their actual `premium` column — this is never written back to the
    // database, it's purely a local override for rendering.
    premium: cloudIsAdmin ? "max" : (cloudState.premium ?? DEFAULT_STATE.premium),
  }));
  hydrating = false;
}

/** Call on sign-out: stop syncing and wipe local progress so the next
 * signed-in user (or a guest) on this device starts clean. */
export function unbindCloud() {
  cloudUserId = null;
  cloudIsAdmin = false;
  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }
  setState(() => DEFAULT_STATE);
}

// ---------- Currency / XP ----------
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
export function isBoostActive(): boolean {
  const s = getState();
  return !!s.xpBoostUntil && s.xpBoostUntil > Date.now();
}

// ---------- Hearts ----------
export function loseHeart() {
  setState((s) => ({ ...s, hearts: Math.max(0, s.hearts - 1) }));
}
export function refillHearts() {
  setState((s) => ({ ...s, hearts: s.maxHearts }));
}
export function useHeartRefillFromInventory(): boolean {
  const s = getState();
  if (s.heartRefills <= 0) return false;
  setState((x) => ({ ...x, heartRefills: x.heartRefills - 1, hearts: x.maxHearts }));
  return true;
}

// ---------- Subscription ----------
export function setPremium(p: AppState["premium"]) {
  setState((s) => ({
    ...s,
    premium: p,
    premiumRenewalISO: p ? new Date(Date.now() + 30 * 86400_000).toISOString() : null,
  }));
}

// ---------- Profile basics ----------
export function setName(name: string) {
  setState((s) => ({ ...s, name }));
}
export function setCohort(cohort: {
  cohortAgeGroup: AppState["cohortAgeGroup"];
  knowledgeLevel: AppState["knowledgeLevel"];
}) {
  setState((s) => ({ ...s, ...cohort }));
}

export function setAgeGroup(ageGroup: AppState["ageGroup"]) {
  setState((s) => ({ ...s, ageGroup }));
}

// ---------- Power-ups ----------
export function activateXpBoost(hours: number) {
  setState((s) => ({ ...s, xpBoostUntil: Date.now() + hours * 3600_000 }));
}
export function addStreakFreeze(n = 1) {
  setState((s) => ({ ...s, streakFreezes: Math.min(2, s.streakFreezes + n) }));
}
export function addHeartRefill(n = 1) {
  setState((s) => ({ ...s, heartRefills: s.heartRefills + n }));
}
export function addSkipToken(n = 1) {
  setState((s) => ({ ...s, skipTokens: s.skipTokens + n }));
}
export function addHintTokens(n: number) {
  setState((s) => ({ ...s, hintTokens: s.hintTokens + n }));
}
export function useHintToken(exerciseId: string): boolean {
  const s = getState();
  if (s.hintTokens <= 0) return false;
  setState((x) => ({
    ...x,
    hintTokens: x.hintTokens - 1,
    hintedQuestions: x.hintedQuestions.includes(exerciseId)
      ? x.hintedQuestions
      : [...x.hintedQuestions, exerciseId],
  }));
  return true;
}

// ---------- Cosmetics ----------
export function ownOutfit(id: string) {
  setState((s) =>
    s.ownedOutfits.includes(id) ? s : { ...s, ownedOutfits: [...s.ownedOutfits, id] },
  );
}
export function equipOutfit(id: string) {
  setState((s) => (s.ownedOutfits.includes(id) ? { ...s, alOutfit: id } : s));
}
export function ownStreakColor(c: StreakColor) {
  setState((s) =>
    s.ownedStreakColors.includes(c) ? s : { ...s, ownedStreakColors: [...s.ownedStreakColors, c] },
  );
}
export function equipStreakColor(c: StreakColor) {
  setState((s) => (s.ownedStreakColors.includes(c) ? { ...s, streakColor: c } : s));
}
export function ownProfileBg(c: ProfileBg) {
  setState((s) =>
    s.ownedProfileBgs.includes(c) ? s : { ...s, ownedProfileBgs: [...s.ownedProfileBgs, c] },
  );
}
export function equipProfileBg(c: ProfileBg) {
  setState((s) => (s.ownedProfileBgs.includes(c) ? { ...s, profileBg: c } : s));
}
export function ownBadgeFrame(c: BadgeFrame) {
  setState((s) =>
    s.ownedBadgeFrames.includes(c) ? s : { ...s, ownedBadgeFrames: [...s.ownedBadgeFrames, c] },
  );
}
export function equipBadgeFrame(c: BadgeFrame) {
  setState((s) => (s.ownedBadgeFrames.includes(c) ? { ...s, badgeFrame: c } : s));
}

// Mark last-seen level (after celebration shown)
export function acknowledgeLevel(level: number) {
  setState((s) => ({ ...s, lastSeenLevel: Math.max(s.lastSeenLevel, level) }));
}

// ---------- Lesson skip ----------
export function skipLessonWithToken(lessonId: string, baseXp: number): boolean {
  const s = getState();
  if (s.skipTokens <= 0) return false;
  setState((x) => ({
    ...x,
    skipTokens: x.skipTokens - 1,
    completedLessons: x.completedLessons.includes(lessonId)
      ? x.completedLessons
      : [...x.completedLessons, lessonId],
    skippedLessons: x.skippedLessons.includes(lessonId)
      ? x.skippedLessons
      : [...x.skippedLessons, lessonId],
  }));
  // minimum passing XP
  addXp(Math.max(5, Math.round(baseXp * 0.25)));
  return true;
}

// ---------- Streak engine ----------
// `streak`/`lastActiveISO` used to be plain numbers nobody ever advanced —
// the UI displayed them, but nothing recomputed them from real elapsed
// time, so a streak just sat wherever it started forever. This reconciles
// the streak against actual calendar days between lesson-completion days,
// with a streak freeze (if owned) covering one missed day per freeze.
export type StreakOutcome =
  | { kind: "same-day"; streak: number }
  | { kind: "started"; streak: number }
  | { kind: "extended"; streak: number }
  | { kind: "freeze-saved"; streak: number; freezesUsed: number }
  | { kind: "reset"; streak: number; brokenStreak: number };

function calendarDaysBetween(fromISO: string, toISO: string): number {
  const from = new Date(fromISO);
  const to = new Date(toISO);
  // Compare calendar days, not raw 24h windows, so "yesterday 11pm" to
  // "today 1am" is a 1-day gap rather than 0.
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b - a) / 86_400_000);
}

function computeStreakOutcome(s: AppState, nowISO: string): StreakOutcome {
  if (!s.lastActiveISO) return { kind: "started", streak: Math.max(1, s.streak || 1) };
  const gap = calendarDaysBetween(s.lastActiveISO, nowISO);
  if (gap <= 0) return { kind: "same-day", streak: s.streak };
  if (gap === 1) return { kind: "extended", streak: s.streak + 1 };
  const missedDays = gap - 1;
  if (s.streakFreezes >= missedDays) {
    return { kind: "freeze-saved", streak: s.streak + 1, freezesUsed: missedDays };
  }
  return { kind: "reset", streak: 1, brokenStreak: s.streak };
}

/**
 * Read-only look at what touchStreak() would do right now — for a
 * "welcome back" banner shown before the person has done anything today,
 * without spending a streak freeze or resetting anything on their behalf.
 */
export function previewStreakOutcome(): StreakOutcome {
  return computeStreakOutcome(getState(), new Date().toISOString());
}

/**
 * Reconciles the streak against real elapsed days. Called from
 * completeLesson() — the streak counts lesson-completion days, not just
 * app opens, so opening the app without doing anything can't farm it.
 * Safe to call more than once in a day: the second call sees a same-day
 * gap and no-ops.
 */
export function touchStreak(): StreakOutcome {
  const nowISO = new Date().toISOString();
  const outcome = computeStreakOutcome(getState(), nowISO);
  if (outcome.kind === "same-day") return outcome;
  setState((x) => {
    if (outcome.kind === "freeze-saved") {
      return {
        ...x,
        streak: outcome.streak,
        lastActiveISO: nowISO,
        streakFreezes: x.streakFreezes - outcome.freezesUsed,
        streakFreezeUsedAt: nowISO,
      };
    }
    return { ...x, streak: outcome.streak, lastActiveISO: nowISO };
  });
  return outcome;
}

// ---------- Lesson completion ----------
export type ChestTier = "bronze" | "silver" | "gold" | "diamond";

export function completeLesson(
  lessonId: string,
  opts: {
    perfect: boolean;
    unitDone?: boolean;
    levelDone?: boolean;
    baseXp: number;
    hintedCount?: number;
    /** Extra cosmetic multiplier (e.g. Ninja speed bonus). Stacks with XP Boost. */
    xpMultiplier?: number;
  },
): {
  gemsEarned: number;
  xpEarned: number;
  chest: ChestTier | null;
  streak: StreakOutcome;
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
      // Completing a lesson restores hearts for the next one.
      hearts: s.maxHearts,
    };
  });
  addGems(gemsEarned);
  const boost = isBoostActive() ? 2 : 1;
  const cosmetic = opts.xpMultiplier ?? 1;
  const base = Math.round(opts.baseXp * cosmetic);
  const xpEarned = base * boost;
  addXp(base);

  let chest: ChestTier | null = null;
  if (opts.levelDone) chest = "gold";
  else if (opts.unitDone) chest = "silver";
  else if (getState().lessonsSinceChest >= 3) {
    chest = "bronze";
    setState((s) => ({ ...s, lessonsSinceChest: 0 }));
  }
  const streak = touchStreak();
  return { gemsEarned, xpEarned, chest, streak };
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
  const pool = [
    { id: "freeze", name: "Streak Freeze", emoji: "❄️", apply: () => addStreakFreeze(1) },
    { id: "heart", name: "Heart Refill", emoji: "❤️", apply: () => addHeartRefill(1) },
    { id: "boost", name: "XP Boost (2h)", emoji: "⚡", apply: () => activateXpBoost(2) },
    { id: "hint", name: "Hint Token", emoji: "💡", apply: () => addHintTokens(1) },
  ];
  const n = tier === "bronze" ? 1 : tier === "silver" ? 1 : tier === "gold" ? 2 : 3;
  const items: { id: string; name: string; emoji: string }[] = [];
  for (let i = 0; i < n; i++) {
    const it = pool[Math.floor(Math.random() * pool.length)];
    it.apply();
    items.push({ id: it.id, name: it.name, emoji: it.emoji });
  }
  return { gems, items };
}

export function setBgAnimationsOff(off: boolean) {
  setState((s) => ({ ...s, bgAnimationsOff: off }));
}
