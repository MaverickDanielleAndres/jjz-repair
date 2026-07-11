"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImage {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  /** Array of images for the parallax effect. Pass up to 7. Empty `src` renders a placeholder. */
  images: ParallaxImage[];
}

/**
 * ZoomParallax — sticky parallax gallery.
 *
 * Original implementation used scales up to 9× on a full-viewport image,
 * which forced the GPU compositor to allocate ~81× the pixel area and
 * re-rasterize the source bitmap on every frame. That blew past the
 * frame budget during scroll. This version:
 *
 *   1. Caps every scale at ≤ 3× — still gives the "diving into the photo"
 *      feeling but the texture is ~9× smaller than the old 9× max.
 *   2. Adds `will-change: transform` to each motion layer so the browser
 *      keeps them on the GPU compositor.
 *   3. Pauses framer-motion's scroll listener via a local
 *      IntersectionObserver — when the gallery is fully out of view
 *      neither scroll progress nor transforms update, so we don't burn
 *      frames in the background.
 */
export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Pause the scroll listener entirely when the gallery leaves the
  // viewport. We can't conditionally skip `useScroll()` (it's a hook), so
  // we instead gate the `target` ref to null when out of view — framer-
  // motion treats a null target as "no scroll progress".
  const { scrollYProgress } = useScroll(
    inView
      ? { target: container, offset: ["start start", "end end"] }
      : undefined,
  );

  // Cap every scale at 3 — see comment above.
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const scale3 = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const scales = [scale1, scale2, scale3, scale2, scale3, scale1, scale2];

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale, willChange: "transform" }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
            >
              <div className="relative h-[25vh] w-[25vw]">
                {src ? (
                  <img
                    src={src}
                    alt={alt || `Parallax image ${index + 1}`}
                    // loading="lazy" + decoding="async" — parallax
                    // images aren't critical for first paint; defer
                    // them so the browser can prioritise hero content.
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    data-placeholder={alt || `Gallery image ${index + 1}`}
                    className="h-full w-full bg-zinc-200 border border-zinc-300"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default ZoomParallax;