# Master Audit Report — standardautomation.in Refurbishment

**Phase**: 1 — Complete Existing Website Audit & Archive
**Date**: 2026-09-02
**Scope**: Full crawl, content archive, SEO audit, UX audit, competitor research, and a proposed (not-yet-approved) information architecture, URL migration plan, and technology recommendation. **Nothing on the live site was changed.** All claims below are traceable to `research/urls.json`, `research/products.json`, `research/images.json`, `legacy/content/raw/` (verbatim archived HTML), and this session's live-browser testing. Anything not verifiable from the live site is explicitly marked **UNKNOWN**.

---

## 1. Executive summary

Standard Automatic Solutions Pvt Ltd's website (standardautomation.in) is a ~2016/2017-era static HTML site (Bootstrap 3, jQuery, OWL Carousel) covering a real, substantial industrial product range — rolling shutters, automatic gates, doors, high-speed doors, loading bay equipment, turnstiles/barriers, and (currently disabled) boom barriers and motors/accessories. The catalogue and underlying content are genuine business assets worth preserving and rebuilding on.

The single most important finding of this audit is **operational, not cosmetic**: the site's primary navigation — the desktop mega-menu and the mobile hamburger menu — is completely non-functional on the live HTTPS domain today, because every page loads jQuery over plain `http://`, which every modern browser blocks as mixed content on an HTTPS page. A real visitor arriving at the homepage cannot open "Our Products" on desktop or the menu at all on mobile. This is very likely suppressing conversions and mobile usability right now, independent of any redesign decision. Compounding this, 7 pages have canonical tags pointing at an unrelated page (actively telling Google to deindex them), 12 pages share one generic duplicate title/description, ~84% of pages carry duplicate/invalid H1 markup, analytics has been silently dead since mid-2023 (legacy Universal Analytics), and the company's own address appears three different ways across the site with no way to tell which is current.

None of this requires a redesign to fix — it requires a rebuild that simply doesn't repeat these specific, identifiable mistakes, on a foundation (Next.js + a proper CMS) where they're structurally harder to make. The recommended path is: fix or retire the broken legacy site's worst issues where cheaply possible, then rebuild on the stack in §14 using this audit — not assumptions — as the source of truth for content, catalogue, and URL preservation.

## 2. Existing website structure

- **Template**: static HTML pages (XHTML 1.0 Transitional doctype), Bootstrap 3, jQuery 1.10.2 (loaded insecurely — see §6), OWL Carousel, a custom `jquery.popup.js`.
- **Layout pattern**: shared header (logo, phone/email bar, mega-menu nav) and footer (address, contact info, social links) on every page; product/category pages additionally carry a left sidebar (`col-lg-3`) static category list and a right content column (`col-lg-9`).
- **Forms**: two separate legacy PHP mail handlers — `txl_lib/txlsendemail.php` (enquiry.html) and `kxi-lib/kxisendemail.php` (contact.html) — each with inline custom JS validation. Current deliverability of these forms is **UNKNOWN**; not exercised end-to-end during this read-only audit.
- **Analytics**: Google Universal Analytics only (`UA-89576950-1`), a property type Google stopped processing on 1 July 2023. No GA4 tag found anywhere.
- **Structured data**: `LocalBusiness` JSON-LD present on only 2 of 56 pages, and internally inconsistent (see §9).

## 3. Complete product catalogue

36 distinct product pages across 9 live/former category groupings were recovered and fully archived in `research/products.json` (verbatim descriptions, feature bullets, spec tables where present, and images) and `legacy/content/*.md` (readable per-page archive). Full category tree: see `research/proposed-information-architecture.md`. Summary:

| Category | Live in current nav? | Product count |
|---|---|---|
| Rolling Shutters | Yes (5 of 7 subpages linked; 2 more live-but-orphaned) | 7 |
| Gates | Yes | 4 |
| Bollard / Turnstile / Barriers | Yes | 4 |
| Doors | Yes | 6 |
| High Speed Doors (2nd menu group) | Yes | 4 |
| Loading Bay Equipment | Yes | 2 |
| Boom Barriers | **No — commented out of live nav HTML** | 2 |
| Motors & Accessories | **No — commented out of live nav HTML** | 10 |
| Sliding Glass Door | **No — orphaned, no nav or sitemap entry** | 1 |

Per-product technical specs, materials, dimensions, certifications, and brochures are captured only where the live page actually publishes them — most pages have prose descriptions and feature bullets but not formal spec sheets; a few (e.g. Galvanized Rolling Shutters) have an HTML spec table. Where a field (materials, certifications, brochures) is not published on the live page, it is recorded as `"UNKNOWN"` in `products.json` rather than guessed, per the audit's ground rules.

