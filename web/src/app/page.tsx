import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import {
  counts,
  families,
  featuredProducts,
  industries,
  productsForIndustry,
} from "@/lib/catalog";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FamilyTile, ProductCard } from "@/components/product/cards";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Media } from "@/components/ui/media";
import { TrustedPartners } from "@/components/clients/trusted-partners";
import { ArrowRight, Check, Phone, WhatsApp } from "@/components/ui/icons";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";
import { families as familyList } from "@/data/families";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Industrial Doors, Entrance Automation & Access Control in Pune",
  description:
    "Standard Automatic Solutions supplies industrial doors, entrance automation, rolling shutters, automatic gates, loading bay systems and access control for factories, warehouses and commercial sites across Pune and India.",
  alternates: { canonical: "/" },
};

const capabilities = [
  {
    k: "Survey",
    t: "The opening, measured",
    d: "Clear width and height, headroom, side room, floor condition, wind exposure and the traffic the opening actually carries. Most specification errors are made before this step is finished.",
  },
  {
    k: "Specify",
    t: "Constraint before catalogue",
    d: "Product type, drive sizing and safety layer follow from those constraints. Duty cycle sizes the drive; what the opening separates chooses the leaf.",
  },
  {
    k: "Manufacture",
    t: "Made to the opening",
    d: "Shutters, gates and door assemblies are manufactured and supplied to the surveyed dimensions rather than cut down from a stock size.",
  },
  {
    k: "Install",
    t: "Commissioned, not just fitted",
    d: "Installation, limit setting, safety device testing and a handover that covers manual release and safe operation for the people who will use it.",
  },
];

const whyPoints = [
  {
    title: "Specified against the opening, not a catalogue",
    body: "Clear width, headroom, side-run, duty cycle, wind exposure and what the opening has to separate. Those constraints decide the product — which is why the same width can call for three different doors on three different sites.",
  },
  {
    title: "Safety designed in, not bolted on",
    body: "Photocells, safety edges, obstruction detection, anti-fall devices and manual release are part of the specification from the start. A powered leaf that cannot be stopped or released by hand is not finished.",
  },
  {
    title: "We publish what we can support",
    body: "Specification tables appear where we can stand behind the figures and are marked to be confirmed where we cannot. No fire rating is published without a certificate for the installed assembly.",
  },
  {
    title: "One company from survey to service",
    body: "Supply, installation and after-sales support sit together, so the site survey, the specification and the commissioning are answerable to the same team.",
  },
];

/**
 * Applied to supporting content so it is painted on a desktop and not on a
 * phone. A media query rather than a conditional render: this site is crawled
 * mobile-first, so content dropped from the mobile DOM is dropped from the
 * index. Hidden this way it stays in the HTML and stays crawlable.
 */
const MOBILE_ONLY_DESKTOP = "hidden lg:block";

