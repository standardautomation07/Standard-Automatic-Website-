# Final Information Architecture — Standard Automation Rebuild

Status: **DRAFT — pending business approval.** Supersedes `research/proposed-information-architecture.md` by adopting the master brief's 8-item primary nav; every category/product mapping below is still grounded in `research/urls.json` / `research/products.json` / `scripts/nav-tree.json` — nothing invented. Items with no existing source content are explicitly marked **NEW — content required** rather than filled with placeholder copy.

## 1. Primary navigation

```
Home
PRODUCTS         (mega-menu)
SOLUTIONS        (NEW section — structure grounded in existing per-product "Applications" data, see §4)
PROJECTS         (NEW section — no real case-study content exists yet, see §5)
ABOUT US
CLIENTS
RESOURCES        (NEW section — zero brochures/PDFs exist today, see §6)
SERVICE & SUPPORT (NEW section — no existing content, see §7)
CONTACT
```

Enquiry is not a top-level nav item in this structure — per the master brief, the enquiry CTA is a persistent, site-wide element (header CTA button + sticky/footer form + WhatsApp), not a page you have to navigate to. `enquiry.html` and `contact.html`'s content/forms consolidate into this shared enquiry system (see `COMPONENT-ARCHITECTURE.md`).

## 2. Products mega-menu — full category tree

Grounded in the live+orphaned nav HTML (`scripts/nav-tree.json`) and the archived product records (`research/products.json`). Final URL column is provisional pending approval; every row traces to a specific old URL in `research/url-migration-map.csv` (see `URL-MIGRATION-PLAN.md`).

| Category | Nav status today | Products | New URL (provisional) |
|---|---|---|---|
| Rolling Shutters | Live | 7 (see §3 for a naming caveat) | `/products/rolling-shutters/` |
| Gates | Live | 4: Sliding, Swing, Telescopic, Retractable | `/products/gates/` |
| Bollard, Turnstile & Barriers | Live | Bollard (no sub-products) + Tripod Turnstile, Flap Barrier, Full Height Barrier | `/products/bollard-turnstile-barriers/` |
| Doors | Live | 6: High Speed Industrial Doors, Sectional Overhead Doors ×2 (see caveat below), Fire Sliding Door, Aluminium Garage Door, Residential Garage Door | `/products/doors/` |
| High Speed Doors | Live, but **duplicate menu label** — see caveat | 4: Roll Up, Fold Up, Self Repairing, Industrial | `/products/high-speed-doors/` |
| Loading Bay Equipment | Live | 2: Dock House, Dock Levellers | `/products/loading-bay-equipment/` |
| Boom Barriers & Barriers | **Commented out of live nav — DO NOT remove, reinstating pending confirmation** | 2: Boom Barriers, Retractable Barriers | `/products/boom-and-barriers/` |
| Motors & Accessories | **Commented out of live nav — DO NOT remove, reinstating pending confirmation** | 10 motor variants (Tubular, Australian Type, Central, Side ×2, Sliding Gate, Swing Gate, Industrial Sliding Gate, Sliding Glass Door, Sectional Door) | `/products/motors-accessories/` |

**Caveat — "Doors" category has an internal duplicate**: `sectional-door.html` (H1 "Overhead Sectional Doors") and `overhead-sectional-doors.html` (H1 "Sectional Overhead Doors") are two separate live URLs with near-identical H1s and presumably near-duplicate content. **Do not merge or delete either without business confirmation** — see `OPEN-BUSINESS-DECISIONS.md` item 4.

**Caveat — two menu groups both named "High Speed Doors"**: one lives under "Doors" (`high-speed-door.html`), one is a separate top-level group with 4 children. The brief instructs not to guess a resolution — both are retained as-is pending a business decision on whether to merge them (`OPEN-BUSINESS-DECISIONS.md` item 3).

## 3. Rolling Shutters — naming ambiguity, evidence gathered but NOT resolved

`research/seo-audit.md` §3 flagged that the live nav's "Aluminium Rolling Shutters" and "Fire Shutters" labels point to URLs whose *filenames* don't match. Re-examining each linked page's own title/H1 (not just its URL) clarifies the picture further, without resolving it:

| Live nav label | Links to | That page's own H1/title |
|---|---|---|
| "Aluminium Rolling Shutters" | `fire-proof-shutters.html` | H1 "Aluminium Rolling Shutters" — **content agrees with the nav label**, only the URL slug is misleading |
| "Fire Shutters" | `aluminium-single-wall.html` | H1 "Fire Shutters" — **content agrees with the nav label**, only the URL slug is misleading |
| "Insulated Rolling Shutters" | `g-i-rolling-shutters.html` | Title says "Galvanize Rolling Shutter," H1 says "Insulated Rolling Shutters" — **a genuine internal title/H1 mismatch on this one page**, separate from the nav question |

