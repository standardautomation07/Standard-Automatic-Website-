import Link from "next/link";
import { getAllCategories } from "@/lib/catalog";

export default function NotFound() {
  const categories = getAllCategories();

  return (
    <div className="container-x flex flex-col items-center py-24 text-center">
      <p className="font-mono text-sm text-ink-muted">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Page Not Found</h1>
      <p className="mt-3 max-w-md text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
        Try one of our product categories below, or head back home.
      </p>
      <Link href="/" className="mt-6 text-sm font-medium text-brand-steel hover:underline">
        &larr; Back to Home
      </Link>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/products/${c.slug}`}
            className="rounded-sm border border-border px-3 py-1.5 text-sm hover:border-brand-steel hover:text-brand-steel"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
