import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Zap, Trophy, Award, ChevronRight, Target, Crown } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Mascot } from "@/components/Mascot";
import { levels } from "@/lib/course-data";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "AIED — Home" },
      { name: "description", content: "Your daily AI literacy training. Build streaks and earn XP." },
    ],
  }),
});

function Home() {
  const xp = 1240;
  const streak = 7;
  const dailyGoal = 50;
  const dailyXp = 30;
  const currentLevel = levels[0];
  const nextLesson = currentLevel.units[0].lessons[0];

  return (
    <AppShell>
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Welcome back
          </p>
          <h1 className="text-3xl font-bold">
            <span className="text-gradient">AIED</span>
          </h1>
          <p className="text-xs text-muted-foreground">Saving futures through AI literacy</p>
        </div>
        <Mascot />
      </header>

      {/* Stats row */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatChip icon={<Flame className="h-4 w-4" />} value={streak} label="Day streak" tone="warning" />
        <StatChip icon={<Zap className="h-4 w-4" />} value={xp} label="Total XP" tone="xp" />
        <StatChip icon={<Crown className="h-4 w-4" />} value="L1" label="Beginner" tone="primary" />
      </div>

      {/* Daily goal */}
      <section className="mt-6 rounded-3xl gradient-card p-5 shadow-card border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-cyan" />
            <h2 className="font-bold">Daily Goal</h2>
          </div>
          <span className="text-sm text-muted-foreground">
            {dailyXp} / {dailyGoal} XP
          </span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full gradient-xp transition-all"
            style={{ width: `${(dailyXp / dailyGoal) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          20 XP to go — finish a lesson to hit your goal!
        </p>
      </section>

      {/* Current course */}
      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Continue learning
        </h2>
        <Link
          to="/lesson/$lessonId"
          params={{ lessonId: nextLesson.id }}
          className="group block overflow-hidden rounded-3xl gradient-hero p-6 shadow-glow"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                Prompt Engineering · Level 1
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">{nextLesson.title}</h3>
              <p className="mt-1 text-sm text-white/80">{currentLevel.units[0].title}</p>
            </div>
            <ChevronRight className="h-6 w-6 text-white transition-transform group-hover:translate-x-1" />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur">
              +{nextLesson.xp} XP
            </div>
            <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur">
              5 min
            </div>
          </div>
        </Link>
      </section>

      {/* Quick actions */}
      <section className="mt-6 grid grid-cols-2 gap-3">
        <Link
          to="/leaderboard"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-glow"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-warning/15 text-warning">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold">Leaderboard</p>
            <p className="text-xs text-muted-foreground">Rank #42</p>
          </div>
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-glow"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold">Achievements</p>
            <p className="text-xs text-muted-foreground">3 badges earned</p>
          </div>
        </Link>
      </section>

      {/* Badges */}
      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Recent badges
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[
            { name: "First Prompt", color: "bg-primary" },
            { name: "3-Day Streak", color: "bg-warning" },
            { name: "Quiz Master", color: "bg-cyan" },
            { name: "Locked", color: "bg-muted", locked: true },
            { name: "Locked", color: "bg-muted", locked: true },
          ].map((b, i) => (
            <div key={i} className="flex w-20 shrink-0 flex-col items-center gap-2">
              <div
                className={`grid h-16 w-16 place-items-center rounded-2xl ${b.color} ${
                  b.locked ? "opacity-40" : "shadow-card"
                }`}
              >
                <Award className="h-8 w-8 text-white" />
              </div>
              <p className="text-center text-[10px] font-semibold text-muted-foreground">
                {b.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function StatChip({
  icon,
  value,
  label,
  tone,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  tone: "warning" | "xp" | "primary";
}) {
  const toneClass = {
    warning: "text-warning bg-warning/15",
    xp: "text-xp bg-xp/15",
    primary: "text-primary bg-primary/15",
  }[tone];
  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <div className={`mb-1 inline-flex h-7 w-7 items-center justify-center rounded-lg ${toneClass}`}>
        {icon}
      </div>
      <p className="text-lg font-bold leading-none">{value}</p>
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
