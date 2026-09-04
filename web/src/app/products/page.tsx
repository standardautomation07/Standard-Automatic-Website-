import Link from "next/link";
import type { Metadata } from "next";
import { categories, counts, families } from "@/lib/catalog";
import { FamilyCard } from "@/components/product/cards";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, familyCollectionJsonLd } from "@/lib/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, Search } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Eight product families covering entrance automation and industrial access: high speed doors, industrial doors, rolling shutters, fire and safety doors, automatic gates, entrance automation, loading bay equipment and access control.",
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
      <JsonLd
        data={familyCollectionJsonLd(
          "Products",
          "Standard Automatic Solutions product families.",
          "/products",
          families.map((family) => ({ name: family.name, path: `/products/${family.id}` })),
        )}
      />

      <section className="border-b border-line bg-paper pt-10 lg:pt-14">
        <div className="shell pb-14 lg:pb-16">
          <Breadcrumb trail={trail} />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-amber-deep">Product families</p>
              <h1 className="mt-5 text-display-2 text-steel-900">
                {counts.families} families. {counts.categories} categories. {counts.products} products.
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base leading-relaxed text-steel-600">
                The catalogue is grouped by engineering principle rather than by page count. Start
                from the family, narrow to the category that matches how the opening actually has to
                work, then choose the configuration.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/products/catalogue" variant="secondary">
                  <Search className="h-4 w-4" />
                  Search the full catalogue
                </ButtonLink>
                <ButtonLink href="/industries" variant="ghost">
                  Browse by industry
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-sunken py-14 lg:py-20">
        <div className="shell">
          <ul className="grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
            {families.map((family, index) => (
              <li key={family.id} className="bg-paper-raised">
                <FamilyCard family={family} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Category index — the middle level of the hierarchy, made visible */}
      <section className="border-t border-line bg-paper py-16 lg:py-20">
        <div className="shell">
          <p className="eyebrow text-steel-500">Every category</p>
          <h2 className="mt-4 max-w-2xl text-display-3 text-steel-900">
            The middle level, where two products genuinely work differently.
          </h2>
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {families.map((family) => (
              <div key={family.id}>
                <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-amber-deep">
                  <Link href={`/products/${family.id}`} className="hover:underline">
                    {family.name}
                  </Link>
                </h3>
                <ul className="mt-3 space-y-2 border-t border-line pt-3">
                  {categories
                    .filter((category) => category.familyId === family.id)
                    .map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/products/${family.id}#${category.id}`}
                          className="text-sm text-steel-700 underline-offset-4 hover:text-amber-deep hover:underline"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which family the opening belongs to?"
        lede="Send the clear width and height, the daily cycle count and what the opening has to separate. We will tell you what it needs."
      />
    </>
  );
}
