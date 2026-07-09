'use client';

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
} from 'react';
import { ChevronDown, ChevronUp, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CarouselFeature = {
  id: string;
  label: string;
  icon: LucideIcon;
  image: string;
  description: string;
  tint?: string;
};

type FeatureCarouselProps = {
  features: CarouselFeature[];
  autoPlayInterval?: number;
  accent?: string;
  accentBg?: string;
};

const AUTO_PLAY_DEFAULT = 4500;
const CHIP_HEIGHT = 64;
const VISIBLE_BUFFER = 4;

export function FeatureCarousel({
  features,
  autoPlayInterval = AUTO_PLAY_DEFAULT,
  accent = '#f59e0b',
  accentBg,
}: FeatureCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartRef = useRef<{ y: number; time: number } | null>(null);

  const total = features.length;
  const current = features[index];
  // Right panel uses a grayish-black gradient + an image placeholder
  // overlay (the "tint" prop is still respected for future customization).
  const cardTint = current.tint ?? '#1f232b';

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, autoPlayInterval);
    return () => clearInterval(t);
  }, [paused, next, autoPlayInterval]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { y: e.touches[0].clientY, time: Date.now() };
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    if (!start) return;
    const dy = e.changedTouches[0].clientY - start.y;
    const dt = Date.now() - start.time;
    touchStartRef.current = null;
    setPaused(false);
    if (Math.abs(dy) < 30 || dt > 600) return;
    if (dy < 0) next();
    else prev();
  };
  const onTouchCancel = () => {
    touchStartRef.current = null;
    setPaused(false);
  };

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < 10) return;
    if (e.deltaY > 0) next();
    else prev();
  };

  const containerHeight = (VISIBLE_BUFFER * 2 + 1) * CHIP_HEIGHT;
  const centerOffset = VISIBLE_BUFFER * CHIP_HEIGHT;
  const trackY = -(index * CHIP_HEIGHT) + centerOffset;
  const bg = accentBg ?? accent;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl md:rounded-[2rem] flex flex-col lg:flex-row min-h-[420px] lg:min-h-[460px] border border-zinc-200 bg-white">
        {/* Left: rotary chip column */}
        <div
          className="w-full lg:w-[40%] relative flex flex-col items-center justify-center p-6 md:p-7 lg:py-8 overflow-hidden"
          style={{ background: bg }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchCancel}
          onWheel={onWheel}
        >
          {/* Top blur — mixes with the column background */}
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-20 z-30 pointer-events-none backdrop-blur-md"
            style={{
              background: `linear-gradient(to bottom, ${bg} 0%, ${bg}cc 40%, ${bg}00 100%)`,
            }}
          />
          {/* Bottom blur — mixes with the column background */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-20 z-30 pointer-events-none backdrop-blur-md"
            style={{
              background: `linear-gradient(to top, ${bg} 0%, ${bg}cc 40%, ${bg}00 100%)`,
            }}
          />

          {/* Center highlight bar — always in the middle */}
          <div
            aria-hidden
            className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-16 rounded-full pointer-events-none z-20"
            style={{
              background:
                'linear-gradient(90deg, rgba(245,158,11,0) 0%, rgba(245,158,11,.95) 18%, rgba(251,191,36,1) 50%, rgba(245,158,11,.95) 82%, rgba(245,158,11,0) 100%)',
              boxShadow:
                '0 0 24px rgba(245,158,11,.45), inset 0 0 12px rgba(255,255,255,.18)',
            }}
          />

          {/* Rotary chip container */}
          <div
            className="relative w-full max-w-[280px] mx-auto z-10 overflow-hidden"
            style={{ height: containerHeight } as CSSProperties}
          >
            <div
              className="jjz-rotary-track absolute inset-x-0 transition-transform duration-500 ease-out"
              style={{ transform: `translateY(${trackY}px)` } as CSSProperties}
            >
              <div className="flex flex-col items-center gap-2">
                {features.map((f, i) => {
                  const isActive = i === index;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={cn(
                        'flex items-center justify-center gap-2.5 w-full h-16 px-4 rounded-full text-center transition-all duration-300 border',
                        isActive
                          ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-lg shadow-amber-500/30'
                          : 'bg-transparent text-white/80 border-transparent hover:text-white',
                      )}
                      aria-pressed={isActive}
                    >
                      <span
                        className={cn(
                          'inline-flex items-center justify-center shrink-0 transition-colors',
                          isActive ? 'text-zinc-950' : 'text-white/70',
                        )}
                      >
                        <f.icon size={14} strokeWidth={1.8} />
                      </span>
                      <span
                        className={cn(
                          'font-semibold text-[11px] md:text-xs tracking-tight uppercase truncate',
                          isActive ? 'text-zinc-950' : 'text-white/80',
                        )}
                      >
                        {f.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Up / Down arrow pair, side-by-side at the bottom */}
          <div className="mt-4 flex items-center justify-center gap-2 z-10">
            <button
              type="button"
              aria-label="Previous feature"
              onClick={prev}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-zinc-900 hover:bg-amber-100 border border-white/30 shadow-sm transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Next feature"
              onClick={next}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-zinc-900 hover:bg-amber-100 border border-white/30 shadow-sm transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: content panel — image placeholder background + grayish-black gradient */}
        <div
          className="flex-1 min-h-[300px] lg:min-h-[460px] relative flex items-center justify-center p-6 md:p-10 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${cardTint} 0%, ${shade(
              cardTint,
              -25,
            )} 100%)`,
          }}
        >
          {/* Image placeholder overlay — replaces the solid colored background
              with a labeled placeholder that fills the right panel. */}
          <div
            data-placeholder={`Paste image — ${current.label}`}
            className="absolute inset-0 grid place-items-center pointer-events-none"
          >
            <div className="flex flex-col items-center gap-2 text-white/25">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="w-12 h-12"
                aria-hidden
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M3 16l4-4 3 3 5-5 4 4 5-5" />
              </svg>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                Paste image
              </span>
            </div>
          </div>
          {/* Subtle texture overlay */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent 0 12px, rgba(255,255,255,.05) 12px 24px)',
            }}
          />

          <div className="relative max-w-md w-full text-center text-white">
            <div
              key={current.id}
              className="inline-flex w-16 h-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-5"
            >
              <current.icon className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/70 font-semibold">
              {String(index + 1).padStart(2, '0')} /{' '}
              {String(total).padStart(2, '0')}
            </p>
            <h3 className="mt-2 font-display text-2xl md:text-4xl font-bold text-white tracking-tight">
              {current.label}
            </h3>
            <p className="mt-4 text-white/85 text-sm md:text-base leading-relaxed">
              {current.description}
            </p>
            {current.image && (
              <img
                src={current.image}
                alt={current.label}
                className="mt-6 mx-auto rounded-xl w-full max-h-56 object-cover border border-white/20"
              />
            )}
          </div>

          {/* Pagination dots */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5">
            {features.map((f, i) => (
              <button
                key={f.id}
                type="button"
                aria-label={`Go to ${f.label}`}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/30',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function shade(hex: string, amount: number): string {
  const h = hex.replace('#', '');
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const t = amount < 0 ? 0 : 255;
  const p = Math.abs(amount) / 100;
  const nr = Math.round((t - r) * p) + r;
  const ng = Math.round((t - g) * p) + g;
  const nb = Math.round((t - b) * p) + b;
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
  return `#${toHex(nr)}${toHex(ng)}${toHex(nb)}`;
}

export default FeatureCarousel;
