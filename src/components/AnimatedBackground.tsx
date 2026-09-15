import { useMemo } from "react";
import type { ProfileBg } from "@/lib/app-state";

/**
 * Full-screen looping animated background that projects behind the app shell.
 * Set `paused` to disable animations (used when the user toggles bg motion off).
 */
export function AnimatedBackground({
  variant,
  paused = false,
  contained = false,
  className = "",
}: {
  variant: ProfileBg;
  paused?: boolean;
  contained?: boolean;
  className?: string;
}) {
  if (variant === "none") return null;
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${contained ? "absolute" : "fixed -z-10"} inset-0 overflow-hidden ${
        paused ? "[&_*]:!animation-play-state-paused" : ""
      } ${className}`}
    >
      {variant === "galaxy" && <NightSky />}
      {variant === "forest" && <Forest />}
      {variant === "ocean" && <Ocean />}
      {variant === "mountains" && <Mountains />}
      {variant === "city" && <City />}
      {variant === "abstract" && <Abstract />}
      {/* readability scrim */}
      {!contained && <div className="absolute inset-0 bg-background/35 backdrop-blur-[1px]" />}
    </div>
  );
}

/* ---------- Scenes ---------- */

function useStars(n: number, seed = 1) {
  return useMemo(() => {
    const rand = mulberry(seed);
    return Array.from({ length: n }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      r: 0.4 + rand() * 1.6,
      d: 1.4 + rand() * 3.2,
      delay: rand() * 3,
    }));
  }, [n, seed]);
}
function mulberry(s: number) {
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function NightSky() {
  const stars = useStars(140, 7);
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#050720] via-[#0c1238] to-[#1a1b4b]">
      {/* aurora ribbons */}
      <div className="absolute inset-x-0 top-1/4 h-40 -skew-y-6 bg-gradient-to-r from-emerald-500/20 via-purple-500/25 to-transparent blur-3xl animate-aurora" />
      <div className="absolute inset-x-0 top-1/2 h-32 skew-y-6 bg-gradient-to-l from-fuchsia-500/20 via-cyan-400/15 to-transparent blur-3xl animate-aurora [animation-delay:-6s]" />
      {/* moon */}
      <div className="absolute right-[10%] top-[12%] h-20 w-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-300 shadow-[0_0_60px_rgba(252,211,77,0.5)] animate-drift" />
      {/* stars */}
      <svg className="absolute inset-0 h-full w-full">
        {stars.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="#fff">
            <animate attributeName="opacity" values="0.2;1;0.2" dur={`${s.d}s`} begin={`${s.delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
      {/* shooting star */}
      <div className="absolute top-[30%] left-0 h-px w-40 bg-gradient-to-r from-transparent via-white to-transparent animate-shoot" />
    </div>
  );
}

function Forest() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#062a1f] via-[#0b3d28] to-[#04150f]">
      {/* sun rays */}
      <div className="absolute -top-10 left-1/3 h-[120%] w-40 -rotate-12 bg-gradient-to-b from-amber-200/25 to-transparent blur-2xl" />
      <div className="absolute -top-10 right-1/4 h-[120%] w-24 -rotate-6 bg-gradient-to-b from-amber-100/20 to-transparent blur-2xl" />
      {/* trees */}
      <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 400 240" preserveAspectRatio="none">
        {[20, 70, 130, 200, 270, 330, 380].map((x, i) => (
          <g key={i}>
            <rect x={x} y={140} width="10" height="100" fill="#1a2e1a" />
            <polygon points={`${x - 22},140 ${x + 5},60 ${x + 32},140`} fill="#14532d" />
            <polygon points={`${x - 18},110 ${x + 5},50 ${x + 28},110`} fill="#166534" />
          </g>
        ))}
      </svg>
      {/* fireflies */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-amber-200 shadow-[0_0_10px_2px_rgba(253,224,71,0.8)] animate-firefly"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${20 + ((i * 53) % 60)}%`,
            animationDelay: `${(i * 0.7) % 4}s`,
          }}
        />
      ))}
      {/* falling leaves */}
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="absolute -top-4 text-emerald-300/70 animate-fall"
          style={{ left: `${(i * 17) % 100}%`, animationDelay: `${i * 1.7}s`, fontSize: 16 }}
        >
          🍃
        </span>
      ))}
    </div>
  );
}

