"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { categories } from "@/data/categories";
import { siteConfig, telHref } from "@/lib/site-config";
import { ArrowRight, ChevronDown, Close, Menu, Phone } from "@/components/ui/icons";

const primaryNav = [
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSolutions, setMobileSolutions] = useState(false);
  const panelId = useId();
  const drawerId = useId();
  const solutionsWrapRef = useRef<HTMLDivElement>(null);
  const solutionsPanelRef = useRef<HTMLDivElement>(null);

  const closeAll = useCallback(() => {
    setSolutionsOpen(false);
    setDrawerOpen(false);
  }, []);

  // Route change closes everything. Adjusting state during render (rather
  // than in an effect) is React's documented pattern for reacting to a
  // changed input, and avoids a cascading second render.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setSolutionsOpen(false);
    setDrawerOpen(false);
    setMobileSolutions(false);
  }

  // Escape closes the flyout and the drawer.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeAll]);

  // Clicking outside the solutions group closes the flyout. The panel itself
  // has to count as "inside": it is a sibling of the trigger in the DOM, and
  // closing on pointerdown would unmount a link before its click fired.
  useEffect(() => {
    if (!solutionsOpen) return;
    function onPointer(e: PointerEvent) {
      const target = e.target as Node;
      if (solutionsWrapRef.current?.contains(target)) return;
      if (solutionsPanelRef.current?.contains(target)) return;
      setSolutionsOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [solutionsOpen]);

  // Lock body scroll behind the mobile drawer.
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

      <div className="shell flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label={`${siteConfig.shortName} — home`}
        >
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

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-1">
          <div ref={solutionsWrapRef} className="relative">
            <button
              type="button"
              onClick={() => setSolutionsOpen((v) => !v)}
              aria-expanded={solutionsOpen}
              aria-controls={panelId}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm transition-colors ${
                solutionsOpen || pathname.startsWith("/products")
                  ? "text-white"
                  : "text-steel-300 hover:text-white"
              }`}
            >
              Solutions
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 text-sm transition-colors ${
                isActive(item.href) ? "text-white" : "text-steel-300 hover:text-white"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref()}
            className="hidden items-center gap-2 whitespace-nowrap px-3 py-2 font-mono text-xs tracking-wide text-steel-300 transition-colors hover:text-white 2xl:flex"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
          <Link
            href="/contact"
            className="hidden whitespace-nowrap rounded-edge bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-[#ff9426] sm:inline-flex"
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

      {/* Desktop solutions flyout */}
      <div
        ref={solutionsPanelRef}
        id={panelId}
        hidden={!solutionsOpen}
        className="absolute inset-x-0 top-full hidden border-b border-ink-line bg-ink-raised lg:block"
      >
        <div className="shell grid grid-cols-12 gap-10 py-10">
          <div className="col-span-8 grid grid-cols-2 gap-x-10 gap-y-1">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="group flex gap-4 border-b border-ink-line py-4 last:border-b-0 [&:nth-last-child(2)]:border-b-0"
              >
                <span className="mt-1 font-mono text-[0.65rem] text-steel-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2 font-display text-base font-medium text-white">
                    {category.name}
                    <ArrowRight className="h-4 w-4 -translate-x-1 text-amber opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-steel-400">
                    {category.tagline}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="col-span-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-edge">
              <Image
                src="/images/photography/hero-facility.jpg"
                alt=""
                fill
                sizes="30vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="eyebrow text-amber">All products</p>
                <p className="mt-2 font-display text-lg text-white">
                  {`Browse the full range`}
                </p>
                <Link
                  href="/products"
                  className="mt-3 inline-flex items-center gap-2 text-sm text-white underline-offset-4 hover:underline"
                >
                  Open product index
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          id={drawerId}
          className="fixed inset-0 top-16 z-50 overflow-y-auto overscroll-contain bg-ink lg:hidden"
        >
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
                onClick={() => setMobileSolutions((v) => !v)}
                aria-expanded={mobileSolutions}
                className="flex w-full items-center justify-between border-b border-ink-line py-4 text-left font-display text-xl text-white"
              >
                Solutions
                <ChevronDown
                  className={`h-5 w-5 text-steel-400 transition-transform ${mobileSolutions ? "rotate-180" : ""}`}
                />
              </button>
              {mobileSolutions && (
                <ul className="border-b border-ink-line py-2">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/products/${category.slug}`}
                        className="block py-3 pl-4 text-[0.95rem] text-steel-300"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
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
