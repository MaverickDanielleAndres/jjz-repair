"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Global performance tuning. These two flags are the single most
  // impactful things you can set for GSAP on a heavy page:
  //
  //   1. `force3D: true` — every transform gets translateZ(0) so the
  //      browser keeps it on the GPU compositor and never falls back to
  //      a software path. Crucial for the Hero/intro tweens.
  //   2. `gsap.ticker.lagSmoothing(500, 33)` — when the tab is
  //      backgrounded or the main thread stalls (long tasks, GC, etc.),
  //      GSAP's internal clock will jump forward up to 500ms but try to
  //      stay within ~33ms (about 2 frames) of real time. Without this,
  //      a single janky frame causes the whole intro timeline to drift
  //      out of sync with the wall clock.
  gsap.defaults({ force3D: true });
  gsap.ticker.lagSmoothing(500, 33);

  // Default ScrollTrigger config — keeps every trigger batched under a
  // single scroll listener instead of one listener per element. Also
  // turns off markers in production so the page doesn't have any debug
  // overlay costs.
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

/**
 * Detect whether the user has `prefers-reduced-motion` enabled. We skip the
 * non-essential intro/outro animations when set so we don't trigger motion
 * sickness.
 */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type ScrollOutroSpec = {
  selector: Element | null;
  to: gsap.TweenVars;
};

/**
 * Wires a scroll-tied outro animation to a list of elements inside `rootEl`.
 *
 * Each element is set to animate from its current state → `to` state as the
 * user scrolls `rootEl` past the viewport. Uses GSAP's `scrub: 1.2` so
 * the animation tracks the scrollbar smoothly — scroll back up to reverse
 * the outro, scroll past to complete it. No abrupt toggles.
 *
 * Trigger range is intentionally tight (only the section's top region),
 * so the outro only plays once the user has scrolled into and past the
 * section — not while they're reading it.
 */
export const ScrollOutro = {
  watch(rootEl: Element | null, items: ScrollOutroSpec[]) {
    if (!rootEl || typeof window === "undefined") return;
    if (prefersReducedMotion()) return;

    const targets = items
      .map(({ selector, to }) =>
        selector
          ? { el: selector as gsap.DOMTarget, to: to as gsap.TweenVars }
          : null,
      )
      .filter((x): x is { el: gsap.DOMTarget; to: gsap.TweenVars } => x !== null);
    if (targets.length === 0) return;

    const cleanups: Array<() => void> = [];

    targets.forEach(({ el, to }) => {
      const tween = gsap.to(el, {
        ...to,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootEl,
          // Start when the section's top is at the top of the viewport
          // (the section is leaving view upward). End when the section's
          // top is at -50% (fully scrolled past).
          start: "top top",
          end: "top -50%",
          scrub: 1.2,
        },
      });
      cleanups.push(() => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    });

    return () => cleanups.forEach((fn) => fn());
  },
};

/**
 * Run a callback when the user scrolls back to the top of the page. Used to
 * re-trigger the hero intro animation when the user returns from another
 * section back to home.
 */
export const onReturnToTop = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (lastY > 240 && y < 60) callback();
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
};