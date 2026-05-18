import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Zap, ChevronRight, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { levels } from "@/lib/course-data";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "AIED — Home" },
      {
        name: "description",
        content:
          "Your daily AI literacy training. Build streaks, earn XP, master prompt engineering.",
      },
    ],
  }),
});

const TIPS = [
  "Tip of the day: Clear prompts get clear answers ✨",
  "Tip of the day: Add context — tell AI who you are and what you need 💡",
  "Tip of the day: Iterate! Your second prompt is usually better than your first 🔁",
  "Tip of the day: Specific beats vague every time 🎯",
];

function Home() {
  const userName = "Alex";
  const xp = 1240;
  const streak = 7;
  const dailyGoal = 50;
  const dailyXp = 30;
  const currentLevel = levels[0];
  const nextLesson = currentLevel.units[0].lessons[0];
  const tip = TIPS[new Date().getDay() % TIPS.length];

  return (
    <AppShell>
      {/* Top bar */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-black">
          <span className="text-gradient">AIED</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-warning/12 px-3 py-1.5 text-warning">
            <Flame className="h-4 w-4 fill-current" />
            <span className="text-sm font-black">{streak}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-xp/15 px-3 py-1.5 text-warning">
            <Zap className="h-4 w-4 fill-current" />
            <span className="text-sm font-black">{xp.toLocaleString()}</span>
          </div>
        </div>
      </header>

      {/* Greeting */}
      <section className="mt-8">
        <h2 className="text-3xl font-black text-foreground">
          Welcome back, {userName}! 👋
        </h2>
        <p className="mt-1 text-muted-foreground">Ready for today's AI lesson?</p>
      </section>

      {/* Daily goal */}
      <section className="mt-6 rounded-3xl bg-card border border-border p-5 shadow-soft">
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
      <section className="mt-6">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
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
                ~5 min
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-black text-primary shadow-soft">
              Continue
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </Link>
      </section>

      {/* Tip of the day */}
      <section className="mt-6 flex items-start gap-3 rounded-3xl border border-primary/20 bg-primary/5 p-4">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-primary/12 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <p className="text-sm font-semibold text-foreground/90">{tip}</p>
      </section>
    </AppShell>
  );
}
