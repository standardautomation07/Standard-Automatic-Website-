# SEO Audit — standardautomation.in

Audit date: 2026-09-02. Source: full crawl of 61 unique discovered paths (sitemap.xml + internal-link discovery), 56 returning HTTP 200. Raw evidence for every claim below is in `research/urls.json` and the archived HTML in `legacy/content/raw/`. This is an audit only — nothing on the live site was changed.

## 1. Critical technical SEO issues

### 1.1 No HTTP→HTTPS canonicalization (site-wide duplicate content)
55 of 57 unique paths return HTTP 200 on **both** `http://www.standardautomation.in/...` and `https://www.standardautomation.in/...` with no redirect between them. Google can index either version, splitting link equity and ranking signals across two copies of almost every page. `robots.txt`'s own `Sitemap:` line points at the `http://` sitemap. **Fix priority: highest** — add a single, permanent (301) redirect from `http://` and non-`www` to canonical `https://www.`.

### 1.2 Canonical tags pointing to the wrong, unrelated page
7 pages carry a `<link rel="canonical">` that points to `fire-proof-shutters.html` — a page in a completely different product category:

| Page | Canonical tag currently points to |
|---|---|
| `aluminium-rolling-shutters.html` | `fire-proof-shutters.html` |
| `fire-proof-rolling-shutters.html` | `aluminium-single-wall.html` |
| `bollard.html` | `fire-proof-shutters.html` |
| `turnstile.html` | `fire-proof-shutters.html` |
| `tripod-turnstile.html` | `fire-proof-shutters.html` |
| `flap-barrier.html` | `fire-proof-shutters.html` |
| `full-height-barrier.html` | `fire-proof-shutters.html` |

A correct canonical tag is a strong instruction to Google to stop indexing the page it's on and treat the target as authoritative instead. As written, these 7 tags are effectively telling Google to deindex Bollard, Turnstile, Tripod Turnstile, Flap Barrier and Full Height Barrier in favour of an Aluminium Rolling Shutter page they have nothing to do with. **Fix priority: highest** — every page's canonical must point to itself (its own `https://www.` URL).

### 1.3 Duplicate/thin `<title>` and meta description across 12 pages
`dock-house.html`, `clients.html`, `boom-barriers.html`, `sliding-gate-motor.html`, `swing-gate-motor.html`, `sliding-glass-door.html`, `automatic-barriers.html`, `tubular-motor.html`, `australian-type-motor.html`, `central-motor.html`, `side-motor-with-gear.html`, `sliding-glass-door-motor.html` all share the identical, generic title **"Welcome To Standard Automatic Solutions Pvt Ltd"** and an identical generic 245-character meta description, instead of a page-specific one. These pages never received the same title/description treatment the main product pages did. `enquiry.html`'s title is just **"Enquiry"** (no brand, no keyword). `turnstile.html` and `tripod-turnstile.html` share an identical title ("Best Turnstile Manufacturer in Maharashtra India"). `high-speed-fold-up-doors.html` has no meta description at all.

### 1.4 Two pages sharing another page's exact title/description (content mix-up)
`aluminium-rolling-shutters.html` and `fire-proof-shutters.html` carry an identical title/description ("Aluminium Rolling Shutter Manufacturer..."), and separately `fire-proof-rolling-shutters.html` and `aluminium-single-wall.html` carry an identical title/description ("Fire Rated Rolling Shutters Manufacturer... | Fire Shutters"). Combined with the nav-label mismatch in §3 below, the Rolling Shutters sub-range's URLs, on-page titles, and nav labels have been crossed with each other at some point in the site's history and never reconciled.

### 1.5 Duplicate/competing `<h1>` on ~84% of pages
94 of 112 fetched page-records (56 unique pages × http/https) contain **two** `<h1>` elements: the actual page heading (e.g. "Dock Levellers") *and* the sidebar's "Our Products" menu heading, which on several pages is malformed markup that opens as `<h2 class="h2toh1">` but closes with `</h1>` (invalid, unbalanced HTML — e.g. `sliding-gate.html` line 213). Search engines treat multiple H1s as diluted/ambiguous page-topic signal, and the invalid open/close tag pairing is a markup-validity fault in its own right, repeated on nearly every page.

### 1.6 Deprecated analytics — no data has been collected since July 2023
Every page loads Google's legacy Universal Analytics snippet (`ga('create','UA-89576950-1', ...)`). UA stopped processing hits on 1 July 2023; this property has been silently blind for over three years. There is no GA4 tag anywhere on the site.

### 1.7 No structured data on product/category pages
Only 2 of 56 pages carry any Schema.org markup at all (`index.html` and `contact.html`, both `LocalBusiness` JSON-LD — see §1.9 for a data-quality problem inside that block). Zero `Product`, `BreadcrumbList`, or `Organization` structured data exists anywhere, despite the site having a real breadcrumb-shaped UI (`Home > Gate > Sliding Gate`) and 36 distinct products that would benefit from rich-result eligibility.

### 1.8 Sitemap references dead pages; some live pages are in neither the sitemap nor the nav
`sitemap.xml` lists `hotels-in-alibaug.html` and `sitemap.html`, both of which now 404. Conversely, `sliding-glass-door.html`, `m-s-grill-rolling-shutters.html`, `perforated-shutters.html`, `polycarbonate.html`, `aluminium-rolling-shutters.html`, and `fire-proof-rolling-shutters.html` are live (HTTP 200) but appear in **neither** the current sitemap nor the current navigation — they're only reachable if a search engine or user already has the exact URL. The sitemap has evidently not been regenerated since 2017 (every `<lastmod>` predates 2017-05-15).

