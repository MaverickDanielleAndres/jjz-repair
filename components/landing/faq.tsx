"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionContainer, SectionHeader } from "./section-header";

const faqs = [
  {
    q: "How long does a typical screen replacement take?",
    a: "Most cellphone screen replacements are done within 1–2 hours. Laptop screens usually take 1–3 hours depending on the model and stock availability. We'll give you an exact ETA when you bring the device in.",
  },
  {
    q: "Do I need an appointment?",
    a: "Walk-ins are welcome. For complex board-level work or if you have a specific time, message us on Messenger to schedule a drop-off — we'll confirm within minutes.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash, GCash, Maya, and bank transfer. We also offer GCash Cash-In / Cash-Out in-store if you need to top up before paying.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes — selected parts and labor carry a service warranty. The exact terms depend on the repair (typically 30 days for parts, varies for labor). Ask for details per repair.",
  },
  {
    q: "Can you unlock iCloud / Google FRP / MI account?",
    a: "Yes. We handle clean removals for iCloud activation lock, Google FRP, MI account, and most other OEM-locked accounts. Bring proof of ownership when possible.",
  },
  {
    q: "My phone got wet. What should I do before bringing it in?",
    a: "Don't charge it. Don't press any buttons. Bring it in as soon as you can — every hour matters for water damage. We'll do a board-level cleaning and recovery.",
  },
  {
    q: "Do you do remote services?",
    a: "Yes. We offer remote unlock, remote FRP, remote tool setup, and remote support. Message us on Messenger with your device details and we'll let you know if it's eligible.",
  },
  {
    q: "What if you can't fix it?",
    a: "Free check-up, no obligation. If we can't fix it, you don't pay for the repair. We may still charge a small diagnostic fee for very deep board-level investigations — we'll always tell you up front.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="bg-stone-50 border-t border-stone-200 py-12 md:py-16 jjz-defer"
    >
      <SectionContainer>
        <SectionHeader
          eyebrow="FAQ's"
          title={<>Looking for answer?</>}
          lede="Quick answers to the things customers ask most — from pricing
          and turnaround to warranty and what to do if your phone gets wet."
        />

        {/*
          Plain centered container — no ScrollReveal wrapper, no
          transforms. `mx-auto w-full max-w-2xl` centers the
          accordion inside the SectionContainer's wider max-w-6xl,
          and `space-y-2` gives an even 8px gap between rows. Left and
          right margins always line up regardless of viewport.
        */}
        <div className="mt-8 mx-auto w-full max-w-2xl space-y-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="w-full rounded-xl border border-zinc-200 bg-white overflow-hidden hover:border-amber-300 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-3 text-left px-4 py-3 text-sm md:text-base"
                  // Browser extensions (LastPass, 1Password, etc.)
                  // inject `fdprocessedid` onto interactive elements
                  // at runtime, which causes React to log a hydration
                  // mismatch warning. See HydrationSafeButtons.
                  suppressHydrationWarning
                >
                  <span className="font-medium text-zinc-900 flex-1">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={
                      "w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-300 " +
                      (isOpen ? "rotate-180 text-amber-700" : "")
                    }
                  />
                </button>
                <div
                  className={
                    "grid transition-all duration-300 ease-out " +
                    (isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0")
                  }
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-sm text-zinc-600 leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}

export default FAQ;
