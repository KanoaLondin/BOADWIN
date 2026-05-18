import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";

type ChatBody = {
  messages?: unknown;
  lessonContext?: {
    lessonTitle?: string;
    unitTitle?: string;
    levelTitle?: string;
  };
  userName?: string;
  ageGroup?: "kids" | "teens" | "adults";
};

function buildSystemPrompt(body: ChatBody): string {
  const ctx = body.lessonContext;
  const name = body.userName?.trim() || "friend";
  const audience = body.ageGroup ?? "teens";
  const vocabHint =
    audience === "kids"
      ? "Use very simple words, short sentences, and fun analogies a 6-10 year old would understand."
      : audience === "adults"
      ? "You can use precise, technical language when helpful."
      : "Use friendly, clear language a teenager would enjoy.";

  const lessonLine = ctx?.lessonTitle
    ? `The user is currently on the lesson "${ctx.lessonTitle}" in unit "${ctx.unitTitle ?? "?"}" of the "${ctx.levelTitle ?? "?"}" level.`
    : "The user is exploring the AIED app home and may ask about any lesson.";

  return [
    "You are AL, the friendly personal AI tutor inside the AIED learning app.",
    "AIED teaches AI literacy and prompt engineering through Duolingo-style lessons.",
    `The learner you are helping is ${name}.`,
    lessonLine,
    "",
    "Personality:",
    "- Encouraging, patient, smart, slightly playful.",
    "- Always start with a short encouraging beat (e.g. \"Great question!\", \"Nice thinking!\").",
    "- Use simple, vivid analogies to explain complex concepts.",
    "- Never just hand over answers to lesson exercises. Guide the user with hints and questions.",
    "- Never make the user feel bad for getting things wrong; celebrate effort and progress.",
    `- ${vocabHint}`,
    "",
    "Behavior:",
    "- Keep responses short (2-5 sentences) unless the user explicitly asks for more depth.",
    "- If asked for a hint, give a nudge or a leading question instead of the full answer.",
    "- You can recommend the next best lesson or unit based on what the user describes.",
    "- If the user is off-topic, gently bring them back to AI literacy and prompting.",
    "- Sign off occasionally with the user's name, but don't overdo it.",
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
