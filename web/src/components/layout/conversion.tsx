import Link from "next/link";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";
import { Phone, WhatsApp } from "@/components/ui/icons";

const defaultMessage = "Hello Standard Automation, I would like a quote.";

/**
 * Desktop conversion rail. Fixed to the right edge, vertically centred,
 * icon-only until hover. Deliberately narrow so it never sits over content
 * at the 82rem max content width.
 */
export function ConversionRail({ message = defaultMessage }: { message?: string }) {
  return (
    <div className="pointer-events-none fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ul className="pointer-events-auto flex flex-col overflow-hidden rounded-l-edge border border-r-0 border-line bg-paper-raised shadow-[0_8px_30px_rgba(10,12,14,0.10)]">
        <li>
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-12 items-center gap-3 border-b border-line px-3.5 text-steel-700 transition-colors hover:bg-amber hover:text-ink"
          >
            <WhatsApp className="h-5 w-5 shrink-0" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[9rem] group-focus-visible:max-w-[9rem]">
              WhatsApp us
            </span>
          </a>
        </li>
        <li>
          <a
            href={telHref()}
            className="group flex h-12 items-center gap-3 border-b border-line px-3.5 text-steel-700 transition-colors hover:bg-amber hover:text-ink"
          >
            <Phone className="h-5 w-5 shrink-0" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[9rem] group-focus-visible:max-w-[9rem]">
              {siteConfig.phone}
            </span>
          </a>
        </li>
        <li>
          <Link
            href="/contact"
            className="group flex h-12 items-center gap-3 bg-ink px-3.5 text-white transition-colors hover:bg-amber hover:text-ink"
          >
            <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em]">
              Quote
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

/**
 * Mobile persistent action bar. The <body> carries bottom padding equal to
 * its height so it can never cover the end of the page content.
 */
export function MobileActionBar({ message = defaultMessage }: { message?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-ink-line bg-ink xl:hidden">
      <a
        href={telHref()}
        className="flex min-h-14 flex-col items-center justify-center gap-1 border-r border-ink-line text-white"
      >
        <Phone className="h-5 w-5" />
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em]">Call</span>
      </a>
      <a
        href={whatsappHref(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 flex-col items-center justify-center gap-1 border-r border-ink-line text-white"
      >
        <WhatsApp className="h-5 w-5" />
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em]">WhatsApp</span>
      </a>
      <Link
        href="/contact"
        className="flex min-h-14 flex-col items-center justify-center gap-1 bg-amber font-semibold text-ink"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em]">Get a quote</span>
      </Link>
    </div>
  );
}
