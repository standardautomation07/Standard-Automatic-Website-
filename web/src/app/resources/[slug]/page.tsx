import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, Check, Phone, WhatsApp } from "@/components/ui/icons";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { families, products } from "@/lib/catalog";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/json-ld";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";
import { getResourceGuide, resourceGuides, type GuideTable, type Inline } from "@/data/resources";

export function generateStaticParams() {
  return resourceGuides.map((guide) => ({ slug: guide.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const guide = getResourceGuide(slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.description,
    alternates: { canonical: `/resources/${guide.slug}` },
    openGraph: {
      type: "article",
      title: `${guide.metaTitle} | Standard Automation`,
      description: guide.description,
    },
  };
}

/** A paragraph or list item: plain text with links to existing pages. */
function Text({ runs }: { runs: Inline[] }) {
  return (
    <>
      {runs.map((run, index) =>
        typeof run === "string" ? (
          run
        ) : (
          <Link
            key={index}
            href={run.href}
            className="font-medium text-amber-deep underline-offset-4 hover:underline"
          >
            {run.text}
          </Link>
        ),
      )}
    </>
  );
}

/**
 * A comparison table. Phone: one block per row, so nothing is wider than the
 * screen. Wider screens: a table in the site's specification-table style.
 */
function GuideTableView({ table }: { table: GuideTable }) {
  const label = (row: GuideTable["rows"][number]) =>
    row.href ? (
      <Link
        href={row.href}
        className="font-display text-sm font-medium normal-case tracking-normal text-amber-deep underline-offset-4 hover:underline"
      >
        {row.label}
      </Link>
    ) : (
      row.label
    );

  return (
    <>
      <dl className="mt-6 border-t border-line md:hidden">
        {table.rows.map((row) => (
          <div key={row.label} className="border-b border-line py-5">
            <dt className="font-mono text-xs uppercase tracking-[0.08em] text-steel-500">{label(row)}</dt>
            {row.values.map((value, index) => (
              <dd key={index} className="mt-3">
                <span className="block text-xs font-medium text-steel-900">{table.columns[index]}</span>
                <span className="mt-1 block text-sm leading-relaxed text-steel-700">{value}</span>
              </dd>
            ))}
          </div>
        ))}
      </dl>

      <div className="mt-6 hidden overflow-hidden border border-line bg-paper-raised md:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-sunken/60">
              <th scope="col" className="w-1/5 px-5 py-3 text-left font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-steel-500">
                {table.labelHeading ?? <span className="sr-only">Aspect</span>}
              </th>
              {table.columns.map((column) => (
                <th key={column} scope="col" className="px-5 py-3 text-left font-display text-sm font-medium text-steel-900">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.label} className="border-b border-line last:border-b-0">
                <th
                  scope="row"
                  className="px-5 py-4 text-left align-top font-mono text-xs font-medium uppercase tracking-[0.08em] text-steel-500"
                >
                  {label(row)}
                </th>
                {row.values.map((value, index) => (
                  <td key={index} className="px-5 py-4 align-top leading-relaxed text-steel-800">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default async function ResourceGuidePage({ params }: Params) {
  const { slug } = await params;
  const guide = getResourceGuide(slug);
  if (!guide) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: guide.title, path: `/resources/${guide.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      {guide.faq.length > 0 && <JsonLd data={faqJsonLd(guide.faq)} />}

      <section className="border-b border-line bg-paper pt-10 lg:pt-14">
        <div className="shell pb-14 lg:pb-16">
          <Breadcrumb trail={trail} />
          <div className="hero-in mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-amber-deep">{guide.eyebrow}</p>
              <h1 className="mt-5 text-display-2 text-steel-900">{guide.title}</h1>
            </div>
            <p className="text-base leading-relaxed text-steel-600 lg:col-span-5">{guide.lede}</p>
          </div>
        </div>
      </section>

      <section className="bg-paper py-14 lg:py-20">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="min-w-0 lg:col-span-8">
            <div className="border-l-2 border-amber bg-paper-raised p-6 sm:p-8" data-reveal>
              <h2 className="eyebrow text-steel-500">The short answer</h2>
              <p className="mt-4 text-base leading-relaxed text-steel-800">{guide.answer}</p>
            </div>

            {guide.comparison && (
              <div className="mt-14" data-reveal>
                <h2 className="font-display text-2xl font-medium text-steel-900">At a glance</h2>
                <GuideTableView table={guide.comparison} />
              </div>
            )}

            {guide.sections.map((section) => (
              <section key={section.heading} className="mt-14" data-reveal>
                <h2 className="font-display text-2xl font-medium text-steel-900">{section.heading}</h2>
                {section.paragraphs?.map((runs, index) => (
                  <p key={index} className="mt-5 text-base leading-relaxed text-steel-700">
                    <Text runs={runs} />
                  </p>
                ))}
                {section.table && <GuideTableView table={section.table} />}
                {section.bullets && (
                  <ul className="mt-6 space-y-3">
                    {section.bullets.map((runs, index) => (
                      <li key={index} className="flex gap-3 text-base leading-relaxed text-steel-700">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-amber" />
                        <span>
                          <Text runs={runs} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.steps && (
                  <ol className="mt-6 border-t border-line">
                    {section.steps.map((runs, index) => (
                      <li
                        key={index}
                        className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-4"
                      >
                        <span className="font-mono text-xs text-amber">{String(index + 1).padStart(2, "0")}</span>
                        <p className="text-sm leading-relaxed text-steel-700">
                          <Text runs={runs} />
                        </p>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            ))}

            {guide.faq.length > 0 && (
              <section className="mt-14" data-reveal>
                <h2 className="font-display text-2xl font-medium text-steel-900">Frequently asked questions</h2>
                <dl className="mt-6">
                  {guide.faq.map((entry) => (
                    <div key={entry.question} className="border-t border-line py-6 last:border-b">
                      <dt>
                        <h3 className="font-display text-lg font-medium text-steel-900">{entry.question}</h3>
                      </dt>
                      <dd className="mt-3 text-sm leading-relaxed text-steel-700">{entry.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </article>

          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="border border-line bg-paper-raised p-7">
                <h2 className="eyebrow text-steel-500">Related pages</h2>
                <ul className="mt-4">
                  {guide.related.map((link) => (
                    <li key={link.href} className="border-t border-line first:border-t-0">
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between gap-3 py-3 text-sm text-steel-800 hover:text-steel-900"
                      >
                        {link.label}
                        <ArrowRight className="h-4 w-4 shrink-0 text-amber transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-line bg-paper-raised p-7">
                <h2 className="font-display text-lg font-medium text-steel-900">
                  {guide.sidebarCta?.title ?? "Not sure which door fits?"}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">
                  {guide.sidebarCta?.body ??
                    "Send the opening size, headroom and how often it is used, and we will recommend a configuration."}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <ButtonLink href="#enquiry" variant="primary">
                    Request a Quote
                  </ButtonLink>
                  <ButtonLink
                    href={whatsappHref(`Hello Standard Automation, I have a question about: ${guide.title}.`)}
                    variant="secondary"
                  >
                    <WhatsApp className="h-4 w-4" />
                    WhatsApp Us
                  </ButtonLink>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ENQUIRY — the same form as the product pages; it records this guide as the source page. */}
      <section id="enquiry" className="scroll-mt-20 border-t border-line bg-paper py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16" data-reveal>
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Engineering enquiry"
              title="Send us the opening."
              lede="Answer what you can — approximate figures are fine. We come back with a configuration and a price."
            />
            <div className="mt-8 space-y-4">
              <a href={telHref()} className="flex items-center gap-3 text-base text-steel-900 hover:text-amber-deep">
                <Phone className="h-5 w-5 text-amber" />
                {siteConfig.phone}
              </a>
              <a
                href={whatsappHref(`Hello Standard Automation, I have a question about: ${guide.title}.`)}
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
                <div className="border border-line bg-paper-raised p-8 text-sm text-steel-600">Loading enquiry form…</div>
              }
            >
              <EnquiryForm
                products={products.map(({ id, name, familyId }) => ({ id, name, familyId }))}
                families={families.map(({ id, name }) => ({ id, name }))}
                presetProductId={guide.enquiryProductId}
              />
            </Suspense>
          </div>
        </div>
      </section>

      <CtaBand
        title={guide.closing?.title ?? "Describe the opening. We will specify the door."}
        lede={
          guide.closing?.lede ??
          "Clear width and height, headroom, how often it is used and what it has to keep out — that is enough for a configuration and a quotation."
        }
        whatsappMessage={`Hello Standard Automation, I have a question about: ${guide.title}.`}
      />
    </>
  );
}
