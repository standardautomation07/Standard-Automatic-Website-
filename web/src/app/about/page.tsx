import type { Metadata } from "next";
import { counts } from "@/lib/catalog";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { Media } from "@/components/ui/media";
import { addressLine, siteConfig } from "@/lib/site-config";

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
            eyebrow="How this site is written"
            title="Two company facts, and a rule about the rest."
            lede="Buyers in this market are used to company pages full of unverifiable numbers. This one carries two company claims, and both appear on Standard Automation's own published material."
          />
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
            <article className="bg-paper-raised p-7">
              <p className="eyebrow text-amber-deep">Stated</p>
              <h3 className="mt-3 font-display text-lg font-medium text-steel-900">
                Established {siteConfig.foundedYear}, in Pune
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-steel-600">
                The company&apos;s own published material states its foundation was laid in{" "}
                {siteConfig.foundedYear} in Pune, Maharashtra.
              </p>
            </article>
            <article className="bg-paper-raised p-7">
              <p className="eyebrow text-amber-deep">Stated</p>
              <h3 className="mt-3 font-display text-lg font-medium text-steel-900">
                {siteConfig.isoCertification} registered
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-steel-600">
                Published by the company as an {siteConfig.isoCertification} registered
                organisation. Certificate details on request.
              </p>
            </article>
            <article className="bg-paper-raised p-7">
              <p className="eyebrow text-steel-500">Not stated</p>
              <h3 className="mt-3 font-display text-lg font-medium text-steel-900">
                Everything we cannot evidence
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-steel-600">
                No employee count, turnover, project or installation totals, years-of-experience
                claims, client lists or factory dimensions appear on this site, because none of them
                has been verified. Ask us and we will tell you what we can evidence.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <div className="shell">
          <SectionHeading
            index="03"
            eyebrow="How we work"
            title="Survey, specify, manufacture, install, support."
          />
          <ol className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-5">
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

      <CtaBand />
    </>
  );
}
