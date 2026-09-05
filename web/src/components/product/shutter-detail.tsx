import Link from "next/link";
import {
  FIRE_DISCLAIMER,
  SHUTTER_DISCLAIMER,
  shutterSizeStatements,
  WIND_DISCLAIMER,
} from "@/data/products/rolling-shutters";
import { industryById, productGuidance, productSpecGroups, resolveDetail } from "@/lib/catalog";
import type { Product, Spec } from "@/lib/types";
import { Accordion, AccordionList, AccordionNote } from "@/components/product/accordion";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";

/**
 * The Rolling Shutters product detail body.
 *
 * One component for every shutter rather than a page each. It reads the
 * product and renders the nine sections the business asked for as independent
 * accordion panels, so the page opens clean and the specifier expands only
 * what they need.
 *
 * Technical data is grouped tables, never a paragraph, and every table carries
 * the caveat that a shutter is made to its opening.
 */
export function ShutterDetail({ product }: { product: Product }) {
  const groups = productSpecGroups(product);
  const guidance = productGuidance(product);
  const safety = resolveDetail(product, "safety");
  const controls = resolveDetail(product, "controls");
  const options = resolveDetail(product, "options");
  const maintenance = resolveDetail(product, "maintenance");
  const sizeStatement = shutterSizeStatements[product.id];
  const isWind = product.facets?.performance.some((p) => p.includes("Wind") || p.includes("Storm"));
  const isFire = product.facets?.construction === "Fire Rated";

  const answered = groups.flatMap((g) => g.specs).filter((s) => s.value !== null).length;
  const total = groups.flatMap((g) => g.specs).length;

  const sections = [
    {
      id: "technical",
      title: "Technical Data",
      meta: `${answered} of ${total} published`,
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
          <AccordionNote>{SHUTTER_DISCLAIMER}</AccordionNote>
          {isWind && <AccordionNote>{WIND_DISCLAIMER}</AccordionNote>}
          {isFire && <AccordionNote>{FIRE_DISCLAIMER}</AccordionNote>}
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
      meta: "Motors, controls & accessories",
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
          <AccordionNote>
            Motor selection is calculated per opening from curtain weight, opening width and
            height, barrel diameter, required torque, speed, cycle frequency and the available
            supply. We do not assign one motor to a product line.
          </AccordionNote>
        </div>
      ),
    },
    {
      id: "installation",
      title: "Installation",
      meta: `${(product.installation ?? guidance.installation).length} steps`,
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
            We do not publish a universal maximum width or height for this family. What a given
            opening supports depends on curtain weight, profile, shaft, guide arrangement, wind
            load and the drive system, and those are settled together rather than read off a table.
          </p>
          <AccordionList
            items={[
              "Clear opening width and height, measured between the finished reveals",
              "Headroom above the opening for the rolled curtain and its cover",
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
      meta: `${safety.length} devices`,
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
      meta: "What we need to quote",
      content: (
        <div className="space-y-6">
          <AccordionList items={product.ordering ?? []} />
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
      meta: "Documentation",
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

  return <Accordion sections={sections} defaultOpen={["technical"]} />;
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
