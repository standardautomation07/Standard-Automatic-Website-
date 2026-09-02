# Content Model — Sanity Schema Plan

Status: **DRAFT — pending CMS approval.** Field lists mark, per field, whether real source data exists in the audit archive (`Source: audit`) or must be supplied by the business (`Source: NEW — required`). No field is pre-filled with invented content; empty is the correct state until the business supplies real values.

## Design principles

1. **Category and Product are separate documents**, referenced, not nested — matches the real site (categories have their own landing content distinct from their children) and lets the mega-menu, sitemap, and breadcrumbs all derive from the same reference graph instead of being hand-maintained in three places (part of how the old site's nav-label/URL drift happened).
2. **Every field that the old site never published stays optional and nullable** — the front end must render correctly with it empty (see `COMPONENT-ARCHITECTURE.md`), not hide the whole page or fake a value.
3. **`LocalBusiness`-relevant fields (address, phone) live on the singleton `Company` document**, referenced everywhere they're needed (footer, contact page, JSON-LD), so a future correction happens in one place — directly preventing a repeat of the 3-conflicting-addresses problem found in the audit.

## `company` (singleton)

| Field | Type | Source |
|---|---|---|
| `legalName` | string | audit — "Standard Automatic Solutions Pvt Ltd" |
| `foundedYear` | number | audit — 2006 (about-us.html) |
| `isoCertification` | string | audit — "ISO 9001:2015" |
| `primaryAddress` | object (street, locality, city, region, postalCode) | **NEW — required.** 3 conflicting addresses found; do not populate until business confirms one (`OPEN-BUSINESS-DECISIONS.md` item 1) |
| `secondaryAddresses` | array of address objects | Optional, only if business confirms more than one real, current location |
| `phoneNumbers` | array of `{label, number}` | audit — "+91-8888 100 280", "+91 20 6470 1067" (verify current before launch) |
| `whatsappNumber` | string | **NEW — required.** Not found anywhere in the audit; must not be invented (`OPEN-BUSINESS-DECISIONS.md` item 2) |
| `emails` | array of `{label, address}` | audit — sales@standardautomation.in, customercare@standardautomation.in |
| `socialLinks` | array of `{platform, url}` | audit found links, but tied to the old "Standard Industries" brand — confirm current before reuse |
| `gaMeasurementId` | string | **NEW — required.** No GA4 property exists yet |

## `category`

| Field | Type | Source |
|---|---|---|
| `name` | string | audit |
| `slug` | slug | provisional, per `FINAL-IA.md` |
| `parentCategory` | reference (self, optional) | for nesting, e.g. High Speed Doors as a possible child of Doors pending `OPEN-BUSINESS-DECISIONS.md` item 3 |
| `overview` | portable text | audit has some category-landing copy (e.g. `rolling-shutters.html`); port verbatim from `legacy/content/`, then let the business revise |
| `heroImage` | image | audit — category banner images captured in `research/images.json`; re-shoot/replace flagged ones (missing alt, low-res) rather than reuse blindly |
| `navLiveStatus` | string enum (`live`, `pending-reinstatement`) | tracks the Boom Barriers / Motors & Accessories decision explicitly in content, not just in code |
| `seo` | object (title, description) | audit has existing values for most categories; flagged duplicates (`research/seo-audit.md` §1.3) must be rewritten uniquely, not copied forward |

## `product`

| Field | Type | Source |
|---|---|---|
| `name` | string | audit |
| `slug` | slug | provisional |
| `category` | reference → `category` | audit |
| `legacyUrl` | string | the exact old URL, kept for redirect QA traceability |
| `overview` | portable text | audit — first description paragraph, verbatim, editable |
| `keyFeatures` | array of strings | audit — "Features" bullet lists where present |
| `technicalSpecifications` | array of `{label, value}` or table | audit — only where a live spec table exists (e.g. Galvanized Rolling Shutters); **empty for every product that doesn't publish specs today — do not fabricate** |
| `applications` | array of strings | audit — "Applications/Uses" bullets; also drives the Solutions cross-linking in `FINAL-IA.md` §4 |
| `gallery` | array of images | audit — `research/images.json` filtered by product; each needs alt text written (82% currently missing) |
| `relatedProducts` | array of references → `product` | audit — derived from same-category siblings |
| `brochure` | reference → `resource` (optional) | **NEW — none exist today**; field stays empty until a real PDF exists |
| `certifications` | array of strings (optional) | **NEW — none published per-product today** (only the sitewide ISO claim exists) |
| `materials`, `dimensions` | text (optional) | **NEW** where marked `UNKNOWN` in `research/products.json` |
| `faqs` | array of references → `faq` | optional, only where real Q&A exists |
| `seo` | object (title, description) | port existing unique values; rewrite the 12 pages that currently share one generic title |

## `solution` (Solutions/Applications — new content type)

| Field | Type | Source |
|---|---|---|
| `name` | string | seeded from the 6 aggregated application categories in `FINAL-IA.md` §4 (e.g. "Warehousing & Logistics") — grounded in real per-product application data, not invented industries |
| `slug` | slug | new |
| `overview` | portable text | **NEW — required**, industry-specific narrative copy the business must supply |
| `relatedProducts` | array of references → `product` | can be pre-populated from which products already list this application |
| `heroImage` | image | **NEW — required** |

## `project` (Projects/case studies — new content type, likely empty at launch)

| Field | Type | Source |
|---|---|---|
| `title`, `client`, `location`, `year`, `description`, `images`, `relatedProducts` | — | **entirely NEW.** No real project/case-study content exists in the archive. Do not seed with placeholder entries; ship the schema, leave the collection empty until real projects are supplied |

## `client` (logo wall)

| Field | Type | Source |
|---|---|---|
| `name` | string | **NEW — required.** The old site shows ~20+ logos with no name/attribution text per logo (`research/images.json`); names must come from the business, not be guessed from the logo image |
| `logo` | image | audit — existing logo images, reusable if the business confirms current permission/relationship |

## `resource` (brochures/datasheets — new, empty at launch)

| Field | Type | Source |
|---|---|---|
| `title`, `file`, `relatedProducts`, `relatedCategories` | — | **entirely NEW.** Zero PDFs exist today |

## `faq`

| Field | Type | Source |
|---|---|---|
| `question`, `answer` | text | **NEW.** No FAQ content exists on the old site; populate only with real, business-approved Q&A, scoped per-product or per-category where relevant |

## `testimonial`

| Field | Type | Source |
|---|---|---|
| `quote`, `author`, `company`, `relatedProject` | — | **entirely NEW.** No testimonials exist in the archive |

## Fields deliberately excluded from v1

- Multi-language/locale support — no evidence the old site had this, not requested in the brief.
- E-commerce/pricing fields — this is a lead-generation B2B catalogue, not a storefront, consistent with the old site's enquiry-based model.
