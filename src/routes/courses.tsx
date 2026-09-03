import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Lock, Check, Star, Trophy, Crown } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { COURSES, type Unit, type Level } from "@/lib/course-data";
import { useAppState } from "@/lib/app-state";
import { recommendedUnitId } from "@/lib/cohort";


export const Route = createFileRoute("/courses")({
  component: Courses,
  head: () => ({ meta: [{ title: "Adventure Map — AIED" }] }),
});

// ---- Themes per unit (cycles when more units than themes) ----
type Theme = {
  name: string;
  emoji: string;
  accent: string; // tailwind text color
  bg: string;    // banner gradient
  ring: string;  // node ring
  path: string;  // SVG stroke
};

const THEMES: Theme[] = [
  { name: "Whispering Forest", emoji: "🌲", accent: "text-success", bg: "from-emerald-200/70 to-emerald-50", ring: "ring-emerald-400", path: "stroke-emerald-500" },
  { name: "Coral Ocean",       emoji: "🌊", accent: "text-cyan",    bg: "from-sky-200/70 to-sky-50",         ring: "ring-sky-400",     path: "stroke-sky-500" },
  { name: "Sunstone Castle",   emoji: "🏰", accent: "text-warning", bg: "from-amber-200/70 to-amber-50",     ring: "ring-amber-400",   path: "stroke-amber-500" },
  { name: "Cloudtop Skies",    emoji: "☁️", accent: "text-cyan",    bg: "from-indigo-200/70 to-indigo-50",   ring: "ring-indigo-400",  path: "stroke-indigo-500" },
  { name: "Stardust Expanse",  emoji: "🚀", accent: "text-purple",  bg: "from-purple-200/70 to-purple-50",   ring: "ring-purple-400",  path: "stroke-purple-500" },
  { name: "Ember Volcano",     emoji: "🌋", accent: "text-warning", bg: "from-orange-200/70 to-rose-50",     ring: "ring-orange-400",  path: "stroke-orange-500" },
  { name: "Frostpeak Tundra",  emoji: "❄️", accent: "text-cyan",    bg: "from-cyan-200/70 to-cyan-50",       ring: "ring-cyan-400",    path: "stroke-cyan-500" },
  { name: "Mirage Dunes",      emoji: "🏜️", accent: "text-warning", bg: "from-yellow-200/70 to-orange-50",   ring: "ring-yellow-500",  path: "stroke-yellow-500" },
  { name: "Neon Metropolis",   emoji: "🌃", accent: "text-purple",  bg: "from-fuchsia-200/70 to-violet-50",  ring: "ring-fuchsia-400", path: "stroke-fuchsia-500" },
  { name: "Cosmic Horizon",    emoji: "🌌", accent: "text-purple",  bg: "from-violet-300/70 to-indigo-50",   ring: "ring-violet-500",  path: "stroke-violet-500" },
];

function themeFor(index: number): Theme {
  return THEMES[index % THEMES.length];
}

