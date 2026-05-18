import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Flame, Zap, Settings, Crown, GraduationCap, Lock, Share2, Pencil, Trophy,
  Sparkles, Award,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Mascot } from "@/components/Mascot";
import { useAppState, equipOutfit, ownOutfit, spendGems } from "@/lib/app-state";
import { levels } from "@/lib/course-data";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({ meta: [{ title: "Profile — AIED" }] }),
});

const OUTFITS = [
  { id: "classic",   name: "Classic",   emoji: "🤖", price: 0 },
  { id: "scientist", name: "Scientist", emoji: "🥽", price: 100 },
  { id: "astronaut", name: "Astronaut", emoji: "🚀", price: 150 },
  { id: "wizard",    name: "Wizard",    emoji: "🧙", price: 200 },
];

const BADGE_PREVIEW = [
  { name: "First Prompt",   icon: "🎯", color: "from-purple/30 to-cyan/30", earned: true },
  { name: "3-Day Streak",   icon: "🔥", color: "from-warning/30 to-heart/30", earned: true },
  { name: "Quiz Master",    icon: "🧠", color: "from-cyan/30 to-purple/30",  earned: true },
  { name: "Wordsmith",      icon: "✍️", color: "from-success/30 to-cyan/30", earned: false },
  { name: "Night Owl",      icon: "🌙", color: "from-purple/30 to-purple/40", earned: false },
  { name: "Perfectionist",  icon: "💎", color: "from-cyan/30 to-success/30", earned: false },
  { name: "Champion",       icon: "🏆", color: "from-warning/30 to-purple/30", earned: false },
  { name: "AIED Elite",     icon: "👑", color: "from-warning/40 to-warning/20", earned: false },
];

function Profile() {
  const name = useAppState((s) => s.name);
  const xp = useAppState((s) => s.xp);
  const streak = useAppState((s) => s.streak);
  const gems = useAppState((s) => s.gems);
  const ageGroup = useAppState((s) => s.ageGroup);
  const completed = useAppState((s) => s.completedLessons);
  const outfit = useAppState((s) => s.alOutfit);
  const owned = useAppState((s) => s.ownedOutfits);

  // Determine current level/tier
  const totalLessons = levels.flatMap((l) => l.units.flatMap((u) => u.lessons)).length;
  const certProgress = Math.min(100, Math.round((completed.length / totalLessons) * 100));
  const currentLevel =
    [...levels].reverse().find((lv) =>
      lv.units.some((u) => u.lessons.some((l) => completed.includes(l.id))),
    ) ?? levels[0];

  function handleEquip(id: string, price: number) {
    if (owned.includes(id)) {
      equipOutfit(id);
    } else if (spendGems(price)) {
      ownOutfit(id);
      equipOutfit(id);
    }
  }

  return (
    <AppShell>
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Profile</h1>
        <div className="flex gap-2">
          <button className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card">
            <Share2 className="h-4 w-4" />
          </button>
          <Link to="/settings" className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card">
            <Settings className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Hero card */}
      <section className="mt-5 overflow-hidden rounded-3xl border-2 border-border bg-gradient-to-br from-purple/15 via-card to-cyan/15 p-6 text-center shadow-card">
        <div className="relative mx-auto w-fit">
          <Mascot size={88} outfit={outfit} />
          <button
            aria-label="Edit"
            className="absolute -bottom-1 right-0 grid h-7 w-7 place-items-center rounded-full bg-card border border-border shadow-soft"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>
        <h2 className="mt-4 text-2xl font-black">{name}</h2>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {currentLevel.badge} · {ageGroup}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat icon={<Zap className="h-4 w-4" />} value={xp.toLocaleString()} label="Total XP" />
          <Stat icon={<Flame className="h-4 w-4" />} value={streak} label="Day streak" />
          <Stat icon={<Crown className="h-4 w-4" />} value={`💎 ${gems}`} label="Gems" />
        </div>
      </section>

      {/* AL outfits */}
      <section className="mt-5 rounded-3xl border-2 border-border bg-card p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-black">AL's wardrobe</p>
            <p className="text-[11px] text-muted-foreground">Tap to equip · Unlock with gems</p>
          </div>
          <Sparkles className="h-5 w-5 text-warning" />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {OUTFITS.map((o) => {
            const isOwned = owned.includes(o.id);
            const isEquipped = outfit === o.id;
            return (
              <button
                key={o.id}
                onClick={() => handleEquip(o.id, o.price)}
                className={`group relative flex flex-col items-center gap-1 rounded-2xl border-2 p-2 transition-all ${
                  isEquipped
                    ? "border-primary bg-primary/10 shadow-glow"
                    : "border-border bg-background/40 hover:border-primary/50"
                }`}
              >
                <span className="text-2xl">{o.emoji}</span>
                <span className="text-[10px] font-black">{o.name}</span>
                {!isOwned ? (
                  <span className="rounded-full bg-cyan/15 px-1.5 py-0.5 text-[9px] font-black text-cyan">
                    💎 {o.price}
                  </span>
                ) : isEquipped ? (
                  <span className="rounded-full bg-success/15 px-1.5 py-0.5 text-[9px] font-black text-success">
                    Equipped
                  </span>
                ) : (
                  <span className="text-[9px] font-bold text-muted-foreground">Owned</span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Certificate progress */}
      <section className="mt-5 overflow-hidden rounded-3xl border-2 border-warning/40 bg-gradient-to-br from-warning/15 via-card to-warning/5 p-5 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-warning/20">
            <GraduationCap className="h-6 w-6 text-warning" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-black">AIED Prompt Engineering Certificate</p>
            <p className="text-[11px] text-muted-foreground">
              {completed.length} of {totalLessons} lessons complete
            </p>
          </div>
          <span className="text-2xl font-black text-warning">{certProgress}%</span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-warning to-amber-300 transition-all"
            style={{ width: `${certProgress}%` }}
          />
        </div>
        <Link
          to="/courses"
          className="mt-4 block rounded-2xl border-2 border-warning/40 bg-card px-4 py-2.5 text-center text-xs font-black text-warning"
        >
          Continue your pathway →
        </Link>
      </section>

      {/* Achievements preview */}
      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">
            <Trophy className="-mt-0.5 mr-1 inline h-3.5 w-3.5 text-warning" /> Achievements
          </h3>
          <Link to="/achievements" className="text-xs font-black text-primary">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {BADGE_PREVIEW.map((b) => (
            <div key={b.name} className="flex flex-col items-center gap-1.5">
              <div
                className={`relative grid h-16 w-16 place-items-center rounded-2xl border-2 ${
                  b.earned
                    ? `border-warning bg-gradient-to-br ${b.color} shadow-card`
                    : "border-border bg-muted opacity-60"
                }`}
              >
                {b.earned ? (
                  <span className="text-2xl">{b.icon}</span>
                ) : (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                )}
                {b.earned && (
                  <Award className="absolute -right-1 -top-1 h-4 w-4 text-warning fill-current" />
                )}
              </div>
              <p className="text-center text-[10px] font-bold leading-tight">{b.name}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function Stat({
  icon, value, label,
}: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="rounded-xl bg-background/50 p-3 backdrop-blur">
      <div className="mx-auto mb-1 grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary">
        {icon}
      </div>
      <p className="text-base font-black leading-none">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}
