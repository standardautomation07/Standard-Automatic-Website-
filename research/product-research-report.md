# Product research report — Standard Automatic Solutions Pvt. Ltd.

Internal document. Not published on the website.
Prepared 2026-09-05, covering the market review, the coverage decisions taken
from it, and what still needs the business.

Companion files:

- `market-product-research.md` — the market study and its sources
- `product-taxonomy.json` — the machine-readable taxonomy the site is built from
- `product-source-matrix.csv` — per-product evidence, confidence and status
- `product-master.json` / `.csv` — the internal product master (§6 deliverable)
- `technical-data-request.csv` — the sheet for collecting outstanding figures

---

## 1. Product families discovered

Across the manufacturers studied, the market organises itself into ten
families: high speed doors, sectional overhead doors, rolling shutters, fire
rated shutters and doors, industrial sliding doors, cold storage doors,
motorised gates, automatic pedestrian doors, loading bay equipment, and
barriers/turnstiles/bollards. Hangar doors appear as an eleventh among the
larger players.

Every family in the market has a variant axis that the Indian comparators
generally under-publish: the *environment* the product is built for, rather
than the product itself. That is the single most useful structural finding
from this research and it shapes the whole catalogue.

## 2. Products selected for Standard Automation

Eight families, nineteen categories, thirty products, seventy-seven
configurations.

| Family | Categories | Products |
| --- | --- | --- |
| High Speed Doors | 3 | 4 |
| Industrial Doors | 2 | 3 |
| Rolling Shutters | 2 | 6 |
| Fire & Safety Doors | 2 | 2 |
| Automatic Gates | 3 | 4 |
| Entrance Automation | 3 | 3 |
| Loading Bay Equipment | 2 | 2 |
| Access Control & Vehicle Barriers | 2 | 6 |

Twenty-six are CONFIRMED — the company published a dedicated page for them and
they were live in its navigation. Four are POTENTIAL and carry a visible
"to be confirmed" marker on the site.

## 3. Products added in the 2026-09-05 review

Two, both published as POTENTIAL:

**Automatic Swing Doors.** A standard pedestrian entrance product published by
both the Indian and global comparators, and a direct adjacency to the
confirmed Automatic Sliding Glass Doors line. It answers a real constraint the
sliding product cannot — openings with no side-run, and existing doorsets
being upgraded rather than replaced.

**Hermetic & Cleanroom Doors.** Supplied by several Indian manufacturers
including a Pune-based comparator, and a direct adjacency to the confirmed
Fire Rated Sliding Doors line, which already serves hospital, clean room and
cold store openings. The site already addresses pharmaceutical, cleanroom and
healthcare industries; without this product that industry page recommends
doors that are not quite the right answer for a classified opening.

Neither is evidenced as a current Standard Automation line. Both are marked
accordingly rather than presented as established products.

## 4. Products rejected, and why

| Product | Reason |
| --- | --- |
| Hangar doors (steel sliding, PVC fabric) | Different structural discipline and installation competence. No adjacency to anything confirmed. |
| Cold storage and freezer room doors | A distinct product class with its own thermal and hardware engineering. The insulated shutters and rigid panel high speed doors serve adjacent needs and the cold chain industry page says plainly where the range stops. |
| Industrial sliding doors as a distinct line | Published by both Indian comparators, but the only sliding product evidenced here is the fire rated door, which is a different thing. Listed as an opportunity. |
| Revolving doors | Core to a specialist competitor's range; no adjacency and significant service burden. |
| Interlocking security portals / mantraps | Top tier of pedestrian security. Requires assurance testing the company cannot currently evidence. |
| Road blockers and tyre killers | Hostile vehicle mitigation is meaningless without crash certification. Publishing them without it would be exactly the kind of claim this project refuses to make. |
| Vehicle restraint systems | Genuine loading bay adjacency, but no evidence of supply. Recorded as an opportunity. |
| Mobile dock ramps, lift tables, scissor lifts, goods lifts | Materials handling equipment, not entrance automation. Different market, different service model. |
| Standalone access control hardware (RFID readers, biometrics, ANPR cameras) | Deliberately **not** a product line. Published instead as integration capability on the products they actually connect to, which is how buyers encounter them. |
| Stainless and galvalume rolling shutters | Two further slat materials published by one comparator. Held pending confirmation that they are supplied. |

## 5. Conflict requiring a business decision

**Motors & Automation.** The master brief lists shutter, gate and door
operators as a family to research and present. The business instructed on
2026-09-04 that the line be removed from the published range, and it was.

The removal has been kept, because it is the more recent and more specific
instruction and reversing it would change the published offering. The full
taxonomy for the ten operator products is preserved in
`product-taxonomy.json` under `withdrawnFromRange`, so restoring it is a data
change rather than a research exercise. The eleven old motor URLs redirect to
the family whose products those drives operate.

**This is the one decision in this round that needs the business, not
research.**

## 6. Variants consolidated, and duplicates avoided

- `high-speed-door.html` and `high-speed-roll-up-door.html` — one product. The
  shared specification table's own Application row read "High Speed Roll Up
  Door".
