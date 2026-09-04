# Open Business Decisions — Standard Automation Rebuild

This is the master checklist gating content finalization, design sign-off, and launch. Every item was surfaced by the audit (`research/`) or by preparing the six other planning documents in this folder — none are invented concerns. Nothing here should be resolved by guessing; each needs a real answer from the business. Referenced from `FINAL-IA.md`, `CONTENT-MODEL.md`, `SEO-IMPLEMENTATION-PLAN.md`, and `COMPONENT-ARCHITECTURE.md` throughout.

## Resolved by the business (Phase 2 brief)

- **Item 1 (address) — RESOLVED.** Confirmed authoritative address: 215, Business Square, Opp. DSK Ranwara, Bavdhan, Pune 411021, Maharashtra, India. The other two addresses (Kelavade factory, Karve Nagar JSON-LD) are no longer used anywhere in the codebase. `LocalBusiness` schema now ships (`site/src/components/seo/local-business-json-ld.tsx`).
- **Item 2 (WhatsApp) — RESOLVED.** `+91 8888 100 280` confirmed as both the phone and WhatsApp number. Wired into `site/src/lib/site-config.ts`.
- **Item 4 (Rolling Shutters naming/duplication) — RESOLVED.** All four URLs (`aluminium-rolling-shutters.html`, `fire-proof-shutters.html`, `fire-proof-rolling-shutters.html`, `aluminium-single-wall.html`) are confirmed as genuine Rolling Shutter variants and are preserved as four separate product records/URLs rather than merged — see `research/products.json`'s `confirmedVariant` flag and `scripts/add-confirmed-variants.js`. Final product-level mapping (which variant is which exact spec) is still pending, but the URL/identity question is closed.
- **Item 8 (`hotels-in-alibaug.html`) — RESOLVED.** Explicitly and intentionally **retired** by the business, not merely unconfirmed. It must never be redirected anywhere (including the homepage) merely to avoid a 404 — a real 404 is the correct, intended outcome. `planning/final-redirects.csv` and `site/src/data/redirects.json` both reflect this (no entry redirects this URL).

## Blocking — must be resolved before final content sign-off

3. **Are Boom Barriers and Motors & Accessories still active, sellable product lines?** Both are live on the server but commented out of the current navigation HTML — 12 products total. `FINAL-IA.md` retains them as "pending reinstatement," not removed, per the brief's explicit instruction — but they cannot launch live in the new nav without confirmation either way. The site currently displays them with a visible "pending confirmation" badge rather than as verified-active lines.
5. **`g-i-rolling-shutters.html`'s internal contradiction**: its `<title>` says "Galvanize Rolling Shutter" but its `<h1>` says "Insulated Rolling Shutters." Which is it?
6. **The "Doors" category's near-duplicate pair**: `sectional-door.html` ("Overhead Sectional Doors") and `overhead-sectional-doors.html` ("Sectional Overhead Doors") are two separate live URLs with near-identical H1s. One product with a duplicate page, or two distinct products?
7. **The duplicated "High Speed Doors" menu label**: one live menu group sits under "Doors," a second, separate top-level group has the identical name with 4 different children. Merge into one category, or keep as two distinct groups with clearer names?

## Important — needed before launch, not necessarily before design starts
9. **Do the two legacy PHP enquiry/contact forms currently deliver mail reliably?** Not verifiable from a read-only audit. Matters for continuity of lead flow during the migration window.
10. **Hosting/deployment preference** for the rebuilt Next.js site — not yet discussed in this engagement.
11. **CMS approval**: the brief asks to evaluate Sanity; confirm the business is comfortable with Sanity's editing UI and pricing before `CONTENT-MODEL.md` is implemented, or name an alternative.
12. **Existing brand guideline, if one exists** — `DESIGN-SYSTEM.md`'s palette/type recommendations are a starting proposal; if the business already has a logo-derived brand palette or type license, that takes precedence over the proposal.

## Content gaps — not blocking, but must not be filled with invented material

