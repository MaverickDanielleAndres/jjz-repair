"use client";

import { Award, BadgeDollarSign, Clock, Wrench } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import { SectionContainer, SectionHeader } from "./section-header";

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
      "Fair, transparent pricing. We'll quote before any work begins — no surprises.",
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
    <section className="bg-amber-50/20 border-t border-amber-100/40 py-12 md:py-16">
      <SectionContainer>
        <SectionHeader
          eyebrow="Why choose JJZ TECH"
          title="Affordable doesn't mean cheap."
          lede="We use quality parts, employ experienced technicians, and back
          selected repairs with a warranty. The goal: fix it right, the
          first time, at a price that makes sense."
        />

        <StaggerReveal
          amount={0.2}
          staggerDelay={0.1}
          className="mt-8 md:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {reasons.map((r, i) => (
            <StaggerItem
              key={r.title}
              variant={i % 2 === 0 ? "scaleIn" : "fadeUp"}
            >
              <SpotlightCard
                className="!p-4 text-center hover:shadow-md hover:shadow-amber-500/5 transition-all h-full"
                spotlightColor="rgba(245, 158, 11, 0.18)"
              >
                <div
                  aria-hidden
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative inline-flex w-8 h-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 mx-auto">
                  <r.icon className="w-4 h-4" strokeWidth={1.8} />
                </div>
                <h3 className="relative mt-3 text-sm font-semibold text-zinc-900">
                  {r.title}
                </h3>
                <p className="relative mt-1.5 text-xs text-zinc-500 leading-relaxed">
                  {r.description}
                </p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </SectionContainer>
    </section>
  );
}

export default WhyChooseUs;
