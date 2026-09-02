import type { Metadata } from "next";
import { getAllCategories, getProductsForCategory } from "@/lib/catalog";
import { CategoryCard } from "@/components/product/category-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse Standard Automation's full range: rolling shutters, gates, doors, high speed doors, loading bay equipment, bollards, turnstiles and barriers.",
};

export default function ProductsIndexPage() {
  const categories = getAllCategories();

  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Products", href: "/products" }]} />
      <div className="container-x pb-20">
        <h1 className="mb-2 font-display text-3xl font-semibold sm:text-4xl">Products</h1>
        <p className="mb-10 max-w-2xl text-ink-muted">
          Our full manufacturing range, organized by category.
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div key={c.slug}>
              <CategoryCard category={c} />
              <p className="mt-2 text-sm text-ink-muted">
                {getProductsForCategory(c.slug).length} products
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
