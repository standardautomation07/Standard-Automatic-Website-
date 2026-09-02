# Design System Brief — Standard Automation Rebuild

Status: **DRAFT — this is a brief for the Figma design phase, not final pixels.** High-fidelity design happens in Figma per the master brief; this document is the token system and component spec that phase should start from, so the visual language is decided deliberately once rather than improvised page-by-page (part of how the old site drifted — see `research/seo-audit.md` for the label/URL/brand drift this caused).

## 1. Brand personality → design translation

The brief asks for *industrial, engineering, reliable, premium, technically competent, modern, trustworthy* — and explicitly rejects generic SaaS gradients, excessive rounding, and stock-looking treatment. Translation:

- **Industrial/engineering** → materials and precision as the visual vocabulary: galvanized steel's cool grey-blue sheen, technical-drawing grid lines, tabular alignment for specs, a confident condensed/expanded display face rather than a soft rounded one.
- **Premium** → restraint. One accent color, used with intention (primarily calls-to-action), not a rainbow of badge colors. Generous whitespace around real product photography rather than dense stock-photo collage.
- **Trustworthy** → real photography, real numbers (only verified ones — see `OPEN-BUSINESS-DECISIONS.md`), visible technical detail (spec tables, not vague marketing adjectives).
- **Modern** → a 2026 web build (fast, accessible, responsive) expressed through typographic confidence and layout precision — not through gradients or glassmorphism, which read as generic-SaaS rather than modern-industrial.

## 2. Color system

Named tokens, not raw hex scattered through code. Values below are a starting palette for Figma exploration, not final brand color — final swatches should be checked against any existing brand guideline the business may have (**UNKNOWN — ask**, see `OPEN-BUSINESS-DECISIONS.md`).

| Token | Light value | Dark value | Use |
|---|---|---|---|
| `--surface-base` | `#EEF0F1` (galvanized-steel grey, cool not warm) | `#14181B` (graphite) | Page background |
| `--surface-raised` | `#FFFFFF` | `#1D2226` | Cards, product panels |
| `--surface-sunken` | `#E1E5E7` | `#232A2F` | Table headers, sidebar |
| `--ink` | `#14181B` | `#E8ECEE` | Primary text |
| `--ink-muted` | `#54626B` | `#9AACB4` | Secondary text, captions |
| `--border` | `#CDD6DA` | `#303A40` | Dividers, table lines |
| `--brand-steel` | `#1F5C82` | `#6EB1D6` | Links, secondary UI, icons — the "engineering blueprint" association |
| `--brand-signal` | `#C4650F` | `#E08B3E` | **Single accent** — primary CTA (enquiry, WhatsApp, "get a quote") only. Drawn from industrial safety-amber, desaturated toward premium rather than hazard-neon |
| `--state-success` | `#2C7A4F` | `#71C494` | Form success, in-stock/available status |
| `--state-error` | `#B5372B` | `#E38678` | Form errors |

**Explicitly avoided**: purple/blue gradient heroes, warm-cream-plus-terracotta (the current AI-design cliché combination), neon acid accents on near-black, pastel SaaS palettes. The single accent color rule matters most — every additional "brand color" dilutes the premium/restrained feel the brief asks for.

## 3. Typography

Two-role pairing plus a data face, deliberately not the Inter/Space-Grotesk default:

- **Display / headings — Big Shoulders Display.** A condensed, high-contrast face literally modeled on industrial ironwork and structural-steel signage — a direct, non-generic fit for a company that manufactures steel doors, gates, and shutters. Use at 600–800 weight for H1/H2, restrained tracking.
- **Body — IBM Plex Sans.** Designed for technical/engineering readability, pairs naturally with the display face's industrial register without competing with it, and holds up well in dense spec-sheet contexts. Regular/medium weights for running text; keep line length near 65–75 characters.
- **Data / specifications — IBM Plex Mono.** Every technical specification table, part number, dimension, and the enquiry form's reference/confirmation numbers use the mono face with `font-variant-numeric: tabular-nums` — reinforces "technically competent" and makes spec tables genuinely scannable, the way the old site's plain HTML tables (e.g. Galvanized Rolling Shutters, `research/products.json`) were not.

