/**
 * One-off build tool: pre-generates the Kid and Teen wording of every lesson in
 * the four pilot courses and caches it in lesson_adaptations, so learners never
 * wait for a rewrite. Safe to re-run — existing rows are skipped.
 *
 *   bun scripts/gen-reading-levels.ts <course-id> [kid|teen]
 */
import { createClient } from "@supabase/supabase-js";
import { COURSES } from "../src/lib/course-data";
import { generateAdaptation } from "../src/lib/lesson-adapt.server";
import { buildPersona } from "../src/lib/persona";
import { READING_LEVEL_PERSONA_KEY, type ReadingLevel } from "../src/lib/reading-level";

const courseId = process.argv[2];
const onlyLevel = process.argv[3] as ReadingLevel | undefined;
const levels: ReadingLevel[] = onlyLevel ? [onlyLevel] : ["kid", "teen"];

const course = COURSES.find((c) => c.id === courseId);
if (!course) throw new Error(`unknown course: ${courseId}`);

const db = createClient(
  process.env['SUPABASE_URL']!,
  process.env['SUPABASE_SERVICE_ROLE_KEY']!,
  { auth: { persistSession: false } },
);

const persona = buildPersona(null, { usedAi: null, context: null, goal: null });

type Job = { lessonId: string; level: ReadingLevel; unitTitle: string; lesson: (typeof COURSES)[number]["levels"][number]["units"][number]["lessons"][number] };

const jobs: Job[] = [];
for (const lvl of course.levels)
  for (const unit of lvl.units)
    for (const lesson of unit.lessons)
      for (const level of levels)
        jobs.push({ lessonId: lesson.id, level, unitTitle: unit.title, lesson });

const { data: existing } = await db
  .from("lesson_adaptations")
  .select("lesson_id, reading_level")
  .eq("persona_key", READING_LEVEL_PERSONA_KEY);
const have = new Set((existing ?? []).map((r: any) => `${r.lesson_id}:${r.reading_level}`));

const todo = jobs.filter((j) => !have.has(`${j.lessonId}:${j.level}`));
console.log(`${course.title}: ${jobs.length} targets, ${todo.length} to generate`);

let done = 0;
let failed = 0;

async function run(job: Job) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const slots = await generateAdaptation(
        job.lesson,
        persona,
        course!.title,
        job.unitTitle,
        job.level,
      );
      if (!slots) {
        failed++;
        console.log(`  skip (no slots) ${job.lessonId} ${job.level}`);
        return;
      }
      const { error } = await db.from("lesson_adaptations").upsert(
        {
          lesson_id: job.lessonId,
          persona_key: READING_LEVEL_PERSONA_KEY,
          reading_level: job.level,
          payload: slots,
        },
        { onConflict: "lesson_id,persona_key,reading_level" },
      );
      if (error) throw new Error(error.message);
      done++;
      if (done % 10 === 0) console.log(`  ${done}/${todo.length}`);
      return;
    } catch (err) {
      if (attempt === 2) {
        failed++;
        console.log(`  FAIL ${job.lessonId} ${job.level}: ${String(err).slice(0, 160)}`);
      } else {
        await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
      }
    }
  }
}

const CONCURRENCY = 4;
let cursor = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (cursor < todo.length) {
      const job = todo[cursor++];
      await run(job);
    }
  }),
);

console.log(`${course.title}: generated ${done}, failed ${failed}`);
