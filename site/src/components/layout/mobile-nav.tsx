"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { Category, Product } from "@/lib/types";
import { RequestQuoteButton } from "@/components/cta/request-quote-button";
import { PhoneCTA } from "@/components/cta/phone-cta";

/**
 * Independently designed mobile navigation (not a shrunk desktop menu), per
 * planning/DESIGN-SYSTEM.md §5. A plain overlay <div> with role="dialog"
 * (rather than the native <dialog> element, which renders in the browser's
 * top layer and proved unreliable to drive/inspect with some automation
 * tooling during QA) driven by ordinary React state - one real onClick
 * handler, not Bootstrap's data-toggle="collapse" pattern, which is exactly
 * what silently failed on the old site (research/ux-audit.md §1). Category
 * disclosure uses native <details>/<summary>, which needs no JavaScript at
 * all to expand.
 */
export function MobileNav({
  categories,
  productsByCategory,
}: {
  categories: Category[];
  productsByCategory: Record<string, Product[]>;
}) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-sm border border-border lg:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={close} aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-surface-raised shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="font-display text-lg font-semibold uppercase tracking-wide">Menu</span>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close navigation menu"
                onClick={close}
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-border"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 4l10 10M14 4 4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="mb-4 space-y-1 border-b border-border pb-4">
                <li>
                  <Link href="/" className="block py-2.5 text-base font-medium" onClick={close}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="block py-2.5 text-base font-medium" onClick={close}>
                    About Us
                  </Link>
                </li>
              </ul>

              <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Products
              </p>
              <ul className="mb-4 divide-y divide-border border-b border-border">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-base font-medium marker:content-none">
                        <span className="flex items-center gap-2">
                          {cat.name}
                          {cat.status === "pending-confirmation" && (
                            <span className="rounded-sm bg-surface-sunken px-1.5 py-0.5 text-[0.6rem] font-medium text-ink-muted">
                              pending
                            </span>
                          )}
                        </span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 12 12"
                          fill="none"
                          className="shrink-0 transition-transform group-open:rotate-180"
                          aria-hidden="true"
                        >
                          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </summary>
                      <ul className="pb-2 pl-3">
                        <li>
                          <Link
                            href={`/products/${cat.slug}`}
                            className="block py-2 text-sm text-brand-steel"
                            onClick={close}
                          >
                            View all {cat.name}
                          </Link>
                        </li>
                        {(productsByCategory[cat.slug] ?? []).map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={`/products/${cat.slug}/${p.slug}`}
                              className="block py-2 text-sm text-ink-muted"
                              onClick={close}
                            >
                              {p.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ul>

              <ul className="space-y-1">
                {[
                  ["Solutions / Applications", "/solutions"],
                  ["Projects", "/projects"],
                  ["Clients", "/clients"],
                  ["Resources", "/resources"],
                  ["Service & Support", "/service-support"],
                  ["Contact", "/contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="block py-2.5 text-base font-medium" onClick={close}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-3 border-t border-border p-4">
              <PhoneCTA className="justify-center" />
              <RequestQuoteButton className="w-full" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
