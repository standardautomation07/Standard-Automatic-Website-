# SEO Implementation Plan — Standard Automation Rebuild

Status: **DRAFT.** Every item below fixes a specific, named finding in `research/seo-audit.md` — cross-referenced throughout — rather than being a generic SEO checklist. The goal is to preserve the existing site's SEO equity while structurally preventing every mistake the audit found from being possible to repeat.

## 1. Titles & meta descriptions

- Next.js **Metadata API**, generated per-route from the CMS's `seo.title` / `seo.description` fields (`CONTENT-MODEL.md`).
- **Fixes** `seo-audit.md` §1.3: the 12 pages sharing one generic "Welcome To..." title get individually written titles during content migration — this is a **content task**, not just a technical one; each of those 12 products needs real copy, not a template fallback that recreates the duplication.
- **Fixes** `enquiry.html`'s 7-character title and `high-speed-fold-up-doors.html`'s missing description — every route in the CMS requires non-empty `seo.title`/`seo.description` at the schema level (Sanity validation rule), so a blank one is impossible to publish.
- Title length validated at ≤60 characters, description at ≤160, enforced as Sanity field validation, not just a style guideline — prevents recurrence of the audit's title-length outliers.

## 2. Canonical URLs

- Canonical tag generated from the route itself (`https://www.standardautomation.in` + the page's own path), never hand-entered per page. **This structurally fixes** `seo-audit.md` §1.2 — 7 pages currently have a canonical hand-typed to point at an unrelated page; a derived canonical cannot point anywhere but its own route.
- Every canonical is `https://www.` — **fixes** §1.1 (canonicals currently point at `http://`).

## 3. Open Graph & social

- `og:title`, `og:description`, `og:image` (from the product/category's own `heroImage`/`gallery[0]`), `og:type` (`website` for info pages, `product` where applicable), `og:locale` = `en_IN`. None of this exists on the old site — pure addition, not a fix.

## 4. robots.txt & sitemap

- `robots.txt`: `Allow: /` for all, `Sitemap: https://www.standardautomation.in/sitemap.xml` — **fixes** the old file's `http://` sitemap reference (`seo-audit.md` §1.1).
- **Dynamically generated XML sitemap** (Next.js `sitemap.ts`) built from the live CMS content graph at build/request time, not hand-maintained — **fixes** §1.8 (the old sitemap hasn't been touched since 2017 and still lists 2 dead URLs). A generated sitemap can only ever list pages that actually exist in the CMS.
- `lastmod` driven by the CMS document's real `_updatedAt`, not a static date.

## 5. Structured data

| Schema | Where | Notes |
|---|---|---|
| `Organization` | Site-wide (root layout) | Name, logo, sameAs (social links) — safe to ship immediately, doesn't depend on the address conflict |
| `LocalBusiness` | Site-wide | **Gated — do not ship until `OPEN-BUSINESS-DECISIONS.md` item 1 (address) is resolved.** The old site's only structured data was a `LocalBusiness` block with a third, different address and a duplicate `telephone` key (`seo-audit.md` §1.9) — shipping this again half-confirmed would repeat the exact bug |
| `Product` | Every product page | Populated only from confirmed fields (`name`, `description`, `image`, `category`); `offers`/`price` omitted entirely since this is an enquiry-based catalogue, not e-commerce — no invented pricing |
| `BreadcrumbList` | Every product/category page | Generated from the same route hierarchy that drives the visible breadcrumb component — cannot drift out of sync with what's on screen, unlike the old site's plain-text-only breadcrumb |
| `FAQPage` | Any page with real, populated FAQs | Only emitted when the CMS `faqs` array is non-empty — never emitted with placeholder Q&A |

**Zero structured data exists on 54 of 56 old pages today** (`seo-audit.md` §1.7); this plan takes that to full coverage on every route, gated appropriately where data is unconfirmed.

## 6. Heading structure

- Exactly **one `<h1>` per page**, rendered by the page template itself, never by a shared sidebar/menu component — **directly fixes** §1.5 (≈84% of old pages have 2 competing H1s, several with invalid open/close tag pairing). The category sidebar/mega-menu in the new build uses `<h2>`/`<h3>`/`nav` landmarks for its own headings, structurally separated from the page's single H1 by using a real component boundary instead of copy-pasted markup per page.

## 7. Redirects & URL consolidation

- Every row in `research/url-migration-map.csv` becomes a redirect entry (Next.js `redirects()` in `next.config`, or host-level edge redirects) — see `URL-MIGRATION-PLAN.md` for the full mapping and traceability rule.
- **All `http://` and non-`www` variants 301 to `https://www.`** in one rule, before any path-specific redirect runs — **fixes** §1.1's 55 duplicate-content URL pairs in a single stroke.
- Every redirect is a permanent (301) redirect, never a 302, to pass link equity correctly.
- Post-launch QA: crawl every URL in `url-migration-map.csv`'s `old_url` column against the live redirect map before cutover (can reuse the existing `scripts/crawl.js` pattern for this verification pass — no need to re-run a full discovery crawl, just a targeted status check).

## 8. Internal linking

- Related-products (from the CMS reference field), category ↔ product breadcrumbing, and Solutions ↔ Product cross-links (`FINAL-IA.md` §4) replace the old site's only working internal-link mechanism (the static sidebar list) with several redundant, semantically meaningful paths — while keeping a sidebar-style category navigator as one of them (see `DESIGN-SYSTEM.md` §4), since it was the one navigation element on the old site that actually worked.
- The 14 currently-orphaned pages (Boom Barriers, Motors & Accessories) get real internal links again once reinstated (`FINAL-IA.md` §2), rather than remaining reachable only by direct URL.

## 9. Images

- `next/image` for every image, with `alt` text as a **required** prop at the component level — the direct fix for §2's 336-of-410 (82%) missing-alt-text figure. Alt text is authored during content migration from each product's real name/context, not auto-generated filler.
- Responsive `srcset` + modern formats (AVIF/WebP with fallback) generated automatically.

## 10. Clean 404 page

- A real, on-brand 404 page (the old site's dead URLs currently return generic host-level 404s) with a search box and links back into the Products mega-menu — reduces bounce from any redirect-map gap that surfaces post-launch.

## 11. Analytics & Search Console readiness

- GA4 property created fresh (**fixes** §1.6 — the old UA property has collected nothing since July 2023); measurement ID stored on the `company` singleton (`CONTENT-MODEL.md`) so it's configurable without a code change.
- Enquiry-form submission fires a GA4 conversion event (see `COMPONENT-ARCHITECTURE.md`'s form component).
- Search Console verified against the new domain property before cutover; the redirect map submitted/monitored post-launch for crawl errors and any indexing drop on previously-ranking URLs.

## 12. AIO / AI-search readability

Per the brief: structure content so both traditional search engines and AI answer-engines can parse company identity, catalogue, and capabilities without keyword stuffing:

- `Organization` schema plus a clear, single canonical "About" narrative (once the sister-company/address content bugs are fixed — `research/ux-audit.md`) gives any AI system an unambiguous entity description to cite.
- Product pages use plain, literal, semantic prose (real feature/spec/application text already in `research/products.json`, lightly edited) rather than SEO-keyword-stuffed copy — the existing archived descriptions are already close to this register and are the right starting point for rewrites.
- FAQ content (once real Q&A exists) is marked up with `FAQPage` schema specifically because that format is what most AI answer engines extract directly.
- Consistent entity naming: **one** confirmed address, **one** confirmed phone set, **one** consistent company-name string used identically across every page's markup and structured data — the single biggest AIO improvement available here, since the old site's 3-address inconsistency is exactly the kind of signal that makes any entity (human or AI) unable to confidently answer "where is this company located?"

## 13. What is explicitly NOT done in this plan

- No `LocalBusiness` schema ships until the address is confirmed (§5).
- No fabricated certifications, specs, or statistics are added anywhere to "improve" SEO copy — every fact traces to `research/products.json`/`research/MASTER-AUDIT.md` or a business confirmation in `OPEN-BUSINESS-DECISIONS.md`.
- No keyword-stuffed copy — the brief and this plan both explicitly prefer clear semantic content over density tricks, which also serves the AIO goal in §12.
