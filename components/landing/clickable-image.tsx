"use client";

import { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ClickableImageProps = {
  label: string;
  src?: string | null;
  icon?: LucideIcon;
  variant?: "amber" | "slate" | "dark";
  className?: string;
  aspect?: "square" | "video" | "portrait" | "auto";
};

const VARIANT_BG: Record<NonNullable<ClickableImageProps["variant"]>, string> =
  {
    amber:
      "bg-[linear-gradient(135deg,#fde68a_0%,#f59e0b_60%,#b45309_100%)]",
    slate:
      "bg-[linear-gradient(135deg,#e4e4e7_0%,#a1a1aa_60%,#52525b_100%)]",
    dark: "bg-[linear-gradient(135deg,#27272a_0%,#0a0a0a_100%)]",
  };

const VARIANT_FG: Record<NonNullable<ClickableImageProps["variant"]>, string> =
  {
    amber: "text-amber-900/70",
    slate: "text-zinc-700/70",
    dark: "text-zinc-300/80",
  };

const ASPECT: Record<NonNullable<ClickableImageProps["aspect"]>, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  auto: "",
};

export function ClickableImage({
  label,
  src,
  icon: Icon,
  variant = "amber",
  className,
  aspect = "video",
}: ClickableImageProps) {
  const [open, setOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge ${label}`}
        data-placeholder={label}
        className={cn(
          "group relative w-full overflow-hidden text-left cursor-pointer",
          ASPECT[aspect],
          VARIANT_BG[variant],
          "hover:ring-2 hover:ring-amber-400 hover:ring-offset-2 hover:ring-offset-stone-50 transition-shadow",
          className,
        )}
      >
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-2",
            VARIANT_FG[variant],
          )}
        >
          {Icon && (
            <Icon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
          )}
          <p className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em]">
            {label}
          </p>
        </div>

        {/* Texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent 0 12px, rgba(255,255,255,.08) 12px 24px)",
          }}
        />

        {/* Enlarge hint */}
        <span
          aria-hidden
          className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Maximize2 className="w-4 h-4" />
        </span>
      </button>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged view of ${label}`}
          className="fixed inset-0 z-[100] grid place-items-center bg-zinc-950/80 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className={cn(
              "relative w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl",
              VARIANT_BG[variant],
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-3 p-12 md:p-20 min-h-[60vh]",
                VARIANT_FG[variant],
              )}
            >
              {Icon && (
                <Icon className="w-16 h-16 md:w-24 md:h-24" strokeWidth={1.2} />
              )}
              <p className="text-base md:text-xl font-semibold uppercase tracking-[0.2em] text-center">
                {label}
              </p>
              {src ? (
                <img
                  src={src}
                  alt={label}
                  className="max-h-[60vh] w-auto object-contain"
                />
              ) : (
                <p className="text-xs md:text-sm opacity-70 text-center max-w-md">
                  Paste your image at <code className="px-1.5 py-0.5 rounded bg-black/20 text-current">/public/</code>{" "}
                  and reference it via the <code className="px-1.5 py-0.5 rounded bg-black/20 text-current">src</code>{" "}
                  prop.
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close enlarged view"
              className="absolute top-3 right-3 md:top-5 md:right-5 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ClickableImage;