## 4. URL inventory summary

- **61 unique paths** discovered (49 from `sitemap.xml`, 12 more via internal-link crawling not present in the sitemap).
- **56 return HTTP 200**; **5 return HTTP 404** (2 of which — `hotels-in-alibaug.html`, `sitemap.html` — are still listed in `sitemap.xml`; the other 3 — `tile-adhesive.html`, `epoxy-tile-grout.html`, `industrial-engg-grout.html` — reference construction-chemical products unrelated to the doors/gates/shutters business and are **UNKNOWN** in origin, possibly leftover from a different business or shared template).
- **55 of 57 live paths are duplicated across `http://` and `https://`** with no redirect — effectively double the indexable URL count Google actually needs to deal with.
- **14 live pages are reachable only by direct URL** — commented out of the navigation HTML entirely (Boom Barriers ×2, Motors & Accessories ×10, plus the category landers for each).
- Full detail: `research/urls.json`. Proposed redirect handling for every single discovered URL variant (122 rows, including protocol duplicates): `research/url-migration-map.csv`.

## 5. SEO findings

See `research/seo-audit.md` for full detail. Headlines:
- No HTTP→HTTPS canonicalization (site-wide duplicate content risk).
- 7 pages have canonical tags pointing to an unrelated page (`fire-proof-shutters.html`) instead of themselves.
- 12 pages share one generic, duplicate title and meta description.
- ~84% of page-records carry duplicate/invalid `<h1>` markup.
- 336 of 410 images (82%) have no alt text.
- Only 2 of 56 pages have any structured data, and that data has an internal inconsistency (duplicate `telephone` key).
- Sitemap.xml hasn't been regenerated since 2017 and references dead pages.

## 6. Mobile findings

- **The mobile hamburger menu does not open at all** — confirmed by direct interaction against the live site. Root cause: jQuery fails to load (see §5 of `ux-audit.md`). This is the most severe mobile issue on the site.
- Viewport meta omits `width=device-width` and disables pinch-zoom (`maximum-scale=1`) — a WCAG 1.4.4 failure with no offsetting benefit.
- Content that did render on mobile (hero, phone bar, enquiry CTA) was legible and reasonably sized.

## 7. UX findings

See `research/ux-audit.md` for full detail. Headlines:
- Desktop "OUR PRODUCTS" mega-menu also does not open — same jQuery root cause as the mobile menu. **The site's entire primary navigation is broken for every visitor on the live domain today.**
- Homepage "Our Products" and "Hot Products" carousel sections render as blank white space (OWL Carousel never initializes without jQuery).
- A working fallback exists only for visitors who land directly on a product page: the plain-HTML sidebar category list (no JS dependency).
- Two confirmed live content bugs: `sliding-gate.html`'s body text describes "Swing Gates" under an "Automatic Sliding Gates" H1; `about-us.html` states the company "is the sister company of" itself.
- No brochures, testimonials, case studies, trust-stat counters, or live chat — all present on the two competitors researched.

## 8. Technical findings

- Mixed-content HTTP script load breaks jQuery site-wide on HTTPS (§5–7).
- Legacy Universal Analytics (dead since 2023); no GA4.
- Two separate, undocumented legacy PHP form handlers of unknown current reliability.
- No sitemap regeneration process evident (last touched 2017).
- No apparent CMS — content changes require hand-editing HTML across every page that repeats shared markup (header/footer/sidebar), which is presumably why the mega-menu's Barriers/Motors sections were simply commented out rather than removed cleanly, and why nav labels drifted out of sync with URLs in the Rolling Shutters range.

## 9. Content findings

