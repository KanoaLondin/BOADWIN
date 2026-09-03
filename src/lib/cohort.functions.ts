import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { scoreKnowledge } from "./cohort.server";
import type { CohortAgeGroup, KnowledgeLevel } from "./cohort";

const schema = z.object({
  ageGroup: z.enum(["kid", "teen", "adult"]),
  answers: z.array(z.number().int().min(0).max(9)).length(5),
});

/**
 * Scores the onboarding knowledge check server-side and saves the resulting
 * cohort onto the signed-in user's cloud profile.
 */
export const saveCohort = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data, context }): Promise<{ ageGroup: CohortAgeGroup; knowledgeLevel: KnowledgeLevel }> => {
    const { knowledgeLevel } = scoreKnowledge(data.answers);
    const appAgeGroup =
      data.ageGroup === "kid" ? "kids" : data.ageGroup === "teen" ? "teens" : "adults";

    const { error } = await context.supabase
      .from("profiles")
      .update({
        cohort_age_group: data.ageGroup,
        knowledge_level: knowledgeLevel,
        age_group: appAgeGroup,
      })
      .eq("id", context.userId);

    if (error) throw new Error(error.message);
    return { ageGroup: data.ageGroup, knowledgeLevel };
  });
