import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Sparkles, Users, Crown, Zap, Bot, Lock, X } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Gem } from "@/components/GemBadge";
import {
  setPremium,
  spendGems,
  addStreakFreeze,
  refillHearts,
  activateXpBoost,
  addHintTokens,
  ownOutfit,
  equipOutfit,
  useAppState,
} from "@/lib/app-state";

export const Route = createFileRoute("/shop")({
  component: Shop,
  head: () => ({ meta: [{ title: "Shop & Plans — AIED" }] }),
});

const plans = [
  {
    id: "free",
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
    id: "super",
    name: "Super AIED",
    price: "$7.99",
    period: "/month · $59.99/yr",
    icon: Zap,
    tone: "border-primary shadow-glow",
    badge: "Most popular",
    features: ["All 5 levels unlocked", "No ads, ever", "Offline access", "Unlimited hearts"],
    cta: "Upgrade to Super AIED",
  },
  {
    id: "max",
    name: "AIED Max",
    price: "$12.99",
    period: "/month",
    icon: Crown,
    tone: "border-accent",
    badge: "Includes AL",
    features: [
      "Everything in Super AIED",
      "🤖 AL — Your Personal AI Tutor (ask anything, get hints, get personalized support)",
      "Industry-recognized AIED certificate",
      "Priority new content",
    ],
    cta: "Go AIED Max",
    showAlPreview: true,
  },
  {
    id: "family",
    name: "AIED Family",
    price: "$99.99",
    period: "/year",
    icon: Users,
    tone: "border-warning",
    features: ["Up to 6 accounts", "Parent dashboard", "All AIED Max features included"],
    cta: "Get AIED Family",
  },
] as const;

type ShopItem = {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  price: number;
  apply: () => void;
};

const powerUps: ShopItem[] = [
  { id: "freeze", name: "Streak Freeze", emoji: "❄️", desc: "Protects your streak. Max 2.", price: 20, apply: () => addStreakFreeze(1) },
  { id: "heart-refill", name: "Heart Refill", emoji: "❤️", desc: "Refill all 5 hearts.", price: 15, apply: () => refillHearts() },
  { id: "xp-boost", name: "XP Boost", emoji: "⚡", desc: "Double XP for 2 hours.", price: 30, apply: () => activateXpBoost(2) },
  { id: "skip", name: "Lesson Skip", emoji: "🎯", desc: "Skip one easy lesson.", price: 50, apply: () => {} },
  { id: "hint", name: "Hint Token", emoji: "💡", desc: "One free hint from AL.", price: 10, apply: () => addHintTokens(1) },
];

const outfits: ShopItem[] = [
  { id: "scientist", name: "Scientist AL", emoji: "🥽", desc: "Lab coat and glasses.", price: 40, apply: () => { ownOutfit("scientist"); equipOutfit("scientist"); } },
  { id: "astronaut", name: "Astronaut AL", emoji: "🚀", desc: "Space helmet.", price: 60, apply: () => { ownOutfit("astronaut"); equipOutfit("astronaut"); } },
  { id: "wizard", name: "Wizard AL", emoji: "🧙", desc: "Pointy purple hat.", price: 80, apply: () => { ownOutfit("wizard"); equipOutfit("wizard"); } },
];

const cosmetics: ShopItem[] = [
  { id: "bg-aurora", name: "Aurora Background", emoji: "🌌", desc: "Animated aurora.", price: 30, apply: () => {} },
  { id: "frame-gold", name: "Gold Badge Frame", emoji: "🖼️", desc: "Premium frame.", price: 25, apply: () => {} },
  { id: "flame-cyan", name: "Cyan Streak", emoji: "🔥", desc: "Cool cyan flame.", price: 20, apply: () => {} },
];

const special: ShopItem[] = [
  { id: "mystery", name: "Mystery Box", emoji: "🎁", desc: "Random item.", price: 35, apply: () => {} },
  { id: "double-chest", name: "Double Chest", emoji: "📦", desc: "Doubles next chest.", price: 45, apply: () => {} },
];

