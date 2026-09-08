// Browser-side Paddle.js bootstrap plus the plan <-> price mapping the
// subscription screen uses.
import { resolvePaddlePrice } from "@/lib/payments.functions";

const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;

declare global {
  interface Window {
    Paddle: any;
  }
}

export type PlanId = "super" | "max" | "family";

/** Human-readable price IDs created in the payment provider. */
export const PLAN_PRICE_IDS: Record<PlanId, string> = {
  super: "super_aied_monthly",
  max: "aied_max_monthly",
  family: "aied_family_yearly",
};

/** Maps the provider's product IDs back to an in-app plan. */
export const PRODUCT_TO_PLAN: Record<string, PlanId> = {
  super_aied: "super",
  aied_max: "max",
  aied_family: "family",
};

export function getPaddleEnvironment(): "sandbox" | "live" {
  return clientToken?.startsWith("test_") ? "sandbox" : "live";
}

let paddleInitialized = false;

export async function initializePaddle() {
  if (paddleInitialized) return;
  if (!clientToken) throw new Error("VITE_PAYMENTS_CLIENT_TOKEN is not set");

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.onload = () => {
      const paddleJsEnvironment = getPaddleEnvironment() === "sandbox" ? "sandbox" : "production";
      window.Paddle.Environment.set(paddleJsEnvironment);
      window.Paddle.Initialize({ token: clientToken });
      paddleInitialized = true;
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export async function getPaddlePriceId(priceId: string): Promise<string> {
  const environment = getPaddleEnvironment();
  return resolvePaddlePrice({ data: { priceId, environment } });
}