function Ocean() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#082f49] via-[#0c4a6e] to-[#031526]">
      {/* sun beams */}
      <div className="absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(circle_at_50%_-20%,rgba(186,230,253,0.35),transparent_55%)]" />
      <div className="absolute top-0 left-1/4 h-full w-1 rotate-6 bg-gradient-to-b from-cyan-200/30 to-transparent blur-md" />
      <div className="absolute top-0 left-1/2 h-full w-1 -rotate-3 bg-gradient-to-b from-cyan-200/25 to-transparent blur-md" />
      <div className="absolute top-0 right-1/4 h-full w-1 rotate-9 bg-gradient-to-b from-cyan-200/30 to-transparent blur-md" />
      {/* bubbles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full border border-cyan-100/40 bg-cyan-100/10 animate-bubble"
          style={{
            left: `${(i * 23) % 100}%`,
            width: 6 + (i % 5) * 3,
            height: 6 + (i % 5) * 3,
            animationDelay: `${(i * 0.5) % 6}s`,
          }}
        />
      ))}
      {/* fish */}
      <span className="absolute top-[40%] -left-10 text-3xl animate-swim">🐟</span>
      <span className="absolute top-[60%] -left-10 text-2xl animate-swim [animation-delay:-5s] [animation-duration:18s]">🐠</span>
      {/* seaweed */}
      <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 400 100" preserveAspectRatio="none">
        {[20, 80, 160, 240, 320, 380].map((x, i) => (
          <path
            key={i}
            d={`M${x},100 Q${x + 5},60 ${x},20`}
            stroke="#047857"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            className="origin-bottom animate-sway"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

function Mountains() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#ff7a59] via-[#ff9a8a] to-[#3b1c4a]">
      {/* sun */}
      <div className="absolute right-[15%] top-[18%] h-24 w-24 rounded-full bg-amber-200 shadow-[0_0_80px_30px_rgba(252,211,77,0.5)]" />
      {/* clouds */}
      <div className="absolute top-[20%] left-0 h-8 w-40 rounded-full bg-white/50 blur-md animate-drift" />
      <div className="absolute top-[28%] left-0 h-6 w-28 rounded-full bg-white/40 blur-md animate-drift [animation-duration:60s] [animation-delay:-15s]" />
      {/* mountains */}
      <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 400 240" preserveAspectRatio="none">
        <polygon points="0,240 90,90 170,200 220,140 320,220 400,120 400,240" fill="#3b1c4a" />
        <polygon points="0,240 90,110 130,170 130,170 100,150 95,100 105,90 100,150" fill="#fff" opacity="0.95" />
        <polygon points="120,200 170,200 150,160" fill="#fff" opacity="0.85" />
        <polygon points="280,220 320,220 300,170" fill="#fff" opacity="0.9" />
      </svg>
      {/* eagle */}
      <span className="absolute top-[35%] left-[20%] text-xl animate-soar">🦅</span>
      {/* snow */}
      {Array.from({ length: 30 }).map((_, i) => (
        <span
          key={i}
          className="absolute -top-2 h-1.5 w-1.5 rounded-full bg-white/70 animate-snow"
          style={{ left: `${(i * 13) % 100}%`, animationDelay: `${(i * 0.4) % 8}s` }}
        />
      ))}
    </div>
  );
}

function City() {
  const wins = useMemo(() => {
    const rand = mulberry(42);
    return Array.from({ length: 80 }, () => ({
      x: rand() * 100,
      y: 35 + rand() * 60,
      d: 1.5 + rand() * 4,
      delay: rand() * 3,
    }));
  }, []);
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#0b0421] via-[#1a0438] to-[#03010f]">
      {/* moon */}
      <div className="absolute right-[12%] top-[10%] h-16 w-16 rounded-full bg-violet-100 shadow-[0_0_60px_rgba(196,181,253,0.65)]" />
      {/* stars */}
      <svg className="absolute inset-0 h-1/2 w-full">
        {Array.from({ length: 40 }).map((_, i) => (
          <circle key={i} cx={`${(i * 13) % 100}%`} cy={`${(i * 7) % 35}%`} r="0.8" fill="#fff" opacity="0.6" />
        ))}
      </svg>
      {/* skyline */}
      <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 400 220" preserveAspectRatio="none">
        <g fill="#1e1b4b">
          <rect x="10"  y="80"  width="40" height="140" />
          <rect x="55"  y="110" width="30" height="110" />
          <rect x="90"  y="60"  width="50" height="160" />
          <rect x="145" y="100" width="30" height="120" />
          <rect x="180" y="50"  width="60" height="170" />
          <rect x="245" y="90"  width="35" height="130" />
          <rect x="285" y="70"  width="55" height="150" />
          <rect x="345" y="95"  width="45" height="125" />
        </g>
      </svg>
      {/* windows */}
      <svg className="absolute inset-0 h-full w-full">
        {wins.map((w, i) => (
          <rect key={i} x={`${w.x}%`} y={`${w.y}%`} width="3" height="3" fill={i % 3 === 0 ? "#06B6D4" : "#A78BFA"}>
            <animate attributeName="opacity" values="0.2;1;0.2" dur={`${w.d}s`} begin={`${w.delay}s`} repeatCount="indefinite" />
          </rect>
        ))}
      </svg>
      {/* flying vehicle */}
      <div className="absolute top-[35%] left-0 h-1 w-6 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(34,211,238,0.8)] animate-flyer" />
      {/* neon sign */}
      <div className="absolute bottom-1/4 left-1/3 rounded-md border border-fuchsia-400 px-2 py-0.5 text-[10px] font-black text-fuchsia-200 shadow-[0_0_10px_rgba(217,70,239,0.7)] animate-pulse">
        Boadwin
      </div>
    </div>
  );
}

function Abstract() {
  return (
    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#7C3AED,#06B6D4,#4338CA,#7C3AED)] animate-morph">
      <div className="absolute inset-0 bg-background/25 backdrop-blur-3xl" />
      {/* shapes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-32 w-32 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md animate-spin-slow"
          style={{
            left: `${(i * 17) % 80}%`,
            top: `${(i * 23) % 70}%`,
            animationDelay: `${i * 1.3}s`,
            animationDuration: `${20 + i * 4}s`,
          }}
        />
      ))}
      {/* particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/80 animate-rise"
          style={{ left: `${(i * 11) % 100}%`, bottom: 0, animationDelay: `${(i * 0.4) % 6}s` }}
        />
      ))}
    </div>
  );
}