Additionally, two **orphaned** pages (live, but in neither nav nor sitemap) carry content nearly identical to the two above:
- `aluminium-rolling-shutters.html` (orphaned) — H1 "Aluminium Rolling Shutters," same as `fire-proof-shutters.html` (live).
- `fire-proof-rolling-shutters.html` (orphaned) — H1 "Fire Rated Rolling Shutters," closely matching `aluminium-single-wall.html`'s "Fire Shutters" content (live).

**Working hypothesis** (audit team's inference from the data, not a business-confirmed fact): at some point the business likely republished these two products under new, shorter URLs (`fire-proof-shutters.html`, `aluminium-single-wall.html`) while the old, differently-named originals were left live but unlinked. If true, each pair is one product with a duplicate page, not two different products. **This is a hypothesis to bring to the business for confirmation, not a decision** — see `OPEN-BUSINESS-DECISIONS.md` item 1. Until confirmed, both members of each pair are carried into the new IA as provisional duplicates under one product slug, with the orphaned twin redirected once confirmed identical.

## 4. Solutions / Applications — structure grounded in real data

No dedicated "Solutions" content exists on the old site, but the individual product pages' own "Applications/Uses" bullet lists (archived verbatim in `research/products.json`) repeatedly name the same real-world settings. Aggregating them (not inventing them) gives a defensible starting taxonomy:

- **Warehousing & Logistics** (warehouses, loading bays, dock levellers' own stated use case)
- **Manufacturing & Industrial Plants** (factories — including food, pharmaceutical, chemical, and electrical-parts manufacturing, each named explicitly on at least one product page)
- **Cold Storage** (named explicitly on at least one rolling-shutter product page)
- **Commercial & Retail** (supermarkets, large commercial buildings, showrooms)
- **Institutional** (hospitals — named explicitly; offices)
- **Transport Infrastructure** (airports — named explicitly)

Each Solutions page would cross-link to the specific products already tagged with that application in the CMS (see `CONTENT-MODEL.md`), rather than carrying separate written content. **NEW — content required**: any industry-specific narrative copy, imagery, or case studies beyond this product cross-referencing must come from the business, not be authored speculatively.

## 5. Projects

`clients.html` today is a logo wall with no project detail, case studies, or attribution per client. **NEW — content required.** The IA reserves `/projects/` as a destination, structured as a list of project entries (see `CONTENT-MODEL.md`'s `Project` type), but it should not launch with fabricated projects. If the business has no real case-study material, launch without this nav item populated (or omit it) rather than inventing projects — note `hotels-in-alibaug.html`'s 404 (`OPEN-BUSINESS-DECISIONS.md` item 5) as a possible lead on a real past project worth recovering.

## 6. Resources

Zero brochures, datasheets, or PDFs exist on the old site (`research/images.json` / `research/seo-audit.md`). `/resources/` is reserved for this content once produced. Per product, the CMS's `Resource` reference field (see `CONTENT-MODEL.md`) stays empty until a real PDF exists — the product page's "Download brochure" CTA should not render for a product with no linked resource, rather than link to a placeholder.

## 7. Service & Support

No existing content. Recommended structure for a company that sells industrial automation hardware (installation, AMC/maintenance, spare parts, warranty terms) is a reasonable placeholder *shape* for this section, but every word of actual copy must come from the business — do not launch with invented service terms, SLAs, or warranty periods.

## 8. Retained pages outside the mega-menu

| Old URL | New URL | Notes |
|---|---|---|
| `about-us.html` | `/about-us/` | Content needs the self-referential "sister company of itself" line fixed (see `research/ux-audit.md`) once the business confirms the correct sister-company name, if any |
| `clients.html` | `/clients/` | Logo wall retained; expand into `/projects/` only with real data |
| `enquiry.html`, `contact.html` | `/contact/` | Consolidated into the shared enquiry system; both legacy URLs 301 to this one page (see `URL-MIGRATION-PLAN.md`) |

## 9. Pages NOT carried forward as top-level nav items

- 2 sitemap-listed 404s (`hotels-in-alibaug.html`, `sitemap.html`) — no redirect target pending confirmation.
- 3 unrelated 404s referencing construction-chemical products (tile adhesive, epoxy grout) — out of scope for this business, per `research/seo-audit.md`.
