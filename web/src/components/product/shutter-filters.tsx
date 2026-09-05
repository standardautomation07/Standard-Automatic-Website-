"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/cards";
import type { Product } from "@/lib/types";

/**
 * Filters for the Rolling Shutters family.
 *
 * The axes are the ones a buyer actually chooses on — what it is made of, how
 * the curtain is built, how hard it has to work, how it is operated and what
 * it has to withstand. They come from the product's own `facets`, so adding a
 * shutter adds its options here without touching this component.
 *
 * Deliberately scoped to this family rather than added to the global
 * catalogue: these axes are meaningless for a dock leveller or a turnstile,
 * and a filter that empties the page for most products is worse than no filter.
 */

type Axis = "material" | "construction" | "duty" | "operation" | "performance";

const AXES: { id: Axis; label: string }[] = [
  { id: "material", label: "Material" },
  { id: "construction", label: "Construction" },
  { id: "duty", label: "Duty" },
  { id: "operation", label: "Operation" },
  { id: "performance", label: "Performance" },
];

const valuesFor = (product: Product, axis: Axis): string[] => {
  const facets = product.facets;
  if (!facets) return [];
  const value = facets[axis];
  return Array.isArray(value) ? value : [value];
};

export function ShutterFilters({ products }: { products: Product[] }) {
  const [selected, setSelected] = useState<Record<Axis, string>>({
    material: "all",
    construction: "all",
    duty: "all",
    operation: "all",
    performance: "all",
  });
  const [query, setQuery] = useState("");

  const options = useMemo(() => {
    const map = {} as Record<Axis, string[]>;
    for (const { id } of AXES) {
      const set = new Set<string>();
      for (const product of products) for (const value of valuesFor(product, id)) set.add(value);
      map[id] = [...set].sort();
    }
    return map;
  }, [products]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      for (const { id } of AXES) {
        if (selected[id] !== "all" && !valuesFor(product, id).includes(selected[id])) return false;
      }
      if (!q) return true;
      return [product.name, product.summary, product.tagline, ...product.applications]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [products, selected, query]);

  const active =
    AXES.some(({ id }) => selected[id] !== "all") || query.trim() !== "";

  const reset = () => {
    setSelected({
      material: "all",
      construction: "all",
      duty: "all",
      operation: "all",
      performance: "all",
    });
    setQuery("");
  };

  return (
    <div>
      <div className="border border-line bg-paper-raised p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {AXES.map(({ id, label }) => (
            <label key={id} className="block">
              <span className="eyebrow text-steel-500">{label}</span>
              <select
                value={selected[id]}
                onChange={(event) =>
                  setSelected((current) => ({ ...current, [id]: event.target.value }))
                }
                className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm text-steel-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
              >
                <option value="all">All</option>
                {options[id].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <label className="block">
            <span className="eyebrow text-steel-500">Search shutters</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Material, application or name"
              className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm text-steel-800 placeholder:text-steel-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p className="font-mono text-xs text-steel-500" role="status" aria-live="polite">
            {results.length} of {products.length} shown
          </p>
          {active && (
            <button
              type="button"
              onClick={reset}
              className="text-sm font-medium text-amber-deep underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {results.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {results.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 3} />
          ))}
        </div>
      ) : (
        <p className="mt-10 border border-line bg-paper-raised p-8 text-sm text-steel-600">
          Nothing matches that combination. Clear a filter, or describe the opening and we will tell
          you which shutter suits it.
        </p>
      )}
    </div>
  );
}
