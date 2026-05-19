import { useState } from "react";
import { Lock } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import { Mascot } from "@/components/Mascot";
import { TutorChat } from "@/components/tutor/TutorChat";
import { requestUpgrade } from "@/lib/event-bus";

type LessonContext = {
  lessonTitle: string;
  unitTitle: string;
  levelTitle: string;
};

// Small AL avatar in the top-right corner of every screen.
// Reflects whichever outfit/cosmetic the user has equipped.
export function ALAvatar({
  lessonContext,
  size = 48,
}: {
  lessonContext?: LessonContext;
  size?: number;
}) {
  const premium = useAppState((s) => s.premium === "max" || s.premium === "family");
  const tip = useAppState((s) => s.alTip);
  const outfit = useAppState((s) => s.alOutfit) ?? "classic";
  const [open, setOpen] = useState(false);

  const hasNotif = premium && !!tip;

  return (
    <>
      <div className="relative">
        <button
          onClick={() => {
            if (!premium) {
              requestUpgrade();
            } else {
              setOpen(true);
            }
          }}
          aria-label={premium ? "Open AL tutor" : "AL — upgrade required"}
          className={`relative grid place-items-center overflow-hidden rounded-full border-2 border-primary/60 bg-white shadow-glow transition-transform hover:scale-110 ${
            premium ? "animate-al-pulse" : "opacity-70 grayscale"
          }`}
          style={{ width: size, height: size }}
        >
          {/* Mascot is sized larger and shifted so head/upper body fit the circle */}
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2"
            style={{ top: -size * 0.18 }}
          >
            <Mascot size={size * 1.5} outfit={outfit} float={premium} />
          </div>
          {!premium && (
            <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-warning text-white shadow-soft">
              <Lock className="h-2.5 w-2.5" />
            </span>
          )}
          {hasNotif && (
            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-heart ring-2 ring-background animate-ping-slow" />
          )}
        </button>
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
