import { useEffect } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { needsParentConsent } from "@/lib/child-safety";

/**
 * Sends brand-new accounts through the cohort onboarding once. Existing
 * profiles were backfilled with a default cohort, so they never see it again.
 */
export function CohortGate() {
  const { status, profile } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const needsOnboarding =
    status === "authed" &&
    !!profile &&
    !(profile as { cohort_age_group?: string | null }).cohort_age_group &&
    !needsParentConsent(profile as never);

  useEffect(() => {
    if (needsOnboarding && pathname !== "/onboarding") {
      navigate({ to: "/onboarding" });
    }
  }, [needsOnboarding, pathname, navigate]);

  return null;
}
