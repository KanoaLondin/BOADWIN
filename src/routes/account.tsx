import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Crown, KeyRound, LogOut, Sparkles, User, Users, Zap, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { signOut, useAuth } from "@/lib/auth";
import { useAppState, setName, setPremium } from "@/lib/app-state";
import { validateUsername } from "@/lib/profanity";
import { useSubscription } from "@/hooks/useSubscription";
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout";
import { PLAN_PRICE_IDS, getPaddleEnvironment, type PlanId } from "@/lib/paddle";
import { cancelPaddleSubscription, switchPaddlePlan } from "@/lib/payments.functions";
import { useCheckoutReturn } from "@/hooks/useCheckoutReturn";

export const Route = createFileRoute("/account")({
  component: AccountPage,
  head: () => ({
    meta: [
      { title: "Your account — AIED" },
      {
        name: "description",
        content:
          "Manage your AIED account on the web: profile details, subscription and billing, and your password.",
      },
      { property: "og:title", content: "Your AIED account" },
      {
        property: "og:description",
        content: "Update your profile, manage your AIED subscription, and change your password.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const PLANS = [
  { id: "free" as const, name: "Free", price: "$0", period: "forever", icon: Sparkles },
  { id: "super" as const, name: "Super AIED", price: "$7.99", period: "/mo", icon: Zap },
  { id: "max" as const, name: "AIED Max", price: "$12.99", period: "/mo", icon: Crown },
  { id: "family" as const, name: "AIED Family", price: "$99.99", period: "/yr", icon: Users },
];

function AccountPage() {
  const navigate = useNavigate();
  const { status, email, userId } = useAuth();
  const name = useAppState((s) => s.name);
  const current = useAppState((s) => s.premium);
  const renewalISO = useAppState((s) => s.premiumRenewalISO);
  const { plan, isActive, subscription, refetch } = useSubscription();
  useCheckoutReturn(refetch, isActive);
  const { openCheckout } = usePaddleCheckout();

  const [nameInput, setNameInput] = useState(name);
  const [busy, setBusy] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => setNameInput(name), [name]);

  useEffect(() => {
    if (status === "guest") navigate({ to: "/login", replace: true });
  }, [status, navigate]);

  // Plan mirroring lives in <SubscriptionSync /> at the root so web and app
  // stay in step wherever the user happens to be.



  const currentPlan = PLANS.find((p) => p.id === current) ?? PLANS[0];
  const renewalLabel = renewalISO
    ? new Date(renewalISO).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  function saveName() {
    const next = nameInput.trim();
    if (!next || next === name) return;
    const problem = validateUsername(next, 2);
    if (problem) {
      toast.error(problem);
      return;
    }
    setName(next);
    toast.success("Name saved.");
  }

  async function choosePlan(id: PlanId) {
    if (!userId) return;
    setBusy(true);
    try {
      const priceId = PLAN_PRICE_IDS[id];
      if (isActive) {
        await switchPaddlePlan({ data: { priceId, environment: getPaddleEnvironment() } });
        toast.success(`You're now on ${PLANS.find((p) => p.id === id)!.name}.`);
        setTimeout(() => void refetch(), 1500);
      } else {
        await openCheckout({
          priceId,
          customerEmail: email ?? undefined,
          customData: { userId },
          successUrl: `${window.location.origin}/account?checkout=success`,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong starting that plan. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function doCancel() {
    setConfirmCancel(false);
    if (!isActive) {
      setPremium(false);
      return;
    }
    setBusy(true);
    try {
      await cancelPaddleSubscription({ data: { environment: getPaddleEnvironment() } });
      toast.success("Your plan is cancelled — you keep access until the end of the period.");
      setTimeout(() => void refetch(), 1500);
    } catch (err) {
      console.error(err);
      toast.error("We couldn't cancel that plan. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("Use at least 8 characters for your new password.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
        current_password: currentPassword,
      });
      if (error) throw error;
      setCurrentPassword("");
      setNewPassword("");
      toast.success("Password updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't update your password.");
    } finally {
      setBusy(false);
    }
  }

  if (status !== "authed") {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link to="/landing" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-hero text-white shadow-glow">
              <span className="text-lg">🤖</span>
            </div>
            <span className="text-2xl font-black text-gradient">AIED</span>
          </Link>
          <button
            onClick={() => {
              void signOut();
              navigate({ to: "/landing", replace: true });
            }}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <Link
          to="/landing"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to aied.app
        </Link>
        <h1 className="mt-3 text-4xl font-black">Your account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage your profile, subscription, and password here. Lessons and courses live in the
          AIED mobile app.
        </p>

        {/* Profile */}
        <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="flex items-center gap-2 text-lg font-black">
            <User className="h-5 w-5 text-primary" /> Profile
          </h2>
          <label className="mt-4 block text-xs font-bold text-muted-foreground">Display name</label>
          <div className="mt-1 flex gap-2">
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="flex-1 rounded-2xl border-2 border-border bg-background px-4 py-3 font-semibold outline-none focus:border-primary"
            />
            <button
              onClick={saveName}
              className="rounded-2xl gradient-hero px-5 py-3 font-black text-white shadow-glow disabled:opacity-40"
              disabled={busy || !nameInput.trim() || nameInput.trim() === name}
            >
              Save
            </button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Signed in as <span className="font-bold text-foreground">{email}</span>
          </p>
        </section>

        {/* Subscription */}
        <section className="mt-5 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="flex items-center gap-2 text-lg font-black">
            <Crown className="h-5 w-5 text-warning" /> Subscription &amp; billing
          </h2>
          <div className="mt-4 rounded-2xl border-2 border-primary/40 bg-primary/5 p-5">
            <p className="text-xs font-black uppercase tracking-wider text-primary">Current plan</p>
            <p className="mt-1 text-2xl font-black">{currentPlan.name}</p>
            <p className="text-sm text-muted-foreground">
              {currentPlan.price}
              <span className="text-xs"> {currentPlan.period}</span>
              {renewalLabel && current !== false ? ` · Renews ${renewalLabel}` : ""}
            </p>
            {current !== false && (
              <button
                onClick={() => setConfirmCancel(true)}
                disabled={busy}
                className="mt-3 text-sm font-bold text-heart underline-offset-4 hover:underline disabled:opacity-40"
              >
                Cancel subscription
              </button>
            )}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {PLANS.filter((p) => p.id !== "free" && p.id !== current).map((p) => (
              <button
                key={p.id}
                onClick={() => choosePlan(p.id as PlanId)}
                disabled={busy}
                className="rounded-2xl border-2 border-border bg-background p-4 text-left transition-transform hover:-translate-y-0.5 disabled:opacity-40"
              >
                <p.icon className="h-5 w-5 text-primary" />
                <p className="mt-2 font-black">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.price} {p.period}
                </p>
                <p className="mt-2 text-xs font-black text-primary">
                  {current !== false ? `Switch to ${p.name}` : `Get ${p.name}`}
                </p>
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Payments are processed by our reseller and Merchant of Record, Paddle.com. See our{" "}
            <Link to="/settings/refunds" className="font-bold underline">
              refund policy
            </Link>
            .
          </p>
        </section>

        {/* Password */}
        <section className="mt-5 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="flex items-center gap-2 text-lg font-black">
            <KeyRound className="h-5 w-5 text-cyan" /> Password
          </h2>
          <form onSubmit={changePassword} className="mt-4 space-y-3">
            <input
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current password"
              className="w-full rounded-2xl border-2 border-border bg-background px-4 py-3 font-semibold outline-none focus:border-primary"
            />
            <input
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password (min 8 characters)"
              className="w-full rounded-2xl border-2 border-border bg-background px-4 py-3 font-semibold outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={busy || !currentPassword || !newPassword}
              className="rounded-2xl gradient-hero px-5 py-3 font-black text-white shadow-glow disabled:opacity-40"
            >
              Update password
            </button>
          </form>
        </section>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Looking for your lessons? Open the AIED app on your phone — courses are mobile only.
        </p>
      </main>

      {confirmCancel && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-6">
          <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-card">
            <h3 className="text-lg font-black">Cancel your subscription?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You'll keep premium access until
              {renewalLabel ? ` ${renewalLabel}` : " the end of your current billing period"}, then
              move to the Free plan. Your progress stays safe.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setConfirmCancel(false)}
                className="flex-1 rounded-2xl border-2 border-border py-3 font-black"
              >
                Keep plan
              </button>
              <button
                onClick={doCancel}
                className="flex-1 rounded-2xl bg-heart py-3 font-black text-white"
              >
                Cancel plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