### 1.9 NAP (name/address/phone) inconsistency — 3 different addresses for one company
- Footer (site-wide, every page): "Plot no 12, Gat no. 168, Kelavade Industrial estate... Bhor, Dist: Pune 412213" (factory)
- `contact.html` body: adds a second, different office address, "215, Business Square, Opp Dsk Ranwara... Bavdhan Pune 411021"
- The site's only JSON-LD `LocalBusiness` block (`contact.html`/`index.html`) gives a **third**, different address: "Sr.No 53, Sahawas Road Opp Vandevi Mandir Karve Nagar, Pune 411052"

The JSON-LD block also declares the `telephone` key twice (`+91 2064701067` then `+91 8888 100 280`) — invalid/ambiguous JSON-LD authoring, and Google Maps' embedded iframe on `contact.html` is tied to a listing still named "Standard Industries," not the current company name. This inconsistency directly undermines local-search ranking (Google Business Profile matching depends on NAP consistency) and needs a business-side decision on which address(es) are current before the rebuild — **marking all three as UNKNOWN pending business confirmation**, per the audit's ground rules.

### 1.10 Mixed content blocks jQuery from loading over HTTPS
Every page loads jQuery from `http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js` (hardcoded `http://`, not protocol-relative or `https://`). On the live `https://` site this request is blocked by the browser as mixed active content, so jQuery never loads at all. This is primarily a UX/functional bug (detailed in `ux-audit.md` §1) but it is also an SEO signal problem: Google's mobile-friendliness and Core Web Vitals evaluation render the page as real Chrome would, so it sees the same broken, JS-dependent navigation and blank carousel sections real visitors do.

### 1.11 Viewport meta disables pinch-zoom and omits device-width
Every page's viewport tag is `content="initial-scale=1, maximum-scale=1"` — it never sets `width=device-width`, and `maximum-scale=1` explicitly disables pinch-to-zoom. The first is a mobile-rendering correctness issue (see UX audit); the second fails WCAG 1.4.4 (Resize Text) and is flagged by Google's mobile usability tooling.

## 2. On-page SEO inventory (aggregate, from `research/urls.json`)

- **Titles**: 0 missing. 1 too short/thin (`enquiry.html`, 7 characters). Several exceed Google's ~60-character display budget (e.g. homepage title is 98 characters; `automatic-doors.html` is 80).
- **Meta descriptions**: 1 missing (`high-speed-fold-up-doors.html`). ~45 of 56 exceed the ~155–160 character display budget, many landing at exactly 245 characters because they reuse the same generic paragraph (see §1.3).
- **Canonical tags**: present on all 56 live pages (positive), but wrong on 7 of them (see §1.2), and pointing to `http://` rather than `https://` on all of them (see §1.1).
- **Robots meta**: none found blocking indexing — no page uses `noindex`.
- **H1**: present on all 56 pages, but duplicated on ~84% of them (see §1.5).
- **Image alt text**: of 410 distinct images found across the crawl, **336 (82%) have no `alt` attribute at all** — this is the single biggest accessibility/image-SEO gap on the site (full list in `research/images.json`).
- **Internal linking**: the sidebar "Our Products" list (present on every product/category page) is the only reliable cross-category internal linking mechanism, since the top navbar mega-menu is broken (see UX audit). 14 product/category pages exist only via URLs commented out of the live nav HTML (Barriers, Motors & Accessories and their children) — real pages the site's own markup has orphaned from internal linking.
- **Breadcrumbs**: a manual, unstyled text breadcrumb (`Home > Gate > Sliding Gate`) exists on product pages but is plain text/links with no `BreadcrumbList` structured data and no semantic `<nav aria-label="breadcrumb">` wrapper.
- **URL structure**: flat, all `.html` at the root (no directories) — mostly readable and keyword-bearing, but inconsistent with the nav's own labels in the Rolling Shutters sub-range (see §1.4) and with a live/orphaned split that isn't visible from the URL itself.

## 3. Content/navigation-label mismatches worth flagging (not SEO-technical, but SEO-relevant)

In the live top-nav mega-menu HTML, the Rolling Shutters submenu's **link text and destination URL don't match each other's apparent subject**:

| Nav label shown to users | Actually links to |
|---|---|
| "Aluminium Rolling Shutters" | `fire-proof-shutters.html` |
| "Insulated Rolling Shutters" | `g-i-rolling-shutters.html` (GI = galvanized iron) |
| "Fire Shutters" | `aluminium-single-wall.html` |

Combined with the duplicate-title problem in §1.4, this indicates the five Rolling Shutter subpages were renamed/reorganized at some point without their labels, titles, or canonicals being updated to match — a genuine content-accuracy problem for users and search engines alike, and one the rebuild must resolve by confirming with the business which product is actually which before assigning final URLs (see `url-migration-map.csv`).

## 4. Summary counts

| Metric | Count |
|---|---|
| Unique paths discovered | 61 |
| Live (HTTP 200) | 56 |
| Dead (HTTP 404), incl. 2 still in sitemap.xml | 5 |
| Pages with wrong canonical target | 7 |
| Pages sharing a generic duplicate title+description | 12 |
| Pages with duplicate/invalid H1 markup | 94 of 112 fetched records (~84%) |
| Live pages orphaned from current nav + sitemap | 6 |
| Live pages orphaned from current nav only (commented out, still in old sitemap-adjacent set) | 14 (Barriers ×3, Motors & Accessories ×11) |
| Images with no alt text | 336 of 410 (82%) |
| Pages with any structured data | 2 of 56 |
| Distinct company addresses found across the site | 3 (unreconciled) |
