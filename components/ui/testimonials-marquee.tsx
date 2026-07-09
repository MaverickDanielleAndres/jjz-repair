"use client";

import { motion } from "motion/react";
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
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
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
