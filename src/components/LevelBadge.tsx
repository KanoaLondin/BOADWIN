import { Shield } from "lucide-react";
import { getLevelInfo, TIER_STYLES } from "@/lib/level-system";

export function LevelBadge({ xp, size = 14 }: { xp: number; size?: number }) {
  const info = getLevelInfo(xp);
  const s = TIER_STYLES[info.tier];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-br ${s.bg} px-2 py-0.5 text-[10px] font-black text-white shadow-soft`}
      title={`Level ${info.level} ${info.name}`}
    >
      <Shield className="fill-current" style={{ width: size, height: size }} />
      L{info.level}
    </span>
  );
}
