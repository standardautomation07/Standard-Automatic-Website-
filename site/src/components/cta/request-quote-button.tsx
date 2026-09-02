import Link from "next/link";

/**
 * The single shared "ask for a quote" entry point. Per the brief: on a
 * product page this should read "Request Quote for <Product Name>" rather
 * than a generic label, and pre-fill the enquiry form's product field via
 * the `product` query param (read by /contact - see app/contact/page.tsx).
 */
export function RequestQuoteButton({
  productName,
  variant = "primary",
  className = "",
}: {
  productName?: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const label = productName ? `Request Quote for ${productName}` : "Request a Quote";
  const href = productName ? `/contact?product=${encodeURIComponent(productName)}` : "/contact";

  const styles =
    variant === "primary"
      ? "bg-brand-signal text-white hover:bg-brand-signal-dark"
      : "border border-border bg-transparent text-ink hover:border-brand-steel hover:text-brand-steel";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-sm px-5 py-3 text-sm font-semibold tracking-wide transition-colors ${styles} ${className}`}
      data-gtag-event="request_quote_click"
      data-gtag-label={productName}
    >
      {label}
    </Link>
  );
}
