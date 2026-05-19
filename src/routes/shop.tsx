import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Gem } from "@/components/GemBadge";
import { AppShell } from "@/components/AppShell";
import { X, AlertCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  useAppState,
  spendGems,
  addStreakFreeze,
  addHeartRefill,
  addSkipToken,
  addHintTokens,
  activateXpBoost,
  ownOutfit, equipOutfit,
  ownStreakColor, equipStreakColor,
  ownProfileBg, equipProfileBg,
  ownBadgeFrame, equipBadgeFrame,
  type StreakColor, type ProfileBg, type BadgeFrame,
} from "@/lib/app-state";
import { Mascot } from "@/components/Mascot";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export const Route = createFileRoute("/shop")({
  component: Shop,
  head: () => ({ meta: [{ title: "Shop — AIED" }] }),
});

type PowerUp = {
  id: string; name: string; emoji: string; desc: string; price: number;
  buy: () => void;
};

const POWERUPS: PowerUp[] = [
  { id: "freeze",   name: "Streak Freeze", emoji: "❄️", desc: "Protects your streak (max 2).", price: 20, buy: () => addStreakFreeze(1) },
  { id: "heart",    name: "Heart Refill",  emoji: "❤️", desc: "Refill all hearts.",            price: 15, buy: () => addHeartRefill(1) },
  { id: "boost",    name: "XP Boost (2h)", emoji: "⚡", desc: "Double XP for 2 hours.",        price: 30, buy: () => activateXpBoost(2) },
  { id: "skip",     name: "Lesson Skip",   emoji: "🎯", desc: "Skip one non-quiz lesson.",     price: 50, buy: () => addSkipToken(1) },
  { id: "hint",     name: "Hint Token",    emoji: "💡", desc: "One free hint in a question.",  price: 10, buy: () => addHintTokens(1) },
];

type Cosmetic = {
  id: string; name: string; emoji: string; desc: string; price: number;
  cat: "outfit" | "bg" | "frame" | "streak";
  preview?: string;
};

const COSMETICS: Cosmetic[] = [
  { id: "scientist", name: "Scientist AL", emoji: "🥽", desc: "Lab coat + science encouragements.", price: 40, cat: "outfit" },
  { id: "teacher",   name: "Teacher AL",   emoji: "🎓", desc: "Grad cap + deeper explanations.",     price: 50, cat: "outfit" },
  { id: "astronaut", name: "Astronaut AL", emoji: "🚀", desc: "Helmet + space lesson backgrounds.",  price: 60, cat: "outfit" },
  { id: "ninja",     name: "Ninja AL",     emoji: "🥷", desc: "Mask + fast-answer XP bonus.",        price: 70, cat: "outfit" },
  { id: "wizard",    name: "Wizard AL",    emoji: "🧙", desc: "Hat + magical particle answers.",     price: 80, cat: "outfit" },

  { id: "galaxy",    name: "Galaxy",       emoji: "🌌", desc: "Profile background.", price: 30, cat: "bg" },
  { id: "forest",    name: "Forest",       emoji: "🌲", desc: "Profile background.", price: 30, cat: "bg" },
  { id: "ocean",     name: "Ocean",        emoji: "🌊", desc: "Profile background.", price: 30, cat: "bg" },
  { id: "mountains", name: "Mountains",    emoji: "🏔️", desc: "Profile background.", price: 30, cat: "bg" },
  { id: "city",      name: "City Skyline", emoji: "🏙️", desc: "Profile background.", price: 30, cat: "bg" },
  { id: "abstract",  name: "Abstract",     emoji: "🎨", desc: "Profile background.", price: 30, cat: "bg" },

  { id: "gold",    name: "Gold Frame",    emoji: "🥇", desc: "Badge frame.", price: 25, cat: "frame" },
  { id: "neon",    name: "Neon Frame",    emoji: "💡", desc: "Badge frame.", price: 25, cat: "frame" },
  { id: "rainbow", name: "Rainbow Frame", emoji: "🌈", desc: "Badge frame.", price: 25, cat: "frame" },
  { id: "fire",    name: "Fire Frame",    emoji: "🔥", desc: "Badge frame.", price: 25, cat: "frame" },
  { id: "ice",     name: "Ice Frame",     emoji: "🧊", desc: "Badge frame.", price: 25, cat: "frame" },

  { id: "blue",    name: "Blue Ice Streak",      emoji: "🧊", desc: "Streak color.", price: 20, cat: "streak" },
  { id: "purple",  name: "Purple Lightning",     emoji: "⚡", desc: "Streak color.", price: 20, cat: "streak" },
  { id: "green",   name: "Green Toxic",          emoji: "🟢", desc: "Streak color.", price: 20, cat: "streak" },
  { id: "rainbow", name: "Rainbow Streak",       emoji: "🌈", desc: "Streak color.", price: 20, cat: "streak" },
];

