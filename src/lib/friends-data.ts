// Real, database-backed friends: search, send/accept/decline requests, and
// list accepted friends — for signed-in users. Built on the `friendships`
// table and `pair_users()` helper that already existed in the schema
// (canonical pair user_a < user_b, RLS-scoped to the two people involved).
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./auth";

export type RealProfile = {
  id: string;
  username: string;
  displayName: string | null;
  xp: number;
  streak: number;
  alOutfit: string;
  profileBg: string;
  bio: string | null;
  isMinor: boolean;
};

type FriendshipStatus = "none" | "pending-outgoing" | "pending-incoming" | "friends";

export type FriendsData = {
  loading: boolean;
  friends: RealProfile[];
  incoming: RealProfile[];
  outgoing: RealProfile[];
  refresh: () => void;
};

function pairKey(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a];
}

function toProfile(row: any): RealProfile {
  return {
    id: row.id,
    username: row.username,
    displayName: row.display_name,
    xp: row.xp,
    streak: row.streak,
    alOutfit: row.al_outfit,
    profileBg: row.profile_bg,
    bio: row.bio,
    isMinor: !!row.is_minor,
  };
}

const PROFILE_COLS = "id,username,display_name,xp,streak,al_outfit,profile_bg,bio,is_minor";

/**
 * Search other users by username (for "Add friend").
 *
 * Under-18 accounts are only ever matched by an exact, case-insensitive
 * username — never by substring — so a stranger can't browse or fish for a
 * minor's account. You still need to already know exactly who you're
 * looking for. Adult accounts remain substring-searchable as before.
 */
export async function searchUsers(query: string, myId: string): Promise<RealProfile[]> {
  const q = query.trim();
  if (q.length < 2) return [];
  const [{ data: exact }, { data: partial }] = await Promise.all([
    supabase.from("public_profiles").select(PROFILE_COLS).ilike("username", q).neq("id", myId).limit(5),
    supabase.from("public_profiles").select(PROFILE_COLS).ilike("username", `%${q}%`).eq("is_minor", false).neq("id", myId).limit(15),
  ]);
  const byId = new Map<string, RealProfile>();
  for (const row of [...(exact ?? []), ...(partial ?? [])]) byId.set(row.id, toProfile(row));
  return Array.from(byId.values()).slice(0, 15);
}

/**
 * Send a friend request. If the other person already sent one to us,
 * this accepts it instead (avoids two pending rows fighting over the
 * same primary key).
 */
export async function sendFriendRequest(myId: string, otherId: string): Promise<boolean> {
  const [user_a, user_b] = pairKey(myId, otherId);
  const { data: existing } = await supabase
    .from("friendships")
    .select("status,requested_by")
    .eq("user_a", user_a)
    .eq("user_b", user_b)
    .maybeSingle();

  if (existing) {
    if (existing.status === "accepted" || existing.status === "blocked") return false;
    if (existing.status === "pending" && existing.requested_by !== myId) {
      // They already asked us — accept instead of sending a duplicate request.
      const { error } = await supabase
        .from("friendships")
        .update({ status: "accepted", responded_at: new Date().toISOString() })
        .eq("user_a", user_a)
        .eq("user_b", user_b);
      return !error;
    }
    return false; // already pending from us
  }

  const { error } = await supabase
    .from("friendships")
    .insert({ user_a, user_b, status: "pending", requested_by: myId });
  return !error;
}

export async function respondToFriendRequest(myId: string, otherId: string, accept: boolean): Promise<boolean> {
  const [user_a, user_b] = pairKey(myId, otherId);
  if (accept) {
    const { error } = await supabase
      .from("friendships")
      .update({ status: "accepted", responded_at: new Date().toISOString() })
      .eq("user_a", user_a)
      .eq("user_b", user_b);
    return !error;
  }
  const { error } = await supabase.from("friendships").delete().eq("user_a", user_a).eq("user_b", user_b);
  return !error;
}

export async function removeFriend(myId: string, otherId: string): Promise<boolean> {
  const [user_a, user_b] = pairKey(myId, otherId);
  const { error } = await supabase.from("friendships").delete().eq("user_a", user_a).eq("user_b", user_b);
  return !error;
}

/** Friendship status between the signed-in user and another profile. */
export function useFriendshipStatus(myId: string | null, otherId: string | null) {
  const [status, setStatus] = useState<FriendshipStatus>("none");
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    if (!myId || !otherId || myId === otherId) {
      setStatus("none");
      setLoading(false);
      return;
    }
    setLoading(true);
    const [user_a, user_b] = pairKey(myId, otherId);
    supabase
      .from("friendships")
      .select("status,requested_by")
      .eq("user_a", user_a)
      .eq("user_b", user_b)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) setStatus("none");
        else if (data.status === "accepted") setStatus("friends");
        else if (data.status === "pending") setStatus(data.requested_by === myId ? "pending-outgoing" : "pending-incoming");
        else setStatus("none");
        setLoading(false);
      });
  }, [myId, otherId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { status, loading, refresh };
}

/** All friendship rows involving the signed-in user, enriched with profile data. */
export function useFriendsData(): FriendsData {
  const { userId } = useAuth();
  const [state, setState] = useState<Omit<FriendsData, "refresh">>({
    loading: true,
    friends: [],
    incoming: [],
    outgoing: [],
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!userId) {
      setState({ loading: false, friends: [], incoming: [], outgoing: [] });
      return;
    }
    let cancelled = false;
    setState((s) => ({ ...s, loading: true }));

    supabase
      .from("friendships")
      .select("user_a,user_b,status,requested_by")
      .or(`user_a.eq.${userId},user_b.eq.${userId}`)
      .then(async ({ data: rows, error }) => {
        if (cancelled || error || !rows) {
          if (!cancelled) setState({ loading: false, friends: [], incoming: [], outgoing: [] });
          return;
        }
        const otherIds = rows.map((r) => (r.user_a === userId ? r.user_b : r.user_a));
        if (otherIds.length === 0) {
          setState({ loading: false, friends: [], incoming: [], outgoing: [] });
          return;
        }
        const { data: profiles } = await supabase.from("public_profiles").select(PROFILE_COLS).in("id", otherIds);
        if (cancelled) return;
        const byId = new Map((profiles ?? []).map((p) => [p.id, toProfile(p)]));

        const friends: RealProfile[] = [];
        const incoming: RealProfile[] = [];
        const outgoing: RealProfile[] = [];
        for (const row of rows) {
          const otherId = row.user_a === userId ? row.user_b : row.user_a;
          const profile = byId.get(otherId);
          if (!profile) continue;
          if (row.status === "accepted") friends.push(profile);
          else if (row.status === "pending" && row.requested_by === userId) outgoing.push(profile);
          else if (row.status === "pending") incoming.push(profile);
        }
        setState({ loading: false, friends, incoming, outgoing });
      });

    return () => {
      cancelled = true;
    };
  }, [userId, tick]);

  return { ...state, refresh: () => setTick((t) => t + 1) };
}
