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
  const renewalISO = useAppState((s) => s.premiumRenewalISO);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const currentPlan = PLANS.find((p) => p.id === current);
  const renewalLabel = renewalISO
    ? new Date(renewalISO).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  function choose(id: "free" | "super" | "max" | "family") {
    if (id === "free") {
      setPremium(false);
      toast.success("Switched to the Free plan");
    } else {
      setPremium(id);
      toast.success(`Welcome to ${PLANS.find((p) => p.id === id)!.name}!`);
    }
  }

  function cancelSubscription() {
    setConfirmCancel(false);
    setPremium(false);
    toast.success("Your subscription has been cancelled.");
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
          const isPaidSwitch = current !== false && p.id !== "free" && !isCurrent;
          const cta = isPaidSwitch ? `Switch to ${p.name}` : p.cta;
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
                {isCurrent ? "Current plan" : cta}
              </button>

              {isCurrent && current !== false && (
                <div className="mt-3 text-center">
                  {renewalLabel && (
                    <p className="mb-1 text-[11px] text-muted-foreground">
                      Renews on {renewalLabel}
                    </p>
                  )}
                  <button
                    onClick={() => setConfirmCancel(true)}
                    className="text-xs font-black text-destructive underline underline-offset-4"
                  >
                    Cancel subscription
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Plans are billed through your AIED account. You can switch plans or cancel any time right
        here — no app store required.
      </p>

      <AlertDialog open={confirmCancel} onOpenChange={setConfirmCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Cancel {currentPlan?.name ?? "your subscription"}?
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2 text-left">
                <p>
                  You'll keep your {currentPlan?.name ?? "paid"} features until
                  {renewalLabel ? ` ${renewalLabel}` : " the end of your current billing period"},
                  then your account moves to the Free plan.
                </p>
                <p>After that you'll lose:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Access to every level above Elementary</li>
                  <li>Unlimited hearts and offline access</li>
                  {(current === "max" || current === "family") && (
                    <li>AL, your personal AI tutor, and your AIED certificate track</li>
                  )}
                  {current === "family" && <li>Family accounts and the parent dashboard</li>}
                </ul>
                <p>Your XP, streak, gems and cosmetics are kept — nothing is deleted.</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep my plan</AlertDialogCancel>
            <AlertDialogAction
              onClick={cancelSubscription}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancel subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  );
}

