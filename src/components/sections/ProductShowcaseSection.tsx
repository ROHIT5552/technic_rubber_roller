"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, Check, Layers, Move3d } from "lucide-react";
import { PRODUCTS } from "@/data/tecknikData";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { useRollerTheme } from "@/context/RollerThemeContext";
import { WebGLBoundary } from "@/components/three/WebGLBoundary";
import { cn } from "@/lib/utils";

const ProductMiniRollerScene = dynamic(
  () => import("@/components/three/ProductMiniRollerScene"),
  { ssr: false }
);

export function ProductShowcaseSection() {
  const { openQuoteModal } = useQuoteModal();
  const { activeTheme } = useRollerTheme();
  const [selectedId, setSelectedId] = useState(PRODUCTS[0].id);
  const [exploded, setExploded] = useState(false);

  const activeProduct =
    PRODUCTS.find((p) => p.id === selectedId) ?? PRODUCTS[0];

  return (
    <section
      id="products"
      className="relative overflow-hidden border-t border-white/10 bg-obsidian py-16 sm:py-24 lg:py-32"
    >
      {/* Figma Tonal Fire/Compound Mesh & Micro-Grain Texture */}
      <div
        aria-hidden="true"
        className="figma-section-mesh pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="figma-grain pointer-events-none absolute inset-0"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-6">
          <div>
            <p className="figma-fire-highlight font-mono text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.22em]">
              INTERACTIVE 3D CATALOG // ENGINEERED ROLLERS
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Precision Roller Portfolio
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-steel-400">
            Select a roller architecture below to inspect its 3D surface finish,
            rotate 360 degrees, or separate the elastomer sleeve from the
            machined steel core.
          </p>
        </div>

        {/* Product Selector Tabs */}
        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-3 lg:grid-cols-4">
          {PRODUCTS.map((product) => {
            const active = product.id === activeProduct.id;
            return (
              <button
                key={product.id}
                type="button"
                onClick={() => setSelectedId(product.id)}
                className={cn(
                  "rounded-md border p-3 text-left transition-all sm:p-4",
                  active
                    ? "border-accent bg-accent/10 text-white"
                    : "border-white/10 bg-obsidian-900 text-steel-400 hover:border-white/25 hover:text-steel-100"
                )}
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] sm:text-[11px] sm:tracking-[0.16em]">
                  <span className={active ? "text-accent" : "text-steel-500"}>
                    {product.code}
                  </span>
                  <span className="text-[9px] text-steel-500 sm:text-[10px]">
                    {product.rubberFinish}
                  </span>
                </div>
                <p className="mt-1.5 font-display text-sm font-semibold sm:mt-2 sm:text-base">
                  {product.name}
                </p>
              </button>
            );
          })}
        </div>

        {/* Interactive 3D Viewport + Specifications Panel */}
        <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-12 lg:gap-8">
          {/* 3D Interactive Stage */}
          <div className="surface-machined relative flex min-h-[300px] flex-col overflow-hidden rounded-md sm:min-h-[420px] lg:col-span-7 lg:min-h-[520px]">
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-steel-300 sm:text-[11px] sm:tracking-[0.16em]">
                <Move3d className="h-4 w-4 text-accent" />
                <span>Drag to Orbit 3D • {activeProduct.code}</span>
              </div>
              <button
                type="button"
                onClick={() => setExploded((prev) => !prev)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-all sm:gap-2 sm:px-3 sm:text-[11px] sm:tracking-[0.14em]",
                  exploded
                    ? "border-accent bg-accent text-white"
                    : "border-white/15 bg-obsidian-800 text-steel-200 hover:border-accent"
                )}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>{exploded ? "Assemble Core" : "Explode Assembly"}</span>
              </button>
            </div>

            <div
              className="relative flex-1 transition-all duration-500"
              style={{
                background:
                  "radial-gradient(ellipse 68% 58% at 50% 48%, rgb(var(--mesh-hot-rgb) / 0.22) 0%, rgb(var(--mesh-mid-rgb) / 0.14) 38%, rgb(var(--mesh-deep-rgb) / 0.18) 62%, transparent 80%)",
              }}
            >
              <WebGLBoundary
                fallback={
                  <div className="flex h-full items-center justify-center font-mono text-xs text-steel-400">
                    Loading 3D Product Model...
                  </div>
                }
              >
                <ProductMiniRollerScene
                  rubberFinish={activeProduct.rubberFinish}
                  rubberColorOverride={activeTheme.rubberColor}
                  accentColor={activeTheme.accentHex}
                  exploded={exploded}
                />
              </WebGLBoundary>
            </div>
          </div>

          {/* Specification Sheet */}
          <div className="surface-machined flex flex-col justify-between rounded-md p-6 sm:p-8 lg:col-span-5">
            <div>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
                <span className="text-accent">{activeProduct.code}</span>
                <span className="text-steel-600">//</span>
                <span className="text-steel-400">{activeProduct.category}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                {activeProduct.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-steel-300">
                {activeProduct.fullDescription}
              </p>

              {/* Specifications Table */}
              <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {activeProduct.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col justify-between gap-1 py-3 sm:flex-row sm:items-center"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel-500">
                      {spec.label}
                    </span>
                    <span className="text-sm font-medium text-steel-100">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <ul className="mt-6 space-y-2.5">
                {activeProduct.highlights.map((hl) => (
                  <li
                    key={hl}
                    className="flex items-start gap-2.5 text-sm text-steel-300"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <button
                type="button"
                onClick={() => openQuoteModal(activeProduct.name)}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all hover:bg-accent-bright orange-glow"
              >
                <span>Request Quote for {activeProduct.code}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
