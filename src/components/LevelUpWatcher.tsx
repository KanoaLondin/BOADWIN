import { useEffect, useState } from "react";
import { PartyPopper, X, Sparkles, Rocket } from "lucide-react";
import { useAppState, acknowledgeLevel, addGems } from "@/lib/app-state";
import { getLevelInfo, TIER_STYLES } from "@/lib/level-system";

// Watches XP, fires a celebration when crossing into a new level.
export function LevelUpWatcher() {
  const xp = useAppState((s) => s.xp);
  const name = useAppState((s) => s.name);
  const lastSeen = useAppState((s) => s.lastSeenLevel);
  const outfit = useAppState((s) => s.alOutfit);
  const animsOff = useAppState((s) => s.bgAnimationsOff);
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const lvl = getLevelInfo(xp).level;
    if (lvl > lastSeen && shown == null) {
      setShown(lvl);
      addGems(20); // level-up bonus
    }
  }, [xp, lastSeen, shown]);

  if (shown == null) return null;
  const info = getLevelInfo(xp);
  const style = TIER_STYLES[info.tier];
  // Astronaut AL turns the celebration weightless.
  const zeroG = outfit === "astronaut" && !animsOff;

  function close() {
    if (shown != null) acknowledgeLevel(shown);
    setShown(null);
  }

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-foreground/70 backdrop-blur-lg p-4">
      {zeroG ? <ZeroGDrift /> : <Confetti />}
      <div
        className={`relative w-full max-w-sm rounded-3xl p-7 text-center text-white shadow-glow animate-pop ${
          zeroG
            ? "bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 animate-zero-g-float"
            : "gradient-hero"
        }`}
      >
        <button onClick={close} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/15">
          <X className="h-4 w-4" />
        </button>
        <div className={`mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br ${style.bg} shadow-glow`}>
          {zeroG ? (
            <Rocket className="h-10 w-10 text-white animate-zero-g-float" />
          ) : (
            <PartyPopper className="h-10 w-10 text-white" />
          )}
        </div>
        <p className="mt-3 text-[10px] font-black uppercase tracking-widest opacity-90">
          {zeroG ? "Zero-G Level Up!" : "Level Up!"}
        </p>
        <h1 className="text-3xl font-black">Level {info.level}</h1>
        <h2 className="mt-1 text-xl font-black">{info.name}</h2>
        <p className="mt-3 text-sm opacity-90">
          {zeroG
            ? `Hey ${name}, you just floated up to Level ${info.level} ${info.name} — weightless and unstoppable! 🚀`
            : `Hey ${name}, you just hit Level ${info.level} ${info.name} — you are on fire! 🔥`}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-black">
          <Sparkles className="h-3.5 w-3.5" /> +20 gems bonus
        </div>
        <button
          onClick={close}
          className="mt-5 w-full rounded-2xl bg-white px-6 py-3 font-black text-primary shadow-soft"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}

// Weightless drift: pieces tumble slowly, sideways, as if there's no gravity.
function ZeroGDrift() {
  const pieces = Array.from({ length: 22 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2.5;
        const color = ["#c4b5fd", "#a5f3fc", "#fde68a", "#f5d0fe", "#ffffff"][i % 5];
        const size = 4 + Math.random() * 6;
        return (
          <span
            key={i}
            className="absolute top-[-8vh] rounded-full animate-zero-g"
            style={{
              left: `${left}%`,
              height: size,
              width: size,
              background: color,
              boxShadow: `0 0 10px ${color}`,
              animationDelay: `${delay}s`,
              ["--drift" as string]: `${(Math.random() - 0.5) * 160}px`,
            }}
          />
        );
      })}
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 30 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.6;
        const color = ["#7C3AED", "#06B6D4", "#F59E0B", "#EF4444", "#22C55E"][i % 5];
        return (
          <span
            key={i}
            className="absolute top-[-10px] h-2 w-2 rounded-sm animate-confetti"
            style={{
              left: `${left}%`,
              background: color,
              animationDelay: `${delay}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}
