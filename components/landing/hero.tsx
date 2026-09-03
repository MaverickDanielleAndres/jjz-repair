"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
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
  { value: "20+", label: "Years of experience" },
  { value: "3,000+", label: "Devices repaired" },
  { value: "16/7", label: "Messenger support" },
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
  preload,
}: {
  src: string;
  alt: string;
  preload?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 1024px) 100vw, 50vw"
      className="object-cover object-left"
      draggable={false}
      preload={preload}
      fetchPriority={preload ? "high" : undefined}
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

  useLayoutEffect(() => {
    // Promote the animated layers to their own composited layers so the
    // intro tweens never trigger layout or paint of the rest of the
    // page. `will-change` is set before the timeline starts and cleared
    // once it finishes so the browser can collapse the layers back.
    const animated = [
      leftColRef.current,
      badgeRef.current,
      descriptionRef.current,
      comparisonRef.current,
      statsRef.current,
      bottomCardsRef.current,
    ].filter((el): el is NonNullable<typeof el> => !!el);
    animated.forEach((el) => (el.style.willChange = "transform, opacity"));
    headlineRef.current?.querySelectorAll("span").forEach((s) => {
      (s as HTMLElement).style.willChange = "transform, opacity";
    });
    ctasRef.current?.querySelectorAll("a").forEach((a) => {
      (a as HTMLElement).style.willChange = "transform, opacity";
    });
    trustChipsRef.current?.querySelectorAll("li").forEach((l) => {
      (l as HTMLElement).style.willChange = "transform, opacity";
    });
    bottomCardsRef.current
      ?.querySelectorAll(":scope > *")
      .forEach((c) => ((c as HTMLElement).style.willChange = "transform, opacity"));

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
      const tl = gsap.timeline({
        defaults: { ease },
        onComplete: () => {
          // Drop the compositor hint once the intro lands — keeping
          // `will-change` on forever would inflate VRAM and slow down
          // unrelated paints later in the session.
          animated.forEach((el) => (el.style.willChange = ""));
          headlineRef.current?.querySelectorAll("span").forEach((s) => {
            (s as HTMLElement).style.willChange = "";
          });
          ctasRef.current?.querySelectorAll("a").forEach((a) => {
            (a as HTMLElement).style.willChange = "";
          });
          trustChipsRef.current?.querySelectorAll("li").forEach((l) => {
            (l as HTMLElement).style.willChange = "";
          });
          bottomCardsRef.current
            ?.querySelectorAll(":scope > *")
            .forEach((c) => ((c as HTMLElement).style.willChange = ""));
        },
      });

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

    return () => {
      ctx.revert();
      animated.forEach((el) => (el.style.willChange = ""));
    };
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

      {/* Tighter container + more horizontal padding — desktop gets
          ~10% breathing room, the rest scales down to a max-w-6xl so
          the hero never feels "stretched" against the viewport edges.
          Generous top padding keeps the hero content clear of the
          fixed-top nav bar (which sits ~58px from the viewport edge). */}
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left column — copy + CTAs + trust chips.
              The inline `transform: translateX(-80px)` mirrors the GSAP
              `from` state so the column is already off-screen on first
              paint; useLayoutEffect then animates it in. */}
          <div
            ref={leftColRef}
            className="text-center lg:text-left"
            style={{ transform: "translateX(-80px)" }}
          >
            {/* JJZ brand badge */}
            <div
              ref={badgeRef}
              className="flex justify-center lg:justify-start"
              style={{ transform: "translateY(14px)" }}
            >
              <div className="inline-flex whitespace-nowrap items-center gap-1.5 px-3 py-1 rounded-full border border-amber-200 bg-white/80 text-amber-700 text-[10px] uppercase tracking-[0.2em] font-semibold backdrop-blur-sm">
                <Award className="w-3 h-3 shrink-0" /> Trusted Repair Experts
              </div>
            </div>

            {/* Headline — down-sized one step across the board so it
                reads as "compact, professional" instead of "stretched".
                The H1 still carries the primary keyword + city +
                service category — that's the single most important
                on-page ranking signal — but at a more controlled size. */}
            <h1
              ref={headlineRef}
              className="mt-3 font-display text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.25rem] font-bold leading-[1.15] tracking-tight text-zinc-900"
            >
              <span className="block">{BRAND_NAME} — Desktop/Laptop</span>
              <span className="block text-brand-gradient">
                &amp; Cellphone Repair Services
              </span>
              <span className="block text-zinc-700 text-base sm:text-lg md:text-xl mt-0.5">
                in Binangonan, Rizal
              </span>
            </h1>

            <p
              ref={descriptionRef}
              className="mt-3 max-w-lg mx-auto lg:mx-0 text-center lg:text-left text-zinc-600 text-xs md:text-sm leading-relaxed"
              style={{ transform: "translateY(12px)" }}
            >
              JJZ-repair: same-day diagnostics on phone, laptop and computer
              repairs — walk-ins welcome, free check-up on every device, OEM
              parts, board-level specialists.
            </p>

            {/* CTAs — slightly smaller padding for the more compact feel */}
            <div
              ref={ctasRef}
              className="mt-4 flex flex-col sm:flex-row gap-2 items-center lg:items-start lg:justify-start justify-center"
            >
              <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 font-bold shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Book a Repair
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-200 bg-white text-zinc-900 font-semibold hover:border-amber-300 hover:bg-amber-50 transition-colors shadow-sm text-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                {PHONE_DISPLAY}
              </a>
            </div>

            {/* Trust chips */}
            <ul
              ref={trustChipsRef}
              className="mt-3 flex flex-wrap items-center lg:items-start lg:justify-start justify-center gap-1.5"
            >
              {trustChips.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-zinc-200 bg-white text-zinc-700 text-[10px] md:text-xs"
                >
                  <Icon className="w-3 h-3 text-amber-500" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column — before/after image comparison slider.
              `transform: translateX(100px) scale(0.96)` mirrors the GSAP
              `from` state so the comparison card is already off to the
              right on first paint; useLayoutEffect animates it left.
              The max-w-md cap keeps the slider from getting too wide on
              large displays. */}
          <div
            ref={comparisonRef}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
            style={{ transform: "translateX(100px) scale(0.96)" }}
          >
            <ImageComparison
              aspect="video"
              beforeSlot={
                <ComparisonPhoto src="/after.jpg" alt="Phone after JJZ TECH repair" preload />
              }
              afterSlot={
                <ComparisonPhoto src="/before.jpg" alt="Cracked phone before repair" />
              }
            />
          </div>
        </div>
      </div>

      {/* Stats bar — narrower container + smaller stat sizes */}
      <div
        ref={statsRef}
        className="relative mx-auto max-w-4xl px-6 sm:px-8 pb-8 md:pb-10"
        style={{ transform: "translateY(18px)" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {stats.map((s) => (
            <SpotlightCard
              key={s.label}
              spotlightColor="rgba(245, 158, 11, 0.15)"
              className="!p-2.5 md:!p-3 text-center !rounded-xl border border-zinc-200 bg-white hover:shadow-lg hover:shadow-amber-500/10 hover:border-amber-200 transition-all hover:-translate-y-0.5"
            >
              <p className="font-display text-base md:text-lg font-bold text-brand-gradient">
                {s.value}
              </p>
              <p className="mt-0.5 text-[10px] md:text-xs text-zinc-500">
                {s.label}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Quick info strip — three SpotlightCard hovers.
          Tighter padding + smaller icons for the compact feel. */}
      <div className="relative bg-white border-t border-zinc-200">
        <div
          ref={bottomCardsRef}
          className="mx-auto max-w-5xl px-6 sm:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <SpotlightCard className="!p-4" spotlightColor="rgba(245, 158, 11, 0.18)">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                <Smartphone className="w-4 h-4" strokeWidth={1.8} />
              </span>
              <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-semibold">
                Cellphone
              </p>
            </div>
            <p className="text-zinc-700 text-xs leading-relaxed">
              Screen, battery, water damage, iCloud, FRP, hang on logo.
            </p>
          </SpotlightCard>
          <SpotlightCard className="!p-4" spotlightColor="rgba(245, 158, 11, 0.18)">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                <Laptop className="w-4 h-4" strokeWidth={1.8} />
              </span>
              <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-semibold">
                Laptop
              </p>
            </div>
            <p className="text-zinc-700 text-xs leading-relaxed">
              No-power, screen, keyboard, battery, overheating, OS install.
            </p>
          </SpotlightCard>
          <SpotlightCard className="!p-4" spotlightColor="rgba(245, 158, 11, 0.18)">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                <Monitor className="w-4 h-4" strokeWidth={1.8} />
              </span>
              <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-semibold">
                Computer
              </p>
            </div>
            <p className="text-zinc-700 text-xs leading-relaxed">
              Blue screen, virus removal, SSD upgrade, data recovery.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

export default Hero;