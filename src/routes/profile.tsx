import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, Settings, GraduationCap, Lock, Share2, Pencil, Trophy, Sparkles, Award, Crown, ChevronRight, ShoppingBag } from "lucide-react";
import { StreakFlame } from "@/components/StreakFlame";
import { AppShell } from "@/components/AppShell";
import { Mascot } from "@/components/Mascot";
import { LevelBadge } from "@/components/LevelBadge";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import {
  useAppState, equipOutfit, equipStreakColor, equipProfileBg, equipBadgeFrame,
} from "@/lib/app-state";
import { certificateProgress, courseTitle, masteryProgress } from "@/lib/course-data";
import { getLevelInfo, getProgressToNext } from "@/lib/level-system";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({ meta: [{ title: "Profile — Boadwin" }] }),
});

const ALL_OUTFITS = [
  { id: "classic",   name: "Classic",   emoji: "🤖" },
  { id: "scientist", name: "Scientist", emoji: "🥽" },
  { id: "teacher",   name: "Teacher",   emoji: "🎓" },
  { id: "astronaut", name: "Astronaut", emoji: "🚀" },
  { id: "ninja",     name: "Ninja",     emoji: "🥷" },
  { id: "wizard",    name: "Wizard",    emoji: "🧙" },
];

const PLAN_LABEL: Record<string, string> = {
  super: "Super Boadwin",
  max: "Boadwin Max",
  family: "Boadwin Family",
};

