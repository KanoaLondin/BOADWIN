import { Sparkles } from "lucide-react";

export function Mascot({ size = 56 }: { size?: number }) {
  return (
    <div
      className="relative grid place-items-center rounded-full gradient-hero shadow-glow animate-float"
      style={{ width: size, height: size }}
      aria-label="AIED mascot"
    >
      <Sparkles className="h-1/2 w-1/2 text-white" />
      <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-cyan text-[10px] font-black text-navy-deep">
        AI
      </span>
    </div>
  );
}
