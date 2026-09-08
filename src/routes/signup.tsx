import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { signUp } from "@/lib/auth";
import { USERNAME_BLOCKED_MESSAGE, validateUsername } from "@/lib/profanity";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i);

/** Age today from month/year of birth (day unknown, so we round conservatively). */
function ageFrom(month: number, year: number): number {
  const now = new Date();
  let age = now.getFullYear() - year;
  if (now.getMonth() + 1 < month) age -= 1;
  return age;
}

export const Route = createFileRoute("/signup")({
  component: SignUp,
  validateSearch: (search: Record<string, unknown>): { ref?: string } => ({
    ...(typeof search.ref === "string" ? { ref: search.ref } : {}),
  }),
  head: () => ({ meta: [{ title: "Sign up — AIED" }] }),
});

function SignUp() {
  const navigate = useNavigate();
  const { ref } = Route.useSearch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [showCodeField, setShowCodeField] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const usernameError = username.trim() ? validateUsername(username) : null;
  const bm = Number(birthMonth);
  const by = Number(birthYear);
  const dobGiven = bm >= 1 && bm <= 12 && by >= 1900 && by <= CURRENT_YEAR;
  const age = dobGiven ? ageFrom(bm, by) : null;
  const isChild = age != null && age < 13;
  const ageGroup =
    age == null ? "adults" : age < 11 ? "kids" : age < 14 ? "tweens" : age < 18 ? "teens" : "adults";
  const parentEmailOk = !isChild || /\S+@\S+\.\S+/.test(parentEmail);
  const canSubmit =
    username.trim().length >= 3 &&
    !usernameError &&
    /\S+@\S+\.\S+/.test(email) &&
    password.length >= 6 &&
    dobGiven &&
    parentEmailOk;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await signUp({
        email: email.trim(),
        password,
        username: username.trim(),
        ageGroup,
        birthMonth: bm,
        birthYear: by,
        ...(isChild ? { parentEmail: parentEmail.trim().toLowerCase() } : {}),
        adminCode: adminCode.trim() || undefined,
        referralCode: ref,
      });
      navigate({ to: isChild ? "/parent-consent" : "/onboarding" });
    } catch (err) {
      const raw = err instanceof Error ? err.message : "";
      // The database runs the same safety check; surface it in plain English
      // instead of the generic "database error" the auth API returns.
      setError(
        /database error|isn't allowed|not allowed/i.test(raw)
          ? USERNAME_BLOCKED_MESSAGE
          : raw || "Something went wrong creating your account.",
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
          <h1 className="mt-5 text-3xl font-black">
            Create your <span className="text-gradient">AIED</span> account
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your progress is saved and follows you anywhere you sign in.
          </p>
          {ref && (
            <p className="mt-3 inline-block rounded-full border-2 border-dashed border-primary/40 bg-primary/5 px-3 py-1.5 text-[11px] font-black text-primary">
              🎁 Invite code applied — you'll both get 50 gems
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-bold text-muted-foreground">Username</label>
            <input
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="At least 3 characters"
              className={`w-full rounded-2xl border-2 bg-card px-5 py-3.5 text-base font-semibold outline-none focus:border-primary ${
                usernameError ? "border-heart" : "border-border"
              }`}
            />
            {usernameError && (
              <p className="mt-1.5 text-xs font-semibold text-heart">{usernameError}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-muted-foreground">Email</label>
            <input
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
              placeholder="At least 6 characters"
              className="w-full rounded-2xl border-2 border-border bg-card px-5 py-3.5 text-base font-semibold outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-muted-foreground">
              Date of birth
            </label>
            <div className="flex gap-2">
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className={`w-1/2 rounded-2xl border-2 bg-card px-4 py-3.5 text-base font-semibold outline-none focus:border-primary ${
                  birthMonth ? "border-border" : "border-dashed border-border text-muted-foreground"
                }`}
              >
                <option value="">Month</option>
                {MONTHS.map((m, i) => (
                  <option key={m} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className={`w-1/2 rounded-2xl border-2 bg-card px-4 py-3.5 text-base font-semibold outline-none focus:border-primary ${
                  birthYear ? "border-border" : "border-dashed border-border text-muted-foreground"
                }`}
              >
                <option value="">Year</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              We use this only to keep younger learners safe. It isn't shown to anyone.
            </p>
          </div>

          {isChild && (
            <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-4">
              <label className="mb-1 block text-xs font-black text-primary">
                A parent or guardian's email
              </label>
              <p className="mb-2 text-[11px] text-muted-foreground">
                Because you're under 13, we'll send them a notice explaining what we collect and
                ask them to approve the account. Nothing unlocks until they do.
              </p>
              <input
                type="email"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                placeholder="grownup@example.com"
                className="w-full rounded-2xl border-2 border-border bg-card px-5 py-3.5 text-base font-semibold outline-none focus:border-primary"
              />
            </div>
          )}

          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowCodeField((v) => !v)}
              className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground"
            >
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${showCodeField ? "rotate-180" : ""}`}
              />
              Have an admin code?
            </button>
            {showCodeField && (
              <input
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                placeholder="Admin code (optional)"
                className="mt-2 w-full rounded-2xl border-2 border-dashed border-border bg-card px-5 py-3 text-sm font-semibold outline-none focus:border-primary"
              />
            )}
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
                Create account <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-primary">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
