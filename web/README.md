# Standard Automation — website (`web/`)

The Standard Automatic Solutions Pvt Ltd website. Built from market research
rather than from the previous site: new taxonomy, new content, new structure.
The old `standardautomation.in` survives here only as (a) evidence of which
products are actually the company's, and (b) a redirect map.

The earlier `../site/` app is superseded and kept for reference only.

## Run it

```bash
npm install
npm run dev              # http://localhost:3001
npm run build
npm start
npm run lint
npm run test:e2e         # Playwright, production build on port 3100
node scripts/shots.mjs   # QA screenshots at 1440/1024/768/430/390/375
```

## Catalogue architecture

The hierarchy is **family → category → product → variant**, with application
and technical information hanging off the product:

| Level | Count | Where |
| --- | --- | --- |
| Family | 9 | `src/data/families.ts` |
| Category | 20 | `src/data/categories.ts` |
| Product | 38 | `src/data/products/*.ts` |
| Variant | 82 | on each product record |

A **category** is a construction or operating principle — the level at which
two products genuinely behave differently, not just finish differently. A
**variant** is the same product built for a different environment or
configuration, which is where competitors typically inflate a product count.

Categories carry `defaults` for safety, controls, options and maintenance that
every product in them inherits (`resolveDetail()` merges product over
category). That is how 38 product pages carry real safety and control detail
without 38 copies of the same paragraphs.

Nothing in the UI hardcodes a product. Every page renders from this data.

### URLs

```
/products                              families landing
/products/catalogue                    search + filter across all 38
/products/[family]                     family page (categories, comparison, considerations)
/products/[family]/[product]           product page
/industries                            industry landing
/industries/[industry]                 industry page
```

69 routes, all statically prerendered.

## Research trail

Everything in the catalogue traces back to three files at the repo root:

- `research/market-product-research.md` — the market study: ten manufacturers
  read, the taxonomy conclusions drawn from them, the specification fields
  this market conventionally publishes, and the fire-rating standards that
  apply in India.
- `research/product-taxonomy.json` — the structural taxonomy. `tests/taxonomy.spec.ts`
  fails if it and `src/data` ever disagree, id for id.
- `research/product-source-matrix.csv` — per product: sources, evidence,
  confidence and recommended website status.

## Content rules this codebase enforces

**Business status.** `CONFIRMED` products were published by the company with a
dedicated page, live in its navigation. `POTENTIAL` products were published
but removed from navigation, or are a configuration of something confirmed —
they appear with a visible "to be confirmed" marker rather than hidden.
`NOT_CONFIRMED` market products are absent from `src/data` entirely and exist
only in the research matrix. A test asserts none has leaked in.

**Specifications.** A spec table appears only where the figures come from
specifications the company itself publishes. Products without one get an
explicit "specification to be confirmed" panel, never an invented table.

**Fire ratings.** No product publishes one. A rating belongs to a tested
assembly — curtain, guides, fixings, motor and release as installed — not to a
product name. Both fire products say so on the page. A test enforces it.

**Company claims.** Two only: founded 2006 in Pune, and ISO 9001:2015
registered. Both appear on the company's own published material. No employee
count, turnover, project totals, client list or factory size appears anywhere.

**Names we cannot confirm.** Two products carry a rendered `namingNote`
because the previous site's page title contradicted its own heading or URL.

## Imagery

`src/data/images.ts` is the registry. Components take an image **id**, never a
path, so source, usage status, product association and alt text always travel
with the picture.

Two usage classes today:

- **Unsplash License** (free commercial use, no attribution) — stand-in
  photography, credited per file in `public/images/photography/CREDITS.md`.
  It is *not* photography of Standard Automation installations and should be
  replaced with owned project photography. Alt text describes only what each
  photograph actually shows.
- **Company asset** — clean supplier catalogue renders the company itself
  published (turnstiles, flap and full height barriers, and two photographs).
  These render on a light plate via `fit: "contain"`.

No competitor imagery is used.

## Enquiry

The form asks for width, height, application, location and usage as well as
contact details, because those five answers decide most specifications here.

No email provider is connected. `deliverEnquiry` logs the submission and
returns `"recorded"`, and the UI says plainly that email delivery is not
connected and points at phone and WhatsApp. To switch delivery on, implement
`sendViaProvider` in `src/lib/enquiry.ts` and set `ENQUIRY_PROVIDER`.

## Redirects

`next.config.ts` serves `src/data/redirects.json` — 56 permanent redirects
from the old `.html` URLs into the new hierarchy.

`hotels-in-alibaug.html` is deliberately absent: the business retired it, so a
real 404 is the intended outcome. A test asserts it still 404s.

http→https and non-www→www consolidation belongs to the hosting/edge layer,
not here.
