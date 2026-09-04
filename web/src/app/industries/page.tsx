import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Where Standard Automation's entrance automation, industrial doors, rolling shutters, loading bay and access control systems are applied — manufacturing, warehousing, commercial, retail, healthcare and infrastructure.",
  alternates: { canonical: "/industries" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" },
];

/**
 * Each industry's product recommendations are grounded in the applications
 * data published on the individual product pages. The narrative describes
 * the constraint the industry has, not a claim about work delivered — real
 * project references are pending (see /projects).
 */
const industries = [
  {
    name: "Manufacturing",
    image: "/images/photography/manufacturing.jpg",
    alt: "Production machinery inside a manufacturing plant",
    constraint:
      "Production halls need openings that separate processes without slowing the material flow between them. Cycle time and sealing usually matter more than raw opening size.",
    products: [
      { label: "High Speed Industrial Doors", href: "/products/industrial-doors/high-speed-industrial-doors" },
      { label: "Overhead Sectional Doors", href: "/products/industrial-doors/overhead-sectional-doors" },
      { label: "Galvanized Rolling Shutters", href: "/products/rolling-shutters/galvanized-rolling-shutters" },
      { label: "Automatic Sliding Gates", href: "/products/entrance-automation/automatic-sliding-gates" },
    ],
  },
  {
    name: "Warehousing & Logistics",
    image: "/images/photography/warehouse-forklift.jpg",
    alt: "Forklift operating inside a large warehouse",
    constraint:
      "Every second a dock or throughway stands open costs conditioned air and adds pedestrian risk. Openings here are crossed hundreds of times a day, often by forklift.",
    products: [
      { label: "High Speed Roll Up Doors", href: "/products/industrial-doors/high-speed-roll-up-doors" },
      { label: "High Speed Self-Repairing Doors", href: "/products/industrial-doors/high-speed-self-repairing-doors" },
      { label: "Dock Levellers", href: "/products/loading-bay/dock-levellers" },
      { label: "Dock Houses & Shelters", href: "/products/loading-bay/dock-houses" },
    ],
  },
  {
    name: "Commercial & Corporate",
    image: "/images/photography/commercial-building.jpg",
    alt: "Modern commercial building with a glazed facade",
    constraint:
      "Lobbies have to move people quickly while still making an access decision at the door line — and the hardware has to read as building fit-out, not security equipment.",
    products: [
      { label: "Automatic Sliding Glass Doors", href: "/products/entrance-automation/automatic-sliding-glass-doors" },
      { label: "Flap Barriers", href: "/products/security-access/flap-barriers" },
      { label: "Tripod Turnstiles", href: "/products/security-access/tripod-turnstiles" },
      { label: "Boom Barriers", href: "/products/security-access/boom-barriers" },
    ],
  },
  {
    name: "Retail & Showrooms",
    image: "/images/photography/rolling-shutters.jpg",
    alt: "Roller shutters across a retail frontage",
    constraint:
      "A shopfront has to be secured out of hours without going blank. Visibility through the closed opening is often worth more than the extra security of a solid curtain.",
    products: [
      { label: "Polycarbonate Rolling Shutters", href: "/products/rolling-shutters/polycarbonate-rolling-shutters" },
      { label: "Bright Bar Rolling Shutters", href: "/products/rolling-shutters/bright-bar-rolling-shutters" },
      { label: "Perforated Rolling Shutters", href: "/products/rolling-shutters/perforated-rolling-shutters" },
      { label: "Aluminium Rolling Shutters", href: "/products/rolling-shutters/aluminium-rolling-shutters" },
    ],
  },
  {
    name: "Healthcare",
    image: "/images/photography/entrance-automation.jpg",
    alt: "Automatic glass entrance doors at a building entrance",
    constraint:
      "Corridors carry beds and trolleys continuously, surfaces have to be wipeable, and some openings need shielding as well as automation.",
    products: [
      { label: "Fire Sliding Doors", href: "/products/industrial-doors/fire-sliding-doors" },
      { label: "Automatic Sliding Glass Doors", href: "/products/entrance-automation/automatic-sliding-glass-doors" },
      { label: "Flap Barriers", href: "/products/security-access/flap-barriers" },
    ],
  },
  {
    name: "Infrastructure & Transit",
    image: "/images/photography/security-access.jpg",
    alt: "Access control turnstiles in a transit building",
    constraint:
      "Peak-flow entries need throughput without giving up the access decision, and perimeter points often have no permanent guard presence at all.",
    products: [
      { label: "Full Height Turnstiles", href: "/products/security-access/full-height-turnstiles" },
      { label: "Tripod Turnstiles", href: "/products/security-access/tripod-turnstiles" },
      { label: "Bollards", href: "/products/security-access/bollards" },
      { label: "Retractable Gates", href: "/products/entrance-automation/retractable-gates" },
    ],
  },
  {
    name: "Residential & Societies",
    image: "/images/photography/gates-industrial.jpg",
    alt: "Powered gate at a site entrance",
    constraint:
      "Society and villa entrances are moderate-duty but permanently visible, so appearance, noise and a dependable manual release matter as much as the drive itself.",
    products: [
      { label: "Swing Gates", href: "/products/entrance-automation/swing-gates" },
      { label: "Automatic Sliding Gates", href: "/products/entrance-automation/automatic-sliding-gates" },
      { label: "Residential Garage Doors", href: "/products/industrial-doors/residential-garage-doors" },
      { label: "Boom Barriers", href: "/products/security-access/boom-barriers" },
    ],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <section className="border-b border-line bg-paper pt-10 lg:pt-14">
        <div className="shell pb-14 lg:pb-16">
          <Breadcrumb trail={trail} />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-amber-deep">Industries</p>
              <h1 className="mt-5 text-display-2 text-steel-900">
                Different buildings, different failure modes.
              </h1>
            </div>
            <p className="text-base leading-relaxed text-steel-600 lg:col-span-5">
              The products below are grouped by the constraint each sector actually has — what the
              opening has to separate, how often it is crossed, and what happens when it is not
              working.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper-sunken py-14 lg:py-20">
        <div className="shell space-y-px border border-line bg-line">
          {industries.map((industry, index) => (
            <article
              key={industry.name}
              className="grid gap-8 bg-paper-raised p-7 lg:grid-cols-12 lg:gap-10 lg:p-10"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:col-span-4 lg:aspect-[4/3]">
                <Image
                  src={industry.image}
                  alt={industry.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-5">
                <p className="font-mono text-xs text-amber">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-display text-2xl font-medium text-steel-900">
                  {industry.name}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-steel-600">{industry.constraint}</p>
              </div>
              <div className="lg:col-span-3">
                <h3 className="eyebrow text-steel-500">Typically specified</h3>
                <ul className="mt-4 space-y-2">
                  {industry.products.map((product) => (
                    <li key={product.href}>
                      <Link
                        href={product.href}
                        className="group inline-flex items-center gap-2 text-sm text-steel-800 hover:text-amber-deep"
                      >
                        {product.label}
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-amber opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title="Tell us what the building has to do."
        lede="Describe the opening and the traffic it carries and we will tell you which of these products suits it."
      />
    </>
  );
}
