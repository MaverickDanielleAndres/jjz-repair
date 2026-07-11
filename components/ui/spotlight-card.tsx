"use client";

import { useEffect, useRef } from "react";
import "./spotlight-card.css";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
};

const SCHEDULED = new WeakMap<Element, number>();

/**
 * SpotlightCard — hover-driven radial glow that follows the cursor.
 *
 * Performance notes:
 * - The original implementation called `getBoundingClientRect()` on every
 *   single `mousemove` event. That forces a synchronous layout read on
 *   the main thread, which on a page with ~24 instances meant constant
 *   layout thrash whenever the user moved the cursor.
 * - We now (a) cache the rect on `mouseenter` + invalidate on `scrollend`
 *   / `resize` (recomputed only when geometry actually changes), and (b)
 *   write the CSS variables inside a single rAF so multiple mousemove
 *   events per frame collapse into one paint.
 */
export const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(245, 158, 11, 0.18)",
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const pendingPointRef = useRef<{ x: number; y: number } | null>(null);

  // Helper — schedules a single rAF per element. Multiple events in the
  // same frame collapse into one style write.
  const schedule = (el: HTMLElement, x: number, y: number, color: string) => {
    pendingPointRef.current = { x, y };
    if (SCHEDULED.has(el)) return;
    const id = requestAnimationFrame(() => {
      SCHEDULED.delete(el);
      const pt = pendingPointRef.current;
      if (!pt) return;
      el.style.setProperty("--mouse-x", `${pt.x}px`);
      el.style.setProperty("--mouse-y", `${pt.y}px`);
      el.style.setProperty("--spotlight-color", color);
    });
    SCHEDULED.set(el, id);
  };

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    const refreshRect = () => {
      rectRef.current = el.getBoundingClientRect();
    };

    // Initial cache. Reading the rect here is fine — it's a one-shot
    // after mount, not on every move.
    refreshRect();

    // Invalidate the cached rect whenever geometry might have changed.
    // `scrollend` covers all scrollable ancestors (most common case);
    // `resize` covers viewport changes; both are passive and cheap.
    window.addEventListener("scrollend", refreshRect, { passive: true });
    window.addEventListener("resize", refreshRect, { passive: true });

    return () => {
      window.removeEventListener("scrollend", refreshRect);
      window.removeEventListener("resize", refreshRect);
      const id = SCHEDULED.get(el);
      if (id !== undefined) {
        cancelAnimationFrame(id);
        SCHEDULED.delete(el);
      }
    };
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    let rect = rectRef.current;
    if (!rect) {
      rect = e.currentTarget.getBoundingClientRect();
      rectRef.current = rect;
    }
    schedule(
      e.currentTarget,
      e.clientX - rect.left,
      e.clientY - rect.top,
      spotlightColor,
    );
  };

  return (
    <div
      ref={divRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      className={`jjz-card-spotlight ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;