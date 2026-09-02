import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories, getAllProducts, getCategory, getConfirmedVariants, getProduct, getRelatedProducts } from "@/lib/catalog";
import { ProductGallery } from "@/components/product/product-gallery";
import { SpecTable } from "@/components/product/spec-table";
import { ProductCard } from "@/components/product/product-card";
import { Faq } from "@/components/product/faq";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { RequestQuoteButton } from "@/components/cta/request-quote-button";
import { WhatsAppCTA } from "@/components/cta/whatsapp-cta";
import { PhoneCTA } from "@/components/cta/phone-cta";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ProductJsonLd } from "@/components/seo/product-json-ld";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ category: p.categorySlug, product: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[category]/[product]">
): Promise<Metadata> {
  const { category, product: productSlug } = await props.params;
  const product = getProduct(category, productSlug);
  if (!product) return {};
  return {
    title: product.name,
    description:
      product.shortDescription?.slice(0, 155) ||
      `${product.name} manufactured by Standard Automation, Pune, India.`,
    openGraph: product.images[0] ? { images: [product.images[0].src] } : undefined,
    alternates: { canonical: `/products/${category}/${productSlug}` },
  };
}

export default async function ProductPage(props: PageProps<"/products/[category]/[product]">) {
  const { category: categorySlug, product: productSlug } = await props.params;
  const category = getCategory(categorySlug);
  const product = getProduct(categorySlug, productSlug);
  if (!category || !product) notFound();

  const related = getRelatedProducts(product);
  const variants = getConfirmedVariants(product);
  const otherCategories = getAllCategories().filter((c) => c.slug !== category.slug);

  return (
    <>
      <ProductJsonLd product={product} />
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: category.name, href: `/products/${category.slug}` },
          { name: product.name, href: `/products/${category.slug}/${product.slug}` },
        ]}
      />

      <div className="container-x pb-20">
        {!product.navLive && (
          <p className="mb-6 rounded-sm border border-border bg-surface-sunken px-4 py-3 text-sm text-ink-muted">
            This product page is currently not linked from the main navigation
            on the live site. {product.confirmationNote}
          </p>
        )}

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} productName={product.name} />

          <div>
            <p className="mb-1 text-sm font-medium text-brand-steel">{category.name}</p>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">{product.name}</h1>
            {product.shortDescription && (
              <p className="mt-4 text-ink-muted">{product.shortDescription}</p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <RequestQuoteButton productName={product.name} />
              <WhatsAppCTA message={`Hi, I'm interested in ${product.name}. Could you share more details?`} />
              <PhoneCTA />
            </div>

            <div className="mt-6 rounded-sm border border-border bg-surface-raised p-4">
              <p className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Quick Enquiry
              </p>
              <EnquiryForm defaultProduct={product.name} compact />
            </div>

            {product.featuresText && (
              <div className="mt-8">
                <h2 className="mb-2 font-display text-lg font-semibold">Key Features</h2>
                <p className="text-sm text-ink-muted">{product.featuresText}</p>
              </div>
            )}

            {product.applications.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-2 font-display text-lg font-semibold">Applications</h2>
                <ul className="grid grid-cols-2 gap-2 text-sm text-ink-muted">
                  {product.applications.map((a, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-signal" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {product.specifications.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-4 font-display text-2xl font-semibold">Technical Specifications</h2>
            <SpecTable specifications={product.specifications} />
          </div>
        )}

        {(product.materials || product.dimensions || product.certifications) && (
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {product.materials && <InfoBlock label="Materials" value={product.materials} />}
            {product.dimensions && <InfoBlock label="Dimensions" value={product.dimensions} />}
            {product.certifications && <InfoBlock label="Certifications" value={product.certifications} />}
          </div>
        )}

        {variants.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-2 font-display text-2xl font-semibold">Variants</h2>
            <p className="mb-4 max-w-2xl text-sm text-ink-muted">
              Confirmed by the business as Rolling Shutter variants (see
              planning/OPEN-BUSINESS-DECISIONS.md). Final per-variant technical
              mapping is still pending, so each is shown as its own listing
              rather than merged.
            </p>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
              {variants.map((p) => (
                <ProductCard key={p.slug} product={p} categorySlug={p.categorySlug} />
              ))}
            </div>
          </div>
        )}

        {/* Downloads: intentionally empty until a real brochure/datasheet
            exists for this product - see planning/OPEN-BUSINESS-DECISIONS.md
            item 14. No placeholder PDF link is rendered. */}

        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <h2 className="mb-6 font-display text-2xl font-semibold">Related Products</h2>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} categorySlug={category.slug} />
              ))}
            </div>
          </div>
        )}

        <Faq items={[]} />

        <div className="mt-16 border-t border-border pt-8">
          <h2 className="mb-4 font-display text-lg font-semibold">Other Categories</h2>
          <div className="flex flex-wrap gap-2">
            {otherCategories.map((c) => (
              <a
                key={c.slug}
                href={`/products/${c.slug}`}
                className="rounded-sm border border-border px-3 py-1.5 text-sm hover:border-brand-steel hover:text-brand-steel"
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-border p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}
