import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ArrowLeft, Send, Sparkles, Lock } from "lucide-react";

type LessonContext = { lessonTitle: string; unitTitle: string; levelTitle: string };

const QUICK_REPLIES = [
  "Explain more",
  "Give me a hint",
  "I understand now",
];

const SAMPLE_TURNS: { role: "user" | "assistant"; text: string }[] = [
  { role: "user", text: "I don't understand what a prompt is" },
  {
    role: "assistant",
    text:
      "No worries! Think of a prompt like a text message to a really smart friend. The clearer your message, the better their reply!",
  },
  { role: "user", text: "Can you give me a hint?" },
  {
    role: "assistant",
    text:
      "Sure! Think about what you're trying to tell the AI to do. What's the most important word in your instruction?",
  },
];

function getUserName(): string {
  if (typeof window === "undefined") return "Alex";
  return window.localStorage.getItem("aied:name") || "Alex";
}

function getAgeGroup(): "kids" | "teens" | "adults" {
  if (typeof window === "undefined") return "teens";
  const v = window.localStorage.getItem("aied:ageGroup");
  if (v === "kids" || v === "teens" || v === "adults") return v;
  return "teens";
}

export function TutorChat({
  onClose,
  lessonContext,
  premium,
}: {
  onClose: () => void;
  lessonContext?: LessonContext;
  premium: boolean;
}) {
  if (!premium) {
    return <LockedPreview onClose={onClose} />;
  }
  return <PremiumChat onClose={onClose} lessonContext={lessonContext} />;
}

function PremiumChat({
  onClose,
  lessonContext,
}: {
  onClose: () => void;
  lessonContext?: LessonContext;
}) {
  const userName = getUserName();
  const ageGroup = getAgeGroup();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ messages: msgs, id }) => ({
        body: {
          id,
          messages: msgs,
          lessonContext,
          userName,
          ageGroup,
        },
      }),
    }),
    messages: [
      {
        id: "intro",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: lessonContext
              ? `Hey ${userName}! I'm AL, your AI tutor. I see you're on "${lessonContext.lessonTitle}". Ask me anything — I'm here to help! ✨`
              : `Hey ${userName}! I'm AL, your AI tutor. Ask me anything about AI, prompts, or any lesson in AIED. ✨`,
          },
        ],
      } as UIMessage,
    ],
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const loading = status === "submitted" || status === "streaming";

  function send(text: string) {
    const t = text.trim();
    if (!t || loading) return;
    setInput("");
    void sendMessage({ text: t });
  }

  return (
    <ChatShell onClose={onClose}>
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <Bubble key={m.id} role={m.role as "user" | "assistant"}>
            {m.parts
              .map((p) => (p.type === "text" ? p.text : ""))
              .join("")}
          </Bubble>
        ))}
        {status === "submitted" && <TypingBubble />}
      </div>

      <div className="px-4 pb-2">
        <div className="flex flex-wrap gap-2">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              disabled={loading}
              className="rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-bold text-primary hover:bg-primary/15 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-border bg-card px-3 py-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AL anything..."
          className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="grid h-10 w-10 place-items-center rounded-full gradient-hero text-white shadow-glow disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </ChatShell>
  );
}

function LockedPreview({ onClose }: { onClose: () => void }) {
  return (
    <ChatShell onClose={onClose}>
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {SAMPLE_TURNS.map((t, i) => (
          <Bubble key={i} role={t.role}>
            {t.text}
          </Bubble>
        ))}
      </div>
      <div className="border-t border-border bg-gradient-to-b from-card to-primary/8 p-5">
        <div className="flex items-center gap-2 text-primary">
          <Lock className="h-4 w-4" />
          <p className="text-sm font-bold">AL is part of AIED Max</p>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Unlock your personal AI tutor for personalized hints, explanations, and progress coaching.
        </p>
        <Link
          to="/shop"
          onClick={onClose}
          className="mt-3 block rounded-2xl gradient-hero px-4 py-3 text-center text-sm font-bold text-white shadow-glow"
        >
          Upgrade to AIED Max
        </Link>
      </div>
    </ChatShell>
  );
}

function ChatShell({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-x-0 top-0 bottom-[72px] z-40 flex flex-col bg-white animate-fade-in">
      <header className="flex items-center gap-3 border-b border-border bg-card px-3 py-3">
        <button
          onClick={onClose}
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <AlAvatar />
        <div className="flex-1">
          <p className="font-bold leading-tight">AL</p>
          <p className="text-[11px] text-muted-foreground">Your AIED tutor</p>
        </div>
      </header>
      {children}
    </div>
  );
}

function Bubble({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: React.ReactNode;
}) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-2">
      <AlAvatar small />
      <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-primary/20 bg-card px-4 py-2.5 text-sm text-foreground shadow-soft">
        {children}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex items-start gap-2">
      <AlAvatar small />
      <div className="rounded-2xl rounded-tl-sm border border-primary/20 bg-card px-4 py-3 shadow-soft">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-1.5 w-1.5 rounded-full bg-primary"
              style={{ animation: `typing 1s ${i * 0.15}s infinite ease-in-out` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AlAvatar({ small = false }: { small?: boolean }) {
  const size = small ? 28 : 36;
  return (
    <div
      className="grid place-items-center rounded-2xl gradient-hero text-white shadow-glow"
      style={{ width: size, height: size }}
      aria-label="AL avatar"
    >
      <Sparkles className={small ? "h-3.5 w-3.5" : "h-5 w-5"} />
    </div>
  );
}
