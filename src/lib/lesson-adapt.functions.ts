import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { findLesson, courseForUnit, type Lesson } from "./course-data";
import { applySlots } from "./lesson-adapt";
import { buildPersona, type PersonaContext, type PersonaGoal } from "./persona";
import type { CohortAgeGroup } from "./cohort";

const schema = z.object({ lessonId: z.string().min(1) });

export type AdaptedLesson = {
  lessonId: string;
  personaKey: string;
  personaLabel: string;
  adapted: boolean;
  lesson: Lesson;
};

/**
 * Returns the lesson worded for the signed-in learner's persona. Cached in the
 * database per lesson + persona, so it's generated once and reused by everyone
 * with the same persona.
 */
export const getAdaptedLesson = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data, context }): Promise<AdaptedLesson | null> => {
    const found = findLesson(data.lessonId);
    if (!found) return null;

    const { data: profile } = await context.supabase
      .from("profiles")
      .select("cohort_age_group, persona_used_ai, persona_context, persona_goal")
      .eq("id", context.userId)
      .maybeSingle();

    const persona = buildPersona(
      (profile?.cohort_age_group as CohortAgeGroup | null) ?? null,
      {
        usedAi: (profile?.persona_used_ai as boolean | null) ?? null,
        context: (profile?.persona_context as PersonaContext | null) ?? null,
        goal: (profile?.persona_goal as PersonaGoal | null) ?? null,
      },
    );

    const base: AdaptedLesson = {
      lessonId: data.lessonId,
      personaKey: persona.key,
      personaLabel: persona.label,
      adapted: false,
      lesson: found.lesson,
    };

    const { data: cached } = await context.supabase
      .from("lesson_adaptations")
      .select("payload")
      .eq("lesson_id", data.lessonId)
      .eq("persona_key", persona.key)
      .maybeSingle();

    if (cached?.payload && typeof cached.payload === "object") {
      return {
        ...base,
        adapted: true,
        lesson: applySlots(found.lesson, cached.payload as Record<string, unknown>),
      };
    }

    const { generateAdaptation } = await import("./lesson-adapt.server");
    const course = courseForUnit(found.unit.id);
    let slots: Record<string, string> | null = null;
    try {
      slots = await generateAdaptation(
        found.lesson,
        persona,
        course?.title ?? "AIED",
        found.unit.title,
      );
    } catch (err) {
      console.error("[lesson-adapt] generation failed", err);
    }
    if (!slots) return base;

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin
        .from("lesson_adaptations")
        .upsert(
          { lesson_id: data.lessonId, persona_key: persona.key, payload: slots },
          { onConflict: "lesson_id,persona_key" },
        );
    } catch (err) {
      console.error("[lesson-adapt] cache write failed", err);
    }

    return { ...base, adapted: true, lesson: applySlots(found.lesson, slots) };
  });
