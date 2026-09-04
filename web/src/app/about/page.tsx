import Image from "next/image";
import type { Metadata } from "next";
import { categories, products } from "@/lib/catalog";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { addressLine, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `Standard Automatic Solutions Pvt. Ltd. was founded in ${siteConfig.foundedYear} in Pune, Maharashtra. An ${siteConfig.isoCertification} registered manufacturer and supplier of entrance automation, industrial doors, rolling shutters and access control systems.`,
  alternates: { canonical: "/about" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const clientLogos = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9", "l10", "l11", "l12", "l13", "l15"];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <section className="relative isolate overflow-hidden bg-ink">
        <Image
          src="/images/photography/commercial-building.jpg"
          alt="Modern commercial building with a glazed facade"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="shell relative py-14 lg:py-20">
          <Breadcrumb trail={trail} tone="dark" />
          <p className="eyebrow mt-8 text-amber">About</p>
          <h1 className="mt-5 max-w-3xl text-display-2 text-white">{siteConfig.legalName}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-steel-300 lg:text-lg">
            A Pune-based manufacturer and supplier of entrance automation, industrial doors, rolling
            shutters, loading bay equipment and access control systems.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading index="01" eyebrow="The company" title="Founded in Pune, in 2006." />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-steel-700">
              <p>
                Standard Automatic Solutions Pvt. Ltd. was established in {siteConfig.foundedYear} in
                Pune, Maharashtra. The company manufactures and supplies rolling shutters, automatic
                sliding and swing gates, industrial and automatic doors, road and access barriers,
                and provides entrance automation installation services.
              </p>
              <p>
                The range covers {products.length} products across {categories.length} lines, from
                the vehicle gate at a site boundary through to the pedestrian lane in a building
                lobby — and the drive units that operate all of it.
              </p>
              <p>
                The company is an {siteConfig.isoCertification} registered organisation and operates
                from {siteConfig.address.city}, {siteConfig.address.region}.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <dl className="border border-line bg-paper-raised">
              {[
                { k: "Legal name", v: siteConfig.legalName },
                { k: "Established", v: String(siteConfig.foundedYear) },
                { k: "Quality system", v: `${siteConfig.isoCertification} registered` },
                { k: "Head office", v: addressLine },
                { k: "Product lines", v: `${categories.length}` },
                { k: "Products", v: `${products.length}` },
              ].map((row) => (
                <div key={row.k} className="border-b border-line p-6 last:border-b-0">
                  <dt className="eyebrow text-steel-500">{row.k}</dt>
                  <dd className="mt-2 leading-relaxed text-steel-900">{row.v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className="border-y border-line bg-paper-sunken py-16 lg:py-24">
        <div className="shell">
          <SectionHeading
            index="02"
            eyebrow="Clients"
            title="Organisations on our published client list."
            lede="Reproduced from Standard Automation's existing published client list. Named references, project details and relationship descriptions are being confirmed with each organisation before they are published here."
          />
          <ul className="mt-12 grid grid-cols-3 items-center gap-px border border-line bg-line sm:grid-cols-4 lg:grid-cols-7">
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
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <div className="shell">
          <SectionHeading
            index="03"
            eyebrow="How we work"
            title="Survey, specify, install, support."
          />
          <ol className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                t: "Site survey",
                d: "The opening is measured and assessed in place: clear dimensions, headroom, side-run, floor condition, wind exposure and the traffic it actually carries.",
              },
              {
                t: "Specification",
                d: "Product type, drive sizing and safety layer are selected against those constraints, and the configuration is confirmed before quotation.",
              },
              {
                t: "Installation",
                d: "Fabrication, delivery, installation and commissioning, including limit setting and testing of the safety devices.",
              },
              {
                t: "Support",
                d: "Handover covering manual release and safe operation, then service, spares and maintenance support afterwards.",
              },
            ].map((step, index) => (
              <li key={step.t} className="bg-paper-raised p-7">
                <span className="font-mono text-xs text-amber">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-steel-900">{step.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
