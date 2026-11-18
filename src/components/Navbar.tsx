"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/data/tecknikData";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { TecknikLogo } from "@/components/TecknikLogo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { openQuoteModal } = useQuoteModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-white/10 bg-obsidian/90 py-2.5 backdrop-blur-xl sm:py-3"
            : "bg-gradient-to-b from-obsidian/90 via-obsidian/45 to-transparent py-3.5 sm:py-5"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          {/* Official Brand Mark (dynamic theme-synced "RUBBER ROLLER" text) */}
          <Link
            href="/"
            className="group flex shrink-0 items-center focus:outline-none"
            aria-label={COMPANY.name}
          >
            <TecknikLogo className="h-9 sm:h-11 lg:h-12" />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_LINKS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3.5 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors",
                    active
                      ? "text-white"
                      : "text-steel-400 hover:text-steel-100"
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active-bar"
                      className="absolute inset-x-3.5 -bottom-0.5 h-[2px] bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={`tel:${COMPANY.phones[0].replace(/\s+/g, "")}`}
              className="flex items-center gap-2 font-mono text-xs text-steel-300 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-accent" />
              <span>{COMPANY.phones[0]}</span>
            </a>
            <button
              type="button"
              onClick={() => openQuoteModal("General Roller Enquiry")}
              className="group inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-accent-bright orange-glow"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Quick Actions + Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => openQuoteModal("Mobile Header Enquiry")}
              className="inline-flex items-center gap-1 rounded-sm bg-accent px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent-bright sm:px-3.5 sm:text-xs"
            >
              <span>Quote</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded border border-white/15 bg-obsidian-800/80 text-white"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-obsidian/98 px-5 pb-8 pt-24 backdrop-blur-2xl sm:px-6 lg:hidden"
          >
            <nav className="flex flex-col divide-y divide-white/10">
              {NAV_LINKS.map((item, idx) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between py-4 font-display text-2xl font-semibold tracking-tight transition-colors",
                      active ? "text-accent" : "text-white hover:text-accent"
                    )}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-steel-500">
                      0{idx + 1}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <div className="space-y-1 font-mono text-xs text-steel-400">
                <p>{COMPANY.phones.join("  |  ")}</p>
                <p>{COMPANY.email}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openQuoteModal("Mobile Enquiry");
                }}
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-accent py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
