"use client";

import {
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import "./image-comparison.css";

type ImageComparisonProps = {
  /** URL of the bottom-layer (revealed) image. */
  beforeImage?: string;
  /** URL of the top-layer (clipped) image. */
  afterImage?: string;
  /** Optional children render inside the "before" layer slot. */
  beforeSlot?: ReactNode;
  /** Optional children render inside the "after" layer slot. */
  afterSlot?: ReactNode;
  altBefore?: string;
  altAfter?: string;
  className?: string;
  /** Aspect ratio of the slider. Defaults to 4 / 3. */
  aspect?: "video" | "square" | "portrait" | "auto";
};

const ASPECT_CLASS: Record<NonNullable<ImageComparisonProps["aspect"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  auto: "",
};

/**
 * ImageComparison — draggable before/after slider.
 *
 * Performance notes:
 * - The original implementation called `setSliderPosition()` on every
 *   pointermove. Each call triggered a React re-render that rewrote the
 *   `clipPath: inset(...)` and `left: calc(...)` styles on two layers —
 *   and `clipPath` updates force the browser to re-rasterize both
 *   clipped image layers. With React 19 batching the re-renders were
 *   tolerable but the rasterization cost was not.
 * - We now write the slider position to a CSS variable on a ref'd element
 *   inside a single rAF. No React state updates, no re-renders, just one
 *   style write per frame. The clipPath + left values are derived in
 *   pure CSS from `--pos`, so the browser updates only the composited
 *   transform/clip layer.
 */
export function ImageComparison({
  beforeImage,
  afterImage,
  beforeSlot,
  afterSlot,
  altBefore = "Before",
  altAfter = "After",
  className,
  aspect = "video",
}: ImageComparisonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let raf = 0;
    let pendingX = 0;

    const updatePosition = () => {
      raf = 0;
      container.style.setProperty("--pos", `${pendingX}px`);
    };

    const onMove = (clientX: number) => {
      if (!isDraggingRef.current) return;
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      pendingX = x;
      if (!raf) raf = requestAnimationFrame(updatePosition);
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const onPointerMove = (e: PointerEvent) => onMove(e.clientX);

    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const startDrag = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    // Capture the pointer so drag continues even if the cursor leaves
    // the slider handle. The pointer events above listen on window so
    // we don't actually need `setPointerCapture` here, but it's a
    // useful safety net.
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  return (
    <div
      ref={containerRef}
      // Default the CSS variable so SSR + first paint already have the
      // correct value (slider centered). Without this, the first frame
      // before hydration would briefly show clipPath: inset(0 100% 0 0)
      // or similar until the inline style propagates.
      style={{ "--pos": "50%" } as React.CSSProperties}
      className={cn(
        "jjz-img-cmp relative w-full select-none rounded-2xl overflow-hidden shadow-2xl bg-zinc-900",
        ASPECT_CLASS[aspect],
        className,
      )}
      onPointerDown={(e) => {
        isDraggingRef.current = true;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        e.currentTarget.style.setProperty("--pos", `${x}px`);
      }}
    >
      {/* Before (bottom) layer — always visible, behind the clipped layer */}
      <div className="absolute inset-0">
        {beforeSlot ?? (
          <img
            src={beforeImage}
            alt={altBefore}
            // Native lazy / async decode — the hero shows two of these
            // images at full quality; let the browser hint when to
            // decode them.
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-left"
            draggable={false}
          />
        )}
      </div>

      {/* After (top) layer — clipped by the slider position. The
          clipPath is now driven by a CSS variable so we can update it
          without re-rendering React. */}
      <div
        className="jjz-img-cmp__after absolute inset-0 overflow-hidden z-10"
      >
        {afterSlot ?? (
          <img
            src={afterImage}
            alt={altAfter}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-left"
            draggable={false}
          />
        )}
      </div>

      {/* Slider handle — also driven by --pos */}
      <div
        className="jjz-img-cmp__handle absolute top-0 bottom-0 w-1.5 bg-white/80 cursor-ew-resize flex items-center justify-center z-20"
        onPointerDown={startDrag}
      >
        <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center shadow-md transition-transform duration-200 ease-in-out active:scale-110 active:shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700"
          >
            <line x1="15" y1="18" x2="9" y2="12" />
            <line x1="9" y1="6" x2="15" y2="12" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ImageComparison;