import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ArrowLeft, Send, Sparkles, Lock } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import { getLevelInfo } from "@/lib/level-system";
import { resolveAlTier } from "@/lib/al-tier";


type LessonContext = { lessonTitle: string; unitTitle: string; levelTitle: string };

const CHAT_NAV_HEIGHT = "var(--bottom-nav-height)";
const CHAT_SURFACE = "var(--al-chat-surface)";

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
  const name = useAppState((s) => s.name);
  const ageGroupRaw = useAppState((s) => s.ageGroup);
  const xp = useAppState((s) => s.xp);
  const streak = useAppState((s) => s.streak);
  const completedLessons = useAppState((s) => s.completedLessons);
  const perfectLessons = useAppState((s) => s.perfectLessons);
  const hintedQuestions = useAppState((s) => s.hintedQuestions);
  const skippedLessons = useAppState((s) => s.skippedLessons);
  const userName = name || "Alex";
  // API expects kids|teens|adults — fold tweens→teens, pro→adults
  const ageGroup: "kids" | "teens" | "adults" =
    ageGroupRaw === "kids" ? "kids"
    : ageGroupRaw === "adults" || ageGroupRaw === "pro" ? "adults"
    : "teens";

  const tierInfo = resolveAlTier({ xp, ageGroup: ageGroupRaw });
  const levelInfo = getLevelInfo(xp);

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
          profile: {
            tier: tierInfo.tier,
            levelNumber: levelInfo.level,
            levelName: levelInfo.name,
            xp,
            streak,
            completedCount: completedLessons.length,
            perfectCount: perfectLessons.length,
            hintedCount: hintedQuestions.length,
            skippedCount: skippedLessons.length,
            recentCompleted: completedLessons.slice(-5),
            recentPerfect: perfectLessons.slice(-5),
            recentHinted: hintedQuestions.slice(-5),
          },
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

      <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4" style={{ backgroundColor: CHAT_SURFACE }}>
        {messages.map((m) => (
          <Bubble key={m.id} role={m.role as "user" | "assistant"}>
            {m.parts
              .map((p) => (p.type === "text" ? p.text : ""))
              .join("")}
          </Bubble>
        ))}
        {status === "submitted" && <TypingBubble />}
      </div>

      <div className="shrink-0 px-3 pb-2 pt-1" style={{ backgroundColor: CHAT_SURFACE }}>
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              disabled={loading}
              className="shrink-0 rounded-full border border-primary/30 bg-white px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/8 disabled:opacity-50"
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
        className="shrink-0 flex items-center gap-2 border-t border-border px-3 py-3"
        style={{ backgroundColor: CHAT_SURFACE }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AL anything..."
          className="flex-1 rounded-full border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-primary"
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
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4" style={{ backgroundColor: CHAT_SURFACE }}>
        {SAMPLE_TURNS.map((t, i) => (
          <Bubble key={i} role={t.role}>
            {t.text}
          </Bubble>
        ))}
      </div>
      <div className="shrink-0 border-t border-border p-5" style={{ backgroundColor: CHAT_SURFACE }}>
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
  children: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.classList.add("al-chat-open");
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.classList.remove("al-chat-open");
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  const content = (
    <div
      className="fixed left-0 right-0 top-0 z-[9999] flex w-screen flex-col overflow-hidden animate-chat-slide-up"
      style={{
        bottom: CHAT_NAV_HEIGHT,
        height: `calc(100dvh - ${CHAT_NAV_HEIGHT})`,
        maxHeight: `calc(100dvh - ${CHAT_NAV_HEIGHT})`,
        backgroundColor: CHAT_SURFACE,
      }}
    >
      <header className="relative shrink-0 border-b border-border px-3 h-16" style={{ backgroundColor: CHAT_SURFACE }}>
        <div className="flex h-16 items-center">
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="pointer-events-none absolute left-1/2 top-2 flex -translate-x-1/2 flex-col items-center">
            <AlAvatar />
            <p className="mt-1 text-sm font-bold leading-tight">AL</p>
            <p className="text-[10px] text-muted-foreground">Your AIED Tutor</p>
          </div>
          <div className="ml-auto shrink-0">
            <HeaderAlButton />
          </div>

        </div>
      </header>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );

  if (typeof document === "undefined") {
    return content;
  }

  return createPortal(content, document.body);
}


function Bubble({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: ReactNode;
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
      <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-primary/20 bg-white px-4 py-2.5 text-sm text-foreground shadow-soft">
        {children}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex items-start gap-2">
      <AlAvatar small />
      <div className="rounded-2xl rounded-tl-sm border border-primary/20 bg-white px-4 py-3 shadow-soft">
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

const QUIPS = [
  "I'm right here — ask me anything!",
  "Still with you — what do you need?",
  "Right by your side ✨",
  "Ready when you are!",
];

function HeaderAlButton() {
  const outfit = useAppState((s) => s.alOutfit) ?? "classic";
  const [quip, setQuip] = useState<string | null>(null);
  const [bob, setBob] = useState(false);

  function poke() {
    setQuip(QUIPS[Math.floor(Math.random() * QUIPS.length)]);
    setBob(true);
    window.setTimeout(() => setBob(false), 600);
    window.setTimeout(() => setQuip(null), 2000);
  }

  return (
    <div className="relative">
      <button
        onClick={poke}
        aria-label="AL is here"
        className={`relative grid h-12 w-12 place-items-center overflow-hidden rounded-full border-2 border-primary/60 bg-white shadow-glow animate-al-pulse ${bob ? "animate-bounce" : ""}`}
      >
        <div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{ top: -8 }}
        >
          <Mascot size={72} outfit={outfit} float />
        </div>
      </button>
      {quip && (
        <div className="absolute right-0 top-full z-[10001] mt-2 w-48 animate-fade-in rounded-2xl border border-primary/20 bg-white px-3 py-2 text-xs font-semibold text-foreground shadow-glow">
          <span className="absolute -top-1.5 right-4 h-3 w-3 rotate-45 border-l border-t border-primary/20 bg-white" />
          {quip}
        </div>
      )}
    </div>
  );
}




