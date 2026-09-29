import Link from "next/link";
import type { Metadata } from "next";
import { image } from "@/data/images";
import { notFound } from "next/navigation";
import {
  categoriesInFamily,
  families,
  familyPath,
  getFamily,
  industryById,
  productPath,
  productsInCategory,
  products,
  productsInFamily,
  specCompleteness,
} from "@/lib/catalog";
import { ProductCard } from "@/components/product/cards";
import { ShutterFilters } from "@/components/product/shutter-filters";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, familyCollectionJsonLd } from "@/lib/json-ld";
import { Media, StatusBadge } from "@/components/ui/media";
import { ArrowRight, Check } from "@/components/ui/icons";
import type { FamilyId } from "@/lib/types";

export function generateStaticParams() {
  return families.map((family) => ({ family: family.id }));
}

type Params = { params: Promise<{ family: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { family: id } = await params;
  const family = getFamily(id);
  if (!family) return {};

  const seoTitles: Record<string, string> = {
    "high-speed-doors": "High Speed Doors for Industrial Applications | Standard Automation",
    "industrial-doors": "Industrial Doors & Sectional Overhead Doors | Standard Automation",
    "rolling-shutters": "Industrial Rolling Shutters | Standard Automation",
    "fire-safety-doors": "Fire & Safety Doors for Industrial Openings | Standard Automation",
    "automatic-gates": "Automatic Gates for Industrial & Commercial Sites | Standard Automation",
    "entrance-automation": "Entrance Automation & Automatic Doors | Standard Automation",
    "loading-bay": "Loading Bay Equipment & Dock Systems | Standard Automation",
    "access-control": "Access Control & Vehicle Barriers | Standard Automation",
  };
  const seoDescriptions: Record<string, string> = {
    "high-speed-doors": "High speed doors for warehouses, factories, loading areas and controlled environments. Compare roll-up, fold-up, self-repairing, spiral and specialist door configurations.",
    "industrial-doors": "Industrial doors including sectional overhead doors and garage door systems, selected around opening size, headroom, insulation, traffic and site conditions.",
    "rolling-shutters": "Industrial rolling shutters in insulated, galvanized, aluminium, grille, perforated and transparent configurations for factories, warehouses and commercial openings.",
    "fire-safety-doors": "Fire and safety door systems for openings in fire compartment lines, specified against the required project documentation and tested assembly.",
    "automatic-gates": "Automatic sliding, telescopic, swing and retractable gates for industrial, commercial and institutional vehicle entrances, selected around site geometry and duty.",
    "entrance-automation": "Entrance automation and automatic sliding door systems for offices, retail, healthcare and commercial buildings, selected around throughput, accessibility, sealing and egress.",
    "loading-bay": "Loading bay equipment including dock levellers, dock shelters and dock houses for warehouses, distribution centres, manufacturing and cold-chain facilities.",
    "access-control": "Access control and vehicle barriers including boom barriers, bollards, tripod turnstiles, flap barriers and full height turnstiles for controlled pedestrian and vehicle access.",
  };
  return {
    title: seoTitles[family.id] ?? family.name,
    description: seoDescriptions[family.id] ?? family.summary,
    alternates: { canonical: `/products/${family.id}` },
    openGraph: {
      title: `${family.name} | Standard Automation`,
      description: family.summary,
      images: [{ url: image(family.imageId).src }],
    },
  };
}

export default async function FamilyPage({ params }: Params) {
  const { family: id } = await params;
  const family = getFamily(id);
  if (!family) notFound();

  const familyId = family.id as FamilyId;
  const items = productsInFamily(familyId);
  const cats = categoriesInFamily(familyId);
  const others = families.filter((f) => f.id !== family.id);

  // A product lives in one family and has one URL. Cross-listed products are
  // genuinely part of this range but keep their page where it belongs, so
  // they are surfaced here as clearly-labelled cards rather than duplicated.
  const crossListed = products.filter((p) => p.crossListedIn?.includes(familyId));
  const comparable = [...items, ...crossListed].filter((p) => p.comparison);
  const showFilters = items.length >= 8 && items.every((p) => p.facets);

  const trail = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: family.name, path: `/products/${family.id}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd
        data={familyCollectionJsonLd(
          family.name,
          family.summary,
          `/products/${family.id}`,
          items.map((product) => ({ name: product.name, path: productPath(product) })),
        )}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0 overflow-hidden">
          <Media id={family.imageId} sizes="100vw" priority decorative className="img-settle opacity-55" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/20" />
        <div className="grid-fine absolute inset-0" aria-hidden="true" />
        <div className="hero-in shell relative flex min-h-[24rem] flex-col justify-end py-14 lg:min-h-[32rem] lg:py-20">
          <Breadcrumb trail={trail} tone="dark" />
          <h1 className="mt-8 max-w-3xl text-display-2 text-white">{family.name}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-steel-300 lg:text-lg">
            {family.tagline}
          </p>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6">
            <div>
              <dt className="eyebrow text-steel-500">Categories</dt>
              <dd className="mt-1 font-display text-xl text-white">{cats.length}</dd>
            </div>
            <div>
              <dt className="eyebrow text-steel-500">Products</dt>
              <dd className="mt-1 font-display text-xl text-white">{items.length}</dd>
            </div>
            <div>
              <dt className="eyebrow text-steel-500">Configurations</dt>
              <dd className="mt-1 font-display text-xl text-white">
                {items.reduce((total, product) => total + product.variants.length, 0)}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16" data-reveal>
          <div className="lg:col-span-7">
            <SectionHeading index="01" eyebrow="Introduction" title={`About ${family.name.toLowerCase()}`} />
            <div className="mt-8">
              {family.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mb-5 text-base leading-relaxed text-steel-700 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="border border-line bg-paper-raised p-7">
              <h2 className="eyebrow text-steel-500">Typical applications</h2>
              <ul className="mt-5 space-y-3">
                {family.applications.map((application) => (
                  <li key={application} className="flex gap-3 text-sm leading-relaxed text-steel-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                    {application}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {family.id === "high-speed-doors" && (
        <section className="bg-paper py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading index="02" eyebrow="Quick answers" title="What is a high-speed industrial door?" />
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">A high-speed door is built for frequent operation.</h3>
                <p className="mt-4 text-sm leading-relaxed text-steel-700">
                  It is a powered opening designed to move quickly and keep the opening closed as much as possible between movements. On busy industrial and logistics openings, the main cost is usually the time the opening stands open to dust, insects, temperature loss, noise and vehicle or pedestrian conflict.
                </p>
              </div>
              <div className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">How to choose the right type</h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-steel-700">
                  <li><Link href="/products/high-speed-doors/high-speed-roll-up-door" className="font-medium text-steel-900 underline-offset-4 hover:underline">Roll-up doors</Link> suit frequent internal or sheltered openings.</li>
                  <li><Link href="/products/high-speed-doors/high-speed-fold-up-door" className="font-medium text-steel-900 underline-offset-4 hover:underline">Fold-up doors</Link> suit openings where the available space above the lintel favours a folding stack.</li>
                  <li><Link href="/products/high-speed-doors/high-speed-self-repairing-door" className="font-medium text-steel-900 underline-offset-4 hover:underline">Self-repairing doors</Link> suit impact-prone routes with forklift or vehicle movement nearby.</li>
                  <li><Link href="/products/high-speed-doors/high-speed-spiral-door" className="font-medium text-steel-900 underline-offset-4 hover:underline">Spiral doors</Link> use a rigid leaf for openings where that construction suits the application.</li>
                  <li><Link href="/products/high-speed-doors/high-speed-rigid-insulated-door" className="font-medium text-steel-900 underline-offset-4 hover:underline">Rigid / insulated doors</Link> suit openings where a rigid leaf and environmental separation are required.</li>
                  <li><Link href="/products/high-speed-doors/high-speed-cleanroom-hygiene-door" className="font-medium text-steel-900 underline-offset-4 hover:underline">Cleanroom / hygiene doors</Link> are selected around the room’s cleaning and controlled-environment requirements.</li>
                  <li><Link href="/products/high-speed-doors/high-speed-cold-storage-freezer-door" className="font-medium text-steel-900 underline-offset-4 hover:underline">Cold storage / freezer doors</Link> are considered where the opening serves a cold-chain environment.</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 grid gap-8 border-t border-line pt-8 lg:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-medium text-steel-900">Information required for a high speed door enquiry</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-700">Clear opening width and height, the application, whether the opening is indoors or exposed outdoors, and the usage or environment are useful starting points. Add the project location and any site constraints you already know; details can be confirmed during assessment.</p>
              </div>
              <p className="text-sm leading-relaxed text-steel-700">Final selection also depends on available headroom and side room, traffic near the opening, and what the door needs to separate. No single configuration is assumed from dimensions alone.</p>
            </div>
          </div>
        </section>
      )}

      {family.id === "industrial-doors" && (
        <section className="bg-paper py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading index="02" eyebrow="Quick answers" title="Sectional door vs rolling shutter" />
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">What is an industrial sectional overhead door?</h3>
                <p className="mt-4 text-sm leading-relaxed text-steel-700">It is a door made from hinged panels that travel on tracks and turn overhead as the door opens, storing beneath the roof. The <Link href="/products/industrial-doors/industrial-sectional-overhead-doors" className="font-medium text-steel-900 underline-offset-4 hover:underline">industrial sectional overhead door</Link> is selected around the opening, available headroom and required lift arrangement.</p>
              </div>
              <div className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">Which arrangement suits the opening?</h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-steel-700">
                  <li><strong className="font-medium text-steel-900">Headroom and space:</strong> a sectional door needs track and storage space overhead; a rolling shutter stores its curtain above the lintel and uses guides at the sides.</li>
                  <li><strong className="font-medium text-steel-900">Opening and operation:</strong> consider how the opening is used, what must remain clear around it, and whether the overhead track arrangement fits the building.</li>
                  <li><strong className="font-medium text-steel-900">Visibility and insulation:</strong> consider whether the closed opening needs vision panels and whether insulated panels or a particular shutter construction better fits the requirement.</li>
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-steel-700">Compare with <Link href="/products/rolling-shutters" className="font-medium text-steel-900 underline-offset-4 hover:underline">rolling shutter options</Link> after checking the available space and application.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {family.id === "rolling-shutters" && (
        <section className="bg-paper py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading index="02" eyebrow="Quick answers" title="What are industrial rolling shutters?" />
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">A rolling shutter is a curtain that stores above the opening.</h3>
                <p className="mt-4 text-sm leading-relaxed text-steel-700">
                  It is selected for security, weather protection, visibility, or environmental separation, while keeping the opening clear when the shutter is open. In industrial and commercial work, the main choice is usually between solid, perforated and vision curtain constructions.
                </p>
              </div>
              <div className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">Solid vs perforated vs vision</h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-steel-700">
                  <li><strong className="font-medium text-steel-900">Solid shutters</strong> suit security and general industrial openings.</li>
                  <li><strong className="font-medium text-steel-900">Perforated shutters</strong> suit openings where airflow, light or visibility matters.</li>
                  <li><strong className="font-medium text-steel-900">Vision shutters</strong> allow sight through the opening while keeping a secure curtain.</li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="eyebrow text-steel-500">Relevant products</h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {[
                  ["/products/rolling-shutters/ms-solid-rolling-shutters", "MS Solid Rolling Shutter"],
                  ["/products/rolling-shutters/perforated-rolling-shutters", "Perforated Rolling Shutter"],
                  ["/products/rolling-shutters/vision-window-rolling-shutters", "Vision / Window Rolling Shutter"],
                  ["/products/rolling-shutters/aluminium-rolling-shutters", "Aluminium Rolling Shutter"],
                  ["/products/rolling-shutters/insulated-double-wall-rolling-shutters", "Insulated Double-Wall Rolling Shutter"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="inline-flex rounded-edge border border-line px-3 py-2 text-sm text-steel-800 transition-colors hover:border-steel-900 hover:text-steel-900">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {family.id === "loading-bay" && (
        <section className="bg-paper py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading index="02" eyebrow="Quick answers" title="What is loading bay equipment?" />
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">A dock leveller bridges the bay to the vehicle.</h3>
                <p className="mt-4 text-sm leading-relaxed text-steel-700">
                  A dock leveller is the load-bearing bridge between the warehouse floor and the vehicle bed. It lets forklifts and pallet trucks move from the warehouse to the trailer without a step or loose plate, while accommodating the height difference between standard dock and vehicle bed.
                </p>
              </div>
              <div className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">What should a buyer consider?</h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-steel-700">
                  <li>The vehicle mix and the dock height range.</li>
                  <li>Whether the bay needs sealing around the vehicle as well as under it.</li>
                  <li>Whether the bay is in a cold environment or a standard loading bay.</li>
                  <li>How often the bay is used and how the opening is protected.</li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="eyebrow text-steel-500">Relevant products</h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {[
                  ["/products/loading-bay/dock-levellers", "Dock Levellers"],
                  ["/products/loading-bay/dock-shelters-and-houses", "Dock Shelters & Dock Houses"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="inline-flex rounded-edge border border-line px-3 py-2 text-sm text-steel-800 transition-colors hover:border-steel-900 hover:text-steel-900">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 grid gap-8 border-t border-line pt-8 lg:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-medium text-steel-900">Dock leveller vs dock shelter</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-700">A <Link href="/products/loading-bay/dock-levellers" className="font-medium text-steel-900 underline-offset-4 hover:underline">dock leveller</Link> bridges and adjusts for the height difference between the fixed dock and vehicle bed, providing a crossing for handling equipment. A <Link href="/products/loading-bay/dock-shelters-and-houses" className="font-medium text-steel-900 underline-offset-4 hover:underline">dock shelter</Link> helps seal the loading interface around the vehicle. They address different parts of the bay and may be specified together where both level transition and perimeter sealing are needed.</p>
              </div>
              <div>
                <h3 className="font-display text-lg font-medium text-steel-900">Information required for loading bay selection</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-700">Useful enquiry inputs include the dock and bay configuration, the vehicle bed-height range, the handling equipment and its axle/load information, and whether the bay needs sealing against weather or temperature. These are selection inputs, not guaranteed product ratings or working ranges.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {family.id === "entrance-automation" && (
        <section className="bg-paper py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading index="02" eyebrow="Quick answers" title="Choosing an automatic pedestrian door" />
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">Automatic sliding vs swing doors</h3>
                <p className="mt-4 text-sm leading-relaxed text-steel-700"><Link href="/products/entrance-automation/automatic-sliding-glass-doors" className="font-medium text-steel-900 underline-offset-4 hover:underline">Automatic sliding doors</Link> move leaves alongside the opening, so selection depends on the clear opening needed and the side space available for the leaves. <Link href="/products/entrance-automation/automatic-swing-doors" className="font-medium text-steel-900 underline-offset-4 hover:underline">Automatic swing doors</Link> need a clear swing area and are considered where the opening and surrounding traffic allow the leaf to move through that space. Footfall, accessibility and escape-route behaviour also inform selection.</p>
              </div>
              <div className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">Hermetic doors vs cleanroom doors</h3>
                <p className="mt-4 text-sm leading-relaxed text-steel-700"><Link href="/products/entrance-automation/hermetic-cleanroom-doors" className="font-medium text-steel-900 underline-offset-4 hover:underline">Hermetic door systems</Link> are selected where sealing and the room’s pressure or containment requirements matter. “Cleanroom door” describes an application context: classification depends on the room design, air handling and validated system, not on a door alone. Specify the room requirements, pressure conditions, cleaning regime and interlock needs with the project team.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {family.id === "access-control" && (
        <section className="bg-paper py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading index="02" eyebrow="Quick answers" title="Selecting access control equipment" />
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <article className="border border-line bg-paper-raised p-6">
                <h3 className="font-display text-lg font-medium text-steel-900">What is a boom barrier?</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-700">A <Link href="/products/access-control/boom-barriers" className="font-medium text-steel-900 underline-offset-4 hover:underline">boom barrier</Link> meters vehicle movements at an entrance. It controls access flow; it is not a substitute for physical vehicle protection.</p>
              </article>
              <article className="border border-line bg-paper-raised p-6">
                <h3 className="font-display text-lg font-medium text-steel-900">What is a bollard?</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-700">A <Link href="/products/access-control/bollards" className="font-medium text-steel-900 underline-offset-4 hover:underline">bollard</Link> is positioned at the vehicle line to provide a physical barrier. The required protection and supporting installation must be established for the site.</p>
              </article>
              <article className="border border-line bg-paper-raised p-6">
                <h3 className="font-display text-lg font-medium text-steel-900">What is a tripod turnstile?</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-700">A <Link href="/products/access-control/tripod-turnstiles" className="font-medium text-steel-900 underline-offset-4 hover:underline">tripod turnstile</Link> controls pedestrian passage through a single-person lane and can be integrated with an access system.</p>
              </article>
              <article className="border border-line bg-paper-raised p-6">
                <h3 className="font-display text-lg font-medium text-steel-900">How to select access control equipment</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-700">First identify whether the point controls vehicles or pedestrians. For vehicles, distinguish traffic metering by a <Link href="/products/access-control/boom-barriers" className="font-medium text-steel-900 underline-offset-4 hover:underline">boom barrier</Link> from physical protection by <Link href="/products/access-control/bollards" className="font-medium text-steel-900 underline-offset-4 hover:underline">bollards</Link>. For pedestrians, compare <Link href="/products/access-control/tripod-turnstiles" className="font-medium text-steel-900 underline-offset-4 hover:underline">tripod</Link>, <Link href="/products/access-control/flap-barriers" className="font-medium text-steel-900 underline-offset-4 hover:underline">flap</Link> and <Link href="/products/access-control/full-height-turnstiles" className="font-medium text-steel-900 underline-offset-4 hover:underline">full-height turnstiles</Link> or <Link href="/products/access-control/retractable-barriers" className="font-medium text-steel-900 underline-offset-4 hover:underline">retractable barriers</Link> against throughput, supervision, accessibility, site conditions and emergency behaviour.</p>
              </article>
            </div>
          </div>
        </section>
      )}

      {family.id === "automatic-gates" && (
        <section className="bg-paper py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading index="02" eyebrow="Quick answers" title="What is an automatic sliding gate?" />
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">Sliding gates move along the boundary.</h3>
                <p className="mt-4 text-sm leading-relaxed text-steel-700">
                  An automatic sliding gate is chosen when the opening is wide and there is no room for a leaf to swing into the road or yard. It runs parallel to the boundary and is usually selected where the site has a defined side-run or a cantilever arrangement is needed.
                </p>
              </div>
              <div className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">Sliding vs swing</h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-steel-700">
                  <li><strong className="font-medium text-steel-900">Sliding gates</strong> suit wide openings and sites where the driveway must remain clear.</li>
                  <li><strong className="font-medium text-steel-900">Swing gates</strong> suit sites with clear swing room and moderate traffic.</li>
                  <li><strong className="font-medium text-steel-900">Telescopic gates</strong> solve short boundary space on very wide openings.</li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="eyebrow text-steel-500">Relevant products</h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {[
                  ["/products/automatic-gates/automatic-sliding-gates", "Automatic Sliding Gates"],
                  ["/products/automatic-gates/telescopic-sliding-gates", "Telescopic Sliding Gates"],
                  ["/products/automatic-gates/automatic-swing-gates", "Automatic Swing Gates"],
                  ["/products/automatic-gates/retractable-gates", "Retractable Gates"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="inline-flex rounded-edge border border-line px-3 py-2 text-sm text-steel-800 transition-colors hover:border-steel-900 hover:text-steel-900">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {family.id === "fire-safety-doors" && (
        <section className="bg-paper py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading index="02" eyebrow="Quick answers" title="How should fire and safety doors be specified?" />
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">Fire performance belongs to the tested assembly.</h3>
                <p className="mt-4 text-sm leading-relaxed text-steel-700">
                  For a fire-rated opening, the required performance must be established for the proposed door configuration and installation. The relevant evidence may depend on the door construction, guides, hardware, release arrangement, dimensions and site installation. A product name alone should not be treated as a fire rating.
                </p>
              </div>
              <div className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">What should be confirmed before quotation?</h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-steel-700">
                  <li>The opening width and height and the type of wall or partition receiving the door.</li>
                  <li>The required fire-compartmentation objective and project documentation.</li>
                  <li>The proposed door construction, operating arrangement and any release or interface requirements.</li>
                  <li>Any test report, certificate or approved assembly documentation required by the project.</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 grid gap-8 border-t border-line pt-8 lg:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-medium text-steel-900">Fire-rated rolling shutters</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-700">
                  Our <Link href="/products/fire-safety-doors/fire-rated-rolling-shutters" className="font-medium text-steel-900 underline-offset-4 hover:underline">fire-rated rolling shutter</Link> information is intentionally configuration-dependent. Request project-specific documentation and test evidence for the proposed assembly rather than relying on a generic duration or classification.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-medium text-steel-900">Fire-rated sliding doors</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-700">
                  <Link href="/products/fire-safety-doors/fire-rated-sliding-doors" className="font-medium text-steel-900 underline-offset-4 hover:underline">Fire-rated sliding doors</Link> should likewise be specified against the project documentation and the exact assembly proposed. Where certification or testing is required, confirm its scope and applicability before ordering.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-line bg-paper-sunken py-12">
        <div className="shell flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow text-steel-500">Engineering support</p>
            <h2 className="mt-2 font-display text-2xl font-medium text-steel-900">Need help selecting a system?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-steel-600">
              Share the opening dimensions, application, site location and operating requirements. Our <Link href="/service-support" className="font-medium text-steel-900 underline-offset-4 hover:underline">service and support team</Link> can help identify the information needed for engineering review. You can also browse the <Link href="/resources" className="font-medium text-steel-900 underline-offset-4 hover:underline">resources</Link> area for available technical information.
            </p>
          </div>
          <Link href="/contact" className="inline-flex shrink-0 items-center rounded-edge border border-steel-900 px-5 py-3 text-sm font-medium text-steel-900 transition-colors hover:bg-steel-900 hover:text-white">
            Request a consultation
          </Link>
        </div>
      </section>

      {/* Why this family */}
      <section className="border-y border-line bg-paper-sunken py-16 lg:py-20">
        <div className="shell" data-reveal>
          <SectionHeading index="02" eyebrow="Why" title={`Why ${family.name.toLowerCase()}?`} />
          <div className="mt-12 grid hairline-grid md:grid-cols-2 xl:grid-cols-4">
            {family.why.map((point) => (
              <article key={point.title} className="bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories and their products */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="shell" data-reveal>
          <SectionHeading
            index="03"
            eyebrow="Categories"
            title="Grouped by how they actually work"
            lede="A category here is a construction or operating principle — the level at which two products genuinely behave differently, rather than just being finished differently."
          />

          <div className="mt-14 space-y-16">
            {cats.map((category) => {
              const inCategory = productsInCategory(category.id);
              return (
                <div key={category.id} id={category.id} className="scroll-mt-24">
                  <div className="grid gap-4 border-t border-steel-900/20 pt-6 lg:grid-cols-12 lg:gap-10">
                    <h3 className="font-display text-2xl font-medium text-steel-900 lg:col-span-4">
                      {category.name}
                    </h3>
                    <p className="text-base leading-relaxed text-steel-600 lg:col-span-8">
                      {category.principle}
                    </p>
                  </div>
                  <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {inCategory.map((product, index) => (
                      <ProductCard key={product.id} product={product} priority={index < 3} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter and browse */}
      {showFilters && (
        <section className="border-t border-line bg-paper-sunken py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading
              index="04"
              eyebrow="Find a shutter"
              title="Filter the range"
              lede="Narrow by what it is made of, how the curtain is built, how hard it has to work, how it is operated and what it has to withstand."
            />
            <div className="mt-12">
              <ShutterFilters products={items} />
            </div>
          </div>
        </section>
      )}

      {/* Cross-listed */}
      {crossListed.length > 0 && (
        <section className="border-t border-line bg-paper py-16 lg:py-20">
          <div className="shell" data-reveal>
            <SectionHeading
              eyebrow="Also part of this range"
              title="Listed under another family"
              lede="These products belong to this range but their page sits with the family that governs how they behave, so there is one page per product rather than two."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {crossListed.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comparison */}
      <section className="border-y border-line bg-paper-sunken py-16 lg:py-20">
        <div className="shell" data-reveal>
          <SectionHeading
            index="04"
            eyebrow="Compare"
            title="Side by side"
            lede="What each product in this family is for, what it is built to survive, and whether we can publish a specification table for it today."
          />
          {/* Phone: one stacked card per product, so the comparison never
              needs a sideways scroll. The table below is desktop only. */}
          <ul className="mt-12 grid gap-3 lg:hidden">
            {items.map((product) => {
              const { published, total } = specCompleteness(product);
              const rows = [
                ["Category", cats.find((c) => c.id === product.categoryId)?.name ?? "—"],
                ...(comparable.length > 0
                  ? [
                      ["Material", product.comparison?.material ?? "—"],
                      ["Thickness", product.comparison?.thickness ?? "—"],
                      ["Corrosion", product.comparison?.corrosion ?? "—"],
                    ]
                  : []),
                ["Environment", product.environments.join(", ")],
                ["Configurations", String(product.variants.length)],
                ["Published fields", `${published} / ${total}`],
              ];
              return (
                <li key={product.id} className="border border-line bg-paper-raised p-5">
                  <h3 className="font-display text-base font-medium text-steel-900">
                    <Link href={productPath(product)} className="underline-offset-4 hover:underline">
                      {product.name}
                    </Link>
                    <StatusBadge status={product.status} className="ml-2 align-middle" />
                  </h3>
                  <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                    {rows.map(([k, v]) => (
                      <div key={k} className="contents">
                        <dt className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-steel-500 pt-0.5">{k}</dt>
                        <dd className="text-steel-700 [overflow-wrap:anywhere]">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 hidden overflow-hidden border border-line bg-paper-raised lg:block">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">{family.name} product comparison</caption>
              <thead>
                <tr className="border-b border-line bg-paper-sunken/60">
                  <th scope="col" className="px-5 py-4 text-left font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel-500">
                    Product
                  </th>
                  <th scope="col" className="px-5 py-4 text-left font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel-500">
                    Category
                  </th>
                  {comparable.length > 0 && (
                    <>
                      <th scope="col" className="px-5 py-4 text-left font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel-500">
                        Material
                      </th>
                      <th scope="col" className="px-5 py-4 text-left font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel-500">
                        Thickness
                      </th>
                      <th scope="col" className="px-5 py-4 text-left font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel-500">
                        Corrosion
                      </th>
                    </>
                  )}
                  <th scope="col" className="px-5 py-4 text-left font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel-500">
                    Environment
                  </th>
                  <th scope="col" className="px-5 py-4 text-left font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel-500">
                    Configurations
                  </th>
                  <th scope="col" className="px-5 py-4 text-left font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel-500">
                    Published fields
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((product) => (
                  <tr key={product.id} className="border-b border-line last:border-b-0">
                    <th scope="row" className="px-5 py-4 text-left align-top font-medium text-steel-900">
                      <Link href={productPath(product)} className="underline-offset-4 hover:underline">
                        {product.name}
                      </Link>
                      <StatusBadge status={product.status} className="ml-2 align-middle" />
                    </th>
                    <td className="px-5 py-4 align-top text-steel-600">
                      {cats.find((c) => c.id === product.categoryId)?.name}
                    </td>
                    {comparable.length > 0 && (
                      <>
                        <td className="px-5 py-4 align-top text-steel-600">
                          {product.comparison?.material ?? "—"}
                        </td>
                        <td className="px-5 py-4 align-top text-steel-600">
                          {product.comparison?.thickness ?? "—"}
                        </td>
                        <td className="px-5 py-4 align-top text-steel-600">
                          {product.comparison?.corrosion ?? "—"}
                        </td>
                      </>
                    )}
                    <td className="px-5 py-4 align-top text-steel-600">
                      {product.environments.join(", ")}
                    </td>
                    <td className="px-5 py-4 align-top text-steel-600">{product.variants.length}</td>
                    <td className="px-5 py-4 align-top text-steel-600">
                      {(() => {
                        const { published, total } = specCompleteness(product);
                        return `${published} / ${total}`;
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Considerations + industries */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16" data-reveal>
          <div className="lg:col-span-7">
            <SectionHeading
              index="05"
              eyebrow="Performance considerations"
              title="What actually decides the specification"
            />
            <ol className="mt-10">
              {family.considerations.map((item, index) => (
                <li key={item.slice(0, 30)} className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-line py-5 last:border-b">
                  <span className="font-mono text-xs text-amber">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed text-steel-700">{item}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5">
            <h2 className="eyebrow text-steel-500">Industries served</h2>
            <ul className="mt-5 grid hairline-grid">
              {family.industries.map((industryId) => {
                const industry = industryById[industryId];
                return (
                  <li key={industryId} className="bg-paper-raised">
                    <Link href={`/industries/${industry.id}`} className="group flex items-start justify-between gap-3 p-5">
                      <span>
                        <span className="block font-display text-base font-medium text-steel-900">
                          {industry.name}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-steel-600">
                          {industry.tagline}
                        </span>
                      </span>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-amber transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Related families */}
      <section className="border-t border-line bg-paper pb-20 lg:pb-24">
        <div className="shell" data-reveal>
          <h2 className="eyebrow pt-16 text-steel-500">Related solutions</h2>
          <ul className="mt-6 grid hairline-grid sm:grid-cols-2 xl:grid-cols-4">
            {others.map((other) => (
              <li key={other.id} className="bg-paper-raised">
                <Link href={familyPath(other.id)} className="group flex h-full items-start justify-between gap-3 p-6">
                  <span className="font-display text-base font-medium text-steel-900">{other.name}</span>
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-amber transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Request an engineering consultation."
        lede={`Tell us the opening dimensions, the daily cycle count and the site conditions, and we will specify the right ${family.name.toLowerCase()} configuration and quote against it.`}
        whatsappMessage={`Hello Standard Automation, I have an enquiry about ${family.name}.`}
      />
    </>
  );
}