function Courses() {
  const completedList = useAppState((s) => s.completedLessons);
  const completed = useMemo(() => new Set(completedList), [completedList]);
  const premiumState = useAppState((s) => s.premium);
  const knowledgeLevel = useAppState((s) => s.knowledgeLevel);
  const [courseId, setCourseId] = useState(COURSES[0].id);

  const course = COURSES.find((c) => c.id === courseId) ?? COURSES[0];
  const courseLevels = course.levels;

  // Cohort recommendation — a highlight only, nothing extra gets locked.
  const recommendedUnit = recommendedUnitId(knowledgeLevel, !!premiumState, course.id);

  // Current lesson = first non-completed in the recommended unit, else the
  // first non-completed lesson in the first unlocked level.
  let current: string | null = null;
  for (const lv of courseLevels) {
    if (lv.tier !== "Free" && !premiumState) break;
    const unit = lv.units.find((u) => u.id === recommendedUnit);
    const lesson = unit?.lessons.find((l) => !completed.has(l.id));
    if (lesson) {
      current = lesson.id;
      break;
    }
  }
  if (!current) {
    outer: for (const lv of courseLevels) {
      if (lv.tier !== "Free" && !premiumState) break;
      for (const u of lv.units) {
        for (const l of u.lessons) {
          if (!completed.has(l.id)) {
            current = l.id;
            break outer;
          }
        }
      }
    }
  }

  const unitCount = courseLevels.reduce((n, lv) => n + lv.units.length, 0);
  const lessonCount = courseLevels.reduce(
    (n, lv) => n + lv.units.reduce((m, u) => m + u.lessons.length, 0),
    0,
  );

  let unitIndex = -1;

  return (
    <AppShell>
      <header className="mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-purple">Adventure Map</p>
        <h1 className="text-3xl font-black">{course.title}</h1>
        <p className="text-sm text-muted-foreground">
          {course.subtitle} · {courseLevels.length} lands · {unitCount} worlds · {lessonCount} lessons
        </p>
      </header>

      {/* Course track switcher */}
      <div className="mb-6 grid grid-cols-2 gap-2">
        {COURSES.map((c) => {
          const active = c.id === course.id;
          const done = c.levels.reduce(
            (n, lv) => n + lv.units.reduce((m, u) => m + u.lessons.filter((l) => completed.has(l.id)).length, 0),
            0,
          );
          const total = c.levels.reduce(
            (n, lv) => n + lv.units.reduce((m, u) => m + u.lessons.length, 0),
            0,
          );
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCourseId(c.id)}
              className={`rounded-2xl border-2 p-3 text-left transition-all ${
                active
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <p className="text-xl">{c.emoji}</p>
              <p className="mt-1 text-sm font-black leading-tight">{c.title}</p>
              <p className="text-[11px] text-muted-foreground">
                {done}/{total} lessons
              </p>
            </button>
          );
        })}
      </div>

      <div className="space-y-10">
        {courseLevels.map((level, li) => {
          const levelLocked = level.tier !== "Free" && !premiumState;
          return (
            <section key={level.id} className="space-y-6">
              <LevelBanner level={level} index={li} locked={levelLocked} />
              {level.units.map((unit) => {
                unitIndex += 1;
                const theme = themeFor(unitIndex);
                return (
                  <UnitPath
                    key={unit.id}
                    unit={unit}
                    theme={theme}
                    completed={completed}
                    current={current}
                    locked={levelLocked}
                    recommended={unit.id === recommendedUnit && knowledgeLevel !== "new"}
                  />

                );
              })}
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}


function LevelBanner({ level, index, locked }: { level: Level; index: number; locked: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-border bg-gradient-to-br from-purple/10 via-card to-cyan/10 p-4 shadow-card">
      <div className="absolute -right-6 -top-6 text-7xl opacity-20 select-none">
        {["🌱", "🌿", "🌳", "🏛️", "👑"][index] ?? "✨"}
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-cyan">
        Land {index + 1} · {level.badge}
      </p>
      <h2 className="text-xl font-black">{level.title}</h2>
      <p className="text-xs text-muted-foreground">{level.ageRange}</p>
      <div className="mt-2 flex items-center gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
            level.tier === "Free"
              ? "bg-success/15 text-success"
              : "bg-warning/15 text-warning"
          }`}
        >
          {level.tier}
        </span>
        {locked && (
          <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
            <Lock className="h-3 w-3" /> Unlock with AIED Max
          </span>
        )}
      </div>
    </div>
  );
}

function UnitPath({
  unit,
  theme,
  completed,
  current,
  locked,
  recommended = false,
}: {
  unit: Unit;
  theme: Theme;
  completed: Set<string>;
  current: string | null;
  locked: boolean;
  recommended?: boolean;
}) {

  // S-curve offsets per row index
  const nodeOffsets = [0, 70, 100, 70, 0, -70, -100, -70];
  const ROW_H = 110;
  const VIEW_W = 320;
  const CENTER = VIEW_W / 2;

  const positions = unit.lessons.map((_, i) => ({
    x: CENTER + nodeOffsets[i % nodeOffsets.length],
    y: 40 + i * ROW_H,
  }));
  const height = 40 + unit.lessons.length * ROW_H;

  // Build curvy SVG path through node centers
  let d = "";
  positions.forEach((p, i) => {
    if (i === 0) {
      d += `M ${p.x} ${p.y}`;
    } else {
      const prev = positions[i - 1];
      const cy = (prev.y + p.y) / 2;
      d += ` C ${prev.x} ${cy}, ${p.x} ${cy}, ${p.x} ${p.y}`;
    }
  });

  return (
    <div
      className={`overflow-hidden rounded-3xl border-2 bg-card shadow-card ${
        recommended ? "border-primary ring-2 ring-primary/40" : "border-border"
      }`}
    >
      <div className={`bg-gradient-to-br ${theme.bg} px-4 py-3`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{theme.emoji}</span>
          <div>
            <p className={`text-[10px] font-black uppercase tracking-widest ${theme.accent}`}>{theme.name}</p>
            <h3 className="text-base font-black text-foreground">{unit.title}</h3>
            <p className="text-[11px] text-foreground/70">{unit.description}</p>
            {recommended && (
              <span className="mt-1.5 inline-block rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary-foreground shadow-glow">
                ⭐ Recommended for you — start here
              </span>
            )}
          </div>
        </div>
      </div>


      <div className="relative px-2 pb-6 pt-2 bg-parchment/40">
        <svg
          className="absolute inset-x-0 top-0 mx-auto"
          width={VIEW_W}
          height={height}
          viewBox={`0 0 ${VIEW_W} ${height}`}
          style={{ left: "50%", transform: "translateX(-50%)" }}
          aria-hidden
        >
          <path
            d={d}
            fill="none"
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray="2 14"
            className={`${theme.path} opacity-60`}
          />
        </svg>

        <div
          className="relative mx-auto"
          style={{ width: VIEW_W, height }}
        >
          {unit.lessons.map((l, i) => {
            const isDone = completed.has(l.id);
            const isCurrent = !isDone && l.id === current;
            const isLocked = locked || (!isDone && !isCurrent);
            const state: NodeState = l.isQuiz
              ? isDone
                ? "quiz-done"
                : "quiz"
              : isDone
              ? "done"
              : isCurrent
              ? "current"
              : "locked";
            const pos = positions[i];
            return (
              <Link
                key={l.id}
                to={isLocked && !isCurrent ? "/shop" : "/lesson/$lessonId"}
                params={isLocked && !isCurrent ? undefined : { lessonId: l.id }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: pos.x, top: pos.y }}
                aria-label={l.title}
              >
                <NodeButton state={state} ring={theme.ring} />
                {isCurrent && (
                  <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-black text-primary-foreground shadow-glow animate-pop">
                    START
                  </div>
                )}
                {state === "quiz-done" && (
                  <Crown className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 text-warning fill-current" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="mx-auto mt-3 max-w-[300px] space-y-1 text-center">
          {unit.lessons.map((l) => {
            const isCurrent = l.id === current;
            const isDone = completed.has(l.id);
            return (
              <p
                key={l.id}
                className={`truncate text-[11px] ${
                  isCurrent
                    ? "font-black text-primary"
                    : isDone
                    ? "text-muted-foreground line-through"
                    : "text-muted-foreground"
                }`}
              >
                {l.isQuiz ? "🏆 " : ""}{l.title} · +{l.xp} XP
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type NodeState = "done" | "current" | "locked" | "quiz" | "quiz-done";

function NodeButton({ state, ring }: { state: NodeState; ring: string }) {
  const base =
    "grid h-16 w-16 place-items-center rounded-full border-4 transition-transform shadow-card";
  if (state === "done")
    return (
      <div className={`${base} border-success/40 bg-success text-white ring-4 ${ring}/40`}>
        <Check className="h-7 w-7" />
      </div>
    );
  if (state === "current")
    return (
      <div className={`${base} border-white bg-primary text-white animate-pop ring-4 ${ring}`}>
        <Star className="h-7 w-7 fill-current" />
      </div>
    );
  if (state === "quiz")
    return (
      <div className={`${base} border-warning bg-warning/15 text-warning ring-4 ${ring}/40`}>
        <Trophy className="h-7 w-7" />
      </div>
    );
  if (state === "quiz-done")
    return (
      <div className={`${base} border-warning bg-gradient-to-br from-warning to-amber-300 text-white ring-4 ${ring}`}>
        <Trophy className="h-7 w-7" />
      </div>
    );
  return (
    <div className={`${base} border-border bg-muted text-muted-foreground`}>
      <Lock className="h-6 w-6" />
    </div>
  );
}