function Profile() {
  const name = useAppState((s) => s.name);
  const xp = useAppState((s) => s.xp);
  const streak = useAppState((s) => s.streak);
  const gems = useAppState((s) => s.gems);
  const ageGroup = useAppState((s) => s.ageGroup);
  const completed = useAppState((s) => s.completedLessons);
  const outfit = useAppState((s) => s.alOutfit);
  const owned = useAppState((s) => s.ownedOutfits);
  const premium = useAppState((s) => s.premium);
  const renewal = useAppState((s) => s.premiumRenewalISO);
  const profileBg = useAppState((s) => s.profileBg);
  const ownedBgs = useAppState((s) => s.ownedProfileBgs);
  const streakColor = useAppState((s) => s.streakColor);
  const ownedStreaks = useAppState((s) => s.ownedStreakColors);
  const badgeFrame = useAppState((s) => s.badgeFrame);
  const ownedFrames = useAppState((s) => s.ownedBadgeFrames);
  const streakFreezes = useAppState((s) => s.streakFreezes);
  const heartRefills = useAppState((s) => s.heartRefills);
  const skipTokens = useAppState((s) => s.skipTokens);
  const hintTokens = useAppState((s) => s.hintTokens);

  const readingLevel = useAppState((s) => s.readingLevel);
  const certificates = certificateProgress(completed);
  const mastery = masteryProgress(completed);
  const userLevel = getLevelInfo(xp);
  const lvlProgress = getProgressToNext(xp);
  const planName = premium ? PLAN_LABEL[premium] : "Free";
  const renewalDate = renewal ? new Date(renewal).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : null;

  return (
    <AppShell>
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Profile</h1>
        <div className="flex gap-2">
          <button className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card"><Share2 className="h-4 w-4" /></button>
          <Link to="/settings" className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card"><Settings className="h-4 w-4" /></Link>
        </div>
      </header>

      {/* Subscription card */}
      <Link
        to="/subscription"
        className={`mt-5 flex items-center justify-between gap-3 rounded-3xl border-2 p-4 shadow-soft ${
          premium ? "border-primary bg-gradient-to-br from-primary/15 to-cyan/10" : "border-border bg-card"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-hero text-white shadow-glow">
            <Crown className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Plan</p>
            <p className="text-lg font-black">{planName}</p>
            {renewalDate ? (
              <p className="text-[11px] text-muted-foreground">Renews {renewalDate}</p>
            ) : (
              <p className="text-[11px] text-muted-foreground">Unlock more with Super Boadwin</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-black text-primary-foreground">
          Manage <ChevronRight className="h-3 w-3" />
        </div>
      </Link>

      {/* Hero card */}
      <section className={`relative mt-4 overflow-hidden rounded-3xl border-2 border-border p-6 text-center shadow-card ${profileBg === "none" ? "bg-gradient-to-br from-purple/15 via-card to-cyan/15" : ""}`}>
        {profileBg !== "none" && <AnimatedBackground variant={profileBg} contained />}
        <div className="relative">
          <div className="relative mx-auto w-fit">
            <Mascot size={88} outfit={outfit} />
            <button aria-label="Edit" className="absolute -bottom-1 right-0 grid h-7 w-7 place-items-center rounded-full bg-card border border-border shadow-soft">
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
          <h2 className={`mt-4 text-2xl font-black ${profileBg !== "none" ? "text-white drop-shadow" : ""}`}>{name}</h2>
          <div className="mt-1 flex items-center justify-center gap-2">
            <LevelBadge xp={xp} />
            <p className={`text-xs font-bold uppercase tracking-widest ${profileBg !== "none" ? "text-white/90" : "text-muted-foreground"}`}>
              {userLevel.name} · {ageGroup}
            </p>
          </div>
          {/* Level progress */}
          <div className={`mx-auto mt-3 max-w-xs rounded-full px-3 py-1 text-[10px] font-bold ${profileBg !== "none" ? "bg-white/20 text-white backdrop-blur" : "bg-muted text-muted-foreground"}`}>
            {lvlProgress.current}/{lvlProgress.needed} XP to next level
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Stat icon={<Zap className="h-4 w-4" />} value={xp.toLocaleString()} label="Total XP" />
            <Stat icon={<StreakFlame className="h-4 w-4" />} value={streak} label="Day streak" />
            <Stat icon={<Sparkles className="h-4 w-4" />} value={`💎 ${gems}`} label="Gems" />
          </div>
        </div>
      </section>

      {/* Inventory */}
      <section className="mt-5 rounded-3xl border border-border bg-card p-5 shadow-soft">
        <p className="text-sm font-black uppercase tracking-wider text-muted-foreground">Inventory</p>
        <div className="mt-3 grid grid-cols-4 gap-2 text-center">
          <Inv emoji="❄️" label="Freeze" value={streakFreezes} />
          <Inv emoji="❤️" label="Refills" value={heartRefills} />
          <Inv emoji="🎯" label="Skips" value={skipTokens} />
          <Inv emoji="💡" label="Hints" value={hintTokens} />
        </div>
      </section>

      {/* AL outfits */}
      <section className="mt-5 rounded-3xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-black">AL's wardrobe</p>
            <p className="text-[11px] text-muted-foreground">Tap to equip. Buy more in the Shop.</p>
          </div>
          <Link
            to="/wardrobe"
            className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-black text-primary-foreground shadow-soft"
          >
            Open Wardrobe →
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-6 gap-2">
          {ALL_OUTFITS.map((o) => {
            const isOwned = owned.includes(o.id);
            const isEquipped = outfit === o.id;
            return (
              <button
                key={o.id}
                disabled={!isOwned}
                onClick={() => equipOutfit(o.id)}
                className={`relative flex flex-col items-center gap-1 rounded-2xl border-2 p-2 transition-all ${
                  isEquipped ? "border-primary bg-primary/10" : isOwned ? "border-border" : "border-border opacity-40"
                }`}
              >
                <span className="text-xl">{o.emoji}</span>
                <span className="text-[9px] font-black">{o.name}</span>
                {isEquipped && <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-success text-[8px] text-white">✓</span>}
                {!isOwned && <Lock className="absolute right-1 top-1 h-3 w-3 text-muted-foreground" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Cosmetic selectors */}
      <section className="mt-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
        <p className="text-sm font-black">Cosmetics</p>

        <p className="mt-3 text-[10px] font-black uppercase text-muted-foreground">Profile background</p>
        <div className="mt-2 grid grid-cols-7 gap-2">
          {(["none","galaxy","forest","ocean","mountains","city","abstract"] as const).map((b) => {
            const isOwned = ownedBgs.includes(b);
            const isOn = profileBg === b;
            return (
              <button key={b} disabled={!isOwned} onClick={() => equipProfileBg(b)} className={`relative h-10 rounded-xl border-2 ${isOn ? "border-primary" : "border-border"} ${b === "none" ? "bg-muted" : `bg-${b}`} ${!isOwned && "opacity-40"}`} title={b}>
                {isOn && <span className="absolute inset-0 grid place-items-center text-white drop-shadow">✓</span>}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-[10px] font-black uppercase text-muted-foreground">Badge frame</p>
        <div className="mt-2 grid grid-cols-6 gap-2">
          {(["none","gold","neon","rainbow","fire","ice"] as const).map((f) => {
            const isOwned = ownedFrames.includes(f);
            const isOn = badgeFrame === f;
            return (
              <button key={f} disabled={!isOwned} onClick={() => equipBadgeFrame(f)} className={`grid h-10 place-items-center rounded-xl border-2 bg-card text-xs font-black uppercase ${isOn ? "border-primary" : "border-border"} ${f !== "none" ? `frame-${f}` : ""} ${!isOwned && "opacity-40"}`}>
                {f === "none" ? "—" : f[0]}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-[10px] font-black uppercase text-muted-foreground">Streak color</p>
        <div className="mt-2 grid grid-cols-5 gap-2">
          {(["orange","blue","purple","green","rainbow"] as const).map((c) => {
            const isOwned = ownedStreaks.includes(c);
            const isOn = streakColor === c;
            return (
              <button key={c} disabled={!isOwned} onClick={() => equipStreakColor(c)} className={`grid h-10 place-items-center rounded-xl border-2 ${isOn ? "border-primary" : "border-border"} bg-card text-xl ${!isOwned && "opacity-40"}`}>
                <StreakFlame className="h-5 w-5" color={c} />
              </button>
            );
          })}
        </div>
      </section>

      {/* Certificates — one per course */}
      <section className="mt-5">
        <h2 className="mb-3 text-sm font-black uppercase tracking-wider text-muted-foreground">Certificates</h2>
        <div className="space-y-3">
          {/* Top-tier: app-wide mastery certificate */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-warning bg-gradient-to-br from-warning/30 via-amber-200/20 to-primary/15 p-5 shadow-glow">
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-warning/20 blur-2xl" />
            <div className="relative flex items-center gap-3">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-warning text-white shadow-glow">
                <Crown className="h-7 w-7" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-warning">Top tier</p>
                <p className="truncate text-base font-black">Boadwin Mastery Certificate</p>
                <p className="text-[11px] text-muted-foreground">
                  {mastery.earned
                    ? "Every course complete 🏆"
                    : `${mastery.completed} of ${mastery.total} lessons · all courses`}
                </p>
              </div>
              <span className="text-2xl font-black text-warning">{mastery.percent}%</span>
            </div>
            <div className="relative mt-3 h-2.5 overflow-hidden rounded-full bg-background/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-300 via-warning to-primary transition-all"
                style={{ width: `${mastery.percent}%` }}
              />
            </div>
          </div>

          {certificates.map((c) => (
            <div
              key={c.course.id}
              className={`overflow-hidden rounded-3xl border-2 p-4 shadow-soft ${
                c.earned
                  ? "border-warning bg-gradient-to-br from-warning/20 via-card to-warning/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${c.earned ? "bg-warning/25" : "bg-muted"}`}>
                  <GraduationCap className={`h-5 w-5 ${c.earned ? "text-warning" : "text-muted-foreground"}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black">{courseTitle(c.course, readingLevel)}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {c.earned ? "Certificate earned 🎉" : `${c.completed} of ${c.total} lessons`}
                  </p>
                </div>
                <span className={`text-xl font-black ${c.earned ? "text-warning" : "text-muted-foreground"}`}>{c.percent}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-warning to-amber-300 transition-all"
                  style={{ width: `${c.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <Link to="/courses" className="mt-4 block rounded-2xl border-2 border-warning/40 bg-card px-4 py-2.5 text-center text-xs font-black text-warning">
          Continue your pathway →
        </Link>
      </section>

      {/* Profile activity hub */}
      <section className="mt-5 mb-2">
        <h2 className="mb-3 text-sm font-black uppercase tracking-wider text-muted-foreground">Your activity</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <ProfileDestination
            to="/leaderboard"
            icon={<Trophy className="h-5 w-5" />}
            title="Weekly ranks"
            description="See your league position"
          />
          <ProfileDestination
            to="/shop"
            icon={<ShoppingBag className="h-5 w-5" />}
            title="Gem shop"
            description="Power-ups and cosmetics"
          />
          <ProfileDestination
            to="/achievements"
            icon={<Award className="h-5 w-5" />}
            title="Achievements"
            description="Browse all badges"
          />
        </div>
      </section>
    </AppShell>
  );
}

function ProfileDestination({
  to,
  icon,
  title,
  description,
}: {
  to: "/leaderboard" | "/shop" | "/achievements";
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link to={to} preload="render" className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition-transform active:scale-[0.98]">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-black">{title}</p>
        <p className="text-[11px] text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </Link>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="glass-stat rounded-2xl p-3 transition-transform hover:scale-[1.03]">
      <div className="mx-auto mb-1 grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary shadow-soft">
        {icon}
      </div>
      <p className="text-base font-black leading-none text-foreground [text-shadow:0_1px_2px_rgba(255,255,255,.6)]">
        {value}
      </p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-foreground/70">
        {label}
      </p>
    </div>
  );
}

function Inv({ emoji, label, value }: { emoji: string; label: string; value: number }) {
  return (
    <div className="rounded-xl bg-secondary/40 p-2">
      <p className="text-xl">{emoji}</p>
      <p className="mt-0.5 text-base font-black">{value}</p>
      <p className="text-[9px] font-bold uppercase text-muted-foreground">{label}</p>
    </div>
  );
}
