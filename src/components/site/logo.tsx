"use client";

import { BRAND } from "@/lib/brand";

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" role="img" aria-label={`${BRAND.name} logo`}>
        <title>{`${BRAND.name} logo`}</title>
        <rect width="40" height="40" rx="10" fill="url(#sf-logo-g)" />
        <defs>
          <linearGradient id="sf-logo-g" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10b981" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <g fill="#fff">
          <rect x="9" y="9" width="8" height="8" rx="2" />
          <rect x="23" y="9" width="8" height="8" rx="2" />
          <rect x="9" y="23" width="8" height="8" rx="2" />
          <rect x="21" y="21" width="4" height="4" rx="1" />
          <rect x="27" y="21" width="4" height="4" rx="1" />
          <rect x="21" y="27" width="4" height="4" rx="1" />
          <rect x="27" y="27" width="4" height="4" rx="1" />
        </g>
      </svg>
      <span className="text-lg font-bold tracking-tight">{BRAND.name}</span>
    </span>
  );
}
