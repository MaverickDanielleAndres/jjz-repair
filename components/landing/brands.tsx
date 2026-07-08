import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { SUPPORTED_BRANDS } from "./site-data";

export function Brands() {
  return (
    <section className="bg-amber-50/40 border-y border-amber-100 py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs md:text-sm uppercase tracking-[0.25em] text-amber-700 font-semibold">
          We service all major brands
        </p>

        <div className="relative mt-5">
          <InfiniteSlider gap={48} duration={32} durationOnHover={60}>
            {SUPPORTED_BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-center min-w-[110px] h-10 px-4"
              >
                <span className="text-zinc-800 font-bold text-lg md:text-xl tracking-tight whitespace-nowrap select-none hover:text-amber-600 transition-colors">
                  {brand.name}
                </span>
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}

export default Brands;
