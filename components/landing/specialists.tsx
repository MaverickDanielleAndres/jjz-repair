"use client";

import { Award, Cpu, Wrench } from "lucide-react";
import { ClickableImage } from "./clickable-image";

const specialists = [
  {
    name: "Board-Level Specialist",
    role: "Motherboard · Microsoldering · Reball",
    bio: "Years of experience under the microscope. The person you bring the dead phones to when nobody else can fix them.",
    icon: Cpu,
    imageLabel: "Board-level specialist",
    imageVariant: "amber" as const,
  },
  {
    name: "Software & Unlocking Lead",
    role: "iCloud · FRP · MI Account · Network",
    bio: "Specialist in iOS, Android, and OEM-level unlocks. Handles remote services and credits top-ups.",
    icon: Wrench,
    imageLabel: "Software specialist",
    imageVariant: "slate" as const,
  },
];

export function Specialists() {
  return (
    <section className="bg-white border-t border-zinc-200 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
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
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {specialists.map(
            ({ name, role, bio, icon: Icon, imageLabel, imageVariant }) => (
              <article
                key={name}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-500/10 transition-all"
              >
                {/* Image fills the top half */}
                <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
                  <ClickableImage
                    label={imageLabel}
                    icon={Icon}
                    variant={imageVariant}
                    aspect="auto"
                    className="absolute inset-0 h-full w-full rounded-none border-0"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col">
                  <div className="inline-flex w-10 h-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 mb-3">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">{name}</h3>
                  <p className="mt-1 text-sm font-medium text-amber-600">
                    {role}
                  </p>
                  <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                    {bio}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-xs text-zinc-500">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    Board-level certified
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default Specialists;
