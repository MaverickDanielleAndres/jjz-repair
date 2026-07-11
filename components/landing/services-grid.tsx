"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import {
  CATEGORY_LABELS,
  EVERYTHING,
  type Service,
  type ServiceCategory,
} from "./site-data";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { PixelCard } from "@/components/ui/pixel-card";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import { SectionContainer, SectionHeader } from "./section-header";

const FILTERS: ({ value: "all" | ServiceCategory; label: string })[] = [
  { value: "all", label: "All" },
  { value: "cellphone", label: CATEGORY_LABELS.cellphone },
  { value: "laptop", label: CATEGORY_LABELS.laptop },
  { value: "computer", label: CATEGORY_LABELS.computer },
  { value: "advanced", label: CATEGORY_LABELS.advanced },
  { value: "accessory", label: CATEGORY_LABELS.accessory },
];

function matches(s: Service, q: string) {
  if (!q) return true;
  const needle = q.toLowerCase();
  if (s.title.toLowerCase().includes(needle)) return true;
  if (s.description.toLowerCase().includes(needle)) return true;
  if (s.keywords?.some((k) => k.toLowerCase().includes(needle))) return true;
  return false;
}

export function ServicesGrid() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | ServiceCategory>("all");

  const filtered = useMemo(() => {
    return EVERYTHING.filter((s) => {
      if (filter !== "all" && s.category !== filter) return false;
      return matches(s, query);
    });
  }, [query, filter]);

  const reset = () => {
    setQuery("");
    setFilter("all");
  };

  return (
    <section
      id="services"
      className="bg-stone-50 border-t border-stone-200 py-12 md:py-16"
    >
      <SectionContainer>
        <SectionHeader
          eyebrow="Services offered"
          title="Everything we can fix."
          lede="From a cracked screen to a dead motherboard — if it has a chip in
          it, we probably service it. Search or filter to find what you need."
        />

        {/* Search + filter row */}
        <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-center md:gap-6">
          <div className="relative w-full md:max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services (e.g. screen, battery, iCloud)"
              aria-label="Search services"
              className="w-full pl-9 pr-9 py-2 rounded-full border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <p className="text-xs text-zinc-500">
            Showing{" "}
            <span className="font-semibold text-zinc-900">
              {filtered.length}
            </span>{" "}
            of {EVERYTHING.length} services
          </p>
        </div>

        {/* Filter pills — compact size for professional density */}
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          {FILTERS.map((f) => {
            const active = f.value === filter;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={active}
                className={
                  "px-3 py-1 rounded-full text-xs font-medium border transition-colors " +
                  (active
                    ? "bg-amber-500 text-zinc-950 border-amber-500"
                    : "bg-white text-zinc-700 border-zinc-200 hover:border-amber-300 hover:text-amber-700")
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid — flex-wrap with center justify so the last row is centered */}
        {filtered.length > 0 ? (
          <StaggerReveal
            amount={0.1}
            staggerDelay={0.05}
            className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {filtered.map((service, i) => (
              <div
                key={`${service.title}-${i}`}
                className="w-[calc(50%-0.4rem)] md:w-[calc(33.333%-0.7rem)] lg:w-[calc(25%-0.85rem)]"
              >
                <PixelCard
                  variant="amber"
                  className="h-full rounded-xl"
                >
                  <FeatureCard
                    feature={service}
                    className="rounded-xl h-full !border-transparent hover:!border-transparent bg-transparent !p-3 md:!p-4"
                  />
                </PixelCard>
              </div>
            ))}
          </StaggerReveal>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
            <p className="text-zinc-600 text-sm">
              No services match your search.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500 text-zinc-950 text-xs font-semibold hover:bg-amber-400"
            >
              <X className="w-3 h-3" /> Clear filters
            </button>
          </div>
        )}
      </SectionContainer>
    </section>
  );
}

export default ServicesGrid;
