"use client";

import { Award, BadgeDollarSign, Clock, Wrench } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";

const reasons = [
  {
    icon: Wrench,
    title: "Experienced Technicians",
    description:
      "Years of board-level experience across cellphone, laptop, and computer repair.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "Same-day diagnostics. Most common repairs done in under 2 hours.",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Prices",
    description:
      "Fair, transparent pricing. We’ll quote before any work begins — no surprises.",
  },
  {
    icon: Award,
    title: "Warranty on Selected Repairs",
    description:
      "Selected parts and labor carry a service warranty. Ask for details per repair.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-amber-50/20 border-t border-amber-100/40 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal
          variant="fadeDown"
          amount={0.4}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold">
            Why choose JJZ TECH
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900">
            Affordable doesn’t mean cheap.
          </h2>
          <p className="mt-4 text-zinc-600 leading-relaxed">
            We use quality parts, employ experienced technicians, and back
            selected repairs with a warranty. The goal: fix it right, the
            first time, at a price that makes sense.
          </p>
        </ScrollReveal>

        <StaggerReveal
          amount={0.2}
          staggerDelay={0.1}
          className="mt-12 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {reasons.map((r, i) => (
            <StaggerItem
              key={r.title}
              variant={i % 2 === 0 ? "scaleIn" : "fadeUp"}
            >
              <SpotlightCard
                className="!p-5 text-center hover:shadow-lg hover:shadow-amber-500/5 transition-all h-full"
                spotlightColor="rgba(245, 158, 11, 0.18)"
              >
                <div
                  aria-hidden
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative inline-flex w-9 h-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 mx-auto">
                  <r.icon className="w-4 h-4" strokeWidth={1.8} />
                </div>
                <h3 className="relative mt-4 text-sm md:text-base font-semibold text-zinc-900">
                  {r.title}
                </h3>
                <p className="relative mt-1.5 text-xs text-zinc-500 leading-relaxed">
                  {r.description}
                </p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

export default WhyChooseUs;