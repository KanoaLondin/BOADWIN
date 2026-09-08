import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { Flame, Zap, Sparkles, ArrowLeft, UserPlus, Check, Clock, Users } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Mascot } from "@/components/Mascot";
import { LevelBadge } from "@/components/LevelBadge";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { getFriend, FRIENDS, type Friend } from "@/lib/friends";
import { getLevelInfo, getProgressToNext } from "@/lib/level-system";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { safeNickname } from "@/lib/child-safety";
import { useFriendshipStatus, sendFriendRequest, respondToFriendRequest } from "@/lib/friends-data";
import type { ProfileBg } from "@/lib/app-state";

type RealFriend = Friend & { isReal: true; isMinor: boolean; rawName: string };
type LoaderFriend = { friend: Friend; isReal: false } | { friend: RealFriend; isReal: true };

function toFriendShape(row: any): RealFriend {
  return {
    id: row.id,
    name: row.display_name || row.username,
    rawName: row.display_name || row.username,
    xp: row.xp,
    streak: row.streak,
    ageGroup: "adults",
    outfit: row.al_outfit,
    profileBg: (row.profile_bg as ProfileBg) || "none",
    bio: row.bio ?? undefined,
    isReal: true,
    isMinor: !!row.is_minor,
  };
}

export const Route = createFileRoute("/friend/$friendId")({
  component: FriendProfile,
  head: ({ params }) => {
    const f = getFriend(params.friendId);
    return {
      meta: [
        { title: f ? `${f.name} — AIED` : "Friend — AIED" },
        { name: "description", content: f ? `${f.name}'s AIED profile and progress.` : "Friend profile — AIED." },
      ],
    };
  },
  notFoundComponent: () => (
    <AppShell>
      <div className="mt-20 text-center">
        <h1 className="text-2xl font-black">Friend not found</h1>
        <Link to="/leaderboard" className="mt-4 inline-block rounded-full bg-primary px-4 py-2 text-sm font-black text-primary-foreground">Back to leaderboard</Link>
      </div>
    </AppShell>
  ),
  // Mock friends resolve instantly; anything else is a real Supabase user id
  // and gets fetched here so a direct link to a real friend's profile works.
  loader: async ({ params }): Promise<LoaderFriend> => {
    const mock = getFriend(params.friendId);
    if (mock) return { friend: mock, isReal: false };
    // Looking up someone else's profile by id — profiles itself is locked to
    // "own row only", so this goes through the public_profiles view, which
    // exposes only the columns that are fine to show another signed-in user.
    const { data } = await supabase
      .from("public_profiles")
      .select("id,username,display_name,xp,streak,al_outfit,profile_bg,bio,is_minor")
      .eq("id", params.friendId)
      .maybeSingle();
    if (!data) throw notFound();
    return { friend: toFriendShape(data), isReal: true };
  },
});

