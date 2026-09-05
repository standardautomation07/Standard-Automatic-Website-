# Product research report — Standard Automatic Solutions Pvt. Ltd.

Internal document. Not published on the website.
Prepared 2026-09-05, covering the market review, the coverage decisions taken
from it, and what still needs the business. Revised the same day to record the
High Speed Doors implementation (section 14).

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

Eight families, twenty-one categories, thirty-three products, eighty-nine
configurations. The High Speed Doors figures below reflect the family rebuild
recorded in section 14.

| Family | Categories | Products |
| --- | --- | --- |
| High Speed Doors | 5 | 7 |
| Industrial Doors | 2 | 3 |
| Rolling Shutters | 2 | 6 |
| Fire & Safety Doors | 2 | 2 |
| Automatic Gates | 3 | 4 |
| Entrance Automation | 3 | 3 |
| Loading Bay Equipment | 2 | 2 |
| Access Control & Vehicle Barriers | 2 | 6 |

Twenty-nine are CONFIRMED and four are POTENTIAL, the latter carrying a
visible "to be confirmed" marker on the site.

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
| Cold storage and freezer room doors (hinged and sliding cold room doors) | Still a distinct product class with its own thermal and hardware engineering, and still not supplied. Note that this is not the high speed cold storage door, which the business issued full parameters for on 2026-09-05 and which is published — see section 14. |
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

**977 specification fields across 33 products. 190 are answered.**

The seven High Speed Doors products account for 112 of those answers and are
the only products whose parameters were issued in full by the business. They
resolve their tables from `web/src/data/product-specs.ts` rather than from the
schema, and are excluded from the collection sheet so an import cannot write a
second, competing copy of them.

Every answered value comes from data the company itself issued or published.
Every unanswered field renders as "to be confirmed" with its expected unit.
Exactly two files can put a figure on this site — `spec-values.json` and
`product-specs.ts` — and a test asserts that every value a page renders is
byte-identical to one of them.

## 8. Specifications requiring business confirmation

783 fields across the 26 products that do not yet have an issued parameter
set, listed in full in `technical-data-request.csv`. The largest gaps,
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

- **Original technical illustrations** — the seven High Speed Doors lead
  images, drawn by us in `web/scripts/build-door-diagrams.mjs`. Our own
  artwork, no third-party rights, and each one depicts the actual mechanism of
  that door type rather than a generic closed door.

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

## 14. High Speed Doors implementation, 2026-09-05

The business issued a complete technical parameter set for seven high speed
door products. That data is the source of truth for the family, and the site
was rebuilt around it the same day.

### What changed

The family went from four products in three categories to seven in five. Three
products are new — Spiral, Cleanroom / Hygiene, and Cold Storage / Freezer.
Four were renamed to singular, descriptive slugs, with permanent redirects from
the old URLs:

| Was | Is now |
| --- | --- |
| `high-speed-roll-up-doors` | `high-speed-roll-up-door` |
| `self-repairing-high-speed-doors` | `high-speed-self-repairing-door` |
| `high-speed-fold-up-doors` | `high-speed-fold-up-door` |
| `high-speed-insulated-panel-doors` | `high-speed-rigid-insulated-door` |

Two categories were added, because the two new mechanisms are genuinely
different operating principles rather than different finishes: Spiral High
Speed Doors, and Controlled Environment High Speed Doors.

### How the issued data is held

`web/src/data/product-specs.ts` holds all 112 issued parameters verbatim,
grouped as Dimensions, Performance, Construction, Drive & control, Safety and
Options. Each row carries a name, value, unit, status and notes. Status is
assigned mechanically from the issued data:

| Status | Rule | Count |
| --- | --- | --- |
| CONFIRMED | Supplied as a fixed value | 74 |
| CONFIGURABLE | Supplied with an asterisk against a figure | 26 |
| TBC | Supplied as application dependent, project specific or configuration dependent | 16 |

