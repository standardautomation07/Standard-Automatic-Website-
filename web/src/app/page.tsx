import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { featuredProducts, products } from "@/lib/catalog";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/product/product-card";
import { CtaBand } from "@/components/cta/cta-band";
import { ArrowRight, Check } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Entrance Automation & Industrial Access Solutions",
  description:
    "Standard Automatic Solutions Pvt. Ltd. specifies, supplies and installs entrance automation, industrial doors, rolling shutters, loading bay equipment and access control across India, from Pune.",
  alternates: { canonical: "/" },
};

const industries = [
  { name: "Manufacturing", image: "/images/photography/manufacturing.jpg", alt: "Production machinery inside a manufacturing plant" },
  { name: "Warehousing & Logistics", image: "/images/photography/warehouse-forklift.jpg", alt: "Forklift operating inside a large warehouse" },
  { name: "Commercial & Corporate", image: "/images/photography/commercial-building.jpg", alt: "Modern commercial building with a glazed facade" },
  { name: "Retail & Showrooms", image: "/images/photography/rolling-shutters.jpg", alt: "Roller shutters across a retail frontage" },
  { name: "Healthcare", image: "/images/photography/entrance-automation.jpg", alt: "Automatic glass entrance doors at a building entrance" },
  { name: "Infrastructure & Transit", image: "/images/photography/security-access.jpg", alt: "Access control turnstiles in a transit building" },
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
    title: "Built to run every day",
    body: "Duty cycle governs the drive selection. An operator sized only for leaf weight will overheat on a gate that cycles four hundred times a day long before it fails mechanically.",
  },
  {
    title: "Installed and supported by the people who supplied it",
    body: "Supply, installation and after-sales support sit with one company, so the site survey, the specification and the commissioning are answerable to the same team.",
  },
];

const clientLogos = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9", "l10", "l11", "l12"];

