"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { ReviewStars } from "@/components/ui/sticky-reviews";
import { TESTIMONIALS } from "./site-data";

const AUTO_PLAY_INTERVAL = 5500;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const total = TESTIMONIALS.length;

  // Wrap index safely
  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  };
  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  };
  const goTo = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, index]);

  const current = TESTIMONIALS[index];

  return (
    <section
      id="reviews"
      className="bg-amber-50/40 border-t border-zinc-200 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold">
            Testimonials
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
            Customers we’ve helped.
          </h2>
          <p className="mt-4 text-zinc-600 leading-relaxed">
            Real feedback from walk-in customers and Messenger inquiries.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={current.name}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col items-center text-center px-6 md:px-12 py-10 md:py-14 min-h-[360px] md:min-h-[320px] justify-center"
              >
                <div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-amber-50 text-amber-500 mb-5">
                  <Quote className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <ReviewStars rating={current.rating} />
                <p className="mt-5 max-w-2xl text-lg md:text-2xl font-medium leading-snug text-zinc-800">
                  “{current.quote}”
                </p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-zinc-900">
                    {current.name}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {current.service}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next */}
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={prev}
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-zinc-200 bg-white text-zinc-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 shadow-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={next}
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-zinc-200 bg-white text-zinc-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 shadow-sm transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => goTo(i)}
                className={
                  "h-1.5 rounded-full transition-all " +
                  (i === index
                    ? "w-8 bg-amber-500"
                    : "w-1.5 bg-zinc-300 hover:bg-zinc-400")
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
