"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

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
 * ImageComparison — a draggable before/after slider.
 *
 * Renders two stacked layers. The top layer is clipped by a vertical line
 * controlled by the slider; dragging the handle (or anywhere on the slider)
 * reveals more or less of the underlying layer.
 *
 * Pass either `beforeImage` + `afterImage` URLs or `beforeSlot` + `afterSlot`
 * ReactNode content for richer (e.g. placeholder) renderings.
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
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newPosition = ((clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, newPosition)));
    },
    [isDragging],
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full select-none rounded-2xl overflow-hidden shadow-2xl bg-zinc-900",
        ASPECT_CLASS[aspect],
        className,
      )}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseLeave={handleMouseUp}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
    >
      {/* Before (bottom) layer — always visible, behind the clipped layer */}
      <div className="absolute inset-0">
        {beforeSlot ?? (
          <img
            src={beforeImage}
            alt={altBefore}
            className="h-full w-full object-cover object-left"
            draggable={false}
          />
        )}
      </div>

      {/* After (top) layer — clipped by the slider position.
          Rendered AFTER the before layer so it stacks on top in the DOM
          (required when both layers use absolutely-positioned content like
          next/image fill). The clipPath reveals the before layer underneath. */}
      <div
        className="absolute inset-0 overflow-hidden z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        {afterSlot ?? (
          <img
            src={afterImage}
            alt={altAfter}
            className="h-full w-full object-cover object-left"
            draggable={false}
          />
        )}
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1.5 bg-white/80 cursor-ew-resize flex items-center justify-center z-20"
        style={{ left: `calc(${sliderPosition}% - 0.375rem)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={cn(
            "bg-white rounded-full h-12 w-12 flex items-center justify-center shadow-md transition-all duration-200 ease-in-out",
            isDragging ? "scale-110 shadow-xl" : "",
          )}
        >
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