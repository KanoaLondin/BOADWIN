import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Mascot } from "@/components/Mascot";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
  head: () => ({ meta: [{ title: "Welcome — AIED" }] }),
});

const groups = [
  { id: "k", label: "Kids", age: "Ages 6-10", emoji: "🧒" },
  { id: "t", label: "Tweens", age: "Ages 11-13", emoji: "🎒" },
  { id: "y", label: "Teens", age: "Ages 14-17", emoji: "🎓" },
  { id: "a", label: "Adult", age: "College / Adult", emoji: "💼" },
  { id: "p", label: "Pro", age: "Professional", emoji: "🏆" },
];

function Onboarding() {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <Mascot size={88} />
          <h1 className="mt-5 text-3xl font-bold">
            Welcome to <span className="text-gradient">AIED</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Saving futures through AI literacy
          </p>
          <p className="mt-6 text-sm font-semibold">Who's learning today?</p>
        </div>

        <div className="mt-4 space-y-3">
          {groups.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelected(g.id)}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
                selected === g.id
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span className="text-3xl">{g.emoji}</span>
              <div>
                <p className="font-bold">{g.label}</p>
                <p className="text-xs text-muted-foreground">{g.age}</p>
              </div>
            </button>
          ))}
        </div>

        <button
          disabled={!selected}
          onClick={() => navigate({ to: "/" })}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl gradient-hero px-6 py-4 font-bold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-40 disabled:shadow-none"
        >
          Start learning <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
