import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import {
  ADDRESS,
  MESSENGER_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "./site-data";
import ShopMap from "./location-loader";

const directionsURL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  ADDRESS,
)}`;

export function Location() {
  return (
    <section
      id="location"
      className="bg-white border-t border-zinc-200 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold">
            Where to find us
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
            Drop by the shop.
          </h2>
          <p className="mt-4 text-zinc-600 leading-relaxed">
            Free check-up, walk-ins welcome, or schedule a pickup via
            Messenger.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Real map */}
          <div className="lg:col-span-3 min-h-[320px] lg:min-h-[420px]">
            <ShopMap />
          </div>

          {/* Address card */}
          <div className="lg:col-span-2 rounded-2xl border border-zinc-200 bg-amber-50/40 p-6 md:p-8 flex flex-col">
            <div className="inline-flex w-10 h-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <MapPin className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-zinc-900">
              JJZ TECH
            </h3>
            <p className="mt-2 text-zinc-700">{ADDRESS}</p>

            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex gap-3">
                <Clock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <dt className="text-zinc-500 text-xs uppercase tracking-wider">
                    Hours
                  </dt>
                  <dd className="text-zinc-800 mt-0.5">
                    Mon–Sat: 9:00 AM – 7:00 PM
                    <br />
                    Sun: By appointment / Messenger
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <dt className="text-zinc-500 text-xs uppercase tracking-wider">
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
              <div className="flex gap-3">
                <Navigation className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <dt className="text-zinc-500 text-xs uppercase tracking-wider">
                    Getting here
                  </dt>
                  <dd className="text-zinc-800 mt-0.5">
                    On Manila East Road, Binangonan — click the pin on the map
                    for directions.
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-auto pt-6 flex flex-col gap-2">
              <a
                href={directionsURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-amber-500 text-zinc-950 text-sm font-semibold hover:bg-amber-400 transition-colors"
              >
                Get directions
              </a>
              <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-zinc-200 bg-white text-zinc-800 text-sm font-semibold hover:border-amber-300 transition-colors"
              >
                Message us on Messenger
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;
