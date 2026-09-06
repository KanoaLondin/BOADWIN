import { Flame } from "lucide-react";
import { useAppState, type StreakColor } from "@/lib/app-state";

// Renders the streak flame in whichever streak colour the learner equipped.
// Higher tiers get a subtle animated treatment (icy shimmer, electric crackle,
// prismatic cycle) that degrades to a flat recolour when background animations
// are turned off in Settings.
export function StreakFlame({
  className = "h-4 w-4",
  color,
  animated = true,
}: {
  className?: string;
  /** Override the equipped colour (used for friends' profiles / previews). */
  color?: StreakColor;
  animated?: boolean;
}) {
  const equipped = useAppState((s) => s.streakColor);
  const animsOff = useAppState((s) => s.bgAnimationsOff);
  const c = color ?? equipped;
  const motion = animated && !animsOff;

  return (
    <span className={`streak-flame-wrap streak-${c} ${motion ? `streak-fx-${c}` : ""}`}>
      <Flame className={`${className} relative z-10 fill-current`} />
      {motion && c === "purple" && <span className="streak-bolt" aria-hidden>⚡</span>}
    </span>
  );
}
