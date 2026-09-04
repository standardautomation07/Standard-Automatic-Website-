import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { ArrowRight } from "@/components/ui/icons";
import { categories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Specification guidance for entrance automation, industrial doors, rolling shutters, loading bay equipment and access control. Product brochures and datasheets are in preparation.",
  alternates: { canonical: "/resources" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
];

/**
 * No brochures or datasheets exist yet (OPEN-BUSINESS-DECISIONS item 14), so
 * this page ships with the specification guidance we can genuinely give and
 * an honest note about downloads, rather than empty download buttons.
 */
const checklist = [
  {
    t: "Measure the clear opening, not the structure",
    d: "Clear width and clear height between finished surfaces, plus the headroom above the lintel and the side-run available beside the opening. These three numbers rule out most product types before anything else is discussed.",
  },
  {
    t: "Count the cycles",
    d: "How many times a day does the opening actually get used? Duty cycle, not opening width, determines the drive — and it is what usually causes premature failure when it is guessed.",
  },
  {
    t: "Say what has to stay in or out",
    d: "Temperature, dust, insects, noise, smoke, water, or just people. This decides whether you need a sealed insulated panel, a fabric curtain, a grille, or a fire-rated assembly.",
  },
  {
    t: "Note the site conditions",
    d: "Floor level and drainage across the opening, wind exposure, available power, and whether vehicles have to cross the threshold. Cantilever versus tracked, and rated versus standard, both come out of this.",
  },
  {
    t: "Decide the failure behaviour up front",
    d: "What should the opening do when power is lost, and what should it do on a fire alarm? Manual release, fail-safe and fail-secure behaviour are specification items, not afterthoughts.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <section className="border-b border-line bg-paper pt-10 lg:pt-14">
        <div className="shell pb-14 lg:pb-16">
          <Breadcrumb trail={trail} />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-amber-deep">Resources</p>
              <h1 className="mt-5 text-display-2 text-steel-900">
                What we need to know to specify an opening.
              </h1>
            </div>
            <p className="text-base leading-relaxed text-steel-600 lg:col-span-5">
              Five things decide almost every entrance automation specification. Gather these and a
              quotation becomes a short conversation rather than a long one.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper-sunken py-14 lg:py-20">
        <div className="shell">
          <ol className="grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
            {checklist.map((item, index) => (
              <li key={item.t} className="bg-paper-raised p-7">
                <span className="font-mono text-xs text-amber">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-display text-lg font-medium text-steel-900">{item.t}</h2>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{item.d}</p>
              </li>
            ))}
            <li className="bg-paper-raised p-7">
              <span className="font-mono text-xs text-steel-400">&mdash;</span>
              <h2 className="mt-4 font-display text-lg font-medium text-steel-900">
                Brochures and datasheets
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-steel-600">
                Downloadable product literature is in preparation. Until it is ready, ask us for the
                specification sheet for a particular product and we will send it directly.
              </p>
            </li>
          </ol>

          <div className="mt-12">
            <h2 className="eyebrow text-steel-500">Start from a product line</h2>
            <ul className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
              {categories.map((category) => (
                <li key={category.slug} className="bg-paper-raised">
                  <Link
                    href={`/products/${category.slug}`}
                    className="group flex h-full items-start justify-between gap-3 p-6"
                  >
                    <span>
                      <span className="block font-display text-base font-medium text-steel-900">
                        {category.name}
                      </span>
                      <span className="mt-1 block text-sm text-steel-600">{category.tagline}</span>
                    </span>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-amber transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ask for the specification sheet you need."
        lede="Tell us the product and the opening, and we will send the specification that applies to it."
      />
    </>
  );
}
