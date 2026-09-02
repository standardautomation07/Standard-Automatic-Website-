# UX / Visual Audit — standardautomation.in

Audit date: 2026-09-02. Performed with a real Chromium browser against the live `https://www.standardautomation.in/` domain, both desktop and emulated mobile (375×812) viewports. This is an audit only — nothing on the live site was changed. Screenshots and console logs captured during this session back every claim below.

## 1. Critical, currently-live functional bug: the entire site's primary navigation is broken on HTTPS

**Root cause**: every page hardcodes `<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">` — plain `http://`, not `https://`. Because the site is served over `https://`, every modern browser (Chrome, Firefox, Safari, Edge) blocks this as mixed active content by default. jQuery never loads. Confirmed via console:

```
Mixed Content: The page at 'https://www.standardautomation.in/' was loaded over HTTPS,
but requested an insecure script 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'.
This request has been blocked.
Uncaught ReferenceError: jQuery is not defined  (js/jquery.popup.js:92)
Uncaught ReferenceError: jQuery is not defined  (inline script, homepage)
Uncaught TypeError: $j is not a function
```

Everything downstream of jQuery is consequently broken for every real visitor on every page, today:

- **Desktop "OUR PRODUCTS" mega-menu does not open.** Hovering/clicking the top-nav "OUR PRODUCTS" item produces no dropdown at all — confirmed by direct interaction. A visitor landing on the homepage has no way to browse into any product category from the primary navigation.
- **Mobile hamburger menu does nothing.** On a 375px-wide viewport, tapping the hamburger icon (`data-toggle="collapse"`, a Bootstrap-jQuery interaction) produces no visible change whatsoever — confirmed by clicking it directly. **Mobile visitors — the majority of real-world traffic — cannot open the navigation menu at all.** The only way off the homepage on mobile is the one "SEND ENQUIRY" button and the few hero-carousel links, and those links only fire once the (also broken) carousel is showing the right slide.
- **Homepage carousels render as blank white space.** The OWL Carousel library initializes via jQuery; since jQuery never loads, the "Our Products" and "Hot Products" carousel sections on the homepage never initialize. Their text content exists in the DOM (confirmed via `get_page_text`) but is visually invisible — the section renders as pure white space when scrolled to, no images, no product cards, no links visible. The hero banner carousel itself also gets stuck showing a broken/half-rendered transition frame in some states.
- **The homepage popup script (`jquery.popup.js`) throws immediately on load** and cannot run.

**Net effect**: a real visitor who lands on the homepage (from a Google search, an ad, or typing the URL) cannot browse products at all unless they already know a specific product URL. The one partial mitigation found: a visitor who lands *directly* on a product page (e.g., via a Google result for that specific product) can still cross-navigate using the plain-HTML sidebar category list on the left (`col-lg-3`), which does not depend on JavaScript — but this list is only present on product/category pages, not on the homepage, and doesn't reach the "About Us," "Clients," "Enquiry," or "Contact" links, which live only in the broken top nav.

**This is the single highest-priority fix for any interim patch to the existing site, and the clearest requirement the rebuild must satisfy from day one**: no critical navigation may depend on a script loaded over plain HTTP, or ideally, no critical navigation should depend on jQuery/a mega-menu plugin at all.

## 2. Other desktop findings

- **Hero carousel** shows real project photography (trucks/gates/warehouses) once a slide is fully loaded, which is a genuine visual strength — the underlying photography is decent, professional stock/project imagery rather than clip art.
- **Header** is clean and conventional: logo left, phone/email utility bar above, 2-line dark-blue nav bar. Consistent across every page sampled.
- **Sidebar category list** on product/category pages (Rolling Shutters, Gate, Bollard, Turnstile, Doors, etc.) is plain, static, and — unlike the top nav — actually works, listing all live top-level categories.
- **Content column bug on `sliding-gate.html`** (and likely other pages, not exhaustively checked): the H1 reads "Automatic Sliding Gates" but the body paragraph underneath describes "**Swing Gates**" ("We are involved in the manufacturing and supplying of vast array of surpassing quality **Swing Gates**...") — a copy/paste content error visible to any visitor who actually reads the page, not just an SEO artifact.
- **`about-us.html` contains a self-referential company-name error**: "Standard Automatic Solutions Pvt Ltd is the sister company of **Standard Automatic Solutions Pvt Ltd**" — the company is stated to be its own sister company, clearly a leftover from an earlier company name that was find-and-replaced incompletely.
- **Old brand identity leaking through**: social links point to `facebook.com/Standard-Industries-...` and `twitter.com/Standard_Ind`, and the Google Maps embed on the contact page is tied to a place listing named "Standard Industries" — all inconsistent with the current "Standard Automatic Solutions Pvt Ltd" branding shown in the header/logo.

