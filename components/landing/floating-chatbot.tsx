"use client";

import { useEffect, useRef, useState } from "react";
import {
  Loader2,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "./brand-icons";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  MESSENGER_URL,
  TIKTOK_URL,
} from "./site-data";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
};

const SUGGESTIONS = [
  "How much for an iPhone screen replacement?",
  "Do you unlock iCloud / FRP?",
  "Where are you located?",
  "What makes JJZ TECH the best?",
  "Do you repair laptops too?",
];

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm the JJZ Assistant — ask me anything about JJZ TECH: services, repairs, hours, location, board-level work, pricing (always with a free check-up), or what makes us different. I'll answer in seconds.",
};

export function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idCounterRef = useRef(0);

  // Lock body scroll when open on mobile
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    idCounterRef.current += 1;
    const n = idCounterRef.current;
    const userMsg: ChatMessage = {
      id: `u-${n}`,
      role: "user",
      content: trimmed,
    };
    const pendingMsg: ChatMessage = {
      id: `a-${n}`,
      role: "assistant",
      content: "",
      pending: true,
    };

    setMessages((m) => [...m, userMsg, pendingMsg]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = (await res.json()) as { reply: string };
      setMessages((m) =>
        m.map((msg) =>
          msg.id === pendingMsg.id
            ? { ...msg, content: data.reply, pending: false }
            : msg,
        ),
      );
    } catch {
      setMessages((m) =>
        m.map((msg) =>
          msg.id === pendingMsg.id
            ? {
                ...msg,
                content:
                  "Something went wrong. Please try again, or message us on Messenger.",
                pending: false,
              }
            : msg,
        ),
      );
    } finally {
      setSending(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close JJZ Assistant" : "Open JJZ Assistant"}
        className="fixed bottom-6 right-6 z-50 group"
        suppressHydrationWarning
      >
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-amber-500/40 animate-ping"
            style={{ animationDuration: "2.4s" }}
          />
        )}
        <span
          className={
            "relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg transition-transform group-hover:scale-105 " +
            (open
              ? "bg-zinc-900 text-white"
              : "bg-gradient-to-br from-amber-400 to-amber-600 text-zinc-950 shadow-amber-500/30")
          }
        >
          {open ? (
            <X className="w-6 h-6" strokeWidth={2.2} />
          ) : (
            <MessageCircle className="w-6 h-6" strokeWidth={2.2} />
          )}
        </span>
      </button>

      {/* Backdrop — invisible but catches outside clicks.
           Renders a transparent overlay above page content (z-40) and below
           the panel (z-50). Clicking it closes the chat. */}
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-0"
        />
      )}

      {/* Chat panel — floating card on every breakpoint (mobile, tablet, desktop).
           On mobile/tablet: 16px margin from edges, capped at 70vh so it never
           covers the whole screen. On desktop: 380×560 floating panel. */}
      {open && (
        <div
          role="dialog"
          aria-label="JJZ Assistant chat"
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-20 right-4 left-4 z-50 h-[min(70vh,600px)] rounded-2xl bg-white border border-zinc-200 shadow-2xl flex flex-col overflow-hidden md:left-auto md:w-[380px] md:bottom-24 md:right-6 md:h-[560px] md:max-h-[calc(100vh-7rem)] animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white">
            <div className="relative w-9 h-9 rounded-full bg-amber-500 grid place-items-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="JJZ TECH"
                width={36}
                height={36}
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">JJZ Assistant</p>
              <p className="text-[11px] text-amber-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online · replies in seconds
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="md:hidden p-1.5 rounded-lg text-white/80 hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto chat-scroll px-4 py-4 space-y-3 bg-zinc-50"
          >
            {messages.map((m) => (
              <Bubble key={m.id} message={m} />
            ))}
            {messages.length <= 1 && !sending && (
              <div className="pt-2">
                <p className="text-[11px] uppercase tracking-wider text-zinc-500 mb-2">
                  Try asking
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="text-xs px-2.5 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={onSubmit}
            className="flex items-end gap-2 border-t border-zinc-200 bg-white px-3 py-2.5"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit(e);
                }
              }}
              placeholder="Type a message…"
              rows={1}
              className="flex-1 resize-none rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 max-h-24"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send message"
              className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 shadow-sm hover:shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>

          {/* Socials footer */}
          <div className="border-t border-zinc-200 bg-white px-3 py-2.5 flex items-center gap-2 overflow-x-auto">
            <a
              href={MESSENGER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-500 text-zinc-950 text-xs font-semibold hover:bg-amber-400"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Talk to shop
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="shrink-0 p-1.5 rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="shrink-0 p-1.5 rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="shrink-0 p-1.5 rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div
      className={
        "flex " + (isUser ? "justify-end" : "justify-start")
      }
    >
      <div
        className={
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed " +
          (isUser
            ? "bg-amber-500 text-zinc-950 rounded-br-sm"
            : "bg-white text-zinc-800 border border-zinc-200 rounded-bl-sm")
        }
      >
        {message.pending ? (
          <span className="inline-flex items-center gap-1.5 text-zinc-500">
            <Dot delay={0} />
            <Dot delay={150} />
            <Dot delay={300} />
          </span>
        ) : (
          <span className="whitespace-pre-wrap">{message.content}</span>
        )}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

export default FloatingChatbot;
