import { createFileRoute } from "@tanstack/react-router";
import { Check, Sparkles, Users, Crown, Zap, Bot } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/shop")({
  component: Shop,
  head: () => ({ meta: [{ title: "Shop & Plans — SAIvior" }] }),
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
    cta: "Upgrade to Super SAIvior",
  },
  {
    name: "AIED Max",
    price: "$12.99",
    period: "/month",
    icon: Crown,
    tone: "border-accent",
    badge: "Includes AL",
    features: [
      "Everything in Super SAIvior",
      "AIED AI Tutor (AL) — personal coach",
      "Industry-recognized SAIvior certificate",
      "Priority new content",
    ],
    cta: "Go AIED Max",
  },
  {
    name: "SAIvior Family",
    price: "$99.99",
    period: "/year",
    icon: Users,
    tone: "border-warning",
    features: ["Up to 6 accounts", "Parent dashboard", "All AIED Max features included"],
    cta: "Get SAIvior Family",
  },
];

function Shop() {
  return (
    <AppShell>
      <header className="text-center">
        <h1 className="text-3xl font-black">
          Unlock <span className="text-gradient">SAIvior</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose the plan that fits your AI journey.
        </p>
      </header>

      {/* AI Tutor highlight card */}
      <AiTutorCard />

      <div className="mt-6 space-y-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-3xl border-2 bg-card p-5 shadow-soft ${p.tone}`}
          >
            {p.badge && (
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
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              disabled={p.disabled}
              onClick={() => {
                if (!p.disabled && typeof window !== "undefined") {
                  window.localStorage.setItem("aied:premium", "true");
                  alert(`Welcome to ${p.name}! AL the AI Tutor is now unlocked.`);
                }
              }}
              className={`mt-5 w-full rounded-2xl px-6 py-3 font-black transition-transform ${
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

function AiTutorCard() {
  return (
    <section className="mt-6 overflow-hidden rounded-3xl border-2 border-primary/30 bg-card shadow-glow">
      <div className="gradient-hero p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/20 backdrop-blur animate-float">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/80">
              Included with AIED Max
            </p>
            <h2 className="text-xl font-black">AIED AI Tutor</h2>
            <p className="text-sm text-white/90">Meet AL — your personal AI tutor</p>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-foreground/90">
          Your personal AI learning companion. Ask anything, get instant answers,
          and get personalized help with every lesson.
        </p>

        {/* Preview chat */}
        <div className="mt-4 space-y-2 rounded-2xl bg-muted/40 p-3">
          <UserBubble>I don't understand what a prompt is</UserBubble>
          <AlBubble>
            No worries! Think of a prompt like a text message to a really smart friend.
            The clearer your message, the better their reply!
          </AlBubble>
          <UserBubble>Can you give me a hint?</UserBubble>
          <AlBubble>
            Sure! Think about what you're trying to tell the AI to do. What's the most
            important word in your instruction?
          </AlBubble>
        </div>
      </div>
    </section>
  );
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">
        {children}
      </div>
    </div>
  );
}
function AlBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <div className="grid h-6 w-6 shrink-0 place-items-center rounded-lg gradient-hero text-white">
        <Bot className="h-3.5 w-3.5" />
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-primary/20 bg-card px-3 py-2 text-xs text-foreground">
        {children}
      </div>
    </div>
  );
}
