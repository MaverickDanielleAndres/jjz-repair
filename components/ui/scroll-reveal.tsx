"use client";

import { useLayoutEffect, useMemo, useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin once on the client. Safe because this
// module is only imported from "use client" components.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export type RevealVariant =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "fade"
  | "scaleIn"
  | "scaleUp"
  | "rotateIn"
  | "blurIn";

const VARIANT_PROPS: Record<
  RevealVariant,
  { from: gsap.TweenVars; to: gsap.TweenVars; initialStyle: CSSProperties }
> = {
  fadeUp: {
    from: { y: 60 },
    to: { y: 0 },
    initialStyle: { transform: "translateY(60px)" },
  },
  fadeDown: {
    from: { y: -60 },
    to: { y: 0 },
    initialStyle: { transform: "translateY(-60px)" },
  },
  fadeLeft: {
    from: { x: 80 },
    to: { x: 0 },
    initialStyle: { transform: "translateX(80px)" },
  },
  fadeRight: {
    from: { x: -80 },
    to: { x: 0 },
    initialStyle: { transform: "translateX(-80px)" },
  },
  fade: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    initialStyle: { opacity: 0 },
  },
  scaleIn: {
    from: { scale: 0.88 },
    to: { scale: 1 },
    initialStyle: { transform: "scale(0.88)" },
  },
  scaleUp: {
    from: { scale: 1.06 },
    to: { scale: 1 },
    initialStyle: { transform: "scale(1.06)" },
  },
  rotateIn: {
    from: { rotate: -3, y: 30 },
    to: { rotate: 0, y: 0 },
    initialStyle: { transform: "translateY(30px) rotate(-3deg)" },
  },
  blurIn: {
    from: { filter: "blur(8px)", y: 12 },
    to: { filter: "blur(0px)", y: 0 },
    initialStyle: { transform: "translateY(12px)", filter: "blur(8px)" },
  },
};

type ScrollRevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  /** Seconds to delay the animation after the trigger fires. */
  delay?: number;
  /** Animation duration in seconds (only used when `once` is true). */
  duration?: number;
  /**
   * Fraction of the element that must scroll through the viewport for the
   * animation to complete (0–1). Higher = later start. Default 0.2.
   */
  amount?: number;
  /**
   * If true, animates once when entering viewport and stays. Default false
   * — uses scroll-scrub so the animation tracks the scrollbar smoothly
   * (intro plays forward on scroll-in, outro plays backward on scroll-out).
   */
  once?: boolean;
  /**
   * Scrub smoothing in seconds (only used when `once` is false). Higher =
   * more lag between scroll and animation. Default 1.2 — gives that
   * "smooth, intentional" feel without feeling sluggish.
   */
  scrub?: number;
  className?: string;
};

/**
 * ScrollReveal — wrapper that animates an element in once when it scrolls
 * into view. Default behaviour is intro-only: plays the `from` → `to`
 * tween once on enter and stays at `to` (no scrub, no outro, no reverse).
 *
 * Set `once={false}` to fall back to the original scrub-based behaviour.
 */
export function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 1.4,
  amount = 0.2,
  once = true,
  scrub = 1.2,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Inline initial style mirrors the GSAP `from` state so the SSR HTML
  // matches the post-hydration start of the animation. Without this the
  // element is visible at first paint, then snaps to the `from` state
  // when GSAP runs, causing a visible jump.
  const initialStyle = useMemo(
    () => VARIANT_PROPS[variant].initialStyle,
    [variant],
  );

  useLayoutEffect(() => {
    if (!ref.current) return;
    if (prefersReducedMotion()) return;

    const el = ref.current;
    const v = VARIANT_PROPS[variant];

    // ScrollTrigger ranges. `start` triggers when the element's top reaches
    // (100 - amount*100)% from the viewport top — a small amount keeps the
    // animation from triggering too early. `end` triggers at the equivalent
    // bottom distance so the animation has space to settle.
    const startPct = Math.max(85, 100 - amount * 100 + 8);
    const endPct = Math.min(40, amount * 100 + 25);

    const scrollTrigger: ScrollTrigger.Vars = {
      trigger: el,
      start: `top ${startPct}%`,
      end: `bottom ${endPct}%`,
      // `scrub` ties progress to scroll position with a smoothing window
      // (seconds). 1.2s gives a deliberate, weighted feel without lagging.
      scrub: once ? false : scrub,
      // `lazy: true` defers ScrollTrigger setup until the trigger
      // element is within ~100vh of the viewport — for a page with 20+
      // ScrollTriggers this turns off 19 of them on initial paint and
      // avoids creating rAF callbacks for off-screen elements entirely.
      // Big win for first-paint time and idle scroll work.
      // Cast to `any` because the `lazy` field isn't in the bundled
      // ScrollTrigger type definitions but is documented and supported
      // at runtime.
      ...({ lazy: true } as Record<string, unknown>),
    };

    if (once) {
      // One-shot: play the tween once when entering, then stay put.
      scrollTrigger.toggleActions = "play none none none";
    }

    // Promote the element to its own composited layer for the duration of
    // the tween. `will-change: transform` opts the browser into GPU
    // compositing; we remove the hint when the animation finishes so the
    // compositor doesn't keep an idle layer around forever (which would
    // increase VRAM pressure on long pages).
    el.style.willChange = "transform, opacity";

    const tween = gsap.fromTo(
      el,
      { ...v.from },
      {
        ...v.to,
        duration: once ? duration : 1, // duration only matters for non-scrub tweens
        delay,
        ease: "power3.out",
        scrollTrigger,
        onComplete: () => {
          // Drop the will-change hint once the intro is done so the
          // browser can move this element back to a normal layer.
          el.style.willChange = "";
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      el.style.willChange = "";
    };
  }, [variant, delay, duration, amount, once, scrub]);

  return (
    <div ref={ref} className={className} style={initialStyle}>
      {children}
    </div>
  );
}

const STAGGER_ITEM_VARIANTS: Record<
  "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn",
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  fadeUp: {
    from: { y: 40 },
    to: { y: 0 },
  },
  fadeLeft: {
    from: { x: 50 },
    to: { x: 0 },
  },
  fadeRight: {
    from: { x: -50 },
    to: { x: 0 },
  },
  scaleIn: {
    from: { scale: 0.9 },
    to: { scale: 1 },
  },
};

