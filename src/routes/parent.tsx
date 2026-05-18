import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Flame, Zap, Clock, TrendingUp, ShieldCheck, Bell, BookOpen,
  Trophy, Lock, AlertCircle, Sparkles, ToggleLeft, ToggleRight, KeyRound,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/parent")({
  component: ParentGate,
  head: () => ({ meta: [{ title: "Parent Dashboard — AIED" }] }),
});

const PIN_KEY = "aied:parentPin";
const SESSION_KEY = "aied:parentUnlocked";

function ParentGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [hasPin, setHasPin] = useState(false);

  useEffect(() => {
    setHasPin(!!localStorage.getItem(PIN_KEY));
    setUnlocked(sessionStorage.getItem(SESSION_KEY) === "1");
  }, []);

  if (unlocked) return <ParentDash onLock={() => { sessionStorage.removeItem(SESSION_KEY); setUnlocked(false); }} />;
  return (
    <PinScreen
      hasPin={hasPin}
      onUnlock={() => { sessionStorage.setItem(SESSION_KEY, "1"); setUnlocked(true); }}
      onSetPin={() => setHasPin(true)}
    />
  );
}

function PinScreen({
  hasPin, onUnlock, onSetPin,
}: { hasPin: boolean; onUnlock: () => void; onSetPin: () => void }) {
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");

  function handle() {
    setErr("");
    if (!hasPin) {
      if (pin.length !== 4) return setErr("PIN must be 4 digits");
      if (pin !== confirm) return setErr("PINs don't match");
      localStorage.setItem(PIN_KEY, pin);
      onSetPin();
      onUnlock();
      return;
    }
    if (pin === localStorage.getItem(PIN_KEY)) {
      onUnlock();
    } else {
      setErr("Incorrect PIN");
      setPin("");
    }
  }

  return (
    <AppShell>
      <div className="mx-auto mt-12 max-w-sm rounded-3xl gradient-card border-2 border-border p-6 shadow-card text-center">
        <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl gradient-hero text-white shadow-glow">
          <KeyRound className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-black">Parent Zone</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasPin ? "Enter your 4-digit PIN" : "Create a 4-digit PIN to protect this area"}
        </p>
        <div className="mt-5 space-y-3">
          <input
            inputMode="numeric"
            maxLength={4}
            placeholder="••••"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            className="w-full rounded-2xl border-2 border-border bg-background px-4 py-3 text-center text-2xl font-black tracking-[0.5em] outline-none focus:border-primary"
          />
          {!hasPin && (
            <input
              inputMode="numeric"
              maxLength={4}
              placeholder="confirm ••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-2xl border-2 border-border bg-background px-4 py-3 text-center text-2xl font-black tracking-[0.5em] outline-none focus:border-primary"
            />
          )}
          {err && <p className="text-xs font-bold text-destructive">{err}</p>}
          <button
            onClick={handle}
            className="w-full rounded-2xl gradient-hero py-3 font-black text-white shadow-glow"
          >
            {hasPin ? "Unlock" : "Set PIN & Enter"}
          </button>
          <p className="text-[11px] text-muted-foreground">
            <Lock className="mr-1 inline h-3 w-3" /> Stored only on this device
          </p>
        </div>
      </div>
    </AppShell>
  );
}

type Child = {
  id: string; name: string; age: number; xp: number; streak: number;
  minutes: number; weekGoal: number; level: string; lessons: number;
  badges: number; lastActive: string;
};

const CHILDREN: Child[] = [
  { id: "mia", name: "Mia", age: 9,  xp: 820,  streak: 5,  minutes: 42, weekGoal: 100, level: "Beginner",   lessons: 14, badges: 6,  lastActive: "Today, 4:12pm" },
  { id: "eli", name: "Eli", age: 12, xp: 1340, streak: 11, minutes: 88, weekGoal: 120, level: "Elementary", lessons: 23, badges: 11, lastActive: "Today, 7:30pm" },
];

