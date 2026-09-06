import Link from "next/link";
import {
  FIRE_DISCLAIMER,
  SHUTTER_DISCLAIMER,
  shutterSizeStatements,
  WIND_DISCLAIMER,
} from "@/data/products/rolling-shutters";
import { highSpeedSizeStatements } from "@/data/products/high-speed-doors";
import { CONFIGURATION_NOTE } from "@/data/product-specs";
import { orderingFor, sizeStatementFor } from "@/data/product-detail-data";
import { industryById, productGuidance, productSpecGroups, resolveDetail } from "@/lib/catalog";
import type { Product, Spec } from "@/lib/types";
import { DetailList, DetailNote, Tabs } from "@/components/product/tabs";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";

/**
 * The tabbed product detail body.
 *
 * One component for every product that uses this treatment rather than a page
 * each. It reads the product and renders nine sections as horizontal tabs, so
 * the reader sees everything on offer at a glance and picks what they need.
 *
 * Used by Rolling Shutters and High Speed Doors. Both are families where the
 * buyer arrives knowing roughly what they want and needs to check a long
 * specification against their opening, which is exactly the case a stack of
 * always-open sections serves badly.
 *
 * Technical data is grouped tables, never a paragraph, and every table carries
 * the caveat that these products are made to their opening.
 */
