import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { useAuth } from "@/lib/auth";
import { needsParentConsent } from "@/lib/child-safety";

const AUTO_CONTINUE_MS = 2000;

// Landing point for the email-verification link sent from signup. Supabase
// establishes the session from the link's token as this page loads, then we
// hand off to parent consent (children) or the onboarding questionnaire.
export const Route = createFileRoute("/welcome")({
  component: Welcome,
  head: () => ({
    meta: [{ title: "You're verified! — Boadwin" }],
  }),
});

function Welcome() {
  const navigate = useNavigate();
  const { status, profile } = useAuth();

  const next = needsParentConsent(profile as never) ? "/parent-consent" : "/onboarding";

  useEffect(() => {
    if (status !== "authed") return;
    const timer = setTimeout(() => navigate({ to: next }), AUTO_CONTINUE_MS);
    return () => clearTimeout(timer);
  }, [status, next, navigate]);

  if (status === "loading") {
    return (
      <div className="grid min-h-screen place-items-center bg-gradient-to-br from-purple/5 via-background to-cyan/5 px-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "guest") {
    return (
      <div className="grid min-h-screen place-items-center bg-gradient-to-br from-purple/5 via-background to-cyan/5 px-4 py-10">
        <div className="w-full max-w-md text-center">
          <Mascot size={80} />
          <h1 className="mt-5 text-3xl font-black">That link didn't work</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            The verification link may have expired or already been used. Try signing up again,
            or log in if you've already verified.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-purple/5 via-background to-cyan/5 px-4 py-10">
      <div className="w-full max-w-md text-center">
        <Mascot size={80} />
        <h1 className="mt-5 text-3xl font-black">
          You're verified! Welcome to <span className="text-gradient">Boadwin</span> 🎉
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your account is confirmed. Next up: a couple quick questions so we can set up your
          learning path.
        </p>
        <button
          onClick={() => navigate({ to: next })}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl gradient-hero px-6 py-4 font-black text-white shadow-glow transition-transform hover:scale-[1.02]"
        >
          Continue <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