export default function HomePage() {
  return (
    <>
      {/* 01 — Hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        <Image
          src="/images/photography/hero-facility.jpg"
          alt="Modern industrial building exterior with loading docks"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-ink/35" />
        <div className="grid-rule absolute inset-0" aria-hidden="true" />

        <div className="shell relative flex min-h-[calc(100svh-4rem)] flex-col justify-end pb-14 pt-24 lg:min-h-[46rem] lg:pb-20 lg:pt-32">
          <p className="eyebrow text-amber">Entrance Automation & Industrial Solutions</p>

          <h1 className="mt-7 max-w-5xl text-display-1 text-white">
            Engineered access.
            <br />
            <span className="text-steel-400">Automated for the way you move.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-steel-300 lg:text-lg">
            Gates, industrial doors, rolling shutters, loading bays and access control — specified
            against the opening and the traffic it carries, then installed and supported from Pune.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/products" variant="primary" size="lg">
              Explore Solutions
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="onDark" size="lg">
              Request a Quote
            </ButtonLink>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-8 lg:mt-20 lg:grid-cols-4">
            {[
              { k: "Established", v: String(siteConfig.foundedYear) },
              { k: "Quality system", v: siteConfig.isoCertification },
              { k: "Solution categories", v: String(categories.length) },
              { k: "Products in range", v: String(products.length) },
            ].map((stat) => (
              <div key={stat.k}>
                <dt className="eyebrow text-steel-500">{stat.k}</dt>
                <dd className="mt-2 font-display text-2xl text-white lg:text-3xl">{stat.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 02 — Solutions */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="02"
            eyebrow="Solutions"
            align="between"
            title="Six lines that cover the whole opening."
            lede="From the vehicle gate at the boundary to the pedestrian lane in the lobby — and the drive units behind all of it."
            action={
              <ButtonLink href="/products" variant="secondary">
                All products
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            }
          />

          <ul className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category, index) => (
              <li key={category.slug} className="bg-paper-raised">
                <Link
                  href={`/products/${category.slug}`}
                  className="group flex h-full flex-col focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-amber"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.imageAlt}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                    <span className="absolute left-5 top-5 font-mono text-[0.65rem] text-white/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="flex items-start justify-between gap-4 font-display text-xl font-medium text-steel-900">
                      {category.name}
                      <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-amber transition-transform duration-300 group-hover:translate-x-1" />
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-steel-600">
                      {category.summary}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 — Featured products */}
      <section className="bg-paper-sunken py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="03"
            eyebrow="Featured products"
            align="between"
            title="A representative product from each line."
            action={
              <ButtonLink href="/products" variant="secondary">
                Browse all {products.length}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            }
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Why Standard Automation */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index="04"
              eyebrow="Why Standard Automation"
              title="An opening is an engineering problem before it is a product choice."
              lede="The failure modes on automated openings are predictable: an operator sized for weight but not duty, a safety layer added after commissioning, a door specified for a width rather than for what it has to separate."
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
              <li
                key={point.title}
                className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-line py-8 last:border-b"
              >
                <span className="font-mono text-xs text-amber">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-medium text-steel-900">{point.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel-600">{point.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 — Industries */}
      <section className="bg-ink py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="05"
            eyebrow="Industries"
            tone="dark"
            align="between"
            title="Where these systems go to work."
            action={
              <ButtonLink href="/industries" variant="onDark">
                Industries in detail
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            }
          />

          <ul className="mt-14 grid gap-px border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <li key={industry.name} className="group relative aspect-[4/3] overflow-hidden bg-ink">
                <Image
                  src={industry.image}
                  alt={industry.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-55 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <h3 className="absolute inset-x-0 bottom-0 p-6 font-display text-lg font-medium text-white">
                  {industry.name}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — Installation showcase */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative aspect-[4/3] lg:col-span-7">
            <Image
              src="/images/photography/installation.jpg"
              alt="Technician inspecting a door installation on site"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-5">
            <SectionHeading
              index="06"
              eyebrow="Installation & service"
              title="The specification is only half of it."
              lede="A correctly chosen door still fails if the guides are out of plumb, the limits are set wrong, or nobody has explained the manual release to the people who use it. Installation and commissioning are where the specification either holds or does not."
            />
            <ul className="mt-10 space-y-4">
              {[
                "Site survey against the actual opening and traffic",
                "Installation, commissioning and limit setting",
                "Handover including manual release and safety checks",
                "Service, spares and maintenance support",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-steel-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 07 — Technology / engineering */}
      <section className="border-y border-line bg-paper-sunken py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="07"
            eyebrow="Engineering"
            title="What automation actually buys you."
            lede="An automated opening is rarely bought for convenience. It is bought because the manual alternative costs something measurable — time, energy, safety exposure or control."
          />

          <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                k: "Cycle time",
                t: "Time the building stands open",
                d: "A high speed door on a busy opening cuts the open time per movement from minutes to seconds, which is where the energy and contamination cost actually lives.",
              },
              {
                k: "Separation",
                t: "Two environments, one opening",
                d: "Insulated panels and sealed perimeters hold a temperature or cleanliness differential across an aperture that has to be crossed hundreds of times a day.",
              },
              {
                k: "Safety",
                t: "A powered leaf that stops",
                d: "Detection, safety edges and obstruction sensing govern every powered movement, with a manual release that works when the power does not.",
              },
              {
                k: "Control",
                t: "One authorised movement",
                d: "Access devices at the gate and door line turn an opening into a decision point that can be recorded and audited.",
              },
            ].map((item) => (
              <article key={item.k} className="bg-paper-raised p-7">
                <p className="eyebrow text-amber-deep">{item.k}</p>
                <h3 className="mt-4 font-display text-lg font-medium text-steel-900">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{item.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — Trust */}
      <section className="bg-paper py-20 lg:py-24">
        <div className="shell">
          <SectionHeading
            index="08"
            eyebrow="Track record"
            title={`Working from Pune since ${siteConfig.foundedYear}.`}
            lede={`Standard Automatic Solutions Pvt. Ltd. was founded in ${siteConfig.foundedYear} in Pune, Maharashtra, and is an ${siteConfig.isoCertification} registered company.`}
          />

          <div className="mt-12">
            <p className="eyebrow text-steel-500">Organisations on our published client list</p>
            <ul className="mt-6 grid grid-cols-3 items-center gap-px border border-line bg-line sm:grid-cols-4 lg:grid-cols-6">
              {clientLogos.map((logo) => (
                <li key={logo} className="flex h-28 items-center justify-center bg-paper-raised p-5">
                  <Image
                    src={`/images/legacy/${logo}.png`}
                    alt=""
                    width={110}
                    height={80}
                    className="h-auto w-[110px] max-w-full opacity-80 mix-blend-multiply"
                  />
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-steel-500">
              Logos are reproduced from Standard Automation&apos;s existing published client list.
              Named client references and project attributions are being confirmed before they are
              published here.
            </p>
          </div>
        </div>
      </section>

      {/* 09 — CTA */}
      <CtaBand />
    </>
  );
}
