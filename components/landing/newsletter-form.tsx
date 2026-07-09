"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <p className="text-sm text-amber-300 bg-white/5 border border-amber-300/30 rounded-full px-5 py-3">
        Thanks — we&apos;ll keep in touch.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-2"
      aria-label="Newsletter signup"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
        className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 font-semibold hover:from-amber-300 hover:to-amber-500 transition-colors"
      >
        <Send className="w-4 h-4" />
        Subscribe
      </button>
    </form>
  );
}

export default NewsletterForm;
