import { Link } from "@tanstack/react-router";
import { Lock, Sparkles, X } from "lucide-react";
import { useBoolEvent, OPEN_UPGRADE } from "@/lib/event-bus";

export function UpgradeRequiredModal() {
  const [open, close] = useBoolEvent(OPEN_UPGRADE);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-end sm:place-items-center bg-foreground/50 backdrop-blur-sm"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-card p-6 shadow-glow animate-slide-up"
      >
        <div className="flex items-start justify-between">
          <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-hero text-white shadow-glow">
            <Lock className="h-6 w-6" />
          </div>
          <button onClick={close} className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
        <h2 className="mt-4 text-xl font-black">Premium feature</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This feature is part of <b>Super Boadwin</b> or <b>Boadwin Max</b>. Upgrade in your Profile to unlock it.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <Link
            to="/subscription"
            onClick={close}
            className="inline-flex items-center justify-center gap-2 rounded-2xl gradient-hero px-6 py-3 font-black text-white shadow-glow"
          >
            <Sparkles className="h-4 w-4" /> Upgrade Now
          </Link>
          <button
            onClick={close}
            className="rounded-2xl border border-border bg-card px-6 py-2.5 text-sm font-bold text-muted-foreground"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
