"use client";

import Image from "next/image";
import {
  ArrowRight,
  Award,
  BadgeDollarSign,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  MESSENGER_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  BRAND_NAME,
} from "./site-data";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Laptop, Monitor, Smartphone } from "lucide-react";

const trustChips = [
  { icon: ShieldCheck, label: "100% Satisfaction" },
  { icon: Zap, label: "Fast Service" },
  { icon: BadgeDollarSign, label: "Affordable" },
  { icon: Sparkles, label: "Quality Parts" },
];

const stats = [
  { value: "5+", label: "Years of experience" },
  { value: "3,000+", label: "Devices repaired" },
  { value: "24/7", label: "Messenger support" },
  { value: "98%", label: "Customer satisfaction" },
];

export function Hero() {
  return (
    <section id="home" className="relative bg-stone-50 overflow-hidden">
      {/* Subtle warm gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, rgba(245,158,11,0.10), transparent 70%), radial-gradient(40% 30% at 80% 100%, rgba(6,182,212,0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 pt-20 md:pt-24 pb-4 md:pb-6">
        {/* JJZ brand badge — smaller, centered */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber-200 bg-white/80 text-amber-700 text-[10px] uppercase tracking-[0.2em] font-semibold backdrop-blur-sm">
            <Award className="w-3 h-3" /> {BRAND_NAME} — Gadget Repair
            Services
          </div>
        </div>

        {/* Compact headline */}
        <h1 className="mt-4 text-center font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-zinc-900">
          <span className="block">Expert Tech</span>
          <span className="block text-brand-gradient">Repair Services</span>
          <span className="block text-zinc-700 text-lg sm:text-xl md:text-2xl lg:text-3xl mt-1">
            Certified &amp; Affordable
          </span>
        </h1>

        <p className="mt-4 max-w-xl mx-auto text-center text-zinc-600 text-xs md:text-sm leading-relaxed">
          Cellphone • Laptop • Computer — same-day diagnostics, walk-ins
          welcome, free check-up on every device.
        </p>

        {/* CTAs */}
        <div className="mt-5 flex flex-col sm:flex-row gap-2 items-center justify-center">
          <a
            href={MESSENGER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 font-bold shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all text-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Book a Repair
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-zinc-200 bg-white text-zinc-900 font-semibold hover:border-amber-300 hover:bg-amber-50 transition-colors shadow-sm text-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            {PHONE_DISPLAY}
          </a>
        </div>

        {/* Trust chips */}
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
          {trustChips.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-zinc-200 bg-white text-zinc-700 text-[10px] md:text-xs"
            >
              <Icon className="w-3 h-3 text-amber-500" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* Single belowheader.png with scroll-driven 3D effect.
          Card is portrait (7:10) matching the image so it fills cleanly. */}
      <ContainerScroll titleComponent={null}>
        <Image
          src="/belowheader.png"
          alt="JJZ TECH service catalog — Cellphone, Laptop, Computer repair, Box/Dongle activation, Schematics, Chip-level repair"
          width={1280}
          height={1810}
          className="h-full w-full rounded-xl object-cover"
          sizes="(max-width: 768px) 90vw, 448px"
          priority
        />
      </ContainerScroll>

      {/* Stats bar */}
      <div className="relative mx-auto max-w-4xl px-6 pb-10 md:pb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-zinc-200 bg-white p-3 md:p-4 text-center"
            >
              <p className="font-display text-xl md:text-2xl font-bold text-brand-gradient">
                {s.value}
              </p>
              <p className="mt-0.5 text-[11px] md:text-xs text-zinc-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick info strip — three SpotlightCard hovers */}
      <div className="relative bg-white border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <SpotlightCard className="!p-5" spotlightColor="rgba(245, 158, 11, 0.18)">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Smartphone className="w-4 h-4" strokeWidth={1.8} />
              </span>
              <p className="text-[11px] uppercase tracking-[0.25em] text-amber-600 font-semibold">
                Cellphone
              </p>
            </div>
            <p className="text-zinc-700 text-sm leading-relaxed">
              Screen, battery, water damage, iCloud, FRP, hang on logo.
            </p>
          </SpotlightCard>
          <SpotlightCard className="!p-5" spotlightColor="rgba(245, 158, 11, 0.18)">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Laptop className="w-4 h-4" strokeWidth={1.8} />
              </span>
              <p className="text-[11px] uppercase tracking-[0.25em] text-amber-600 font-semibold">
                Laptop
              </p>
            </div>
            <p className="text-zinc-700 text-sm leading-relaxed">
              No-power, screen, keyboard, battery, overheating, OS install.
            </p>
          </SpotlightCard>
          <SpotlightCard className="!p-5" spotlightColor="rgba(245, 158, 11, 0.18)">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Monitor className="w-4 h-4" strokeWidth={1.8} />
              </span>
              <p className="text-[11px] uppercase tracking-[0.25em] text-amber-600 font-semibold">
                Computer
              </p>
            </div>
            <p className="text-zinc-700 text-sm leading-relaxed">
              Blue screen, virus removal, SSD upgrade, data recovery.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

export default Hero;
