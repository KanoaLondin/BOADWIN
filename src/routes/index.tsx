import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronRight, Sparkles, Flame, Zap } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { levels } from "@/lib/course-data";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "AIED — Home" },
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
  const currentLevel = levels[0];
  const allLessons = currentLevel.units.flatMap((u) => u.lessons);
  const nextLesson =
    allLessons.find((l) => !completed.includes(l.id)) ?? allLessons[0];
  const tip = TIPS[new Date().getDay() % TIPS.length];

  return (
    <AppShell>
      <section className="mt-2">
        <h2 className="text-3xl font-black text-foreground">
          Welcome back, {name}! 👋
        </h2>
        <p className="mt-1 text-muted-foreground">Ready for today's AI lesson?</p>
      </section>

      {/* Quick stats */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-card border border-border p-4 shadow-soft">
          <div className="flex items-center gap-2 text-warning">
            <Flame className="h-4 w-4 fill-current" />
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
            Prompt Engineering · {currentLevel.title}
          </p>
          <h3 className="mt-2 text-2xl font-black text-white">{nextLesson.title}</h3>
          <p className="mt-1 text-sm text-white/85">{currentLevel.units[0].title}</p>
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
