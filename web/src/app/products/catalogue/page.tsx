import type { Metadata } from "next";
import { counts, families, industries, products } from "@/lib/catalog";
import { ProductExplorer } from "@/components/product/product-explorer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Full catalogue",
  description: `Search and filter all ${counts.products} Standard Automation products by family, industry and operating environment — doors, shutters, gates, loading bay equipment, access control and drives.`,
  alternates: { canonical: "/products/catalogue" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Full catalogue", path: "/products/catalogue" },
];

export default function CataloguePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <section className="border-b border-line bg-paper pt-10 lg:pt-14">
        <div className="shell pb-12 lg:pb-14">
          <Breadcrumb trail={trail} />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-amber-deep">Full catalogue</p>
              <h1 className="mt-5 text-display-2 text-steel-900">
                Every product, filterable.
              </h1>
            </div>
            <p className="text-base leading-relaxed text-steel-600 lg:col-span-5">
              Filter by family, by the industry you work in, or by the environment the opening has
              to survive. Every product page carries the specifications we can support and says so
              where we cannot.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper-sunken py-12 lg:py-16">
        <div className="shell">
          <ProductExplorer
            products={products}
            families={families.map((family) => ({ id: family.id, label: family.shortName }))}
            industries={industries.map((industry) => ({ id: industry.id, label: industry.name }))}
          />
        </div>
      </section>

      <CtaBand
        title="Tell us about the opening instead."
        lede="If the filters are not getting you there, describe the opening and we will specify against it."
      />
    </>
  );
}
