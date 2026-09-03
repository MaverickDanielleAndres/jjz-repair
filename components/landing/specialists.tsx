"use client";

import Image from "next/image";
import { Award, Cpu, Wrench } from "lucide-react";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import { SectionContainer, SectionHeader } from "./section-header";

const specialists = [
  {
    name: "Board-Level Specialist",
    role: "Motherboard · Microsoldering · Reball",
    bio: "20+ years of experience under the microscope. The person you bring the dead phones to.",
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
    <section className="bg-white border-t border-zinc-200 py-12 md:py-16">
      <SectionContainer>
        <SectionHeader
          eyebrow="Our specialists"
          title="Trusted technicians."
          lede="Two specialists. One mission: fix it right, the first time, at a
          price that makes sense."
        />

        {/*
          Side-by-side on every breakpoint ≥ md. `max-w-5xl mx-auto`
          caps the row at 1024px (the wider container the user said
          they preferred) and `gap-6` keeps the cards visually apart
          even if the user has a very wide monitor. Cards are
          intentionally tall enough for the full bio to read in 2-3
          lines so nothing has to be truncated.
        */}
        <StaggerReveal
          amount={0.2}
          staggerDelay={0.15}
          className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {specialists.map(
            ({ name, role, bio, icon: Icon, imageLabel, imageSrc }, i) => (
              <StaggerItem
                key={name}
                variant="fadeUp"
                className="w-full"
              >
                {/*
                  Card layout — `overflow-hidden` on the article
                  guarantees that no child element can ever render
                  outside the rounded card boundary, even at extreme
                  viewports. The image column is `w-32` on md+ (fixed
                  128px) so the content column gets the lion's share
                  of the card width regardless of viewport size.
                */}
                <article className="group relative flex flex-row items-stretch overflow-hidden rounded-xl border border-zinc-200 bg-white hover:shadow-lg hover:shadow-amber-500/10 transition-shadow h-full">
                  {/* Photo — fixed 128px wide on md+, full row width on
                      mobile (image on top). `bg-zinc-900` covers any
                      decoding delay so the card never flashes. */}
                  <div className="relative w-28 sm:w-32 shrink-0 bg-zinc-900 self-stretch overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={imageLabel}
                      fill
                      sizes="8rem"
                      className="object-cover"
                    />
                  </div>

                  {/* Content. Every text element has `break-words` so
                      a long word can never bleed past the card edge.
                      Generous right padding (`pr-5`) gives the bio
                      text visible breathing room from the right
                      boundary. */}
                  <div className="flex-1 min-w-0 p-4 sm:pr-5 flex flex-col gap-1">
                    <div className="flex items-start gap-2">
                      <span className="inline-flex w-6 h-6 items-center justify-center rounded-md bg-amber-50 text-amber-700 shrink-0">
                        <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                      </span>
                      <h3 className="flex-1 min-w-0 text-sm md:text-[15px] font-bold text-zinc-900 leading-tight break-words">
                        {name}
                      </h3>
                    </div>
                    <p className="text-[11px] font-medium text-amber-700 break-words">
                      {role}
                    </p>
                    <p className="text-xs md:text-[13px] text-zinc-600 leading-snug break-words">
                      {bio}
                    </p>
                    <div className="mt-auto pt-2 flex items-center gap-1.5 text-[10px] text-zinc-500">
                      <Award className="w-3 h-3 text-amber-500 shrink-0" />
                      <span className="truncate">Board-level certified</span>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ),
          )}
        </StaggerReveal>
      </SectionContainer>
    </section>
  );
}

export default Specialists;
