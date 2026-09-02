const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const urls = JSON.parse(fs.readFileSync(path.join(ROOT, 'research', 'urls.json'), 'utf8'));

function slugFromUrl(u) {
  try {
    let p = new URL(u).pathname.replace(/^\/+/, '').replace(/\.html?$/, '');
    return p || 'index';
  } catch (e) { return u; }
}

const catFolder = {
  'Rolling Shutters': 'rolling-shutters',
  'Gates': 'gates',
  'Bollard': 'bollard-turnstile-barriers',
  'Turnstile': 'bollard-turnstile-barriers',
  'Doors': 'doors',
  'High Speed Doors': 'high-speed-doors',
  'Loading bay Equipment': 'loading-bay-equipment',
  'Barriers': 'boom-and-barriers',
  'Motors & Accessories': 'motors-accessories',
};

// Reclassification of the 6 orphaned-unclassified pages, based on reading each
// page's own H1/title (see FINAL-IA.md §3) rather than leaving them uncategorized.
const reclassify = {
  'aluminium-rolling-shutters': { category: 'Rolling Shutters', note: 'PROVISIONAL — likely a duplicate of fire-proof-shutters.html (near-identical H1/title); see FINAL-IA.md §3. Redirect target pending business confirmation of which URL is canonical.' },
  'fire-proof-rolling-shutters': { category: 'Rolling Shutters', note: 'PROVISIONAL — likely a duplicate of aluminium-single-wall.html (near-identical H1/title); see FINAL-IA.md §3. Redirect target pending business confirmation of which URL is canonical.' },
  'polycarbonate': { category: 'Rolling Shutters', note: 'Live but orphaned from nav/sitemap; likely superseded by polycarbonate-rolling-shutters.html — confirm before merging.' },
  'm-s-grill-rolling-shutters': { category: 'Rolling Shutters', note: 'Live but orphaned from nav/sitemap; real distinct product (Bright Bar / MS Grill Rolling Shutters), recommend reinstating in nav.' },
  'perforated-shutters': { category: 'Rolling Shutters', note: 'Live but orphaned from nav/sitemap; real distinct product, recommend reinstating in nav.' },
  'sliding-glass-door': { category: 'Doors', note: 'Live but orphaned from nav/sitemap; real distinct product, recommend reinstating in nav.' },
};

const rows = [];
function csvEsc(s) {
  s = (s === null || s === undefined) ? '' : String(s);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

for (const u of urls) {
  const slug = slugFromUrl(u.currentUrl);
  let newUrl = '', reason = '', redirect = 'Yes', notes = '', sourceRow = u.currentUrl;
  let pageType = u.pageType, category = u.category;

  if (reclassify[slug]) {
    category = reclassify[slug].category;
    pageType = 'product';
    notes = reclassify[slug].note;
  }

  if (pageType === 'dead-404') {
    redirect = 'No'; newUrl = '(none)';
    reason = 'Already 404 on live site — see research/url-migration-map.csv for per-page detail';
  } else if (pageType === 'home') {
    newUrl = '/'; reason = 'Homepage';
  } else if (pageType === 'info') {
    newUrl = '/' + slug + '/'; reason = 'Preserve existing informational URL';
  } else if (pageType === 'transactional') {
    newUrl = '/contact/';
    reason = 'Consolidated: enquiry.html and contact.html both redirect to one shared /contact/ page per FINAL-IA.md §8';
  } else if (pageType === 'category') {
    const folder = catFolder[category] || slug;
    newUrl = '/products/' + folder + '/';
    reason = 'Category landing page under new /products/ path';
    if (u.navLive === false) notes = (notes ? notes + ' ' : '') + 'Currently orphaned (commented out of live nav) — reinstating pending confirmation, per FINAL-IA.md §2.';
  } else if (pageType === 'product') {
    const folder = catFolder[category] || 'other';
    newUrl = '/products/' + folder + '/' + slug + '/';
    reason = 'Product detail page under its category';
    if (u.navLive === false) notes = (notes ? notes + ' ' : '') + 'Currently orphaned (commented out of live nav) — reinstating pending confirmation, per FINAL-IA.md §2.';
  } else {
    newUrl = '/products/other/' + slug + '/';
    reason = 'Live page not present in current nav or sitemap';
    notes = notes || 'Needs category confirmation with business.';
  }

  rows.push({ old_url: u.currentUrl, new_url: newUrl, page_type: pageType, category: category || '', reason, redirect_required: redirect, notes, source_audit_row: sourceRow });

  for (const dup of u.duplicateProtocolOrWwwUrls || []) {
    rows.push({
      old_url: dup, new_url: newUrl, page_type: pageType + ' (protocol/www duplicate)', category: category || '',
      reason: 'Duplicate of ' + u.currentUrl + ' on a different protocol/host',
      redirect_required: 'Yes', notes: 'Collapse via sitewide https://www. redirect rule, see SEO-IMPLEMENTATION-PLAN.md §7', source_audit_row: dup,
    });
  }
}

const header = ['old_url', 'new_url', 'page_type', 'category', 'reason', 'redirect_required', 'notes', 'source_audit_row'];
const csv = [header.join(',')].concat(rows.map(r => header.map(h => csvEsc(r[h])).join(','))).join('\n');
fs.writeFileSync(path.join(ROOT, 'planning', 'final-redirects.csv'), csv, 'utf8');
console.log('rows written:', rows.length);

// Summary for the markdown plan
const summary = {};
rows.forEach(r => { summary[r.page_type] = (summary[r.page_type] || 0) + 1; });
console.log(summary);
