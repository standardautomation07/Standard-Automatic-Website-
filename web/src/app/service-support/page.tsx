import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { Media } from "@/components/ui/media";
import { ArrowRight, Check } from "@/components/ui/icons";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/button";
import { familyById, familyPath } from "@/lib/catalog";
import type { FamilyId } from "@/lib/types";

export const metadata: Metadata = {
  title: "Service & Support",
  description:
    "Site survey, installation and commissioning, handover, and service and spares support for entrance automation, industrial doors, shutters, gates, loading bay equipment and access control.",
  alternates: { canonical: "/service-support" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Service & Support", path: "/service-support" },
];

const stages = [
  {
    t: "Site survey",
    d: "The opening is measured and assessed in place: clear dimensions, headroom, side room, floor condition and fall, wind exposure, available supply, and the traffic it actually carries. Most specification errors are made before this step is finished.",
  },
  {
    t: "Specification and quotation",
    d: "Product type, drive sizing and the safety layer follow from the survey. Where a figure cannot be supported it is marked to be confirmed rather than guessed, and the configuration is agreed before the quotation is issued.",
  },
  {
    t: "Installation and commissioning",
    d: "Installation, limit setting and function testing of every safety device — photocells, safety edges, obstruction detection, anti-fall and release mechanisms — before the opening is handed over.",
  },
  {
    t: "Handover",
    d: "The people who will use the opening are shown normal operation, the manual release, and what to do when it does not work. An opening nobody can release by hand is an opening waiting to trap someone.",
  },
  {
    t: "Service and spares",
    d: "Scheduled inspection intervals driven by cycle count rather than the calendar, and support for the wear items that actually fail: curtains, seals, springs, cables, chains, sensors and bottom beams.",
  },
];

const checks = [
  "Safety devices function-tested at every visit",
  "Travel limits and stop positions re-checked",
  "Guides, tracks and the running surface cleared and inspected",
  "Manual release operated and confirmed",
  "Wear items reported before they fail, not after",
];

const supportedFamilies: Array<{ id: FamilyId; detail: string }> = [
  { id: "high-speed-doors", detail: "Maintenance and commissioning for high-frequency industrial openings." },
  { id: "rolling-shutters", detail: "Inspection of curtains, guides, drives, seals and wear items." },
  { id: "automatic-gates", detail: "Gate automation support, safety checks and manual release review." },
  { id: "loading-bay", detail: "Support for dock levellers, shelters and loading-bay interfaces." },
];

export default function ServiceSupportPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <section className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0 overflow-hidden">
          <Media id="installation" sizes="100vw" priority decorative className="img-settle opacity-55" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/20" />
        <div className="grid-fine absolute inset-0" aria-hidden="true" />
        <div className="hero-in shell relative flex min-h-[24rem] flex-col justify-end py-14 lg:min-h-[32rem] lg:py-20">
          <Breadcrumb trail={trail} tone="dark" />
          <p className="eyebrow mt-8 text-amber">Service & Support</p>
          <h1 className="mt-5 max-w-3xl text-display-2 text-white">
            An opening is only finished when someone can work it by hand.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-steel-300 lg:text-lg">
            Survey, specification, installation, commissioning and the support that keeps the
            opening running afterwards.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <div className="shell" data-reveal>
          <SectionHeading index="01" eyebrow="How we work" title="Five stages, in order" />
          <ol className="mt-12">
            {stages.map((stage, index) => (
              <li
                key={stage.t}
                className="grid gap-x-8 gap-y-3 border-t border-line py-8 last:border-b lg:grid-cols-12"
              >
                <span className="font-mono text-xs text-amber lg:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-xl font-medium text-steel-900 lg:col-span-4">
                  {stage.t}
                </h2>
                <p className="text-sm leading-relaxed text-steel-700 lg:col-span-7">{stage.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line bg-paper-sunken py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16" data-reveal>
          <div className="lg:col-span-6">
            <SectionHeading
              index="02"
              eyebrow="Maintenance"
              title="What a service visit should actually cover"
              lede="Cycle count, not calendar time, is what wears an automated opening. A maintenance interval set by the calendar on a door that runs four hundred times a day is a schedule that will be overtaken by the failure."
            />
            <ul className="mt-10 space-y-4">
              {checks.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-steel-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="border border-line bg-paper-raised p-8">
              <h2 className="eyebrow text-steel-500">Support and spares</h2>
              <p className="mt-5 text-base leading-relaxed text-steel-700">
                For a breakdown, a spare, or a maintenance visit, call or message us directly with
                the site and the opening. If you have the original order reference it speeds things
                up, but it is not required.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-steel-600">
                Annual maintenance contract terms, response times and coverage are agreed per site.
                We do not publish a service level here that we have not agreed with you.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={telHref()} variant="primary">
                  Call {siteConfig.phone}
                </ButtonLink>
                <ButtonLink
                  href={whatsappHref("Hello Standard Automation, I need service support.")}
                  variant="secondary"
                >
                  WhatsApp support
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-20">
        <div className="shell" data-reveal>
          <SectionHeading
            index="03"
            eyebrow="Product support"
            title="Support organised around the opening"
            lede="Choose the product family that matches the opening so the site information, maintenance questions and spare requirements start in the right place."
          />
          <ul className="mt-10 grid hairline-grid md:grid-cols-2 xl:grid-cols-4">
            {supportedFamilies.map(({ id, detail }) => {
              const family = familyById[id];
              return (
                <li key={id} className="bg-paper-raised">
                  <Link href={familyPath(id)} className="group block h-full p-7">
                    <h2 className="font-display text-lg font-medium text-steel-900 group-hover:text-amber-deep">
                      {family.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-steel-600">{detail}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-steel-800">
                      View family <ArrowRight className="h-4 w-4 text-amber transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Need an opening looked at?"
        lede="Tell us the site, the product and what it is doing wrong, and we will get someone to it."
        whatsappMessage="Hello Standard Automation, I need service support."
      />
    </>
  );
}
