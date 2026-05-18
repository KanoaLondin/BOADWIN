import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Flame, Crown, Medal } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/leaderboard")({
  component: Leaderboard,
  head: () => ({ meta: [{ title: "Leaderboard — AIED" }] }),
});

const users = [
  { name: "Maya P.", xp: 4820, streak: 32, you: false },
  { name: "Diego R.", xp: 4310, streak: 18, you: false },
  { name: "Aisha K.", xp: 3990, streak: 25, you: false },
  { name: "You", xp: 1240, streak: 7, you: true },
  { name: "Liam T.", xp: 1120, streak: 4, you: false },
  { name: "Sofia M.", xp: 980, streak: 11, you: false },
  { name: "Noah J.", xp: 720, streak: 2, you: false },
  { name: "Ivy W.", xp: 510, streak: 5, you: false },
];

function Leaderboard() {
  const sorted = [...users].sort((a, b) => b.xp - a.xp);
  return (
    <AppShell>
      <header className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl gradient-hero shadow-glow">
          <Trophy className="h-8 w-8 text-white" />
        </div>
        <h1 className="mt-3 text-3xl font-bold">Weekly League</h1>
        <p className="text-sm text-muted-foreground">3 days left · Top 3 advance</p>
      </header>

      <div className="mt-6 space-y-2">
        {sorted.map((u, i) => {
          const rank = i + 1;
          return (
            <div
              key={u.name}
              className={`flex items-center gap-3 rounded-2xl border p-3 transition-all ${
                u.you
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border bg-card"
              }`}
            >
              <div
                className={`grid h-10 w-10 place-items-center rounded-xl font-bold ${
                  rank === 1
                    ? "bg-warning text-navy-deep"
                    : rank === 2
                    ? "bg-muted text-foreground"
                    : rank === 3
                    ? "bg-heart/30 text-heart"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {rank <= 3 ? <Medal className="h-5 w-5" /> : rank}
              </div>
              <div className="flex-1">
                <p className="font-bold">{u.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <Flame className="h-3 w-3 text-warning" /> {u.streak} day streak
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-xp">{u.xp.toLocaleString()}</p>
                <p className="text-[10px] uppercase text-muted-foreground">XP</p>
              </div>
              {rank === 1 && <Crown className="h-5 w-5 text-warning" />}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