13. **Real certifications, materials, and dimensions** for the many products where the old site publishes none (`CONTENT-MODEL.md`'s `product.certifications`/`materials`/`dimensions` fields) — currently `UNKNOWN`, stays empty on the new site until supplied.
14. **Brochures/datasheets** — zero exist today. `/resources/` (`FINAL-IA.md` §6) and each product's `brochure` field stay empty until real PDFs are produced.
15. **Client names/attribution** for the ~20+ logos on the clients page — currently just images with no per-logo name or relationship text.
16. **Real project/case-study content** for `/projects/` (`FINAL-IA.md` §5) — the section ships empty rather than with fabricated projects if none exists.
17. **FAQ and testimonial content** — both are new content types with zero source material; populate only with real, business-approved material.
18. **Service & Support page content** (`FINAL-IA.md` §7) — the section's proposed *shape* (installation, AMC/maintenance, spares, warranty) is a reasonable guess at structure for this kind of business, but every word of actual copy needs the business to supply it.
19. **Solutions/Industries narrative copy and imagery** (`FINAL-IA.md` §4) — the six industry categories themselves are grounded in real per-product "Applications" data, but the persuasive copy and photography for each industry page is new and needs the business.
20. **Content bug fixes requiring business input, not just a copy edit**: `about-us.html`'s "sister company of itself" line (needs to know the real sister-company name, if any) and `sliding-gate.html`'s body text describing "Swing Gates" under a Sliding Gate heading (needs to know which product that paragraph was actually meant to describe).

## Process gate

Per the master brief: **do not begin the Figma design phase or any production coding until the items in the "Blocking" section above are answered.** The remaining sections can proceed in parallel with early design exploration but must be resolved before their respective content ships.

---

## How the new `web/` build handles each open item

Added when the new website was built (see `web/README.md`). Nothing below
resolves an item — this records how the site behaves while each stays open.

| Item | Handling in the new site |
| --- | --- |
| 3 — Boom Barriers / Motors still active? | Published, each carrying a visible "Awaiting confirmation" badge on the card and a note on the product page. Not hidden. |
| 5 — `g-i-rolling-shutters` title/H1 contradiction | Published as **Insulated Rolling Shutters** with a rendered `namingNote` stating the contradiction. |
| 6 — `sectional-door` vs `overhead-sectional-doors` | Merged into one product (**Overhead Sectional Doors**); both old URLs 301 to it. Split them back out if they are genuinely different. |
| 7 — duplicated "High Speed Doors" group | Group removed; all high speed products sit under **Industrial Doors**. `high-speed-door.html` and `high-speed-roll-up-door.html` merged (identical spec tables) and both redirect to **High Speed Roll Up Doors**. |
| 4 (follow-on) — shutter variant naming | `aluminium-single-wall.html` and `fire-proof-shutters.html` are published under working names with a rendered caveat, since each page's heading contradicts its own URL. |
| 9/10 — enquiry delivery + hosting | Server-side endpoint implemented and validated; with no provider configured it records the enquiry and the UI says delivery is not connected. See `web/src/lib/enquiry.ts`. |
| 11 — CMS | Not implemented. Content is typed TypeScript data under `web/src/data/`, which a CMS can back later without changing the page components. |
| 12 — brand palette | A new palette was designed (graphite / off-white / steel / amber). If a real brand guideline exists it takes precedence. |
| 13 — certifications, materials, dimensions | Only published where the business already publishes them. Products without them show a "specifications on request" panel. |
| 14 — brochures | `/resources` gives specification guidance and states that literature is in preparation. No fake download buttons. |
| 15 — client names | Logos shown without invented names, under an explicit note that references are being confirmed. |
| 16 — projects | `/projects` ships empty, `noindex`, and excluded from the sitemap. |
| 17 — FAQ / testimonials | Not built. No FAQ schema, no reviews, no ratings. |
| 18 — service & support | Folded into the About page's "Survey, specify, install, support" section, describing process rather than claiming service levels. |
| 19 — industries copy | `/industries` describes the constraint each sector has and links to grounded product recommendations. It makes no claim about work delivered. |
| 20 — "sister company of itself" / wrong body copy | Not carried over. All product and about copy on the new site is newly written. |
| 8 — `hotels-in-alibaug.html` | Still absent from the redirect map; a Playwright test asserts it 404s. |