function Shop() {
  const gems = useAppState((s) => s.gems);
  const [alPreview, setAlPreview] = useState(false);

  return (
    <AppShell>
      <header className="text-center">
        <h1 className="text-3xl font-black">
          Unlock <span className="text-gradient">AIED</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Spend gems, power-up, or upgrade your plan.
        </p>
        <div className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full bg-cyan/15 px-4 py-1.5 text-cyan">
          <Gem size={16} />
          <span className="text-sm font-black">{gems} gems</span>
        </div>
      </header>

      {/* Subscriptions */}
      <h2 className="mt-8 mb-3 text-sm font-black uppercase tracking-wider text-muted-foreground">
        Plans
      </h2>
      <div className="space-y-4">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`relative rounded-3xl border-2 bg-card p-5 shadow-soft ${p.tone}`}
          >
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

            {"showAlPreview" in p && p.showAlPreview && (
              <button
                onClick={() => setAlPreview(true)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/8 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/15"
              >
                <Bot className="h-3.5 w-3.5" /> See AL in action
              </button>
            )}

            <button
              disabled={p.disabled}
              onClick={() => {
                if (p.disabled) return;
                const tier = p.id === "super" ? "super" : p.id === "max" ? "max" : "family";
                setPremium(tier as "super" | "max" | "family");
                alert(`Welcome to ${p.name}!`);
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

      {/* Power-ups */}
      <ShopSection title="Power-ups" items={powerUps} />
      <ShopSection title="AL Outfits & Cosmetics" items={[...outfits, ...cosmetics]} />
      <ShopSection title="Special" items={special} />

      {alPreview && <AlPreviewModal onClose={() => setAlPreview(false)} />}

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Parents: manage purchases in the <Link to="/parent" className="font-bold text-primary underline">Parent Zone</Link>.
      </p>
    </AppShell>
  );
}

function ShopSection({ title, items }: { title: string; items: ShopItem[] }) {
  const gems = useAppState((s) => s.gems);
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-sm font-black uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => {
          const canAfford = gems >= item.price;
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-card p-3 shadow-soft"
            >
              <div className="text-3xl">{item.emoji}</div>
              <p className="mt-1 text-sm font-black leading-tight">{item.name}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{item.desc}</p>
              <button
                disabled={!canAfford}
                onClick={() => {
                  if (spendGems(item.price)) item.apply();
                }}
                className={`mt-2 flex w-full items-center justify-center gap-1 rounded-full px-3 py-1.5 text-xs font-black transition-transform ${
                  canAfford
                    ? "bg-cyan/15 text-cyan hover:scale-[1.03]"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Gem size={12} /> {item.price}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function AlPreviewModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-end sm:place-items-center bg-foreground/40 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-card p-5 shadow-glow animate-slide-up"
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl gradient-hero text-white shadow-glow">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="font-black">AL — Your AI Tutor</p>
              <p className="text-[11px] text-muted-foreground">Preview conversation</p>
            </div>
          </div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2 rounded-2xl bg-muted/40 p-3">
          <UserBubble>I don't understand what a prompt is</UserBubble>
          <AlBubble>No worries! Think of a prompt like a text message to a really smart friend. The clearer your message, the better their reply!</AlBubble>
          <UserBubble>Give me a hint</UserBubble>
          <AlBubble>Think about what you're trying to tell the AI to do. What's the most important word in your instruction?</AlBubble>
          <UserBubble>I think I got it now ✨</UserBubble>
          <AlBubble>Amazing work! You're thinking like a real prompt engineer.</AlBubble>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-primary/20 bg-primary/5 p-3">
          <Lock className="mt-0.5 h-4 w-4 text-primary" />
          <p className="text-xs text-foreground/90">
            AL is included with <b>AIED Max</b>. Upgrade to chat anytime.
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-2xl gradient-hero px-6 py-3 font-black text-white shadow-glow"
        >
          Got it
        </button>
      </div>
    </div>
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
