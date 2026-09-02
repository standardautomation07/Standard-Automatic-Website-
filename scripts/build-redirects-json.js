// Converts planning/final-redirects.csv into site/src/data/redirects.json,
// the source next.config.ts reads at build time. Only path-level redirects
// are emitted here (old .html path -> new path); http->https and non-www
// consolidation is a hosting/edge-level concern (see next.config.ts comment
// and planning/SEO-IMPLEMENTATION-PLAN.md §7), not something Next.js's
// `redirects()` can see once TLS/host have already been resolved upstream.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const csv = fs.readFileSync(path.join(ROOT, 'planning', 'final-redirects.csv'), 'utf8');
const lines = csv.split('\n').filter(Boolean);
const header = lines[0].split(',');

function parseCsvLine(line) {
  const out = [];
  let cur = '', inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else cur += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { out.push(cur); cur = ''; }
      else cur += c;
    }
  }
  out.push(cur);
  return out;
}

const rows = lines.slice(1).map((l) => {
  const cols = parseCsvLine(l);
  const rec = {};
  header.forEach((h, i) => (rec[h] = cols[i]));
  return rec;
});

const seenSource = new Set();
const redirects = [];
for (const r of rows) {
  if (r.page_type.includes('protocol/www duplicate')) continue; // hosting-level concern
  if (r.redirect_required !== 'Yes') continue;
  if (!r.new_url || r.new_url === '(none)') continue;
  let source;
  try { source = new URL(r.old_url).pathname; } catch (e) { continue; }
  if (source === '/') continue; // home stays at home, no-op
  if (source === r.new_url) continue;
  if (seenSource.has(source)) continue;
  seenSource.add(source);
  // Next.js routes in this app don't use trailing slashes; strip them so we
  // don't chain a second (Next-internal) redirect on top of this one.
  const destination = r.new_url.length > 1 ? r.new_url.replace(/\/$/, '') : r.new_url;
  redirects.push({ source, destination, permanent: true });
}

fs.mkdirSync(path.join(ROOT, 'site', 'src', 'data'), { recursive: true });
fs.writeFileSync(
  path.join(ROOT, 'site', 'src', 'data', 'redirects.json'),
  JSON.stringify(redirects, null, 2)
);
console.log('redirects written:', redirects.length);
