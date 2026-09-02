# Open Business Decisions — Standard Automation Rebuild

This is the master checklist gating content finalization, design sign-off, and launch. Every item was surfaced by the audit (`research/`) or by preparing the six other planning documents in this folder — none are invented concerns. Nothing here should be resolved by guessing; each needs a real answer from the business. Referenced from `FINAL-IA.md`, `CONTENT-MODEL.md`, `SEO-IMPLEMENTATION-PLAN.md`, and `COMPONENT-ARCHITECTURE.md` throughout.

## Blocking — must be resolved before content migration begins

1. **Which company address is current?** Three different, unreconciled addresses were found: the site-wide footer (Kelavade Industrial Estate factory), `contact.html`'s body text (Business Square, Bavdhan office), and the site's only structured-data block (Karve Nagar). Needed for: `company.primaryAddress` (`CONTENT-MODEL.md`), and gates whether `LocalBusiness` schema can ship at all (`SEO-IMPLEMENTATION-PLAN.md` §5).
2. **What is the business's real WhatsApp number, if any?** Not found anywhere in the audit. The brief explicitly forbids inventing it. The `<WhatsAppCTA>` component (`COMPONENT-ARCHITECTURE.md` §5) renders nothing until this is supplied.
3. **Are Boom Barriers and Motors & Accessories still active, sellable product lines?** Both are live on the server but commented out of the current navigation HTML — 12 products total. `FINAL-IA.md` retains them as "pending reinstatement," not removed, per the brief's explicit instruction — but they cannot launch live in the new nav without confirmation either way.
4. **Rolling Shutters naming/duplication** (`FINAL-IA.md` §3): two pairs of pages appear to describe the same two products under different URLs —`aluminium-rolling-shutters.html` ↔ `fire-proof-shutters.html`, and `fire-proof-rolling-shutters.html` ↔ `aluminium-single-wall.html`. This is the audit team's evidence-based hypothesis from comparing each page's own H1/title, not a confirmed fact. Needs the business to confirm: are these duplicates of one product each, or genuinely different products that happen to read similarly?
5. **`g-i-rolling-shutters.html`'s internal contradiction**: its `<title>` says "Galvanize Rolling Shutter" but its `<h1>` says "Insulated Rolling Shutters." Which is it?
6. **The "Doors" category's near-duplicate pair**: `sectional-door.html` ("Overhead Sectional Doors") and `overhead-sectional-doors.html` ("Sectional Overhead Doors") are two separate live URLs with near-identical H1s. One product with a duplicate page, or two distinct products?
7. **The duplicated "High Speed Doors" menu label**: one live menu group sits under "Doors," a second, separate top-level group has the identical name with 4 different children. Merge into one category, or keep as two distinct groups with clearer names?

## Important — needed before launch, not necessarily before design starts

8. **What was `hotels-in-alibaug.html`?** Now a 404, but its filename suggests a past hospitality-sector project — possibly worth recovering as real content for the new Projects section (`FINAL-IA.md` §5), possibly nothing. Needs the business to check whether this content still exists anywhere.
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
