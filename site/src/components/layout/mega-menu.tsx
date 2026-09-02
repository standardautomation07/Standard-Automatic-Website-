"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { Category, Product } from "@/lib/types";

/**
 * Fixes research/ux-audit.md §1: the old site's mega-menu depended on jQuery,
 * which fails to load over HTTPS (mixed-content block), so the menu never
 * opened for any real visitor. This component is marked "use client" for the
 * keyboard/click enhancement layer only - the underlying markup is plain
 * <nav>/<a> links that Next.js server-renders into the initial HTML, and the
 * panel's default visibility is driven by CSS (`group-hover`/`group-focus-within`),
 * not by JavaScript executing. Disabling JS in the browser (the audit's
 * regression test, see planning/COMPONENT-ARCHITECTURE.md §3) still leaves
 * every link clickable and the hover-revealed panel functional on desktop.
 */
export function MegaMenu({
  categories,
  productsByCategory,
}: {
  categories: Category[];
  productsByCategory: Record<string, Product[]>;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className="group relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="products-mega-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 py-2 text-sm font-medium tracking-wide text-ink hover:text-brand-steel"
      >
        Products
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        id="products-mega-menu"
        className={`invisible absolute left-1/2 top-full z-40 w-[min(90vw,64rem)] -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${
          open ? "!visible !opacity-100" : ""
        }`}
      >
        <div className="grid grid-cols-4 gap-x-6 gap-y-5 rounded-sm border border-border bg-surface-raised p-6 shadow-lg">
          {categories.map((cat) => (
            <div key={cat.slug}>
              <Link
                href={`/products/${cat.slug}`}
                className="mb-2 block font-display text-sm font-semibold uppercase tracking-wide text-brand-steel hover:text-brand-steel-dark"
              >
                {cat.name}
                {cat.status === "pending-confirmation" && (
                  <span className="ml-1.5 rounded-sm bg-surface-sunken px-1.5 py-0.5 align-middle text-[0.6rem] font-medium normal-case tracking-normal text-ink-muted">
                    pending confirmation
                  </span>
                )}
              </Link>
              <ul className="space-y-1">
                {(productsByCategory[cat.slug] ?? []).map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${cat.slug}/${p.slug}`}
                      className="text-sm text-ink-muted hover:text-ink"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