- `sectional-door.html` and `overhead-sectional-doors.html` — one product, two
  near-identical pages.
- `polycarbonate-rolling-shutters.html` and `polycarbonate.html` — one product.
- `aluminium-rolling-shutters.html` and `aluminium-single-wall.html` — kept as
  one product with single-wall and double-wall configurations, rather than two
  pages differing only by wall count.
- Telescopic and bi-parting automatic doors are configurations of the sliding
  door product, not separate pages. Lift configurations (standard, high,
  vertical, low headroom) are configurations of the sectional door.

No page exists that differs from another only by adjective order, singular or
plural, or regional naming.

## 7. Technical specifications

Field lists follow the characteristics this market declares against:
EN 13241 and its test methods (EN 12424 wind load, EN 12425 water tightness,
EN 12426 air permeability, EN 12428 thermal transmittance), EN 12453 and
EN 12604 for safety in use, EN 16005 for powered pedestrian doorsets, and
EN 1398 for dock levellers including rated capacity and working range.

**1,030 specification fields across 30 products. 127 are answered.**

Every answered value comes from a specification table the company itself
publishes. Every unanswered field renders as "to be confirmed" with its
expected unit. There is no code path that can produce a value from anywhere
but `spec-values.json`, and a test enforces it.

## 8. Specifications requiring business confirmation

903 fields, listed in full in `technical-data-request.csv`. The largest gaps,
and the ones that matter most commercially:

- **Every gate product** — no published figures at all. Leaf weight, travel
  speed and duty rating decide every gate quotation.
- **Every access control product** — no throughput, lane width, power or IP
  figures. These are the first questions a specifier asks.
- **Grille, perforated and insulated shutters** — no slat data.
- **Fire ratings** — no certificate has been supplied for any assembly, so no
  rating is published anywhere on the site.
- **Duty ratings across the board** — the field most likely to cause a
  premature failure when guessed, and unanswered on all thirty products.

## 9. Image sources

Every image is declared in `web/src/data/images.ts` with source, usage status,
product association and alt text; components take an image id, never a path.

- **Unsplash License** (free commercial use, no attribution) — the stand-in
  photography, credited per file in `web/public/images/photography/CREDITS.md`.
  It is not photography of Standard Automation installations, and alt text
  describes only what each photograph actually shows.
- **Company assets** — four genuine images from the company's own published
  material: two photographs and the turnstile, flap barrier and full height
  turnstile catalogue renders.

No competitor photography is used. The legacy asset library was examined and
rejected: its JPEGs are 1400×298 page banners with headings burned into the
pixels, and its PNG thumbnails sit inside a decorative octagonal frame.

**This is the largest outstanding quality gap on the site.**

## 10. SEO keyword opportunities

Primary intent sits on the family pages, which are the natural campaign
landing pages: high speed doors, rolling shutters, sectional doors, automatic
gates, boom barriers, dock levellers, turnstiles.

Secondary intent is strongest where the site now answers a question
competitors leave unanswered — headroom required, duty cycle, what happens in
a power cut, which fire standard applies in India, what a dock leveller's
rated capacity actually refers to. Those are in the FAQ blocks and carry
FAQPage structured data.

Location intent: Pune is the only city with an established basis. City pages
are deliberately absent — thin location pages would be doorway pages.

## 11. Recommended URL structure

```
/products                              families
/products/catalogue                    search and filter across all 30
/products/[family]                     family page
/products/[family]/[product]           product page
/industries/[industry]                 industry page
```

Already implemented. Each family page carries clear commercial intent and can
serve as an advertising landing page without change.

## 12. Content gaps

1. Project and installation references — `/projects` ships empty and noindex.
2. Owned photography.
3. Downloadable brochures and datasheets — every document currently renders as
   in preparation.
4. Client references — named attributions are not published without permission.
5. Service level terms — AMC coverage and response times are agreed per site
   and deliberately not published as a headline.

## 13. Future product opportunities

In rough order of how well each fits what is already confirmed:

1. Industrial sliding doors as a distinct line
2. Cold storage and freezer room doors — would complete the cold chain story
3. Vehicle restraint systems — completes the loading bay assembly
4. Stainless and galvalume rolling shutters
5. Automatic revolving doors — only with a service model behind them
6. High-security bollards and road blockers — only with crash certification

## 14. Quality control status

| Check | Status |
| --- | --- |
| Relevant products included | 30 across 8 families, 19 categories |
| Duplicates removed | 4 merges, documented above |
| Irrelevant competitor products excluded | 10 rejected with reasons |
| Specifications independently structured | Against EN 13241, EN 16005, EN 1398 |
| Invented values | None. 903 fields marked to be confirmed |
| Certifications | None claimed. No fire rating published |
| Content originality | All copy written for this site |
| Unique title, description, canonical, H1 | Verified by test on 12 page types |
| Structured data | Product, CollectionPage, BreadcrumbList, FAQPage, Organization, LocalBusiness |
| Image alt text | Verified by test |
| Conversion paths | Quote, engineer call, WhatsApp, phone, on-page enquiry |
| Responsive | No horizontal overflow at 1024, 1100, 1280, 1440 |
| Automated tests | 254 passing, 0 failing |
