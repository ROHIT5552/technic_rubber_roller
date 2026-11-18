import React from "react";
import { ShieldCheck } from "lucide-react";
import { COMPANY, WHY_CHOOSE_POINTS } from "@/data/tecknikData";

const CLIENT_HIGHLIGHTS = [
  {
    sector: "Packaging & Converting Plant",
    quote:
      "Tecknik's precision-ground laminating rollers improved our web uniformity and noticeably reduced unplanned line stoppages.",
    metric: "Consistent Nip Uniformity",
  },
  {
    sector: "Continuous Textile Processing",
    quote:
      "Their recoating turnaround on our worn squeezing cores saved substantial replacement cost while matching new-roller durability.",
    metric: "Extended Core Lifecycle",
  },
  {
    sector: "Commercial Printing Press",
    quote:
      "Dependable surface finish and timely delivery across multiple repeat batches—our operators trust Tecknik rollers on high-speed runs.",
    metric: "Repeat Batch Precision",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="bg-obsidian pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          INDUSTRIAL TRUST // SINCE {COMPANY.establishedYear}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-6xl">
          Built for Long-Term Industrial Partnerships
        </h1>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CLIENT_HIGHLIGHTS.map((item) => (
            <div
              key={item.sector}
              className="surface-machined flex flex-col justify-between rounded-md p-7"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {item.sector}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-steel-200">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 font-mono text-xs text-steel-400">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span>{item.metric}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-md border border-white/10 bg-obsidian-900 p-8">
          <h2 className="font-display text-2xl font-bold text-white">
            Why Industrial Plants Choose Tecknik
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE_POINTS.map((point) => (
              <div
                key={point}
                className="rounded border border-white/10 bg-obsidian-800/70 px-4 py-3 text-sm text-steel-200"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
