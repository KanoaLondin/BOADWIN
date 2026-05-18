import { useEffect, useState } from "react";
import { openChest, type ChestTier } from "@/lib/app-state";
import { Gem } from "@/components/GemBadge";
import { X } from "lucide-react";

const TIER_META: Record<
  ChestTier,
  { label: string; tint: string; emoji: string; ring: string }
> = {
  bronze: {
    label: "Bronze Chest",
    tint: "from-amber-300 to-amber-700",
    emoji: "🥉",
    ring: "ring-amber-400",
  },
  silver: {
    label: "Silver Chest",
    tint: "from-slate-200 to-slate-500",
    emoji: "🥈",
    ring: "ring-slate-300",
  },
  gold: {
    label: "Gold Chest",
    tint: "from-yellow-300 to-yellow-600",
    emoji: "🥇",
    ring: "ring-yellow-300",
  },
  diamond: {
    label: "Diamond Chest",
    tint: "from-cyan-200 to-cyan-500",
    emoji: "💎",
    ring: "ring-cyan-300",
  },
};

export function ChestReward({
  tier,
  onClose,
}: {
  tier: ChestTier;
  onClose: () => void;
}) {
  const meta = TIER_META[tier];
  const [phase, setPhase] = useState<"idle" | "shaking" | "open">("idle");
  const [reward, setReward] = useState<ReturnType<typeof openChest> | null>(null);

  function tap() {
    if (phase !== "idle") return;
    setPhase("shaking");
    setTimeout(() => {
      const r = openChest(tier);
      setReward(r);
      setPhase("open");
    }, 1200);
  }

  // Auto-tap so user always sees a reward even without interaction (mobile-friendly)
  useEffect(() => {
    const t = setTimeout(() => {
      if (phase === "idle") tap();
    }, 1800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-foreground/70 p-6 backdrop-blur-md">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {phase !== "open" ? (
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-widest text-white/80">
            You earned a
          </p>
          <h2 className="mt-1 text-3xl font-black text-white drop-shadow">
            {meta.label}
          </h2>
          <button
            onClick={tap}
            className={`mt-8 grid h-48 w-48 place-items-center rounded-3xl bg-gradient-to-b ${meta.tint} text-7xl shadow-glow ring-8 ${meta.ring} ring-offset-4 ring-offset-transparent ${
              phase === "shaking" ? "animate-chest-shake" : "animate-chest-float"
            }`}
            aria-label="Open chest"
          >
            <span className="drop-shadow-lg">{meta.emoji}</span>
          </button>
          <p className="mt-5 text-sm font-bold text-white/90">
            Tap to open!
          </p>
          {/* Aura */}
          <div className="pointer-events-none absolute inset-0 -z-10 grid place-items-center">
            <div className={`h-72 w-72 rounded-full bg-cyan/20 blur-3xl animate-pulse`} />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-sm rounded-3xl bg-card p-6 text-center shadow-glow animate-scale-in">
          <div className="text-6xl">{meta.emoji}</div>
          <h2 className="mt-3 text-2xl font-black">{meta.label}</h2>
          <p className="text-sm text-muted-foreground">Here's what you got:</p>

          <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl border-2 border-cyan/30 bg-cyan/8 px-4 py-3 animate-pop">
            <Gem size={22} />
            <span className="text-2xl font-black text-cyan">+{reward?.gems}</span>
            <span className="font-bold text-muted-foreground">gems</span>
          </div>

          <div className="mt-3 space-y-2">
            {reward?.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl bg-muted/40 px-3 py-2 animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="flex-1 text-left font-bold">{item.name}</span>
                <span className="text-xs font-black text-success">×1</span>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full rounded-2xl gradient-hero px-6 py-3 font-black text-white shadow-glow"
          >
            Awesome!
          </button>
        </div>
      )}
    </div>
  );
}
