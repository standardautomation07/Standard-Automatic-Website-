# Proposed Information Architecture — standardautomation.in Rebuild

Based entirely on the actual existing product range recovered from the live site's navigation HTML and sitemap (see `research/urls.json`, `research/products.json`, `scripts/nav-tree.json`). No product, category, or capability has been invented. Two categories below (Barriers, Motors & Accessories) exist on the server today but are commented out of the current live navigation — they are included here as **recommended for reinstatement**, flagged clearly, pending business confirmation that these product lines are still active/sellable (mark current status as UNKNOWN until confirmed).

## Primary navigation (proposed)

1. **Home**
2. **About Us**
3. **Products** (mega-menu / mega-dropdown — see category tree below)
4. **Brochures** *(new — recommended, see competitor-analysis.md; only add once real PDF assets exist)*
5. **Projects / Clients** *(rename of current "Clients" page; recommend expanding with project case studies if the business has them — otherwise keep as a logo wall, do not invent projects)*
6. **Enquiry / Get a Quote**
7. **Contact Us**

## Product category tree (grounded in the actual live + orphaned nav data)

```
Products
├── Rolling Shutters
│   ├── Galvanized Rolling Shutters       (currently m-s-rolling-shutters.html)
│   ├── Aluminium Rolling Shutters        (URL/label mismatch on live site — needs business confirmation, see seo-audit.md §3)
│   ├── Insulated / GI Rolling Shutters   (currently g-i-rolling-shutters.html)
│   ├── Fire Shutters                     (currently aluminium-single-wall.html — URL/label mismatch, needs confirmation)
│   ├── Polycarbonate Rolling Shutters
│   ├── MS Grill Rolling Shutters         (live but currently orphaned from nav)
│   └── Perforated Shutters               (live but currently orphaned from nav)
├── Gates
│   ├── Sliding Gate
│   ├── Swing Gate
│   ├── Telescopic Gate
│   └── Retractable Gates
├── Doors
│   ├── High Speed Doors
│   ├── Overhead Sectional Doors
│   ├── Fire Sliding Door
│   ├── Garage Doors
│   ├── Residential Garage Door
│   ├── Sectional Doors
│   └── Sliding Glass Door                (live but currently orphaned from nav)
├── High Speed Doors (detail range)
│   ├── High Speed Roll Up Doors
│   ├── High Speed Fold Up Doors
│   ├── High Speed Self Repairing Doors
│   └── High Speed Industrial Door
│   NOTE: the live site has two separate top-level menu entries both literally
│   labeled "High Speed Doors" (one under Doors, one standalone). Recommend
│   merging into one "High Speed Doors" category with the two current groups
│   as subgroups, pending business input on whether they were meant to be distinct.
├── Bollard, Turnstile & Barriers
│   ├── Bollard
│   ├── Turnstile
│   ├── Tripod Turnstile
│   ├── Flap Barrier
│   └── Full Height Barrier
├── Boom Barriers & Barriers *(RECOMMEND REINSTATING — currently orphaned/commented out of live nav)*
│   ├── Boom Barriers
│   └── Retractable Barriers
├── Loading Bay Equipment
│   ├── Dock House
│   └── Dock Levellers
└── Motors & Accessories *(RECOMMEND REINSTATING — currently orphaned/commented out of live nav)*
    ├── Tubular Motor
    ├── Australian Type Motor
    ├── Central Motor
    ├── Side Motor (with Chain)
    ├── Side Motor with Gear Drive
    ├── Sliding Gate Motor
    ├── Swing Gate Motor
    ├── Industrial Sliding Gate Motor
    ├── Sliding Glass Door Motor
    └── Sectional Door Motor
```

**Before finalizing URLs for this tree**, the business must confirm:
1. Which physical product the "Aluminium Rolling Shutters" and "Fire Shutters" nav labels actually refer to, given the current URL/label mismatch (see `seo-audit.md` §3).
2. Whether Barriers and Motors & Accessories are still active product lines (they were removed from the live menu at some point, cause unknown/UNKNOWN) or were intentionally discontinued.
3. Whether the two "High Speed Doors" menu entries were meant to be one category or genuinely two distinct offerings.

## Solutions / Applications structure (recommended addition)

The current site organizes everything strictly by product type. Nothing here should be invented, but if the business can supply real vertical/use-case information (e.g., "solutions for warehouses," "solutions for hotels," "solutions for factories" — note `hotels-in-alibaug.html` existed at some point and 404s today, suggesting a hospitality vertical may have existed), an **Applications/Solutions** section cross-linking existing products by industry would be a valuable IA addition once real content exists. Mark as a recommendation only, not to be built with placeholder content.

## Resources (recommended addition)

- Brochures/spec-sheet PDFs, once produced (see `technical architecture recommendation` in `MASTER-AUDIT.md`).
- FAQ page — none exists today; recommend building only from real, business-confirmed Q&A, not invented content.

## Contact/Enquiry structure

- Keep a single, canonical company address once confirmed (see `seo-audit.md` §1.9 — currently 3 conflicting addresses exist and must be reconciled with the business before the rebuild ships).
- Replace the current two separate legacy-PHP forms (`enquiry.html`, `contact.html`) with one consistent enquiry form component, reusable as both a full page and an embedded/sticky widget (see `competitor-analysis.md`).
