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
      className="bg-stone-50 border-t border-stone-200 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold">
            Services offered
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900">
            Everything we can fix.
          </h2>
          <p className="mt-4 text-zinc-600 leading-relaxed">
            From a cracked screen to a dead motherboard — if it has a chip in
            it, we probably service it. Search or filter to find what you need.
          </p>
        </div>

        {/* Search + filter row */}
        <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-center md:gap-6">
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
              className="w-full pl-10 pr-9 py-2.5 rounded-full border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
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

        {/* Filter pills */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {FILTERS.map((f) => {
            const active = f.value === filter;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={active}
                className={
                  "px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors " +
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
          <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-5">
            {filtered.map((service, i) => (
              <div
                key={`${service.title}-${i}`}
                className="w-full sm:w-[calc(50%-0.625rem)] md:w-[calc(33.333%-0.83rem)] lg:w-[calc(25%-0.9375rem)]"
              >
                <FeatureCard
                  feature={service}
                  className="rounded-2xl h-full"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
            <p className="text-zinc-600">
              No services match your search.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 text-zinc-950 text-sm font-semibold hover:bg-amber-400"
            >
              <X className="w-3.5 h-3.5" /> Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ServicesGrid;
