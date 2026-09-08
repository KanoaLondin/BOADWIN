import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Brain, PartyPopper, Sparkles, Zap } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Gem } from "@/components/GemBadge";
import { ExerciseRenderer, findExerciseById } from "@/components/ExerciseRenderer";
import {
  addGems,
  addXp,
  dueReviewExercises,
  recordReviewOutcome,
  removeFromReviewQueue,
  reviewQueueSize,
} from "@/lib/app-state";

// Reward per correct rep — deliberately small next to a full lesson's XP,
// since this is quick review of things already (once) learned, not new
// content, and shouldn't out-earn actually progressing through a course.
const XP_PER_CORRECT = 2;
const GEMS_PER_CORRECT = 1;

export const Route = createFileRoute("/practice")({
  component: PracticePage,
  head: () => ({
    meta: [
      { title: "Practice — AIED" },
      { name: "description", content: "Quick spaced-repetition review of questions you've missed before." },
    ],
  }),
});

function PracticePage() {
  // Snapshot the due queue once on mount — items rescheduled mid-session
  // (including this session's own answers) shouldn't reshuffle the list
  // the person is currently working through.
  const [queue] = useState(() => dueReviewExercises(15));
  const [idx, setIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [gemsEarned, setGemsEarned] = useState(0);

  const currentId: string | undefined = queue[idx];
  const resolved = currentId ? findExerciseById(currentId) : null;

  function advance(correct: boolean) {
    if (currentId) recordReviewOutcome(currentId, correct);
    if (correct) {
      addXp(XP_PER_CORRECT);
      addGems(GEMS_PER_CORRECT);
      setCorrectCount((c) => c + 1);
      setXpEarned((x) => x + XP_PER_CORRECT);
      setGemsEarned((g) => g + GEMS_PER_CORRECT);
    }
    setIdx((i) => i + 1);
  }

  // An id in the queue can't be resolved if the course content it points
  // to has since changed — drop it and move on rather than getting stuck.
  // Done as an effect (not inline during render) since it's a real side
  // effect: it writes to the store and advances local state.
  useEffect(() => {
    if (currentId && !resolved) {
      removeFromReviewQueue(currentId);
      setIdx((i) => i + 1);
    }
  }, [currentId, resolved]);

  if (currentId && !resolved) return null; // brief frame until the effect above advances past it

  if (queue.length === 0) {
    return (
      <AppShell>
        <Header />
        <div className="mt-16 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-cyan to-primary shadow-glow">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="mt-5 text-2xl font-black">Nothing to review right now</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {reviewQueueSize() > 0
              ? "You're caught up — the rest of your review queue isn't due yet. Check back later."
              : "Questions you get wrong in a lesson show up here later for a quick second try."}
          </p>
          <Link
            to="/courses"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl gradient-hero px-6 py-3 font-black text-white shadow-glow"
          >
            Keep learning
          </Link>
        </div>
      </AppShell>
    );
  }

  if (idx >= queue.length) {
    return (
      <AppShell>
        <div className="grid min-h-[70vh] place-items-center">
          <div className="w-full max-w-md text-center animate-pop">
            <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-full gradient-hero shadow-glow">
              <PartyPopper className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-black">Practice complete!</h1>
            <p className="mt-2 text-muted-foreground">
              {correctCount} of {queue.length} correct.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-card border border-border p-3 shadow-soft">
                <p className="text-[10px] uppercase text-muted-foreground">XP</p>
                <p className="mt-1 text-xl font-black text-warning">+{xpEarned}</p>
              </div>
              <div className="rounded-2xl bg-card border border-border p-3 shadow-soft">
                <p className="text-[10px] uppercase text-muted-foreground">Gems</p>
                <p className="mt-1 flex items-center justify-center gap-1 text-xl font-black text-cyan">
                  <Gem size={16} />+{gemsEarned}
                </p>
              </div>
            </div>
            <Link
              to="/"
              className="mt-8 block w-full rounded-2xl gradient-hero px-6 py-4 font-black text-white shadow-glow transition-transform hover:scale-[1.02]"
            >
              Done
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  if (!resolved) return null; // shouldn't happen once queue.length/idx checks above hold, but keeps TS happy

  return (
    <AppShell>
      <Header current={idx + 1} total={queue.length} />
      <div className="mx-auto max-w-2xl px-4 pb-32">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Review · {resolved.lessonTitle}
        </p>
        <ExerciseRenderer
          key={currentId}
          exercise={resolved.exercise}
          exerciseId={currentId!}
          topic={`${resolved.lessonTitle} ${resolved.unitTitle}`}
          seed={idx}
          onCorrect={() => advance(true)}
          onClose={() => advance(true)}
          onWrong={() => {}}
          onContinue={() => advance(false)}
        />
      </div>
    </AppShell>
  );
}

function Header({ current, total }: { current?: number; total?: number }) {
  const progress = current && total ? (current / total) * 100 : 0;
  return (
    <div className="sticky top-0 z-20 -mx-4 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl items-center gap-4">
        <Link to="/" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        {current && total ? (
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full gradient-xp transition-all" style={{ width: `${progress}%` }} />
          </div>
        ) : (
          <p className="flex flex-1 items-center gap-1.5 text-sm font-black">
            <Brain className="h-4 w-4 text-primary" /> Practice
          </p>
        )}
        {current && total && (
          <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
            <Zap className="h-3.5 w-3.5 text-warning" /> +{XP_PER_CORRECT}/correct
          </span>
        )}
      </div>
    </div>
  );
}
