import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import { TutorChat } from "@/components/tutor/TutorChat";
import { requestUpgrade } from "@/lib/event-bus";

type LessonContext = {
  lessonTitle: string;
  unitTitle: string;
  levelTitle: string;
};

// Small AL face used in the top-right corner of every screen.
// Acts as the entry point to the tutor chat.
export function ALAvatar({
  lessonContext,
  size = 44,
}: {
  lessonContext?: LessonContext;
  size?: number;
}) {
  const premium = useAppState((s) => s.premium === "max" || s.premium === "family");
  const tip = useAppState((s) => s.alTip);
  const [open, setOpen] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  // Blink animation toggle
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    const i = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 4500);
    return () => clearInterval(i);
  }, []);

  const hasNotif = premium && !!tip;

  return (
    <>
      <div className="relative">
        <button
          onClick={() => {
            if (!premium) {
              setTooltip((v) => !v);
              setTimeout(() => setTooltip(false), 2500);
            } else {
              setOpen(true);
            }
          }}
          aria-label={premium ? "Open AL tutor" : "AL — upgrade required"}
          className={`relative grid place-items-center rounded-2xl shadow-glow transition-transform hover:scale-110 ${
            premium ? "gradient-hero animate-al-pulse" : "bg-muted opacity-70 grayscale"
          }`}
          style={{ width: size, height: size }}
        >
          <ALFace blink={blink} />
          {!premium && (
            <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-warning text-white shadow-soft">
              <Lock className="h-2.5 w-2.5" />
            </span>
          )}
          {hasNotif && (
            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-heart ring-2 ring-background animate-ping-slow" />
          )}
        </button>
        {tooltip && (
          <div className="absolute right-0 top-full z-40 mt-2 w-56 rounded-xl border border-border bg-card p-3 text-xs shadow-card animate-fade-in">
            <p className="font-bold text-foreground">AL — Your AI Tutor 🤖</p>
            <p className="mt-1 text-muted-foreground">
              Upgrade to AIED Max to chat with AL.
            </p>
          </div>
        )}
      </div>
      {open && (
        <TutorChat
          onClose={() => setOpen(false)}
          lessonContext={lessonContext}
          premium={premium}
        />
      )}
    </>
  );
}

function ALFace({ blink }: { blink: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-3/5 w-3/5" xmlns="http://www.w3.org/2000/svg">
      {/* head */}
      <rect x="12" y="16" width="40" height="34" rx="11" fill="white" />
      {/* antenna */}
      <line x1="32" y1="10" x2="32" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="8" r="2.5" fill="#06B6D4" />
      {/* eyes */}
      {blink ? (
        <>
          <line x1="22" y1="30" x2="28" y2="30" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="36" y1="30" x2="42" y2="30" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="25" cy="30" r="3.2" fill="#7C3AED" />
          <circle cx="39" cy="30" r="3.2" fill="#7C3AED" />
          <circle cx="26" cy="29" r="1" fill="white" />
          <circle cx="40" cy="29" r="1" fill="white" />
        </>
      )}
      {/* smile */}
      <path d="M24 39 Q32 45 40 39" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
