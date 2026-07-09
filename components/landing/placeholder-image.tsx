import type { LucideIcon } from "lucide-react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PlaceholderImageProps = {
  label?: string;
  icon?: LucideIcon;
  /** Tint applied as a subtle gradient — uses brand amber by default. */
  variant?: "amber" | "slate" | "dark";
  className?: string;
  aspect?: "square" | "video" | "portrait" | "auto";
};

const VARIANT_BG: Record<NonNullable<PlaceholderImageProps["variant"]>, string> =
  {
    amber:
      "bg-[linear-gradient(135deg,#fde68a_0%,#f59e0b_60%,#b45309_100%)]",
    slate:
      "bg-[linear-gradient(135deg,#e4e4e7_0%,#a1a1aa_60%,#52525b_100%)]",
    dark: "bg-[linear-gradient(135deg,#27272a_0%,#0a0a0a_100%)]",
  };

const VARIANT_FG: Record<NonNullable<PlaceholderImageProps["variant"]>, string> =
  {
    amber: "text-amber-900/70",
    slate: "text-zinc-700/70",
    dark: "text-zinc-300/80",
  };

const ASPECT: Record<NonNullable<PlaceholderImageProps["aspect"]>, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  auto: "",
};

export function PlaceholderImage({
  label = "Paste image here",
  icon: Icon = ImageIcon,
  variant = "amber",
  className,
  aspect = "video",
}: PlaceholderImageProps) {
  return (
    <div
      data-placeholder={label}
      className={cn(
        "relative w-full overflow-hidden",
        ASPECT[aspect],
        VARIANT_BG[variant],
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-2",
          VARIANT_FG[variant],
        )}
      >
        <Icon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
        <p className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em]">
          {label}
        </p>
      </div>
      {/* Subtle texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 12px, rgba(255,255,255,.08) 12px 24px)",
        }}
      />
    </div>
  );
}

export default PlaceholderImage;
