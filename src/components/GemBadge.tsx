import { Link } from "@tanstack/react-router";
import { useAppState } from "@/lib/app-state";

export function GemBadge() {
  const gems = useAppState((s) => s.gems);
  return (
    <Link
      to="/shop"
      className="flex items-center gap-1 rounded-full bg-cyan/15 px-2.5 py-1 text-xs font-black text-cyan transition-transform hover:scale-105"
      aria-label="Gems"
    >
      <Gem />
      {gems}
    </Link>
  );
}

export function Gem({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
    >
      <defs>
        <linearGradient id="gemGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <path d="M12 2L4 9l8 13 8-13-8-7z" fill="url(#gemGrad)" stroke="#0891b2" strokeWidth="1" strokeLinejoin="round" />
      <path d="M4 9h16M8 9l4 13M16 9l-4 13M12 2v7" stroke="#a5f3fc" strokeWidth="0.8" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}
