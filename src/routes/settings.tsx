import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bell,
  Moon,
  Sun,
  Volume2,
  Globe,
  LogOut,
  ChevronRight,
  Crown,
  KeyRound,
  User,
  Heart,
  Sparkles,
  Info,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  useAppState,
  setName,
  setAgeGroup,
  setBgAnimationsOff,
  type AppState,
} from "@/lib/app-state";
import { signOut } from "@/lib/auth";
import { validateUsername } from "@/lib/profanity";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  component: Settings,
  head: () => ({ meta: [{ title: "Settings — AIED" }] }),
});

const AGES: { id: AppState["ageGroup"]; label: string }[] = [
  { id: "kids", label: "Kids · 6-10" },
  { id: "tweens", label: "Tweens · 11-13" },
  { id: "teens", label: "Teens · 14-17" },
  { id: "adults", label: "Adults · 18+" },
  { id: "pro", label: "Professional" },
];

function Settings() {
  const navigate = useNavigate();
  const name = useAppState((s) => s.name);
  const ageGroup = useAppState((s) => s.ageGroup);
  const premium = useAppState((s) => s.premium);
  const bgAnimOff = useAppState((s) => s.bgAnimationsOff);

  const [dark, setDark] = useState(false);
  const [notif, setNotif] = useState(true);
  const [sound, setSound] = useState(true);
  const [nameInput, setNameInput] = useState(name);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  function saveName() {
    if (nameInput.trim() && nameInput !== name) setName(nameInput.trim());
  }

  function resetPin() {
    localStorage.removeItem("aied:parentPin");
    sessionStorage.removeItem("aied:parentUnlocked");
    alert("Parent PIN has been reset. You'll set a new one next time.");
  }

  return (
    <AppShell>
      <h1 className="text-3xl font-black">Settings</h1>

      {/* Account */}
      <Section title="Account">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-hero text-white">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase text-muted-foreground">Display name</p>
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onBlur={saveName}
                className="w-full bg-transparent text-base font-black outline-none"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-[10px] font-bold uppercase text-muted-foreground">Age group</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {AGES.map((a) => (
              <button
                key={a.id}
                onClick={() => setAgeGroup(a.id)}
                className={`rounded-full border-2 px-3 py-1.5 text-xs font-black transition-all ${
                  ageGroup === a.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <Row
          icon={<Crown className="h-5 w-5" />}
          label="Subscription"
          right={
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${
                premium ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"
              }`}
            >
              {premium === "max"
                ? "AIED Max"
                : premium === "family"
                  ? "AIED Family"
                  : premium === "super"
                    ? "Super AIED"
                    : "Free"}
            </span>
          }
          onClick={() => navigate({ to: "/shop" })}
        />
      </Section>

      {/* Preferences */}
      <Section title="Preferences">
        <Row
          icon={dark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          label="Dark mode"
          right={<Toggle on={dark} onChange={toggleTheme} />}
        />
        <Row
          icon={<Bell className="h-5 w-5" />}
          label="Streak reminders"
          right={<Toggle on={notif} onChange={() => setNotif((v) => !v)} />}
        />
        <Row
          icon={<Volume2 className="h-5 w-5" />}
          label="Sound effects"
          right={<Toggle on={sound} onChange={() => setSound((v) => !v)} />}
        />
        <Row
          icon={<Sparkles className="h-5 w-5" />}
          label="Background animations"
          right={<Toggle on={!bgAnimOff} onChange={() => setBgAnimationsOff(!bgAnimOff)} />}
        />
        <Row
          icon={<Globe className="h-5 w-5" />}
          label="Language"
          right={<span className="text-sm font-bold text-muted-foreground">English</span>}
        />
      </Section>

      {/* Family */}
      <Section title="For families">
        <Link to="/parent" className="block">
          <Row
            icon={<Heart className="h-5 w-5" />}
            label="Parent dashboard"
            right={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
          />
        </Link>
        <Row
          icon={<KeyRound className="h-5 w-5" />}
          label="Reset parent PIN"
          right={<span className="text-xs font-bold text-destructive">Reset</span>}
          onClick={resetPin}
        />
      </Section>

      {/* About */}
      <Section title="About">
        <Row
          icon={<Sparkles className="h-5 w-5" />}
          label="What's new"
          right={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
        />
        <Row
          icon={<Info className="h-5 w-5" />}
          label="App version"
          right={<span className="text-sm font-bold text-muted-foreground">1.0.0</span>}
        />
      </Section>

      <button
        onClick={() => {
          signOut();
          navigate({ to: "/login", replace: true });
        }}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-heart/30 bg-heart/10 px-6 py-3 font-black text-heart"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </button>

      <p className="mt-6 text-center text-[11px] text-muted-foreground">
        AIED · Saving futures through AI literacy
      </p>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 space-y-2">
      <h2 className="mb-2 px-1 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({
  icon,
  label,
  right,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  right: React.ReactNode;
  onClick?: () => void;
}) {
  const Cmp = onClick ? "button" : "div";
  return (
    <Cmp
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:bg-secondary/40"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/12 text-primary">
          {icon}
        </div>
        <p className="font-bold">{label}</p>
      </div>
      {right}
    </Cmp>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-7 w-12 rounded-full transition-colors ${
        on ? "bg-primary shadow-glow" : "bg-secondary"
      }`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-soft transition-transform ${
          on ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