function ParentDash({ onLock }: { onLock: () => void }) {
  const [activeId, setActiveId] = useState<string>(CHILDREN[0].id);
  const child = CHILDREN.find((c) => c.id === activeId)!;

  return (
    <AppShell>
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-cyan">Family</p>
          <h1 className="text-3xl font-black">Parent Dashboard</h1>
          <p className="text-sm text-muted-foreground">Track your kids' AI literacy journey</p>
        </div>
        <button
          onClick={onLock}
          className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-bold text-muted-foreground"
        >
          <Lock className="mr-1 inline h-3 w-3" /> Lock
        </button>
      </header>

      {/* Child switcher */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {CHILDREN.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`flex shrink-0 items-center gap-2 rounded-2xl border-2 px-3 py-2 transition-all ${
              c.id === activeId
                ? "border-primary bg-primary/10 shadow-glow"
                : "border-border bg-card"
            }`}
          >
            <div className="grid h-8 w-8 place-items-center rounded-full gradient-hero text-sm font-black text-white">
              {c.name[0]}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">{c.name}</p>
              <p className="text-[10px] text-muted-foreground">Age {c.age}</p>
            </div>
          </button>
        ))}
        <button className="flex shrink-0 items-center gap-2 rounded-2xl border-2 border-dashed border-border px-3 py-2 text-xs font-bold text-muted-foreground">
          + Add child
        </button>
      </div>

      {/* Snapshot */}
      <div className="mt-4 rounded-3xl gradient-card border-2 border-border p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-black">{child.name}</p>
            <p className="text-xs text-muted-foreground">{child.level} · {child.lastActive}</p>
          </div>
          <span className="rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-success">
            Active today
          </span>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          <Mini icon={<Zap className="h-4 w-4" />} value={child.xp} label="XP" />
          <Mini icon={<Flame className="h-4 w-4" />} value={child.streak} label="Streak" />
          <Mini icon={<BookOpen className="h-4 w-4" />} value={child.lessons} label="Lessons" />
          <Mini icon={<Trophy className="h-4 w-4" />} value={child.badges} label="Badges" />
        </div>

        <div className="mt-4 rounded-2xl bg-background/50 p-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-muted-foreground">
              <TrendingUp className="h-3 w-3" /> Weekly goal
            </span>
            <span className="font-black">{child.minutes}/{child.weekGoal} min</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full gradient-xp transition-all"
              style={{ width: `${Math.min(100, (child.minutes / child.weekGoal) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 7-day activity sparkline */}
      <div className="mt-4 rounded-3xl border-2 border-border bg-card p-5">
        <p className="text-sm font-black">This week</p>
        <p className="text-[11px] text-muted-foreground">Daily learning minutes</p>
        <ActivityBars childId={child.id} />
      </div>

      {/* Recent achievements */}
      <div className="mt-4 rounded-3xl border-2 border-border bg-card p-5">
        <p className="text-sm font-black">Recent achievements</p>
        <ul className="mt-3 space-y-2">
          {[
            { icon: "🔥", title: "5-day streak", when: "Yesterday" },
            { icon: "🎯", title: "Perfect Lesson · Meet Your AI Friend", when: "2 days ago" },
            { icon: "⭐", title: "First Steps badge unlocked", when: "3 days ago" },
          ].map((a) => (
            <li key={a.title} className="flex items-center gap-3 rounded-2xl bg-secondary/50 px-3 py-2">
              <span className="text-xl">{a.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-bold">{a.title}</p>
                <p className="text-[10px] text-muted-foreground">{a.when}</p>
              </div>
              <Sparkles className="h-4 w-4 text-warning" />
            </li>
          ))}
        </ul>
      </div>

      {/* Controls */}
      <div className="mt-4 rounded-3xl border-2 border-border bg-card p-5">
        <p className="text-sm font-black">Controls for {child.name}</p>
        <div className="mt-3 space-y-2">
          <ControlRow icon={<Clock />} title="Daily time limit" detail="30 minutes" />
          <ControlRow icon={<ShieldCheck />} title="Safe mode" detail="Kid-friendly content only" defaultOn />
          <ControlRow icon={<Bell />} title="Weekly reports" detail="Email every Sunday" defaultOn />
          <ControlRow icon={<AlertCircle />} title="Pause account" detail="Hide app temporarily" />
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] text-muted-foreground">
        AIED Family · Up to 6 kids · Private to your device
      </p>
    </AppShell>
  );
}

function ActivityBars({ childId }: { childId: string }) {
  // deterministic per-child sample data
  const seed = childId.charCodeAt(0);
  const vals = Array.from({ length: 7 }, (_, i) =>
    Math.max(2, Math.round(((Math.sin(seed + i * 1.3) + 1) / 2) * 30 + 4)),
  );
  const max = Math.max(...vals);
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="mt-3 flex items-end justify-between gap-1.5 h-28">
      {vals.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-t-lg gradient-hero shadow-soft transition-all"
            style={{ height: `${(v / max) * 100}%`, minHeight: 6 }}
            title={`${v} min`}
          />
          <span className="text-[10px] font-bold text-muted-foreground">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

function ControlRow({
  icon, title, detail, defaultOn = false,
}: { icon: React.ReactNode; title: string; detail: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="flex w-full items-center gap-3 rounded-2xl border border-border bg-background/50 p-3 text-left transition-colors hover:bg-secondary/50"
    >
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-bold">{title}</p>
        <p className="text-[11px] text-muted-foreground">{detail}</p>
      </div>
      {on ? (
        <ToggleRight className="h-7 w-7 text-success" />
      ) : (
        <ToggleLeft className="h-7 w-7 text-muted-foreground" />
      )}
    </button>
  );
}

function Mini({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="rounded-xl bg-background/50 p-3 text-center">
      <div className="mx-auto mb-1 grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary">
        {icon}
      </div>
      <p className="text-sm font-black">{value}</p>
      <p className="text-[10px] uppercase text-muted-foreground">{label}</p>
    </div>
  );
}
