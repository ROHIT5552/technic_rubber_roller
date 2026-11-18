import React from "react";
import { COMPANY, CORE_VALUES, INFRASTRUCTURE_PILLARS } from "@/data/tecknikData";

export default function AboutUsPage() {
  return (
    <div className="bg-obsidian pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          ABOUT TECKNIK // SINCE {COMPANY.establishedYear}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-6xl">
          {COMPANY.name}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-steel-300">
          {COMPANY.aboutIntro}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="surface-machined rounded-md p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              OUR VISION
            </p>
            <p className="mt-3 text-base leading-relaxed text-steel-200">
              {COMPANY.vision}
            </p>
          </div>
          <div className="surface-machined rounded-md p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              OUR MISSION
            </p>
            <p className="mt-3 text-base leading-relaxed text-steel-200">
              {COMPANY.mission}
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Integrated Manufacturing Infrastructure
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-steel-400">
            {COMPANY.infrastructureIntro}
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INFRASTRUCTURE_PILLARS.map((pillar) => (
              <div key={pillar.index} className="surface-machined rounded-md p-6">
                <span className="font-mono text-xs text-accent">{pillar.index}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-steel-400">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Core Engineering Values
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((val) => (
              <div key={val.index} className="surface-machined rounded-md p-6">
                <span className="font-mono text-xs text-accent">{val.index}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">
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
    </div>
  );
}
