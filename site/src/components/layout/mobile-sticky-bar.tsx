import Link from "next/link";
import { telHref, whatsappHref } from "@/lib/site-config";

/**
 * Mobile: a persistent but unobtrusive 3-item bar (Call / WhatsApp / Request
 * Quote), fixed to the bottom. Kept slim (56px) and the page reserves space
 * for it (see `pb-14 lg:pb-0` on the root layout's main) so it never covers
 * content. Pure server component - no JS needed for a set of links.
 */
export function MobileStickyBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 grid h-14 grid-cols-3 border-t border-border bg-surface-raised shadow-[0_-2px_10px_rgba(0,0,0,0.08)] lg:hidden"
    >
      <a
        href={telHref()}
        data-gtag-event="phone_click"
        className="flex flex-col items-center justify-center gap-0.5 text-xs font-medium text-ink"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
        Call
      </a>
      <a
        href={whatsappHref("Hi, I'd like to enquire about your products.")}
        target="_blank"
        rel="noopener noreferrer"
        data-gtag-event="whatsapp_click"
        className="flex flex-col items-center justify-center gap-0.5 border-x border-border text-xs font-medium text-ink"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2.003c-5.514 0-9.988 4.474-9.988 9.988 0 1.76.46 3.48 1.335 4.996L2 22l5.13-1.345a9.96 9.96 0 0 0 4.91 1.286h.004c5.514 0 9.988-4.474 9.988-9.989 0-2.669-1.04-5.176-2.928-7.064a9.935 9.935 0 0 0-7.064-2.885Zm5.848 14.212c-.248.699-1.44 1.332-1.993 1.383-.51.046-1.146.065-1.849-.116-.427-.11-.974-.303-1.675-.594-2.945-1.272-4.868-4.226-5.014-4.423-.147-.196-1.2-1.596-1.2-3.045 0-1.45.759-2.161 1.028-2.457.27-.297.588-.371.784-.371.196 0 .392.002.564.01.181.008.424-.069.663.507.246.593.836 2.045.909 2.194.073.148.122.322.024.518-.098.196-.147.318-.294.49-.147.171-.31.382-.443.514-.147.147-.3.306-.13.6.172.294.762 1.257 1.635 2.035 1.124 1.002 2.072 1.312 2.365 1.46.294.147.466.123.638-.074.172-.196.735-.858.932-1.152.196-.294.393-.245.663-.147.27.098 1.72.812 2.015.96.294.147.49.22.564.343.073.123.073.712-.176 1.412Z" />
        </svg>
        WhatsApp
      </a>
      <Link
        href="/contact"
        data-gtag-event="request_quote_click"
        className="flex flex-col items-center justify-center gap-0.5 bg-brand-signal text-xs font-semibold text-white"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 4h16v12H5.17L4 17.17V4Z" />
          <path d="M8 9h8M8 12h5" />
        </svg>
        Quote
      </Link>
    </nav>
  );
}
