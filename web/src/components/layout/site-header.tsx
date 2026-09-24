"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";
import { ArrowRight, ChevronDown, Close, Menu, Phone, WhatsApp } from "@/components/ui/icons";

/**
 * Primary navigation. Six destinations plus the quote CTA: Products opens a
 * visual mega-menu of the eight families; the rest are single pages. The
 * labels are the site's own sections — nothing here points at a route that
 * does not exist.
 */
const primaryNav = [
  { href: "/industries", label: "Industries" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
  { href: "/service-support", label: "Support" },
  { href: "/about", label: "Company" },
];

export interface HeaderFamily {
  id: string;
  name: string;
  tagline: string;
  count: number;
}

export function SiteHeader({
  families,
  industries,
}: {
  families: HeaderFamily[];
  industries: { id: string; name: string }[];
}) {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();
  const drawerId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  const closeAll = useCallback(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, []);

  // Route change closes everything (React's documented adjust-during-render
  // pattern, which avoids a cascading second render from an effect).
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setMegaOpen(false);
    setDrawerOpen(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeAll]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // Hover intent: open on enter, close a beat after leaving trigger and panel.
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 160);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const underline = (active: boolean) =>
    `absolute inset-x-3 bottom-0 h-0.5 origin-left bg-amber transition-transform duration-300 ${
      active ? "scale-x-100" : "scale-x-0"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b text-white transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || megaOpen
          ? "border-ink-line bg-ink/95 shadow-[0_8px_30px_rgba(0,0,0,0.25)] supports-[backdrop-filter]:bg-ink/85 supports-[backdrop-filter]:backdrop-blur-xl"
          : "border-white/10 bg-ink"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-edge focus:bg-amber focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <div className="shell flex h-18 items-center justify-between gap-2 lg:h-22 xl:gap-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${siteConfig.shortName} — home`}>
          <Image
            src="/images/brand/logo-header-invert.svg"
            alt=""
            width={540}
            height={144}
            priority
            className="h-12 w-auto lg:h-16"
          />
          <span className="sr-only">{siteConfig.legalName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden min-w-0 self-stretch lg:flex lg:items-stretch lg:gap-1">
          <div
            ref={triggerRef}
            className="flex"
            onPointerEnter={() => {
              cancelClose();
              setMegaOpen(true);
            }}
            onPointerLeave={scheduleClose}
          >
            <button
              type="button"
              onClick={() => setMegaOpen((v) => !v)}
              aria-expanded={megaOpen}
              aria-controls={panelId}
              className={`relative flex items-center gap-1.5 whitespace-nowrap px-3 text-[0.9rem] font-medium transition-colors ${
                megaOpen || pathname.startsWith("/products") ? "text-white" : "text-steel-300 hover:text-white"
              }`}
            >
              Products
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} />
              <span aria-hidden="true" className={underline(megaOpen || pathname.startsWith("/products"))} />
            </button>
          </div>

          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center whitespace-nowrap px-3 text-[0.9rem] font-medium transition-colors ${
                isActive(item.href) ? "text-white" : "text-steel-300 hover:text-white"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
              <span aria-hidden="true" className={underline(isActive(item.href))} />
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={telHref()}
            className="hidden items-center gap-2 whitespace-nowrap px-3 py-2 font-mono text-xs tracking-wide text-steel-300 transition-colors hover:text-white xl:flex"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
          <Link
            href="/contact"
            className="hidden whitespace-nowrap rounded-edge bg-amber px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-deep sm:inline-flex xl:px-5"
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
        onPointerEnter={cancelClose}
        onPointerLeave={scheduleClose}
        className="absolute inset-x-0 top-full hidden max-h-[calc(100vh-5.5rem)] overflow-y-auto border-b border-ink-line bg-ink shadow-[0_30px_60px_rgba(0,0,0,0.45)] lg:block"
      >
        <div className="shell grid grid-cols-12 gap-x-10 py-9">
          <div className="col-span-9">
            <div className="flex items-end justify-between gap-6">
              <p className="eyebrow text-steel-500">Product families</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm text-steel-300 transition-colors hover:text-white"
              >
                All products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-5 grid grid-cols-2 gap-x-10">
              {families.map((family, index) => (
                <li key={family.id}>
                  <Link
                    href={`/products/${family.id}`}
                    className="group grid grid-cols-[auto_1fr] gap-x-4 border-b border-ink-line py-4"
                  >
                    <span className="pt-1 font-mono text-[0.65rem] text-steel-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 font-display text-[0.95rem] font-medium text-white">
                          {family.name}
                          <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-amber opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </span>
                        <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-steel-500">
                          {family.count} products
                        </span>
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

          <div className="col-span-3 border-l border-ink-line pl-8">
            <p className="eyebrow text-steel-500">Browse</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href="/products/catalogue" className="flex items-center gap-2 text-sm text-white hover:text-amber">
                  Full catalogue &amp; search
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link href="/resources" className="flex items-center gap-2 text-sm text-white hover:text-amber">
                  Resources &amp; downloads
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            </ul>
            <p className="eyebrow mt-8 text-steel-500">By industry</p>
            <ul className="mt-4 space-y-2">
              {industries.map((industry) => (
                <li key={industry.id}>
                  <Link
                    href={`/industries/${industry.id}`}
                    className="text-sm text-steel-300 transition-colors hover:text-white"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div id={drawerId} className="fixed inset-0 top-18 z-50 overflow-y-auto overscroll-contain bg-ink lg:hidden">
          <div className="flex min-h-full flex-col">
            <div className="flex items-center justify-between border-b border-ink-line px-5 py-3">
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
                <ul className="border-b border-ink-line py-1">
                  {families.map((family) => (
                    <li key={family.id}>
                      <Link
                        href={`/products/${family.id}`}
                        className="flex min-h-12 items-center justify-between gap-4 py-2.5 pl-4"
                      >
                        <span className="text-[0.95rem] text-steel-200">{family.name}</span>
                        <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-steel-500">
                          {family.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/products/catalogue"
                      className="flex min-h-12 items-center gap-2 py-2.5 pl-4 text-[0.95rem] text-amber"
                    >
                      Full catalogue &amp; search
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </li>
                </ul>
              )}

              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between border-b border-ink-line py-4 font-display text-xl text-white"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-steel-500" />
                </Link>
              ))}
              <Link
                href="/contact"
                className="flex items-center justify-between border-b border-ink-line py-4 font-display text-xl text-white"
              >
                Contact
                <ArrowRight className="h-4 w-4 text-steel-500" />
              </Link>
            </nav>

            <div className="grid grid-cols-2 gap-3 px-5 py-6">
              <Link
                href="/contact"
                className="col-span-2 flex min-h-13 w-full items-center justify-center rounded-edge bg-amber px-6 font-semibold text-white"
              >
                Request a Quote
              </Link>
              <a
                href={telHref()}
                className="flex min-h-13 items-center justify-center gap-2 rounded-edge border border-white/25 px-4 text-sm text-white"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
              <a
                href={whatsappHref("Hello Standard Automation, I would like a quote.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-13 items-center justify-center gap-2 rounded-edge border border-white/25 px-4 text-sm text-white"
              >
                <WhatsApp className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
