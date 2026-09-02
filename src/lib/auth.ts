// Account sign-up / sign-in and the live auth/profile store the rest of the
// app reads from. Pairs with app-state.ts, which mirrors gameplay progress
// to the signed-in user's `profiles` row.
import { useSyncExternalStore } from "react";
import { supabase } from "@/integrations/supabase/client";
import { hydrateFromCloud, unbindCloud, type CloudProfile } from "./app-state";

export type Profile = CloudProfile & {
  username: string;
  premium: string;
};

export type AuthStatus = "loading" | "authed" | "guest";

type AuthState = {
  status: AuthStatus;
  userId: string | null;
  email: string | null;
  profile: Profile | null;
};

const PENDING_CODE_KEY = "aied:pendingAdminCode";

const LOADING_STATE: AuthState = { status: "loading", userId: null, email: null, profile: null };
let state: AuthState = LOADING_STATE;
const listeners = new Set<() => void>();

function set(patch: Partial<AuthState>) {
  state = { ...state, ...patch };
  for (const l of listeners) l();
}

async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) {
    console.error("[auth] failed to load profile", error);
    return null;
  }
  return (data as unknown as Profile) ?? null;
}

async function redeemPendingAdminCodeIfAny(accessToken: string) {
  if (typeof window === "undefined") return;
  const code = window.localStorage.getItem(PENDING_CODE_KEY);
  if (!code) return;
  window.localStorage.removeItem(PENDING_CODE_KEY);
  await redeemAdminCode(code, accessToken).catch((err) => {
    console.error("[auth] pending admin code redemption failed", err);
  });
}

let initialized = false;

async function applySession(session: { access_token?: string; user?: { id: string; email?: string | null } } | null) {
  const user = session?.user ?? null;
  if (!user) {
    unbindCloud();
    set({ status: "guest", userId: null, email: null, profile: null });
    return;
  }
  if (state.status === "authed" && state.userId === user.id) return; // token refresh, nothing to redo
  if (session?.access_token) {
    await redeemPendingAdminCodeIfAny(session.access_token);
  }
  const profile = await fetchProfile(user.id);
  if (profile) hydrateFromCloud(profile);
  set({ status: "authed", userId: user.id, email: user.email ?? null, profile });
}

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  supabase.auth.onAuthStateChange((_event, session) => {
    void applySession(session as never);
  });
  // Fallback in case the listener never emits an initial event (e.g. a
  // storage read hiccup): resolve the loading state from the stored session
  // so the app never hangs on the auth spinner.
  supabase.auth
    .getSession()
    .then(({ data }) => {
      if (state.status === "loading") void applySession(data.session as never);
    })
    .catch(() => {
      if (state.status === "loading") set({ status: "guest" });
    });
}

export function useAuth(): AuthState {
  init();
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => LOADING_STATE,
  );
}

export async function refreshProfile() {
  if (!state.userId) return;
  const profile = await fetchProfile(state.userId);
  if (profile) {
    hydrateFromCloud(profile);
    set({ profile });
  }
}

async function redeemAdminCode(code: string, accessToken: string) {
  const res = await fetch("/api/redeem-admin-code", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ code }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { error?: string });
    throw new Error(body.error || "That admin code didn't work.");
  }
}

export type SignUpOptions = {
  email: string;
  password: string;
  username: string;
  ageGroup: string;
  adminCode?: string;
};

/**
 * Creates the account. The `profiles` row is created automatically by a
 * database trigger from the username/age_group passed in as signup metadata.
 * If an admin code was entered, it's redeemed immediately when Supabase
 * hands back a session right away (email confirmation off), or saved and
 * redeemed on first sign-in otherwise (email confirmation on).
 */
export async function signUp(opts: SignUpOptions) {
  const { data, error } = await supabase.auth.signUp({
    email: opts.email,
    password: opts.password,
    options: { data: { username: opts.username, age_group: opts.ageGroup } },
  });
  if (error) throw error;

  if (opts.adminCode) {
    if (data.session?.access_token) {
      await redeemAdminCode(opts.adminCode, data.session.access_token);
    } else if (typeof window !== "undefined") {
      // No session yet (email confirmation required) — redeem on first login.
      window.localStorage.setItem(PENDING_CODE_KEY, opts.adminCode);
    }
  }
  return data;
}

export async function signIn(opts: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword(opts);
  if (error) throw error;
  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
}