- Three different company addresses appear across the site (footer factory address, `contact.html` office address, and the JSON-LD `LocalBusiness` block's third address) with no indication which is current — **UNKNOWN, requires business confirmation before the rebuild ships a single authoritative address.**
- Old "Standard Industries" branding persists in social-media links and the Google Maps listing tied to `contact.html`, inconsistent with the current "Standard Automatic Solutions Pvt Ltd" name.
- Rolling Shutters sub-range has a three-way mismatch between nav label, target URL, and on-page title — the actual identity of "Aluminium Rolling Shutters" vs. "Fire Shutters" vs. their real underlying URLs needs business confirmation (see `seo-audit.md` §3) before final content/URLs are set.
- Verbatim archive of every live page's content is preserved in `legacy/content/*.md`, separate from any proposed new content, per the audit's instruction to keep the two clearly apart.

## 10. Asset findings

- 410 distinct images discovered across the crawl (`research/images.json`); 336 (82%) have no alt text.
- No PDFs, brochures, datasheets, or technical drawings found anywhere on the site.
- ~20+ client/end-user logos on `clients.html`, no case-study or project detail linked to any of them.
- All images are legacy, unoptimized `<img>` tags (JPEG/PNG, no responsive `srcset`, no modern formats) — a straightforward win once migrated to `next/image` or equivalent.

## 11. Competitor findings

Full detail in `research/competitor-analysis.md`. Two competitors studied directly (Avians — a direct Pune-based local competitor with a working, well-organized mega-menu and a persistent sticky enquiry widget; Gandhi Automations — the national market leader, with brochures as a first-class nav item and a sticky contact icon rail). Patterns worth adapting (not copying): a mega-menu that actually renders, WhatsApp click-to-chat, trust-stat counters, downloadable brochures, and testimonials/case studies — all absent from Standard Automation today.

## 12. Proposed information architecture

Full detail in `research/proposed-information-architecture.md`. Grounded entirely in the actual live + orphaned product range recovered from the site's own navigation HTML — no invented categories. Recommends reinstating the two currently-disabled category groups (Barriers, Motors & Accessories) pending business confirmation they're still active product lines, consolidating the duplicated "High Speed Doors" menu entries, and resolving the Rolling Shutters label/URL mismatch before finalizing.

## 13. SEO migration strategy

Full row-by-row mapping for all 122 discovered URL variants (56 live canonical URLs + protocol/www duplicates + 5 dead URLs) is in `research/url-migration-map.csv`. Strategy summary:
- **Every currently-indexable URL gets a permanent redirect** to its new location under the proposed `/products/<category>/<product>/` structure, preserving existing SEO equity rather than starting from zero.
- **All `http://` and non-canonical duplicate URLs collapse into a single redirect** to the `https://www.` canonical version — eliminating the duplicate-content problem identified in the SEO audit as part of the same migration, rather than carrying it into the new site.
- **Dead pages are not resurrected speculatively.** The 2 sitemap-listed 404s and 3 unrelated-content 404s get no redirect target pending business input (see `url-migration-map.csv` notes column).
- Products whose true identity is ambiguous (the Rolling Shutters label/URL mismatch) are flagged with a placeholder mapping and a note, not silently resolved by guessing.

## 14. Recommended technology stack

*(Recommendation only — not yet approved, and no implementation should begin until this audit is reviewed. Context7 was consulted for current Next.js best practice but returned a quota-exceeded error during this session; the recommendation below reflects established, well-documented Next.js/React ecosystem practice as of this session rather than a freshly-fetched doc, and should be spot-checked against current docs before implementation begins.)*

- **Framework**: Next.js (App Router), TypeScript. A marketing/catalogue site with ~35 product pages and infrequent content changes is a strong fit for Next.js's static generation (`generateStaticParams`) with Incremental Static Regeneration for anything the CMS updates between deploys — fast pages, good SEO defaults, no client-side jQuery-style fragility.
- **Styling**: Tailwind CSS — fast to build a consistent design system with, easy to keep the working mega-menu and sticky-enquiry patterns from the competitor research responsive by default.
- **Content/data architecture**: a headless CMS (e.g., Sanity, or a simpler Markdown/MDX + Git-based content model if the business doesn't need non-technical editors) modeling `Category` and `Product` as first-class content types with the fields already captured in `products.json` (name, category, description, features, spec table, images, related products) plus the currently-missing ones this audit flagged as gaps (brochure/PDF upload, certifications, materials, dimensions) so they can be filled in going forward rather than left `UNKNOWN` forever.
- **Images**: `next/image` for automatic responsive `srcset`/format negotiation (AVIF/WebP) and enforced `alt` text at the component level — directly closes the 82%-missing-alt-text gap found in this audit by making alt text a required prop rather than optional markup.
- **Search/filtering**: with only ~35 products, a simple client-side filter (by category/subcategory, driven by the CMS taxonomy) is sufficient; no need for a dedicated search service like Algolia unless the catalogue grows substantially.
- **Forms**: replace both legacy PHP handlers with one shared form component posting to a single modern serverless email/lead endpoint (e.g., Resend, Postmark, or a CMS's native form-handling), with basic spam protection (honeypot or a lightweight challenge) — neither legacy form had any spam control.
- **Analytics**: GA4 from day one, replacing the dead Universal Analytics property; consider adding basic conversion tracking on the enquiry/contact forms given the audit found no way to measure current lead flow at all.
- **SEO**: Next.js Metadata API for per-page title/description (directly fixes the 12-page duplicate-title problem and the 7 wrong-canonical pages by construction, since canonical becomes derived from route rather than hand-typed per page), `Product` and `BreadcrumbList` JSON-LD generated from the same CMS data used to render the page (eliminates the risk of structured data drifting out of sync with visible content, which is part of how the current NAP inconsistency likely happened).
- **Accessibility**: enforce `alt` text at the CMS/component level (see Images above); restore a proper `width=device-width` viewport with pinch-zoom enabled.
- **Performance**: static generation + `next/image` should comfortably outperform the current unoptimized-image, render-blocking-jQuery baseline on Core Web Vitals with no special tuning required.
- **Deployment**: any Next.js-friendly host (Vercel, or a self-hosted Node server per the client's general infra preferences — **UNKNOWN**, not yet discussed for this project) with the redirect map in `url-migration-map.csv` implemented at the edge/host level before cutover.

## 15. Recommended development phases

1. **Business confirmation round** (blocking, see §17) — resolve the address conflict, the Rolling Shutters label/URL mismatch, and the status of Barriers/Motors & Accessories before any content is finalized.
2. **IA and content model sign-off** — approve or amend `proposed-information-architecture.md` and the `Category`/`Product` content model.
3. **Design phase** (Figma) — explicitly out of scope until this point, per the audit's instructions.
4. **Build**: scaffolding → shared layout/nav (the one component this audit proves must not repeat the jQuery mistake) → category/product templates driven by the content model → forms/lead capture → analytics/structured data → accessibility pass.
5. **Content migration**: port archived content from `legacy/content/` into the CMS, applying only business-approved corrections (address, mismatched labels, copy-paste errors like the Swing Gate/Sliding Gate mixup) — not a verbatim re-publish of known-broken content.
6. **Redirect implementation and QA** against every row in `url-migration-map.csv`.
7. **Staged cutover** with post-launch monitoring of GA4 and Search Console for indexing/ranking impact.

## 16. Risks

- **Content ambiguity risk**: shipping the Rolling Shutters label/URL mismatch forward without business clarification would carry a real, confirmed content-accuracy bug into the new site.
- **SEO equity risk**: any gap between `url-migration-map.csv` and the final redirect implementation will lose ranking on pages that currently work, however imperfectly.
- **Scope-creep risk**: the temptation to invent "reasonable-sounding" certifications, dimensions, or specs to fill the many `UNKNOWN` fields in `products.json` — this audit deliberately leaves them unknown, and the business must supply real data rather than have it fabricated.
- **NAP/local-SEO risk**: launching with an unresolved 3-way address conflict would actively harm local search performance rather than improve it.
- **Orphaned-category risk**: silently dropping Boom Barriers and Motors & Accessories (currently disabled) could mean discontinuing sellable product lines without the business intending that outcome — or, conversely, reinstating discontinued lines the business deliberately removed. Either way this needs an explicit decision, not a default.

## 17. Missing information requiring business confirmation

1. **Which company address is current** — the footer's Kelavade factory address, `contact.html`'s Bavdhan office address, or the JSON-LD's Karve Nagar address (or some combination, e.g. registered office vs. factory)?
2. **What "Aluminium Rolling Shutters" and "Fire Shutters" actually are**, given their nav labels point to URLs/titles suggesting different products (see `seo-audit.md` §3).
3. **Whether Boom Barriers and Motors & Accessories are still active, sellable product lines** — they're live on the server but removed from the navigation.
4. **Whether the two identically-labeled "High Speed Doors" menu groups were intended as one category or two.**
5. **What `hotels-in-alibaug.html` was** (a past hospitality-sector project/case study, per its filename) and whether that content should be recovered/recreated.
6. **Current reliability of the two legacy PHP enquiry/contact form handlers** — not verifiable via a read-only audit.
7. **Hosting/deployment preferences** for the rebuilt site (not yet discussed in this engagement).
8. **Real certifications, materials, dimensions, and brochure assets** for products where the live site publishes none today — the audit records these as `UNKNOWN` rather than inventing them.

---

## Deliverables index

| File | Contents |
|---|---|
| `research/urls.json` | Full URL inventory: type, category, HTTP status, canonical, indexability, internal links, preservation recommendation |
| `research/products.json` | All 36 products: descriptions, features, spec tables, images, related products |
| `research/images.json` | 410 images: source page, alt text, product association, retain/replace flags |
| `legacy/content/*.md` | Verbatim per-page content archive (56 pages) |
| `legacy/content/raw/*.html` | Verbatim raw HTML as fetched from the live site |
| `research/seo-audit.md` | Full SEO findings |
| `research/ux-audit.md` | Full UX/visual findings (desktop + mobile) |
| `research/competitor-analysis.md` | Avians and Gandhi Automations pattern research |
| `research/proposed-information-architecture.md` | Proposed nav/category structure, grounded in actual product range |
| `research/url-migration-map.csv` | 122-row redirect/migration plan for every discovered URL variant |
| `research/MASTER-AUDIT.md` | This report |
