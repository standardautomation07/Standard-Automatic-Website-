"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { families } from "@/data/families";
import { industries } from "@/data/industries";
import { siteConfig, telHref } from "@/lib/site-config";
import { ArrowRight, ChevronDown, Close, Menu, Phone } from "@/components/ui/icons";

const primaryNav = [
  { href: "/industries", label: "Industries" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
  { href: "/service-support", label: "Service & Support" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const panelId = useId();
  const drawerId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeAll = useCallback(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, []);

  // Route change closes everything. Adjusting state during render is React's
  // documented pattern for reacting to a changed input and avoids the
  // cascading second render an effect would cause.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setMegaOpen(false);
    setDrawerOpen(false);
    setMobileProducts(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeAll]);

  // The panel counts as "inside": it is a sibling of the trigger in the DOM,
  // and closing on pointerdown would unmount a link before its click fired.
  useEffect(() => {
    if (!megaOpen) return;
    function onPointer(e: PointerEvent) {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setMegaOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [megaOpen]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-line bg-ink text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-edge focus:bg-amber focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <div className="shell flex h-16 items-center justify-between gap-2 lg:h-[4.5rem] xl:gap-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${siteConfig.shortName} — home`}>
          <Image
            src="/images/brand/logo-invert.png"
            alt=""
            width={350}
            height={65}
            priority
            className="h-7 w-auto lg:h-8"
          />
          <span className="sr-only">{siteConfig.legalName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden min-w-0 lg:flex lg:items-center">
          <div ref={triggerRef}>
            <button
              type="button"
              onClick={() => setMegaOpen((v) => !v)}
              aria-expanded={megaOpen}
              aria-controls={panelId}
              className={`flex items-center gap-1.5 whitespace-nowrap px-2 py-2 text-sm transition-colors xl:px-3 ${
                megaOpen || pathname.startsWith("/products") ? "text-white" : "text-steel-300 hover:text-white"
              }`}
            >
              Products
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap px-2 py-2 text-sm transition-colors xl:px-3 ${
                isActive(item.href) ? "text-white" : "text-steel-300 hover:text-white"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={telHref()}
            className="hidden items-center gap-2 whitespace-nowrap px-3 py-2 font-mono text-xs tracking-wide text-steel-300 transition-colors hover:text-white 2xl:flex"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
          <Link
            href="/contact"
            className="hidden whitespace-nowrap rounded-edge bg-amber px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-[#ff9426] sm:inline-flex xl:px-5"
          >
            Request a Quote
          </Link>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls={drawerId}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-white lg:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      {/* Desktop products mega-menu */}
      <div
        ref={panelRef}
        id={panelId}
        hidden={!megaOpen}
        className="absolute inset-x-0 top-full hidden max-h-[calc(100vh-4.5rem)] overflow-y-auto border-b border-ink-line bg-ink-raised lg:block"
      >
        <div className="shell grid grid-cols-12 gap-x-10 gap-y-8 py-10">
          <div className="col-span-9">
            <p className="eyebrow text-steel-600">Product families</p>
            <ul className="mt-5 grid grid-cols-3 gap-x-8">
              {families.map((family, index) => (
                <li key={family.id}>
                  <Link
                    href={`/products/${family.id}`}
                    className="group flex gap-3 border-b border-ink-line py-3.5"
                  >
                    <span className="mt-0.5 font-mono text-[0.65rem] text-steel-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 font-display text-[0.95rem] font-medium text-white">
                        {family.name}
                        <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-amber opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                      </span>
                      <span className="mt-1 block text-[0.8rem] leading-relaxed text-steel-400">
                        {family.tagline}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-3 space-y-8">
            <div>
              <p className="eyebrow text-steel-600">Browse</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link href="/products" className="flex items-center gap-2 text-sm text-white hover:text-amber">
                    All product families
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
                <li>
                  <Link href="/products/catalogue" className="flex items-center gap-2 text-sm text-white hover:text-amber">
                    Full catalogue &amp; search
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-steel-600">By industry</p>
              <ul className="mt-5 space-y-2">
                {industries.slice(0, 5).map((industry) => (
                  <li key={industry.id}>
                    <Link
                      href={`/industries/${industry.id}`}
                      className="text-sm text-steel-300 transition-colors hover:text-white"
                    >
                      {industry.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/industries" className="text-sm text-amber hover:underline">
                    All industries
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div id={drawerId} className="fixed inset-0 top-16 z-50 overflow-y-auto overscroll-contain bg-ink lg:hidden">
          <div className="flex min-h-full flex-col">
            <div className="flex items-center justify-between border-b border-ink-line px-5 py-4">
              <span className="eyebrow text-steel-500">Menu</span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="-mr-2 flex h-11 w-11 items-center justify-center text-white"
              >
                <Close className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 px-5 py-2">
              <button
                type="button"
                onClick={() => setMobileProducts((v) => !v)}
                aria-expanded={mobileProducts}
                className="flex w-full items-center justify-between border-b border-ink-line py-4 text-left font-display text-xl text-white"
              >
                Products
                <ChevronDown
                  className={`h-5 w-5 text-steel-400 transition-transform ${mobileProducts ? "rotate-180" : ""}`}
                />
              </button>
              {mobileProducts && (
                <ul className="border-b border-ink-line py-2">
                  {families.map((family) => (
                    <li key={family.id}>
                      <Link href={`/products/${family.id}`} className="block py-3 pl-4 text-[0.95rem] text-steel-300">
                        {family.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/products/catalogue" className="block py-3 pl-4 text-[0.95rem] text-amber">
                      Full catalogue &amp; search
                    </Link>
                  </li>
                </ul>
              )}

              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-b border-ink-line py-4 font-display text-xl text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="space-y-3 px-5 py-6">
              <Link
                href="/contact"
                className="flex min-h-13 w-full items-center justify-center rounded-edge bg-amber px-6 font-semibold text-ink"
              >
                Request a Quote
              </Link>
              <a
                href={telHref()}
                className="flex min-h-13 w-full items-center justify-center gap-2 rounded-edge border border-white/25 px-6 text-white"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
