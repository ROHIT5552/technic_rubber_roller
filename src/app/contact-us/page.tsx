import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { COMPANY } from "@/data/tecknikData";

export default function ContactUsPage() {
  return (
    <div className="bg-obsidian pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          CONTACT FACILITY // CHIKALTHANA MIDC
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-6xl">
          Get in Touch With Our Technical Team
        </h1>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <div className="surface-machined rounded-md p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-steel-400">
                    Manufacturing Facility
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-steel-100">
                    {COMPANY.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-machined rounded-md p-6">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-steel-400">
                    Direct Phone Lines
                  </p>
                  <div className="mt-2 flex flex-col gap-1">
                    {COMPANY.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="text-sm font-medium text-steel-100 hover:text-accent"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="surface-machined rounded-md p-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-steel-400">
                    Email Desk
                  </p>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="mt-2 block text-sm font-medium text-steel-100 hover:text-accent"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="surface-machined overflow-hidden rounded-md lg:col-span-7">
            <iframe
              title="Tecknik Rubber Roller Products Location"
              src={COMPANY.mapEmbedUrl}
              className="h-[420px] w-full border-0 grayscale invert-[0.9] contrast-[1.1]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
