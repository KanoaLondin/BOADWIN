import { useEffect, useState } from "react";

export type AlMood = "idle" | "happy" | "surprise" | "thinking" | "celebrate";

const OUTFIT_TINT: Record<string, { chest: string; eye: string; halo: string }> = {
  classic:   { chest: "#06B6D4", eye: "#06B6D4", halo: "rgba(124,58,237,0.55)" },
  scientist: { chest: "#22C55E", eye: "#22C55E", halo: "rgba(34,197,94,0.45)"  },
  astronaut: { chest: "#7DD3FC", eye: "#FFFFFF", halo: "rgba(125,211,252,0.55)" },
  wizard:    { chest: "#FBBF24", eye: "#FBBF24", halo: "rgba(167,139,250,0.7)" },
  ninja:     { chest: "#EF4444", eye: "#EF4444", halo: "rgba(239,68,68,0.55)"  },
  teacher:   { chest: "#F59E0B", eye: "#F59E0B", halo: "rgba(245,158,11,0.5)"  },
};

/**
 * AL the AI tutor — fully illustrated robot avatar with outfit overlays.
 * Use `size` for square dimensions, `outfit` for cosmetic, `mood` for expression.
 * `float` controls the gentle hover bob (default true). `wave` triggers a one-shot
 * wave animation on mount when true.
 */
export function Mascot({
  size = 96,
  outfit = "classic",
  mood = "idle",
  float = true,
  wave = false,
}: {
  size?: number;
  outfit?: string;
  mood?: AlMood;
  float?: boolean;
  wave?: boolean;
}) {
  const tint = OUTFIT_TINT[outfit] ?? OUTFIT_TINT.classic;
  const [blink, setBlink] = useState(false);
  const [antennaWiggle, setAntennaWiggle] = useState(false);

  useEffect(() => {
    const blinkI = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 3800);
    const wiggleI = setInterval(() => {
      setAntennaWiggle(true);
      setTimeout(() => setAntennaWiggle(false), 900);
    }, 5200);
    return () => {
      clearInterval(blinkI);
      clearInterval(wiggleI);
    };
  }, []);

  return (
    <div
      className={`relative grid place-items-center ${float ? "animate-float" : ""}`}
      style={{ width: size, height: size }}
      aria-label="AL the AI tutor"
    >
      {/* halo glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-70"
        style={{ background: `radial-gradient(circle, ${tint.halo} 0%, transparent 65%)` }}
      />
      <svg
        viewBox="0 0 120 140"
        width={size}
        height={size}
        className="relative drop-shadow-[0_8px_18px_rgba(124,58,237,0.35)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
          <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
          <radialGradient id="screenGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%"  stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </radialGradient>
        </defs>

        {/* antennae */}
        <g className={antennaWiggle ? "origin-bottom [transform-box:fill-box] animate-wiggle" : ""}>
          <line x1="44" y1="22" x2="40" y2="8" stroke="url(#headGrad)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="40" cy="7" r="3.6" fill={tint.chest}>
            <animate attributeName="opacity" values="0.55;1;0.55" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <line x1="76" y1="22" x2="80" y2="8" stroke="url(#headGrad)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="80" cy="7" r="3.6" fill={tint.chest}>
            <animate attributeName="opacity" values="1;0.55;1" dur="1.6s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* ears */}
        <rect x="12" y="42" width="10" height="22" rx="4" fill="url(#headGrad)" />
        <rect x="98" y="42" width="10" height="22" rx="4" fill="url(#headGrad)" />
        <circle cx="17" cy="53" r="2.5" fill={tint.chest} opacity="0.85" />
        <circle cx="103" cy="53" r="2.5" fill={tint.chest} opacity="0.85" />

        {/* head shell */}
        <rect x="20" y="20" width="80" height="62" rx="18" fill="url(#headGrad)" />
        {/* screen face */}
        <rect x="28" y="28" width="64" height="46" rx="12" fill="url(#screenGrad)" />
        {/* scanline */}
        <rect x="28" y="28" width="64" height="46" rx="12" fill="url(#scan)" opacity="0.15" />

        {/* eyes */}
        <Eyes blink={blink} mood={mood} color={tint.eye} />

        {/* mouth */}
        <Mouth mood={mood} color={tint.chest} />

        {/* neck */}
        <rect x="50" y="82" width="20" height="6" rx="2" fill="#4C1D95" />

        {/* body */}
        <rect x="20" y="86" width="80" height="44" rx="16" fill="url(#bodyGrad)" />
        {/* chest panel */}
        <rect x="42" y="96" width="36" height="22" rx="6" fill="#0F172A" />
        <ChestIcon outfit={outfit} color={tint.chest} />

        {/* arms */}
        <g className={wave ? "origin-[14px_106px] [transform-box:fill-box] animate-wave" : ""}>
          <rect x="6"  y="92" width="14" height="26" rx="7" fill="url(#bodyGrad)" />
          <circle cx="13" cy="120" r="6.5" fill="#5B21B6" />
        </g>
        <rect x="100" y="92" width="14" height="26" rx="7" fill="url(#bodyGrad)" />
        <circle cx="107" cy="120" r="6.5" fill="#5B21B6" />

        {/* outfit overlay */}
        <OutfitOverlay outfit={outfit} />
      </svg>
    </div>
  );
}

