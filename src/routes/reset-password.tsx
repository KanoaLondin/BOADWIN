import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
  head: () => ({
    meta: [
      { title: "Set a new password — Boadwin" },
      { name: "description", content: "Choose a new password for your Boadwin account and get back to learning." },
      { property: "og:title", content: "Set a new password — Boadwin" },
      { property: "og:description", content: "Choose a new password for your Boadwin account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (password.length < 6) {
      setError("Please pick a password with at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Those two passwords don't match.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) throw err;
      setDone(true);
      setTimeout(() => navigate({ to: "/" }), 1200);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't update your password. Try the email link again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-purple/5 via-background to-cyan/5 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Mascot size={80} />
          <h1 className="mt-5 text-3xl font-black">Set a new password</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick something you'll remember — we'll log you straight in.
          </p>
        </div>

        {done ? (
          <p className="mt-6 rounded-xl bg-primary/10 px-4 py-3 text-center text-sm font-bold text-primary">
            Password updated! Taking you in…
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <input
              autoFocus
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full rounded-2xl border-2 border-border bg-card px-5 py-3.5 text-base font-semibold outline-none focus:border-primary"
            />
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat new password"
              className="w-full rounded-2xl border-2 border-border bg-card px-5 py-3.5 text-base font-semibold outline-none focus:border-primary"
            />
            {error && (
              <p className="rounded-xl bg-heart/10 px-4 py-2.5 text-sm font-semibold text-heart">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl gradient-hero px-6 py-4 font-black text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-40"
            >
              {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save new password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
