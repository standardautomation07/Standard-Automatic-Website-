import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { getAllCategories, getFeaturedProducts, SOLUTIONS, getProductsForSolution } from "@/lib/catalog";
import { ProductCard } from "@/components/product/product-card";
import { CategoryCard } from "@/components/product/category-card";
import { TrustStrip } from "@/components/home/trust-strip";
import { RequestQuoteButton } from "@/components/cta/request-quote-button";
import { WhatsAppCTA } from "@/components/cta/whatsapp-cta";

export const metadata: Metadata = {
  title: "Industrial Rolling Shutters, Gates & Doors Manufacturer in Pune",
  description:
    "Standard Automatic Solutions Pvt Ltd manufactures automatic rolling shutters, sliding gates, industrial doors, high speed doors and loading bay equipment in Pune, India.",
};

const CLIENT_LOGOS = fs
  .readdirSync(path.join(process.cwd(), "public", "images", "legacy"))
  .filter((f) => /^\d+\.(jpg|png)$/i.test(f))
  .sort((a, b) => parseInt(a) - parseInt(b))
  .slice(0, 18);

export default function HomePage() {
  const categories = getAllCategories().filter((c) => c.status === "active");
  const featured = getFeaturedProducts(6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-ink text-white">
        <Image
          src="/images/legacy/roling.jpg"
          alt="Standard Automation industrial rolling shutters installed at a commercial facility"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="container-x relative py-20 sm:py-28">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-signal">
            Pune, Maharashtra &middot; Since 2006
          </p>
          <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
            Industrial Doors, Gates &amp; Shutters, Engineered for Reliability
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80">
            Standard Automatic Solutions Pvt Ltd manufactures and supplies automatic
            rolling shutters, sliding gates, industrial doors, high speed doors and
            loading bay equipment for factories, warehouses and commercial facilities
            across India.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <RequestQuoteButton />
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-sm border border-white/30 px-5 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:border-white"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* Product categories */}
      <section className="container-x py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Product Categories</h2>
          <Link href="/products" className="text-sm font-medium text-brand-steel hover:underline">
            View all products &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* Value proposition */}
      <section className="border-y border-border bg-surface-raised">
        <div className="container-x grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              A Leading Manufacturer of Industrial Entrance Automation
            </h2>
            <p className="mt-4 text-ink-muted">
              We are a manufacturer and supplier of rolling shutters, automatic
              sliding gates, doors, swing gates and road barriers, along with
              entrance automation systems installation services. Our foundation
              was laid in 2006 in Pune, Maharashtra, with the intention of
              providing clients unmatched quality products.
            </p>
            <p className="mt-4 text-ink-muted">
              Products are manufactured using quality raw material and designed
              with precision to meet international quality standards &mdash;
              acknowledged by clients for excellent finish, corrosion resistance,
              reliable performance and durability.
            </p>
          </div>
          <TrustStrip />
        </div>
      </section>

      {/* Applications / Industries */}
      <section className="container-x py-16">
        <h2 className="mb-2 font-display text-2xl font-semibold sm:text-3xl">Applications &amp; Industries</h2>
        <p className="mb-8 max-w-2xl text-ink-muted">
          Our products are specified across the following settings, based on the
          applications documented for each product.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => {
            const count = getProductsForSolution(s.slug).length;
            if (count === 0) return null;
            return (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="rounded-sm border border-border bg-surface-raised p-5 transition-colors hover:border-brand-steel"
              >
                <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                <p className="mt-1 text-sm text-ink-muted">{count} related products</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="border-y border-border bg-surface-raised">
        <div className="container-x py-16">
          <h2 className="mb-8 font-display text-2xl font-semibold sm:text-3xl">Featured Products</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} categorySlug={p.categorySlug} />
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      {CLIENT_LOGOS.length > 0 && (
        <section className="container-x py-16">
          <h2 className="mb-8 font-display text-2xl font-semibold sm:text-3xl">Trusted By</h2>
          <div className="grid grid-cols-3 items-center gap-6 sm:grid-cols-6">
            {CLIENT_LOGOS.map((logo) => (
              <div key={logo} className="relative aspect-[3/2] grayscale transition-all hover:grayscale-0">
                <Image src={`/images/legacy/${logo}`} alt="Client logo" fill className="object-contain" />
              </div>
            ))}
          </div>
          <Link href="/clients" className="mt-6 inline-block text-sm font-medium text-brand-steel hover:underline">
            View all clients &rarr;
          </Link>
        </section>
      )}

      {/* Resources teaser */}
      <section className="border-y border-border bg-surface-sunken">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-10">
          <div>
            <h2 className="font-display text-xl font-semibold">Resources &amp; Documentation</h2>
            <p className="mt-1 text-sm text-ink-muted">Brochures and technical datasheets, published as they become available.</p>
          </div>
          <Link href="/resources" className="text-sm font-medium text-brand-steel hover:underline">
            Visit Resources &rarr;
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-x py-20 text-center">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Talk to Our Team About Your Requirement
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-muted">
          Tell us about your project and we&apos;ll recommend the right rolling
          shutter, gate or door solution for it.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <RequestQuoteButton />
          <WhatsAppCTA />
        </div>
      </section>
    </>
  );
}
