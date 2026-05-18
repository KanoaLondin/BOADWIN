import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { X, Heart, Check, ArrowRight, PartyPopper, RotateCw } from "lucide-react";
import { findLesson, type Exercise } from "@/lib/course-data";

export const Route = createFileRoute("/lesson/$lessonId")({
  component: LessonPage,
  head: () => ({ meta: [{ title: "Lesson — AIED" }] }),
});

function LessonPage() {
  const { lessonId } = Route.useParams();
  const navigate = useNavigate();
  const data = findLesson(lessonId);

  if (!data) {
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

  const { lesson } = data;
  const steps = useMemo(() => {
    const arr: ("intro" | number)[] = [];
    if (lesson.content) arr.push("intro");
    (lesson.exercises ?? []).forEach((_, i) => arr.push(i));
    if (arr.length === 0) arr.push("intro");
    return arr;
  }, [lesson]);

  const [stepIdx, setStepIdx] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [xpEarned, setXpEarned] = useState(0);
  const [complete, setComplete] = useState(false);

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
  }

  if (complete) {
    return (
      <div className="grid min-h-screen place-items-center px-4">
        <div className="w-full max-w-md text-center animate-pop">
          <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-full gradient-hero shadow-glow">
            <PartyPopper className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Lesson complete!</h1>
          <p className="mt-2 text-muted-foreground">You're making real progress.</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl gradient-card border border-border p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">XP earned</p>
              <p className="mt-1 text-2xl font-bold text-xp">+{xpEarned + lesson.xp}</p>
            </div>
            <div className="rounded-2xl gradient-card border border-border p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Hearts left</p>
              <p className="mt-1 text-2xl font-bold text-heart">{hearts}/5</p>
            </div>
          </div>

          <button
            onClick={() => navigate({ to: "/courses" })}
            className="mt-8 w-full rounded-2xl gradient-hero px-6 py-4 font-bold text-white shadow-glow transition-transform hover:scale-[1.02]"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (hearts === 0) {
    return (
      <div className="grid min-h-screen place-items-center px-4">
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
              className="rounded-2xl bg-card border border-border px-6 py-3 font-bold"
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
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-secondary">
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

      <div className="mx-auto max-w-2xl px-4 py-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan">
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
            onWrong={onWrong}
            onContinue={next}
          />
        )}
      </div>
    </div>
  );
}

function IntroStep({ content, onNext }: { content: string; onNext: () => void }) {
  return (
    <div className="mt-6">
      <div className="rounded-3xl gradient-card border border-border p-6 shadow-card">
        <h2 className="text-2xl font-bold">Let's learn!</h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/90">{content}</p>
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

type Status = "idle" | "correct" | "wrong";

function ExerciseStep({
  exercise,
  onCorrect,
  onWrong,
  onContinue,
}: {
  exercise: Exercise;
  onCorrect: () => void;
  onWrong: () => void;
  onContinue: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");

  function check(isRight: boolean) {
    if (isRight) {
      setStatus("correct");
    } else {
      setStatus("wrong");
      onWrong();
    }
  }

  function handleContinue() {
    if (status === "correct") onCorrect();
    else onContinue();
  }

  return (
    <div className="mt-6">
      {exercise.type === "multiple-choice" && (
        <MultipleChoice exercise={exercise} status={status} onCheck={check} />
      )}
      {exercise.type === "fill-blank" && (
        <FillBlank exercise={exercise} status={status} onCheck={check} />
      )}
      {exercise.type === "drag-drop" && (
        <DragDrop exercise={exercise} status={status} onCheck={check} />
      )}

      {status !== "idle" && (
        <FeedbackBar
          status={status}
          onContinue={handleContinue}
          correctText={
            exercise.type === "fill-blank"
              ? exercise.answer
              : exercise.type === "multiple-choice"
              ? exercise.options[exercise.correctIndex]
              : exercise.words.join(" ")
          }
        />
      )}
    </div>
  );
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
          else if (isSel) cls = "border-cyan bg-cyan/10";
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
  onCheck: (right: boolean) => void;
}) {
  const [value, setValue] = useState("");
  const locked = status !== "idle";
  const [before, after] = exercise.prompt.split("___________");

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
          className="mx-1 inline-block w-44 rounded-lg border-b-2 border-cyan bg-transparent px-2 py-1 text-center font-bold text-cyan outline-none focus:border-primary"
        />
        {after}
      </p>
      {!locked && (
        <button
          disabled={!value.trim()}
          onClick={() =>
            onCheck(value.trim().toLowerCase() === exercise.answer.toLowerCase())
          }
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

      <div className="mt-5 min-h-[80px] rounded-2xl border-2 border-dashed border-border bg-card/50 p-3">
        <div className="flex flex-wrap gap-2">
          {built.map((item) => (
            <button
              key={item.key}
              onClick={() => unpick(item)}
              className="rounded-xl bg-primary px-3 py-2 text-sm font-bold text-primary-foreground shadow-card transition-transform hover:scale-105"
            >
              {item.w}
            </button>
          ))}
          {built.length === 0 && (
            <p className="text-sm text-muted-foreground">Tap words below to build your prompt</p>
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

function FeedbackBar({
  status,
  onContinue,
  correctText,
}: {
  status: Status;
  onContinue: () => void;
  correctText: string;
}) {
  const isCorrect = status === "correct";
  return (
    <div
      className={`mt-6 rounded-2xl border-2 p-5 ${
        isCorrect
          ? "border-success bg-success/10 animate-pop"
          : "border-heart bg-heart/10 animate-shake"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`grid h-10 w-10 place-items-center rounded-full ${
            isCorrect ? "bg-success text-white" : "bg-heart text-white"
          }`}
        >
          {isCorrect ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </div>
        <div>
          <p className={`font-bold ${isCorrect ? "text-success" : "text-heart"}`}>
            {isCorrect ? "Nailed it!" : "Not quite"}
          </p>
          {!isCorrect && (
            <p className="text-sm text-muted-foreground">Answer: {correctText}</p>
          )}
        </div>
      </div>
      <button
        onClick={onContinue}
        className={`mt-4 w-full rounded-2xl px-6 py-3 font-bold text-white shadow-glow transition-transform hover:scale-[1.02] ${
          isCorrect ? "bg-success" : "bg-heart"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
