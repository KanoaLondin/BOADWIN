import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { sendSignInLink, signIn } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [
      { title: "Log in — Boadwin" },
      { name: "description", content: "Log in to Boadwin and continue your AI literacy courses." },
      { property: "og:title", content: "Log in — Boadwin" },
      { property: "og:description", content: "Continue learning with your Boadwin account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

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
    setNotice(null);
    try {
      await signIn({ email: email.trim().toLowerCase(), password });
      navigate({ to: "/" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      setError(
        /invalid login credentials/i.test(message)
          ? "That email and password don't match an account. Check for typos, or use \u201cForgot password\u201d below."
          : message || "Couldn't log you in.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleForgot() {
    if (submitting) return;
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter your email above first, then tap Forgot password.");
      return;
    }
    setSubmitting(true);
    setError(null);
    setNotice(null);
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        { redirectTo: `${window.location.origin}/reset-password` },
      );
      if (err) throw err;
      setNotice("Check your email for a link to set a new password.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send the reset email.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEmailLink() {
    if (submitting) return;
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter your email above first, then tap Email me a sign-in link.");
      return;
    }
    setSubmitting(true);
    setError(null);
    setNotice(null);
    try {
      await sendSignInLink(email);
      setNotice("Check your email for a secure sign-in link. It will not change your password.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send the sign-in link.");
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
            Welcome back to <span className="text-gradient">Boadwin</span>
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
              name="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border-2 border-border bg-card px-5 py-3.5 text-base font-semibold outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-muted-foreground">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full rounded-2xl border-2 border-border bg-card py-3.5 pl-5 pr-14 text-base font-semibold outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-heart/10 px-4 py-2.5 text-sm font-semibold text-heart">
              {error}
            </p>
          )}
          {notice && (
            <p className="rounded-xl bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary">
              {notice}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
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

          <button
            type="button"
            onClick={handleForgot}
            disabled={submitting}
            className="w-full py-1 text-center text-sm font-bold text-muted-foreground underline-offset-4 hover:underline disabled:opacity-40"
          >
            Forgot password?
          </button>

          <div className="flex items-center gap-3 py-1" aria-hidden="true">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-bold text-muted-foreground">OR</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={handleEmailLink}
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-card px-6 py-3.5 font-black text-primary transition-colors hover:bg-primary/5 disabled:opacity-40"
          >
            <Mail className="h-5 w-5" />
            Email me a sign-in link
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
