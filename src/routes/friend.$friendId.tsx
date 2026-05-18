import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { Flame, Zap, Sparkles, ArrowLeft, UserPlus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Mascot } from "@/components/Mascot";
import { LevelBadge } from "@/components/LevelBadge";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { getFriend, FRIENDS } from "@/lib/friends";
import { getLevelInfo, getProgressToNext } from "@/lib/level-system";

export const Route = createFileRoute("/friend/$friendId")({
  component: FriendProfile,
  head: ({ params }) => {
    const f = getFriend(params.friendId);
    return { meta: [{ title: f ? `${f.name} — AIED` : "Friend — AIED" }] };
  },
  notFoundComponent: () => (
    <AppShell>
      <div className="mt-20 text-center">
        <h1 className="text-2xl font-black">Friend not found</h1>
        <Link to="/leaderboard" className="mt-4 inline-block rounded-full bg-primary px-4 py-2 text-sm font-black text-primary-foreground">Back to leaderboard</Link>
      </div>
    </AppShell>
  ),
  loader: ({ params }) => {
    const friend = getFriend(params.friendId);
    if (!friend) throw notFound();
    return { friend };
  },
});

function FriendProfile() {
  const { friendId } = useParams({ from: "/friend/$friendId" });
  const friend = getFriend(friendId);
  if (!friend) return null;

  const userLevel = getLevelInfo(friend.xp);
  const lvlProgress = getProgressToNext(friend.xp);
  const hasBg = friend.profileBg !== "none";

  return (
    <AppShell>
      <header className="flex items-center justify-between">
        <Link to="/leaderboard" className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-lg font-black">{friend.name}</h1>
        <button className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card">
          <UserPlus className="h-4 w-4" />
        </button>
      </header>

      {/* Hero card — always shows friend's chosen background */}
      <section className={`relative mt-4 overflow-hidden rounded-3xl border-2 border-border p-6 text-center shadow-card ${!hasBg ? "bg-gradient-to-br from-purple/15 via-card to-cyan/15" : ""}`}>
        {hasBg && <AnimatedBackground variant={friend.profileBg} contained />}
        <div className="relative">
          <div className="relative mx-auto w-fit">
            <Mascot size={88} outfit={friend.outfit} />
          </div>
          <h2 className={`mt-4 text-2xl font-black ${hasBg ? "text-white drop-shadow" : ""}`}>{friend.name}</h2>
          <div className="mt-1 flex items-center justify-center gap-2">
            <LevelBadge xp={friend.xp} />
            <p className={`text-xs font-bold uppercase tracking-widest ${hasBg ? "text-white/90" : "text-muted-foreground"}`}>
              {userLevel.name} · {friend.ageGroup}
            </p>
          </div>
          <div className={`mx-auto mt-3 max-w-xs rounded-full px-3 py-1 text-[10px] font-bold ${hasBg ? "bg-white/20 text-white backdrop-blur" : "bg-muted text-muted-foreground"}`}>
            {lvlProgress.current}/{lvlProgress.needed} XP to next level
          </div>
          {friend.bio && (
            <p className={`mt-3 text-xs italic ${hasBg ? "text-white/90" : "text-muted-foreground"}`}>"{friend.bio}"</p>
          )}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Stat icon={<Zap className="h-4 w-4" />} value={friend.xp.toLocaleString()} label="Total XP" />
            <Stat icon={<Flame className="h-4 w-4" />} value={friend.streak} label="Day streak" />
            <Stat icon={<Sparkles className="h-4 w-4" />} value="L" label={userLevel.name} />
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-3xl border border-border bg-card p-5 shadow-soft text-center">
        <p className="text-sm font-black">Cheer {friend.name.split(" ")[0]} on!</p>
        <p className="mt-1 text-[11px] text-muted-foreground">Send an emoji or challenge them to a daily duel.</p>
        <div className="mt-3 flex justify-center gap-2">
          <button className="rounded-full bg-primary px-4 py-2 text-xs font-black text-primary-foreground shadow-soft">👋 Wave</button>
          <button className="rounded-full bg-warning px-4 py-2 text-xs font-black text-white shadow-soft">⚔️ Duel</button>
        </div>
      </section>

      <section className="mt-5">
        <p className="px-1 text-[11px] font-black uppercase tracking-wider text-muted-foreground">More friends</p>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
          {FRIENDS.filter((f) => f.id !== friend.id).map((f) => (
            <Link
              key={f.id}
              to="/friend/$friendId"
              params={{ friendId: f.id }}
              className="flex min-w-[88px] flex-col items-center rounded-2xl border border-border bg-card p-3"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full gradient-hero text-sm font-black text-white">
                {f.name[0]}
              </div>
              <p className="mt-1.5 text-[11px] font-black">{f.name}</p>
              <p className="text-[10px] text-muted-foreground">{f.xp.toLocaleString()} XP</p>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="rounded-xl bg-background/60 p-3 backdrop-blur">
      <div className="mx-auto mb-1 grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary">{icon}</div>
      <p className="text-base font-black leading-none">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}
