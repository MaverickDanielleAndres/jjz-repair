import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared section scaffolding — used across every landing section so the
 * eyebrow / title / lede block has a single visual rhythm site-wide.
 *
 * Renders the compact section header inside a container with consistent
 * horizontal padding. Add `center` to center-align (default for marketing
 * copy), `tight` to skip the top spacing (when the section is a
 * continuation of another), or `eyebrowFirst` to flip the eyebrow above
 * the title (default).
 *
 * The actual section element is owned by the caller (so they can keep
 * the `<section id="...">` for nav anchor links). This component just
 * renders the content block.
 */

type SectionHeaderProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  center?: boolean;
  className?: string;
  ledeClassName?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  lede,
  center = true,
  className,
  ledeClassName,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        center && "text-center",
        // Tighter internal spacing — small section, not a billboard.
        "max-w-2xl",
        // `mx-auto` with the `center` flag centres the header; on left-
        // aligned headers it has no visible effect (the parent flex
        // direction controls position).
        center && "mx-auto",
        className,
      )}
    >
      <p className="text-[11px] uppercase tracking-[0.22em] text-amber-700 font-semibold">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-xl sm:text-2xl md:text-[1.6rem] lg:text-[1.75rem] font-bold tracking-tight text-zinc-900 leading-tight">
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-2.5 text-zinc-600 leading-relaxed text-xs sm:text-sm",
            center ? "max-w-xl mx-auto" : "max-w-md",
            ledeClassName,
          )}
        >
          {lede}
        </p>
      )}
    </header>
  );
}

/**
 * Shared container with the project's standard horizontal padding and a
 * tight max width. Every section uses this so spacing stays uniform
 * without each file redefining `mx-auto max-w-6xl px-6 sm:px-8`.
 */
export function SectionContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-6xl px-5 sm:px-8 lg:px-10",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default SectionHeader;