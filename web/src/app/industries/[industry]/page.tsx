import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries, industryById, productsForIndustry } from "@/lib/catalog";
import { ProductCard } from "@/components/product/cards";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { Media } from "@/components/ui/media";
import { ArrowRight, Check } from "@/components/ui/icons";
import type { IndustryId } from "@/lib/types";

export function generateStaticParams() {
  return industries.map((industry) => ({ industry: industry.id }));
}

type Params = { params: Promise<{ industry: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { industry: id } = await params;
  const industry = industryById[id as IndustryId];
  if (!industry) return {};

  return {
    title: `${industry.name} — entrance automation and industrial access`,
    description: `${industry.tagline} Recommended doors, shutters, gates, loading bay and access control products for ${industry.name.toLowerCase()} facilities.`,
    alternates: { canonical: `/industries/${industry.id}` },
  };
}

export default async function IndustryPage({ params }: Params) {
  const { industry: id } = await params;
  const industry = industryById[id as IndustryId];
  if (!industry) notFound();

  const recommended = productsForIndustry(industry.id);
  const others = industries.filter((i) => i.id !== industry.id);

  const trail = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.name, path: `/industries/${industry.id}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <section className="relative isolate overflow-hidden bg-ink">
        <Media id={industry.imageId} sizes="100vw" priority decorative className="opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="grid-rule absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-14 lg:py-20">
          <Breadcrumb trail={trail} tone="dark" />
          <p className="eyebrow mt-8 text-amber">Industry</p>
          <h1 className="mt-5 max-w-3xl text-display-2 text-white">{industry.name}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-steel-300 lg:text-lg">
            {industry.tagline}
          </p>
        </div>
      </section>

      {/* Challenges */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow="Industry challenges"
            title="What makes these openings hard"
          />
          <div className="mt-12 grid hairline-grid md:grid-cols-2 xl:grid-cols-4">
            {industry.challenges.map((challenge) => (
              <article key={challenge.title} className="bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">{challenge.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{challenge.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended products */}
      <section className="border-y border-line bg-paper-sunken py-16 lg:py-20">
        <div className="shell">
          <SectionHeading
            index="02"
            eyebrow="Recommended solutions"
            title={`Products specified for ${industry.name.toLowerCase()}`}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {recommended.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 3} />
            ))}
          </div>
        </div>
      </section>

      {/* Considerations + applications */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              index="03"
              eyebrow="Engineering considerations"
              title="What to settle before you order"
            />
            <ol className="mt-10">
              {industry.considerations.map((item, index) => (
                <li
                  key={item.slice(0, 30)}
                  className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-line py-5 last:border-b"
                >
                  <span className="font-mono text-xs text-amber">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed text-steel-700">{item}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5">
            <div className="border border-line bg-paper-raised p-7">
              <h2 className="eyebrow text-steel-500">Typical applications</h2>
              <ul className="mt-5 space-y-3">
                {industry.typicalApplications.map((application) => (
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

      {/* Other industries */}
      <section className="border-t border-line bg-paper pb-20 lg:pb-24">
        <div className="shell">
          <h2 className="eyebrow pt-16 text-steel-500">Other industries</h2>
          <ul className="mt-6 grid hairline-grid sm:grid-cols-2 xl:grid-cols-4">
            {others.map((other) => (
              <li key={other.id} className="bg-paper-raised">
                <Link
                  href={`/industries/${other.id}`}
                  className="group flex h-full items-start justify-between gap-3 p-6"
                >
                  <span className="font-display text-base font-medium text-steel-900">{other.name}</span>
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-amber transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={`Specifying for a ${industry.name.toLowerCase()} site?`}
        lede="Send the opening details and the constraint you are working against, and we will come back with a specification."
        whatsappMessage={`Hello Standard Automation, I have a ${industry.name} enquiry.`}
      />
    </>
  );
}
