# Standard Automation — website (`web/`)

The new Standard Automatic Solutions Pvt. Ltd. website. Built from scratch:
new information architecture, new design system, new content. It is **not** a
restyle of the old `standardautomation.in` — the legacy site survives here
only as researched product facts and a redirect map.

The earlier `../site/` app (built directly from the old site's structure and
mega-menu) is superseded by this one and is kept only for reference.

## Run it

```bash
npm install
npm run dev      # http://localhost:3001
npm run build
npm start
npm run lint
npm run test:e2e # Playwright, against a production build on port 3100
node scripts/shots.mjs   # QA screenshots at 1440/1280/390/375 into shots/
```

## Structure

| Path | What it is |
| --- | --- |
| `src/app/` | App Router pages. All static; 58 routes prerendered. |
| `src/data/categories.ts` | The six solution categories. |
| `src/data/products/*.ts` | 40 products, one file per category. |
| `src/data/redirects.json` | 301s from every old `.html` URL. |
| `src/lib/site-config.ts` | The only place business contact details live. |
| `src/lib/catalog.ts` | Catalogue accessors and the homepage featured set. |
| `src/lib/enquiry.ts` | Validation and the email-delivery boundary. |
| `public/images/photography/` | Stand-in photography (Unsplash) — see `CREDITS.md`. |
| `public/images/brand/` | Logo derived to transparent PNG by `scripts/derive-logo.js`. |
| `public/images/legacy/` | The old site's asset library. Mostly unusable (see below). |

## Rules this codebase follows

**No invented facts.** Only two company claims are published — founded 2006 in
Pune, and ISO 9001:2015 registered — because both appear on Standard
Automation's own published material. There are no invented project counts,
client numbers, ratings or reviews, and no `offers`/`aggregateRating` in the
Product schema.

**Specifications are reproduced, not authored.** A product publishes a spec
table only where Standard Automation already publishes those figures for the
line. Where it does not, the page says so and points at "contact us for
configuration" instead of guessing.

**Unresolved naming is surfaced, not hidden.** Four rolling shutter URLs and
one motor URL contradict themselves on the old site (the page title and the
heading name different products). Those records carry a `namingNote` that is
rendered on the page as a visible caveat.

**Product lines awaiting confirmation are shown, not dropped.** Motors &
Accessories and the two barrier products were live on the old server but
commented out of its navigation. They are published with a visible "Awaiting
confirmation" badge rather than silently removed.

**Empty sections stay empty.** `/projects` has no case studies because there
is no verified project material; it is `noindex` and excluded from the sitemap
until there is. `/resources` offers specification guidance rather than fake
download buttons, because no brochures exist yet.

## Imagery

The legacy asset library could not be used for product imagery:

- the `.jpg` files are almost all 1400×298 **page banners with headings burned
  into the pixels** ("Gates", "Shutters", "doors");
- the `.png` product thumbnails are 300×294 and sit inside a **decorative
  octagonal frame** from the old design.

Product and category imagery is therefore stand-in photography from Unsplash
(Unsplash License — free for commercial use, no attribution required), listed
in `public/images/photography/CREDITS.md`. **It is not photography of Standard
Automation installations** and should be replaced with owned project
photography. Alt text describes what each photograph actually shows.

Four legacy assets survived and are still used because they are genuine, clean
images: `intro.jpg`, `bollard-cover.jpg`, and the turnstile/flap/full-height
catalogue renders, which render on a light plate via `imageFit: "contain"`.

## Enquiry delivery

No email provider is connected. `deliverEnquiry` in `src/lib/enquiry.ts` logs
the submission and returns `"recorded"`, and the form tells the visitor
plainly that email delivery is not connected yet and points them at phone and
WhatsApp. To switch delivery on, implement `sendViaProvider` and set
`ENQUIRY_PROVIDER`; nothing else needs to change.

## Redirects

`next.config.ts` serves `src/data/redirects.json` as permanent redirects.

`hotels-in-alibaug.html` is deliberately **absent** — the business retired it,
so a real 404 is the intended outcome. There is a Playwright test asserting it
still 404s.

http→https and non-www→www consolidation is not handled here; it belongs to
the hosting/edge layer.
