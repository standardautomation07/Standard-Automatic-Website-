import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  categoryById,
  families,
  familyById,
  getProduct,
  industryById,
  productPath,
  products,
  relatedProducts,
  resolveDetail,
  productGuidance,
  specCompleteness,
  variantSpecs,
} from "@/lib/catalog";
import { image } from "@/data/images";
import { CONFIGURATION_NOTE } from "@/data/product-specs";
import { ProductDetail } from "@/components/product/product-detail";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/product/cards";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, productJsonLd } from "@/lib/json-ld";
import { productWhatsappHref, siteConfig, telHref, whatsappHref } from "@/lib/site-config";
import { Media, StatusBadge } from "@/components/ui/media";
import { ArrowRight, Check, Phone, WhatsApp } from "@/components/ui/icons";
import type { Spec } from "@/lib/types";

export function generateStaticParams() {
  return products.map((product) => ({ family: product.familyId, product: product.id }));
}

type Params = { params: Promise<{ family: string; product: string }> };

const commercialMetadata: Record<string, { title: string; description: string }> = {
  "high-speed-roll-up-door": {
    title: "High Speed Roll-Up Doors for Industrial Openings",
    description:
      "Specify high speed roll-up doors for frequent internal or sheltered industrial openings. Review construction, controls, safety and site requirements with Standard Automation.",
  },
  "high-speed-self-repairing-door": {
    title: "High Speed Self-Repairing Doors for Busy Routes",
    description:
      "High speed self-repairing doors for impact-prone industrial and logistics routes. Compare the configuration, traffic conditions and safety requirements before selection.",
  },
  "insulated-double-wall-rolling-shutters": {
    title: "Insulated Rolling Shutters for Temperature Separation",
    description:
      "Insulated rolling shutters with double-wall profiles and configuration-dependent cores for warehouses, food processing and temperature-controlled openings.",
  },
  "dock-levellers": {
    title: "Dock Levellers for Warehouse Loading Bays",
    description:
      "Dock levellers bridge the warehouse floor and vehicle bed for loading-bay movement. Select the lip arrangement and working range against the vehicle mix and dock design.",
  },
  "dock-shelters-and-houses": {
    title: "Dock Shelters and Dock Houses for Loading Bays",
    description:
      "Dock shelters and dock houses seal the loading bay around the vehicle. Compare curtain, dock-house and inflatable arrangements against the fleet and temperature requirement.",
  },
  "automatic-sliding-gates": {
    title: "Automatic Sliding Gates for Wide Site Entrances",
    description:
      "Automatic sliding gates suit wide site entrances where the gate needs to move parallel to the boundary. Review side-run, traffic, control and safety requirements.",
  },
  "automatic-sliding-glass-doors": {
    title: "Automatic Sliding Glass Doors for Controlled Entrances",
    description:
      "Automatic sliding glass doors for commercial, healthcare and controlled pedestrian entrances. Select the opening arrangement, access control and safety interface for the site.",
  },
  "industrial-sectional-overhead-doors": {
    title: "Industrial Sectional Overhead Doors for Warehouses",
    description:
      "Industrial sectional overhead doors for warehouse, factory and loading openings. Choose the lift arrangement, vision, insulation and access options against the available headroom.",
  },
  "fire-rated-sliding-doors": {
    title: "Fire Rated Sliding Doors for Compartment Openings",
    description:
      "Fire rated sliding doors for compartment openings where the door arrangement must be specified against the building fire strategy and documented assembly requirements.",
  },
  "fire-rated-rolling-shutters": {
    title: "Fire Rated Rolling Shutter — 120 & 240 Minute, FD 120 / FD 240 UD",
    description:
      "Fire rated rolling shutters FRS-120 UD and FRS-240 UD: 2 hour and 4 hour (FD 120 UD / FD 240 UD), motorized with automatic fire closure, for openings up to 6000 × 6000 mm.",
  },
  "tripod-turnstiles": {
    title: "Tripod Turnstiles for Controlled Pedestrian Access",
    description:
      "Tripod turnstiles control single pedestrian passage at supervised entrances, factory gate houses and restricted facilities. Specify the reader, release and egress strategy for the site.",
  },
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { product: id, family } = await params;
  const product = getProduct(id);
  if (!product || product.familyId !== family) return {};

  const commercial = commercialMetadata[product.id];

  return {
    title: commercial?.title ?? product.name,
    description: commercial?.description ?? product.summary,
    alternates: { canonical: productPath(product) },
    openGraph: {
      title: `${commercial?.title ?? product.name} | Standard Automation`,
      description: commercial?.description ?? product.summary,
      images: [{ url: image(product.imageId).src }],
    },
  };
}

