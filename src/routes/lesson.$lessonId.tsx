import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  X,
  Heart,
  Check,
  ArrowRight,
  PartyPopper,
  RotateCw,
  ThumbsUp,
  AlertCircle,
  Zap,
} from "lucide-react";
import { findLesson, fuzzyMatch, wordBankFor, type Exercise, type Lesson } from "@/lib/course-data";
import { getAdaptedLesson } from "@/lib/lesson-adapt.functions";
import { AppShell } from "@/components/AppShell";
import { ChestReward } from "@/components/ChestReward";
import { Gem } from "@/components/GemBadge";
import { HintButton } from "@/components/HintButton";
import { completeLesson, loseHeart, useAppState, type ChestTier } from "@/lib/app-state";
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

  function onWrong() {
    setHearts((h) => Math.max(0, h - 1));
    setMistakes((m) => m + 1);
    loseHeart();
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
          <ExerciseStep
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
            onWrong={onWrong}
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
  reward: { gemsEarned: number; xpEarned: number; chest: ChestTier | null } | null;
  setReward: (r: { gemsEarned: number; xpEarned: number; chest: ChestTier | null }) => void;
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
    // Analytics only — never blocks or changes what the learner sees.
    void recordLessonCompletion(lesson.id);
    if (lessonIsQuiz(lesson.id)) {
      const total = questionCount;
      void recordQuizAttempt({ quizId: lesson.id, correct: total - mistakes, total });
    }
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

type Status = "idle" | "correct" | "close" | "wrong";

function ExerciseStep({
  exercise,
  exerciseId,
  topic,
  seed,
  onCorrect,
  onClose,
  onWrong,
  onContinue,
}: {
  exercise: Exercise;
  exerciseId: string;
  topic: string;
  seed: number;
  onCorrect: () => void;
  onClose: () => void;
  onWrong: () => void;
  onContinue: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [feedbackText, setFeedbackText] = useState<string>("");

  function mark(result: Status, text = "") {
    setStatus(result);
    setFeedbackText(text);
    if (result === "wrong") onWrong();
  }

  function handleContinue() {
    if (status === "correct") onCorrect();
    else if (status === "close") onClose();
    else onContinue();
  }

  return (
    <div className="mt-6">
      {exercise.type === "multiple-choice" && (
        <MultipleChoice
          exercise={exercise}
          status={status}
          onCheck={(right) => mark(right ? "correct" : "wrong")}
        />
      )}
      {exercise.type === "fill-blank" && (
        <FillBlank exercise={exercise} status={status} onCheck={(s, text) => mark(s, text)} />
      )}
      {exercise.type === "drag-drop" && (
        <DragDrop
          exercise={exercise}
          status={status}
          onCheck={(right) => mark(right ? "correct" : "wrong")}
        />
      )}
      {exercise.type === "true-false" && (
        <TrueFalse
          exercise={exercise}
          status={status}
          onCheck={(right) => mark(right ? "correct" : "wrong")}
        />
      )}
      {exercise.type === "matching" && (
        <Matching
          exercise={exercise}
          status={status}
          onCheck={(right) => mark(right ? "correct" : "wrong")}
        />
      )}
      {exercise.type === "short-answer" && (
        <ShortAnswer exercise={exercise} status={status} onCheck={(s) => mark(s)} />
      )}

      {status === "idle" && <HintButton exercise={exercise} exerciseId={exerciseId} />}

      {status !== "idle" && (
        <FeedbackBar
          status={status}
          message={feedbackText}
          onContinue={handleContinue}
          fallbackCorrect={fallbackCorrectText(exercise)}
          exercise={exercise}
          topic={topic}
          seed={seed}
        />
      )}
    </div>
  );
}

function fallbackCorrectText(exercise: Exercise): string {
  switch (exercise.type) {
    case "multiple-choice":
      return exercise.options[exercise.correctIndex];
    case "fill-blank":
      return exercise.answer;
    case "drag-drop":
      return exercise.words.join(" ");
    case "true-false":
      return exercise.answer ? "True" : "False";
    case "matching":
      return "See definitions above";
    case "short-answer":
      return "(your own answer)";
  }
}

function MultipleChoice({
  exercise,
  status,
  onCheck,
}: {
  exercise: Extract<Exercise, { type: "multiple-choice" }>;
  status: Status;
  onCheck: (right: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const locked = status !== "idle";

  return (
    <div>
      <h2 className="text-xl font-bold">{exercise.question}</h2>
      <div className="mt-5 grid gap-3">
        {exercise.options.map((opt, i) => {
          const isSel = selected === i;
          const isCorrect = i === exercise.correctIndex;
          let cls = "border-border bg-card hover:border-primary";
          if (locked && isCorrect) cls = "border-success bg-success/15 text-success";
          else if (locked && isSel && !isCorrect) cls = "border-heart bg-heart/15 text-heart";
          else if (isSel) cls = "border-primary bg-primary/8";
          return (
            <button
              key={i}
              disabled={locked}
              onClick={() => setSelected(i)}
              className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left font-semibold transition-all ${cls}`}
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-background text-sm">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
            </button>
          );
        })}
      </div>
      {!locked && (
        <button
          disabled={selected === null}
          onClick={() => onCheck(selected === exercise.correctIndex)}
          className="mt-6 w-full rounded-2xl gradient-hero px-6 py-4 font-bold text-white shadow-glow transition-all disabled:opacity-40 disabled:shadow-none"
        >
          Check
        </button>
      )}
    </div>
  );
}

function FillBlank({
  exercise,
  status,
  onCheck,
}: {
  exercise: Extract<Exercise, { type: "fill-blank" }>;
  status: Status;
  onCheck: (status: Status, text: string) => void;
}) {
  const [value, setValue] = useState("");
  const locked = status !== "idle";
  const parts = exercise.prompt.split(/_{2,}/);
  const before = parts[0] ?? "";
  const after = parts.slice(1).join(" ");
  const bank = useMemo(() => wordBankFor(exercise), [exercise]);

  function check() {
    const accepted = [exercise.answer, ...(exercise.acceptableAnswers ?? [])];
    const res = fuzzyMatch(value, accepted);
    if (res.status === "exact") onCheck("correct", "");
    else if (res.status === "close")
      onCheck("close", `Close enough! The correct spelling is: ${res.correctAnswer}`);
    else onCheck("wrong", `Answer: ${res.correctAnswer}`);
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Fill in the blank</h2>
      <p className="mt-4 text-lg leading-relaxed">
        {before}
        <input
          type="text"
          disabled={locked}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="type or pick"
          className="mx-1 inline-block w-44 rounded-lg border-b-2 border-primary bg-transparent px-2 py-1 text-center font-bold text-primary outline-none focus:border-accent"
        />
        {after}
      </p>

      <p className="mt-6 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        Word bank
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {bank.map((w) => {
          const picked = value.trim().toLowerCase() === w.toLowerCase();
          return (
            <button
              key={w}
              type="button"
              disabled={locked}
              onClick={() => setValue(w)}
              className={`rounded-xl border-2 px-3 py-2 text-sm font-bold transition-all disabled:opacity-60 ${
                picked
                  ? "border-primary bg-primary/12 text-primary"
                  : "border-border bg-card hover:border-primary hover:bg-primary/8"
              }`}
            >
              {w}
            </button>
          );
        })}
      </div>

      {!locked && (
        <button
          disabled={!value.trim()}
          onClick={check}
          className="mt-6 w-full rounded-2xl gradient-hero px-6 py-4 font-bold text-white shadow-glow disabled:opacity-40 disabled:shadow-none"
        >
          Check
        </button>
      )}
    </div>
  );
}


function DragDrop({
  exercise,
  status,
  onCheck,
}: {
  exercise: Extract<Exercise, { type: "drag-drop" }>;
  status: Status;
  onCheck: (right: boolean) => void;
}) {
  const shuffled = useMemo(
    () =>
      exercise.words
        .map((w, i) => ({ w, i, k: Math.random() }))
        .sort((a, b) => a.k - b.k)
        .map(({ w, i }) => ({ w, key: `${w}-${i}` })),
    [exercise],
  );

  const [pool, setPool] = useState(shuffled);
  const [built, setBuilt] = useState<{ w: string; key: string }[]>([]);
  const locked = status !== "idle";

  function pick(item: { w: string; key: string }) {
    if (locked) return;
    setPool((p) => p.filter((x) => x.key !== item.key));
    setBuilt((b) => [...b, item]);
  }
  function unpick(item: { w: string; key: string }) {
    if (locked) return;
    setBuilt((b) => b.filter((x) => x.key !== item.key));
    setPool((p) => [...p, item]);
  }

  return (
    <div>
      <h2 className="text-xl font-bold">{exercise.instruction}</h2>

      <div className="mt-5 min-h-[90px] rounded-2xl border-2 border-dashed border-border bg-muted/40 p-3">
        <div className="flex flex-wrap gap-2">
          {built.map((item) => (
            <button
              key={item.key}
              onClick={() => unpick(item)}
              className="rounded-xl bg-primary px-3 py-2 text-sm font-bold text-primary-foreground shadow-soft transition-transform hover:scale-105"
            >
              {item.w}
            </button>
          ))}
          {built.length === 0 && (
            <p className="text-sm text-muted-foreground">Tap items below to build your answer</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {pool.map((item) => (
          <button
            key={item.key}
            onClick={() => pick(item)}
            className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-bold transition-all hover:border-primary hover:bg-primary/10"
          >
            {item.w}
          </button>
        ))}
      </div>

      {!locked && (
        <button
          disabled={built.length !== exercise.words.length}
          onClick={() => onCheck(built.map((b) => b.w).join(" ") === exercise.words.join(" "))}
          className="mt-6 w-full rounded-2xl gradient-hero px-6 py-4 font-bold text-white shadow-glow disabled:opacity-40 disabled:shadow-none"
        >
          Check
        </button>
      )}
    </div>
  );
}

function TrueFalse({
  exercise,
  status,
  onCheck,
}: {
  exercise: Extract<Exercise, { type: "true-false" }>;
  status: Status;
  onCheck: (right: boolean) => void;
}) {
  const [pick, setPick] = useState<boolean | null>(null);
  const locked = status !== "idle";
  return (
    <div>
      <h2 className="text-xl font-bold">True or False?</h2>
      <p className="mt-4 rounded-2xl bg-card border border-border p-5 text-lg shadow-soft">
        {exercise.statement}
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[true, false].map((v) => {
          const isSel = pick === v;
          const isCorrect = v === exercise.answer;
          let cls = "border-border bg-card hover:border-primary";
          if (locked && isCorrect) cls = "border-success bg-success/15 text-success";
          else if (locked && isSel && !isCorrect) cls = "border-heart bg-heart/15 text-heart";
          else if (isSel) cls = "border-primary bg-primary/8";
          return (
            <button
              key={String(v)}
              disabled={locked}
              onClick={() => setPick(v)}
              className={`rounded-2xl border-2 px-4 py-5 text-lg font-bold transition-all ${cls}`}
            >
              {v ? "True" : "False"}
            </button>
          );
        })}
      </div>
      {!locked && (
        <button
          disabled={pick === null}
          onClick={() => onCheck(pick === exercise.answer)}
          className="mt-6 w-full rounded-2xl gradient-hero px-6 py-4 font-bold text-white shadow-glow disabled:opacity-40 disabled:shadow-none"
        >
          Check
        </button>
      )}
    </div>
  );
}

function Matching({
  exercise,
  status,
  onCheck,
}: {
  exercise: Extract<Exercise, { type: "matching" }>;
  status: Status;
  onCheck: (right: boolean) => void;
}) {
  const locked = status !== "idle";
  const shuffledDefs = useMemo(
    () =>
      exercise.pairs
        .map((p, i) => ({ d: p.definition, i, k: Math.random() }))
        .sort((a, b) => a.k - b.k),
    [exercise],
  );

  // termIndex -> definition string
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [drag, setDrag] = useState<{ def: string; x: number; y: number } | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [justDropped, setJustDropped] = useState<number | null>(null);

  const usedDefs = new Set(Object.values(picks));
  const allFilled = Object.keys(picks).length === exercise.pairs.length;

  function assign(termIndex: number, def: string) {
    setPicks((prev) => {
      const next: Record<number, string> = {};
      // a definition can only be used once
      for (const [k, v] of Object.entries(prev)) if (v !== def) next[Number(k)] = v;
      next[termIndex] = def;
      return next;
    });
    setJustDropped(termIndex);
    window.setTimeout(() => setJustDropped(null), 400);
  }

  function startDrag(def: string, e: React.PointerEvent) {
    if (locked) return;
    e.preventDefault();
    setDrag({ def, x: e.clientX, y: e.clientY });

    const move = (ev: PointerEvent) => {
      setDrag({ def, x: ev.clientX, y: ev.clientY });
      const el = document
        .elementFromPoint(ev.clientX, ev.clientY)
        ?.closest("[data-drop-index]") as HTMLElement | null;
      setHover(el ? Number(el.dataset.dropIndex) : null);
    };
    const up = (ev: PointerEvent) => {
      const el = document
        .elementFromPoint(ev.clientX, ev.clientY)
        ?.closest("[data-drop-index]") as HTMLElement | null;
      if (el) assign(Number(el.dataset.dropIndex), def);
      setDrag(null);
      setHover(null);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  }

  function check() {
    const right = exercise.pairs.every((p, i) => picks[i] === p.definition);
    onCheck(right);
  }

  return (
    <div className="select-none">
      <h2 className="text-xl font-bold">{exercise.instruction}</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Drag each definition onto its matching term.
      </p>

      <div className="mt-5 grid gap-3">
        {exercise.pairs.map((p, i) => {
          const sel = picks[i];
          const isCorrect = locked && sel === p.definition;
          const isWrong = locked && sel && sel !== p.definition;
          const isHover = hover === i && !!drag;
          return (
            <div key={i} className="grid grid-cols-[110px_1fr] items-stretch gap-2">
              <div className="grid place-items-center rounded-xl border-2 border-border bg-card px-3 py-2 text-center text-sm font-bold">
                {p.term}
              </div>
              <div
                data-drop-index={i}
                onClick={() => {
                  if (!locked && sel) setPicks(({ [i]: _drop, ...rest }) => rest);
                }}
                className={`min-h-[44px] rounded-xl border-2 px-3 py-2 text-sm transition-all ${
                  justDropped === i ? "animate-pop" : ""
                } ${
                  isCorrect
                    ? "border-success bg-success/10 text-success"
                    : isWrong
                      ? "border-heart bg-heart/10 text-heart"
                      : isHover
                        ? "scale-[1.02] border-primary bg-primary/15 shadow-glow"
                        : sel
                          ? "border-primary bg-primary/5 font-semibold"
                          : "border-dashed border-border bg-muted/40 text-muted-foreground"
                }`}
              >
                {sel ?? (isHover ? "Drop here" : "Drag a definition here")}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {shuffledDefs.map(({ d, i }) => {
          const used = usedDefs.has(d);
          const isDragging = drag?.def === d;
          return (
            <div
              key={i}
              onPointerDown={(e) => !used && startDrag(d, e)}
              className={`touch-none rounded-xl border px-3 py-2 text-sm font-semibold transition-all ${
                used
                  ? "border-border bg-muted text-muted-foreground line-through opacity-50"
                  : "cursor-grab border-border bg-card hover:border-primary hover:bg-primary/10 active:cursor-grabbing"
              } ${isDragging ? "opacity-40" : ""}`}
            >
              {d}
            </div>
          );
        })}
      </div>

      {drag && (
        <div
          className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 border-primary bg-card px-3 py-2 text-sm font-bold text-primary shadow-glow"
          style={{ left: drag.x, top: drag.y }}
        >
          {drag.def}
        </div>
      )}

      {!locked && (
        <button
          disabled={!allFilled}
          onClick={check}
          className="mt-6 w-full rounded-2xl gradient-hero px-6 py-4 font-bold text-white shadow-glow disabled:opacity-40 disabled:shadow-none"
        >
          Check
        </button>
      )}
    </div>
  );
}


function ShortAnswer({
  exercise,
  status,
  onCheck,
}: {
  exercise: Extract<Exercise, { type: "short-answer" }>;
  status: Status;
  onCheck: (s: Status) => void;
}) {
  const [value, setValue] = useState("");
  const locked = status !== "idle";
  const min = exercise.minWords ?? 5;
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

  function check() {
    if (wordCount >= min) onCheck("correct");
    else onCheck("wrong");
  }

  return (
    <div>
      <h2 className="text-xl font-bold">{exercise.question}</h2>
      <p className="mt-2 text-xs text-muted-foreground">
        Write at least {min} words in your own answer.
      </p>
      <textarea
        disabled={locked}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        placeholder="Type your answer here..."
        className="mt-4 w-full rounded-2xl border-2 border-border bg-card p-4 text-base outline-none focus:border-primary"
      />
      <p className="mt-1 text-xs text-muted-foreground">
        {wordCount} / {min} words
      </p>
      {!locked && (
        <button
          disabled={wordCount === 0}
          onClick={check}
          className="mt-6 w-full rounded-2xl gradient-hero px-6 py-4 font-bold text-white shadow-glow disabled:opacity-40 disabled:shadow-none"
        >
          Submit
        </button>
      )}
    </div>
  );
}

function FeedbackBar({
  status,
  message,
  onContinue,
  fallbackCorrect,
  exercise,
  topic,
  seed,
}: {
  status: Status;
  message: string;
  onContinue: () => void;
  fallbackCorrect: string;
  exercise: Exercise;
  topic: string;
  seed: number;
}) {
  const kid = useAppState((s) => s.cohortAgeGroup) === "kid";
  const outfit = useAppState((s) => s.alOutfit);
  const animsOff = useAppState((s) => s.bgAnimationsOff);
  if (status === "idle") return null;


  const cfg =
    status === "correct"
      ? {
          ring: "border-success bg-success/10",
          color: "text-success",
          btn: "bg-success",
          icon: <Check className="h-5 w-5" />,
          title: kid ? "Awesome job! 🎉" : "Nailed it!",
          anim: "animate-pop",
        }
      : status === "close"
        ? {
            ring: "border-warning bg-warning/10",
            color: "text-warning",
            btn: "bg-warning",
            icon: <ThumbsUp className="h-5 w-5" />,
            title: kid ? "So close — great try! 🌟" : "Close enough!",
            anim: "animate-pop",
          }
        : {
            ring: "border-heart bg-heart/10",
            color: "text-heart",
            btn: "bg-heart",
            icon: <AlertCircle className="h-5 w-5" />,
            title: kid ? "Good try! Let's look together 💛" : "Not quite",
            anim: "animate-shake",
          };

  const right = status === "correct";

  return (
    <div className={`relative mt-6 rounded-2xl border-2 p-5 ${cfg.ring} ${cfg.anim}`}>
      {right && outfit === "wizard" && !animsOff && <WizardSparkles />}
      <div className="flex items-center gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-full text-white ${cfg.btn}`}>
          {cfg.icon}
        </div>
        <div>
          <p className={`font-bold ${cfg.color}`}>{cfg.title}</p>
          {(message || status === "wrong") && (
            <p className="text-sm text-muted-foreground">
              {message || `Answer: ${fallbackCorrect}`}
            </p>
          )}
        </div>
      </div>

      {right && outfit === "teacher" && (
        <div className="mt-4 rounded-2xl border border-primary/30 bg-primary/5 p-4 text-left">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary">
            🎓 Teacher's Note
          </p>
          <ol className="mt-2 space-y-1.5">
            {teacherNote(exercise, topic).map((line, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground/85">
                <span className="font-black text-primary">{i + 1}.</span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {right && outfit === "scientist" && (
        <div className="mt-4 rounded-2xl border border-cyan/30 bg-cyan/5 p-4 text-left">
          <p className="text-[10px] font-black uppercase tracking-widest text-cyan">
            🥽 Science Fact
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">
            {scienceFact(topic, seed)}
          </p>
        </div>
      )}

      <button
        onClick={onContinue}
        className={`relative z-10 mt-4 w-full rounded-2xl px-6 py-3 font-bold text-white shadow-glow transition-transform hover:scale-[1.02] ${cfg.btn}`}
      >
        Continue
      </button>
    </div>
  );
}

// Wizard AL: a short magical burst of glowing motes around the feedback area.
function WizardSparkles() {
  const motes = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: `${8 + Math.random() * 84}%`,
        top: `${10 + Math.random() * 70}%`,
        dx: `${(Math.random() - 0.5) * 120}px`,
        dy: `${-30 - Math.random() * 70}px`,
        color: ["#a855f7", "#facc15", "#22d3ee", "#f472b6"][i % 4],
        delay: `${Math.random() * 0.35}s`,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
      {motes.map((m) => (
        <span
          key={m.id}
          className="wizard-spark"
          style={{
            left: m.left,
            top: m.top,
            background: m.color,
            boxShadow: `0 0 10px ${m.color}`,
            animationDelay: m.delay,
            ["--dx" as string]: m.dx,
            ["--dy" as string]: m.dy,
          }}
        />
      ))}
    </div>
  );
}
