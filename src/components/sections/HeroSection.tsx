"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Layers,
  Sparkles as SparklesIcon,
} from "lucide-react";
import { COMPANY } from "@/data/tecknikData";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { ROLLER_THEMES, useRollerTheme } from "@/context/RollerThemeContext";
import { WebGLBoundary } from "@/components/three/WebGLBoundary";
import { cn } from "@/lib/utils";

const HeroRollerScene = dynamic(
  () => import("@/components/three/HeroRollerScene"),
  { ssr: false }
);

function HeroFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-obsidian-900">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-steel-400">
          Initializing 3D Roller Studio...
        </p>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { openQuoteModal } = useQuoteModal();
  const { activeTheme, setActiveThemeById } = useRollerTheme();
  const [exploded, setExploded] = useState(false);

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-obsidian bg-industrial-grid bg-grid-64 pt-20 pb-12 sm:pt-24 sm:pb-16 lg:flex-row lg:items-center">
      {/* Figma Multi-Layered Fire/Compound Mesh Gradient + Animated Molten Plume */}
      <div
        aria-hidden="true"
        className="figma-fire-mesh pointer-events-none absolute -inset-8"
      />
      <div
        aria-hidden="true"
        className="figma-fire-plume pointer-events-none absolute inset-0"
      />
      {/* Tactile Figma Film-Grain / Noise Overlay */}
      <div
        aria-hidden="true"
        className="figma-grain pointer-events-none absolute inset-0 z-[1]"
      />

      {/* Interactive 3D Stage: Dedicated Unobstructed Viewport on Mobile/Tablet, Full-Bleed Backdrop on Desktop */}
      <div className="relative z-10 h-[270px] w-full shrink-0 sm:h-[360px] lg:absolute lg:inset-0 lg:z-0 lg:h-auto">
        <WebGLBoundary fallback={<HeroFallback />}>
          <HeroRollerScene
            rubberColor={activeTheme.rubberColor}
            accentColor={activeTheme.accentHex}
            grooveColor={activeTheme.grooveColor}
            sparkColor={activeTheme.sparkColor}
            rubberFinish={activeTheme.finish}
            exploded={exploded}
          />
        </WebGLBoundary>

        {/* Floating Technical Spec Callouts on 3D Stage */}
        <div className="pointer-events-none absolute left-4 top-3 z-20 lg:left-auto lg:right-10 lg:top-32">
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-obsidian-900/80 px-3 py-1.5 backdrop-blur-xl sm:px-4 sm:py-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-[11px] font-medium text-steel-100 sm:text-xs">
              Shells made in-house
            </span>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-3 right-4 z-20 lg:bottom-16 lg:right-12">
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-obsidian-900/80 px-3 py-1.5 backdrop-blur-xl sm:px-4 sm:py-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-[11px] font-medium text-steel-100 sm:text-xs">
              Ground to the drawing
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Left-Side Legibility Gradient Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[58%] bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent lg:block"
      />

      {/* Foreground Content */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-0">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-sm border border-accent/35 bg-accent/10 px-3 py-1.5 backdrop-blur-md transition-colors duration-300 sm:px-3.5"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            <span className="figma-fire-highlight font-mono text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px] sm:tracking-[0.2em]">
              EST. {COMPANY.establishedYear} // CHIKALTHANA MIDC
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-4 font-display text-4xl font-bold leading-[1.04] tracking-tight sm:mt-6 sm:text-6xl lg:text-7xl"
          >
            <span className="metallic-text">ENGINEERING</span>
            <br />
            <span className="text-white">PRECISION.</span>
            <br />
            <span className="figma-fire-plate transition-all duration-300">
              PERFORMANCE.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-4 max-w-xl text-sm leading-relaxed text-steel-300 sm:mt-6 sm:text-base lg:text-lg"
          >
            {COMPANY.scopeSummary}
          </motion.p>

          {/* Primary Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <button
              type="button"
              onClick={() => openQuoteModal("Hero 3D Roller Enquiry")}
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-sm bg-accent px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-accent-bright accent-glow sm:w-auto"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
            <a
              href="#manufacturing-3d"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-sm border border-white/15 bg-obsidian-800/80 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-steel-200 backdrop-blur-md transition-colors hover:border-accent/60 hover:text-white sm:w-auto"
            >
              <span>Watch 3D Process</span>
              <ArrowDown className="h-4 w-4 text-accent" />
            </a>
          </motion.div>

          {/* Interactive 3D Compound & Theme Switcher HUD */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-7 rounded-md border border-white/10 bg-obsidian-900/85 p-3.5 backdrop-blur-xl sm:mt-10 sm:p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-steel-400 sm:text-[11px] sm:tracking-[0.18em]">
                <SparklesIcon className="h-3.5 w-3.5 text-accent" />
                <span>Live 3D Compound & Theme</span>
              </div>
              <button
                type="button"
                onClick={() => setExploded((prev) => !prev)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-all sm:px-3 sm:text-[11px] sm:tracking-[0.14em]",
                  exploded
                    ? "border-accent bg-accent text-white"
                    : "border-white/15 bg-obsidian-800 text-steel-200 hover:border-accent/60"
                )}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>{exploded ? "Assemble Roller" : "Exploded 3D View"}</span>
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {ROLLER_THEMES.map((preset) => {
                const active = activeTheme.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setActiveThemeById(preset.id)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-sm border px-2.5 py-1.5 text-xs transition-all sm:px-3",
                      active
                        ? "border-accent/80 bg-accent/15 text-white"
                        : "border-white/10 bg-obsidian-800/70 text-steel-400 hover:border-white/25 hover:text-steel-200"
                    )}
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full border border-white/30"
                      style={{ backgroundColor: preset.swatch }}
                    />
                    <span>{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
