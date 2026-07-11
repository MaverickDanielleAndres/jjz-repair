"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "motion/react";
import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  service: string;
  rating: number;
};

export const TestimonialsColumn = ({
  className,
  testimonials,
  duration = 18,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  // Pause the infinite marquee when the column isn't visible. The original
  // implementation ran `repeat: Infinity` 24/7 for the lifetime of the
  // page — even when the user had scrolled past the section. Each
  // marquee is a perpetual rAF callback, so three columns = 3 rAFs
  // forever. Pausing with `useAnimation().stop()` cuts that to zero
  // background work.
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        if (visible) controls.start("scroll");
        else controls.stop();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [controls]);

  return (
    <div ref={containerRef} className={className}>
      <motion.div
        animate={controls}
        variants={{
          scroll: { translateY: "-50%" },
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        // will-change keeps this on the compositor — translating a layer
        // costs almost nothing on the GPU.
        style={{ willChange: "transform" }}
        className="flex flex-col gap-4 pb-4"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <div key={index} className="flex flex-col gap-4">
            {testimonials.map((t, i) => (
              <div
                key={`${index}-${i}`}
                className="p-5 rounded-2xl border border-zinc-200 bg-white shadow-sm max-w-xs w-full"
              >
                <div className="flex items-center justify-between">
                  <Quote className="w-4 h-4 text-amber-500" strokeWidth={1.8} />
                  <span className="text-amber-400 text-xs">
                    {"★".repeat(Math.round(t.rating))}
                  </span>
                </div>
                <p className="mt-3 text-sm text-zinc-700 leading-snug">
                  “{t.quote}”
                </p>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-zinc-900">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    {t.service}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Render nothing when out of view (so no GPU layer is allocated).
// Actually we still want to render but stop the animation — handled above
// via useAnimation().stop().

export default TestimonialsColumn;