export default function HomePage() {
  const formProducts = products.map(({ id, name, familyId }) => ({ id, name, familyId }));
  const formFamilies = familyList.map(({ id, name }) => ({ id, name }));

  return (
    <>
      {/* 01 — Hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0 overflow-hidden">
          <Media id="hero-facility" sizes="100vw" priority className="img-settle" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />
        <div className="grid-fine absolute inset-0" aria-hidden="true" />

        <div className="shell relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-end pb-10 pt-24 lg:min-h-[calc(100svh-5.5rem)] lg:pb-14 lg:pt-32">
          <div className="hero-in max-w-5xl">
            <p className="eyebrow flex items-center gap-3 text-amber">
              <span className="h-px w-8 bg-amber" aria-hidden="true" />
              Entrance Automation & Industrial Access
            </p>

            <h1 className="mt-7 text-display-1 text-white">
              Engineered access.
              <br />
              <span className="text-steel-400">Specified against the opening.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-steel-300 lg:text-lg">
              <Link href="/products/high-speed-doors" className="font-medium text-white underline-offset-4 hover:underline">
                High speed doors
              </Link>, industrial doors, rolling shutters, automatic gates, loading bay equipment and access control for factories, warehouses, commercial buildings and logistics sites across Pune and India.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/products" variant="primary" size="lg">
                Explore products
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="#enquiry" variant="onDark" size="lg">
                Request a Quote
              </ButtonLink>
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-7 lg:mt-20 lg:grid-cols-4" data-reveal-group>
            {[
              { k: "Product families", v: String(counts.families) },
              { k: "Categories", v: String(counts.categories) },
              { k: "Products", v: String(counts.products) },
              { k: "Established", v: String(siteConfig.foundedYear) },
            ].map((stat) => (
              <div key={stat.k}>
                <dt className="eyebrow text-steel-500">{stat.k}</dt>
                <dd className="mt-2 font-display text-2xl text-white lg:text-3xl">{stat.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 02 — Product families */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="shell" data-reveal>
          <SectionHeading
            index="02"
            eyebrow="Product families"
            align="between"
            title={`${counts.families} families, grouped by how they work.`}
            lede="From the vehicle gate at the boundary to the pedestrian lane in the lobby, specified against what each opening actually has to do."
            action={
              <ButtonLink href="/products" variant="secondary">
                All products
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            }
          />

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-steel-600">
            Explore <Link href="/products/high-speed-doors" className="font-medium text-steel-900 underline-offset-4 hover:underline">High speed doors</Link>, <Link href="/products/rolling-shutters" className="font-medium text-steel-900 underline-offset-4 hover:underline">Rolling shutters</Link>, <Link href="/products/loading-bay" className="font-medium text-steel-900 underline-offset-4 hover:underline">Loading bay equipment</Link> and <Link href="/products/automatic-gates" className="font-medium text-steel-900 underline-offset-4 hover:underline">Automatic gates</Link> for industrial and commercial openings.
          </p>

          <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-6 lg:gap-4" data-reveal-group>
            {families.map((family, index) => (
              <li key={family.id} className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                <FamilyTile family={family} index={index} size={index < 2 ? "lg" : "md"} priority={index < 2} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 — Solutions by industry */}
      <section className="bg-ink py-20 lg:py-28">
        <div className="shell" data-reveal>
          <SectionHeading
            index="03"
            eyebrow="Solutions by industry"
            tone="dark"
            align="between"
            title="Where these systems go to work."
            action={
              <ButtonLink href="/industries" variant="onDark">
                All industries
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            }
          />

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-steel-300">
            Start with <Link href="/industries/warehousing-logistics" className="font-medium text-white underline-offset-4 hover:underline">Warehousing & logistics</Link> for high-frequency loading and dispatch openings, or review the full range by sector.
          </p>

          <ul className="mt-14 grid hairline-grid-dark sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {industries.map((industry, index) => (
              <li
                key={industry.id}
                className={`group relative aspect-[4/3] overflow-hidden bg-ink ${
                  index >= 4 ? MOBILE_ONLY_DESKTOP : ""
                }`}
              >
                <Media
                  id={industry.imageId}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  decorative
                  className="img-zoom opacity-60 transition-opacity duration-700 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-lg font-medium text-white">
                    <Link href={`/industries/${industry.id}`} className="before:absolute before:inset-0">
                      {industry.name}
                    </Link>
                  </h3>
                  <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-steel-400">
                    {productsForIndustry(industry.id).length} products
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — Engineering capabilities */}
      <section className="border-b border-line bg-paper-sunken py-20 lg:py-28">
        <div className="shell" data-reveal>
          <SectionHeading
            index="04"
            eyebrow="Engineering capabilities"
            title="Four steps, in this order."
            lede="An opening is an engineering problem before it is a product choice. Reversing these steps is what produces a door that is technically correct and practically wrong."
          />
          <div className="mt-14 grid hairline-grid md:grid-cols-2 xl:grid-cols-4" data-reveal-group>
            {capabilities.map((item, index) => (
              <article key={item.k} className="bg-paper-raised p-7">
                <p className="font-mono text-xs text-amber">{String(index + 1).padStart(2, "0")}</p>
                <p className="eyebrow mt-4 text-amber-deep">{item.k}</p>
                <h3 className="mt-3 font-display text-lg font-medium text-steel-900">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{item.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Selected products */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="shell" data-reveal>
          <SectionHeading
            index="05"
            eyebrow="Selected products"
            align="between"
            title="A representative product from six families."
            action={
              <ButtonLink href="/products/catalogue" variant="secondary">
                Browse all {counts.products}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            }
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3" data-reveal-group>
            {featuredProducts.map((product, index) => (
              <div key={product.id} className={index >= 3 ? MOBILE_ONLY_DESKTOP : ""}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Trusted partners */}
      <TrustedPartners index="06" variant="marquee" />

      {/* 07 — Why Standard Automatic */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16" data-reveal>
          <div className="lg:col-span-5">
            <SectionHeading
              index="07"
              eyebrow="Why Standard Automatic"
              title="The failure modes here are predictable."
              lede="An operator sized for weight but not duty. A safety layer added after commissioning. A door specified for a width rather than for what it has to separate. A fire rating quoted from a brochure instead of a certificate."
            />
            <div className="mt-10">
              <ButtonLink href="/about" variant="secondary">
                About the company
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>

          <ul className="lg:col-span-7">
            {whyPoints.map((point, index) => (
              <li key={point.title} className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-line py-8 last:border-b">
                <span className="font-mono text-xs text-amber">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-lg font-medium text-steel-900">{point.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel-600">{point.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 08 — Service & support */}
      <section className="border-y border-line bg-paper-sunken py-20 lg:py-28">
        <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16" data-reveal>
          <div className="group relative aspect-[4/3] overflow-hidden lg:col-span-6">
            <Media id="installation" sizes="(min-width: 1024px) 50vw, 100vw" className="img-zoom" />
          </div>
          <div className="lg:col-span-6">
            <SectionHeading
              index="08"
              eyebrow="Service & support"
              title="The specification is only half of it."
              lede="A correctly chosen door still fails if the guides are out of plumb, the limits are set wrong, or nobody has explained the manual release to the people who use it."
            />
            <ul className="mt-10 space-y-4">
              {[
                "Site survey against the actual opening and traffic",
                "Installation, commissioning and limit setting",
                "Handover covering manual release and safety checks",
                "Service, spares and maintenance support",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-steel-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href="/service-support" variant="secondary">
                Service & support
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — Engineering enquiry */}
      <section id="enquiry" className="scroll-mt-20 bg-paper py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16" data-reveal>
          <div className="lg:col-span-5">
            <SectionHeading
              index="09"
              eyebrow="Engineering enquiry"
              title="Tell us about the opening."
              lede="Clear width, clear height, application, location and usage. Those five answers are usually enough for us to come back with a specification and a price."
            />
            <div className="mt-8 space-y-4">
              <a href={telHref()} className="flex items-center gap-3 text-base text-steel-900 hover:text-amber-deep">
                <Phone className="h-5 w-5 text-amber" />
                {siteConfig.phone}
              </a>
              <a
                href={whatsappHref("Hello Standard Automation, I would like a quote.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-base text-steel-900 hover:text-amber-deep"
              >
                <WhatsApp className="h-5 w-5 text-amber" />
                WhatsApp us
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 break-all text-base text-steel-900 hover:text-amber-deep"
              >
                <ArrowRight className="h-5 w-5 text-amber" />
                {siteConfig.email}
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="border border-line bg-paper-raised p-8 text-sm text-steel-600">
                  Loading enquiry form…
                </div>
              }
            >
              <EnquiryForm products={formProducts} families={formFamilies} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