function Shop() {
  const gems = useAppState((s) => s.gems);
  const ownedOutfits = useAppState((s) => s.ownedOutfits);
  const ownedBgs = useAppState((s) => s.ownedProfileBgs);
  const ownedFrames = useAppState((s) => s.ownedBadgeFrames);
  const ownedStreaks = useAppState((s) => s.ownedStreakColors);

  const [insufficient, setInsufficient] = useState<{ name: string; price: number } | null>(null);
  const [preview, setPreview] = useState<Cosmetic | null>(null);

  function tryBuyPowerup(p: PowerUp) {
    if (gems < p.price) return setInsufficient({ name: p.name, price: p.price });
    if (spendGems(p.price)) { p.buy(); toast.success(`${p.emoji} ${p.name} added!`); }
  }

  function isOwned(c: Cosmetic): boolean {
    if (c.cat === "outfit") return ownedOutfits.includes(c.id);
    if (c.cat === "bg")     return ownedBgs.includes(c.id as ProfileBg);
    if (c.cat === "frame")  return ownedFrames.includes(c.id as BadgeFrame);
    return ownedStreaks.includes(c.id as StreakColor);
  }

  function buyCosmetic(c: Cosmetic) {
    if (gems < c.price) return setInsufficient({ name: c.name, price: c.price });
    if (!spendGems(c.price)) return;
    if (c.cat === "outfit")     { ownOutfit(c.id);                 equipOutfit(c.id); }
    else if (c.cat === "bg")    { ownProfileBg(c.id as ProfileBg); equipProfileBg(c.id as ProfileBg); }
    else if (c.cat === "frame") { ownBadgeFrame(c.id as BadgeFrame); equipBadgeFrame(c.id as BadgeFrame); }
    else                        { ownStreakColor(c.id as StreakColor); equipStreakColor(c.id as StreakColor); }
    toast.success(`${c.emoji} ${c.name} unlocked & equipped!`);
    setPreview(null);
  }

  return (
    <AppShell>
      <header className="text-center">
        <h1 className="text-3xl font-black">Shop</h1>
        <p className="mt-1 text-sm text-muted-foreground">Spend gems on power-ups & cosmetics.</p>
        <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-2xl border-2 border-cyan/40 bg-cyan/10 px-5 py-2.5 shadow-glow">
          <Gem size={20} />
          <span className="text-2xl font-black text-cyan">{gems}</span>
          <span className="text-xs font-bold uppercase text-cyan/70">gems</span>
        </div>
      </header>

      <h2 className="mt-8 mb-3 text-sm font-black uppercase tracking-wider text-muted-foreground">
        Power-ups
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {POWERUPS.map((p) => {
          const afford = gems >= p.price;
          return (
            <div key={p.id} className="rounded-2xl border border-border bg-card p-3 shadow-soft">
              <div className="text-3xl">{p.emoji}</div>
              <p className="mt-1 text-sm font-black leading-tight">{p.name}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{p.desc}</p>
              <button
                onClick={() => tryBuyPowerup(p)}
                className={`mt-2 flex w-full items-center justify-center gap-1 rounded-full px-3 py-1.5 text-xs font-black ${
                  afford ? "bg-cyan/15 text-cyan hover:scale-[1.03]" : "bg-muted text-muted-foreground"
                }`}
              >
                <Gem size={12} /> {p.price}
              </button>
            </div>
          );
        })}
      </div>

      <h2 className="mt-8 mb-3 text-sm font-black uppercase tracking-wider text-muted-foreground">
        Cosmetics
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {COSMETICS.map((c) => {
          const owned = isOwned(c);
          return (
            <button
              key={`${c.cat}-${c.id}`}
              onClick={() => setPreview(c)}
              className="text-left rounded-2xl border border-border bg-card p-3 shadow-soft transition-transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{c.emoji}</span>
                <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">{c.cat}</span>
              </div>
              <p className="mt-1 text-sm font-black leading-tight">{c.name}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{c.desc}</p>
              <span className={`mt-2 inline-flex w-full items-center justify-center gap-1 rounded-full px-3 py-1 text-xs font-black ${
                owned ? "bg-success/15 text-success" : "bg-cyan/15 text-cyan"
              }`}>
                {owned ? "Owned" : <><Gem size={12} /> {c.price}</>}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Looking for subscription plans? Manage them in your{" "}
        <Link to="/profile" className="font-bold text-primary underline">Profile</Link>.
      </p>

      {insufficient && (
        <InsufficientModal info={insufficient} gems={gems} onClose={() => setInsufficient(null)} />
      )}
      {preview && (
        <PreviewModal cosmetic={preview} owned={isOwned(preview)} onBuy={() => buyCosmetic(preview)} onClose={() => setPreview(null)} />
      )}
    </AppShell>
  );
}

// Portal modals to document.body so AppShell's transformed wrapper can't
// trap them in the wrong containing block (which was making them render at
// the bottom of the long page instead of pinned to the viewport).
function ModalPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted || typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

function InsufficientModal({ info, gems, onClose }: { info: { name: string; price: number }; gems: number; onClose: () => void }) {
  const short = info.price - gems;
  const pct = Math.min(100, Math.round((gems / info.price) * 100));
  return (
    <ModalPortal>
    <div className="fixed inset-0 z-[60] grid place-items-end sm:place-items-center bg-foreground/50 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-card p-6 shadow-glow animate-slide-up mb-20 sm:mb-0 max-h-[80vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-warning/15 text-warning">
            <AlertCircle className="h-6 w-6" />
          </div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
        <h2 className="mt-4 text-xl font-black">Need {short} more gems</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          You need {short} more gems to get <b>{info.name}</b>. Keep completing lessons to earn more!
        </p>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-cyan">{gems} / {info.price}</span>
          </div>
          <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full gradient-xp transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex items-start gap-2 rounded-2xl border border-border bg-card p-3">
            <span className="text-lg">💎</span>
            <div><b>Perfect a lesson</b><p className="text-xs text-muted-foreground">Earn 10 gems for zero mistakes.</p></div>
          </li>
          <li className="flex items-start gap-2 rounded-2xl border border-border bg-card p-3">
            <span className="text-lg">🎁</span>
            <div><b>Open a chest</b><p className="text-xs text-muted-foreground">Chests can drop up to 50 gems.</p></div>
          </li>
        </ul>
        <Link to="/courses" onClick={onClose} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl gradient-hero px-6 py-3 font-black text-white shadow-glow">
          Go earn gems <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function PreviewModal({ cosmetic, owned, onBuy, onClose }: { cosmetic: Cosmetic; owned: boolean; onBuy: () => void; onClose: () => void }) {
  const equippedOutfit  = useAppState((s) => s.alOutfit);
  const equippedBg      = useAppState((s) => s.profileBg);
  const equippedFrame   = useAppState((s) => s.badgeFrame);
  const equippedStreak  = useAppState((s) => s.streakColor);
  const isEquipped =
    (cosmetic.cat === "outfit" && equippedOutfit === cosmetic.id) ||
    (cosmetic.cat === "bg"     && equippedBg === cosmetic.id) ||
    (cosmetic.cat === "frame"  && equippedFrame === cosmetic.id) ||
    (cosmetic.cat === "streak" && equippedStreak === cosmetic.id);

  function handleEquip() {
    if (cosmetic.cat === "outfit") equipOutfit(cosmetic.id);
    else if (cosmetic.cat === "bg") equipProfileBg(cosmetic.id as ProfileBg);
    else if (cosmetic.cat === "frame") equipBadgeFrame(cosmetic.id as BadgeFrame);
    else equipStreakColor(cosmetic.id as StreakColor);
    toast.success(`${cosmetic.emoji} ${cosmetic.name} equipped!`);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-end sm:place-items-center bg-foreground/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-t-3xl sm:rounded-3xl bg-card shadow-glow animate-slide-up mb-20 sm:mb-0 max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between p-5 pb-3">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{cosmetic.cat} preview</div>
            <h2 className="text-xl font-black">{cosmetic.name}</h2>
            <p className="text-sm text-muted-foreground">{cosmetic.desc}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Full-bleed preview stage — always renders a fallback gradient so it can never go black */}
        <div className="relative mx-5 h-60 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-purple/15 via-card to-cyan/15">
          {cosmetic.cat === "bg" && (
            <div className="absolute inset-0">
              <ScenePreview variant={cosmetic.id as ProfileBg} />
            </div>
          )}
          <div className="absolute inset-0 grid place-items-center p-4">
            {cosmetic.cat === "outfit" && <Mascot size={170} outfit={cosmetic.id} wave />}
            {cosmetic.cat === "bg" && <Mascot size={140} outfit="classic" />}
            {cosmetic.cat === "frame" && <FramePreview frame={cosmetic.id as BadgeFrame} />}
            {cosmetic.cat === "streak" && (
              <span className={`text-8xl streak-${cosmetic.id}`}>🔥</span>
            )}
          </div>
          {owned && (
            <span className="absolute right-3 top-3 rounded-full bg-success px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-soft">
              {isEquipped ? "Equipped ✓" : "Owned"}
            </span>
          )}
        </div>

        <div className="p-5 pt-4">
          {!owned ? (
            <button
              onClick={onBuy}
              className="flex w-full items-center justify-center gap-2 rounded-2xl gradient-hero px-6 py-3 font-black text-white shadow-glow transition-transform active:scale-[0.98]"
            >
              Purchase · <Gem size={14} /> {cosmetic.price}
            </button>
          ) : isEquipped ? (
            <button
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-success/15 px-6 py-3 font-black text-success border-2 border-success/30"
            >
              ✓ Equipped
            </button>
          ) : (
            <button
              onClick={handleEquip}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-success px-6 py-3 font-black text-white shadow-glow transition-transform active:scale-[0.98]"
            >
              Equip
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Three sample circular badges so frame buyers see exactly what they'll get.
function FramePreview({ frame }: { frame: BadgeFrame }) {
  const cls = frame === "none" ? "" : `frame-${frame}`;
  const samples = ["🔥", "⭐", "🏆"];
  return (
    <div className="flex items-center gap-5">
      {samples.map((e, i) => (
        <div
          key={i}
          className={`grid h-16 w-16 place-items-center rounded-full text-3xl gradient-hero shadow-glow ${cls}`}
        >
          <span className="drop-shadow-sm">{e}</span>
        </div>
      ))}
    </div>
  );
}

// Lightweight inline scene preview that scopes the AnimatedBackground inside the modal.
function ScenePreview({ variant }: { variant: ProfileBg }) {
  return <AnimatedBackground variant={variant} contained />;
}