/**
 * StaggerReveal — container that ties each child's reveal to scroll
 * progress. As the container scrolls through the viewport, its direct
 * children animate in sequence (staggered by `staggerDelay`). Scrolling
 * back reverses the stagger. No abrupt play/pause triggers.
 */
type StaggerContainerProps = {
  children: ReactNode;
  amount?: number;
  once?: boolean;
  className?: string;
  /** Stagger delay between each child (seconds). Default 0.1. */
  staggerDelay?: number;
  /** Extra delay before the stagger starts (seconds). */
  delay?: number;
  /** Scrub smoothing (seconds). Default 1.2. */
  scrub?: number;
};

export function StaggerReveal({
  children,
  amount = 0.15,
  once = true,
  className,
  staggerDelay = 0.1,
  delay = 0,
  scrub = 1.2,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    if (prefersReducedMotion()) return;

    const container = ref.current;
    const items = Array.from(container.children) as HTMLElement[];
    if (items.length === 0) return;

    const startPct = Math.max(85, 100 - amount * 100 + 8);
    const endPct = Math.min(35, amount * 100 + 30);

    const scrollTrigger: ScrollTrigger.Vars = {
      trigger: container,
      start: `top ${startPct}%`,
      end: `bottom ${endPct}%`,
      scrub: once ? false : scrub,
      // See ScrollReveal — defer setup until the container actually
      // approaches the viewport.
      ...({ lazy: true } as Record<string, unknown>),
    };

    if (once) {
      scrollTrigger.toggleActions = "play none none none";
    }

    // Promote children to their own compositor layers during the stagger.
    items.forEach((it) => (it.style.willChange = "transform, opacity"));

    // Stagger the children in. Transform-only (y) so the stagger never
    // leaves an element invisible if the tween is interrupted.
    const tween = gsap.fromTo(
      items,
      { y: 50 },
      {
        y: 0,
        x: 0,
        scale: 1,
        duration: 1,
        stagger: staggerDelay,
        delay,
        ease: "power3.out",
        scrollTrigger,
        onComplete: () => {
          items.forEach((it) => (it.style.willChange = ""));
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      items.forEach((it) => (it.style.willChange = ""));
    };
  }, [amount, once, staggerDelay, delay, scrub]);

  return (
    <div ref={ref} className={className} style={{ overflow: "visible" }}>
      {children}
    </div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  variant?: keyof typeof STAGGER_ITEM_VARIANTS;
  className?: string;
};

/**
 * StaggerItem — passthrough wrapper. The actual animation is driven by
 * the parent `StaggerReveal` (which targets its direct children), so this
 * exists mostly to give each item a sensible per-item `variant` hint via
 * a data attribute (useful for debugging).
 *
 * Note: when a variant is supplied, the item is targeted with a slightly
 * different transform range so the children's motion feels varied rather
 * than uniform.
 */
export function StaggerItem({
  children,
  variant = "fadeUp",
  className,
}: StaggerItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    // Apply a static transform hint so per-item variants still feel different
    // even when the parent StaggerReveal animates them all with one tween.
    if (variant === "fadeLeft") {
      ref.current.style.transform = "translateX(20px)";
    } else if (variant === "fadeRight") {
      ref.current.style.transform = "translateX(-20px)";
    } else if (variant === "scaleIn") {
      ref.current.style.transform = "scale(0.94)";
    }
  }, [variant]);

  return (
    <div ref={ref} className={className} data-stagger-variant={variant}>
      {children}
    </div>
  );
}