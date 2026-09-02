import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories, getCategory, getProductsForCategory } from "@/lib/catalog";
import { ProductCard } from "@/components/product/product-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { RequestQuoteButton } from "@/components/cta/request-quote-button";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[category]">): Promise<Metadata> {
  const { category: slug } = await props.params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.seoTitle || category.name,
    description:
      category.seoDescription ||
      `${category.name} manufactured by Standard Automation, Pune, India.`,
  };
}

export default async function CategoryPage(props: PageProps<"/products/[category]">) {
  const { category: slug } = await props.params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsForCategory(slug);
  const otherCategories = getAllCategories().filter((c) => c.slug !== slug);

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: category.name, href: `/products/${category.slug}` },
        ]}
      />
      <div className="container-x pb-20">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">{category.h1}</h1>
            {category.status === "pending-confirmation" && (
              <p className="mt-2 max-w-xl rounded-sm border border-border bg-surface-sunken px-3 py-2 text-sm text-ink-muted">
                This product line&apos;s current availability is pending confirmation.
                Please contact us to check current status before ordering.
              </p>
            )}
          </div>
          <RequestQuoteButton productName={category.name} />
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} categorySlug={category.slug} />
            ))}
          </div>
        ) : (
          <p className="text-ink-muted">No products listed in this category yet.</p>
        )}

        <div className="mt-16 border-t border-border pt-8">
          <h2 className="mb-4 font-display text-lg font-semibold">Related Categories</h2>
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
