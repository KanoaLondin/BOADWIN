// Server functions backing checkout, plan switching and cancellation.
import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { gatewayFetch, getPaddleClient, type PaddleEnv } from "@/lib/paddle.server";

/** Resolve a human-readable price ID to the provider's internal price ID. */
export const resolvePaddlePrice = createServerFn({ method: "GET" })
  .inputValidator((data: { priceId: string; environment: PaddleEnv }) => data)
  .handler(async ({ data }) => {
    const response = await gatewayFetch(
      data.environment,
      `/prices?external_id=${encodeURIComponent(data.priceId)}`,
    );
    const result = (await response.json()) as { data?: Array<{ id: string }> };
    if (!result.data?.length) throw new Error("Price not found");
    return result.data[0]!.id;
  });

async function loadActiveSubscription(
  supabase: any,
  userId: string,
  environment: PaddleEnv,
) {
  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("environment", environment)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data as
    | {
        paddle_subscription_id: string;
        paddle_customer_id: string;
        status: string;
        environment: string;
      }
    | null;
}

/** Cancel at the end of the current billing period. */
export const cancelPaddleSubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { environment: PaddleEnv }) => data)
  .handler(async ({ data, context }) => {
    const sub = await loadActiveSubscription(context.supabase, context.userId, data.environment);
    if (!sub || sub.status === "canceled") throw new Error("No active subscription to cancel");

    const paddle = getPaddleClient(data.environment);
    await paddle.subscriptions.cancel(sub.paddle_subscription_id, {
      effectiveFrom: "next_billing_period",
    });
    return { ok: true };
  });

/** Switch an existing paid subscription to a different plan, pro-rated. */
export const switchPaddlePlan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { priceId: string; environment: PaddleEnv }) => data)
  .handler(async ({ data, context }) => {
    const sub = await loadActiveSubscription(context.supabase, context.userId, data.environment);
    if (!sub || sub.status === "canceled") throw new Error("No active subscription to switch");

    const priceResponse = await gatewayFetch(
      data.environment,
      `/prices?external_id=${encodeURIComponent(data.priceId)}`,
    );
    const priceResult = (await priceResponse.json()) as { data?: Array<{ id: string }> };
    const paddlePriceId = priceResult.data?.[0]?.id;
    if (!paddlePriceId) throw new Error("Price not found");

    const paddle = getPaddleClient(data.environment);
    await paddle.subscriptions.update(sub.paddle_subscription_id, {
      items: [{ priceId: paddlePriceId, quantity: 1 }],
      prorationBillingMode: "prorated_immediately",
    });
    return { ok: true };
  });

/** Hosted billing portal (payment method, invoices). */
export const createPaddlePortalSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { environment: PaddleEnv }) => data)
  .handler(async ({ data, context }) => {
    const sub = await loadActiveSubscription(context.supabase, context.userId, data.environment);
    if (!sub) throw new Error("No subscription found");
    const paddle = getPaddleClient(data.environment);
    const session = await paddle.customerPortalSessions.create(sub.paddle_customer_id, [
      sub.paddle_subscription_id,
    ]);
    return { url: session.urls.general.overview };
  });
