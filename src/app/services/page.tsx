import React from "react";
import { Check } from "lucide-react";
import { SERVICES } from "@/data/tecknikData";
import { ManufacturingScrollSection } from "@/components/sections/ManufacturingScrollSection";

export default function ServicesPage() {
  return (
    <div className="bg-obsidian pt-32">
      <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          INDUSTRIAL SERVICES // COMPLETE LIFECYCLE
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-6xl">
          Manufacturing, Recoating & Grinding
        </h1>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => (
            <div key={service.id} className="surface-machined rounded-md p-8">
              <span className="font-mono text-xs text-accent">
                SERVICE {service.index}
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-white">
                {service.title}
              </h2>
              <p className="mt-1 font-mono text-xs text-steel-400">
                {service.subtitle}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-steel-300">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                {service.keyPoints.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-steel-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <ManufacturingScrollSection />
    </div>
  );
}
