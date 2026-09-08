// Reads the signed-in learner's subscription row (written only by the payment
// webhook) and keeps local app state's plan in sync with it.
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { getPaddleEnvironment, PRODUCT_TO_PLAN, type PlanId } from "@/lib/paddle";

export type SubscriptionRow = {
  paddle_subscription_id: string;
  product_id: string;
  price_id: string;
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
};

export function useSubscription() {
  const { userId } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionRow | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!userId) {
      setSubscription(null);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("subscriptions")
      .select(
        "paddle_subscription_id, product_id, price_id, status, current_period_end, cancel_at_period_end",
      )
      .eq("user_id", userId)
      .eq("environment", getPaddleEnvironment())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setSubscription((data as SubscriptionRow | null) ?? null);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    void refetch();
    if (!userId) return;
    const channel = supabase
      .channel(`subscriptions:${userId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "subscriptions", filter: `user_id=eq.${userId}` },
        () => void refetch(),
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [userId, refetch]);

  const end = subscription?.current_period_end ? new Date(subscription.current_period_end) : null;
  const inPeriod = !end || end > new Date();
  const isActive =
    !!subscription &&
    ((["active", "trialing", "past_due"].includes(subscription.status) && inPeriod) ||
      (subscription.status === "canceled" && !!end && end > new Date()));

  const plan: PlanId | null =
    isActive && subscription ? (PRODUCT_TO_PLAN[subscription.product_id] ?? null) : null;

  return { subscription, plan, isActive, loading, refetch };
}
