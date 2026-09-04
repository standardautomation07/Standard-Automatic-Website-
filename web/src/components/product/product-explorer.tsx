"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/cards";
import { Close, Search } from "@/components/ui/icons";
import type { Environment, Product } from "@/lib/types";

interface Option {
  id: string;
  label: string;
}

interface ProductExplorerProps {
  products: Product[];
  families: Option[];
  industries: Option[];
}

const ENVIRONMENTS: { id: Environment; label: string }[] = [
  { id: "internal", label: "Internal" },
  { id: "external", label: "External" },
  { id: "hygiene", label: "Hygiene / washdown" },
  { id: "cold", label: "Cold / temperature controlled" },
  { id: "fire", label: "Fire rated" },
  { id: "security", label: "Security" },
];

export function ProductExplorer({ products, families, industries }: ProductExplorerProps) {
  const [family, setFamily] = useState("all");
  const [industry, setIndustry] = useState("all");
  const [environment, setEnvironment] = useState("all");
  const [query, setQuery] = useState("");

  const familyCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const product of products) map.set(product.familyId, (map.get(product.familyId) ?? 0) + 1);
    return map;
  }, [products]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      if (family !== "all" && product.familyId !== family) return false;
      if (industry !== "all" && !product.industries.includes(industry as Product["industries"][number])) return false;
      if (environment !== "all" && !product.environments.includes(environment as Environment)) return false;
      if (!q) return true;
      const haystack = [
        product.name,
        product.summary,
        product.tagline,
        ...product.applications,
        ...product.variants.map((v) => v.name),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [products, family, industry, environment, query]);

  const filtered = family !== "all" || industry !== "all" || environment !== "all" || query.trim() !== "";

  function reset() {
    setFamily("all");
    setIndustry("all");
    setEnvironment("all");
    setQuery("");
  }

  return (
    <div>
      <div className="border-b border-line pb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter by product family" className="flex flex-wrap gap-2">
            <FilterChip active={family === "all"} onClick={() => setFamily("all")}>
              All <span className="ml-1.5 opacity-60">{products.length}</span>
            </FilterChip>
            {families.map((option) => (
              <FilterChip key={option.id} active={family === option.id} onClick={() => setFamily(option.id)}>
                {option.label}
                <span className="ml-1.5 opacity-60">{familyCounts.get(option.id) ?? 0}</span>
              </FilterChip>
            ))}
          </div>

          <div className="relative lg:w-72 lg:shrink-0">
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

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:max-w-xl">
          <SelectFilter
            id="industry-filter"
            label="Industry"
            value={industry}
            onChange={setIndustry}
            options={industries}
            allLabel="All industries"
          />
          <SelectFilter
            id="environment-filter"
            label="Operating environment"
            value={environment}
            onChange={setEnvironment}
            options={ENVIRONMENTS}
            allLabel="All environments"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <p aria-live="polite" className="font-mono text-xs text-steel-500">
          {results.length} {results.length === 1 ? "product" : "products"}
        </p>
        {filtered && (
          <button
            type="button"
            onClick={reset}
            className="font-mono text-xs text-amber-deep underline-offset-4 hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {results.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 3} />
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-line bg-paper-raised p-12 text-center">
          <p className="font-display text-lg text-steel-900">Nothing matches that combination.</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-steel-600">
            Try a broader filter, or tell us about the opening directly — we would rather answer the
            question than have you guess which product it is.
          </p>
          <button
            type="button"
            onClick={reset}
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

function SelectFilter({
  id,
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  allLabel: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block text-steel-500">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-edge border border-line bg-paper-raised px-3 text-sm text-steel-900 focus-visible:border-steel-900 focus-visible:outline-none"
      >
        <option value="all">{allLabel}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
