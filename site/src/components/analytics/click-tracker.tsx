"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * One small client component, mounted once in the root layout, that listens
 * for clicks on any element carrying `data-gtag-event`. This lets every CTA
 * (WhatsApp, phone, email, request-quote, brochure links) stay a plain
 * server-rendered <a>/<Link> - per the brief's "minimal client JavaScript" -
 * instead of converting each one into its own client component just to
 * attach an onClick handler.
 */
export function ClickTracker() {
  useEffect(() => {
    function handler(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>("[data-gtag-event]");
      if (!el) return;
      const eventName = el.dataset.gtagEvent!;
      const extra = el.dataset.gtagLabel ? { label: el.dataset.gtagLabel } : {};
      trackEvent(eventName, extra);
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
