import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { signIn } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Log in — AIED" }] }),
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await signIn({ email: email.trim(), password });
      navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't log you in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-purple/5 via-background to-cyan/5 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Mascot size={80} />
          <h1 className="mt-5 text-3xl font-black">
            Welcome back to <span className="text-gradient">AIED</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Log in to pick up right where you left off.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-bold text-muted-foreground">Email</label>
            <input
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border-2 border-border bg-card px-5 py-3.5 text-base font-semibold outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-muted-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full rounded-2xl border-2 border-border bg-card px-5 py-3.5 text-base font-semibold outline-none focus:border-primary"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-heart/10 px-4 py-2.5 text-sm font-semibold text-heart">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl gradient-hero px-6 py-4 font-black text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-40 disabled:shadow-none"
          >
            {submitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Log in <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/signup" className="font-bold text-primary">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
