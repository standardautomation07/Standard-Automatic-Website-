import type { Metadata } from "next";
import { categories, products } from "@/lib/catalog";
import { ProductExplorer } from "@/components/product/product-explorer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The full Standard Automation range: entrance automation, industrial doors, rolling shutters, loading bay equipment, security and access control, and drive units.",
  alternates: { canonical: "/products" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
];

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <section className="border-b border-line bg-paper pt-10 pb-14 lg:pt-14 lg:pb-16">
        <div className="shell">
          <Breadcrumb trail={trail} />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-amber-deep">Product index</p>
              <h1 className="mt-5 text-display-2 text-steel-900">
                {products.length} products across {categories.length} lines.
              </h1>
            </div>
            <p className="text-base leading-relaxed text-steel-600 lg:col-span-5">
              Filter by line or search by application. Every product page carries the
              specifications we can publish, the applications it suits, and a direct route to a
              quotation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper-sunken py-12 lg:py-16">
        <div className="shell">
          <ProductExplorer products={products} categories={categories} />
        </div>
      </section>

      <CtaBand
        title="Not sure which product suits the opening?"
        lede="Send the dimensions, the traffic and a photograph of the opening. We will tell you what it needs."
      />
    </>
  );
}
