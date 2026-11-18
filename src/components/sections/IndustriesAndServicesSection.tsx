"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Factory, ShieldCheck, Wrench } from "lucide-react";
import {
  COMPANY,
  CORE_VALUES,
  INDUSTRIES,
  INFRASTRUCTURE_PILLARS,
  SERVICES,
  VERIFIED_METRICS,
} from "@/data/tecknikData";
import { useQuoteModal } from "@/context/QuoteModalContext";

export function IndustriesAndServicesSection() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <>
      {/* Verified Industrial Metrics Bar */}
      <section className="border-t border-white/10 bg-obsidian-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {VERIFIED_METRICS.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="surface-machined rounded-md p-6"
              >
                <p className="font-display text-4xl font-bold text-white sm:text-5xl">
                  <span className="metallic-text">{metric.value}</span>
                  {metric.suffix && (
                    <span className="figma-fire-text">{metric.suffix}</span>
                  )}
                </p>
                <p className="figma-fire-highlight mt-2 font-mono text-xs font-semibold uppercase tracking-[0.16em]">
                  {metric.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-steel-400">
                  {metric.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="relative overflow-hidden border-t border-white/10 bg-obsidian py-16 sm:py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="figma-section-mesh pointer-events-none absolute inset-0 opacity-85"
        />
        <div
          aria-hidden="true"
          className="figma-grain pointer-events-none absolute inset-0"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="figma-fire-highlight font-mono text-xs font-semibold uppercase tracking-[0.22em]">
              SECTOR APPLICATIONS // INDUSTRIAL REACH
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Engineered for High-Demand Industries
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry, idx) => (
              <motion.article
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="surface-machined group flex flex-col justify-between rounded-md p-6 transition-colors hover:border-accent/50"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-steel-500">
                    <span className="text-accent">SECTOR {industry.index}</span>
                    <Factory className="h-4 w-4 text-steel-500 transition-colors group-hover:text-accent" />
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-white">
                    {industry.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-steel-300">
                    {industry.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-steel-400">
                    {industry.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500">
                    Key Roller Stations
                  </p>
                  <p className="mt-1 text-xs font-medium text-steel-200">
                    {industry.rollerRole}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services & Facility Infrastructure */}
      <section className="border-t border-white/10 bg-obsidian-900 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="figma-fire-highlight font-mono text-xs font-semibold uppercase tracking-[0.22em]">
                CAPABILITIES // END-TO-END LIFECYCLE
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Manufacturing, Recoating & Grinding
              </h2>
            </div>
            <button
              type="button"
              onClick={() => openQuoteModal("Services & Recoating Inquiry")}
              className="inline-flex items-center gap-2 rounded-sm border border-accent/60 bg-accent/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:bg-accent hover:text-white"
            >
              <span>Schedule Roller Refurbishment</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="surface-machined rounded-md p-6 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    SERVICE {service.index}
                  </span>
                  <Wrench className="h-4 w-4 text-steel-500" />
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-steel-400">
                  {service.subtitle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-steel-300">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                  {service.keyPoints.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2.5 text-sm text-steel-300"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 4 Infrastructure Pillars */}
          <div className="mt-16">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-steel-400">
              IN-HOUSE INFRASTRUCTURE // CHIKALTHANA MIDC FACILITY
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {INFRASTRUCTURE_PILLARS.map((pillar) => (
                <div
                  key={pillar.index}
                  className="rounded-md border border-white/10 bg-obsidian-800/70 p-5"
                >
                  <span className="font-mono text-xs text-accent">
                    {pillar.index}
                  </span>
                  <h4 className="mt-2 font-display text-lg font-semibold text-white">
                    {pillar.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-steel-400">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values & Final CTA */}
      <section className="border-t border-white/10 bg-obsidian py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="figma-fire-highlight font-mono text-xs font-semibold uppercase tracking-[0.22em]">
                OUR ENGINEERING ETHOS
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                {COMPANY.tagline}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-steel-300">
                {COMPANY.aboutIntro}
              </p>
              <div className="mt-6 rounded-md border border-accent/25 bg-accent/5 p-5">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Direct Plant Technical Desk</span>
                </div>
                <p className="mt-2 text-sm text-steel-300">
                  Need custom rubber compounding, urgent core recoating, or
                  precision grinding? Share your drawings directly with our
                  engineers.
                </p>
                <button
                  type="button"
                  onClick={() => openQuoteModal("Custom Technical Specification")}
                  className="mt-4 inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-bright"
                >
                  <span>Start Technical Quote</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {CORE_VALUES.map((val) => (
                <div
                  key={val.index}
                  className="surface-machined rounded-md p-5"
                >
                  <span className="font-mono text-[11px] text-accent">
                    {val.index}
                  </span>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-white">
                    {val.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-steel-400">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
