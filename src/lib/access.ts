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
  return PAID_PLANS.has(profilePlan ?? "") || localPlan !== false;
}