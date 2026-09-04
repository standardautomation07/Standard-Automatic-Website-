import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, categoryPath, getCategory, productsInCategory } from "@/lib/catalog";
import { ProductCard } from "@/components/product/product-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { ArrowRight, Check } from "@/components/ui/icons";
import type { CategorySlug } from "@/lib/types";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

type Params = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.summary,
    alternates: { canonical: `/products/${category.slug}` },
    openGraph: {
      title: `${category.name} | Standard Automation`,
      description: category.summary,
      images: [{ url: category.image }],
    },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = productsInCategory(category.slug as CategorySlug);
  const others = categories.filter((c) => c.slug !== category.slug);

  const trail = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: category.name, path: `/products/${category.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      {/* Category hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="shell relative py-14 lg:py-20">
          <Breadcrumb trail={trail} tone="dark" />
          <h1 className="mt-8 max-w-3xl text-display-2 text-white">{category.name}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-steel-300 lg:text-lg">
            {category.tagline}
          </p>
          <p className="mt-8 font-mono text-xs text-steel-500">
            {items.length} {items.length === 1 ? "product" : "products"} in this line
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {category.intro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mb-5 text-base leading-relaxed text-steel-700 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="lg:col-span-5">
            <h2 className="eyebrow text-steel-500">Typical applications</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {category.applications.map((application) => (
                <li key={application} className="flex gap-3 text-sm leading-relaxed text-steel-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  {application}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="border-y border-line bg-paper-sunken py-16 lg:py-24">
        <div className="shell">
          <SectionHeading index="01" eyebrow="Products" title={`${category.name} range`} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((product, index) => (
              <ProductCard key={product.slug} product={product} priority={index < 3} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="shell">
          <SectionHeading index="02" eyebrow="Why this line" title="What it gets you" />
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
            {category.benefits.map((benefit) => (
              <article key={benefit.title} className="bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{benefit.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Related solutions */}
      <section className="border-t border-line bg-paper pb-20 lg:pb-24">
        <div className="shell">
          <h2 className="eyebrow pt-16 text-steel-500">Related solutions</h2>
          <ul className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-5">
            {others.map((other) => (
              <li key={other.slug} className="bg-paper-raised">
                <Link
                  href={categoryPath(other.slug)}
                  className="group flex h-full items-start justify-between gap-3 p-6"
                >
                  <span className="font-display text-base font-medium text-steel-900">
                    {other.name}
                  </span>
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-amber transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={`Specifying ${category.name.toLowerCase()}?`}
        lede="Tell us the opening dimensions, the daily traffic and the site conditions, and we will come back with a specification and a quotation."
        whatsappMessage={`Hello Standard Automation, I have an enquiry about ${category.name}.`}
      />
    </>
  );
}
