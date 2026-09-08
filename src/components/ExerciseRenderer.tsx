// Renders a single exercise (any type) plus its check/feedback flow.
// Extracted out of lesson.$lessonId.tsx so /practice can reuse the exact
// same exercise UI for spaced-repetition review without duplicating it.
import { useMemo, useState } from "react";
import { AlertCircle, Check, ThumbsUp } from "lucide-react";
import { findLesson, fuzzyMatch, wordBankFor, type Exercise } from "@/lib/course-data";
import { useAppState } from "@/lib/app-state";
import { HintButton } from "@/components/HintButton";
import { scienceFact, teacherNote } from "@/lib/outfit-effects";

export type Status = "idle" | "correct" | "close" | "wrong";

/** Look up an exercise by its `${lessonId}:${index}` id — the same id
 *  format used for hints and (now) the spaced-repetition review queue. */
export function findExerciseById(exerciseId: string): { exercise: Exercise; lessonTitle: string; unitTitle: string } | null {
  const sep = exerciseId.lastIndexOf(":");
  if (sep === -1) return null;
  const lessonId = exerciseId.slice(0, sep);
  const idx = Number(exerciseId.slice(sep + 1));
  if (!Number.isInteger(idx)) return null;
  const found = findLesson(lessonId);
  const exercise = found?.lesson.exercises?.[idx];
  if (!found || !exercise) return null;
  return { exercise, lessonTitle: found.lesson.title, unitTitle: found.unit.title };
}

export function ExerciseRenderer({
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

export function fallbackCorrectText(exercise: Exercise): string {
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
