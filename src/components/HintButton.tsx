import { useState } from "react";
import { Lightbulb, Lock } from "lucide-react";
import { toast } from "sonner";
import type { Exercise } from "@/lib/course-data";
import { useAppState, useHintToken } from "@/lib/app-state";

function clueFor(exercise: Exercise): string {
  switch (exercise.type) {
    case "multiple-choice": {
      // Eliminate one wrong option
      const wrongs = exercise.options
        .map((o, i) => ({ o, i }))
        .filter((x) => x.i !== exercise.correctIndex);
      const pick = wrongs[Math.floor(Math.random() * wrongs.length)];
      return `It's definitely not "${pick.o}". Narrow it down from there.`;
    }
    case "fill-blank": {
      const a = exercise.answer;
      const first = a.slice(0, 1).toUpperCase();
      return `Starts with "${first}" and is ${a.length} letters long.`;
    }
    case "drag-drop":
      return `The first word is "${exercise.words[0]}". Build from there.`;
    case "true-false":
      return exercise.explanation
        ? `Hint: ${exercise.explanation.split(/[.!?]/)[0]}.`
        : `Think carefully — the answer is ${exercise.answer ? "True" : "False"}, but ask yourself why.`;
    case "matching": {
      const p = exercise.pairs[0];
      return `"${p.term}" pairs with "${p.definition}". Use that to deduce the rest.`;
    }
    case "short-answer":
      return exercise.referenceAnswer
        ? `Try starting with: "${exercise.referenceAnswer.split(" ").slice(0, 6).join(" ")}…"`
        : `Think about a real example from your day. State it, then explain why.`;
  }
}

export function HintButton({
  exercise,
  exerciseId,
}: {
  exercise: Exercise;
  exerciseId: string;
}) {
  const tokens = useAppState((s) => s.hintTokens);
  const alreadyHinted = useAppState((s) => s.hintedQuestions.includes(exerciseId));
  const [clue, setClue] = useState<string | null>(alreadyHinted ? clueFor(exercise) : null);

  function reveal() {
    if (clue) return;
    if (tokens <= 0) {
      toast.error("Out of Hint Tokens", {
        description: "Grab more in the Shop to keep the clues coming.",
      });
      return;
    }
    const ok = useHintToken(exerciseId);
    if (ok) {
      setClue(clueFor(exercise));
      toast("Hint revealed 💡", { description: "−1 Hint Token" });
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={reveal}
        disabled={!!clue}
        className="inline-flex items-center gap-2 rounded-full border border-warning/40 bg-warning/10 px-3 py-1.5 text-xs font-bold text-warning transition-all hover:bg-warning/15 disabled:opacity-70"
      >
        {tokens <= 0 && !clue ? (
          <Lock className="h-3.5 w-3.5" />
        ) : (
          <Lightbulb className="h-3.5 w-3.5" />
        )}
        {clue ? "Hint used" : `Hint (${tokens})`}
      </button>
      {clue && (
        <div className="mt-3 rounded-2xl border-2 border-warning/40 bg-warning/10 p-3 text-sm font-semibold text-foreground animate-pop">
          <span className="mr-1">💡</span>
          {clue}
        </div>
      )}
    </div>
  );
}
