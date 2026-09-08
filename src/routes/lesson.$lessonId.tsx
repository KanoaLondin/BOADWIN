import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  X,
  Heart,
  ArrowRight,
  PartyPopper,
  RotateCw,
  Zap,
} from "lucide-react";
import { findLesson, type Lesson } from "@/lib/course-data";
import { getAdaptedLesson } from "@/lib/lesson-adapt.functions";
import { AppShell } from "@/components/AppShell";
import { ChestReward } from "@/components/ChestReward";
import { Gem } from "@/components/GemBadge";
import { ExerciseRenderer } from "@/components/ExerciseRenderer";
import { completeLesson, loseHeart, queueForReview, useAppState, type ChestTier, type StreakOutcome } from "@/lib/app-state";
import { NINJA_MULTIPLIER, NINJA_PAR_MS, scienceFact, teacherNote } from "@/lib/outfit-effects";

export const Route = createFileRoute("/lesson/$lessonId")({
  component: LessonPage,
  head: () => ({ meta: [{ title: "Lesson — AIED" }] }),
});

function LessonPage() {
  const { lessonId } = Route.useParams();
  const navigate = useNavigate();
  const data = findLesson(lessonId);

  // Persona-adapted wording: same questions and same correct answers, told in
  // language that fits this learner. Falls back to the authored copy.
  const [adapted, setAdapted] = useState<Lesson | null>(null);
  const startedRef = useRef(false);
  useEffect(() => {
    let alive = true;
    setAdapted(null);
    startedRef.current = false;
    getAdaptedLesson({ data: { lessonId } })
      .then((res) => {
        // Never swap wording out from under a learner who already started.
        if (alive && res?.adapted && !startedRef.current) setAdapted(res.lesson);
      })
      .catch((err) => console.error("[lesson] adaptation unavailable", err));
    return () => {
      alive = false;
    };
  }, [lessonId]);

  const lesson = adapted ?? data?.lesson;

  const steps = useMemo(() => {
    if (!lesson) return [] as ("intro" | number)[];
    const arr: ("intro" | number)[] = [];
    if (lesson.content) arr.push("intro");
    (lesson.exercises ?? []).forEach((_, i) => arr.push(i));
    if (arr.length === 0) arr.push("intro");
    return arr;
  }, [lesson]);

  const premiumState = useAppState((s) => s.premium);
  const [stepIdx, setStepIdx] = useState(0);
  const [hearts, setHearts] = useState(useAppState((s) => s.hearts));
  const [xpEarned, setXpEarned] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [complete, setComplete] = useState(false);
  const [reward, setReward] = useState<{
    gemsEarned: number;
    xpEarned: number;
    chest: ChestTier | null;
    streak: StreakOutcome;
  } | null>(null);
  const [chestOpen, setChestOpen] = useState<ChestTier | null>(null);
  // Ninja AL speed bonus — timed from the moment the lesson opens.
  const lessonStartRef = useRef(Date.now());
  const [elapsedMs, setElapsedMs] = useState(0);
  useEffect(() => {
    lessonStartRef.current = Date.now();
  }, [lessonId]);

  if (!data || !lesson) {
    return (
      <div className="grid min-h-screen place-items-center px-4">
        <div className="text-center">
          <p className="text-lg font-bold">Lesson not found</p>
          <Link to="/courses" className="mt-4 inline-block text-primary underline">
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  // Guard direct links, not just the course-map UI: a non-premium user
  // typing a Premium-tier lesson URL by hand shouldn't get in either.
  if (data.level.tier !== "Free" && !premiumState) {
    return (
      <div className="grid min-h-screen place-items-center px-4">
        <div className="text-center">
          <p className="text-lg font-bold">This lesson needs {data.level.tier}</p>
          <p className="mt-1 text-sm text-muted-foreground">Unlock it to keep going.</p>
          <Link to="/shop" className="mt-4 inline-block text-primary underline">
            See upgrade options
          </Link>
        </div>
      </div>
    );
  }

  const progress = ((stepIdx + (complete ? 1 : 0)) / steps.length) * 100;
  const step = steps[stepIdx];

  function next() {
    if (stepIdx + 1 >= steps.length) {
      setElapsedMs(Date.now() - lessonStartRef.current);
      setComplete(true);
    } else {
      startedRef.current = true;
      setStepIdx((s) => s + 1);
    }
  }

  function onCorrect(reward: number) {
    setXpEarned((x) => x + reward);
  }

  function onWrong(exerciseId: string) {
    setHearts((h) => Math.max(0, h - 1));
    setMistakes((m) => m + 1);
    loseHeart();
    queueForReview(exerciseId);
  }

  const lessonCtx = {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    unitTitle: data.unit.title,
    levelTitle: data.level.title,
  };

  if (complete) {
    // Award gems/xp/chest exactly once on mount of complete screen.
    // (useEffect runs after first paint; safe.)
    return (
      <CompleteScreen
        lesson={lesson}
        unit={data.unit}
        level={data.level}
        hearts={hearts}
        xpEarned={xpEarned}
        mistakes={mistakes}
        elapsedMs={elapsedMs}
        reward={reward}
        setReward={setReward}
        chestOpen={chestOpen}
        setChestOpen={setChestOpen}
        navigate={navigate}
      />
    );
  }

  if (hearts === 0) {
    return (
      <AppShell lessonContext={lessonCtx}>
        <div className="grid min-h-[70vh] place-items-center">
          <div className="w-full max-w-md text-center">
            <Heart className="mx-auto h-16 w-16 text-heart" />
            <h1 className="mt-4 text-2xl font-bold">Out of hearts</h1>
            <p className="mt-2 text-muted-foreground">
              Take a break and come back, or upgrade for unlimited hearts.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => {
                  setHearts(5);
                  setStepIdx(0);
                }}
                className="rounded-2xl bg-card border border-border px-6 py-3 font-bold shadow-soft"
              >
                <RotateCw className="mr-2 inline h-4 w-4" /> Restart lesson
              </button>
              <Link
                to="/shop"
                className="rounded-2xl gradient-hero px-6 py-3 font-bold text-white shadow-glow"
              >
                Get unlimited hearts
              </Link>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-3">
          <Link to="/courses" className="text-muted-foreground hover:text-foreground">
            <X className="h-6 w-6" />
          </Link>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full gradient-xp transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-1 text-heart">
            <Heart className="h-5 w-5 fill-current" />
            <span className="font-bold">{hearts}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6 pb-32">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          +{lesson.xp} XP · {lesson.title}
        </p>

        {step === "intro" ? (
          <IntroStep content={lesson.content ?? lesson.title} onNext={next} />
        ) : (
          <ExerciseRenderer
            key={stepIdx}
            exercise={lesson.exercises![step as number]}
            exerciseId={`${lesson.id}:${step}`}
            topic={`${lesson.title} ${data.unit.title}`}
            seed={stepIdx}
            onCorrect={() => {
              onCorrect(10);
              next();
            }}
            onClose={() => {
              onCorrect(5); // partial xp on close-enough
              next();
            }}
            onWrong={() => onWrong(`${lesson.id}:${step}`)}
            onContinue={next}
          />
        )}
      </div>
    </div>
  );
}

function CompleteScreen({
  lesson,
  unit,
  level,
  hearts,
  xpEarned,
  mistakes,
  elapsedMs,
  reward,
  setReward,
  chestOpen,
  setChestOpen,
  navigate,
}: {
  lesson: { id: string; title: string; xp: number };
  unit: { id: string; lessons: { id: string }[] };
  level: { id: string; units: { lessons: { id: string }[] }[] };
  hearts: number;
  xpEarned: number;
  mistakes: number;
  elapsedMs: number;
  reward: { gemsEarned: number; xpEarned: number; chest: ChestTier | null; streak: StreakOutcome } | null;
  setReward: (r: { gemsEarned: number; xpEarned: number; chest: ChestTier | null; streak: StreakOutcome }) => void;
  chestOpen: ChestTier | null;
  setChestOpen: (t: ChestTier | null) => void;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const completed = useAppState((s) => s.completedLessons);
  const boostUntil = useAppState((s) => s.xpBoostUntil);
  const hintedQs = useAppState((s) => s.hintedQuestions);
  const hintedCount = hintedQs.filter((id) => id.startsWith(`${lesson.id}:`)).length;
  const boostActive = !!boostUntil && boostUntil > Date.now();
  const outfit = useAppState((s) => s.alOutfit);
  const ninjaBonus = outfit === "ninja" && elapsedMs > 0 && elapsedMs < NINJA_PAR_MS;

  useEffect(() => {
    if (reward) return;
    const unitLessons = unit.lessons.map((l) => l.id);
    const levelLessons = level.units.flatMap((u) => u.lessons.map((l) => l.id));
    const newCompleted = new Set([...completed, lesson.id]);
    const unitDone = unitLessons.every((id) => newCompleted.has(id));
    const levelDone = levelLessons.every((id) => newCompleted.has(id));
    const r = completeLesson(lesson.id, {
      perfect: mistakes === 0,
      unitDone,
      levelDone,
      baseXp: lesson.xp + xpEarned,
      xpMultiplier: ninjaBonus ? NINJA_MULTIPLIER : 1,
    });
    setReward(r);
    if (r.chest) setTimeout(() => setChestOpen(r.chest), 700);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppShell>
      <div className="grid min-h-[70vh] place-items-center">
        <div className="w-full max-w-md text-center animate-pop">
          <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-full gradient-hero shadow-glow">
            <PartyPopper className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-black">Lesson complete!</h1>
          <p className="mt-2 text-muted-foreground">
            {mistakes === 0 ? "Perfect score! 🌟" : "You're making real progress."}
          </p>

          {ninjaBonus && (
            <div className="mt-4 mr-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-foreground to-primary px-4 py-1.5 text-xs font-black text-white shadow-glow animate-pop">
              🥷 NINJA SPEED BONUS 1.5×
            </div>
          )}
          {boostActive && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-warning to-heart px-4 py-1.5 text-xs font-black text-white shadow-glow animate-pop">
              <Zap className="h-3.5 w-3.5 fill-current" />
              2× XP MULTIPLIER APPLIED
            </div>
          )}

          {reward?.streak && <StreakOutcomeBanner outcome={reward.streak} />}

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-card border border-border p-3 shadow-soft">
              <p className="text-[10px] uppercase text-muted-foreground">XP</p>
              <p className="mt-1 text-xl font-black text-warning">
                +{reward?.xpEarned ?? lesson.xp + xpEarned}
              </p>
              {(boostActive || ninjaBonus) && (
                <p className="text-[9px] font-black uppercase tracking-wider text-heart">
                  {[ninjaBonus ? "1.5× ninja" : null, boostActive ? "2× boost" : null]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </div>
            <div className="rounded-2xl bg-card border border-border p-3 shadow-soft">
              <p className="text-[10px] uppercase text-muted-foreground">Gems</p>
              <p className="mt-1 flex items-center justify-center gap-1 text-xl font-black text-cyan">
                <Gem size={16} />+{reward?.gemsEarned ?? 5}
              </p>
            </div>
            <div className="rounded-2xl bg-card border border-border p-3 shadow-soft">
              <p className="text-[10px] uppercase text-muted-foreground">Hearts</p>
              <p className="mt-1 text-xl font-black text-heart">5/5</p>
            </div>
          </div>

          {hintedCount > 0 && (
            <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-warning/30 bg-warning/5 px-4 py-2 text-xs font-bold text-warning">
              💡 Hints used on {hintedCount} question{hintedCount === 1 ? "" : "s"}
            </div>
          )}

          <button
            onClick={() => navigate({ to: "/courses" })}
            className="mt-8 w-full rounded-2xl gradient-hero px-6 py-4 font-black text-white shadow-glow transition-transform hover:scale-[1.02]"
          >
            Continue
          </button>
        </div>
      </div>
      {chestOpen && <ChestReward tier={chestOpen} onClose={() => setChestOpen(null)} />}
    </AppShell>
  );
}

function StreakOutcomeBanner({ outcome }: { outcome: StreakOutcome }) {
  if (outcome.kind === "same-day") return null; // already counted today, nothing new to say
  if (outcome.kind === "freeze-saved") {
    return (
      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-primary px-4 py-1.5 text-xs font-black text-white shadow-glow animate-pop">
        ❄️ Streak Freeze saved your {outcome.streak}-day streak!
      </div>
    );
  }
  if (outcome.kind === "reset") {
    return (
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-heart/40 bg-heart/10 px-4 py-1.5 text-xs font-black text-heart animate-pop">
        💔 Your {outcome.brokenStreak}-day streak reset — day 1 of a new one starts now!
      </div>
    );
  }
  // "extended" or "started"
  return (
    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-warning to-amber-400 px-4 py-1.5 text-xs font-black text-white shadow-glow animate-pop">
      🔥 {outcome.streak}-day streak!
    </div>
  );
}

function IntroStep({ content, onNext }: { content: string; onNext: () => void }) {
  return (
    <div className="mt-6">
      <div className="rounded-3xl bg-card border border-border p-6 shadow-card">
        <h2 className="text-2xl font-bold">Let's learn!</h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground/90">{content}</p>
      </div>
      <button
        onClick={onNext}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl gradient-hero px-6 py-4 font-bold text-white shadow-glow transition-transform hover:scale-[1.02]"
      >
        I'm ready <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}

