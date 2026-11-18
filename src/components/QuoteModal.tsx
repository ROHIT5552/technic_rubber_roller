"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, Phone, Send, X } from "lucide-react";
import { COMPANY } from "@/data/tecknikData";
import { useQuoteModal } from "@/context/QuoteModalContext";

export function QuoteModal() {
  const { isOpen, preselectedSubject, closeQuoteModal } = useQuoteModal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    requirement: "",
    industry: "Printing",
    dimensions: "",
    notes: "",
  });

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setForm((prev) => ({
        ...prev,
        requirement: preselectedSubject || "Industrial Rubber Rollers",
      }));
    }
  }, [isOpen, preselectedSubject]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuoteModal();
    };
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeQuoteModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const mailtoHref = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
    `Quote Request: ${form.requirement || "Industrial Rubber Rollers"}`
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nEmail: ${form.email}\nIndustry: ${form.industry}\nDimensions/Specs: ${form.dimensions}\nDetails: ${form.notes}`
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={closeQuoteModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md border border-white/15 bg-obsidian-800 p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={closeQuoteModal}
              aria-label="Close quote modal"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded border border-white/10 text-steel-400 transition-colors hover:border-white/30 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
                TECHNICAL ENQUIRY // RFQ
              </p>
              <h2
                id="quote-modal-title"
                className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl"
              >
                Request a Roller Quotation
              </h2>
              <p className="mt-2 text-sm text-steel-400">
                Share your roller specifications, recoating scope, or grinding
                requirements. Our technical team responds directly from our
                Chikalthana MIDC facility.
              </p>
            </div>

            {submitted ? (
              <div className="space-y-5 rounded border border-accent/30 bg-accent/10 p-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-semibold text-white">
                    Enquiry Ready for Dispatch
                  </h3>
                  <p className="text-sm text-steel-300">
                    Thank you, {form.name || "Partner"}. You can send your
                    formatted enquiry directly to{" "}
                    <span className="text-white">{COMPANY.email}</span> or call
                    our plant desk immediately.
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-bright"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Open Email Client</span>
                  </a>
                  <a
                    href={`tel:${COMPANY.phones[0].replace(/\s+/g, "")}`}
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-accent"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call {COMPANY.phones[0]}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-steel-400">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Full Name"
                      className="w-full rounded-sm border border-white/10 bg-obsidian-900 px-3.5 py-2.5 text-sm text-white placeholder-steel-500 focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-steel-400">
                      Company / Plant Name
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      placeholder="Organization"
                      className="w-full rounded-sm border border-white/10 bg-obsidian-900 px-3.5 py-2.5 text-sm text-white placeholder-steel-500 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-steel-400">
                      Business Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="name@company.com"
                      className="w-full rounded-sm border border-white/10 bg-obsidian-900 px-3.5 py-2.5 text-sm text-white placeholder-steel-500 focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-steel-400">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full rounded-sm border border-white/10 bg-obsidian-900 px-3.5 py-2.5 text-sm text-white placeholder-steel-500 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-steel-400">
                      Product / Service Requirement
                    </label>
                    <input
                      type="text"
                      value={form.requirement}
                      onChange={(e) =>
                        setForm({ ...form, requirement: e.target.value })
                      }
                      placeholder="e.g. New Rubber Roller / Recoating / Grinding"
                      className="w-full rounded-sm border border-white/10 bg-obsidian-900 px-3.5 py-2.5 text-sm text-white placeholder-steel-500 focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-steel-400">
                      Industry Sector
                    </label>
                    <select
                      value={form.industry}
                      onChange={(e) =>
                        setForm({ ...form, industry: e.target.value })
                      }
                      className="w-full rounded-sm border border-white/10 bg-obsidian-900 px-3.5 py-2.5 text-sm text-white focus:border-accent focus:outline-none"
                    >
                      <option value="Printing">Printing</option>
                      <option value="Textile">Textile</option>
                      <option value="Steel">Steel</option>
                      <option value="Packaging">Packaging</option>
                      <option value="Paper">Paper</option>
                      <option value="Other Industrial">Other Industrial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-steel-400">
                    Roller Dimensions / Specification Notes
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                    placeholder="Share approximate outer diameter, face length, quantity, or recoating condition..."
                    className="w-full rounded-sm border border-white/10 bg-obsidian-900 px-3.5 py-2.5 text-sm text-white placeholder-steel-500 focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
                  <p className="font-mono text-[11px] text-steel-500">
                    Direct Desk: {COMPANY.phones[0]}
                  </p>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-bright sm:w-auto"
                  >
                    <span>Prepare Technical Quote</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
