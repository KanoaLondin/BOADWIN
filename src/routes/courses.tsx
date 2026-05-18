import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Check, Star, BookOpen, Trophy } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { levels } from "@/lib/course-data";

export const Route = createFileRoute("/courses")({
  component: Courses,
  head: () => ({ meta: [{ title: "Courses — AIED" }] }),
});

function Courses() {
  // demo progress: first 2 lessons of unit 1 done
  const completed = new Set(["u1l1"]);
  const current = "u1l2";

  return (
    <AppShell>
      <header>
        <h1 className="text-3xl font-bold">Prompt Engineering</h1>
        <p className="text-sm text-muted-foreground">5 levels · 10 units · 50+ lessons</p>
      </header>

      <div className="mt-6 space-y-8">
        {levels.map((level, li) => {
          const isPremium = level.tier !== "Free";
          return (
            <section key={level.id}>
              <div className="mb-3 flex items-center justify-between rounded-2xl gradient-card border border-border p-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-cyan">
                    Level {li + 1} · {level.badge}
                  </p>
                  <h2 className="text-lg font-bold">{level.title}</h2>
                  <p className="text-xs text-muted-foreground">{level.ageRange}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    isPremium
                      ? "bg-warning/20 text-warning"
                      : "bg-success/20 text-success"
                  }`}
                >
                  {level.tier}
                </span>
              </div>

              {level.units.map((unit) => (
                <div key={unit.id} className="mb-6">
                  <div className="mb-3 flex items-center gap-2 px-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-bold">{unit.title}</h3>
                    <span className="text-xs text-muted-foreground">— {unit.description}</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    {unit.lessons.map((lesson, idx) => {
                      const isDone = completed.has(lesson.id);
                      const isCurrent = lesson.id === current;
                      const isLocked = isPremium || (!isDone && !isCurrent);
                      const offset = idx % 4;
                      const translate = ["0", "40px", "0", "-40px"][offset];
                      return (
                        <Link
                          key={lesson.id}
                          to={isLocked ? "/shop" : "/lesson/$lessonId"}
                          params={isLocked ? undefined : { lessonId: lesson.id }}
                          style={{ transform: `translateX(${translate})` }}
                          className="group flex w-full max-w-sm items-center gap-3"
                        >
                          <NodeButton
                            state={
                              lesson.isQuiz
                                ? "quiz"
                                : isDone
                                ? "done"
                                : isCurrent
                                ? "current"
                                : isLocked
                                ? "locked"
                                : "open"
                            }
                          />
                          <div className="flex-1 rounded-2xl border border-border bg-card px-3 py-2">
                            <p className="text-sm font-semibold">{lesson.title}</p>
                            <p className="text-[10px] text-muted-foreground">+{lesson.xp} XP</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}

function NodeButton({ state }: { state: "done" | "current" | "locked" | "open" | "quiz" }) {
  const base =
    "grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-2 transition-all";
  if (state === "done")
    return (
      <div className={`${base} border-success bg-success text-white shadow-card`}>
        <Check className="h-6 w-6" />
      </div>
    );
  if (state === "current")
    return (
      <div className={`${base} border-cyan bg-primary text-white shadow-glow animate-pop`}>
        <Star className="h-6 w-6" />
      </div>
    );
  if (state === "quiz")
    return (
      <div className={`${base} border-warning bg-warning/20 text-warning`}>
        <Trophy className="h-6 w-6" />
      </div>
    );
  if (state === "locked")
    return (
      <div className={`${base} border-border bg-muted text-muted-foreground`}>
        <Lock className="h-5 w-5" />
      </div>
    );
  return <div className={`${base} border-border bg-card text-muted-foreground`} />;
}
