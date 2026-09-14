# Reading-level tiers for the four pilot courses

Add a 3-tier reading level — Kid (ages 8-10, ~500-700L), Teen/General (~1000-1200L), and Professional (today's text, unchanged) — to AI Security, AI Evaluation, Media Literacy and No-Code Data Analysis.

## What the learner sees

- A new question during first-time setup: "How would you like lessons written?" with the three tiers described in plain language.
- The same choice in Settings, under Preferences, changeable any time.
- Everyone who already has an account stays on Professional, so nothing about their lessons changes until they pick something else.
- Picking Kid or Teen rewrites the teaching text and every exercise — questions, answer choices, matching pairs, fill-in-the-blank sentences and true/false statements — in simpler language. The facts, the topic and the correct answer never change.

## How the rewriting is produced

The app already has a wording-personalisation system that rewrites a lesson for a learner and stores the result so it is generated once and then reused by everyone with the same profile. This feature extends that system with the reading level rather than writing a second and third copy of every lesson by hand:

- The reading level becomes part of the stored key, so each lesson has a Kid version and a Teen version saved in the database.
- The rewriting instructions gain explicit Lexile targets: Kid — 8-12 word sentences, everyday words, concrete analogies, any technical term explained in kid language; Teen — moderate sentences, general-audience vocabulary, technical terms kept but briefly explained.
- Existing correctness guards stay: right answers stay right, wrong answers stay wrong, blanks keep the same missing word, true/false never flips.
- Professional skips rewriting entirely and serves today's text.

To avoid a wait the first time anyone opens a lesson, I will pre-generate and store the Kid and Teen versions for all 142 lessons, course by course — Security, then Evaluation, then Media Literacy, then No-Code — checking in with progress after each course and spot-checking sample lessons for accuracy and reading level.

## Technical notes

- Migration: add `reading_level` to `profiles` (default `pro`), and widen the `lesson_adaptations` unique key from `(lesson_id, persona_key)` to include the reading level.
- `src/lib/reading-level.ts`: tier type, labels, Lexile briefs.
- `src/lib/persona.ts` / `lesson-adapt.server.ts`: fold the reading-level brief into the rewrite prompt and cache key.
- `src/lib/lesson-adapt.functions.ts`: read the profile's reading level; return the base lesson untouched for `pro`.
- `src/routes/onboarding.tsx` + `src/routes/settings.index.tsx`: tier selector, persisted to the profile and to app state.
- A one-off pre-generation script drives the existing server generation per lesson/tier and writes rows into `lesson_adaptations`.
- Untouched: No-Code's `tier: "Free"` and its exclusion from the onboarding course recommendation.
