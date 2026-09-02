// Adds the 2 previously-orphaned Rolling Shutter pages the business confirmed
// as real product variants (see planning/OPEN-BUSINESS-DECISIONS.md item 4,
// resolved by the client's build-approval brief section 3) to products.json.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function stripTags(s) {
  return s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/<[^>]+>/g, ' ').replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n\n').trim();
}
function extractMainRegion(html) {
  let start = html.indexOf('<div class="col-lg-9">');
  if (start === -1) start = html.indexOf('<div class="about-inr">');
  let end = html.indexOf('class="footer"');
  if (start === -1 || end === -1 || end <= start) return null;
  return html.slice(start, end);
}
function extractSections(region) {
  const h1 = (region.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [, ''])[1];
  const parts = region.split(/(<h[13][^>]*>[\s\S]*?<\/h[13]>)/i);
  const sections = []; let currentHeading = null;
  for (const part of parts) {
    const hm = part.match(/^<h([13])[^>]*>([\s\S]*?)<\/h\1>$/i);
    if (hm) currentHeading = stripTags(hm[2]);
    else if (currentHeading !== null && part.trim()) { sections.push({ heading: currentHeading, text: stripTags(part) }); currentHeading = null; }
  }
  const tables = [...region.matchAll(/<table[\s\S]*?<\/table>/gi)].map(m => {
    return [...m[0].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map(r =>
      [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map(c => stripTags(c[1])));
  });
  const listItems = [...region.matchAll(/<li>([\s\S]*?)<\/li>/gi)].map(m => stripTags(m[1])).filter(Boolean);
  return { h1: stripTags(h1), sections, tables, listItems };
}
function imagesInRegion(region, pageUrl) {
  return [...region.matchAll(/<img[^>]+>/gi)].map(m => {
    const tag = m[0];
    const src = (tag.match(/src=["']([^"']+)["']/i) || [, null])[1];
    const alt = (tag.match(/alt=["']([^"']*)["']/i) || [, null])[1] || '';
    if (!src) return null;
    let abs = src; try { abs = new URL(src, pageUrl).toString(); } catch (e) {}
    return { src, absoluteUrl: abs, alt };
  }).filter(Boolean);
}
function extractBannerImage(html, pageUrl) {
  const m = html.match(/<div class="banner">([\s\S]*?)<\/div>/i);
  if (!m) return null;
  const imgs = imagesInRegion(m[1], pageUrl);
  return imgs[0] || null;
}

const targets = [
  { file: 'aluminium-rolling-shutters.html', url: 'https://www.standardautomation.in/aluminium-rolling-shutters.html', category: 'Rolling Shutters', note: 'Confirmed by business (build-approval brief, 2026) as a genuine Rolling Shutters variant, alongside fire-proof-shutters.html, fire-proof-rolling-shutters.html, and aluminium-single-wall.html. All 4 URLs preserved rather than merged.', confirmedVariant: true },
  { file: 'fire-proof-rolling-shutters.html', url: 'https://www.standardautomation.in/fire-proof-rolling-shutters.html', category: 'Rolling Shutters', note: 'Confirmed by business (build-approval brief, 2026) as a genuine Rolling Shutters variant, alongside aluminium-rolling-shutters.html, fire-proof-shutters.html, and aluminium-single-wall.html. All 4 URLs preserved rather than merged.', confirmedVariant: true },
  { file: 'm-s-grill-rolling-shutters.html', url: 'https://www.standardautomation.in/m-s-grill-rolling-shutters.html', category: 'Rolling Shutters', note: 'Live on the server but orphaned from current nav/sitemap (research/urls.json). Real, distinct product content. Reinstatement in nav pending business confirmation.', confirmedVariant: false },
  { file: 'perforated-shutters.html', url: 'https://www.standardautomation.in/perforated-shutters.html', category: 'Rolling Shutters', note: 'Live on the server but orphaned from current nav/sitemap. Real, distinct product content. Reinstatement in nav pending business confirmation.', confirmedVariant: false },
  { file: 'polycarbonate.html', url: 'https://www.standardautomation.in/polycarbonate.html', category: 'Rolling Shutters', note: 'Live on the server but orphaned from current nav/sitemap; likely superseded by polycarbonate-rolling-shutters.html — kept as a separate entry pending business confirmation rather than merged.', confirmedVariant: false },
  { file: 'sliding-glass-door.html', url: 'https://www.standardautomation.in/sliding-glass-door.html', category: 'Doors', note: 'Live on the server but orphaned from current nav/sitemap. Real, distinct product content. Reinstatement in nav pending business confirmation.', confirmedVariant: false },
  { file: 'bollard.html', url: 'https://www.standardautomation.in/bollard.html', category: 'Turnstile', note: 'Bollard is a live top-level nav category with no sub-products of its own; added here as a product record so its real content renders under the Bollards/Turnstiles/Barriers grouping.', confirmedVariant: false, skipIfExists: true },
];

const productsPath = path.join(ROOT, 'research', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

for (const t of targets) {
  if (products.some(p => p.currentUrl === t.url)) { console.log('Skip (already present):', t.url); continue; }
  const html = fs.readFileSync(path.join(ROOT, 'legacy', 'content', 'raw', t.file), 'utf8');
  const region = extractMainRegion(html);
  const extracted = extractSections(region);
  const banner = extractBannerImage(html, t.url);
  products.push({
    productName: extracted.h1,
    navLabel: null,
    category: t.category,
    subcategory: null,
    currentUrl: t.url,
    navLiveInCurrentMenu: false,
    shortDescription: (extracted.sections[0] && extracted.sections[0].text) || null,
    fullDescriptionSections: extracted.sections,
    specTables: extracted.tables,
    applicationsOrFeatureBullets: extracted.listItems,
    images: (banner ? [{ ...banner, role: 'banner' }] : []).concat(imagesInRegion(region, t.url)),
    materials: 'UNKNOWN',
    dimensions: 'UNKNOWN',
    certifications: 'UNKNOWN',
    brochuresOrDatasheets: 'UNKNOWN',
    relatedProducts: [],
    confirmedVariant: t.confirmedVariant,
    confirmationNote: t.note,
  });
  console.log('Added:', extracted.h1, '<-', t.url);
}

// Also annotate the 2 already-present confirmed Rolling Shutter variants for traceability
for (const p of products) {
  if (['https://www.standardautomation.in/fire-proof-shutters.html', 'https://www.standardautomation.in/aluminium-single-wall.html'].includes(p.currentUrl)) {
    p.confirmedVariant = true;
    p.confirmationNote = 'Confirmed by business (build-approval brief, 2026) as a genuine Rolling Shutters variant, alongside aluminium-rolling-shutters.html and fire-proof-rolling-shutters.html. All 4 URLs preserved rather than merged.';
  }
}

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
console.log('Total products now:', products.length);
