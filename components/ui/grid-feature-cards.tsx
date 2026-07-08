'use client';

import { cn } from '@/lib/utils';
import React from 'react';

export type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
};

type FeatureCardProps = React.ComponentProps<'div'> & {
  feature: FeatureType;
};

export function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
  // Deterministic pattern derived from the feature title so SSR and client
  // hydration produce identical markup.
  const p = genDeterministicPattern(feature.title);

  return (
    <div
      className={cn(
        'relative overflow-hidden p-6 border border-zinc-200 bg-white',
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="from-zinc-200/40 to-zinc-200/10 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="fill-zinc-400/10 stroke-zinc-400/30 absolute inset-0 h-full w-full"
          />
        </div>
      </div>
      <feature.icon
        className="text-zinc-900 size-6"
        strokeWidth={1.5}
        aria-hidden
      />
      <h3 className="mt-10 text-sm md:text-base font-semibold text-zinc-900">
        {feature.title}
      </h3>
      <p className="text-zinc-500 relative z-20 mt-2 text-xs font-light leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<'svg'> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
}) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy], index) => (
            <rect
              strokeWidth="0"
              key={index}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function genRandomPattern(length?: number): number[][] {
  const len = length ?? 5;
  return Array.from({ length: len }, () => [
    Math.floor(Math.random() * 4) + 7, // x between 7 and 10
    Math.floor(Math.random() * 6) + 1, // y between 1 and 6
  ]);
}

/**
 * Deterministic, content-addressed pattern. Same `seed` always returns the
 * same pattern, so SSR markup matches client hydration. Pure function — no
 * Math.random, no Date, no globals.
 */
function genDeterministicPattern(seed: string, length = 5): number[][] {
  let h1 = 0x811c9dc5;
  let h2 = 0xdeadbeef;
  for (let i = 0; i < seed.length; i++) {
    const ch = seed.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 0x01000193) >>> 0;
    h2 = Math.imul(h2 ^ ch, 0x85ebca6b) >>> 0;
  }
  const result: number[][] = [];
  for (let i = 0; i < length; i++) {
    const x = (h1 % 4) + 7; // 7..10
    const y = (h2 % 6) + 1; // 1..6
    result.push([x, y]);
    // mix for the next pair
    h1 = Math.imul(h1 ^ (h1 >>> 13), 0xc2b2ae35) >>> 0;
    h2 = Math.imul(h2 ^ (h2 >>> 16), 0x27d4eb2f) >>> 0;
  }
  return result;
}

export default FeatureCard;