Type scale (rem, 16px base): 3.5 / 2.5 / 1.75 / 1.25 / 1.125 / 1 / 0.875 / 0.75 — display sizes get `text-wrap: balance`.

## 4. Layout & grid

- 12-column responsive grid, 24px gutter desktop / 16px mobile.
- Mobile-first: every component is designed at 375px first, then expanded — not shrunk from a desktop comp, per the brief.
- Product/category pages: a persistent left-rail category navigator on desktop (reviving the one part of the old site's navigation that actually worked without JavaScript — the plain sidebar list — as a deliberate, modernized pattern) collapsing to an in-page filter/accordion on mobile.
- Spec tables and galleries get their own `overflow-x: auto` container; the page body never scrolls horizontally.

## 5. Core components (spec for Figma)

- **Header & mega-menu**: sticky header, logo left, primary nav center/right, a single persistent "Get a Quote" button in `--brand-signal` at all times. Mega-menu is a full-width panel organized by category exactly as in `FINAL-IA.md` §2 — grouped visually by category with clear typographic hierarchy (category name in Big Shoulders, product names in Plex Sans), not a flat alphabetical list. **Must render and be fully operable with zero JavaScript for the disclosure itself** (see `COMPONENT-ARCHITECTURE.md`) — this is the direct fix for the audit's #1 finding.
- **Mobile nav**: independently designed, not a shrunk desktop menu — a full-screen slide-in panel with the same category grouping, large tap targets (min 44×44px), and its own open/close affordance that works without relying on Bootstrap's JS collapse pattern.
- **Product card**: image, name, category tag, one-line overview, "View details" — used in category grids and "Featured products" on the homepage.
- **Spec table**: label/value rows in Plex Mono, zebra-free (a single hairline `--border` between rows), renders only the rows that have real data (no "N/A" filler rows for `UNKNOWN` fields — the row simply doesn't exist, per `CONTENT-MODEL.md`).
- **Sticky enquiry / WhatsApp**: a slim, persistent element (not a full-screen takeover) — a collapsed icon rail on desktop that expands to the shared enquiry form, and a single WhatsApp FAB on mobile, non-intrusive per the brief. WhatsApp number renders only once confirmed (`OPEN-BUSINESS-DECISIONS.md` item 2) — the component must support a "not yet configured" state that simply doesn't render, not a placeholder number.
- **Breadcrumb**: `Home / Category / Product`, semantic `<nav aria-label="breadcrumb">`, paired with real `BreadcrumbList` JSON-LD (see `SEO-IMPLEMENTATION-PLAN.md`) — directly fixes the old site's plain-text-only breadcrumb.
- **Trust strip**: ISO 9001:2015 badge, founded-year, and any further verified stats — every number here must be sourced from `OPEN-BUSINESS-DECISIONS.md`-confirmed facts, never estimated for effect.

## 6. Motion

Minimal and purposeful, per the brief's explicit "avoid excessive animation": a single orchestrated entrance for the hero (image/heading reveal on load), subtle hover states on cards and nav items, and a smooth (not bouncy) mega-menu/mobile-nav open/close transition. Respect `prefers-reduced-motion` throughout — disable non-essential transitions for users who request it.

## 7. Accessibility baked into the tokens

- All text/background pairs above target WCAG AA contrast (4.5:1 body, 3:1 large text) in both themes — verify in Figma with the final chosen values, not just this draft palette.
- Every interactive element gets a visible focus ring using `--brand-steel` at 2px offset — never `outline: none` without a replacement, which the old site's custom CSS never defined at all.
- Viewport meta ships as `width=device-width, initial-scale=1` with **no** `maximum-scale` lock — directly reverses the old site's pinch-zoom-disabling bug.

## 8. What this design must NOT look like

Per the brief, explicitly checked against during Figma review:
- Not the old Bootstrap site (no OWL-carousel-style blank sections, no jQuery-dependent mega-menu).
- Not a generic AI-generated template (no warm-cream+terracotta, no purple-gradient hero, no `rounded-lg`-everywhere card style, no Inter-default typography).
- Not a clone of Avians or Gandhi Automations (`research/competitor-analysis.md`) — their *patterns* (working mega-menu, sticky enquiry, brochures as first-class content) inform structure, not their visual identity.
