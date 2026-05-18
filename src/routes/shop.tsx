import { createFileRoute } from "@tanstack/react-router";
import { Check, Sparkles, Users, Crown, Zap } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/shop")({
  component: Shop,
  head: () => ({ meta: [{ title: "Shop & Plans — AIED" }] }),
});

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    icon: Sparkles,
    tone: "border-border",
    features: ["Levels 1-2 (Beginner & Elementary)", "Basic lessons", "Ad-supported"],
    cta: "Current plan",
    disabled: true,
  },
  {
    name: "Super SAIvior",
    price: "$7.99",
    period: "/month · $59.99/yr",
    icon: Zap,
    tone: "border-primary shadow-glow",
    badge: "Most popular",
    features: ["All 5 levels unlocked", "No ads, ever", "Offline access", "Unlimited hearts"],
    cta: "Upgrade",
  },
  {
    name: "SAIvior Max",
    price: "$12.99",
    period: "/month",
    icon: Crown,
    tone: "border-cyan",
    features: [
      "Everything in Super",
      "AI practice partner",
      "Industry-recognized certificate",
      "Priority new content",
    ],
    cta: "Go Max",
  },
  {
    name: "Family",
    price: "$99.99",
    period: "/year",
    icon: Users,
    tone: "border-warning",
    features: ["Up to 6 accounts", "Parent dashboard", "All Max features included"],
    cta: "Get Family",
  },
];

function Shop() {
  return (
    <AppShell>
      <header className="text-center">
        <h1 className="text-3xl font-bold">
          Unlock <span className="text-gradient">everything</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose the plan that fits your AI journey.
        </p>
      </header>

      <div className="mt-6 space-y-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-3xl border-2 gradient-card p-5 ${p.tone}`}
          >
            {p.badge && (
              <span className="absolute -top-3 left-5 rounded-full gradient-hero px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">
                {p.badge}
              </span>
            )}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
                  <p.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.period}</p>
                </div>
              </div>
              <p className="text-2xl font-bold">{p.price}</p>
            </div>

            <ul className="mt-4 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              disabled={p.disabled}
              className={`mt-5 w-full rounded-2xl px-6 py-3 font-bold transition-transform ${
                p.disabled
                  ? "bg-muted text-muted-foreground"
                  : "gradient-hero text-white shadow-glow hover:scale-[1.02]"
              }`}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