The 16 TBC rows keep the issued wording on the page. "Application dependent"
is what the data says, so it is what the table says: the value is not deleted,
and it is not promoted into a number. Four further rows — Drive and Power on
the cleanroom and cold storage doors — are named with no value at all, because
a specifier needs them and nothing was issued to answer them. Those render as
to be confirmed.

Wherever a CONFIGURABLE or TBC row appears, the page carries the note: *Final
specification depends on door dimensions, configuration, operating environment
and project requirements.* Headline figures in the hero carry the same
qualification as a marked footnote.

### The asterisk-without-a-figure case

Seven parameters carry an asterisk in the issued data but give a dependency
statement rather than a number: wind resistance and thermal performance on the
spiral door, wind resistance on the rigid door, and the speeds and dimensions
on the cleanroom and cold storage doors. These are TBC rather than
CONFIGURABLE, because there is no figure for the asterisk to qualify. A test
asserts both halves of that rule, so neither can be quietly reclassified later.

### Deliberately not published

No classification, GMP status, FDA claim or other certification appears against
the cleanroom and hygiene door, because none was supplied. The page says so in
as many words rather than staying silent, and a test scans both the copy and
the specification for ISO, GMP, FDA, cleanroom class and "certified" language
across every product in the family.

No fire rating appears anywhere in this family, and no figure was carried
across from another manufacturer.

### Superseded data

Two entries were removed from `spec-values.json`: the previous roll-up and
insulated-panel figures. They included a 120 km/h rated wind velocity and a
0.80–2.5 m/s opening speed that do not appear in the issued data. Keeping them
would have left two competing answers for the same product. Copy that cited
them, in the family FAQ and the old category guidance, was rewritten.

### Images

Each of the seven products has its own lead image: an original technical
illustration of that specific mechanism, generated by
`web/scripts/build-door-diagrams.mjs` and licensed as our own artwork. A
photograph of a closed industrial door shows nothing about whether the leaf
rolls, folds, releases, spirals or lifts, and the same warehouse photograph on
all seven would have been both uninformative and misleading. Contextual
photography remains in each gallery under the Unsplash License, described only
as what it actually shows.

The illustrations are diagrams, not renders. They do not depict a particular
model, finish or dimension, and nothing in them should be scaled off.

### Content

Fifty-four FAQs, seven to eight per product, written from the questions the
brief identifies and answered without introducing any figure the issued data
does not contain. Forty-five selection rules across the seven, authored per
product because these doors are chosen against one another. Integration and
installation stay at category level, where they are genuinely a property of the
mechanism.

Every product links to at least two siblings, and the family page links back to
every other family.

### Still outstanding for this family

- Drive and supply voltage for the cleanroom and cold storage doors.
- Duty rating, which is unanswered across all seven and is the field most
  likely to cause a premature failure when guessed.
- Owned installation photography, which would let the contextual gallery
  images be replaced with real work.

## 15. Quality control status

| Check | Status |
| --- | --- |
| Relevant products included | 33 across 8 families, 21 categories |
| Duplicates removed | 4 merges, documented above |
| Irrelevant competitor products excluded | 10 rejected with reasons |
| Specifications independently structured | Against EN 13241, EN 16005, EN 1398 |
| Invented values | None. 783 fields marked to be confirmed; 112 issued High Speed Doors parameters reproduced verbatim |
| Certifications | None claimed. No fire rating published |
| Content originality | All copy written for this site |
| Unique title, description, canonical, H1 | Verified by test on 12 page types |
| Structured data | Product, CollectionPage, BreadcrumbList, FAQPage, Organization, LocalBusiness. Values that are only a statement of dependency are excluded from Product schema. |
| Image alt text | Verified by test |
| Conversion paths | Quote, engineer call, WhatsApp, phone, on-page enquiry |
| Responsive | No horizontal overflow at 1024, 1100, 1280, 1440 |
| Automated tests | Result recorded with the commit that ships each change |
