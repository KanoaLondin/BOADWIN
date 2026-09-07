import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Search, UserPlus, Check, X, Users, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import {
  useFriendsData,
  searchUsers,
  sendFriendRequest,
  respondToFriendRequest,
  type RealProfile,
} from "@/lib/friends-data";

export const Route = createFileRoute("/friends")({
  component: FriendsHub,
  head: () => ({
    meta: [
      { title: "Friends — AIED" },
      { name: "description", content: "Find, add, and keep up with friends on AIED." },
    ],
  }),
});

function FriendsHub() {
  const { userId } = useAuth();
  const { loading, friends, incoming, outgoing, refresh } = useFriendsData();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<RealProfile[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());

  async function runSearch() {
    if (!userId || query.trim().length < 2) return;
    setSearching(true);
    const r = await searchUsers(query, userId);
    setResults(r);
    setSearching(false);
  }

  async function handleAdd(p: RealProfile) {
    if (!userId) return;
    setPendingIds((s) => new Set(s).add(p.id));
    const ok = await sendFriendRequest(userId, p.id);
    toast[ok ? "success" : "error"](ok ? `Friend request sent to ${p.username}` : "Couldn't send that request");
    if (ok) refresh();
  }

  async function handleRespond(p: RealProfile, accept: boolean) {
    if (!userId) return;
    const ok = await respondToFriendRequest(userId, p.id, accept);
    if (ok) {
      toast.success(accept ? `You and ${p.username} are now friends!` : "Request declined");
      refresh();
    }
  }

  if (!userId) {
    return (
      <AppShell>
        <header className="flex items-center gap-3">
          <Link to="/profile" className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-black">Friends</h1>
        </header>
        <div className="mt-8 rounded-3xl border-2 border-dashed border-primary/40 bg-primary/5 p-6 text-center">
          <Users className="mx-auto h-8 w-8 text-primary" />
          <p className="mt-3 text-sm font-black">Create an account to add real friends</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Search for people you know, send requests, and cheer each other on.
          </p>
          <Link
            to="/signup"
            className="mt-4 inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-black text-primary-foreground"
          >
            Create free account <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <header className="flex items-center gap-3">
        <Link to="/profile" className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-black">Friends</h1>
      </header>

      {/* Search */}
      <section className="mt-4">
        <div className="flex items-center gap-2 rounded-2xl border-2 border-border bg-card px-4 py-3 focus-within:border-primary">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            placeholder="Search by username"
            className="w-full bg-transparent text-sm font-bold outline-none"
          />
          {searching && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </div>
        {results !== null && (
          <div className="mt-3 space-y-2">
            {results.length === 0 && !searching && (
              <p className="px-1 text-xs text-muted-foreground">No one found with that username.</p>
            )}
            {results.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
                <Avatar name={p.displayName || p.username} />
                <div className="flex-1">
                  <p className="text-sm font-black">{p.displayName || p.username}</p>
                  <p className="text-[11px] text-muted-foreground">{p.xp.toLocaleString()} XP</p>
                </div>
                <button
                  onClick={() => handleAdd(p)}
                  disabled={pendingIds.has(p.id)}
                  className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[11px] font-black text-primary-foreground disabled:opacity-50"
                >
                  <UserPlus className="h-3.5 w-3.5" /> Add
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Incoming requests */}
      {incoming.length > 0 && (
        <Section title={`Requests (${incoming.length})`}>
          {incoming.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <Avatar name={p.displayName || p.username} />
              <div className="flex-1">
                <p className="text-sm font-black">{p.displayName || p.username}</p>
                <p className="text-[11px] text-muted-foreground">wants to be friends</p>
              </div>
              <button
                onClick={() => handleRespond(p, true)}
                className="grid h-8 w-8 place-items-center rounded-full bg-success text-white"
                aria-label="Accept"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleRespond(p, false)}
                className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-muted-foreground"
                aria-label="Decline"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </Section>
      )}

      {/* Outgoing requests */}
      {outgoing.length > 0 && (
        <Section title="Pending">
          {outgoing.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 opacity-70">
              <Avatar name={p.displayName || p.username} />
              <div className="flex-1">
                <p className="text-sm font-black">{p.displayName || p.username}</p>
                <p className="text-[11px] text-muted-foreground">Request sent</p>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Friends list */}
      <Section title={`Your friends (${friends.length})`}>
        {loading && <p className="px-1 text-xs text-muted-foreground">Loading…</p>}
        {!loading && friends.length === 0 && (
          <p className="px-1 text-xs text-muted-foreground">
            No friends yet — search for a username above to send your first request.
          </p>
        )}
        {friends.map((p) => (
          <Link
            key={p.id}
            to="/friend/$friendId"
            params={{ friendId: p.id }}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
          >
            <Avatar name={p.displayName || p.username} />
            <div className="flex-1">
              <p className="text-sm font-black">{p.displayName || p.username}</p>
              <p className="text-[11px] text-muted-foreground">{p.xp.toLocaleString()} XP · {p.streak} day streak</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        ))}
      </Section>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <p className="px-1 text-[11px] font-black uppercase tracking-wider text-muted-foreground">{title}</p>
      <div className="mt-2 space-y-2">{children}</div>
    </section>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-hero text-sm font-black text-white">
      {name[0]?.toUpperCase()}
    </div>
  );
}