export function ProductDetail({ product }: { product: Product }) {
  const groups = productSpecGroups(product);
  const guidance = productGuidance(product);
  const safety = resolveDetail(product, "safety");
  const controls = resolveDetail(product, "controls");
  const options = resolveDetail(product, "options");
  const maintenance = resolveDetail(product, "maintenance");
  const sizeStatement = sizeStatementFor(
    product,
    shutterSizeStatements[product.id] ?? highSpeedSizeStatements[product.id],
  );
  const ordering = orderingFor(product);
  const isWind = product.facets?.performance.some((p) => p.includes("Wind") || p.includes("Storm"));
  const isFire = product.facets?.construction === "Fire Rated";
  // Each family states the caveat in its own terms.
  const disclaimer =
    product.familyId === "rolling-shutters" ? SHUTTER_DISCLAIMER : CONFIGURATION_NOTE;

  const answered = groups.flatMap((g) => g.specs).filter((s) => s.value !== null).length;
  const total = groups.flatMap((g) => g.specs).length;

  const sections = [
    {
      id: "technical",
      title: "Technical Data",
      meta: `${answered}/${total}`,
      content: (
        <div className="space-y-6">
          <div className="space-y-6">
            {groups.map((group) => (
              <div key={group.group} className="overflow-x-auto border border-line bg-paper-raised">
                <table className="w-full min-w-[32rem] border-collapse text-sm">
                  <caption className="border-b border-line bg-paper-sunken/60 px-5 py-3 text-left font-mono text-[0.65rem] uppercase tracking-[0.12em] text-steel-500">
                    {group.group}
                  </caption>
                  <tbody>
                    {group.specs.map((spec) => (
                      <tr key={spec.label} className="border-b border-line last:border-b-0">
                        <th
                          scope="row"
                          className="w-2/5 px-5 py-3.5 text-left align-top font-mono text-xs font-medium uppercase tracking-[0.08em] text-steel-500"
                        >
                          {spec.label}
                          {spec.note && (
                            <span className="mt-1.5 block font-sans text-[0.7rem] normal-case tracking-normal text-steel-400">
                              {spec.note}
                            </span>
                          )}
                        </th>
                        <td className="px-5 py-3.5 align-top leading-relaxed">
                          <SpecCell spec={spec} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <DetailNote>{disclaimer}</DetailNote>
          {isWind && <DetailNote>{WIND_DISCLAIMER}</DetailNote>}
          {isFire && <DetailNote>{FIRE_DISCLAIMER}</DetailNote>}
        </div>
      ),
    },
    {
      id: "features",
      title: "Features",
      meta: `${product.benefits.length}`,
      content: (
        <dl className="grid gap-6 md:grid-cols-2">
          {product.benefits.map((benefit) => (
            <div key={benefit.title}>
              <dt className="font-display text-base font-medium text-steel-900">{benefit.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-steel-600">{benefit.body}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      id: "applications",
      title: "Applications",
      meta: `${product.applications.length}`,
      content: (
        <div className="space-y-8">
          <ul className="grid hairline-grid sm:grid-cols-2 lg:grid-cols-3">
            {product.applications.map((application) => (
              <li key={application} className="bg-paper-raised p-5 text-sm leading-relaxed text-steel-700">
                {application}
              </li>
            ))}
          </ul>
          <div>
            <h4 className="eyebrow text-steel-500">Industries</h4>
            <ul className="mt-4 flex flex-wrap gap-2">
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
        </div>
      ),
    },
    {
      id: "compatibility",
      title: "Compatibility",
      meta: `${(product.compatibility ?? guidance.integration).length}`,
      content: (
        <div className="space-y-6">
          <dl className="grid gap-6 md:grid-cols-2">
            {(product.compatibility ?? guidance.integration).map((entry) => (
              <div key={entry.system}>
                <dt className="font-display text-base font-medium text-steel-900">{entry.system}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-steel-600">{entry.detail}</dd>
              </div>
            ))}
          </dl>
          <DetailNote>
            Motor selection is calculated per opening from curtain weight, opening width and
            height, barrel diameter, required torque, speed, cycle frequency and the available
            supply. We do not assign one motor to a product line.
          </DetailNote>
        </div>
      ),
    },
    {
      id: "installation",
      title: "Installation",
      meta: `${(product.installation ?? guidance.installation).length}`,
      content: (
        <ol className="border-t border-line">
          {(product.installation ?? guidance.installation).map((step, index) => (
            <li
              key={step.slice(0, 30)}
              className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-4"
            >
              <span className="font-mono text-xs text-amber">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-sm leading-relaxed text-steel-700">{step}</p>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "dimensions",
      title: "Dimensions",
      meta: "Sizing",
      content: (
        <div className="space-y-6">
          <p className="font-display text-lg text-steel-900">{sizeStatement}</p>
          <p className="max-w-2xl text-sm leading-relaxed text-steel-600">
            We do not publish a universal maximum width or height. What a given opening supports
            depends on the leaf weight, the profile, the shaft or track, the guide arrangement,
            the wind load and the drive system, and those are settled together rather than read
            off a table.
          </p>
          <DetailList
            items={[
              "Clear opening width and height, measured between the finished reveals",
              "Headroom above the opening for the stored leaf and its cover",
              "Side room at both jambs for the guides",
              "Face mounted, between jamb or recessed",
            ]}
          />
        </div>
      ),
    },
    {
      id: "safety",
      title: "Safety",
      meta: `${safety.length}`,
      content: (
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="eyebrow text-amber-deep">Safety</h4>
            <ul className="mt-4 space-y-3">
              {safety.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-steel-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="eyebrow text-amber-deep">Controls</h4>
            <ul className="mt-4 space-y-3">
              {controls.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-steel-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="eyebrow text-amber-deep">Options</h4>
            <ul className="mt-4 space-y-3">
              {options.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-steel-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="eyebrow text-amber-deep">Maintenance</h4>
            <ul className="mt-4 space-y-3">
              {maintenance.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-steel-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "ordering",
      title: "Ordering Information",
      meta: `${ordering.length}`,
      content: (
        <div className="space-y-6">
          <DetailList items={ordering} />
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#enquiry" variant="primary">
              Request a Quote
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Talk to an engineer
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      ),
    },
    {
      id: "downloads",
      title: "Downloads",
      meta: `${product.documents.length}`,
      content: (
        <div className="space-y-4">
          <ul className="grid hairline-grid md:grid-cols-2">
            {product.documents.map((document) => (
              <li key={document.title} className="bg-paper-raised p-5">
                <p className="eyebrow text-steel-500">{document.kind}</p>
                <h4 className="mt-2 font-display text-base font-medium text-steel-900">
                  {document.title}
                </h4>
                {document.href ? (
                  <a
                    href={document.href}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-amber-deep underline-offset-4 hover:underline"
                  >
                    Download
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-steel-600">{document.note}</p>
                )}
              </li>
            ))}
          </ul>
          <p className="text-xs leading-relaxed text-steel-500">
            Only documents that exist are listed here. Where a datasheet is still in preparation we
            say so rather than linking to a file that is not there.
          </p>
        </div>
      ),
    },
  ];

  return <Tabs sections={sections} defaultTab="technical" label={`${product.name} detail`} />;
}

/** Same three-state rendering the rest of the site uses. */
function SpecCell({ spec }: { spec: Spec }) {
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
