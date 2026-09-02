# Component Architecture — Standard Automation Rebuild

Status: **DRAFT.** Next.js App Router, TypeScript, server components by default. Every client-component boundary below is called out explicitly and justified — the brief asks for minimal client JavaScript, and the old site's single worst bug (`research/ux-audit.md` §1) was critical navigation depending on JavaScript that silently failed. This architecture is designed so that failure mode is structurally impossible to repeat: the mega-menu and mobile nav are built to be **fully operable with CSS/native HTML alone**, with JavaScript only progressively enhancing the experience, never gating it.

## 1. Route structure (App Router)

```
app/
├── layout.tsx                 (root layout: header, footer, Organization JSON-LD)
├── page.tsx                   (homepage)
├── about-us/page.tsx
├── clients/page.tsx
├── contact/page.tsx           (shared enquiry form, replaces enquiry.html + contact.html)
├── products/
│   ├── page.tsx                              (all-categories overview)
│   └── [category]/
│       ├── page.tsx                          (category landing — generateStaticParams from CMS categories)
│       └── [product]/page.tsx                (product detail — generateStaticParams from CMS products)
├── solutions/
│   ├── page.tsx
│   └── [solution]/page.tsx
├── projects/
│   ├── page.tsx
│   └── [project]/page.tsx     (renders only once real project content exists — FINAL-IA.md §5)
├── resources/page.tsx         (renders only once real resources exist — FINAL-IA.md §6)
├── service-support/page.tsx
├── sitemap.ts                 (generated XML sitemap — SEO-IMPLEMENTATION-PLAN.md §4)
├── robots.ts
└── not-found.tsx              (custom 404 — SEO-IMPLEMENTATION-PLAN.md §10)
```

All list/detail pages under `products/`, `solutions/`, `projects/` are **server components using `generateStaticParams` + ISR**, matching the brief's "static rendering where possible" — content changes in the CMS trigger revalidation, not a full redeploy.

## 2. Component inventory and server/client boundary

| Component | Type | Notes |
|---|---|---|
| `<SiteHeader>` | Server | Renders logo, nav links, CTA button. Composes `<MegaMenu>`. |
| `<MegaMenu>` | **Hybrid** — server-rendered markup, client-enhanced disclosure | See §3 — this is the component the whole rebuild's navigation credibility rests on |
| `<MobileNav>` | **Client** (minimal) | A `<dialog>`-based or `aria-expanded`-toggled panel; see §3 |
| `<Breadcrumb>` | Server | Derived from route params + CMS category/product names; emits matching `BreadcrumbList` JSON-LD alongside |
| `<ProductCard>` | Server | Pure presentational, no interactivity needed |
| `<SpecTable>` | Server | Renders only rows with real data (`CONTENT-MODEL.md`) |
| `<ProductGallery>` | **Client** (small) | Image carousel/lightbox needs client state; built with no external carousel dependency (the old site's OWL Carousel failure is exactly the class of bug to avoid repeating) — a small, self-contained component using native CSS scroll-snap plus minimal JS for thumbnail sync, functional even if JS fails to load (falls back to a scrollable strip) |
| `<EnquiryForm>` | **Client** (form state) + Server Action | See §4 |
| `<WhatsAppCTA>` | Server (renders nothing if number unconfirmed) | See §5 |
| `<TrustStrip>` | Server | Only renders confirmed facts (`OPEN-BUSINESS-DECISIONS.md`) |
| `<Faq>` | Server | Renders `FAQPage` JSON-LD only when populated |

## 3. Mega-menu & mobile nav — the critical fix

**Design constraint, non-negotiable per the audit**: navigation must not depend on jQuery, a Bootstrap JS plugin, or any script loaded from a third-party CDN over a potentially-blocked protocol. Implementation:

- **Structure**: the mega-menu is real, server-rendered `<nav>` markup — every category and product link exists in the HTML from first paint, crawlable and clickable with zero JavaScript. This alone makes the menu strictly better than the old site's broken state (where the links existed in HTML too, but were hidden behind a JS-only open mechanism).
- **Disclosure behavior**: implemented as a small, first-party client component using native `<button aria-expanded>` + `aria-controls`, not a third-party menu library. On desktop, `:focus-within`/`:hover` CSS can additionally reveal the panel without any JS at all — the JS layer only adds keyboard-arrow navigation and click-outside-to-close as an enhancement.
- **Mobile nav**: a dedicated, independently-designed panel (`<dialog>` element or an `aria-hidden`-toggled full-screen div), opened by a single `<button>` with a real `onClick` handler in a small client component — no dependency on Bootstrap's `data-toggle="collapse"` pattern, which is exactly what silently failed on the old site.
- **Progressive enhancement test as an explicit acceptance criterion**: before this component ships, verify the menu's links are all present and clickable with JavaScript disabled in the browser (not just "the page still loads") — this is the direct regression test for the audit's #1 finding, and should be part of the Playwright test suite (`MASTER-AUDIT.md` MCP workflow).

## 4. Enquiry / lead-generation system

- **One shared `<EnquiryForm>` component**, rendered as: a full page at `/contact/`, an embedded panel on every product page, and inside the sticky enquiry widget (`DESIGN-SYSTEM.md` §5) — a single implementation, not the old site's two separate, divergent PHP forms.
- Fields per the brief: Name, Company, Email, Phone, City, Product/Category (pre-filled when launched from a product page), Message.
- **Server Action** handles submission — replaces both legacy PHP handlers (`txl_lib/txlsendemail.php`, `kxi-lib/kxisendemail.php`) with one typed, testable code path. Sends via a modern transactional email API (Resend/Postmark — final choice not yet made, see `OPEN-BUSINESS-DECISIONS.md`).
- **Spam protection**: a honeypot field plus basic rate-limiting on the server action — neither legacy form had any spam control at all.
- **GA4 conversion event** fires client-side on confirmed successful submission (`SEO-IMPLEMENTATION-PLAN.md` §11).
- Client-side validation mirrors server-side validation (required fields, email format) — but the server action re-validates independently; client validation is a UX nicety, not the security boundary.

## 5. WhatsApp CTA

- A server component that reads `company.whatsappNumber` from the CMS singleton (`CONTENT-MODEL.md`) and renders a `wa.me` link with a pre-filled message context (e.g. mentioning the product page it's launched from) — **renders nothing at all if the field is empty**, rather than falling back to a guessed or placeholder number. This is a hard requirement: the brief explicitly forbids inventing this number.

## 6. Data fetching

- Sanity client (or chosen CMS) queried at build time for `generateStaticParams` and per-page data, using GROQ (if Sanity is approved — see `OPEN-BUSINESS-DECISIONS.md`) or the equivalent for an alternative CMS.
- Revalidation via on-demand ISR (webhook from the CMS on publish) rather than a fixed time interval, so content edits appear promptly without a full rebuild.
- Images resolved through the CMS's image CDN URL, then piped through `next/image` for final optimization — double optimization avoided by requesting the CMS's own appropriately-sized source rather than the largest original.

## 7. Testing hooks (Playwright, per the MCP workflow)

- Navigation smoke test: every mega-menu and mobile-nav link resolves to a 200, with JavaScript disabled, on both desktop and mobile viewport sizes.
- Redirect map test: every `old_url` in `planning/final-redirects.csv` resolves through exactly one redirect hop to its `new_url`.
- Form test: enquiry submission (against a test/staging email endpoint) fires the expected GA4 event and does not silently fail.
- Visual regression: homepage, one category page, one product page, and the mobile nav open state, across the two themes if dark mode is included in the Figma design.
