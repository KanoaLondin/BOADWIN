import { createFileRoute } from "@tanstack/react-router";
import { Flame, Zap, Clock, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/parent")({
  component: ParentDash,
  head: () => ({ meta: [{ title: "Parent Dashboard — AIED" }] }),
});

const children = [
  { name: "Mia", age: 9, xp: 820, streak: 5, minutes: 42, level: "Beginner" },
  { name: "Eli", age: 12, xp: 1340, streak: 11, minutes: 88, level: "Elementary" },
];

function ParentDash() {
  return (
    <AppShell>
      <header>
        <p className="text-xs font-bold uppercase tracking-widest text-cyan">Family</p>
        <h1 className="text-3xl font-bold">Parent Dashboard</h1>
        <p className="text-sm text-muted-foreground">Track your kids' AI literacy journey</p>
      </header>

      <div className="mt-6 space-y-4">
        {children.map((c) => (
          <div key={c.name} className="rounded-3xl gradient-card border border-border p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold">{c.name}</p>
                <p className="text-xs text-muted-foreground">
                  Age {c.age} · {c.level}
                </p>
              </div>
              <span className="rounded-full bg-success/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-success">
                Active today
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <Mini icon={<Zap className="h-4 w-4" />} value={c.xp} label="XP" />
              <Mini icon={<Flame className="h-4 w-4" />} value={c.streak} label="Streak" />
              <Mini icon={<Clock className="h-4 w-4" />} value={`${c.minutes}m`} label="Week" />
            </div>

            <div className="mt-4 rounded-2xl bg-background/40 p-3">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <TrendingUp className="h-3 w-3" /> Weekly goal
                </span>
                <span className="font-bold">{c.minutes}/100 min</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full gradient-xp"
                  style={{ width: `${Math.min(100, c.minutes)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function Mini({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="rounded-xl bg-background/40 p-3 text-center">
      <div className="mx-auto mb-1 grid h-7 w-7 place-items-center rounded-lg bg-primary/20 text-primary">
        {icon}
      </div>
      <p className="font-bold">{value}</p>
      <p className="text-[10px] uppercase text-muted-foreground">{label}</p>
    </div>
  );
}
