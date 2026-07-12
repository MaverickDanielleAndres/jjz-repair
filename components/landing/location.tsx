import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import {
  ADDRESS,
  BRAND_NAME,
  MESSENGER_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "./site-data";
import ShopMap from "./location-loader";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionContainer, SectionHeader } from "./section-header";

const directionsURL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${BRAND_NAME}, ${ADDRESS}`
)}`;

export function Location() {
  return (
    <section
      id="location"
      className="bg-white border-t border-zinc-200 py-12 md:py-16 overflow-hidden"
    >
      <SectionContainer>
        <SectionHeader
          eyebrow="Where to find us"
          title="Drop by the shop."
          lede="Free check-up, walk-ins welcome, or schedule a pickup via
          Messenger."
        />

        {/*
          Two-column grid with no fixed height. The map container is
          told to size itself by the address card's natural height
          (via `lg:items-stretch` on the grid + `h-full` on the map
          wrapper); the address card grows with its own content and
          no longer needs an internal scroll. Map size is bounded
          by the map's own internal `min-h` floor — not by the
          column's height — so Leaflet can no longer balloon the
          section.
        */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-4 lg:items-stretch">
          {/* Map — `h-80` mobile gives the map enough room to look
              like a map; on lg+ it stretches to match the address
              card. Bound on the *top* end only. */}
          <ScrollReveal
            variant="scaleUp"
            amount={0.2}
            delay={0.1}
            className="lg:col-span-3"
          >
            <div className="h-72 sm:h-80 lg:h-full min-h-72 lg:min-h-0">
              <ShopMap />
            </div>
          </ScrollReveal>

          {/* Address card — sizes itself by its content. No internal
              scroll, no hidden buttons. */}
          <ScrollReveal
            variant="fadeRight"
            amount={0.2}
            delay={0.2}
            className="lg:col-span-2"
          >
            <SpotlightCard
              className="!p-5 flex flex-col hover:shadow-lg hover:shadow-amber-500/10 transition-all h-full"
              spotlightColor="rgba(245, 158, 11, 0.18)"
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                  <MapPin className="w-4 h-4" strokeWidth={1.8} />
                </span>
                <p className="text-[11px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
                  Our Location
                </p>
              </div>

              <h3 className="mt-3 text-base font-bold text-zinc-900">JJZ TECH</h3>
              <p className="mt-0.5 text-xs text-zinc-700">{ADDRESS}</p>

              <dl className="mt-4 space-y-3 text-xs">
                <div className="flex gap-2.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <dt className="text-zinc-500 text-[10px] uppercase tracking-[0.18em] font-semibold">
                      Hours
                    </dt>
                    <dd className="text-zinc-800 mt-0.5 leading-relaxed">
                      Mon–Sat: 9:00 AM – 7:00 PM
                      <br />
                      Sun: By appointment / Messenger
                    </dd>
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <dt className="text-zinc-500 text-[10px] uppercase tracking-[0.18em] font-semibold">
                      Phone
                    </dt>
                    <dd className="text-zinc-800 mt-0.5">
                      <a
                        href={`tel:${PHONE_TEL}`}
                        className="hover:text-amber-700"
                      >
                        {PHONE_DISPLAY}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <Navigation className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <dt className="text-zinc-500 text-[10px] uppercase tracking-[0.18em] font-semibold">
                      Getting here
                    </dt>
                    <dd className="text-zinc-800 mt-0.5 leading-relaxed">
                      On Manila East Road, Binangonan — click the pin on the map
                      for directions.
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-auto pt-4 flex flex-col gap-2">
                <a
                  href={directionsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 text-zinc-950 text-xs font-semibold hover:bg-amber-400 transition-colors"
                >
                  Get directions
                </a>
                <a
                  href={MESSENGER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-zinc-200 bg-white text-zinc-800 text-xs font-semibold hover:border-amber-300 transition-colors"
                >
                  Message us on Messenger
                </a>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </SectionContainer>
    </section>
  );
}

export default Location;
