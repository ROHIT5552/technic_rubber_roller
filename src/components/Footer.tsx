"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  COMPANY,
  NAV_LINKS,
  WHY_CHOOSE_POINTS,
} from "@/data/tecknikData";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { TecknikLogo } from "@/components/TecknikLogo";

export function Footer() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <footer className="relative border-t border-white/10 bg-obsidian-900 text-steel-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12">
          {/* Column 1: Brand Identity */}
          <div className="space-y-5 lg:col-span-4">
            <Link href="/" className="group inline-block" aria-label={COMPANY.name}>
              <TecknikLogo className="h-14 sm:h-16" />
            </Link>

            <p className="font-display text-lg font-medium text-white">
              {COMPANY.tagline}
            </p>
            <p className="text-sm leading-relaxed text-steel-400">
              {COMPANY.scopeSummary}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tecknik on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded border border-white/10 bg-obsidian-800 text-steel-300 transition-colors hover:border-accent hover:text-accent"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={COMPANY.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tecknik on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded border border-white/10 bg-obsidian-800 text-steel-300 transition-colors hover:border-accent hover:text-accent"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={COMPANY.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tecknik on LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded border border-white/10 bg-obsidian-800 text-steel-300 transition-colors hover:border-accent hover:text-accent"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-steel-400 transition-colors hover:text-white"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100 text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Why Choose Us (Verified Live Site Checklist) */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Why Choose Tecknik
            </h3>
            <ul className="mt-5 space-y-2.5">
              {WHY_CHOOSE_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm text-steel-400"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Verified Contact Details */}
          <div className="space-y-4 lg:col-span-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Facility & Contact
            </h3>
            <div className="mt-5 space-y-3.5 text-sm text-steel-400">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{COMPANY.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div className="flex flex-col gap-1">
                  {COMPANY.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="transition-colors hover:text-white"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="transition-colors hover:text-white"
                >
                  {COMPANY.email}
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openQuoteModal("Footer Quote Request")}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-accent/60 bg-accent/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:bg-accent hover:text-white"
            >
              <span>Request a Technical Quote</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-steel-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. All Rights Reserved.
          </p>
          <p className="font-mono tracking-wider text-steel-500">
            ESTABLISHED {COMPANY.establishedYear} • CHIKALTHANA MIDC, INDIA
          </p>
        </div>
      </div>
    </footer>
  );
}
