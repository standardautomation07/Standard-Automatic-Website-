import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  categoriesInFamily,
  families,
  familyPath,
  getFamily,
  industryById,
  productPath,
  productsInCategory,
  productsInFamily,
} from "@/lib/catalog";
import { ProductCard } from "@/components/product/cards";
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

  return {
    title: family.name,
    description: family.summary,
    alternates: { canonical: `/products/${family.id}` },
    openGraph: { title: `${family.name} | Standard Automation`, description: family.summary },
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
        <Media id={family.imageId} sizes="100vw" priority decorative className="opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="grid-rule absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-14 lg:py-20">
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
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
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

      {/* Why this family */}
      <section className="border-y border-line bg-paper-sunken py-16 lg:py-20">
        <div className="shell">
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
        <div className="shell">
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

      {/* Comparison */}
      <section className="border-y border-line bg-paper-sunken py-16 lg:py-20">
        <div className="shell">
          <SectionHeading
            index="04"
            eyebrow="Compare"
            title="Side by side"
            lede="What each product in this family is for, what it is built to survive, and whether we can publish a specification table for it today."
          />
          <div className="mt-12 overflow-x-auto border border-line bg-paper-raised">
            <table className="w-full min-w-[46rem] border-collapse text-sm">
              <caption className="sr-only">{family.name} product comparison</caption>
              <thead>
                <tr className="border-b border-line bg-paper-sunken/60">
                  <th scope="col" className="px-5 py-4 text-left font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel-500">
                    Product
                  </th>
                  <th scope="col" className="px-5 py-4 text-left font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel-500">
                    Category
                  </th>
                  <th scope="col" className="px-5 py-4 text-left font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel-500">
                    Environment
                  </th>
                  <th scope="col" className="px-5 py-4 text-left font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel-500">
                    Configurations
                  </th>
                  <th scope="col" className="px-5 py-4 text-left font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel-500">
                    Published specs
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
                    <td className="px-5 py-4 align-top text-steel-600">
                      {product.environments.join(", ")}
                    </td>
                    <td className="px-5 py-4 align-top text-steel-600">{product.variants.length}</td>
                    <td className="px-5 py-4 align-top text-steel-600">
                      {product.specGroups.length > 0 ? "Yes" : "On request"}
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
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
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
        <div className="shell">
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
