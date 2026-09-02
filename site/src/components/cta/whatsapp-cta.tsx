import { siteConfig, whatsappHref } from "@/lib/site-config";

/**
 * Renders nothing if the WhatsApp number is ever unconfirmed again - never
 * falls back to a guessed number. See planning/COMPONENT-ARCHITECTURE.md §5.
 */
export function WhatsAppCTA({
  message,
  className = "",
  label = "Chat on WhatsApp",
}: {
  message?: string;
  className?: string;
  label?: string;
}) {
  if (!siteConfig.whatsapp) return null;

  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-sm border border-border bg-surface-raised px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand-steel hover:text-brand-steel ${className}`}
      aria-label={label}
      data-gtag-event="whatsapp_click"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2.003c-5.514 0-9.988 4.474-9.988 9.988 0 1.76.46 3.48 1.335 4.996L2 22l5.13-1.345a9.96 9.96 0 0 0 4.91 1.286h.004c5.514 0 9.988-4.474 9.988-9.989 0-2.669-1.04-5.176-2.928-7.064a9.935 9.935 0 0 0-7.064-2.885Zm5.848 14.212c-.248.699-1.44 1.332-1.993 1.383-.51.046-1.146.065-1.849-.116-.427-.11-.974-.303-1.675-.594-2.945-1.272-4.868-4.226-5.014-4.423-.147-.196-1.2-1.596-1.2-3.045 0-1.45.759-2.161 1.028-2.457.27-.297.588-.371.784-.371.196 0 .392.002.564.01.181.008.424-.069.663.507.246.593.836 2.045.909 2.194.073.148.122.322.024.518-.098.196-.147.318-.294.49-.147.171-.31.382-.443.514-.147.147-.3.306-.13.6.172.294.762 1.257 1.635 2.035 1.124 1.002 2.072 1.312 2.365 1.46.294.147.466.123.638-.074.172-.196.735-.858.932-1.152.196-.294.393-.245.663-.147.27.098 1.72.812 2.015.96.294.147.49.22.564.343.073.123.073.712-.176 1.412Z"/>
      </svg>
      {label}
    </a>
  );
}
