import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import { StreakFlame } from "@/components/StreakFlame";
import { GemBadge } from "@/components/GemBadge";


// Persistent top bar shown above the page content (mobile-first).
// Shows logo, streak, gems, and hearts.
export function TopBar({
  showLogo = true,
}: {
  showLogo?: boolean;
}) {
  const streak = useAppState((s) => s.streak);
  const hearts = useAppState((s) => s.hearts);

  return (
    <div className="sticky top-0 z-30 -mx-4 mb-3 border-b border-border/60 bg-background/80 px-4 py-2.5 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-2">
        {showLogo ? (
          <Link to="/" className="text-xl font-black text-gradient">
            Boadwin
          </Link>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-2">
          <Stat
            icon={<StreakFlame className="h-3.5 w-3.5" />}
            value={streak}
            color="bg-warning/12 text-warning"
          />
          <GemBadge />
          <Stat
            icon={<Heart className="h-3.5 w-3.5 fill-current" />}
            value={hearts}
            color="bg-heart/12 text-heart"
          />
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  value,
  color,
}: {
  icon: React.ReactNode;
  value: number;
  color: string;
}) {
  return (
    <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black ${color}`}>
      {icon}
      {value}
    </span>
  );
}
