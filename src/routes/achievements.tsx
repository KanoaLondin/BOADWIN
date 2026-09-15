import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/achievements")({
  component: AchievementsPage,
  head: () => ({ meta: [{ title: "Achievements — Boadwin" }] }),
});

type Achievement = {
  id: string;
  emoji: string;
  name: string;
  description: string;
  category: "Streak" | "Completion" | "Skill" | "Social" | "Special";
  earned: boolean;
  progress?: { current: number; goal: number };
};

const achievements: Achievement[] = [
  // Streak
  { id: "spark", emoji: "🔥", name: "Spark", description: "Complete a 3 day streak", category: "Streak", earned: true },
  { id: "fire-starter", emoji: "🔥", name: "Fire Starter", description: "Complete a 7 day streak", category: "Streak", earned: true },
  { id: "flame-keeper", emoji: "🔥", name: "Flame Keeper", description: "Complete a 30 day streak", category: "Streak", earned: false, progress: { current: 7, goal: 30 } },
  { id: "inferno", emoji: "🔥", name: "Inferno", description: "Complete a 100 day streak", category: "Streak", earned: false, progress: { current: 7, goal: 100 } },
  { id: "eternal-flame", emoji: "🔥", name: "Eternal Flame", description: "Complete a 365 day streak", category: "Streak", earned: false, progress: { current: 7, goal: 365 } },
  // Completion
  { id: "first-step", emoji: "⭐", name: "First Step", description: "Complete your first lesson", category: "Completion", earned: true },
  { id: "unit-master", emoji: "🎯", name: "Unit Master", description: "Complete an entire unit", category: "Completion", earned: false, progress: { current: 2, goal: 5 } },
  { id: "level-up", emoji: "🏆", name: "Level Up", description: "Advance to the next skill level", category: "Completion", earned: false },
  { id: "perfectionist", emoji: "💎", name: "Perfectionist", description: "Complete a lesson with zero mistakes", category: "Completion", earned: false },
  { id: "speed-demon", emoji: "🚀", name: "Speed Demon", description: "Complete a lesson in under 2 minutes", category: "Completion", earned: false },
  // Skill
  { id: "ai-curious", emoji: "🤖", name: "AI Curious", description: "Complete the What is AI unit", category: "Skill", earned: false, progress: { current: 1, goal: 5 } },
  { id: "prompt-rookie", emoji: "✍️", name: "Prompt Rookie", description: "Write your first prompt", category: "Skill", earned: true },
  { id: "prompt-thinker", emoji: "🧠", name: "Prompt Thinker", description: "Complete Prompt Basics", category: "Skill", earned: false },
  { id: "prompt-engineer", emoji: "⚡", name: "Prompt Engineer", description: "Complete the Intermediate level", category: "Skill", earned: false },
  { id: "prompt-master", emoji: "🌟", name: "Prompt Master", description: "Complete the Advanced level", category: "Skill", earned: false },
  { id: "aied-elite", emoji: "👑", name: "Boadwin Elite", description: "Complete all levels and earn certificate", category: "Skill", earned: false },
  // Social
  { id: "family-first", emoji: "👨‍👩‍👧", name: "Family First", description: "Join on a family plan", category: "Social", earned: false },
  { id: "top-10", emoji: "🏅", name: "Top 10", description: "Reach top 10 on the leaderboard", category: "Social", earned: false, progress: { current: 42, goal: 10 } },
  { id: "weekly-champ", emoji: "🥇", name: "Weekly Champion", description: "Finish #1 on weekly leaderboard", category: "Social", earned: false },
  // Special
  { id: "night-owl", emoji: "🌙", name: "Night Owl", description: "Complete a lesson after midnight", category: "Special", earned: false },
  { id: "early-bird", emoji: "🌅", name: "Early Bird", description: "Complete a lesson before 7am", category: "Special", earned: false },
  { id: "comeback-kid", emoji: "💪", name: "Comeback Kid", description: "Return after a 7 day absence", category: "Special", earned: false },
  { id: "scholar", emoji: "🎓", name: "Scholar", description: "Earn your first certificate", category: "Special", earned: false },
  { id: "unlocked", emoji: "🔑", name: "Unlocked", description: "Upgrade to premium", category: "Special", earned: false },
  { id: "world-changer", emoji: "🌍", name: "World Changer", description: "Share your certificate on LinkedIn", category: "Special", earned: false },
];

const categories: Achievement["category"][] = ["Streak", "Completion", "Skill", "Social", "Special"];

function AchievementsPage() {
  const earnedCount = achievements.filter((a) => a.earned).length;
  const frame = useAppState((s) => s.badgeFrame);

  return (
    <AppShell>
      <header>
        <h1 className="text-3xl font-black">Achievements</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {earnedCount} of {achievements.length} earned
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full gradient-hero"
            style={{ width: `${(earnedCount / achievements.length) * 100}%` }}
          />
        </div>
      </header>

      {categories.map((cat) => {
        const items = achievements.filter((a) => a.category === cat);
        return (
          <section key={cat} className="mt-8">
            <h2 className="mb-3 text-sm font-black uppercase tracking-wider text-muted-foreground">
              {cat}
            </h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {items.map((a) => (
                <BadgeCard key={a.id} a={a} frame={frame} />
              ))}
            </div>
          </section>
        );
      })}
    </AppShell>
  );
}

function BadgeCard({ a, frame }: { a: Achievement; frame: string }) {
  const frameClass = frame && frame !== "none" ? `frame-${frame}` : "";
  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-2xl border p-3 text-center shadow-soft ${
        a.earned ? "border-primary/30 bg-card" : "border-border bg-muted/40"
      }`}
    >
      <div
        className={`relative grid h-16 w-16 place-items-center rounded-full text-3xl ${frameClass} ${
          a.earned ? "gradient-hero shadow-glow" : "bg-muted"
        } ${!a.earned ? "opacity-90" : ""}`}
      >
        {a.earned ? (
          <span className="drop-shadow-sm">{a.emoji}</span>
        ) : (
          <>
            <span className="opacity-30 grayscale">{a.emoji}</span>
            <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-card border border-border z-10">
              <Lock className="h-3 w-3 text-muted-foreground" />
            </span>
          </>
        )}
      </div>
      <p className={`text-[11px] font-black leading-tight ${a.earned ? "" : "text-muted-foreground"}`}>
        {a.name}
      </p>
      <p className="text-[10px] leading-snug text-muted-foreground">{a.description}</p>
      {!a.earned && a.progress && (
        <div className="w-full">
          <div className="h-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary"
              style={{
                width: `${Math.min(100, (a.progress.current / a.progress.goal) * 100)}%`,
              }}
            />
          </div>
          <p className="mt-1 text-[9px] font-bold text-muted-foreground">
            {a.progress.current}/{a.progress.goal}
          </p>
        </div>
      )}
    </div>
  );
}
