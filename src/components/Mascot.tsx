export function Mascot({ size = 56, outfit = "classic" }: { size?: number; outfit?: string }) {
  // AL — friendly glowing robot. Optional outfit accessory.
  return (
    <div
      className="relative mx-auto grid place-items-center animate-float"
      style={{ width: size, height: size }}
      aria-label="AL the AI tutor"
    >
      <div
        className="grid place-items-center rounded-3xl gradient-hero shadow-glow"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 64 64" className="h-3/5 w-3/5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="14" width="44" height="36" rx="12" fill="white" />
          <circle cx="32" cy="8" r="3" fill="#06B6D4" />
          <line x1="32" y1="11" x2="32" y2="16" stroke="white" strokeWidth="2" />
          <circle cx="24" cy="30" r="4" fill="#7C3AED" />
          <circle cx="40" cy="30" r="4" fill="#7C3AED" />
          <circle cx="25" cy="29" r="1.2" fill="white" />
          <circle cx="41" cy="29" r="1.2" fill="white" />
          <path d="M24 40 Q32 46 40 40" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {outfit === "wizard" && (
            <path d="M16 16 L32 0 L48 16 Z" fill="#7C3AED" stroke="white" strokeWidth="1" />
          )}
          {outfit === "astronaut" && (
            <circle cx="32" cy="32" r="22" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.8" />
          )}
          {outfit === "scientist" && (
            <rect x="14" y="22" width="36" height="6" rx="2" fill="white" stroke="#06B6D4" strokeWidth="1" />
          )}
        </svg>
      </div>
      <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-cyan text-[9px] font-black text-white shadow-soft">
        AL
      </span>
    </div>
  );
}
