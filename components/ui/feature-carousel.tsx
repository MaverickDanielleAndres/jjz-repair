"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CarouselFeature = {
  id: string;
  label: string;
  icon: LucideIcon;
  image?: string;
  description: string;
  tint?: string;
};

type FeatureCarouselProps = {
  features: CarouselFeature[];
  autoPlayInterval?: number;
  accent?: string;
  accentBg?: string;
};

const AUTO_PLAY_DEFAULT = 4000;
const CHIP_HEIGHT = 56;
const CHIP_GAP = 14; // vertical breathing room between chips
const VISIBLE_BUFFER = 2; // chips visible above and below the active one

/**
 * Wraps `v` into the [min, max) range so any integer offset of the
 * track index can be displayed as a relative position from the active chip.
 */
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel({
  features,
  autoPlayInterval = AUTO_PLAY_DEFAULT,
  accent = "#f59e0b",
  accentBg = "#1a1d24",
}: FeatureCarouselProps) {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const total = features.length;
  const currentIndex = ((step % total) + total) % total;

  const nextStep = useCallback(() => {
    setStep((s) => s + 1);
  }, []);

  const prevStep = useCallback(() => {
    setStep((s) => s - 1);
  }, []);

  const handleChipClick = (index: number) => {
    const forward = (index - currentIndex + total) % total;
    const backward = (currentIndex - index + total) % total;
    // Move the shortest distance (handles wrap-around in both directions).
    if (forward <= backward) setStep((s) => s + forward);
    else setStep((s) => s - backward);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(nextStep, autoPlayInterval);
    return () => clearInterval(t);
  }, [nextStep, paused, autoPlayInterval]);

  // Sync scroll position when `currentIndex` changes via auto-play or arrows
  useEffect(() => {
    // Desktop vertical sync
    if (scrollRef.current) {
      const target = scrollRef.current;
      const targetScroll = currentIndex * 70;
      if (Math.abs(target.scrollTop - targetScroll) > 10) {
        target.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }

    // Mobile horizontal sync
    if (mobileScrollRef.current) {
      const target = mobileScrollRef.current;
      const chip = target.children[currentIndex] as HTMLElement;
      if (chip) {
        const scrollLeft = chip.offsetLeft - target.clientWidth / 2 + chip.clientWidth / 2;
        target.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [currentIndex]);

  /**
   * Visual state for the image card on the right. Only the active card is
   * fully visible; the previous and next cards peek in faintly with a small
   * offset to suggest motion direction.
   */
  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = total;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  // Total height of the chip column: chips + gaps.
  const trackHeight =
    (VISIBLE_BUFFER * 2 + 1) * CHIP_HEIGHT + VISIBLE_BUFFER * 2 * CHIP_GAP;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl md:rounded-[2rem] flex flex-col-reverse lg:flex-row min-h-[420px] lg:min-h-[460px] border border-zinc-200 bg-white">
        {/* Left: vertical chip column with a darkened storefront photo
              sitting behind the chips so the panel feels grounded in the
              shop without competing for attention. */}
        <div
          className="w-full lg:w-[36%] relative flex items-center justify-center py-8 md:py-10 overflow-hidden bg-zinc-950 touch-pan-x"
          style={{
            backgroundImage: "url(/location.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onWheel={(e) => {
            // Throttled wheel scrolling for desktop
            if (Math.abs(e.deltaY) > 20) {
              if (e.deltaY > 0) setStep((s) => s + 1);
              else setStep((s) => s - 1);
            }
          }}
        >
          {/* Darkening overlay — sits behind the chips but on top of the
              photo. Mixes the storefront image into the dark palette so the
              amber accent on the active chip still pops. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${accentBg}cc 0%, ${accentBg}f2 50%, ${accentBg}cc 100%)`,
            }}
          />

          {/* Mobile/Tablet Horizontal List */}
          <div 
            ref={mobileScrollRef}
            className="w-full flex lg:hidden overflow-x-auto snap-x snap-mandatory px-6 py-8 gap-3 z-10 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {features.map((feature, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => handleChipClick(index)}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  className={cn(
                    "shrink-0 snap-center flex items-center justify-center gap-2 px-5 py-3 rounded-full text-center border transition-colors duration-300",
                    isActive
                      ? "bg-white text-zinc-900 border-amber-400 shadow-md"
                      : "bg-white/5 text-white/80 border-white/15 hover:bg-white/10 hover:text-white"
                  )}
                  suppressHydrationWarning
                >
                  <feature.icon
                    size={16}
                    strokeWidth={1.8}
                    className={isActive ? "text-amber-700" : "text-white/70"}
                  />
                  <span
                    className={cn(
                      "font-semibold text-xs tracking-tight uppercase whitespace-nowrap",
                      isActive ? "text-zinc-900" : "text-white/80"
                    )}
                  >
                    {feature.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop Top/Bottom Fade */}
          <div
            aria-hidden
            className="hidden lg:block absolute inset-x-0 top-0 h-14 z-30 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, ${accentBg} 0%, ${accentBg}cc 70%, ${accentBg}00 100%)`,
            }}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-14 z-30 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${accentBg} 0%, ${accentBg}cc 70%, ${accentBg}00 100%)`,
            }}
          />

          {/* Center highlight bar — Desktop only */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none z-10"
            style={{
              left: "calc(50% - 120px)",
              width: 240,
              height: CHIP_HEIGHT,
              background: `linear-gradient(90deg, ${accent}00 0%, ${accent}40 35%, ${accent}40 65%, ${accent}00 100%)`,
              opacity: 0.35,
            }}
          />

          <div
            className="hidden lg:block relative w-full max-w-[240px] mx-auto z-10"
            style={{ height: trackHeight }}
          >
            <motion.div 
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.1}
              onDragEnd={(e, info) => {
                if (info.offset.y < -20) setStep((s) => s + 1);
                else if (info.offset.y > 20) setStep((s) => s - 1);
              }}
            >
              {features.map((feature, index) => {
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -VISIBLE_BUFFER,
                total - VISIBLE_BUFFER,
                distance,
              );
              const isActive = wrappedDistance === 0;
              const visibility =
                Math.abs(wrappedDistance) <= VISIBLE_BUFFER ? 1 : 0;

              return (
                <motion.button
                  key={feature.id}
                  type="button"
                  onClick={() => handleChipClick(index)}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  aria-pressed={isActive}
                  aria-hidden={visibility === 0}
                  tabIndex={isActive ? 0 : -1}
                  // Browser extensions (LastPass, 1Password, Chrome's
                  // built-in autofill heuristics) inject `fdprocessedid`
                  // onto interactive elements at runtime, which causes
                  // React to log a hydration mismatch warning. The
                  // `HydrationSafeButtons` component also strips these
                  // attributes on mount + via MutationObserver, but
                  // adding `suppressHydrationWarning` here too silences
                  // any warning that fires before that script runs.
                  suppressHydrationWarning
                  style={{
                    height: CHIP_HEIGHT,
                    top: trackHeight / 2 - CHIP_HEIGHT / 2,
                  }}
                  animate={{
                    y:
                      wrappedDistance * (CHIP_HEIGHT + CHIP_GAP) +
                      (wrappedDistance === 0
                        ? 0
                        : Math.sign(wrappedDistance) *
                          Math.min(Math.abs(wrappedDistance), 1) *
                          CHIP_GAP),
                    opacity: isActive
                      ? 1
                      : Math.max(0, 1 - Math.abs(wrappedDistance) * 0.35),
                  }}
                  transition={{
                    // Smoother glide — tuned stiffness/damping ratio avoids
                    // the spring overshoot that caused the "edgy" feel.
                    type: "spring",
                    stiffness: 180,
                    damping: 34,
                    mass: 0.9,
                  }}
                  className={cn(
                    "absolute inset-x-0 flex items-center justify-center gap-2 px-4 rounded-full text-center border transition-colors duration-300",
                    isActive
                      ? "bg-white text-zinc-900 border-amber-400 z-20"
                      : "bg-white/5 text-white/80 border-white/15 hover:bg-white/10 hover:text-white hover:border-white/30",
                  )}
                >
                  <feature.icon
                    size={14}
                    strokeWidth={1.8}
                    className={cn(
                      "shrink-0",
                      isActive ? "text-amber-700" : "text-white/70",
                    )}
                  />
                  <span
                    className={cn(
                      "font-semibold text-[11px] md:text-xs tracking-tight uppercase truncate",
                      isActive ? "text-zinc-900" : "text-white/80",
                    )}
                  >
                    {feature.label}
                  </span>
                </motion.button>
              );
            })}
            </motion.div>
          </div>
        </div>

        {/* Right: stacked image cards */}
        <div className="flex-1 min-h-[320px] md:min-h-[400px] lg:min-h-[460px] relative bg-zinc-50 flex items-center justify-center px-6 md:px-8 lg:px-10 py-10 md:py-12 overflow-hidden border-b lg:border-b-0 lg:border-l border-zinc-200">
          <div className="relative w-full max-w-[360px] aspect-[4/5] flex items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -70 : isNext ? 70 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.88 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -2 : isNext ? 2 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                  }}
                  transition={{
                    // Smooth, glide-style motion — no oscillation. Higher
                    // damping + stiffness ratio dampens the spring so chips
                    // glide instead of bouncing.
                    type: "spring",
                    stiffness: 220,
                    damping: 32,
                    mass: 0.85,
                  }}
                  className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden border-4 md:border-[6px] border-white shadow-xl origin-center"
                >
                  {/* Image / placeholder — fills the entire card */}
                  {feature.image ? (
                    <img
                      src={feature.image}
                      alt={feature.label}
                      className={cn(
                        "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
                        isActive ? "opacity-100" : "opacity-60",
                      )}
                    />
                  ) : (
                    <div
                      data-placeholder={`Paste image — ${feature.label}`}
                      className={cn(
                        "absolute inset-0 w-full h-full grid place-items-center transition-opacity duration-700",
                        "bg-[linear-gradient(135deg,#fde68a_0%,#f59e0b_60%,#b45309_100%)]",
                        isActive ? "opacity-100" : "opacity-60",
                      )}
                    >
                      <feature.icon
                        className="w-12 h-12 md:w-16 md:h-16 text-amber-900/60"
                        strokeWidth={1.2}
                        aria-hidden
                      />
                    </div>
                  )}

                  {/* Description overlay — only the bottom strip */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute inset-x-0 bottom-0 px-5 md:px-6 pb-5 md:pb-6 pt-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-1.5 pointer-events-none"
                      >
                        <div className="bg-white text-zinc-900 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] w-fit shadow-lg">
                          {String(index + 1).padStart(2, "0")} ·{" "}
                          {feature.label}
                        </div>
                        <p className="text-white font-semibold text-sm md:text-base leading-snug drop-shadow-md">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-4 z-30 flex items-center gap-1.5">
            {features.map((f, i) => (
              <button
                key={f.id}
                type="button"
                aria-label={`Go to ${f.label}`}
                onClick={() => handleChipClick(i)}
                className={cn(
                  "min-h-[24px] min-w-[24px] flex items-center justify-center rounded-full transition-all duration-300 group/dot p-0",
                )}
                // See comment on the chip button above — same reason.
                suppressHydrationWarning
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === currentIndex
                      ? "w-6 bg-amber-500"
                      : "w-2 bg-zinc-300 group-hover/dot:bg-zinc-400",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Up / Down arrow buttons — manual carousel movement */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          type="button"
          aria-label="Previous feature"
          onClick={() => {
            prevStep();
            setPaused(true);
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:border-amber-300 hover:text-amber-700 hover:shadow-md transition-all shadow-sm"
          suppressHydrationWarning
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="Next feature"
          onClick={() => {
            nextStep();
            setPaused(true);
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:border-amber-300 hover:text-amber-700 hover:shadow-md transition-all shadow-sm"
          suppressHydrationWarning
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default FeatureCarousel;