function Eyes({ blink, mood, color }: { blink: boolean; mood: AlMood; color: string }) {
  if (blink) {
    return (
      <>
        <line x1="40" y1="50" x2="52" y2="50" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
        <line x1="68" y1="50" x2="80" y2="50" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      </>
    );
  }
  if (mood === "surprise") {
    return (
      <>
        <circle cx="46" cy="50" r="7" fill={color} opacity="0.9" />
        <circle cx="74" cy="50" r="7" fill={color} opacity="0.9" />
      </>
    );
  }
  if (mood === "thinking") {
    return (
      <>
        <circle cx="46" cy="52" r="4" fill={color} />
        <circle cx="74" cy="48" r="4" fill={color} />
      </>
    );
  }
  return (
    <>
      <g>
        <circle cx="46" cy="50" r="5.5" fill={color}>
          <animate attributeName="r" values="5.5;6;5.5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="47" cy="48.5" r="1.8" fill="white" />
      </g>
      <g>
        <circle cx="74" cy="50" r="5.5" fill={color}>
          <animate attributeName="r" values="5.5;6;5.5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="75" cy="48.5" r="1.8" fill="white" />
      </g>
    </>
  );
}

function Mouth({ mood, color }: { mood: AlMood; color: string }) {
  if (mood === "surprise")
    return <ellipse cx="60" cy="64" rx="5" ry="4" fill={color} opacity="0.85" />;
  if (mood === "thinking")
    return <line x1="52" y1="64" x2="68" y2="64" stroke={color} strokeWidth="3" strokeLinecap="round" />;
  if (mood === "celebrate")
    return <path d="M48 60 Q60 74 72 60 Q60 66 48 60 Z" fill={color} opacity="0.9" />;
  // idle / happy
  return (
    <path d="M48 62 Q60 72 72 62" stroke={color} strokeWidth="3.2" strokeLinecap="round" fill="none" />
  );
}

function ChestIcon({ outfit, color }: { outfit: string; color: string }) {
  // Boadwin logo by default; outfit may override (handled here too).
  if (outfit === "scientist") {
    // beaker
    return (
      <g transform="translate(54,99)">
        <path d="M3 0 H9 V5 L13 13 H-1 L3 5 Z" fill={color} />
      </g>
    );
  }
  if (outfit === "astronaut") {
    return (
      <g transform="translate(60,107)">
        <circle r="6" fill="none" stroke={color} strokeWidth="2" />
        <circle r="2" fill={color} />
        <ellipse cx="0" cy="0" rx="7.5" ry="2" fill="none" stroke={color} strokeWidth="1.2" transform="rotate(-20)" />
      </g>
    );
  }
  if (outfit === "wizard") {
    return (
      <g transform="translate(54,100)">
        <rect width="12" height="14" rx="1.5" fill={color} />
        <line x1="6" y1="2" x2="6" y2="12" stroke="#0F172A" strokeWidth="1.2" />
      </g>
    );
  }
  if (outfit === "teacher") {
    return (
      <g transform="translate(52,101)" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round">
        <path d="M0 2 L8 6 L0 10 Z M16 2 L8 6 L16 10 Z" />
      </g>
    );
  }
  // default Boadwin chip
  return (
    <g transform="translate(60,107)" textAnchor="middle">
      <text y="3.5" fontSize="9" fontWeight="900" fill={color} fontFamily="ui-sans-serif,system-ui">
        Boadwin
      </text>
    </g>
  );
}

