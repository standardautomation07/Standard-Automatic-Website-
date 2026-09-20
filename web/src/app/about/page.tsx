import type { Metadata } from "next";
import { counts, familyPath, industryPath, productsInFamily } from "@/lib/catalog";
import { families } from "@/data/families";
import { industries } from "@/data/industries";
import { publicTrustedPartners } from "@/data/trusted-partners";
import { ArrowRight } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { Media } from "@/components/ui/media";
import { addressLine, mailtoHref, siteConfig, telHref } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `Standard Automatic Solutions Pvt Ltd is an ${siteConfig.isoCertification} registered manufacturer and supplier of entrance automation and industrial access systems, established in ${siteConfig.foundedYear} in Pune, Maharashtra.`,
  alternates: { canonical: "/about" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  const yearsInBusiness = new Date().getFullYear() - siteConfig.foundedYear;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <section className="relative isolate overflow-hidden bg-ink">
        <Media id="commercial-building" sizes="100vw" priority decorative className="opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="shell relative py-14 lg:py-20">
          <Breadcrumb trail={trail} tone="dark" />
          <p className="eyebrow mt-8 text-amber">About</p>
          <h1 className="mt-5 max-w-3xl text-display-2 text-white">{siteConfig.legalName}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-steel-300 lg:text-lg">
            A Pune-based manufacturer and supplier of entrance automation, industrial doors, rolling
            shutters, fire rated assemblies, loading bay equipment and access control systems.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              index="01"
              eyebrow="The company"
              title={`Founded in Pune, in ${siteConfig.foundedYear}.`}
            />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-steel-700">
              <p>
                Standard Automatic Solutions Pvt Ltd was established in {siteConfig.foundedYear} in
                Pune, Maharashtra. The company manufactures and supplies rolling shutters, automatic
                sliding and swing gates, industrial and automatic doors, road and access barriers,
                and provides entrance automation installation services.
              </p>
              <p>
                The published range covers {counts.products} products across {counts.families}{" "}
                families and {counts.categories} categories, from the vehicle gate at a site boundary
                through to the pedestrian lane in a building lobby.
              </p>
              <p>
                The company is an {siteConfig.isoCertification} registered organisation and operates
                from {siteConfig.address.city}, {siteConfig.address.region}.
              </p>
              <p>
                In its own words, the company is &ldquo;engaged in manufacturing and supplying a
                comprehensive assortment of the best quality Automatic Rolling Shutters to Automatic
                Sliding Gates, Doors, Swing Gates, Road Barriers&rdquo;, manufactured from
                &ldquo;finest grade raw material&rdquo; and built for &ldquo;excellent finish,
                corrosion resistance, reliable performance, robust construction, extended durability
                and ability to withstand extreme weather conditions&rdquo;. Those are the properties
                the product pages on this site are written against: which curtain thickness, which
                coating, which retention and which drive, and why.
              </p>
              <p>
                Two things have not changed since {siteConfig.foundedYear}. Every assembly is made to
                the surveyed opening rather than adapted from a stock size, and the company installs
                and commissions what it supplies, so the drive sizing, limit setting and safety
                devices are set by the people who built the door.
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
                { k: "Product families", v: String(counts.families) },
                { k: "Products", v: String(counts.products) },
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
            eyebrow="What we make"
            title={`${counts.families} product families, one discipline.`}
            lede="Every family answers the same question - how an opening is closed, secured and moved through - for a different kind of opening. Each family page states what is fixed, what is configured and what is confirmed at survey."
            action={
              <ButtonLink href="/products" variant="secondary">
                All products
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            }
          />
          <ul className="mt-12 grid hairline-grid md:grid-cols-2 xl:grid-cols-4">
            {families.map((family) => (
              <li key={family.id} className="bg-paper-raised">
                <Link
                  href={familyPath(family.id)}
                  className="group flex h-full flex-col focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-amber"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Media
                      id={family.imageId}
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                      decorative
                      className="transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-medium text-steel-900">{family.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-steel-600">{family.tagline}</p>
                    <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-steel-500">
                      {productsInFamily(family.id).length} products
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index="03"
              eyebrow="Who we work for"
              title="Eight industries, each with its own failure mode."
              lede="The opening that fails in a cold store is not the one that fails in a car plant. The industry pages set out what usually goes wrong on each kind of site and which products are specified against it."
            />
            <div className="mt-10 border border-line bg-paper-raised p-7">
              <p className="eyebrow text-amber-deep">Trusted partners</p>
              <p className="mt-3 font-display text-3xl font-medium text-steel-900">
                {publicTrustedPartners.length} organisations
              </p>
              <p className="mt-3 text-sm leading-relaxed text-steel-600">
                Manufacturers, developers, institutions and public bodies from our project records,
                shown by name and logo only. We publish who we have worked for, not what we did for
                them.
              </p>
              <Link
                href="/projects"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-steel-900 underline-offset-4 hover:underline"
              >
                See the list
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ul className="grid hairline-grid sm:grid-cols-2 lg:col-span-7">
            {industries.map((industry) => (
              <li key={industry.id} className="bg-paper-raised">
                <Link
                  href={industryPath(industry.id)}
                  className="group flex h-full flex-col p-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-amber"
                >
                  <h3 className="flex items-start justify-between gap-4 font-display text-lg font-medium text-steel-900">
                    {industry.name}
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-steel-400 transition-transform group-hover:translate-x-1" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-600">{industry.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-ink py-16 lg:py-24">
        <div className="shell">
          <SectionHeading
            index="04"
            eyebrow="What we stand behind"
            title="What a specification from us means."
            tone="dark"
          />
          <div className="mt-12 grid hairline-grid md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                t: "Measured, not assumed",
                d: "Clear width, height, headroom, side room, traffic and exposure are taken at the opening before a product type or drive is proposed.",
              },
              {
                t: "Figures we can support",
                d: "Every product page publishes the fields a specifier needs. A figure appears where we can stand behind it; where it depends on the opening or a certificate, the entry says so instead of guessing.",
              },
              {
                t: "Ratings only with certificates",
                d: "No fire rating, wind class or performance class is published without the certificate for the tested assembly. Ask for it and we will send it.",
              },
              {
                t: "Commissioned and tested",
                d: "Limits, forces, photocells, safety edges and spring-break or anti-fall devices are set and tested at handover, then supported with service, spares and maintenance.",
              },
            ].map((item) => (
              <article key={item.t} className="bg-ink-raised p-7">
                <h3 className="font-display text-lg font-medium text-white">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-400">{item.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-sunken py-16 lg:py-24">
        <div className="shell">
          <SectionHeading
            index="05"
            eyebrow="On the record"
            title="What we can put our name to."
            lede="Company pages in this market are full of numbers nobody can check. Everything below is either published by the company itself or taken from the data behind this site, and we would rather show you five things we can stand behind than fifty we cannot."
          />
          <div className="mt-12 grid hairline-grid md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                k: "Established",
                v: `${siteConfig.foundedYear}`,
                d: `${yearsInBusiness} years of manufacturing and installing entrance automation from Pune, Maharashtra, as stated in the company's own published material.`,
              },
              {
                k: "Quality system",
                v: siteConfig.isoCertification,
                d: `Published by the company as an ${siteConfig.isoCertification} registered organisation. Certificate details on request.`,
              },
              {
                k: "Trusted partners",
                v: `${publicTrustedPartners.length} organisations`,
                d: "Manufacturers, developers, institutions and public bodies from our project records, listed by name and logo on the Trusted Partners page.",
              },
              {
                k: "Range",
                v: `${counts.products} products`,
                d: `Across ${counts.families} families and ${counts.categories} categories, each with a published specification table that says what is fixed, what is configured and what is confirmed at survey.`,
              },
              {
                k: "Made and installed by us",
                v: "Survey to support",
                d: "Every assembly is made to the surveyed opening, installed and commissioned by our own teams, and supported with service, spares and maintenance afterwards.",
              },
              {
                k: "Our rule",
                v: "Evidence first",
                d: "We publish no figure we cannot support - no ratings without certificates, no totals without records. Ask us for anything not shown here and we will tell you what we can evidence.",
              },
            ].map((item) => (
              <article key={item.k} className="bg-paper-raised p-7">
                <p className="eyebrow text-amber-deep">{item.k}</p>
                <h3 className="mt-3 font-display text-2xl font-medium text-steel-900">{item.v}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{item.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <div className="shell">
          <SectionHeading
            index="06"
            eyebrow="How we work"
            title="Survey, specify, manufacture, install, support."
          />
          <ol className="mt-12 grid hairline-grid md:grid-cols-2 xl:grid-cols-5">
            {[
              { t: "Survey", d: "The opening is measured and assessed in place before anything is proposed." },
              { t: "Specify", d: "Product type, drive sizing and safety layer follow from the survey constraints." },
              { t: "Manufacture", d: "Assemblies are made to the surveyed dimensions rather than cut down from a stock size." },
              { t: "Install", d: "Installation, commissioning, limit setting and safety device testing." },
              { t: "Support", d: "Handover, then service, spares and maintenance afterwards." },
            ].map((step, index) => (
              <li key={step.t} className="bg-paper-raised p-7">
                <span className="font-mono text-xs text-amber">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-lg font-medium text-steel-900">{step.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading index="07" eyebrow="Where we are" title="Pune, Maharashtra." />
            <p className="mt-8 text-base leading-relaxed text-steel-700">
              The office is in Bavdhan, on the western side of Pune. Site surveys, installation and
              service are carried out by our own teams; send us the opening and we will tell you
              when we can come and measure it.
            </p>
          </div>
          <dl className="grid hairline-grid sm:grid-cols-3 lg:col-span-7">
            {[
              { k: "Head office", v: addressLine, href: undefined as string | undefined },
              { k: "Telephone", v: siteConfig.phone, href: telHref() },
              { k: "Email", v: siteConfig.email, href: mailtoHref() },
            ].map((row) => (
              <div key={row.k} className="bg-paper-raised p-7">
                <dt className="eyebrow text-steel-500">{row.k}</dt>
                <dd className="mt-3 leading-relaxed text-steel-900 [overflow-wrap:anywhere]">
                  {row.href ? (
                    <a href={row.href} className="underline-offset-4 hover:underline">
                      {row.v}
                    </a>
                  ) : (
                    row.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
