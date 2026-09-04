import Link from "next/link";
import { families } from "@/data/families";
import { industries } from "@/data/industries";
import { addressLine, mailtoHref, siteConfig, telHref, whatsappHref } from "@/lib/site-config";
import { ArrowUpRight, Mail, MapPin, Phone, WhatsApp } from "@/components/ui/icons";

const company = [
  { href: "/about", label: "About" },
  { href: "/service-support", label: "Service & Support" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-steel-300">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <p className="font-display text-lg font-medium text-white">{siteConfig.legalName}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-steel-400">
              Entrance automation and industrial access systems — specified against the opening,
              supplied, installed and supported from Pune.
            </p>
            <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-steel-600">
              {siteConfig.isoCertification} registered · Established {siteConfig.foundedYear}
            </p>
          </div>

          <nav aria-label="Product families" className="lg:col-span-3">
            <h2 className="eyebrow text-steel-600">Products</h2>
            <ul className="mt-5 space-y-3">
              {families.map((family) => (
                <li key={family.id}>
                  <Link
                    href={`/products/${family.id}`}
                    className="text-sm text-steel-300 transition-colors hover:text-white"
                  >
                    {family.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products/catalogue" className="text-sm text-amber hover:underline">
                  Full catalogue
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Industries" className="lg:col-span-2">
            <h2 className="eyebrow text-steel-600">Industries</h2>
            <ul className="mt-5 space-y-3">
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
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="eyebrow text-steel-600">Company</h2>
            <ul className="mt-5 space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-steel-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="eyebrow text-steel-600">Contact</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={telHref()} className="flex items-start gap-3 text-steel-300 transition-colors hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref("Hello Standard Automation, I have an enquiry.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-steel-300 transition-colors hover:text-white"
                >
                  <WhatsApp className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  WhatsApp
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={mailtoHref("Website enquiry")}
                  className="flex items-start gap-3 break-all text-steel-300 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-steel-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                <address className="not-italic leading-relaxed">{addressLine}</address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-line pt-8 text-xs text-steel-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.14em]">Pune · Maharashtra · India</p>
        </div>
      </div>
    </footer>
  );
}
