import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronRight, Sparkles, Zap } from "lucide-react";
import { StreakFlame } from "@/components/StreakFlame";
import { AppShell } from "@/components/AppShell";
import { COURSES, allLevels, courseForUnit, courseTitle } from "@/lib/course-data";
import { useAppState } from "@/lib/app-state";
import { isKidCohort, recommendedUnitId } from "@/lib/cohort";


export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Boadwin — Home" },
      { name: "description", content: "Your daily AI literacy training." },
    ],
  }),
});

const TIPS = [
  "Tip of the day: Clear prompts get clear answers ✨",
  "Tip of the day: Add context — tell AI who you are and what you need 💡",
  "Tip of the day: Iterate! Your second prompt is usually better than your first 🔁",
  "Tip of the day: Specific beats vague every time 🎯",
];

function formatRemaining(ms: number): string {
  if (ms <= 0) return "0s";
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function Home() {
  const name = useAppState((s) => s.name);
  const xp = useAppState((s) => s.xp);
  const streak = useAppState((s) => s.streak);
  const completed = useAppState((s) => s.completedLessons);
  const boostUntil = useAppState((s) => s.xpBoostUntil);
  const knowledgeLevel = useAppState((s) => s.knowledgeLevel);
  const cohortAge = useAppState((s) => s.cohortAgeGroup);
  const premium = useAppState((s) => s.premium);
  const readingLevel = useAppState((s) => s.readingLevel);

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!boostUntil) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [boostUntil]);
  const boostActive = !!boostUntil && boostUntil > now;
  const remainingMs = boostActive ? boostUntil! - now : 0;

  const dailyGoal = 50;
  const dailyXp = 30;

  // "Continue learning" lands on the unit recommended for this learner's
  // cohort, falling back to the next unfinished lesson anywhere.
  const recommendedUnit = recommendedUnitId(knowledgeLevel, !!premium);
  const allUnits = allLevels.flatMap((lv) => lv.units.map((u) => ({ unit: u, level: lv })));
  const recommended = allUnits.find((x) => x.unit.id === recommendedUnit) ?? allUnits[0];
  const isRecommendedStart = recommended.unit.lessons.some((l) => !completed.includes(l.id));
  const target = isRecommendedStart
    ? recommended
    : (allUnits.find((x) => x.unit.lessons.some((l) => !completed.includes(l.id))) ?? allUnits[0]);
  const currentLevel = target.level;
  const nextLesson =
    target.unit.lessons.find((l) => !completed.includes(l.id)) ?? target.unit.lessons[0];
  const tip = TIPS[new Date().getDay() % TIPS.length];
  const kid = isKidCohort(cohortAge);

  return (
    <AppShell>
      <section className="mt-2">
        <h2 className="text-3xl font-black text-foreground">
          Welcome back, {name}! 👋
        </h2>
        <p className="mt-1 text-muted-foreground">
          {kid ? "Let's learn something fun about AI today! 🌟" : "Ready for today's AI lesson?"}
        </p>
      </section>


      {/* Quick stats */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-card border border-border p-4 shadow-soft">
          <div className="flex items-center gap-2 text-warning">
            <StreakFlame className="h-4 w-4" />
            <p className="text-[10px] font-black uppercase tracking-wider">Streak</p>
          </div>
          <p className="mt-1 text-2xl font-black">{streak} <span className="text-sm font-bold text-muted-foreground">days</span></p>
        </div>
        <div className="rounded-2xl bg-card border border-border p-4 shadow-soft">
          <div className="flex items-center gap-2 text-warning">
            <Zap className="h-4 w-4 fill-current" />
            <p className="text-[10px] font-black uppercase tracking-wider">Total XP</p>
          </div>
          <p className="mt-1 text-2xl font-black">{xp.toLocaleString()}</p>
        </div>
      </div>

      {/* XP Boost status */}
      {boostActive ? (
        <section className="mt-4 overflow-hidden rounded-3xl border border-warning/30 bg-gradient-to-r from-warning/15 via-heart/10 to-warning/15 p-4 shadow-soft animate-pop">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-warning to-heart text-white shadow-glow">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-black">2× XP Boost active</p>
                <span className="rounded-full bg-warning px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                  2×
                </span>
              </div>
              <p className="text-xs font-bold text-muted-foreground">
                Ends in {formatRemaining(remainingMs)} — finish lessons fast!
              </p>
            </div>
          </div>
        </section>
      ) : (
        <Link
          to="/shop"
          className="mt-4 flex items-center gap-3 rounded-3xl border border-dashed border-border bg-card/60 p-4 transition-all hover:border-warning/40 hover:bg-warning/5"
        >
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-muted text-muted-foreground">
            <Zap className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-black">XP Boost off</p>
            <p className="text-xs text-muted-foreground">Activate 2× XP in the Shop</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Link>
      )}


      {/* Daily goal */}
      <section className="mt-4 rounded-3xl bg-card border border-border p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <p className="font-bold">Daily goal</p>
          <span className="text-sm font-bold text-muted-foreground">
            {dailyXp} / {dailyGoal} XP
          </span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full gradient-xp transition-all"
            style={{ width: `${(dailyXp / dailyGoal) * 100}%` }}
          />
        </div>
      </section>

      {/* Continue learning */}
      <section className="mt-5">
        <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-muted-foreground">
          Continue learning
        </h3>
        <Link
          to="/lesson/$lessonId"
          params={{ lessonId: nextLesson.id }}
          className="group block overflow-hidden rounded-3xl gradient-hero p-6 shadow-glow transition-transform hover:scale-[1.01]"
        >
          <p className="text-xs font-black uppercase tracking-widest text-white/80">
            {courseForUnit(target.unit.id)?.title ?? "Prompt Engineering"} · {currentLevel.title}
          </p>
          {isRecommendedStart && knowledgeLevel && knowledgeLevel !== "new" && (
            <span className="mt-2 inline-block rounded-full bg-white/25 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur">
              ⭐ Recommended for you — start here
            </span>
          )}
          <h3 className="mt-2 text-2xl font-black text-white">{nextLesson.title}</h3>
          <p className="mt-1 text-sm text-white/85">{target.unit.title}</p>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black text-white backdrop-blur">
                +{nextLesson.xp} XP
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black text-white backdrop-blur">
                +5 💎
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-black text-primary shadow-soft">
              Continue
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </Link>
      </section>

      {/* Your courses */}
      <section className="mt-6">
        <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-muted-foreground">
          Your courses
        </h3>
        <div className="space-y-3">
          {COURSES.map((c) => {
            const lessons = c.levels.flatMap((lv) => lv.units.flatMap((u) => u.lessons));
            const done = lessons.filter((l) => completed.includes(l.id)).length;
            const pct = Math.round((done / lessons.length) * 100);
            const recUnitId = recommendedUnitId(knowledgeLevel, !!premium, c.id);
            const recUnit = c.levels.flatMap((lv) => lv.units).find((u) => u.id === recUnitId);
            return (
              <Link
                key={c.id}
                to="/courses"
                className="block rounded-3xl border border-border bg-card p-4 shadow-soft transition-transform hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-black">{courseTitle(c, readingLevel)}</p>
                    <p className="text-xs text-muted-foreground">{c.subtitle}</p>
                  </div>
                  <span className="text-xs font-black text-muted-foreground">{pct}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full gradient-xp" style={{ width: `${pct}%` }} />
                </div>
                {recUnit && (
                  <p className="mt-2 text-[11px] font-bold text-primary">
                    ⭐ Start here: {recUnit.title}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Tip */}
      <section className="mt-5 flex items-start gap-3 rounded-3xl border border-primary/20 bg-primary/5 p-4">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-primary/12 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <p className="text-sm font-semibold text-foreground/90">{tip}</p>
      </section>

      {/* Quick links */}
      <section className="mt-5 grid grid-cols-2 gap-3">
        <Link to="/courses" className="rounded-2xl border border-border bg-card p-4 shadow-soft transition-transform hover:scale-[1.02]">
          <p className="text-2xl">🗺️</p>
          <p className="mt-1 text-sm font-black">Course Map</p>
          <p className="text-xs text-muted-foreground">Explore the journey</p>
        </Link>
        <Link to="/shop" className="rounded-2xl border border-border bg-card p-4 shadow-soft transition-transform hover:scale-[1.02]">
          <p className="text-2xl">🛍️</p>
          <p className="mt-1 text-sm font-black">Shop</p>
          <p className="text-xs text-muted-foreground">Spend your gems</p>
        </Link>
      </section>
    </AppShell>
  );
}
