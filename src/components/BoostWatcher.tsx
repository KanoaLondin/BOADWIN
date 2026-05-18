import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useAppState } from "@/lib/app-state";

// Toasts when an active XP boost expires and re-checks every 15s.
export function BoostWatcher() {
  const until = useAppState((s) => s.xpBoostUntil);
  const prev = useRef<number | null>(null);

  useEffect(() => {
    if (until && (!prev.current || prev.current !== until)) {
      prev.current = until;
    }
    if (!until) return;
    const fire = () => {
      if (until && Date.now() >= until) {
        toast("⚡ XP Boost ended", {
          description: "Your 2× XP multiplier just wore off. Tap Shop to refresh it!",
        });
        prev.current = null;
      }
    };
    const id = window.setInterval(fire, 15000);
    return () => window.clearInterval(id);
  }, [until]);

  return null;
}
