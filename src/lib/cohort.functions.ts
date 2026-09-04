import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { scoreKnowledge } from "./cohort.server";
import { buildPersona } from "./persona";
import type { CohortAgeGroup, KnowledgeLevel } from "./cohort";

const schema = z.object({
  ageGroup: z.enum(["kid", "teen", "adult"]),
  answers: z.array(z.number().int().min(0).max(9)).length(5),
  // Persona questionnaire — never collected for the "kid" band.
  persona: z
    .object({
      usedAi: z.boolean().nullable().optional(),
      context: z.enum(["student", "employee", "business_owner", "other"]).nullable().optional(),
      goal: z.enum(["personal", "work", "marketing", "building"]).nullable().optional(),
    })
    .optional(),
});

/**
 * Scores the onboarding knowledge check server-side and saves the resulting
 * cohort onto the signed-in user's cloud profile.
 */
export const saveCohort = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data, context }): Promise<{ ageGroup: CohortAgeGroup; knowledgeLevel: KnowledgeLevel; personaKey: string; personaLabel: string }> => {
    const { knowledgeLevel } = scoreKnowledge(data.answers);
    const appAgeGroup =
      data.ageGroup === "kid" ? "kids" : data.ageGroup === "teen" ? "teens" : "adults";

    // Data minimisation: children's persona comes from their age band alone.
    const answers =
      data.ageGroup === "kid"
        ? { usedAi: null, context: null, goal: null }
        : {
            usedAi: data.persona?.usedAi ?? null,
            context: data.persona?.context ?? null,
            goal: data.persona?.goal ?? null,
          };
    const persona = buildPersona(data.ageGroup, answers);

    const { error } = await context.supabase
      .from("profiles")
      .update({
        cohort_age_group: data.ageGroup,
        knowledge_level: knowledgeLevel,
        age_group: appAgeGroup,
        persona_used_ai: answers.usedAi,
        persona_context: answers.context,
        persona_goal: answers.goal,
        persona_key: persona.key,
      })
      .eq("id", context.userId);

    if (error) throw new Error(error.message);
    return { ageGroup: data.ageGroup, knowledgeLevel, personaKey: persona.key, personaLabel: persona.label };
  });