function FriendProfile() {
  const { friendId } = useParams({ from: "/friend/$friendId" });
  const loaderData = Route.useLoaderData() as LoaderFriend;
  const { userId } = useAuth();
  const { status, loading: statusLoading, refresh: refreshStatus } = useFriendshipStatus(
    loaderData.isReal ? userId : null,
    loaderData.isReal ? friendId : null,
  );

  const { friend, isReal } = loaderData;

  // Under-18 accounts are never shown by their real name to someone who
  // isn't already an accepted friend — same protection the leaderboard
  // uses — since this page is reachable by anyone who has the link.
  const revealReal = !isReal || !(friend as RealFriend).isMinor || status === "friends";
  const displayName = isReal && !revealReal ? safeNickname(friend.id) : friend.name;
  const bio = isReal && !revealReal ? undefined : friend.bio;

  const userLevel = getLevelInfo(friend.xp);
  const lvlProgress = getProgressToNext(friend.xp);
  const hasBg = friend.profileBg !== "none";

  async function handleAdd() {
    if (!userId) return;
    const ok = await sendFriendRequest(userId, friendId);
    if (ok) refreshStatus();
  }

  async function handleAccept() {
    if (!userId) return;
    const ok = await respondToFriendRequest(userId, friendId, true);
    if (ok) refreshStatus();
  }

  return (
    <AppShell>
      <header className="flex items-center justify-between">
        <Link to="/leaderboard" className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-lg font-black">{displayName}</h1>
        {isReal ? (
          <FriendActionButton
            status={status}
            loading={statusLoading}
            signedIn={Boolean(userId)}
            onAdd={handleAdd}
            onAccept={handleAccept}
          />
        ) : (
          <button className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card">
            <UserPlus className="h-4 w-4" />
          </button>
        )}
      </header>

      {/* Hero card — always shows friend's chosen background */}
      <section className={`relative mt-4 overflow-hidden rounded-3xl border-2 border-border p-6 text-center shadow-card ${!hasBg ? "bg-gradient-to-br from-purple/15 via-card to-cyan/15" : ""}`}>
        {hasBg && <AnimatedBackground variant={friend.profileBg} contained />}
        <div className="relative">
          <div className="relative mx-auto w-fit">
            <Mascot size={88} outfit={friend.outfit} />
          </div>
          <h2 className={`mt-4 text-2xl font-black ${hasBg ? "text-white drop-shadow" : ""}`}>{displayName}</h2>
          <div className="mt-1 flex items-center justify-center gap-2">
            <LevelBadge xp={friend.xp} />
            <p className={`text-xs font-bold uppercase tracking-widest ${hasBg ? "text-white/90" : "text-muted-foreground"}`}>
              {isReal ? userLevel.name : `${userLevel.name} · ${friend.ageGroup}`}
            </p>
          </div>
          <div className={`mx-auto mt-3 max-w-xs rounded-full px-3 py-1 text-[10px] font-bold ${hasBg ? "bg-white/20 text-white backdrop-blur" : "bg-muted text-muted-foreground"}`}>
            {lvlProgress.current}/{lvlProgress.needed} XP to next level
          </div>
          {bio && (
            <p className={`mt-3 text-xs italic ${hasBg ? "text-white/90" : "text-muted-foreground"}`}>"{bio}"</p>
          )}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Stat icon={<Zap className="h-4 w-4" />} value={friend.xp.toLocaleString()} label="Total XP" />
            <Stat icon={<Flame className="h-4 w-4" />} value={friend.streak} label="Day streak" />
            <Stat icon={<Sparkles className="h-4 w-4" />} value="L" label={userLevel.name} />
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-3xl border border-border bg-card p-5 shadow-soft text-center">
        <p className="text-sm font-black">Cheer {displayName.split(" ")[0]} on!</p>
        <p className="mt-1 text-[11px] text-muted-foreground">Send an emoji or challenge them to a daily duel.</p>
        <div className="mt-3 flex justify-center gap-2">
          <button className="rounded-full bg-primary px-4 py-2 text-xs font-black text-primary-foreground shadow-soft">👋 Wave</button>
          <button className="rounded-full bg-warning px-4 py-2 text-xs font-black text-white shadow-soft">⚔️ Duel</button>
        </div>
      </section>

      {!isReal && (
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
      )}

      {isReal && (
        <section className="mt-5 text-center">
          <Link to="/friends" className="inline-flex items-center gap-1 text-xs font-bold text-primary">
            <Users className="h-3.5 w-3.5" /> See all your friends
          </Link>
        </section>
      )}
    </AppShell>
  );
}

function FriendActionButton({
  status,
  loading,
  signedIn,
  onAdd,
  onAccept,
}: {
  status: "none" | "pending-outgoing" | "pending-incoming" | "friends";
  loading: boolean;
  signedIn: boolean;
  onAdd: () => void;
  onAccept: () => void;
}) {
  if (!signedIn || loading) return <div className="h-9 w-9" />;
  if (status === "friends") {
    return (
      <div className="grid h-9 w-9 place-items-center rounded-xl border border-success/40 bg-success/10 text-success">
        <Check className="h-4 w-4" />
      </div>
    );
  }
  if (status === "pending-outgoing") {
    return (
      <div className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card text-muted-foreground">
        <Clock className="h-4 w-4" />
      </div>
    );
  }
  if (status === "pending-incoming") {
    return (
      <button
        onClick={onAccept}
        className="grid h-9 w-9 place-items-center rounded-xl border border-primary bg-primary/10 text-primary"
        aria-label="Accept friend request"
      >
        <Check className="h-4 w-4" />
      </button>
    );
  }
  return (
    <button
      onClick={onAdd}
      className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card"
      aria-label="Add friend"
    >
      <UserPlus className="h-4 w-4" />
    </button>
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