function OutfitOverlay({ outfit }: { outfit: string }) {
  if (outfit === "scientist") {
    return (
      <g>
        {/* lab coat lapels */}
        <path d="M30 88 L48 96 L48 128 H22 Z" fill="white" stroke="#E5E7EB" strokeWidth="1" />
        <path d="M90 88 L72 96 L72 128 H98 Z" fill="white" stroke="#E5E7EB" strokeWidth="1" />
        {/* glasses */}
        <g stroke="#0F172A" strokeWidth="1.6" fill="none">
          <circle cx="46" cy="50" r="9" />
          <circle cx="74" cy="50" r="9" />
          <line x1="55" y1="50" x2="65" y2="50" />
        </g>
      </g>
    );
  }
  if (outfit === "astronaut") {
    return (
      <g>
        {/* helmet bubble */}
        <ellipse cx="60" cy="51" rx="42" ry="36" fill="white" opacity="0.18" stroke="#E5E7EB" strokeWidth="1.5" />
        <path d="M28 40 Q60 22 92 40 Q90 60 60 56 Q30 60 28 40 Z" fill="url(#visorGrad)" opacity="0.55" />
        <defs>
          <linearGradient id="visorGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>
        </defs>
        {/* shoulder pads */}
        <rect x="18" y="88" width="84" height="10" rx="5" fill="white" opacity="0.85" />
        {/* mission patch */}
        <circle cx="32" cy="104" r="4" fill="#EF4444" />
        {/* boosters */}
        <rect x="32" y="128" width="14" height="8" rx="2" fill="white" />
        <rect x="74" y="128" width="14" height="8" rx="2" fill="white" />
        <path d="M35 136 L39 142 L43 136 Z" fill="#F59E0B">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="0.6s" repeatCount="indefinite" />
        </path>
        <path d="M77 136 L81 142 L85 136 Z" fill="#F59E0B">
          <animate attributeName="opacity" values="1;0.4;1" dur="0.6s" repeatCount="indefinite" />
        </path>
      </g>
    );
  }
  if (outfit === "wizard") {
    return (
      <g>
        {/* robe */}
        <path d="M18 90 Q60 84 102 90 L106 132 H14 Z" fill="#5B21B6" stroke="#FBBF24" strokeWidth="1" />
        {/* hat */}
        <path d="M30 22 Q60 -18 90 22 Q72 28 60 26 Q48 28 30 22 Z" fill="#5B21B6" stroke="#FBBF24" strokeWidth="1.5" />
        <path d="M28 22 H92 L88 30 H32 Z" fill="#4C1D95" />
        <text x="55" y="13" fontSize="6" fill="#FBBF24">★</text>
        <text x="68" y="9"  fontSize="5" fill="#FBBF24">★</text>
        {/* staff */}
        <line x1="13" y1="120" x2="6" y2="80" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
        <path d="M6 80 L2 73 L10 75 L4 70 L12 71 Z" fill="#FBBF24">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.3s" repeatCount="indefinite" />
        </path>
      </g>
    );
  }
  if (outfit === "ninja") {
    return (
      <g>
        {/* mask covering lower face */}
        <path d="M28 56 H92 V72 Q60 82 28 72 Z" fill="#0F172A" />
        {/* gi */}
        <path d="M20 88 H100 V128 H20 Z" fill="#1E293B" />
        <rect x="20" y="106" width="80" height="6" fill="white" />
        {/* floating shuriken */}
        <g fill="#E2E8F0">
          <path d="M2 70 L6 66 L10 70 L6 74 Z">
            <animateTransform attributeName="transform" type="rotate" from="0 6 70" to="360 6 70" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M110 100 L114 96 L118 100 L114 104 Z">
            <animateTransform attributeName="transform" type="rotate" from="0 114 100" to="360 114 100" dur="2.4s" repeatCount="indefinite" />
          </path>
        </g>
      </g>
    );
  }
  if (outfit === "teacher") {
    return (
      <g>
        {/* blazer */}
        <path d="M22 88 L48 96 L48 128 H22 Z" fill="#1E293B" />
        <path d="M98 88 L72 96 L72 128 H98 Z" fill="#1E293B" />
        {/* cap */}
        <rect x="24" y="18" width="72" height="8" fill="#0F172A" />
        <path d="M14 26 H106 L60 18 Z" fill="#0F172A" />
        <circle cx="100" cy="22" r="2" fill="#FBBF24" />
        <line x1="100" y1="22" x2="106" y2="34" stroke="#FBBF24" strokeWidth="1.5" />
        <circle cx="106" cy="35" r="2" fill="#FBBF24" />
        {/* small glasses */}
        <g stroke="#0F172A" strokeWidth="1.4" fill="none">
          <circle cx="46" cy="50" r="7" />
          <circle cx="74" cy="50" r="7" />
          <line x1="53" y1="50" x2="67" y2="50" />
        </g>
        {/* pointer */}
        <line x1="107" y1="120" x2="118" y2="92" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="118" cy="92" r="2" fill="#E5E7EB" />
      </g>
    );
  }
  return null;
}
