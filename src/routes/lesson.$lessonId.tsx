import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  X,
  Heart,
  Check,
  ArrowRight,
  PartyPopper,
  RotateCw,
  ThumbsUp,
  AlertCircle,
} from "lucide-react";
import { findLesson, fuzzyMatch, levels, type Exercise } from "@/lib/course-data";
import { AppShell } from "@/components/AppShell";
import { ChestReward } from "@/components/ChestReward";
import { Gem } from "@/components/GemBadge";
import { completeLesson, loseHeart, useAppState, type ChestTier } from "@/lib/app-state";

export const Route = createFileRoute("/lesson/$lessonId")({
  component: LessonPage,
  head: () => ({ meta: [{ title: "Lesson — AIED" }] }),
});

function LessonPage() {
  const { lessonId } = Route.useParams();
  const navigate = useNavigate();
  const data = findLesson(lessonId);
  const lesson = data?.lesson;

  const steps = useMemo(() => {
    if (!lesson) return [] as ("intro" | number)[];
    const arr: ("intro" | number)[] = [];
    if (lesson.content) arr.push("intro");
    (lesson.exercises ?? []).forEach((_, i) => arr.push(i));
    if (arr.length === 0) arr.push("intro");
    return arr;
  }, [lesson]);

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

  const progress = ((stepIdx + (complete ? 1 : 0)) / steps.length) * 100;
  const step = steps[stepIdx];

  function next() {
    if (stepIdx + 1 >= steps.length) {
      setComplete(true);
    } else {
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

      {/* Floating tutor */}
      <TutorFloatingButton lessonContext={lessonCtx} />
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

type Status = "idle" | "correct" | "close" | "wrong";

function ExerciseStep({
  exercise,
  onCorrect,
  onClose,
  onWrong,
  onContinue,
}: {
  exercise: Exercise;
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
        <FillBlank
          exercise={exercise}
          status={status}
          onCheck={(s, text) => mark(s, text)}
        />
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
        <ShortAnswer
          exercise={exercise}
          status={status}
          onCheck={(s) => mark(s)}
        />
      )}

      {status !== "idle" && (
        <FeedbackBar
          status={status}
          message={feedbackText}
          onContinue={handleContinue}
          fallbackCorrect={fallbackCorrectText(exercise)}
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
          else if (locked && isSel && !isCorrect)
            cls = "border-heart bg-heart/15 text-heart";
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
  const [before, after] = exercise.prompt.split("___________");

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
          placeholder="type here"
          className="mx-1 inline-block w-44 rounded-lg border-b-2 border-primary bg-transparent px-2 py-1 text-center font-bold text-primary outline-none focus:border-accent"
        />
        {after}
      </p>
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
    [exercise]
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
          onClick={() =>
            onCheck(built.map((b) => b.w).join(" ") === exercise.words.join(" "))
          }
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
    [exercise]
  );

  // user picks: termIndex -> definition string
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [activeTerm, setActiveTerm] = useState<number | null>(null);

  function selectDef(d: string) {
    if (locked || activeTerm === null) return;
    setPicks((p) => ({ ...p, [activeTerm]: d }));
    setActiveTerm(null);
  }

  const usedDefs = new Set(Object.values(picks));
  const allFilled = Object.keys(picks).length === exercise.pairs.length;

  function check() {
    const right = exercise.pairs.every((p, i) => picks[i] === p.definition);
    onCheck(right);
  }

  return (
    <div>
      <h2 className="text-xl font-bold">{exercise.instruction}</h2>
      <div className="mt-5 grid gap-3">
        {exercise.pairs.map((p, i) => {
          const sel = picks[i];
          const isCorrect = locked && sel === p.definition;
          const isWrong = locked && sel && sel !== p.definition;
          const isActive = activeTerm === i;
          return (
            <div key={i} className="grid grid-cols-[110px_1fr] gap-2">
              <button
                disabled={locked}
                onClick={() => setActiveTerm(i)}
                className={`rounded-xl border-2 px-3 py-2 text-sm font-bold transition-all ${
                  isActive ? "border-primary bg-primary/10" : "border-border bg-card"
                }`}
              >
                {p.term}
              </button>
              <div
                className={`rounded-xl border-2 px-3 py-2 text-sm transition-all ${
                  isCorrect
                    ? "border-success bg-success/10 text-success"
                    : isWrong
                    ? "border-heart bg-heart/10 text-heart"
                    : sel
                    ? "border-primary bg-primary/5"
                    : "border-dashed border-border bg-muted/40 text-muted-foreground"
                }`}
              >
                {sel ?? (activeTerm === i ? "Pick a definition below..." : "—")}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {shuffledDefs.map(({ d, i }) => {
          const used = usedDefs.has(d);
          return (
            <button
              key={i}
              disabled={locked || used || activeTerm === null}
              onClick={() => selectDef(d)}
              className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-all ${
                used
                  ? "border-border bg-muted text-muted-foreground line-through opacity-50"
                  : "border-border bg-card hover:border-primary hover:bg-primary/10"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>

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
}: {
  status: Status;
  message: string;
  onContinue: () => void;
  fallbackCorrect: string;
}) {
  if (status === "idle") return null;

  const cfg =
    status === "correct"
      ? {
          ring: "border-success bg-success/10",
          color: "text-success",
          btn: "bg-success",
          icon: <Check className="h-5 w-5" />,
          title: "Nailed it!",
          anim: "animate-pop",
        }
      : status === "close"
      ? {
          ring: "border-warning bg-warning/10",
          color: "text-warning",
          btn: "bg-warning",
          icon: <ThumbsUp className="h-5 w-5" />,
          title: "Close enough!",
          anim: "animate-pop",
        }
      : {
          ring: "border-heart bg-heart/10",
          color: "text-heart",
          btn: "bg-heart",
          icon: <AlertCircle className="h-5 w-5" />,
          title: "Not quite",
          anim: "animate-shake",
        };

  return (
    <div className={`mt-6 rounded-2xl border-2 p-5 ${cfg.ring} ${cfg.anim}`}>
      <div className="flex items-center gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-full text-white ${cfg.btn}`}>
          {cfg.icon}
        </div>
        <div>
          <p className={`font-bold ${cfg.color}`}>{cfg.title}</p>
          {(message || status === "wrong") && (
            <p className="text-sm text-muted-foreground">{message || `Answer: ${fallbackCorrect}`}</p>
          )}
        </div>
      </div>
      <button
        onClick={onContinue}
        className={`mt-4 w-full rounded-2xl px-6 py-3 font-bold text-white shadow-glow transition-transform hover:scale-[1.02] ${cfg.btn}`}
      >
        Continue
      </button>
    </div>
  );
}
