import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { findLesson, courseForUnit, type Lesson } from "./course-data";
import { applySlots } from "./lesson-adapt";
import { buildPersona, type PersonaContext, type PersonaGoal } from "./persona";
import type { CohortAgeGroup } from "./cohort";
import {
  READING_LEVEL_PERSONA_KEY,
  toReadingLevel,
  type ReadingLevel,
} from "./reading-level";

const schema = z.object({ lessonId: z.string().min(1) });

export type AdaptedLesson = {
  lessonId: string;
  personaKey: string;
  personaLabel: string;
  readingLevel: ReadingLevel;
  adapted: boolean;
  lesson: Lesson;
};

/**
 * Returns the lesson worded for the signed-in learner. Learners on a non-default
 * reading level (Kid / Teen) get the reading-level version, which is shared by
 * everyone on that level; otherwise the persona wording applies as before.
 * Both are cached in the database and generated once.
 */
export const getAdaptedLesson = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data, context }): Promise<AdaptedLesson | null> => {
    const found = findLesson(data.lessonId);
    if (!found) return null;

    const { data: profile } = await context.supabase
      .from("profiles")
      .select("cohort_age_group, persona_used_ai, persona_context, persona_goal, reading_level")
      .eq("id", context.userId)
      .maybeSingle();

    const readingLevel = toReadingLevel(
      (profile as { reading_level?: unknown } | null)?.reading_level,
    );

    const persona = buildPersona(
      (profile?.cohort_age_group as CohortAgeGroup | null) ?? null,
      {
        usedAi: (profile?.persona_used_ai as boolean | null) ?? null,
        context: (profile?.persona_context as PersonaContext | null) ?? null,
        goal: (profile?.persona_goal as PersonaGoal | null) ?? null,
      },
    );

    // On a reading-level tier the cached text is shared across all learners on
    // that tier, so it is stored under one fixed key instead of per-persona.
    const cacheKey = readingLevel === "pro" ? persona.key : READING_LEVEL_PERSONA_KEY;

    const base: AdaptedLesson = {
      lessonId: data.lessonId,
      personaKey: cacheKey,
      personaLabel: persona.label,
      readingLevel,
      adapted: false,
      lesson: found.lesson,
    };

    const { data: cached } = await context.supabase
      .from("lesson_adaptations")
      .select("payload")
      .eq("lesson_id", data.lessonId)
      .eq("persona_key", cacheKey)
      .eq("reading_level", readingLevel)
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
        readingLevel,
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
          {
            lesson_id: data.lessonId,
            persona_key: cacheKey,
            reading_level: readingLevel,
            payload: slots,
          },
          { onConflict: "lesson_id,persona_key,reading_level" },
        );
    } catch (err) {
      console.error("[lesson-adapt] cache write failed", err);
    }

    return { ...base, adapted: true, lesson: applySlots(found.lesson, slots) };
  });

/** Persists the learner's chosen reading level. */
export const setReadingLevelServer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ level: z.enum(["kid", "teen", "pro"]) }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("profiles")
      .update({ reading_level: data.level } as never)
      .eq("id", context.userId);
    if (error) throw new Error(error.message);
    return { level: data.level as ReadingLevel };
  });