## 3. Mobile-specific findings

- **Viewport meta tag never sets `width=device-width`** (`content="initial-scale=1, maximum-scale=1"` only). In practice the tested render did lay out at the device width, but this is fragile and non-standard — some mobile browsers will fall back to a ~980px desktop-width viewport without this declaration, and Google's mobile-friendly tooling flags its absence.
- **Pinch-to-zoom is disabled site-wide** (`maximum-scale=1`), an accessibility regression for low-vision users, with no corresponding benefit.
- **Hamburger menu is completely non-functional**, per §1 — the single most severe mobile issue found.
- Hero section, phone/email utility bar, and enquiry CTA all rendered legibly and at a reasonable tap-target size on mobile in the one flow that worked (homepage above the fold).

## 4. Forms

- **Enquiry form** (`enquiry.html`) and **contact form** (`contact.html`) both post to legacy PHP endpoints (`txl_lib/txlsendemail.php`, `kxi-lib/kxisendemail.php`) using inline `onsubmit="return validationN()"` JavaScript validation — another dependency on the same fragile, undocumented custom-JS stack. Field sets are reasonable (name, email, phone, message; the enquiry form appears to additionally support per-category checkboxes based on the field markup). Not functionally exercised end-to-end (submitting a real enquiry against production infrastructure was out of scope for a read-only audit), so **whether these forms currently deliver mail successfully is UNKNOWN** and should be verified operationally before the old form handlers are retired.
- Neither form was observed to have a spam control (no CAPTCHA/honeypot visible in the markup).

## 5. Trust and conversion patterns present today

- ISO 9001:2015 registration claim, stated once on the homepage hero strip.
- A dedicated `clients.html` page with ~20+ client/end-user logos (no attribution text per logo, no case-study links).
- Phone number and email are visible in the header on every page (a good, retained pattern).
- No live chat / WhatsApp click-to-chat widget (competitor pattern, see `competitor-analysis.md`).
- No downloadable brochures, spec sheets, or PDFs found anywhere on the site.
- No customer testimonials, project case studies, or years-in-business statement outside the single "founded 2006" line on About Us.

## 6. Accessibility observations (not a full WCAG audit — see `design:accessibility-review` skill for that)

- 82% of images site-wide have no `alt` text (see SEO audit §2) — a direct screen-reader accessibility failure, not just an SEO gap.
- `maximum-scale=1` in the viewport meta fails WCAG 1.4.4 (Resize Text).
- The breadcrumb and sidebar menu are plain text/links with no ARIA landmarks (`nav`, `aria-current`, etc.).
- Color contrast of the dark-blue nav bar against white text appeared adequate on visual inspection; not measured with a contrast tool.

## 7. Summary of current strengths to preserve

1. Decent, real project/product photography (once actually visible).
2. A working, sensible **content taxonomy** in the sidebar menu and mega-menu HTML (even though the mega-menu doesn't render) — Rolling Shutters / Gates / Bollard / Turnstile / Doors / High Speed Doors / Loading Bay Equipment, plus the currently-orphaned Barriers and Motors & Accessories groups.
3. Consistent header/footer branding and contact information placement.
4. Existing SEO-indexed URLs and, presumably, some existing organic rankings worth preserving via careful 301 redirects (see `url-migration-map.csv`).

## 8. Summary of weaknesses to fix in the rebuild

1. **Primary navigation is completely non-functional on both desktop and mobile** due to a mixed-content/jQuery failure (§1) — the top priority.
2. Duplicate/incorrect H1s and canonical tags (see SEO audit).
3. Content and nav-label mismatches within the Rolling Shutters range (§2, and SEO audit §3).
4. No structured data, no brochures/PDFs, no testimonials/case studies, no live chat.
5. Legacy PHP form handlers with unknown current reliability.
6. Outdated trust signals (dead/renamed social profiles, three conflicting company addresses — see SEO audit §1.9).
