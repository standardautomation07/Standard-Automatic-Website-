# URL Migration Plan — Standard Automation Rebuild

Status: **DRAFT.** This plan refines `research/url-migration-map.csv` (the audit's original 122-row mapping) into final paths matching `FINAL-IA.md`. It does not replace the audit CSV — it is built directly from it programmatically (`scripts/build-final-migration.js`) and every row remains traceable back to it via the `source_audit_row` column. The refined, machine-readable version is `planning/final-redirects.csv` (122 rows, same count as the audit original — every old URL variant still gets exactly one disposition).

## What changed from the audit's original mapping, and why

The original `url-migration-map.csv` correctly identified 61 unique paths but left 6 live, orphaned pages uncategorized (`page_type: orphaned-unclassified`, routed to a placeholder `/products/other/` path) because they weren't linked from the live navigation HTML the audit's category tree was built from. Re-reading each of those 6 pages' own H1 and title (done as part of preparing `FINAL-IA.md`, not a re-crawl) makes their real category unambiguous even though their nav status isn't:

| Old URL | Reclassified as | Confidence |
|---|---|---|
| `m-s-grill-rolling-shutters.html` | Rolling Shutters product | High — distinct real product ("Bright Bar Rolling Shutters"), simply missing from nav |
| `perforated-shutters.html` | Rolling Shutters product | High — distinct real product |
| `sliding-glass-door.html` | Doors product | High — distinct real product |
| `polycarbonate.html` | Rolling Shutters product | Medium — likely superseded by `polycarbonate-rolling-shutters.html`, confirm before merging |
| `aluminium-rolling-shutters.html` | Rolling Shutters product | Medium — likely a duplicate of `fire-proof-shutters.html`, see `FINAL-IA.md` §3 |
| `fire-proof-rolling-shutters.html` | Rolling Shutters product | Medium — likely a duplicate of `aluminium-single-wall.html`, see `FINAL-IA.md` §3 |

This moves the product count in the migration plan from 36 to 42, and reduces the `orphaned-unclassified` bucket to zero — every live page now has a defensible category, even where its final canonical URL is still provisional pending the two "Medium confidence" duplicate-pair confirmations above.

## Redirect rules, in application order

1. **Protocol/host consolidation (site-wide, applied first).** Every `http://` and non-`www` request 301s to the equivalent `https://www.` URL, before any path-specific rule runs. Covers 59 of the 122 rows (every `(protocol/www duplicate)` row in `final-redirects.csv`) in one rule rather than 59 individual entries — fixes `research/seo-audit.md` §1.1.
2. **Path-specific 301s** for every one of the 61 unique canonical old paths, per the table below and the full `final-redirects.csv`.
3. **No redirect for the 5 already-dead URLs** (2 sitemap-listed 404s, 3 unrelated construction-chemical 404s) — see `OPEN-BUSINESS-DECISIONS.md` items 5 and 8 before deciding whether any of these deserve a destination at all.

## Summary by destination pattern

| Old pattern | New pattern | Count |
|---|---|---|
| `/` , `/index.html` | `/` | 1 canonical (+3 protocol dupes) |
| `about-us.html`, `clients.html` | `/about-us/`, `/clients/` | 2 canonical (+2 protocol dupes) |
| `enquiry.html`, `contact.html` | Both → `/contact/` | 2 canonical (+2 protocol dupes) |
| 9 category landers | `/products/<category-folder>/` | 9 canonical (+9 protocol dupes) |
| 42 product pages | `/products/<category-folder>/<product-slug>/` | 42 canonical (+40 protocol dupes — 2 orphaned pages had no separate https duplicate found) |
| 5 dead URLs | No redirect | 5 canonical (+5 protocol dupes, also no redirect) |

## Provisional slugs requiring confirmation before this plan is finalized

- The two Rolling Shutters duplicate pairs (§ above) — final slugs depend on which URL of each pair the business confirms as canonical.
- `g-i-rolling-shutters.html`'s internal title/H1 mismatch (Galvanize vs. Insulated) — affects what its new slug should actually say.
- The "Doors" category's `sectional-door.html` / `overhead-sectional-doors.html` near-duplicate pair (`FINAL-IA.md` §2 caveat).
- Whether the two "High Speed Doors" menu groups merge (affects whether `high-speed-door.html` moves under `/products/doors/` only, or keeps its own top-level category too).

Until these are confirmed, `final-redirects.csv` uses the audit's existing filename-derived slugs as placeholders — **no slug is invented beyond what the old URL already implies.**

## QA process before cutover

1. Implement all rules in `final-redirects.csv` as Next.js `redirects()` (or host-level edge redirects).
2. Re-run a targeted status check against every `old_url` in the file (reusing `scripts/crawl.js`'s request logic, not a fresh discovery crawl) and confirm every one resolves to its intended `new_url` with a single 301 hop.
3. Submit the new sitemap to Search Console and monitor previously-indexed URLs for redirect recognition over the following weeks, per `SEO-IMPLEMENTATION-PLAN.md` §11.
