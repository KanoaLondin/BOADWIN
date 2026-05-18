import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Crown, Sparkles, Users, Zap } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { setPremium, useAppState } from "@/lib/app-state";
import { toast } from "sonner";

export const Route = createFileRoute("/subscription")({
  component: SubscriptionPage,
  head: () => ({ meta: [{ title: "Plans — AIED" }] }),
});

const PLANS = [
  {
    id: "free" as const,
    name: "Free",
    price: "$0",
    period: "forever",
    icon: Sparkles,
    tone: "border-border",
    features: ["Levels 1–2 (Beginner & Elementary)", "Daily streaks", "Hearts system"],
    cta: "Current plan",
  },
  {
    id: "super" as const,
    name: "Super AIED",
    price: "$7.99",
    period: "/mo · $59.99/yr",
    icon: Zap,
    tone: "border-primary shadow-glow",
    badge: "Most popular",
    features: ["All 5 levels unlocked", "No ads", "Offline access", "Unlimited hearts"],
    cta: "Upgrade to Super AIED",
  },
  {
    id: "max" as const,
    name: "AIED Max",
    price: "$12.99",
    period: "/mo",
    icon: Crown,
    tone: "border-accent",
    badge: "Includes AL tutor",
    features: ["Everything in Super AIED", "AL — your personal AI tutor", "Industry-recognized AIED certificate", "Priority new content"],
    cta: "Go AIED Max",
  },
  {
    id: "family" as const,
    name: "AIED Family",
    price: "$99.99",
    period: "/yr",
    icon: Users,
    tone: "border-warning",
    features: ["Up to 6 accounts", "Parent dashboard", "All AIED Max features"],
    cta: "Get AIED Family",
  },
];

function SubscriptionPage() {
  const current = useAppState((s) => s.premium);

  function choose(id: "free" | "super" | "max" | "family") {
    if (id === "free") {
      setPremium(false);
      toast.success("Switched to the Free plan");
    } else {
      setPremium(id);
      toast.success(`Welcome to ${PLANS.find((p) => p.id === id)!.name}!`);
    }
  }

  return (
    <AppShell>
      <header className="mb-4 flex items-center gap-3">
        <Link to="/profile" className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-purple">Manage plan</p>
          <h1 className="text-2xl font-black">Subscription & Plans</h1>
        </div>
      </header>

      <div className="mt-4 space-y-4">
        {PLANS.map((p) => {
          const isCurrent =
            (p.id === "free" && current === false) || p.id === current;
          return (
            <div key={p.id} className={`relative rounded-3xl border-2 bg-card p-5 shadow-soft ${p.tone}`}>
              {"badge" in p && p.badge && (
                <span className="absolute -top-3 left-5 rounded-full gradient-hero px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-glow">
                  {p.badge}
                </span>
              )}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/12 text-primary">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-black">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.period}</p>
                  </div>
                </div>
                <p className="text-2xl font-black">{p.price}</p>
              </div>
              <ul className="mt-4 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                disabled={isCurrent}
                onClick={() => choose(p.id)}
                className={`mt-5 w-full rounded-2xl px-6 py-3 font-black transition-transform ${
                  isCurrent ? "bg-muted text-muted-foreground" : "gradient-hero text-white shadow-glow hover:scale-[1.02]"
                }`}
              >
                {isCurrent ? "Current plan" : p.cta}
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Subscriptions managed in the App Store or Google Play.
      </p>
    </AppShell>
  );
}
