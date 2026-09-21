"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal driver. Marks <html> as script-enabled and reveals every
 * element carrying data-reveal / data-reveal-group as it enters the
 * viewport. One observer for the whole document; a MutationObserver picks up
 * elements added by client navigation, so no section needs to be a client
 * component of its own.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("js");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const observe = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]").forEach((el) => {
        if (el.classList.contains("is-in")) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92 && r.bottom > 0) el.classList.add("is-in");
        else io.observe(el);
      });
    };
    observe(document);
    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) observe(node.parentNode ?? document);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    // Safety net for fast flick scrolls: anything already scrolled past is
    // shown even if the observer never saw it cross the viewport.
    let raf = 0;
    const sweep = () => {
      raf = 0;
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), [data-reveal-group]:not(.is-in)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
      });
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