/** Where a product's primary action is worded differently from the default. */
const primaryAction: Record<string, string> = {
  "fire-rated-rolling-shutters": "Request Technical Submittal",
};

const closingBand: Record<string, { title: string; lede: string }> = {
  "fire-rated-rolling-shutters": {
    title: "Need a fire rated rolling shutter?",
    lede: "Tell us your opening size, fire-rating requirement and site conditions.",
  },
};

/**
 * Applied to supporting detail so it is painted on a desktop and not on a
 * phone. A media query rather than a conditional render: this site is crawled
 * mobile-first, so content dropped from the mobile DOM is content dropped from
 * the index. Hidden this way it stays in the HTML and in the structured data.
 */
const MOBILE_ONLY_DESKTOP = "hidden lg:block";

export default async function ProductPage({ params }: Params) {
  const { product: id, family: familyParam } = await params;
  const product = getProduct(id);
  if (!product || product.familyId !== familyParam) notFound();

  const family = familyById[product.familyId];
  const category = categoryById[product.categoryId];
  const related = relatedProducts(product);
  const path = productPath(product);

  // Every product presents its detail as the same nine horizontal tabs, so a
  // buyer comparing a shutter against a gate is reading the same page shape
  // twice. Everything the template used to render inline lives in those tabs.
  //
  // The gallery is the exception: where a product has real photography it
  // stays on the page, because burying images behind an unselected tab is the
  // one thing this pattern is bad at.
  const useTabs = true;

  const completeness = specCompleteness(product);
  const guidance = productGuidance(product);
  const variantDeltas = variantSpecs(product);
  const safety = resolveDetail(product, "safety");
  const controls = resolveDetail(product, "controls");
  const options = resolveDetail(product, "options");
  const maintenance = resolveDetail(product, "maintenance");

  const trail = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: family.name, path: `/products/${family.id}` },
    { name: product.name, path },
  ];

  const formProducts = products.map(({ id: pid, name, familyId }) => ({ id: pid, name, familyId }));
  const formFamilies = families.map(({ id: fid, name }) => ({ id: fid, name }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={productJsonLd(product, path, image(product.imageId).src, completeness.groups)} />
      {guidance.faq.length > 0 && <JsonLd data={faqJsonLd(guidance.faq)} />}

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grid-fine absolute inset-0" aria-hidden="true" />
        <div className="shell relative pt-8 lg:pt-10">
          <Breadcrumb trail={trail} tone="dark" />
        </div>
        <div className="shell relative grid gap-10 pb-12 pt-8 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-16 lg:pt-10">
          <div className="hero-in lg:col-span-5">
            <p className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 text-amber">
              <Link href={`/products/${family.id}`} className="hover:underline">
                {family.name}
              </Link>
              <span className="text-steel-500">/</span>
              <span className="text-steel-400">{category.name}</span>
            </p>
            <h1 className="mt-5 text-display-2 text-white">{product.name}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-300">{product.tagline}</p>

            {(product.status === "POTENTIAL" || product.namingNote) && (
              <div className="mt-8 border-l-2 border-amber bg-white/5 p-5">
                <StatusBadge status={product.status} />
                <p className={`text-sm leading-relaxed text-steel-300 ${product.status === "POTENTIAL" ? "mt-3" : ""}`}>
                  {product.namingNote ??
                    "This line is published while we confirm it is currently active. Contact us and we will confirm availability and configurations before quoting."}
                </p>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>*]:whitespace-nowrap">
              <ButtonLink href="#enquiry" variant="primary" size="lg">
                {primaryAction[product.id] ?? "Request a Quote"}
              </ButtonLink>
              <ButtonLink href={telHref()} variant="onDark" size="lg">
                <Phone className="h-5 w-5" />
                Talk to an Engineer
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Supplied renders carry a callout panel down one side. Cropping
                them to a fixed 4:3 frame cuts that panel off, so the frame
                takes the image's own ratio where the registry declares one. */}
            <div
              className={`relative ${image(product.imageId).aspect ?? "aspect-[4/3]"} overflow-hidden border border-white/10 bg-ink-raised shadow-[0_30px_80px_rgba(0,0,0,0.45)]`}
            >
              <Media id={product.imageId} sizes="(min-width: 1024px) 58vw, 100vw" priority className="img-settle" />
              <span className="absolute left-4 top-4 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/70">
                {family.shortName}
              </span>
            </div>
          </div>
        </div>

        {image(product.imageId).usage.startsWith("Interim visual") && (
          <div className="shell relative pb-6">
            <p className="max-w-3xl text-xs leading-relaxed text-steel-500">
              Product visualisations. These images are built to a written
              specification of this door type rather than photographed on site,
              and they are replaced as installation photography becomes
              available. They illustrate construction and arrangement; the
              figures that matter are in the specification below.
            </p>
          </div>
        )}
      </section>

      {commercialMetadata[product.id] && guidance.selectionGuide.length > 0 && (
        <section className="border-y border-line bg-paper-sunken py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading
              index="02"
              eyebrow="Buyer answers"
              title={`Choosing ${product.name.toLowerCase()}`}
              lede="A concise starting point from the published product description, applications and selection guidance. Final configuration remains subject to the opening and site assessment."
            />
            <div className="mt-10 grid gap-8 lg:grid-cols-3">
              <div className="border border-line bg-paper-raised p-7">
                <h2 className="font-display text-lg font-medium text-steel-900">What is this product?</h2>
                <p className="mt-4 text-sm leading-relaxed text-steel-700">{product.overview[0]}</p>
              </div>
              <div className="border border-line bg-paper-raised p-7">
                <h2 className="font-display text-lg font-medium text-steel-900">Where is it used?</h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-steel-700">
                  {product.applications.slice(0, 4).map((application) => (
                    <li key={application} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                      {application}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-line bg-paper-raised p-7">
                <h2 className="font-display text-lg font-medium text-steel-900">What should be considered?</h2>
                <ul className="mt-4 space-y-4 text-sm leading-relaxed text-steel-700">
                  {guidance.selectionGuide.slice(0, 3).map((rule) => (
                    <li key={rule.condition}>
                      <strong className="font-medium text-steel-900">{rule.condition}:</strong>{" "}
                      {rule.recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* KEY SPECIFICATIONS */}
      <section className="border-b border-line bg-paper">
        <div className="shell py-8 lg:py-10" data-reveal>
          <p className="eyebrow text-steel-500">Key specifications</p>
          <dl className="mt-4 grid hairline-grid sm:grid-cols-2 xl:grid-cols-4" data-reveal-group>
            {product.quickFacts.map((fact) => (
              <div key={fact.label} className="bg-paper-raised p-6">
                <dt className="eyebrow text-steel-500">{fact.label}</dt>
                <dd className="mt-2 font-display text-lg leading-snug text-steel-900">
                  {fact.value}
                  {fact.qualified && (
                    <span className="ml-1 align-super text-sm text-amber-deep" aria-hidden="true">
                      *
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          {product.quickFacts.some((fact) => fact.qualified) && (
            <p className="mt-4 max-w-3xl text-xs leading-relaxed text-steel-500">
              <span className="text-amber-deep">*</span> {CONFIGURATION_NOTE}
            </p>
          )}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16" data-reveal>
          <div className="lg:col-span-7">
            <SectionHeading index="01" eyebrow="Overview" title={`About ${product.name}`} />
            <div className="mt-8">
              {product.overview.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className={`mb-5 text-base leading-relaxed text-steel-700 last:mb-0 ${
                    index > 0 ? MOBILE_ONLY_DESKTOP : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <h3 className={`eyebrow mt-10 text-steel-500 ${MOBILE_ONLY_DESKTOP}`}>Operating method</h3>
            <ol className={`mt-5 ${MOBILE_ONLY_DESKTOP}`}>
              {product.operatingMethod.map((step, index) => (
                <li key={step.slice(0, 30)} className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-line py-4 last:border-b">
                  <span className="font-mono text-xs text-amber">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed text-steel-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className={`space-y-6 lg:col-span-5 ${MOBILE_ONLY_DESKTOP}`}>
            <div className="border border-line bg-paper-raised p-7">
              <h2 className="eyebrow text-steel-500">Construction</h2>
              <ul className="mt-5 space-y-3">
                {product.construction.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-steel-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-line bg-paper-raised p-7">
              <h2 className="eyebrow text-steel-500">Industries</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {product.industries.map((industryId) => (
                  <li key={industryId}>
                    <Link
                      href={`/industries/${industryId}`}
                      className="inline-flex rounded-edge border border-line px-3 py-1.5 text-sm text-steel-700 transition-colors hover:border-steel-900 hover:text-steel-900"
                    >
                      {industryById[industryId].name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* KEY BENEFITS */}
      {!useTabs && (
      <section className="border-y border-line bg-paper-sunken py-16 lg:py-20">
        <div className="shell" data-reveal>
          <SectionHeading index="02" eyebrow="Key benefits" title="What this product gets you" />
          <div className="mt-12 grid hairline-grid md:grid-cols-2 xl:grid-cols-4">
            {product.benefits.map((benefit) => (
              <article key={benefit.title} className="bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{benefit.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* VARIANTS */}
      {product.variants.length > 0 && (
        <section className="bg-paper py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading
              index="03"
              eyebrow="Variants"
              title="Available configurations"
              lede="The same product, built for a different job. Where a specification depends on opening dimensions, selected profile, operating duty or site conditions, the final configuration is confirmed during technical assessment."
            />
            <ul className="mt-12 grid hairline-grid md:grid-cols-2">
              {product.variants.map((variant) => (
                <li key={variant.id} className="bg-paper-raised p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-medium text-steel-900">{variant.name}</h3>
                    <StatusBadge status={variant.status} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-steel-600">{variant.note}</p>
                  {variantDeltas
                    .filter((entry) => entry.variant.id === variant.id)
                    .map(({ specs }) => (
                      <dl key={variant.id} className="mt-6 border-t border-line">
                        {specs.map((spec) => (
                          <div
                            key={spec.label}
                            className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-4 border-b border-line py-2.5 last:border-b-0"
                          >
                            <dt className="font-mono text-xs uppercase tracking-[0.08em] text-steel-500">{spec.label}</dt>
                            <dd className="text-sm text-steel-800">{spec.value}</dd>
                          </div>
                        ))}
                      </dl>
                    ))}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* TECHNICAL SPECIFICATIONS */}
      {!useTabs && (
      <section className="border-y border-line bg-paper-sunken py-16 lg:py-20">
        <div className="shell" data-reveal>
          <SectionHeading
            index="04"
            eyebrow="Technical specifications"
            title="Specification"
            lede={
              completeness.toConfirm === 0
                ? "The full field list a specifier needs for this product type. Where a value depends on the opening, the profile, the duty or a certificate, the entry says what it depends on rather than stating a figure we cannot support."
                : "The full field list a specifier needs for this product type. Figures we can support are published; everything else is marked to be confirmed rather than filled with a plausible number."
            }
          />

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="font-mono text-xs text-steel-500">
              {completeness.published} of {completeness.total} fields published
            </p>
            {(completeness.configurable > 0 || completeness.toConfirm > 0) && (
              <p className="font-mono text-xs text-steel-500">
                {completeness.confirmed} fixed · {completeness.configurable} set by configuration ·{" "}
                {completeness.toConfirm} to be confirmed
              </p>
            )}
            <div
              className="h-1.5 w-40 overflow-hidden rounded-edge bg-line"
              role="img"
              aria-label={`${completeness.published} of ${completeness.total} specification fields published`}
            >
              <div
                className="h-full bg-amber"
                style={{ width: `${Math.round((completeness.published / completeness.total) * 100)}%` }}
              />
            </div>
            <Link href="#enquiry" className="text-sm font-medium text-amber-deep underline-offset-4 hover:underline">
              Ask us to confirm the rest for your opening
            </Link>
          </div>

          <div className="mt-10 space-y-8">
            {completeness.groups.map((group) => (
              <div key={group.group} className="overflow-x-auto border border-line bg-paper-raised">
                <table className="w-full min-w-[34rem] border-collapse text-sm">
                  <caption className="border-b border-line bg-paper-sunken/60 px-6 py-3 text-left font-mono text-[0.65rem] uppercase tracking-[0.12em] text-steel-500">
                    {group.group}
                  </caption>
                  <tbody>
                    {group.specs.map((spec) => (
                      <tr key={spec.label} className="border-b border-line last:border-b-0">
                        <th
                          scope="row"
                          className="w-2/5 px-6 py-4 text-left align-top font-mono text-xs font-medium uppercase tracking-[0.08em] text-steel-500"
                        >
                          {spec.label}
                          {spec.note && (
                            <span className="mt-1.5 block font-sans text-[0.7rem] normal-case tracking-normal text-steel-400">
                              {spec.note}
                            </span>
                          )}
                        </th>
                        <td className="px-6 py-4 align-top leading-relaxed">
                          <SpecValue spec={spec} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {variantDeltas.length > 0 && (
            <div className="mt-12">
              <h3 className="eyebrow text-steel-500">By configuration</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel-600">
                Where a configuration changes the specification, the difference is listed against it
                rather than buried in the table above.
              </p>
              <div className="mt-6 grid gap-px hairline-grid md:grid-cols-2">
                {variantDeltas.map(({ variant, specs }) => (
                  <div key={variant.id} className="p-7">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-display text-lg font-medium text-steel-900">{variant.name}</h4>
                      <StatusBadge status={variant.status} />
                    </div>
                    <dl className="mt-4 space-y-2">
                      {specs.map((spec) => (
                        <div key={spec.label} className="flex flex-wrap gap-x-3 text-sm">
                          <dt className="font-mono text-xs uppercase tracking-[0.08em] text-steel-500">
                            {spec.label}
                          </dt>
                          <dd className="text-steel-800">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          )}

          {completeness.qualified && (
            <p className="mt-10 border-l-2 border-amber bg-amber-soft/50 p-5 text-sm leading-relaxed text-steel-700">
              {CONFIGURATION_NOTE}
            </p>
          )}

          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-steel-500">
            Field lists follow the characteristics this market declares against — EN 13241 for
            industrial doors and gates, EN 16005 for powered pedestrian doors, EN 1398 for dock
            levellers. Naming a standard describes what a field means; it is not a claim that this
            product is certified to it. A rating appears only against a certificate for the
            assembly as installed.
          </p>
        </div>
      </section>
      )}

      {/* APPLICATIONS */}
      {!useTabs && (
      <section className="bg-paper py-16 lg:py-20">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16" data-reveal>
          <div className="lg:col-span-6">
            <SectionHeading index="05" eyebrow="Applications" title="Where it is used" />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {product.applications.map((application) => (
                <li key={application} className="flex gap-3 text-sm leading-relaxed text-steel-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  {application}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden border border-line bg-paper-sunken">
              <Media id={family.imageId} sizes="(min-width: 1024px) 45vw, 100vw" decorative />
            </div>
          </div>
        </div>
      </section>
      )}

      {/* INTEGRATION */}
      {!useTabs && guidance.integration.length > 0 && (
        <section className="border-t border-line bg-paper py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading
              index="06"
              eyebrow="Integration"
              title="What it connects to"
              lede="Couplings that are technically true for this product type. Credential technology is your choice — the opening responds to a release signal, not to a brand."
            />
            <div className="mt-12 grid hairline-grid md:grid-cols-2 xl:grid-cols-3">
              {guidance.integration.map((entry) => (
                <article key={entry.system} className="p-7">
                  <h3 className="font-display text-lg font-medium text-steel-900">{entry.system}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel-600">{entry.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SAFETY & CONTROL */}
      {!useTabs && (
      <section className="border-y border-line bg-paper-sunken py-16 lg:py-20">
        <div className="shell" data-reveal>
          <SectionHeading
            index="07"
            eyebrow="Safety & control"
            title="How it is governed"
            lede="Detection, control and maintenance are part of the specification, not an add-on decided after commissioning."
          />
          <div className="mt-12 grid hairline-grid md:grid-cols-2 xl:grid-cols-4">
            <DetailBlock title="Safety" items={safety} />
            <DetailBlock title="Control options" items={controls} />
            <DetailBlock title="Optional features" items={options} />
            <DetailBlock title="Maintenance" items={maintenance} />
          </div>
        </div>
      </section>
      )}

      {/* INSTALLATION */}
      {!useTabs && guidance.installation.length > 0 && (
        <section className="bg-paper py-16 lg:py-20">
          <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16" data-reveal>
            <div className="lg:col-span-5">
              <SectionHeading
                index="08"
                eyebrow="Installation"
                title="What the site has to provide"
                lede="Most problems on an automated opening are set before anyone arrives to install it. These are the things worth settling early."
              />
            </div>
            <ol className="lg:col-span-7">
              {guidance.installation.map((step, index) => (
                <li
                  key={step.slice(0, 30)}
                  className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-line py-5 last:border-b"
                >
                  <span className="font-mono text-xs text-amber">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed text-steel-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* SELECTION GUIDE */}
      {guidance.selectionGuide.length > 0 && (
        <section
          className={`border-y border-line bg-paper-sunken py-16 lg:py-20 ${MOBILE_ONLY_DESKTOP}`}
        >
          <div className="shell" data-reveal>
            <SectionHeading
              index="09"
              eyebrow="Selection guide"
              title="Which configuration is right for your application?"
              lede="What the decision actually turns on. If your situation is not listed, describe the opening and we will work it through with you."
            />
            <dl className="mt-12 grid hairline-grid md:grid-cols-2">
              {guidance.selectionGuide.map((rule) => (
                <div key={rule.condition} className="p-7">
                  <dt className="flex gap-3 font-display text-lg font-medium text-steel-900">
                    <span className="mt-1 h-2 w-2 shrink-0 bg-amber" aria-hidden="true" />
                    {rule.condition}
                  </dt>
                  <dd className="mt-3 pl-5 text-sm leading-relaxed text-steel-600">{rule.recommendation}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {product.galleryIds && product.galleryIds.length > 0 && (
        <section className="bg-paper py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading index="10" eyebrow="Gallery" title={`${product.name} in detail`} />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {product.galleryIds.map((imageId) => (
                <li
                  key={imageId}
                  className={`relative ${image(imageId).aspect ?? "aspect-[4/3]"} overflow-hidden border border-line bg-paper-sunken`}
                >
                  <Media id={imageId} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* DOWNLOADS */}
      {!useTabs && (
      <section className="border-t border-line bg-paper py-16 lg:py-20">
        <div className="shell" data-reveal>
          <SectionHeading index="11" eyebrow="Downloads" title="Documentation" />
          <ul className="mt-12 grid hairline-grid md:grid-cols-2">
            {product.documents.map((doc) => (
              <li key={doc.title} className="bg-paper-raised p-7">
                <p className="eyebrow text-steel-500">{doc.kind}</p>
                <h3 className="mt-3 font-display text-lg font-medium text-steel-900">{doc.title}</h3>
                {doc.href ? (
                  <a
                    href={doc.href}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-amber-deep underline-offset-4 hover:underline"
                  >
                    Download
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-steel-600">{doc.note}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
      )}

      {/* PRODUCT DETAIL — tabs */}
      {useTabs && (
        <section className="border-y border-line bg-paper-sunken py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading
              index="04"
              eyebrow="Technical specifications"
              title="Specification, features and ordering"
              lede="Technical data is shown first; features, applications, compatibility, installation, safety, ordering and downloads are a click away."
            />
            <div className="mt-12">
              <ProductDetail product={product} />
            </div>
          </div>
        </section>
      )}

      {/* APPLICATION SETTINGS */}
      {product.applicationImages && product.applicationImages.length > 0 && (
        <section className="bg-paper py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading eyebrow="Applications" title="Where it is used" />
            <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
              {product.applicationImages.map((entry) => (
                <li key={entry.name}>
                  <div className="relative aspect-[4/3] overflow-hidden border border-line bg-paper-sunken">
                    <Media id={entry.imageId} sizes="(min-width: 1024px) 25vw, 50vw" decorative />
                  </div>
                  <p className="mt-3 text-sm font-medium leading-snug text-steel-900">{entry.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* RELATED */}
      {related.length > 0 && (
        <section className={`border-t border-line bg-paper-sunken py-16 lg:py-20 ${MOBILE_ONLY_DESKTOP}`}>
          <div className="shell" data-reveal>
            <SectionHeading
              eyebrow="Related products"
              title="Often specified alongside"
              align="between"
              action={
                <ButtonLink href={`/products/${family.id}`} variant="secondary">
                  All {family.name}
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              }
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3" data-reveal-group>
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {guidance.faq.length > 0 && (
        <section className="border-t border-line bg-paper py-16 lg:py-20">
          <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16" data-reveal>
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="FAQ" title="Questions we are actually asked" />
            </div>
            <dl className="lg:col-span-8">
              {guidance.faq.map((entry) => (
                <div key={entry.question} className="border-t border-line py-6 last:border-b">
                  <dt className="font-display text-lg font-medium text-steel-900">{entry.question}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-steel-700">{entry.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ENGINEERING ENQUIRY */}
      <section id="enquiry" className="scroll-mt-20 border-t border-line bg-paper py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16" data-reveal>
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Engineering enquiry"
              title={`Get a specification for ${product.name}.`}
              lede="Five answers about the opening are usually enough for us to come back with a configuration and a price."
            />
            <div className="mt-8 space-y-4">
              <a
                href={telHref()}
                className="flex items-center gap-3 text-base text-steel-900 hover:text-amber-deep"
              >
                <Phone className="h-5 w-5 text-amber" />
                {siteConfig.phone}
              </a>
              <a
                href={
                  useTabs
                    ? productWhatsappHref(product.name)
                    : whatsappHref(`Hello Standard Automation, I would like a quote for ${product.name}.`)
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-base text-steel-900 hover:text-amber-deep"
              >
                <WhatsApp className="h-5 w-5 text-amber" />
                WhatsApp us
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
              <EnquiryForm products={formProducts} families={formFamilies} presetProductId={product.id} />
            </Suspense>
          </div>
        </div>
      </section>

      <CtaBand
        title={closingBand[product.id]?.title ?? "Or talk it through with an engineer."}
        lede={
          closingBand[product.id]?.lede ??
          "If it is easier to describe the opening than to write it down, call or message us and we will work through it with you."
        }
        whatsappMessage={`Hello Standard Automation, I would like a quote for ${product.name}.`}
      />
    </>
  );
}

/**
 * One specification value, rendered against how firm it actually is.
 *
 *  - CONFIRMED    — the figure, plainly.
 *  - CONFIGURABLE — the figure as published. The dependency is carried by the
 *                   note under the tables and by the marked headline facts,
 *                   rather than by a badge on every row.
 *  - TBC          — either the qualification the issued data itself gives
 *                   ("application dependent", "project specific"), or, where
 *                   nothing was supplied, the field name with its expected
 *                   unit and no number invented to fill the gap.
 */
function SpecValue({ spec }: { spec: Spec }) {
  if (spec.value === null) {
    return (
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-steel-400">
        To be confirmed
        {spec.unit && <span className="ml-2 normal-case tracking-normal">({spec.unit})</span>}
      </span>
    );
  }

  return <span className="text-steel-800">{spec.value}</span>;
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <article className="bg-paper-raised p-7">
      <h3 className="eyebrow text-amber-deep">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-steel-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-steel-400" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
