// Builds site/src/data/catalog.json - the single typed data source the Next.js
// app reads from. Derived entirely from research/products.json + research/urls.json
// + the downloaded legacy images; nothing invented. Slugs match the ones
// already committed to in planning/final-redirects.csv (old filename, no extension).
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, 'site');

const products = JSON.parse(fs.readFileSync(path.join(ROOT, 'research', 'products.json'), 'utf8'));
const urls = JSON.parse(fs.readFileSync(path.join(ROOT, 'research', 'urls.json'), 'utf8'));

function slugOf(u) {
  try {
    const p = new URL(u).pathname.replace(/^\/+/, '').replace(/\.html?$/, '');
    return p || 'index';
  } catch (e) { return u; }
}
function localImage(absoluteUrl) {
  if (!absoluteUrl) return null;
  const fname = absoluteUrl.split('/').pop().split('?')[0];
  const p = path.join(SITE, 'public', 'images', 'legacy', fname);
  return fs.existsSync(p) ? '/images/legacy/' + fname : null;
}

// Category definitions: slug, display name, legacy landing URL, status.
// "pending-confirmation" categories are per planning/OPEN-BUSINESS-DECISIONS.md
// items 3 (Boom Barriers / Motors & Accessories) - real, live pages, just not
// presented as verified-active product lines until the business confirms.
const CATEGORY_DEFS = [
  { slug: 'rolling-shutters', name: 'Rolling Shutters', legacyUrl: 'https://www.standardautomation.in/rolling-shutters.html', status: 'active', matches: ['Rolling Shutters'] },
  { slug: 'gates', name: 'Gates', legacyUrl: 'https://www.standardautomation.in/automatic-gates.html', status: 'active', matches: ['Gates'] },
  { slug: 'bollard-turnstile-barriers', name: 'Bollards, Turnstiles & Barriers', legacyUrl: 'https://www.standardautomation.in/turnstile.html', status: 'active', matches: ['Turnstile', 'Bollard'] },
  { slug: 'doors', name: 'Doors', legacyUrl: 'https://www.standardautomation.in/automatic-doors.html', status: 'active', matches: ['Doors'] },
  { slug: 'high-speed-doors', name: 'High Speed Doors', legacyUrl: 'https://www.standardautomation.in/high-speed-roll-up.html', status: 'active', matches: ['High Speed Doors'] },
  { slug: 'loading-bay-equipment', name: 'Loading Bay Equipment', legacyUrl: 'https://www.standardautomation.in/loading-bay-equipment.html', status: 'active', matches: ['Loading bay Equipment'] },
  { slug: 'boom-and-barriers', name: 'Boom Barriers & Barriers', legacyUrl: 'https://www.standardautomation.in/automatic-barriers.html', status: 'pending-confirmation', matches: ['Barriers'] },
  { slug: 'motors-accessories', name: 'Motors & Accessories', legacyUrl: 'https://www.standardautomation.in/motors-accessories.html', status: 'pending-confirmation', matches: ['Motors & Accessories'] },
];

function findByUrl(u) { return urls.find(x => x.currentUrl === u) || urls.find(x => x.currentUrl.replace('https://www.', 'http://www.') === u); }

// --- Products ---
const outProducts = products.map(p => {
  const slug = slugOf(p.currentUrl);
  const catDef = CATEGORY_DEFS.find(c => c.matches.includes(p.category));
  const images = (p.images || [])
    .map(im => ({ src: localImage(im.absoluteUrl), alt: im.alt || null }))
    .filter(im => im.src);
  // specifications: flatten the first spec table (if any) into label/value rows
  let specifications = [];
  if (p.specTables && p.specTables.length) {
    const table = p.specTables[0];
    for (const row of table) {
      for (let i = 0; i < row.length - 1; i += 2) {
        if (row[i] && row[i + 1]) specifications.push({ label: row[i], value: row[i + 1] });
      }
    }
  }
  const features = (p.fullDescriptionSections || []).find(s => /feature/i.test(s.heading));
  const applications = (p.applicationsOrFeatureBullets || []).filter(li => li.length < 80);
  return {
    slug,
    name: p.productName,
    categorySlug: catDef ? catDef.slug : 'other',
    legacyUrl: p.currentUrl,
    navLive: !!p.navLiveInCurrentMenu,
    confirmedVariant: !!p.confirmedVariant,
    confirmationNote: p.confirmationNote || null,
    shortDescription: p.shortDescription || null,
    sections: (p.fullDescriptionSections || []).filter(s => !/^our products$/i.test(s.heading)),
    featuresText: features ? features.text : null,
    specifications,
    applications,
    images,
    materials: p.materials && p.materials !== 'UNKNOWN' ? p.materials : null,
    dimensions: p.dimensions && p.dimensions !== 'UNKNOWN' ? p.dimensions : null,
    certifications: p.certifications && p.certifications !== 'UNKNOWN' ? p.certifications : null,
  };
});

// related products: same category, excluding self, capped at 4
for (const p of outProducts) {
  p.relatedSlugs = outProducts.filter(o => o.categorySlug === p.categorySlug && o.slug !== p.slug).slice(0, 4).map(o => o.slug);
}

// --- Categories ---
const outCategories = CATEGORY_DEFS.map(def => {
  const catUrlRecord = findByUrl(def.legacyUrl);
  const heroImage = catUrlRecord ? null : null;
  const prods = outProducts.filter(p => p.categorySlug === def.slug);
  // pull a hero image from images.json role-tagged banners for this category page
  return {
    slug: def.slug,
    name: def.name,
    status: def.status,
    legacyUrl: def.legacyUrl,
    seoTitle: catUrlRecord ? catUrlRecord.title : null,
    seoDescription: catUrlRecord ? catUrlRecord.metaDescription : null,
    h1: catUrlRecord ? catUrlRecord.h1 : def.name,
    productSlugs: prods.map(p => p.slug),
  };
});

// resolve category hero images from the images.json banner set (built earlier)
const images = JSON.parse(fs.readFileSync(path.join(ROOT, 'research', 'images.json'), 'utf8'));
for (const cat of outCategories) {
  const rec = images.find(i => i.page === cat.legacyUrl && i.role);
  cat.heroImage = rec ? localImage(rec.imageUrl) : (outProducts.find(p => p.categorySlug === cat.slug)?.images[0]?.src || null);
}

fs.mkdirSync(path.join(SITE, 'src', 'data'), { recursive: true });
fs.writeFileSync(path.join(SITE, 'src', 'data', 'catalog.json'), JSON.stringify({ categories: outCategories, products: outProducts }, null, 2));
console.log('categories:', outCategories.length, 'products:', outProducts.length);
console.log('products with no matched category:', outProducts.filter(p => p.categorySlug === 'other').map(p => p.name));
console.log('products with at least 1 local image:', outProducts.filter(p => p.images.length > 0).length, '/', outProducts.length);
