import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Flame, Zap, Settings, Crown, GraduationCap, Lock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Mascot } from "@/components/Mascot";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({ meta: [{ title: "Profile — AIED" }] }),
});

const badges = [
  { name: "First Prompt", earned: true, color: "bg-primary" },
  { name: "3-Day Streak", earned: true, color: "bg-warning" },
  { name: "Quiz Master", earned: true, color: "bg-cyan" },
  { name: "Wordsmith", earned: false, color: "bg-muted" },
  { name: "Night Owl", earned: false, color: "bg-muted" },
  { name: "Perfectionist", earned: false, color: "bg-muted" },
  { name: "Champion", earned: false, color: "bg-muted" },
  { name: "Master", earned: false, color: "bg-muted" },
];

function Profile() {
  return (
    <AppShell>
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Link to="/settings" className="rounded-xl border border-border bg-card p-2">
          <Settings className="h-5 w-5" />
        </Link>
      </header>

      <section className="mt-6 rounded-3xl gradient-card border border-border p-6 text-center shadow-card">
        <Mascot size={80} />
        <h2 className="mt-4 text-2xl font-bold">Alex Learner</h2>
        <p className="text-sm text-muted-foreground">Joined this week</p>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <Stat icon={<Zap className="h-4 w-4" />} value="1,240" label="Total XP" />
          <Stat icon={<Flame className="h-4 w-4" />} value="7" label="Day streak" />
          <Stat icon={<Crown className="h-4 w-4" />} value="L1" label="Beginner" />
        </div>
      </section>

      {/* Certificate */}
      <section className="mt-6 rounded-3xl border-2 border-dashed border-border p-6 text-center">
        <GraduationCap className="mx-auto h-10 w-10 text-muted-foreground" />
        <p className="mt-2 text-sm font-bold">AIED Certificate</p>
        <p className="text-xs text-muted-foreground">
          Reach Master level to unlock your certificate.
        </p>
        <Link
          to="/shop"
          className="mt-3 inline-block rounded-xl border border-border bg-card px-4 py-2 text-xs font-bold"
        >
          View pathway
        </Link>
      </section>

      <section className="mt-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Achievements
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {badges.map((b, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className={`relative grid h-16 w-16 place-items-center rounded-2xl ${b.color} ${
                  b.earned ? "shadow-card" : "opacity-50"
                }`}
              >
                {b.earned ? (
                  <Award className="h-8 w-8 text-white" />
                ) : (
                  <Lock className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <p className="text-center text-[10px] font-semibold leading-tight">{b.name}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl bg-background/40 p-3 backdrop-blur">
      <div className="mx-auto mb-1 grid h-7 w-7 place-items-center rounded-lg bg-primary/20 text-primary">
        {icon}
      </div>
      <p className="text-lg font-bold leading-none">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}
