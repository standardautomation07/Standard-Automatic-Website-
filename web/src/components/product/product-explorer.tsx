"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import { Close, Search } from "@/components/ui/icons";
import type { Category, Product } from "@/lib/types";

interface ProductExplorerProps {
  products: Product[];
  categories: Category[];
}

export function ProductExplorer({ products, categories }: ProductExplorerProps) {
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const product of products) {
      map.set(product.category, (map.get(product.category) ?? 0) + 1);
    }
    return map;
  }, [products]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      if (active !== "all" && product.category !== active) return false;
      if (!q) return true;
      const haystack = [product.name, product.summary, product.tagline, ...product.applications]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [products, active, query]);

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter by category"
          className="flex flex-wrap gap-2"
        >
          <FilterChip active={active === "all"} onClick={() => setActive("all")}>
            All <span className="ml-1.5 opacity-60">{products.length}</span>
          </FilterChip>
          {categories.map((category) => (
            <FilterChip
              key={category.slug}
              active={active === category.slug}
              onClick={() => setActive(category.slug)}
            >
              {category.shortName}
              <span className="ml-1.5 opacity-60">{counts.get(category.slug) ?? 0}</span>
            </FilterChip>
          ))}
        </div>

        <div className="relative lg:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products…"
            className="h-11 w-full rounded-edge border border-line bg-paper-raised pl-10 pr-10 text-sm text-steel-900 placeholder:text-steel-400 focus-visible:border-steel-900 focus-visible:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-steel-500 hover:text-steel-900"
            >
              <Close className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </div>
      </div>

      <p aria-live="polite" className="mt-6 font-mono text-xs text-steel-500">
        {results.length} {results.length === 1 ? "product" : "products"}
      </p>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {results.map((product, index) => (
            <ProductCard key={product.slug} product={product} priority={index < 3} />
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-line bg-paper-raised p-12 text-center">
          <p className="font-display text-lg text-steel-900">No products match that search.</p>
          <p className="mt-2 text-sm text-steel-600">
            Try a different term, or clear the filters to see the full range.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActive("all");
            }}
            className="mt-6 min-h-11 rounded-edge border border-steel-900/25 px-5 text-sm font-medium text-steel-900 hover:bg-steel-900 hover:text-paper"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-11 rounded-edge border px-4 text-sm transition-colors ${
        active
          ? "border-steel-900 bg-steel-900 text-paper"
          : "border-line bg-paper-raised text-steel-700 hover:border-steel-900"
      }`}
    >
      {children}
    </button>
  );
}
