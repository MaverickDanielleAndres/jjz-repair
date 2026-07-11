"use client";

import { forwardRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import "./pixel-card.css";

type PixelCardProps = {
  variant?: "default" | "amber" | "yellow" | "pink";
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
};

/**
 * Lightweight CSS-only "pixel" card.
 *
 * Historically this component ran a `<canvas>` with a requestAnimationFrame
 * loop that redrew ~2,500 fillRect calls per card, per frame. With up to
 * ~25 services rendered at once in the grid, that path was the single
 * largest source of jank on the page.
 *
 * The visual effect (an amber radial bloom on hover/focus) is now achieved
 * with a CSS `::before` pseudo-element + transitions — zero JS, GPU-only
 * paint. The component still accepts the same `variant` prop so callers
 * don't change. `gap`, `speed`, `colors`, `noFocus` are kept for API
 * compatibility but are no-ops.
 */
export const PixelCard = forwardRef<HTMLDivElement, PixelCardProps>(
  function PixelCard(
    { className = "", style, children, variant = "default" },
    ref,
  ) {
    const variantClass =
      variant === "amber" || variant === "yellow" || variant === "pink"
        ? "jjz-pixel-card--accent"
        : "";

    // The canvas element is intentionally removed; the bloom effect is
    // pure CSS. We keep the layout slot 100% so child positioning is
    // unaffected.
    return (
      <div
        ref={ref}
        className={cn("jjz-pixel-card", variantClass, className)}
        style={style as CSSProperties}
      >
        {children}
      </div>
    );
  },
);

export default PixelCard;