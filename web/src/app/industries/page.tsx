import Link from "next/link";
import type { Metadata } from "next";
import { industries, productsForIndustry } from "@/lib/catalog";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, familyCollectionJsonLd } from "@/lib/json-ld";
import { Media } from "@/components/ui/media";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Entrance automation and industrial access solutions by sector — manufacturing, warehousing and logistics, cold chain and food, pharmaceutical and cleanroom, automotive, retail, healthcare and infrastructure.",
  alternates: { canonical: "/industries" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" },
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd
        data={familyCollectionJsonLd(
          "Industries",
          "Sectors served by Standard Automatic Solutions.",
          "/industries",
          industries.map((industry) => ({ name: industry.name, path: `/industries/${industry.id}` })),
        )}
      />

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
              Each sector below is written around the constraint it actually has — what the opening
              must separate, how often it is crossed, and what happens when it stops working — and
              links to the products that answer it.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper-sunken py-14 lg:py-20">
        <div className="shell">
          <ul className="grid hairline-grid md:grid-cols-2 xl:grid-cols-4">
            {industries.map((industry, index) => {
              const recommended = productsForIndustry(industry.id);
              return (
                <li key={industry.id} className="group relative bg-paper-raised">
                  <Link
                    href={`/industries/${industry.id}`}
                    className="flex h-full flex-col focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-amber"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Media
                        id={industry.imageId}
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                        decorative
                        className="transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                      <span className="absolute left-5 top-5 font-mono text-[0.65rem] text-white/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="flex items-start justify-between gap-3 font-display text-lg font-medium text-steel-900">
                        {industry.name}
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-amber transition-transform group-hover:translate-x-1" />
                      </h2>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-steel-600">
                        {industry.tagline}
                      </p>
                      <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-steel-500">
                        {recommended.length} products
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Tell us what the building has to do."
        lede="Describe the opening and the traffic it carries and we will tell you which products suit it."
      />
    </>
  );
}
