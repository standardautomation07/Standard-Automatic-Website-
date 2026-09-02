import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SOLUTIONS, getProductsForSolution } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Solutions & Applications",
  description: "Industries and applications served by Standard Automation's product range.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsIndexPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }]} />
      <div className="container-x pb-20">
        <h1 className="mb-2 font-display text-3xl font-semibold sm:text-4xl">Solutions &amp; Applications</h1>
        <p className="mb-10 max-w-2xl text-ink-muted">
          Grouped from the applications documented against each product in our
          catalogue.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => {
            const count = getProductsForSolution(s.slug).length;
            if (count === 0) return null;
            return (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="rounded-sm border border-border bg-surface-raised p-6 transition-colors hover:border-brand-steel"
              >
                <h2 className="font-display text-lg font-semibold">{s.name}</h2>
                <p className="mt-1 text-sm text-ink-muted">{count} related products</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
