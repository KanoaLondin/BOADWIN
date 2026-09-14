import type { AppState } from "./app-state";

const PAID_PLANS = new Set(["super", "max", "family"]);

/**
 * Course access may arrive from the freshly loaded account profile or from
 * the local gameplay store. Accept either source so account hydration and
 * billing refreshes cannot briefly re-lock paid content.
 */
export function hasPaidCourseAccess(
  profilePlan: string | null | undefined,
  localPlan: AppState["premium"],
): boolean {
  // Once the account profile is available it is authoritative. The local
  // value is only the startup fallback while that profile is loading.
  return profilePlan != null ? PAID_PLANS.has(profilePlan) : localPlan !== false;
}