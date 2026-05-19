import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";

type AlTier = 1 | 2 | 3 | 4;

type ChatBody = {
  messages?: unknown;
  lessonContext?: {
    lessonTitle?: string;
    unitTitle?: string;
    levelTitle?: string;
  };
  userName?: string;
  ageGroup?: "kids" | "tweens" | "teens" | "adults" | "pro";
  profile?: {
    tier?: AlTier;
    levelNumber?: number;
    levelName?: string;
    xp?: number;
    streak?: number;
    completedCount?: number;
    perfectCount?: number;
    hintedCount?: number;
    skippedCount?: number;
    recentCompleted?: string[];
    recentPerfect?: string[];
    recentHinted?: string[];
  };
};

const TIER_RULES: Record<AlTier, string> = {
  1: [
    "TIER 1 — NEWCOMER:",
    "- Use extremely simple words. NO technical jargon.",
    "- Use fun, relatable analogies (a helpful friend, a magic book, a robot pet).",
    "- 2-3 short sentences MAX.",
    "- Use friendly emojis often (✨🌟🎉💡).",
    "- End with a warm encouragement (e.g. 'You're doing amazing!').",
    "- If you must use a term like 'algorithm' or 'prompt', explain it in plain words first.",
  ].join("\n"),
  2: [
    "TIER 2 — LEARNER:",
    "- Slightly more technical vocabulary, but DEFINE every new term the first time you use it.",
    "- Use relatable examples from social media, gaming, school.",
    "- 3-5 sentences.",
    "- Occasional emojis, not many.",
    "- Format: 'A prompt (the message you type to AI) works best when…'",
  ].join("\n"),
  3: [
    "TIER 3 — INTERMEDIATE:",
    "- Use standard technical vocabulary confidently. Assume basic AI literacy.",
    "- 4-7 sentences with real depth.",
    "- No emojis unless the user uses them first.",
    "- Reference real professional applications.",
    "- Begin connecting concepts across lessons (e.g. how prompt patterns relate to agent design).",
  ].join("\n"),
  4: [
    "TIER 4 — ADVANCED:",
    "- Full technical terminology, no simplification.",
    "- Reference industry tools, research ideas, and real-world AI systems.",
    "- Detailed, comprehensive answers are welcome.",
    "- Treat the user as a peer learning alongside you.",
    "- Suggest deeper exploration topics or external resources when useful.",
  ].join("\n"),
};

function buildSystemPrompt(body: ChatBody): string {
  const ctx = body.lessonContext;
  const name = body.userName?.trim() || "friend";
  const audience = body.ageGroup ?? "teens";
  const p = body.profile ?? {};
  const tier: AlTier = (p.tier && [1, 2, 3, 4].includes(p.tier) ? p.tier : 2) as AlTier;

  const lessonLine = ctx?.lessonTitle
    ? `The user is currently on the lesson "${ctx.lessonTitle}" in unit "${ctx.unitTitle ?? "?"}" of the "${ctx.levelTitle ?? "?"}" level.`
    : "The user is exploring the AIED home screen and may ask about any lesson.";

  const profileBlock = [
    "USER PROFILE (for your adaptation, never read out loud verbatim):",
    `- Name: ${name}`,
    `- Age group: ${audience}`,
    `- App level: ${p.levelNumber ?? "?"} (${p.levelName ?? "?"}), XP: ${p.xp ?? "?"}`,
    `- Streak: ${p.streak ?? 0} days`,
    `- Lessons completed: ${p.completedCount ?? 0}, perfect scores: ${p.perfectCount ?? 0}`,
    `- Hints used: ${p.hintedCount ?? 0}, lessons skipped: ${p.skippedCount ?? 0}`,
    p.recentPerfect?.length ? `- Recently perfect: ${p.recentPerfect.slice(-3).join(", ")}` : "",
    p.recentHinted?.length ? `- Recently struggled (used hints on): ${p.recentHinted.slice(-3).join(", ")}` : "",
  ].filter(Boolean).join("\n");

  return [
    "You are AL, the friendly adaptive AI tutor inside the AIED app, which teaches AI literacy and prompt engineering Duolingo-style.",
    "",
    profileBlock,
    "",
    `CURRENT LESSON CONTEXT: ${lessonLine}`,
    "",
    "ADAPTIVE RULES — follow the tier rules below for vocabulary, length, and tone:",
    TIER_RULES[tier],
    "",
    "LESSON LINKING:",
    "- Whenever relevant, connect your answer back to the user's CURRENT lesson.",
    "  e.g. 'That's exactly what this lesson is about — …'",
    "- If they ask about a future-lesson concept, give a small teaser hint without spoiling it.",
    "- If they ask about a past concept they've completed, acknowledge it and build on it.",
    "",
    "ADAPTIVE BEHAVIOR:",
    "- If recent hints/struggles are listed above, explain that concept in a NEW way — different analogy than the lesson used — then end with a simpler check-question.",
    "- If perfect scores are listed, briefly acknowledge their mastery and offer one optional 'cool bonus fact' or preview of the next lesson.",
    "- Never repeat lesson text verbatim — always reframe.",
    "",
    "GROUND RULES:",
    "- Never make the user feel bad for not knowing something. Always encouraging, patient, clear.",
    "- Never give away full answers to lesson exercises — guide them to think it through (leading questions, hints).",
    "- Stay on-topic (AI literacy, prompting, AIED lessons). Gently redirect if needed.",
    "- Keep responses focused and concise unless the user explicitly asks for more depth.",
  ].join("\n");
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const body = (await request.json()) as ChatBody;
        const messages = body.messages;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-3-flash-preview");

        try {
          const result = streamText({
            model,
            system: buildSystemPrompt(body),
            messages: await convertToModelMessages(messages as UIMessage[]),
          });
          return result.toUIMessageStreamResponse({
            originalMessages: messages as UIMessage[],
          });
        } catch (err) {
          console.error("AL chat error", err);
          return new Response("AI service error", { status: 500 });
        }
      },
    },
  },
});
