"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Pause, Play, RotateCcw } from "lucide-react";
import { MANUFACTURING_STAGES } from "@/data/tecknikData";
import { useRollerTheme } from "@/context/RollerThemeContext";
import { WebGLBoundary } from "@/components/three/WebGLBoundary";
import { cn } from "@/lib/utils";

const ScrollRollerScene = dynamic(
  () => import("@/components/three/ScrollRollerScene"),
  { ssr: false }
);

const STAGE_PROGRESS_POINTS = [0.08, 0.27, 0.42, 0.59, 0.77, 0.94];

export function ManufacturingScrollSection() {
  const { activeTheme } = useRollerTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number>(0.08);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(8);
  const [autoPlay, setAutoPlay] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);

  // Sync scroll position when not in Auto-Play or Manual Stage Lock
  useEffect(() => {
    const handleScroll = () => {
      if (autoPlay || manualOverride || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const raw = -rect.top / totalScrollable;
      const clamped = Math.max(0, Math.min(1, raw));
      progressRef.current = clamped;
      setDisplayProgress(Math.round(clamped * 100));

      const idx = Math.min(
        MANUFACTURING_STAGES.length - 1,
        Math.floor(clamped * MANUFACTURING_STAGES.length)
      );
      setActiveIndex(idx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [autoPlay, manualOverride]);

  // Continuous 3D Cinematic Auto-Play Tour
  useEffect(() => {
    if (!autoPlay) return;
    let rafId = 0;
    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      let next = progressRef.current + dt * 0.065;
      if (next > 1) next = 0;
      progressRef.current = next;
      setDisplayProgress(Math.round(next * 100));

      const idx = Math.min(
        MANUFACTURING_STAGES.length - 1,
        Math.floor(next * MANUFACTURING_STAGES.length)
      );
      setActiveIndex(idx);
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [autoPlay]);

  const jumpToStage = (index: number) => {
    setAutoPlay(false);
    setManualOverride(true);
    const p = STAGE_PROGRESS_POINTS[index] ?? 0;
    progressRef.current = p;
    setActiveIndex(index);
    setDisplayProgress(Math.round(p * 100));
  };

  const stage = MANUFACTURING_STAGES[activeIndex] ?? MANUFACTURING_STAGES[0];

  return (
    <section
      id="manufacturing-3d"
      ref={containerRef}
      className="relative min-h-[210vh] border-t border-white/10 bg-obsidian-900 lg:min-h-[260vh]"
    >
      {/* Sticky Full-Viewport 3D Manufacturing Stage */}
      <div className="sticky top-0 flex min-h-screen flex-col justify-between overflow-hidden pt-20 pb-5 sm:pt-24 sm:pb-8">
        {/* Figma Layered Fire Mesh & Grain Backdrop */}
        <div
          aria-hidden="true"
          className="figma-fire-mesh pointer-events-none absolute -inset-8 opacity-75"
        />
        <div
          aria-hidden="true"
          className="figma-grain pointer-events-none absolute inset-0 z-[1]"
        />

        {/* Background 3D Canvas */}
        <div className="absolute inset-0 z-0">
          <WebGLBoundary
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-obsidian-900 font-mono text-xs text-steel-400">
                Loading 6-Stage 3D Manufacturing Bay...
              </div>
            }
          >
            <ScrollRollerScene
              progressRef={progressRef}
              rubberColor={activeTheme.rubberColor}
              accentColor={activeTheme.accentHex}
              sparkColor={activeTheme.sparkColor}
            />
          </WebGLBoundary>
        </div>

        {/* Subtle Top/Bottom Vignettes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36 bg-gradient-to-b from-obsidian-900 via-obsidian-900/65 to-transparent sm:h-44"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-60 bg-gradient-to-t from-obsidian-900 via-obsidian-900/80 to-transparent"
        />

        {/* Top Header & Playback Controls */}
        <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col justify-between gap-3 px-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-4 sm:px-6 lg:px-8">
          <div>
            <p className="figma-fire-highlight font-mono text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.22em]">
              3D SCROLL MANUFACTURING FILM // 6 STAGES
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-white sm:mt-2 sm:text-3xl lg:text-4xl">
              From Bare Steel Core to Precision Ground Finish
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setManualOverride(false);
                setAutoPlay((prev) => !prev);
              }}
              className={cn(
                "inline-flex items-center gap-2 rounded-sm border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all sm:px-4 sm:text-xs",
                autoPlay
                  ? "border-accent bg-accent text-white accent-glow"
                  : "border-white/15 bg-obsidian-800/90 text-white hover:border-accent"
              )}
            >
              {autoPlay ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  <span>Pause 3D Tour</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 text-accent" />
                  <span>Auto-Play 3D Tour</span>
                </>
              )}
            </button>

            {manualOverride && (
              <button
                type="button"
                onClick={() => setManualOverride(false)}
                className="inline-flex items-center gap-1.5 rounded-sm border border-white/15 bg-obsidian-800/80 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-steel-300 hover:border-white/35 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Scroll Sync</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Telemetry Card & Stage Scrubber */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:gap-5 lg:grid-cols-12 lg:items-end lg:gap-6">
            {/* Active Stage Telemetry Readout */}
            <div className="surface-machined rounded-md p-4 backdrop-blur-xl sm:p-5 lg:col-span-5">
              <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.16em] sm:text-[11px] sm:tracking-[0.18em]">
                <span className="text-accent">{stage.telemetryLabel}</span>
                <span className="text-steel-400">{displayProgress}%</span>
              </div>
              <h3 className="mt-1.5 font-display text-lg font-bold text-white sm:mt-2 sm:text-2xl">
                {stage.title}
              </h3>
              <p className="mt-0.5 font-mono text-[11px] text-steel-400 sm:mt-1 sm:text-xs">
                {stage.subtitle}
              </p>
              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-steel-300 sm:mt-3 sm:line-clamp-none sm:text-sm">
                {stage.description}
              </p>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-obsidian-700 sm:mt-4">
                <div
                  className="h-full bg-accent transition-all duration-150"
                  style={{ width: `${displayProgress}%` }}
                />
              </div>
            </div>

            {/* Interactive 6-Stage Selector Pills */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 lg:col-span-7">
              {MANUFACTURING_STAGES.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => jumpToStage(idx)}
                    className={cn(
                      "rounded-sm border p-2 text-left transition-all backdrop-blur-md sm:p-3",
                      isActive
                        ? "border-accent bg-accent/15 text-white"
                        : "border-white/10 bg-obsidian-800/75 text-steel-400 hover:border-white/25 hover:text-steel-100"
                    )}
                  >
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] sm:text-[10px] sm:tracking-[0.16em]">
                      <span className={isActive ? "text-accent" : "text-steel-500"}>
                        STG {item.index}
                      </span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      )}
                    </div>
                    <p className="mt-0.5 truncate font-display text-xs font-semibold sm:mt-1 sm:text-sm">
                      {item.shortTitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
