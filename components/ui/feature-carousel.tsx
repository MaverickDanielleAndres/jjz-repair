'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CarouselFeature = {
  id: string;
  label: string;
  icon: LucideIcon;
  image: string;
  description: string;
};

type FeatureCarouselProps = {
  features: CarouselFeature[];
  autoPlayInterval?: number;
  /** Tint color of the chip column (CSS color). Default is a soft warm-dark. */
  accent?: string;
};

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const CHIP_HEIGHT = 64; // uniform chip height
const CHIP_MIN_WIDTH = 240; // uniform min width so all ovals are the same size
const SMOOTH = [0.4, 0, 0.2, 1] as const; // smooth easing

export function FeatureCarousel({
  features,
  autoPlayInterval = 3500,
  accent = '#27201a', // soft warm dark — not pure black
}: FeatureCarouselProps) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % features.length) + features.length) % features.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length;
    if (diff > 0) setStep((s) => s + diff);
    else if (diff !== 0) setStep((s) => s - (features.length - diff));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextStep, isPaused, autoPlayInterval]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = features.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return 'active';
    if (normalizedDiff === -1) return 'prev';
    if (normalizedDiff === 1) return 'next';
    return 'hidden';
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-8">
      <div
        className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[640px] lg:min-h-[560px] border border-zinc-200 bg-white shadow-sm"
        style={{ ['--jjz-accent' as string]: accent }}
      >
        {/* ─── Left: chip column ─────────────────────────── */}
        <div
          className="w-full lg:w-[42%] min-h-[420px] md:min-h-[460px] lg:min-h-[560px] relative z-30 flex flex-col px-6 md:px-10 lg:pl-12 lg:pr-8 pt-14 pb-20 lg:py-10"
          style={{ background: accent }}
        >
          {/* Top fade */}
          <div
            className="absolute inset-x-0 top-0 h-14 z-40 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, ${accent}, ${accent}00)`,
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-20 z-40 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${accent}, ${accent}00)`,
            }}
          />

          {/* Chips — fixed height, all same size, vertically centered */}
          <div
            className="relative flex-1 flex items-center justify-center lg:justify-start overflow-y-auto lg:overflow-visible"
            style={{ scrollbarWidth: 'none' }}
          >
            <div
              className="relative w-full lg:w-auto"
              style={{ height: features.length * CHIP_HEIGHT }}
            >
              {features.map((feature, index) => {
                const isActive = index === currentIndex;
                const distance = index - currentIndex;
                const wrappedDistance = wrap(
                  -(features.length / 2),
                  features.length / 2,
                  distance,
                );

                // Center chip is at middle: top = ((features.length - 1) / 2) * CHIP_HEIGHT
                const centerIndex = (features.length - 1) / 2;
                const topY = (centerIndex - index) * CHIP_HEIGHT;

                return (
                  <motion.button
                    key={feature.id}
                    type="button"
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    initial={false}
                    animate={{
                      y: topY,
                      opacity: 1 - Math.min(0.6, Math.abs(wrappedDistance) * 0.18),
                      scale: isActive ? 1 : 0.96,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: SMOOTH,
                    }}
                    aria-pressed={isActive}
                    className={cn(
                      'absolute left-0 right-0 lg:left-0 lg:right-auto flex items-center gap-3 px-5 py-3 rounded-full text-left group border transition-colors duration-500',
                      isActive
                        ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-lg shadow-amber-500/30 z-10'
                        : 'bg-white/5 text-white/70 border-white/15 hover:border-white/40 hover:text-white',
                    )}
                    style={{
                      height: CHIP_HEIGHT - 8,
                      minWidth: CHIP_MIN_WIDTH,
                    }}
                  >
                    <div
                      className={cn(
                        'flex items-center justify-center shrink-0 transition-colors duration-500',
                        isActive ? 'text-zinc-950' : 'text-white/50',
                      )}
                    >
                      <feature.icon size={18} strokeWidth={2} />
                    </div>

                    <span className="font-medium text-sm md:text-[15px] tracking-tight whitespace-nowrap uppercase">
                      {feature.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Up / Down buttons — together at the bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous feature"
              onClick={prevStep}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-zinc-900 border border-white/20 hover:border-amber-300 transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Next feature"
              onClick={nextStep}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-zinc-900 border border-white/20 hover:border-amber-300 transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ─── Right: card stack ─────────────────────────── */}
        <div className="flex-1 min-h-[420px] md:min-h-[460px] lg:min-h-[560px] relative bg-amber-50/30 flex items-center justify-center py-12 md:py-16 px-6 md:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-zinc-200">
          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === 'active';
              const isPrev = status === 'prev';
              const isNext = status === 'next';

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -60 : isNext ? 60 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.9 : 0.8,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.3 : 0,
                    rotate: isPrev ? -2 : isNext ? 2 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                  transition={{
                    duration: 0.5,
                    ease: SMOOTH,
                  }}
                  className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden border-4 md:border-8 border-white bg-white origin-center shadow-xl"
                >
                  {feature.image ? (
                    <img
                      src={feature.image}
                      alt={feature.label}
                      className={cn(
                        'w-full h-full object-cover transition-all duration-700',
                        isActive
                          ? 'grayscale-0 blur-0'
                          : 'grayscale blur-[2px] brightness-75',
                      )}
                    />
                  ) : (
                    <div
                      data-placeholder={`Paste image — ${feature.label}`}
                      className="w-full h-full bg-zinc-100"
                    />
                  )}

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, ease: SMOOTH }}
                        className="absolute inset-x-0 bottom-0 p-8 pt-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        <div className="bg-white text-zinc-900 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] w-fit shadow-lg mb-3 border border-zinc-200">
                          {index + 1} • {feature.label}
                        </div>
                        <p className="text-white font-medium text-xl md:text-2xl leading-tight drop-shadow-md tracking-tight">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
