import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, MailCheck, ShieldCheck, RefreshCw } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { useAuth, refreshProfile, signOut } from "@/lib/auth";
import { accountSafety } from "@/lib/child-safety";
import { requestParentConsent } from "@/lib/parental-consent.functions";

export const Route = createFileRoute("/parent-consent")({
  component: ParentConsent,
  head: () => ({
    meta: [
      { title: "Parent approval needed — Boadwin" },
      {
        name: "description",
        content:
          "Boadwin accounts for under-13s need a parent or guardian's approval before they can be used.",
      },
      { property: "og:title", content: "Parent approval needed — Boadwin" },
      {
        property: "og:description",
        content: "A parent or guardian must approve a child's Boadwin account before it activates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function ParentConsent() {
  const { profile } = useAuth();
  const safety = accountSafety(profile as never);
  const send = useServerFn(requestParentConsent);

  const [email, setEmail] = useState(safety.parentEmail ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  const valid = /\S+@\S+\.\S+/.test(email);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await send({
        data: { parentEmail: email.trim().toLowerCase(), origin: window.location.origin },
      });
      setSent(true);
      setFallbackUrl(res.consentUrl ?? null);
      await refreshProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send the notice.");
    } finally {
      setBusy(false);
    }
  }

  async function checkAgain() {
    setBusy(true);
    await refreshProfile();
    setBusy(false);
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-purple/5 via-background to-cyan/5 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Mascot size={76} />
          <h1 className="mt-4 text-2xl font-black">A grown-up needs to say yes first</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You told us you're under 13, so a parent or guardian has to approve this account before
            you can start learning. Nothing else is saved until they do.
          </p>
        </div>

        {!sent ? (
          <form onSubmit={submit} className="mt-6 space-y-3">
            <label className="block text-xs font-bold text-muted-foreground">
              Parent or guardian's email
            </label>
            <input
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="grownup@example.com"
              className="w-full rounded-2xl border-2 border-border bg-card px-5 py-3.5 text-base font-semibold outline-none focus:border-primary"
            />
            {error && (
              <p className="rounded-xl bg-heart/10 px-4 py-2.5 text-sm font-semibold text-heart">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={!valid || busy}
              className="flex w-full items-center justify-center gap-2 rounded-2xl gradient-hero px-6 py-4 font-black text-white shadow-glow disabled:opacity-40 disabled:shadow-none"
            >
              {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send them the notice"}
            </button>
          </form>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 text-center">
              <MailCheck className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-2 text-sm font-black">Notice ready for {email}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                It explains what we collect, why, and how they can review or delete it. Your account
                unlocks the moment they approve.
              </p>
            </div>

            {fallbackUrl && (
              <div className="rounded-2xl border-2 border-dashed border-warning/50 bg-warning/5 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-warning">
                  Email sending isn't switched on yet
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Hand this device to your parent or guardian and let them open the approval page:
                </p>
                <a
                  href={fallbackUrl}
                  className="mt-2 block break-all rounded-xl bg-card p-2 text-[11px] font-bold text-primary underline"
                >
                  {fallbackUrl}
                </a>
              </div>
            )}

            <button
              onClick={checkAgain}
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card px-6 py-3 font-black disabled:opacity-40"
            >
              <RefreshCw className={`h-4 w-4 ${busy ? "animate-spin" : ""}`} /> They've approved —
              check again
            </button>
            <button
              onClick={() => setSent(false)}
              className="w-full text-center text-xs font-bold text-muted-foreground underline-offset-4 hover:underline"
            >
              Use a different email
            </button>
          </div>
        )}

        <div className="mt-8 flex items-start gap-2 rounded-2xl border border-border bg-card p-4">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            While this account waits, we store only the sign-up basics: username, email, month and
            year of birth, and the parent email above. No lessons, no progress, no tutor chats.
          </p>
        </div>

        <button
          onClick={() => void signOut()}
          className="mt-4 w-full text-center text-xs font-bold text-muted-foreground underline-offset-4 hover:underline"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
