declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GA4-only (see planning/SEO-IMPLEMENTATION-PLAN.md §11 - the old site's
 * Universal Analytics property has collected nothing since July 2023).
 * No-ops safely if GA hasn't loaded (no measurement ID configured yet, or
 * the user blocks analytics scripts) - callers never need to check first.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}
