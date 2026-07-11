'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValue, animate, motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { cn } from '@/lib/utils';

type DurationProp = number | ((size: number) => number);

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  /**
   * Seconds for one full marquee cycle. Pass a number for a fixed speed,
   * or a function that receives the measured slider size (px) and returns
   * seconds — useful for responsive speeds (e.g. faster on small screens).
   */
  duration?: DurationProp;
  /** Same shape as `duration` — speed when the user is hovering. */
  durationOnHover?: DurationProp;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

const resolveDuration = (
  d: DurationProp | undefined,
  fallback: number,
  size: number,
): number => {
  if (d === undefined) return fallback;
  return typeof d === 'function' ? d(size) : d;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState<number>(() =>
    resolveDuration(duration, 25, 0),
  );
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  // Pause the marquee when scrolled out of view — was previously a
  // perpetual rAF for the lifetime of the page. `running` is a ref so
  // toggling it doesn't re-run the main effect.
  const runningRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        runningRef.current = visible;
        setRunning(visible);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // If the slider is out of view, don't start the animation at all.
    if (!runningRef.current) return;

    let controls: ReturnType<typeof animate> | undefined;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
    running,
  ]);

  // Recompute the duration whenever the slider's measured size changes —
  // this is what makes a `(size) => number` responsive duration work.
  useEffect(() => {
    const size = direction === 'horizontal' ? width : height;
    setCurrentDuration(resolveDuration(duration, 25, size));
    // Intentionally excludes `duration` from deps: we only want to recompute
    // when the slider's size changes, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, direction]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          const size = direction === 'horizontal' ? width : height;
          setIsTransitioning(true);
          setCurrentDuration(resolveDuration(durationOnHover, 25, size));
        },
        onHoverEnd: () => {
          const size = direction === 'horizontal' ? width : height;
          setIsTransitioning(true);
          setCurrentDuration(resolveDuration(duration, 25, size));
        },
      }
    : {};

  // Fade-out mask on the leading and trailing edges so items appear to
  // emerge from / dissolve into the background.
  const fadeMask =
    direction === 'horizontal'
      ? {
          maskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }
      : {
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        };

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden', className)}
      style={fadeMask}
    >
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          // Promote to its own composited layer so the infinite translate
          // doesn't trigger a re-rasterization of the masked wrapper.
          willChange: 'transform',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export default InfiniteSlider;