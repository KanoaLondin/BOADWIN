import { useState } from "react";
import { Bot, Lock } from "lucide-react";
import { TutorChat } from "./TutorChat";

// Treat the user as premium when localStorage flag is set.
function usePremium() {
  const isPremium =
    typeof window !== "undefined" &&
    window.localStorage.getItem("aied:premium") === "true";
  return isPremium;
}

export function TutorFloatingButton({
  lessonContext,
}: {
  lessonContext?: { lessonTitle: string; unitTitle: string; levelTitle: string };
}) {
  const [open, setOpen] = useState(false);
  const premium = usePremium();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AL tutor"
        className="fixed bottom-24 right-4 z-30 grid h-14 w-14 place-items-center rounded-full gradient-hero text-white shadow-glow animate-pulse-glow hover:scale-105 transition-transform"
      >
        <Bot className="h-7 w-7" />
        {!premium && (
          <span className="absolute -top-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-warning text-white shadow-soft">
            <Lock className="h-3 w-3" />
          </span>
        )}
      </button>

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
