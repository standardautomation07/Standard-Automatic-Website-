import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  categoryBySlug,
  getProduct,
  productPath,
  products,
  relatedProducts,
} from "@/lib/catalog";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard, PendingBadge } from "@/components/product/product-card";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/json-ld";
import { whatsappHref } from "@/lib/site-config";
import { ArrowRight, Check, WhatsApp } from "@/components/ui/icons";

export function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    product: product.slug,
  }));
}

type Params = { params: Promise<{ category: string; product: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { product: slug, category } = await params;
  const product = getProduct(slug);
  if (!product || product.category !== category) return {};

  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: productPath(product) },
    openGraph: {
      title: `${product.name} | Standard Automation`,
      description: product.summary,
      ...(product.image ? { images: [{ url: product.image }] } : {}),
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { product: slug, category: categorySlug } = await params;
  const product = getProduct(slug);
  if (!product || product.category !== categorySlug) notFound();

  const category = categoryBySlug[product.category];
  const related = relatedProducts(product);
  const path = productPath(product);

  const trail = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: category.name, path: `/products/${category.slug}` },
    { name: product.name, path },
  ];

  const enquiryHref = `/contact?product=${product.slug}`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={productJsonLd(product, path)} />

      {/* Above the fold */}
      <section className="border-b border-line bg-paper">
        <div className="shell pt-10 lg:pt-14">
          <Breadcrumb trail={trail} />
        </div>
        <div className="shell grid gap-10 pb-14 pt-8 lg:grid-cols-12 lg:gap-16 lg:pb-20">
          <div className="lg:col-span-6 lg:pt-4">
            <p className="eyebrow text-amber-deep">
              <Link href={`/products/${category.slug}`} className="hover:underline">
                {category.name}
              </Link>
            </p>
            <h1 className="mt-5 text-display-2 text-steel-900">{product.name}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-700">
              {product.tagline}
            </p>

            {(product.pendingConfirmation || product.namingNote) && (
              <div className="mt-8 border-l-2 border-amber bg-amber-soft/60 p-5">
                {product.pendingConfirmation && <PendingBadge />}
                <p className="mt-3 text-sm leading-relaxed text-steel-700">
                  {product.namingNote ??
                    "This product line is being confirmed as currently active. Contact us and we will confirm availability and current configurations before quoting."}
                </p>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={enquiryHref} variant="primary" size="lg">
                Request a Quote
              </ButtonLink>
              <ButtonLink
                href={whatsappHref(
                  `Hello Standard Automation, I would like details on ${product.name}.`,
                )}
                variant="secondary"
                size="lg"
              >
                <WhatsApp className="h-5 w-5" />
                WhatsApp
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden border border-line bg-paper-sunken">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={product.imageFit === "contain" ? "object-contain p-10" : "object-cover"}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading index="01" eyebrow="Overview" title={`About ${product.name}`} />
            <div className="mt-8">
              {product.overview.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mb-5 text-base leading-relaxed text-steel-700 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-line bg-paper-raised p-7">
              <h2 className="eyebrow text-steel-500">Applications</h2>
              <ul className="mt-5 space-y-3">
                {product.applications.map((application) => (
                  <li
                    key={application}
                    className="flex gap-3 text-sm leading-relaxed text-steel-700"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                    {application}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-line bg-paper-sunken py-16 lg:py-24">
        <div className="shell">
          <SectionHeading index="02" eyebrow="Key benefits" title="What this product gets you" />
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
            {product.benefits.map((benefit) => (
              <article key={benefit.title} className="bg-paper-raised p-7">
                <h3 className="font-display text-lg font-medium text-steel-900">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{benefit.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      {product.howItWorks && product.howItWorks.length > 0 && (
        <section className="bg-paper py-16 lg:py-24">
          <div className="shell">
            <SectionHeading index="03" eyebrow="How it works" title="The mechanism, in order" />
            <ol className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
              {product.howItWorks.map((step, index) => (
                <li key={step.slice(0, 30)} className="bg-paper-raised p-7">
                  <span className="font-mono text-xs text-amber">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-steel-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Specifications */}
      <section className="border-y border-line bg-paper-sunken py-16 lg:py-24">
        <div className="shell">
          <SectionHeading
            index="04"
            eyebrow="Technical specifications"
            title={product.specs.length > 0 ? "Published specifications" : "Specifications on request"}
            lede={
              product.specs.length > 0
                ? "Published for this product line. Final configuration is confirmed against your opening before quotation."
                : undefined
            }
          />

          {product.specs.length > 0 ? (
            <div className="mt-12 overflow-x-auto border border-line bg-paper-raised">
              <table className="w-full min-w-[36rem] border-collapse text-sm">
                <caption className="sr-only">{product.name} specifications</caption>
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.label} className="border-b border-line last:border-b-0">
                      <th
                        scope="row"
                        className="w-2/5 px-6 py-4 text-left align-top font-mono text-xs font-medium uppercase tracking-[0.08em] text-steel-500"
                      >
                        {spec.label}
                      </th>
                      <td className="px-6 py-4 align-top leading-relaxed text-steel-800">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-12 border border-line bg-paper-raised p-8">
              <p className="max-w-2xl text-base leading-relaxed text-steel-700">
                We do not publish a specification table for this product because the configurations
                vary too widely by application to state one usefully — and we would rather leave it
                out than publish a figure that does not hold for your opening.{" "}
                <Link href={enquiryHref} className="font-medium text-amber-deep underline-offset-4 hover:underline">
                  Contact us for configuration
                </Link>{" "}
                and we will send the specification that applies to your site.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      {product.gallery && product.gallery.length > 0 && (
        <section className="bg-paper py-16 lg:py-24">
          <div className="shell">
            <SectionHeading index="05" eyebrow="Gallery" title={`${product.name} in detail`} />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {product.gallery.map((image) => (
                <li
                  key={image.src}
                  className="relative aspect-[4/3] overflow-hidden border border-line bg-paper-sunken"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-6"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-paper-sunken py-16 lg:py-24">
          <div className="shell">
            <SectionHeading
              eyebrow="Related products"
              title="Often specified alongside"
              align="between"
              action={
                <ButtonLink href={`/products/${category.slug}`} variant="secondary">
                  All {category.name}
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              }
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={`Get a quotation for ${product.name}.`}
        lede="Send us the opening dimensions, the daily cycle count and any site constraints. We will confirm the configuration and quote against it."
        whatsappMessage={`Hello Standard Automation, I would like a quote for ${product.name}.`}
      />
    </>
  );
}
