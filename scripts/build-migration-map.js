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

const rows = [];
function csvEsc(s) {
  s = (s === null || s === undefined) ? '' : String(s);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

for (const u of urls) {
  const slug = slugFromUrl(u.currentUrl);
  let newUrl = '', reason = '', redirect = 'Yes', notes = '';

  if (u.pageType === 'dead-404') {
    redirect = 'No';
    if (slug === 'hotels-in-alibaug') {
      newUrl = '(none)';
      reason = 'Already 404; possibly a past hospitality-sector case study/project page';
      notes = 'UNKNOWN — confirm with business whether this content ever existed/should be recreated as a project case study, or safely ignored.';
    } else if (slug === 'sitemap') {
      newUrl = '(none)';
      reason = 'Legacy human-readable HTML sitemap, superseded by XML sitemap + real nav';
      notes = 'No replacement needed in a modern site.';
    } else {
      newUrl = '(none)';
      reason = 'Already 404; content (tile adhesive / epoxy grout / construction chemicals) is unrelated to the doors/gates/shutters product range';
      notes = 'UNKNOWN — appears to be leftover from a different business or shared template, not part of Standard Automation’s product line. Confirm with business before any action; do not recreate without confirmation.';
    }
  } else if (u.pageType === 'home') {
    newUrl = '/';
    reason = 'Homepage, keep at root';
  } else if (u.pageType === 'info') {
    newUrl = '/' + slug + '/';
    reason = 'Preserve existing informational URL, add trailing slash for consistency';
  } else if (u.pageType === 'transactional') {
    newUrl = '/' + slug + '/';
    reason = 'Preserve existing URL';
    if (slug === 'enquiry') notes = 'Recommend consolidating enquiry.html and contact.html forms into one shared component (see proposed-information-architecture.md), but each URL should still resolve/redirect sensibly.';
  } else if (u.pageType === 'category') {
    const folder = catFolder[u.category] || slug;
    newUrl = '/products/' + folder + '/';
    reason = 'Category landing page, grouped under new /products/ path per proposed IA';
    if (u.navLive === false) notes = 'Currently orphaned (commented out of live nav) — reinstating pending business confirmation the product line is still active.';
  } else if (u.pageType === 'product') {
    const folder = catFolder[u.category] || 'other';
    newUrl = '/products/' + folder + '/' + slug + '/';
    reason = 'Product detail page, nested under its category per proposed IA';
    if (u.navLive === false) notes = 'Currently orphaned (commented out of live nav) — reinstating pending business confirmation the product line is still active.';
    if (['aluminium-rolling-shutters', 'fire-proof-shutters', 'fire-proof-rolling-shutters', 'aluminium-single-wall'].includes(slug)) {
      notes = (notes ? notes + ' ' : '') + 'URL/label/title mismatch found on live site (see seo-audit.md §3) — final slug must be confirmed with business before redirecting, current mapping is a placeholder.';
    }
  } else {
    // orphaned-unclassified live pages
    newUrl = '/products/other/' + slug + '/';
    reason = 'Live page not present in current nav or sitemap; needs a home in the new IA';
    notes = 'Confirm correct category with business (see proposed-information-architecture.md) before finalizing slug/parent.';
  }

  rows.push({
    old_url: u.currentUrl,
    new_url: newUrl,
    page_type: u.pageType,
    reason,
    redirect_required: redirect,
    notes,
  });
  // also add explicit http-> https duplicate rows if any
  for (const dup of u.duplicateProtocolOrWwwUrls || []) {
    rows.push({
      old_url: dup,
      new_url: newUrl,
      page_type: u.pageType + ' (protocol/www duplicate)',
      reason: 'Duplicate of ' + u.currentUrl + ' served on a different protocol/host with no existing redirect',
      redirect_required: 'Yes',
      notes: 'Collapse into single canonical https://www. redirect target — see seo-audit.md §1.1',
    });
  }
}

const header = ['old_url', 'new_url', 'page_type', 'reason', 'redirect_required', 'notes'];
const csv = [header.join(',')].concat(rows.map(r => header.map(h => csvEsc(r[h])).join(','))).join('\n');
fs.writeFileSync(path.join(ROOT, 'research', 'url-migration-map.csv'), csv, 'utf8');
console.log('rows written:', rows.length);
