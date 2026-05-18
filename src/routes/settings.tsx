import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Moon, Volume2, Globe, LogOut, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/settings")({
  component: Settings,
  head: () => ({ meta: [{ title: "Settings — AIED" }] }),
});

function Settings() {
  const [dark, setDark] = useState(true);
  const [notif, setNotif] = useState(true);
  const [sound, setSound] = useState(true);

  function toggleTheme() {
    setDark((d) => !d);
    document.documentElement.classList.toggle("dark");
    document.documentElement.classList.toggle("light");
  }

  return (
    <AppShell>
      <h1 className="text-3xl font-bold">Settings</h1>

      <section className="mt-6 space-y-2">
        <Row
          icon={<Moon className="h-5 w-5" />}
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
        <Row icon={<Globe className="h-5 w-5" />} label="Language" right={<span className="text-muted-foreground text-sm">English</span>} />
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          For families
        </h2>
        <Link
          to="/parent"
          className="flex items-center justify-between rounded-2xl border border-border bg-card p-4"
        >
          <p className="font-semibold">Parent dashboard</p>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
      </section>

      <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-heart/40 bg-heart/10 px-6 py-3 font-bold text-heart">
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </AppShell>
  );
}

function Row({
  icon,
  label,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary">
          {icon}
        </div>
        <p className="font-semibold">{label}</p>
      </div>
      {right}
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        on ? "bg-primary" : "bg-secondary"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
          on ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
