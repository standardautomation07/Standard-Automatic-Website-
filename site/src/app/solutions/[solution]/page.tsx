import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS, getProductsForSolution } from "@/lib/catalog";
import { getCategory } from "@/lib/catalog";
import { ProductCard } from "@/components/product/product-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { RequestQuoteButton } from "@/components/cta/request-quote-button";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ solution: s.slug }));
}

export async function generateMetadata(props: PageProps<"/solutions/[solution]">): Promise<Metadata> {
  const { solution: slug } = await props.params;
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  if (!solution) return {};
  return {
    title: solution.name,
    description: `Standard Automation products suited to ${solution.name.toLowerCase()}.`,
  };
}

export default async function SolutionPage(props: PageProps<"/solutions/[solution]">) {
  const { solution: slug } = await props.params;
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  if (!solution) notFound();

  const products = getProductsForSolution(slug);

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Solutions", href: "/solutions" },
          { name: solution.name, href: `/solutions/${solution.slug}` },
        ]}
      />
      <div className="container-x pb-20">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">{solution.name}</h1>
          <RequestQuoteButton productName={solution.name} />
        </div>
        <p className="mb-10 max-w-2xl text-ink-muted">
          Products from our catalogue whose documented applications include{" "}
          {solution.name.toLowerCase()}.
        </p>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} categorySlug={getCategory(p.categorySlug)?.slug ?? p.categorySlug} />
          ))}
        </div>
      </div>
    </>
  );
}
