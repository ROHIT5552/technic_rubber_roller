"use client";

import React from "react";
import { COMPANY } from "@/data/tecknikData";
import { cn } from "@/lib/utils";

interface TecknikLogoProps {
  className?: string;
}

/**
 * Official Tecknik Rubber Roller Products brand mark with dual-layer rendering:
 * - Base layer: crisp white roller emblem, "TECKNIK", and "PRODUCTS"
 * - Masked accent layer: "RUBBER ROLLER" dynamically painted with the active
 *   roller compound theme color (`bg-accent` -> `rgb(var(--accent-rgb))`).
 */
export function TecknikLogo({ className }: TecknikLogoProps) {
  return (
    <div
      className={cn(
        "relative aspect-[852/394] shrink-0 select-none transition-opacity group-hover:opacity-90",
        className
      )}
    >
      {/* Crisp white base layer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/tecknik/logo-base.png"
        alt={COMPANY.name}
        width={852}
        height={394}
        className="block h-full w-full object-contain"
        decoding="async"
      />

      {/* Dynamic theme-colored "RUBBER ROLLER" text layer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-accent transition-colors duration-300"
        style={{
          WebkitMaskImage: "url('/images/tecknik/logo-accent-mask.png')",
          maskImage: "url('/images/tecknik/logo-accent-mask.png')",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </div>
  );
}
