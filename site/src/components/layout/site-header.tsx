import Link from "next/link";
import Image from "next/image";
import { getAllCategories, getProductsForCategory } from "@/lib/catalog";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { PhoneCTA } from "@/components/cta/phone-cta";
import { EmailCTA } from "@/components/cta/email-cta";
import { RequestQuoteButton } from "@/components/cta/request-quote-button";

const NAV_LINKS = [
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about-us" },
  { label: "Resources", href: "/resources" },
];

export function SiteHeader() {
  const categories = getAllCategories();
  const productsByCategory = Object.fromEntries(
    categories.map((c) => [c.slug, getProductsForCategory(c.slug)])
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-raised">
      <div className="hidden items-center justify-end gap-6 border-b border-border bg-surface-sunken px-6 py-1.5 lg:flex">
        <PhoneCTA />
        <EmailCTA />
      </div>
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={"Standard Automation home"}>
          <Image
            src="/images/legacy/logo.png"
            alt="Standard Automation logo"
            width={160}
            height={40}
            className="h-9 w-auto lg:h-10"
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          <MegaMenu categories={categories} productsByCategory={productsByCategory} />
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink hover:text-brand-steel"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <RequestQuoteButton />
          </div>
          <MobileNav categories={categories} productsByCategory={productsByCategory} />
        </div>
      </div>
    </header>
  );
}
