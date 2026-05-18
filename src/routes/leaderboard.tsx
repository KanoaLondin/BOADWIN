import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, Flame, Crown, ArrowUp, ArrowDown, Minus, Clock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useAppState } from "@/lib/app-state";
import { FRIENDS } from "@/lib/friends";

export const Route = createFileRoute("/leaderboard")({
  component: Leaderboard,
  head: () => ({ meta: [{ title: "Leaderboard — AIED" }] }),
});

type Row = { id?: string; name: string; xp: number; streak: number; you?: boolean; trend: "up" | "down" | "same" };

const TRENDS: Record<string, Row["trend"]> = {
  maya: "same", diego: "up", aisha: "down", liam: "up", sofia: "same", noah: "down", ivy: "up",
};
const RIVALS: Row[] = FRIENDS.map((f) => ({ id: f.id, name: f.name, xp: f.xp, streak: f.streak, trend: TRENDS[f.id] ?? "same" }));

const TIERS = [
  { name: "Bronze",   icon: "🥉", color: "from-amber-600 to-amber-300" },
  { name: "Silver",   icon: "🥈", color: "from-slate-400 to-slate-200" },
  { name: "Gold",     icon: "🥇", color: "from-yellow-500 to-amber-200" },
  { name: "Sapphire", icon: "💎", color: "from-sky-500 to-cyan-300" },
  { name: "Diamond",  icon: "💠", color: "from-purple to-cyan" },
];

function Leaderboard() {
  const userName = useAppState((s) => s.name);
  const userXp = useAppState((s) => s.xp);
  const userStreak = useAppState((s) => s.streak);

  const you: Row = { name: userName, xp: userXp, streak: userStreak, you: true, trend: "up" };
  const all: Row[] = [...RIVALS, you].sort((a, b) => b.xp - a.xp);

  const tier = TIERS[2]; // Gold sample

  const top3 = all.slice(0, 3);
  const rest = all.slice(3);

  // Days left until next Sunday
  const now = new Date();
  const daysLeft = (7 - now.getDay()) % 7 || 7;

  return (
    <AppShell>
      <header className="text-center">
        <div
          className={`mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br ${tier.color} shadow-glow`}
        >
          <Trophy className="h-10 w-10 text-white drop-shadow" />
        </div>
        <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          {tier.icon} {tier.name} League
        </p>
        <h1 className="mt-1 text-3xl font-black">Weekly Leaderboard</h1>
        <p className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-muted-foreground">
          <Clock className="h-3 w-3" /> {daysLeft}d left · Top 3 advance to Sapphire
        </p>
      </header>

      {/* Podium */}
      <section className="mt-6 grid grid-cols-3 items-end gap-2">
        {[top3[1], top3[0], top3[2]].map((p, i) => {
          if (!p) return <div key={i} />;
          const place = i === 1 ? 1 : i === 0 ? 2 : 3;
          const heights = ["h-20", "h-28", "h-16"];
          const colors = [
            "from-slate-300 to-slate-100",
            "from-warning to-amber-200",
            "from-amber-600/70 to-amber-400/60",
          ];
          const inner = (
            <>
              {place === 1 && <Crown className="mb-1 h-5 w-5 text-warning fill-current animate-twinkle" />}
              <div
                className={`grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br text-xl font-black text-white shadow-glow ${
                  p.you ? "from-primary to-cyan ring-4 ring-primary/40" : "from-purple to-cyan"
                }`}
              >
                {p.name[0]}
              </div>
              <p className="mt-1.5 truncate max-w-[80px] text-center text-[11px] font-black">
                {p.you ? "You" : p.name}
              </p>
              <p className="text-[10px] font-bold text-warning">{p.xp.toLocaleString()} XP</p>
              <div
                className={`mt-1.5 w-full rounded-t-xl bg-gradient-to-b ${colors[i]} ${heights[i]} flex items-start justify-center pt-1.5 text-sm font-black text-white drop-shadow`}
              >
                {place}
              </div>
            </>
          );
          return p.id && !p.you ? (
            <Link key={p.name + i} to="/friend/$friendId" params={{ friendId: p.id }} className="flex flex-col items-center">
              {inner}
            </Link>
          ) : (
            <div key={p.name + i} className="flex flex-col items-center">{inner}</div>
          );
        })}
      </section>

      {/* Divider */}
      <div className="mt-6 mb-2 flex items-center gap-2">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          The pack
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Rest of list */}
      <div className="space-y-2">
        {rest.map((u, i) => {
          const rank = i + 4;
          return (
            <div
              key={u.name}
              className={`flex items-center gap-3 rounded-2xl border-2 p-3 transition-all ${
                u.you
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border bg-card"
              }`}
            >
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-sm font-black text-muted-foreground">
                {rank}
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-full gradient-hero text-sm font-black text-white">
                {u.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-black">{u.you ? "You" : u.name}</p>
                <p className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <Flame className="h-3 w-3 text-warning" /> {u.streak} day streak
                </p>
              </div>
              <TrendArrow trend={u.trend} />
              <div className="text-right">
                <p className="text-sm font-black text-warning">{u.xp.toLocaleString()}</p>
                <p className="text-[9px] uppercase text-muted-foreground">XP</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Promotion legend */}
      <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[10px] font-black uppercase">
        <div className="rounded-2xl border border-success/30 bg-success/10 p-2 text-success">
          🟢 Top 3 promote
        </div>
        <div className="rounded-2xl border border-border bg-card p-2 text-muted-foreground">
          ⚪ Middle holds
        </div>
        <div className="rounded-2xl border border-heart/30 bg-heart/10 p-2 text-heart">
          🔴 Bottom 3 drop
        </div>
      </div>
    </AppShell>
  );
}

function TrendArrow({ trend }: { trend: "up" | "down" | "same" }) {
  if (trend === "up")
    return <ArrowUp className="h-4 w-4 text-success" />;
  if (trend === "down")
    return <ArrowDown className="h-4 w-4 text-heart" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
}
