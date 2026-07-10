"use client";

import Image from "next/image";
import { Award, Cpu, Wrench } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";

const specialists = [
  {
    name: "Board-Level Specialist",
    role: "Motherboard · Microsoldering · Reball",
    bio: "Years of experience under the microscope. The person you bring the dead phones to when nobody else can fix them.",
    icon: Cpu,
    imageLabel: "Board-level specialist",
    imageSrc: "/ourspecialist1.jpg",
  },
  {
    name: "Software & Unlocking Lead",
    role: "iCloud · FRP · MI Account · Network",
    bio: "Specialist in iOS, Android, and OEM-level unlocks. Handles remote services and credits top-ups.",
    icon: Wrench,
    imageLabel: "Software specialist",
    imageSrc: "/ourspecialist2.jpg",
  },
];

export function Specialists() {
  return (
    <section className="bg-white border-t border-zinc-200 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal
          variant="fade"
          amount={0.4}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold">
            Our specialists
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900">
            Trusted technicians.
          </h2>
          <p className="mt-4 text-zinc-600 leading-relaxed">
            Two specialists. One mission: fix it right, the first time, at a
            price that makes sense.
          </p>
        </ScrollReveal>

        <StaggerReveal
          amount={0.2}
          staggerDelay={0.15}
          className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {specialists.map(
            ({ name, role, bio, icon: Icon, imageLabel, imageSrc }, i) => (
              <StaggerItem
                key={name}
                variant={i === 0 ? "fadeLeft" : "fadeRight"}
                className="h-full"
              >
                <SpotlightCard
                  className="!p-0 group relative flex flex-row overflow-hidden hover:shadow-xl hover:shadow-amber-500/10 transition-all h-full"
                  spotlightColor="rgba(245, 158, 11, 0.18)"
                >
                  {/* Real specialist photo fills the full left side, top to bottom */}
                  <div className="relative w-28 sm:w-36 md:w-40 lg:w-44 shrink-0 bg-zinc-900 h-full min-h-[140px]">
                    <Image
                      src={imageSrc}
                      alt={imageLabel}
                      fill
                      sizes="(max-width: 768px) 7rem, 11rem"
                      unoptimized
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 p-4 md:p-5 pr-12 relative">
                    <h3 className="text-base font-bold text-zinc-900 leading-tight">
                      {name}
                    </h3>
                    <p className="mt-1 text-[11px] font-medium text-amber-600">
                      {role}
                    </p>
                    <p className="mt-2 text-xs text-zinc-600 leading-relaxed line-clamp-3">
                      {bio}
                    </p>
                    <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-zinc-500">
                      <Award className="w-3 h-3 text-amber-500" />
                      Board-level certified
                    </div>
                  </div>

                  {/* Icon pinned to the top-right of the content area */}
                  <div className="absolute top-3 right-3 inline-flex w-7 h-7 items-center justify-center rounded-md bg-amber-50 text-amber-600">
                    <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ),
          )}
        </StaggerReveal>
      </div>
    </section>
  );
}

export default Specialists;