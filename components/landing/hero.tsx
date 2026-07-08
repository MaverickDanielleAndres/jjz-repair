import Image from "next/image";
import {
  BadgeDollarSign,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {
  MESSENGER_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "./site-data";

const trustChips = [
  { icon: ShieldCheck, label: "100% Satisfaction" },
  { icon: Zap, label: "Fast Service" },
  { icon: BadgeDollarSign, label: "Affordable" },
  { icon: Sparkles, label: "Quality Parts" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative bg-white overflow-hidden pt-24 md:pt-28"
    >
      {/* Top radial shade — subtle warm glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(35%_60%_at_50%_0%,rgba(245,158,11,0.12),transparent_70%)]"
      />

      {/* Accent vertical lines (visible on lg+) */}
      <div
        aria-hidden
        className="absolute inset-0 mx-auto hidden max-w-6xl lg:block"
      >
        <div className="absolute inset-y-0 left-0 z-10 h-full w-px bg-linear-to-b from-transparent via-amber-300/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 h-full w-px bg-linear-to-b from-transparent via-amber-300/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pt-6 md:pt-10 pb-6 md:pb-8 text-center">
        {/* Eyebrow chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-xs uppercase tracking-[0.2em] font-semibold">
          <Wrench className="w-3.5 h-3.5" /> JJZ TECH — Gadget Repair Services
        </div>

        {/* Headline */}
        <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight text-zinc-900">
          Fast repair.
          <br />
          <span className="text-brand-gradient">Fair price.</span>
          <br />
          Right here in Binangonan.
        </h1>

        <p className="mt-5 text-zinc-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Cellphone • Laptop • Computer — same-day diagnostics, walk-ins
          welcome, free check-up on every device. Trusted by Binangonan since
          day one.
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-col sm:flex-row gap-3 items-center justify-center">
          <a
            href={MESSENGER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-amber-400 to-amber-600 text-zinc-950 font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-shadow"
          >
            <MessageCircle className="w-4 h-4" /> Message us
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 bg-white text-zinc-900 font-semibold hover:bg-zinc-50 hover:border-amber-300 transition-colors"
          >
            <Phone className="w-4 h-4" /> Call {PHONE_DISPLAY}
          </a>
        </div>

        {/* Trust chips */}
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {trustChips.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-700 text-xs md:text-sm"
            >
              <Icon className="w-3.5 h-3.5 text-amber-500" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* Hero showcase — scroll-driven 3D card */}
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-zinc-900">
              Quality you can <span className="text-amber-500">see</span>.
            </h2>
            <p className="mt-3 text-zinc-500 text-sm md:text-base max-w-xl mx-auto">
              Real repairs. Real devices. Same-day turnaround on most jobs.
            </p>
          </>
        }
      >
        <div className="relative h-full w-full">
          <Image
            src="/belowheader.png"
            alt="JJZ TECH service catalog — Cellphone, Laptop, Computer repair, Box/Dongle activation, Schematics, Chip-level repair"
            width={1280}
            height={1810}
            className="mx-auto h-full w-full rounded-2xl object-contain"
            priority
          />
        </div>
      </ContainerScroll>

      <p className="relative -mt-12 md:-mt-20 text-center text-xs text-zinc-500 pb-12 md:pb-16">
        Full service catalog — Cellphone · Laptop · Computer · Advanced
        Solutions
      </p>
    </section>
  );
}

export default Hero;
