import Link from "next/link";
import { getAllCategories } from "@/lib/catalog";
import { siteConfig } from "@/lib/site-config";
import { PhoneCTA } from "@/components/cta/phone-cta";
import { EmailCTA } from "@/components/cta/email-cta";
import { WhatsAppCTA } from "@/components/cta/whatsapp-cta";

export function SiteFooter() {
  const categories = getAllCategories();

  return (
    <footer className="border-t border-border bg-surface-sunken">
      <div className="container-x grid gap-10 py-12 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold uppercase tracking-wide">
            {siteConfig.shortName}
          </p>
          <p className="mt-2 max-w-xs text-sm text-ink-muted">
            {siteConfig.legalName} &mdash; manufacturer of industrial rolling
            shutters, gates, doors and loading bay equipment. {siteConfig.isoCertification} registered company.
          </p>
        </div>

        <nav aria-label="Products">
          <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Products
          </p>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className="text-ink-muted hover:text-ink">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Company
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about-us" className="text-ink-muted hover:text-ink">About Us</Link></li>
            <li><Link href="/clients" className="text-ink-muted hover:text-ink">Clients</Link></li>
            <li><Link href="/projects" className="text-ink-muted hover:text-ink">Projects</Link></li>
            <li><Link href="/resources" className="text-ink-muted hover:text-ink">Resources</Link></li>
            <li><Link href="/service-support" className="text-ink-muted hover:text-ink">Service &amp; Support</Link></li>
            <li><Link href="/contact" className="text-ink-muted hover:text-ink">Contact</Link></li>
          </ul>
        </nav>

        <div>
          <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Get in touch
          </p>
          <address className="mb-4 not-italic text-sm text-ink-muted">
            {siteConfig.address.street}<br />
            {siteConfig.address.locality}, {siteConfig.address.city}{" "}
            {siteConfig.address.postalCode}<br />
            {siteConfig.address.region}, India
          </address>
          <div className="space-y-3">
            <PhoneCTA />
            <EmailCTA />
            <WhatsAppCTA className="mt-1" />
          </div>
        </div>
      </div>

      <div className="border-t border-border py-4">
        <p className="container-x text-xs text-ink-muted">
          &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
