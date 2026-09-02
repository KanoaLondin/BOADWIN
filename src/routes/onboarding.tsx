import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { setAgeGroup, setName, type AppState } from "@/lib/app-state";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
  head: () => ({ meta: [{ title: "Welcome — AIED" }] }),
});

type AgeId = AppState["ageGroup"];

const GROUPS: { id: AgeId; label: string; age: string; emoji: string }[] = [
  { id: "kids",   label: "Kids",   age: "Ages 6-10",       emoji: "🧒" },
  { id: "tweens", label: "Tweens", age: "Ages 11-13",      emoji: "🎒" },
  { id: "teens",  label: "Teens",  age: "Ages 14-17",      emoji: "🎓" },
  { id: "adults", label: "Adult",  age: "College / Adult", emoji: "💼" },
  { id: "pro",    label: "Pro",    age: "Professional",    emoji: "🏆" },
];

const GOALS = [
  { mins: 5,  xp: 50,  label: "Casual",  desc: "5 min/day" },
  { mins: 10, xp: 100, label: "Regular", desc: "10 min/day" },
  { mins: 15, xp: 150, label: "Serious", desc: "15 min/day" },
  { mins: 20, xp: 200, label: "Intense", desc: "20 min/day" },
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [age, setAge] = useState<AgeId | null>(null);
  const [nameVal, setNameVal] = useState("");
  const [goal, setGoal] = useState<number | null>(null);

  const nameError = nameVal.trim() ? validateUsername(nameVal, 2) : null;

  function finish() {
    if (nameError) return;
    if (age) setAgeGroup(age);
    if (nameVal.trim()) setName(nameVal.trim());
    if (typeof window !== "undefined" && goal != null) {
      localStorage.setItem("aied:dailyGoalXp", String(goal));
    }
    navigate({ to: "/" });
  }

  const canNext =
    (step === 0 && !!age) ||
    (step === 1 && nameVal.trim().length >= 2 && !nameError) ||
    (step === 2 && goal != null);
  const totalSteps = 3;

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-purple/5 via-background to-cyan/5 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="mb-6 flex items-center gap-2">
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : (
            <span className="h-8 w-8" />
          )}
          <div className="flex flex-1 gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  i <= step ? "gradient-hero shadow-glow" : "bg-secondary"
                }`}
              />
            ))}
          </div>
          <button
            onClick={finish}
            className="text-[11px] font-black uppercase text-muted-foreground"
          >
            Skip
          </button>
        </div>

        {step === 0 && (
          <div className="animate-fade-in">
            <div className="text-center">
              <Mascot size={88} />
              <h1 className="mt-5 text-3xl font-black">
                Welcome to <span className="text-gradient">AIED</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Saving futures through AI literacy
              </p>
              <p className="mt-6 text-sm font-bold">Who's learning today?</p>
            </div>
            <div className="mt-4 space-y-3">
              {GROUPS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setAge(g.id)}
                  className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
                    age === g.id
                      ? "border-primary bg-primary/10 shadow-glow"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <span className="text-3xl">{g.emoji}</span>
                  <div className="flex-1">
                    <p className="font-black">{g.label}</p>
                    <p className="text-xs text-muted-foreground">{g.age}</p>
                  </div>
                  {age === g.id && <Check className="h-5 w-5 text-primary" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in text-center">
            <Mascot size={88} />
            <h1 className="mt-5 text-3xl font-black">What should AL call you?</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Your personal AI tutor will use this name.
            </p>
            <input
              autoFocus
              value={nameVal}
              onChange={(e) => setNameVal(e.target.value)}
              placeholder="Your name"
              className="mt-6 w-full rounded-2xl border-2 border-border bg-card px-5 py-4 text-center text-xl font-black outline-none focus:border-primary"
            />
            <p className="mt-2 text-[11px] text-muted-foreground">
              {nameVal.trim().length < 2 ? "At least 2 letters" : "Looks good!"}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl gradient-hero shadow-glow">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h1 className="mt-5 text-3xl font-black">Set your daily goal</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              You can change this anytime in settings.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {GOALS.map((g) => (
                <button
                  key={g.xp}
                  onClick={() => setGoal(g.xp)}
                  className={`rounded-2xl border-2 p-4 text-left transition-all ${
                    goal === g.xp
                      ? "border-primary bg-primary/10 shadow-glow"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <p className="text-base font-black">{g.label}</p>
                  <p className="text-xs text-muted-foreground">{g.desc}</p>
                  <p className="mt-1 text-[11px] font-black text-warning">+{g.xp} XP</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          disabled={!canNext}
          onClick={() => (step < totalSteps - 1 ? setStep((s) => s + 1) : finish())}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl gradient-hero px-6 py-4 font-black text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-40 disabled:shadow-none"
        >
          {step < totalSteps - 1 ? "Continue" : "Start learning"}
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
