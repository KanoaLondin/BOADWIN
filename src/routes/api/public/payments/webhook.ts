// Payment provider webhook: keeps `subscriptions` and each learner's plan on
// their profile in sync. Security comes from signature verification.
import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { verifyWebhook, EventName, type PaddleEnv } from "@/lib/paddle.server";

let _supabase: ReturnType<typeof createClient<Database>> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient<Database>(
      process.env["SUPABASE_URL"]!,
      process.env["SUPABASE_SERVICE_ROLE_KEY"]!,
    );
  }
  return _supabase;
}

const PRODUCT_TO_PLAN: Record<string, "super" | "max" | "family"> = {
  super_aied: "super",
  aied_max: "max",
  aied_family: "family",
};

/** Access is granted while active/trialing/past_due, and until period end after cancel. */
async function applyPlanToProfile(
  userId: string,
  productExternalId: string,
  status: string,
  periodEnd: string | null | undefined,
) {
  const plan = PRODUCT_TO_PLAN[productExternalId];
  const stillEntitled =
    status === "active" ||
    status === "trialing" ||
    status === "past_due" ||
    (status === "canceled" && !!periodEnd && new Date(periodEnd) > new Date());

  await getSupabase()
    .from("profiles")
    .update({
      premium: stillEntitled && plan ? plan : "free",
      premium_renewal_at: stillEntitled ? (periodEnd ?? null) : null,
    })
    .eq("id", userId);
}

async function upsertSubscription(data: any, env: PaddleEnv) {
  const { id, customerId, items, status, currentBillingPeriod, customData } = data;
  const userId = customData?.userId;
  if (!userId) {
    console.error("No userId in customData");
    return;
  }
  const item = items?.[0];
  const priceId = item?.price?.importMeta?.externalId;
  const productId = item?.product?.importMeta?.externalId;
  if (!priceId || !productId) {
    console.warn("Skipping subscription: missing importMeta.externalId", {
      rawPriceId: item?.price?.id,
      rawProductId: item?.product?.id,
    });
    return;
  }

  await getSupabase()
    .from("subscriptions")
    .upsert(
      {
        user_id: userId,
        paddle_subscription_id: id,
        paddle_customer_id: customerId,
        product_id: productId,
        price_id: priceId,
        status,
        current_period_start: currentBillingPeriod?.startsAt ?? null,
        current_period_end: currentBillingPeriod?.endsAt ?? null,
        environment: env,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "paddle_subscription_id" },
    );

  await applyPlanToProfile(userId, productId, status, currentBillingPeriod?.endsAt);
}

async function updateSubscription(data: any, env: PaddleEnv, forceCanceled = false) {
  const { id, status, currentBillingPeriod, scheduledChange } = data;
  const nextStatus = forceCanceled ? "canceled" : status;

  const { data: rows } = await getSupabase()
    .from("subscriptions")
    .update({
      status: nextStatus,
      current_period_start: currentBillingPeriod?.startsAt ?? null,
      current_period_end: currentBillingPeriod?.endsAt ?? null,
      cancel_at_period_end: scheduledChange?.action === "cancel",
      updated_at: new Date().toISOString(),
    })
    .eq("paddle_subscription_id", id)
    .eq("environment", env)
    .select("user_id, product_id, current_period_end");

  const row = rows?.[0] as
    | { user_id: string; product_id: string; current_period_end: string | null }
    | undefined;
  if (row) {
    await applyPlanToProfile(
      row.user_id,
      row.product_id,
      nextStatus,
      currentBillingPeriod?.endsAt ?? row.current_period_end,
    );
  }
}

async function handleWebhook(req: Request, env: PaddleEnv) {
  const event = await verifyWebhook(req, env);

  switch (event.eventType) {
    case EventName.SubscriptionCreated:
      await upsertSubscription(event.data, env);
      break;
    case EventName.SubscriptionUpdated:
      await updateSubscription(event.data, env);
      break;
    case EventName.SubscriptionCanceled:
      await updateSubscription(event.data, env, true);
      break;
    default:
      console.log("Unhandled event:", event.eventType);
  }
}

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const env = (url.searchParams.get("env") || "sandbox") as PaddleEnv;
        try {
          await handleWebhook(request, env);
          return Response.json({ received: true });
        } catch (e) {
          console.error("Webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});
