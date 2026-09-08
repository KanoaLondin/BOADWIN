// Keeps the signed-in learner's plan in local app state aligned with the
// billing record written by the payment webhook. Mounted once at the root so a
// purchase, plan switch, or cancellation made on the website is reflected in
// the app (and vice versa) as soon as the webhook lands — no reload required.
import { useEffect } from "react";

import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/lib/auth";
import { useAppState, setPremiumFromBilling } from "@/lib/app-state";

export function SubscriptionSync() {
  const { userId } = useAuth();
  const { plan, isActive, subscription, loading } = useSubscription();
  const current = useAppState((s) => s.premium);
  const renewal = useAppState((s) => s.premiumRenewalISO);

  useEffect(() => {
    if (!userId || loading) return;
    // No billing record at all: leave whatever the profile says (e.g. plans
    // granted outside checkout) untouched.
    if (!subscription) return;

    const nextPlan = isActive && plan ? plan : false;
    const nextRenewal = subscription.current_period_end ?? null;
    if (current !== nextPlan || renewal !== nextRenewal) {
      setPremiumFromBilling(nextPlan, nextRenewal);
    }
  }, [userId, plan, isActive, subscription, loading, current, renewal]);

  return null;
}
