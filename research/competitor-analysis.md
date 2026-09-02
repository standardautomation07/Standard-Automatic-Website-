# Competitor Analysis — Industrial Doors, Gates & Shutters (India)

Researched 2026-09-02 via web search and live inspection of two competitors' public websites (desktop, Chrome). Purpose: extract structural/UX patterns that could inform the Standard Automation rebuild — **not** to copy content, layout, or branding. No content or code from these sites should be reused verbatim.

Search also surfaced (not deeply reviewed): Lokpal Industries (New Delhi), Prabhat Engineering, Hind Automatic Systems — noted here for awareness as other players in the same space, in case the business wants them researched further later.

## Competitor 1: Avians (avians.co.in) — direct local competitor, Pune-based

Same city as Standard Automation, overlapping product range (high speed doors, sliding doors, rolling shutters, entrance gates, loading bay equipment, turnstiles/barriers), positioned as "35+ Years of Excellence" with a large parent-company heritage story (A Mathurbhai & Co., since 1982).

**Patterns worth studying:**
- **Working multi-column mega-menu**, organized by category group with color-coded headers (category in one color, sub-items in another), 2 levels deep, every item a direct link straight to a product/subcategory page — no dead-ends, no JS failures observed.
- **Persistent enquiry widget**: a form pinned to the right edge of the viewport ("Enquiry For Products," with Name/Company/Email/Phone/City/Comment plus a full list of product-category checkboxes) that's reachable from any page without navigating away — effectively a lead-capture form available site-wide, not just on one "Contact" page.
- **Trust-stat counters** on the homepage: "35+ Years of Excellence / 500+ Happy Clients / 1000+ Accomplished Projects / 250+ Total Employees / 50000+ Products Installed."
- **WhatsApp click-to-chat button**, floating bottom-left, on every page.
- Dedicated top-level nav items for **"Customer Support"** and **"Product Tour"** — i.e., post-sale service and a guided product-walkthrough are treated as first-class navigation destinations, not afterthoughts.
- Client testimonial section ("What Our Client's Say") directly on the homepage.

## Competitor 2: Gandhi Automations (geapl.com) — national market leader

Positions itself explicitly as "India's No.1 Entrance Automation & Loading Bay Equipment Company." Larger, more polished, more corporate.

**Patterns worth studying:**
- **Full-bleed hero photography** of real installed projects (an airport hangar door with an aircraft, in the sampled view) rather than generic stock imagery — reinforces scale and real-world credibility.
- **Sticky vertical icon rail** on the right edge (quote request / email / phone / WhatsApp), always visible regardless of scroll position — a lighter-weight alternative to Avians' full embedded form.
- **"Brochures" is a top-level nav item**, on equal footing with "Products," "Support," and "Contact" — i.e., downloadable spec sheets/PDFs are treated as a primary content type and destination, not buried inside product pages. Standard Automation's site currently has **zero** downloadable documents anywhere.
- **Simpler, flatter product dropdown** — a single-level list of ~9 top categories (Hangar Doors, Loading Bay Equipment, High Speed Doors, Cold Storage Doors, Rolling Shutters, Fire Rated Shutters & Doors, Industrial Sliding Doors, Motorised Gates, Commercial Doors, Boom Barriers), each presumably leading to its own category listing page rather than a deep flyout — lower cognitive load than a 3-level mega-menu, at the cost of an extra click to reach a specific product.
- Confident, single-sentence positioning statement in the header itself ("India's No.1...") rather than leaving positioning to a paragraph further down the page.

## Patterns to consider adopting (not copying)

1. **A mega-menu that actually works** — Standard Automation's own menu HTML already has the right category structure (see `proposed-information-architecture.md`); it simply needs to render reliably without a fragile jQuery dependency. Avians shows this is achievable within the same general "hover mega-menu" pattern.
2. **A persistent, low-friction enquiry path** (sticky form or icon rail) rather than requiring a full page navigation to `enquiry.html` — both competitors treat "ask for a quote" as always one click away.
3. **Brochures/spec-sheet PDFs as first-class content**, both for user trust and because PDFs are themselves indexable, linkable assets. Standard Automation currently has none.
4. **Trust-stat counters and testimonials** on the homepage — Standard Automation has an ISO claim but no years-in-business counter, project count, or client quotes, despite having a client-logo page (`clients.html`) that could support this.
5. **WhatsApp click-to-chat** — near-universal in this Indian B2B/industrial segment and absent from Standard Automation today.
6. **A single-level, click-through category dropdown as a fallback pattern** if a full mega-menu proves too heavy for mobile — Gandhi Automations' simpler model is worth having as the mobile-nav pattern even if desktop keeps a richer flyout.

## What NOT to copy

- No content, wording, imagery, layout code, or visual design should be copied from either competitor. This section exists to inform information architecture and UX pattern decisions only, per the audit's explicit "do not copy competitors" instruction.
