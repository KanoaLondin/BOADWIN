import { useEffect, useState } from "react";
import { X, Snowflake, HeartCrack } from "lucide-react";
import { previewStreakOutcome, type StreakOutcome } from "@/lib/app-state";
import { useAuth } from "@/lib/auth";

type NoticeableOutcome = Extract<StreakOutcome, { kind: "freeze-saved" | "reset" }>;

// Shown at most once per browser tab (module-level flag, since AppShell
// remounts on every route navigation) — only when the person has been away
// long enough that today's streak result already matters before they've
// done a single lesson: either a streak freeze is about to cover the gap,
// or the streak already reset. A normal one-day return says nothing here;
// that's just ordinary daily use.
let shownThisSession = false;

export function WelcomeBackWatcher() {
  const { status } = useAuth();
  const [outcome, setOutcome] = useState<NoticeableOutcome | null>(null);

  useEffect(() => {
    if (status === "loading" || shownThisSession) return;
    const preview = previewStreakOutcome();
    if (preview.kind === "freeze-saved" || preview.kind === "reset") {
      shownThisSession = true;
      setOutcome(preview);
    }
  }, [status]);

  if (!outcome) return null;

  function close() {
    setOutcome(null);
  }

  if (outcome.kind === "freeze-saved") {
    return (
      <div className="fixed inset-0 z-[70] grid place-items-center bg-foreground/70 backdrop-blur-lg p-4">
        <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-br from-cyan to-primary p-7 text-center text-white shadow-glow animate-pop">
          <button onClick={close} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/15">
            <X className="h-4 w-4" />
          </button>
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white/15 shadow-glow">
            <Snowflake className="h-10 w-10 text-white" />
          </div>
          <p className="mt-3 text-[10px] font-black uppercase tracking-widest opacity-90">Welcome back</p>
          <h1 className="text-2xl font-black">Your streak freeze has you covered</h1>
          <p className="mt-3 text-sm opacity-90">
            You missed a day, but a ❄️ Streak Freeze will cover it — finish a lesson today to keep the flame going.
          </p>
          <button onClick={close} className="mt-5 w-full rounded-2xl bg-white px-6 py-3 font-black text-primary shadow-soft">
            Let's go
          </button>
        </div>
      </div>
    );
  }

  // outcome.kind === "reset"
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-foreground/70 backdrop-blur-lg p-4">
      <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-br from-slate-700 to-slate-900 p-7 text-center text-white shadow-glow animate-pop">
        <button onClick={close} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/15">
          <X className="h-4 w-4" />
        </button>
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white/15 shadow-glow">
          <HeartCrack className="h-10 w-10 text-white" />
        </div>
        <p className="mt-3 text-[10px] font-black uppercase tracking-widest opacity-90">Welcome back</p>
        <h1 className="text-2xl font-black">Your streak reset while you were away</h1>
        <p className="mt-3 text-sm opacity-90">
          Your {outcome.brokenStreak}-day streak reset since it had been a few days. No worries — finish a lesson today to start a new one.
        </p>
        <button onClick={close} className="mt-5 w-full rounded-2xl bg-white px-6 py-3 font-black text-primary shadow-soft">
          Start today
        </button>
      </div>
    </div>
  );
}
