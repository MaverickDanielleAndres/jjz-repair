import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
  logoClassName?: string;
};

/**
 * Per-brand visual scale so the LOGO MARKS look the same size across the
 * grid, regardless of how much empty padding each SVG has inside its
 * viewBox. Simpleicons SVGs all use viewBox="0 0 24 24" but the actual
 * mark varies — Apple/Razer/Xiaomi fill most of the box, while Dell/HP/
 * Samsung/OPPO leave lots of empty space around the mark. Multiplying the
 * displayed size by these factors evens them out visually.
 */
const LOGO_SCALE: Record<string, number> = {
  apple: 1.0,
  samsung: 1.7,
  xiaomi: 1.0,
  realme: 1.0,
  oppo: 2.5,
  vivo: 2.5,
  huawei: 1.8,
  asus: 1.8,
  acer: 1.8,
  dell: 1.4,
  hp: 1.2,
  lenovo: 2.0,
  infinix: 1.1,
  tecno: 1.1,
  readme: 1.1,
  razer: 1.6,
  sony: 1.8,
  lg: 1.8,
  android: 1.5,
  toshiba: 2.2,
  msi: 1.7,
  alienware: 1.5,
  compaq: 1.2,
  motorola: 1.0,
  playstation: 1.6,
  xbox: 1.6,
  predator: 2.5,
  "sony vaio": 1.8,
  "republic of gamers (rog)": 1.8,
  nokia: 2.2,
};

const slugFromSrc = (src: string): string => {
  const clean = src.split('?')[0];
  const m = clean.match(/\/([^/]+)\.[a-z]+$/i);
  return m ? decodeURIComponent(m[1]) : "";
};

const scaleFor = (src: string): number =>
  LOGO_SCALE[slugFromSrc(src)] ?? 1.0;

/**
 * LogoCloud — a compact, bento-style logo grid:
 *   - 3 cols on mobile, 4 on tablet, 6 on desktop
 *   - Border between every cell (right + bottom)
 *   - Checkered `bg-secondary` pattern for visual rhythm
 *   - `+` Plus icons at the inner corners of cells
 *
 * No padding: only the actual logos are rendered. The last row simply
 * has fewer cells (no empty placeholders).
 */
export function LogoCloud({
  logos,
  className,
  logoClassName,
  ...props
}: LogoCloudProps) {
  const total = logos.length;

  return (
    <div
      className={cn(
        "relative grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 border border-zinc-200 bg-background overflow-hidden",
        className,
      )}
      {...props}
    >
      {logos.map((logo, i) => {
        // Decide which cells get borders + Plus icons based on position.
        // We treat it as an irregular grid (3/4/6 cols) — borders go on the
        // right (except last-in-row) and on the bottom (except last row).
        // The row/col math depends on the active grid column count, but we
        // approximate by computing the row index using 6 cols (the widest
        // breakpoint) — borders still look right because the CSS classes
        // are breakpoint-independent.
        const rowIndex = Math.floor(i / 6);
        const colIndex = i % 6;
        const isLastRow = rowIndex === Math.floor((total - 1) / 6);
        // "Edge of row" approximation: every 6th cell (i % 6 === 5) is
        // rightmost in its row, except possibly the very last cell.
        const isApproxRightEdge = colIndex === 5;

        const isCheckerOn = (rowIndex + colIndex) % 2 === 0;

        const borderClasses = [
          !isApproxRightEdge && "md:border-r border-zinc-200",
          !isLastRow && "border-b border-zinc-200",
        ]
          .filter(Boolean)
          .join(" ");

        // Plus icon at the bottom-right corner of non-last-row, non-right-
        // edge cells. Creates a visual cross divider between cells.
        const showPlus = !isLastRow && !isApproxRightEdge;
        // Use smaller Plus icons to keep the compact look
        // (size-3 on mobile, size-3.5 on desktop, ~12-14px)
        // (defined inline below)

        return (
          <LogoCard
            key={i}
            logo={logo}
            className={cn(
              borderClasses,
              isCheckerOn ? "bg-stone-50" : "bg-white",
            )}
            logoClassName={logoClassName}
          >
            {showPlus && (
              <PlusIcon
                aria-hidden
                strokeWidth={1.5}
                className="-right-[8px] -bottom-[8px] absolute z-10 size-3 md:size-3.5 text-zinc-300"
              />
            )}
          </LogoCard>
        );
      })}
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
  logoClassName?: string;
};

function LogoCard({
  logo,
  className,
  children,
  logoClassName,
  ...props
}: LogoCardProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center px-3 py-3 md:px-4 md:py-4 aspect-[5/3]",
        className,
      )}
      {...props}
    >
      {/* Plain <img> — supports local + remote sources uniformly.
          We deliberately omit width/height here so the SVG's natural
          viewBox aspect ratio is preserved. CSS controls the rendered
          size, and object-contain keeps each logo proportional.
          Per-brand `transform: scale(...)` evens out the visual weight
          of marks that have lots of empty space inside their viewBox. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        decoding="async"
        className={cn(
          "pointer-events-none select-none w-[70%] max-w-[120px] h-6 md:h-7 object-contain",
          logoClassName,
        )}
        style={{
          // scaleFor returns 1.0 if no override — keeps the transform
          // stable so layout doesn't shift between renders.
          transform: `scale(${scaleFor(logo.src)})`,
        }}
      />
      {children}
    </div>
  );
}

export default LogoCloud;