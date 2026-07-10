"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Award,
  BadgeDollarSign,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { Laptop, Monitor } from "lucide-react";
import {
  MESSENGER_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  BRAND_NAME,
} from "./site-data";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ImageComparison } from "@/components/ui/image-comparison-slider";

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

/**
 * Renders a real repair photo inside the ImageComparison slot. Uses
 * next/image with `fill` so the photo covers the slider layer exactly and
 * Next can optimize it.
 */
function ComparisonPhoto({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 1024px) 100vw, 50vw"
      className="object-cover object-left"
      draggable={false}
      priority
    />
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const trustChipsRef = useRef<HTMLUListElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bottomCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single master timeline that choreographs the whole hero intro.
      // Four direction-themed layers, each with its own scrub-free play:
      //   1. NAV bar     — slides down from above
      //   2. LEFT column — slides in from the left
      //   3. RIGHT column — slides in from the right
      //   4. STATS + BOTTOM cards — fade in
      // Tuned for smoothness: shorter transform distances, longer
      // durations, softer "expo.out" easing, and lots of overlap between
      // tweens so the whole sequence feels like one continuous flow rather
      // than discrete steps.
      const ease = "expo.out";
      const tl = gsap.timeline({ defaults: { ease } });

      // ─── NAV (slides down from above) ───
      // Pinned here as a reminder — the actual animation runs from
      // header.tsx so the header mounts before the hero.
      // (Kept at the same tempo so the two timelines feel like one.)

      // ─── LEFT COLUMN — slides in from the left ───
      // Outer container translates in; inner elements ease in slightly
      // behind it so they feel like one body of motion.
      tl.fromTo(
        leftColRef.current,
        { x: -80 },
        { x: 0, duration: 1.6, ease },
        0.1,
      )
        // Badge — gentle lift inside the left column.
        .fromTo(
          badgeRef.current,
          { y: 14 },
          { y: 0, duration: 1.0, ease },
          0.4,
        )
        // Headline lines — staggered, long duration so they settle softly.
        .fromTo(
          headlineRef.current?.querySelectorAll("span") ?? [],
          { y: 24 },
          { y: 0, duration: 1.1, stagger: 0.1, ease },
          0.55,
        )
        // Description.
        .fromTo(
          descriptionRef.current,
          { y: 12 },
          { y: 0, duration: 0.9, ease },
          0.85,
        )
        // CTAs — gentler distance, longer duration.
        .fromTo(
          ctasRef.current?.querySelectorAll("a") ?? [],
          { x: -16 },
          { x: 0, duration: 0.9, stagger: 0.08, ease },
          1.0,
        )
        // Trust chips.
        .fromTo(
          trustChipsRef.current?.querySelectorAll("li") ?? [],
          { y: 10 },
          { y: 0, duration: 0.7, stagger: 0.05, ease },
          1.15,
        );

      // ─── RIGHT COLUMN — slides in from the right ───
      // Plays in parallel with the left column with a small lead so the
      // comparison settles just after the copy finishes landing.
      tl.fromTo(
        comparisonRef.current,
        { x: 100, scale: 0.96 },
        { x: 0, scale: 1, duration: 1.6, ease },
        0.25,
      );

      // ─── STATS bar — fade in from below ───
      tl.fromTo(
        statsRef.current,
        { y: 18 },
        { y: 0, duration: 1.0, ease },
        1.4,
      );

      // ─── BOTTOM cards — fade in with stagger ───
      tl.fromTo(
        bottomCardsRef.current?.querySelectorAll(":scope > *") ?? [],
        { y: 24 },
        { y: 0, duration: 0.9, stagger: 0.08, ease },
        1.55,
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative bg-stone-50 overflow-hidden">
      {/* Subtle warm gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, rgba(245,158,11,0.10), transparent 70%), radial-gradient(40% 30% at 80% 100%, rgba(6,182,212,0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 md:pt-20 pb-10 md:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column — copy + CTAs + trust chips */}
          <div ref={leftColRef} className="text-center lg:text-left">
            {/* JJZ brand badge */}
            <div
              ref={badgeRef}
              className="flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber-200 bg-white/80 text-amber-700 text-[10px] uppercase tracking-[0.2em] font-semibold backdrop-blur-sm">
                <Award className="w-3 h-3" /> {BRAND_NAME} — Gadget Repair
                Services
              </div>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-zinc-900"
            >
              <span className="block">Expert Tech</span>
              <span className="block text-brand-gradient">Repair Services</span>
              <span className="block text-zinc-700 text-lg sm:text-xl md:text-2xl lg:text-3xl mt-1">
                Certified &amp; Affordable
              </span>
            </h1>

            <p
              ref={descriptionRef}
              className="mt-4 max-w-xl mx-auto lg:mx-0 text-center lg:text-left text-zinc-600 text-sm md:text-base leading-relaxed"
            >
              Cellphone • Laptop • Computer — same-day diagnostics, walk-ins
              welcome, free check-up on every device.
            </p>

            {/* CTAs */}
            <div
              ref={ctasRef}
              className="mt-5 flex flex-col sm:flex-row gap-2 items-center lg:items-start lg:justify-start justify-center"
            >
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
            <ul
              ref={trustChipsRef}
              className="mt-4 flex flex-wrap items-center lg:items-start lg:justify-start justify-center gap-1.5"
            >
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

          {/* Right column — before/after image comparison slider */}
          <div ref={comparisonRef} className="relative">
            <ImageComparison
              aspect="video"
              beforeSlot={
                <ComparisonPhoto src="/before.jpg" alt="Cracked phone before repair" />
              }
              afterSlot={
                <ComparisonPhoto src="/after.jpg" alt="Phone after JJZ TECH repair" />
              }
            />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div ref={statsRef} className="relative mx-auto max-w-5xl px-6 pb-10 md:pb-14">
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
        <div
          ref={bottomCardsRef}
          className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
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