// Builds research/urls.json, research/products.json, research/images.json,
// and legacy/content/*.md from crawl-results.json + nav-tree.json.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const results = JSON.parse(fs.readFileSync(path.join(__dirname, 'crawl-results.json'), 'utf8'));
const navTree = JSON.parse(fs.readFileSync(path.join(__dirname, 'nav-tree.json'), 'utf8'));

const CONTENT_DIR = path.join(ROOT, 'legacy', 'content');
fs.mkdirSync(CONTENT_DIR, { recursive: true });

function pathOf(u) {
  let p;
  try {
    p = new URL(u).pathname.replace(/^\/+/, '');
  } catch (e) {
    p = u.replace(/^\/+/, '');
  }
  p = p.replace(/\.html?$/, '');
  return p === '' ? 'index' : p;
}

// Build slug -> category info map from nav tree
const slugInfo = {};
for (const c of navTree.product_categories_live) {
  slugInfo[pathOf(c.category_url)] = { pageType: 'category', category: c.category, parent: null, navLive: true };
  for (const ch of c.children) {
    slugInfo[pathOf(ch.url)] = { pageType: 'product', category: c.category, parent: c.category_url, navLabel: ch.label, navLive: true };
  }
}
for (const c of navTree.product_categories_orphaned_commented_out_in_nav_html) {
  slugInfo[pathOf(c.category_url)] = { pageType: 'category', category: c.category, parent: null, navLive: false, orphaned: 'commented-out-in-nav' };
  for (const ch of c.children) {
    slugInfo[pathOf(ch.url)] = { pageType: 'product', category: c.category, parent: c.category_url, navLabel: ch.label, navLive: false, orphaned: 'commented-out-in-nav' };
  }
}
const infoPages = { 'about-us': 'info', 'clients': 'info', 'enquiry': 'transactional', 'contact': 'transactional', 'index': 'home', '': 'home' };

function classify(record) {
  const slug = pathOf(record.url);
  if (record.status === 404) return { pageType: 'dead-404', category: null };
  if (slugInfo[slug]) return slugInfo[slug];
  if (infoPages[slug]) return { pageType: infoPages[slug], category: null };
  return { pageType: 'orphaned-unclassified', category: null };
}

function decodeEntities(s) {
  return s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&rsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"').replace(/&mdash;/g, '-').replace(/&nbsp;/g, ' ');
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, ' ').replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n\n').trim());
}

function extractMainRegion(html) {
  // Prefer the col-lg-9 content column (excludes the col-lg-3 "Our Products" sidebar
  // menu, which on many pages is itself markup with a stray/duplicate <h1>/<h2> -
  // a real template bug, noted separately in the SEO audit rather than let it pollute
  // every page's extracted H1/content).
  let start = html.indexOf('<div class="col-lg-9">');
  if (start === -1) start = html.indexOf('<div class="about-inr">');
  let end = html.indexOf('class="footer"');
  if (start === -1 || end === -1 || end <= start) return null;
  return html.slice(start, end);
}

// crude tag-aware section extractor: pulls h1/h3 + following block text, and <table> blocks, within a region
function extractSections(region) {
  const h1 = (region.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [, ''])[1];
  const parts = region.split(/(<h[13][^>]*>[\s\S]*?<\/h[13]>)/i);
  const sections = [];
  let currentHeading = null;
  for (const part of parts) {
    const hm = part.match(/^<h([13])[^>]*>([\s\S]*?)<\/h\1>$/i);
    if (hm) {
      currentHeading = stripTags(hm[2]);
    } else if (currentHeading !== null && part.trim()) {
      sections.push({ heading: currentHeading, text: stripTags(part) });
      currentHeading = null;
    }
  }
  const tables = [...region.matchAll(/<table[\s\S]*?<\/table>/gi)].map(m => {
    const rows = [...m[0].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map(r =>
      [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map(c => stripTags(c[1]))
    );
    return rows;
  });
  const listItems = [...region.matchAll(/<li>([\s\S]*?)<\/li>/gi)].map(m => stripTags(m[1])).filter(Boolean);
  return { h1: stripTags(h1), sections, tables, listItems };
}

function extractBannerImage(html, pageUrl) {
  const m = html.match(/<div class="banner">([\s\S]*?)<\/div>/i);
  if (!m) return null;
  const imgs = imagesInRegion(m[1], pageUrl);
  return imgs[0] || null;
}

function imagesInRegion(region, pageUrl) {
  return [...region.matchAll(/<img[^>]+>/gi)].map(m => {
    const tag = m[0];
    const src = (tag.match(/src=["']([^"']+)["']/i) || [, null])[1];
    const alt = (tag.match(/alt=["']([^"']*)["']/i) || [, null])[1] || '';
    if (!src) return null;
    let abs = src;
    try { abs = new URL(src, pageUrl).toString(); } catch (e) {}
    return { src, absoluteUrl: abs, alt };
  }).filter(Boolean);
}

const urlsOut = [];
const productsOut = [];
const imagesOut = [];
const seenPaths = new Map(); // normalized path -> first record (for protocol/www dedupe)

for (const r of results) {
  const slug = pathOf(r.url);
  const cls = classify(r);
  const scheme = r.url.startsWith('https') ? 'https' : 'http';

  // dedupe: prefer https record as the canonical one shown in urls.json, but note the duplicate
  if (!seenPaths.has(slug)) seenPaths.set(slug, []);
  seenPaths.get(slug).push({ url: r.url, scheme, status: r.status });

  const region = r.body === undefined && r.status === 200 ? null : null; // body not retained in json; recompute from raw file
  let mainRegion = null;
  if (r.status === 200 && r.rawFile) {
    const html = fs.readFileSync(path.join(ROOT, r.rawFile), 'utf8');
    mainRegion = extractMainRegion(html);
    if (mainRegion) {
      const imgs = imagesInRegion(mainRegion, r.url);
      for (const im of imgs) {
        imagesOut.push({
          imageUrl: im.absoluteUrl,
          page: r.url,
          product: cls.pageType === 'product' ? (cls.navLabel || slug) : null,
          filename: im.src.split('/').pop(),
          altText: im.alt,
          isLikelyProductImage: cls.pageType === 'product' || cls.pageType === 'category',
          retain: 'UNKNOWN - needs business review',
          replacementNeeded: im.alt ? 'UNKNOWN' : 'YES - missing alt text, and low-res/legacy asset likely needs reshoot'
        });
      }
    }
  }

  if (scheme === 'https' || !urlsOut.find(u => u._slug === slug)) {
    // keep going, we'll finalize after loop using best (https, 200) record per slug
  }
}

// Now build final urls.json: one entry per unique path, preferring https+200 record, noting duplicates
const bySlug = {};
for (const r of results) {
  const slug = pathOf(r.url);
  if (!bySlug[slug]) bySlug[slug] = [];
  bySlug[slug].push(r);
}

for (const slug of Object.keys(bySlug)) {
  const records = bySlug[slug];
  const best = records.find(r => r.url.startsWith('https') && r.status === 200) || records.find(r => r.status === 200) || records[0];
  const cls = classify(best);
  const duplicateProtocolUrls = records.filter(r => r.url !== best.url).map(r => r.url);

  let mainRegion = null, extracted = null, banner = null;
  if (best.status === 200 && best.rawFile) {
    const html = fs.readFileSync(path.join(ROOT, best.rawFile), 'utf8');
    mainRegion = extractMainRegion(html);
    if (mainRegion) extracted = extractSections(mainRegion);
    banner = extractBannerImage(html, best.url);
    if (banner) {
      imagesOut.push({
        imageUrl: banner.absoluteUrl,
        page: best.url,
        product: cls.pageType === 'product' ? (cls.navLabel || slug) : null,
        filename: banner.src.split('/').pop(),
        altText: banner.alt,
        isLikelyProductImage: true,
        role: 'page banner / hero image',
        retain: 'UNKNOWN - needs business review',
        replacementNeeded: banner.alt ? 'UNKNOWN' : 'YES - missing alt text',
      });
    }
  }

  const internalLinks = (best.links || [])
    .filter(l => { try { return new URL(l.href, best.url).hostname.includes('standardautomation.in'); } catch (e) { return false; } })
    .map(l => l.href)
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 20);

  urlsOut.push({
    _slug: slug,
    currentUrl: best.url,
    duplicateProtocolOrWwwUrls: duplicateProtocolUrls,
    pageType: cls.pageType,
    category: cls.category || null,
    parentCategoryUrl: cls.parent || null,
    navLive: cls.navLive !== undefined ? cls.navLive : null,
    orphanedReason: cls.orphaned || (cls.pageType === 'orphaned-unclassified' ? 'not found in live nav, sitemap-only or link-discovered' : null),
    title: best.title || null,
    metaDescription: best.metaDesc || null,
    metaKeywords: best.metaKeywords || null,
    h1: (extracted && extracted.h1) || (best.h1s && best.h1s[0]) || null,
    httpStatus: best.status || null,
    fetchError: best.error || null,
    canonicalTag: best.canonical || null,
    robotsMeta: best.robots || null,
    indexability: best.status === 200 ? (best.robots && /noindex/i.test(best.robots) ? 'noindex (blocked)' : 'indexable') : 'not indexable (' + (best.status || best.error) + ')',
    importantInternalLinks: internalLinks,
    preserveExistingUrl: best.status === 200 && cls.pageType !== 'dead-404',
    potentialNewUrlRecommendation: 'TBD in url-migration-map.csv',
  });

  if (cls.pageType === 'product' && extracted) {
    productsOut.push({
      productName: extracted.h1 || cls.navLabel,
      navLabel: cls.navLabel || null,
      category: cls.category,
      subcategory: null,
      currentUrl: best.url,
      navLiveInCurrentMenu: cls.navLive,
      shortDescription: (extracted.sections[0] && extracted.sections[0].text) || null,
      fullDescriptionSections: extracted.sections,
      specTables: extracted.tables,
      applicationsOrFeatureBullets: extracted.listItems,
      images: (banner ? [{ ...banner, role: 'banner' }] : []).concat(mainRegion ? imagesInRegion(mainRegion, best.url) : []),
      materials: 'UNKNOWN - not separately tagged on live page, see fullDescriptionSections for any prose mentions',
      dimensions: 'UNKNOWN - see specTables if present, otherwise not published',
      certifications: 'UNKNOWN - only site-wide ISO 9001:2015 claim found on homepage, no per-product certification listed',
      brochuresOrDatasheets: 'UNKNOWN - no PDF/datasheet links found on this page',
      relatedProducts: (navTree.product_categories_live.concat(navTree.product_categories_orphaned_commented_out_in_nav_html))
        .find(c => c.category === cls.category)?.children.map(c => c.url).filter(u => u !== best.url.split('/').pop()) || [],
    });
  }

  // write content archive for meaningful pages
  if (best.status === 200 && mainRegion) {
    const md = `# ${best.title || slug}\n\n` +
      `- Source URL (source of truth): ${best.url}\n` +
      `- Page type: ${cls.pageType}${cls.category ? ' / category: ' + cls.category : ''}\n` +
      `- Meta description (verbatim): ${best.metaDesc || 'MISSING'}\n` +
      `- H1 (verbatim): ${extracted?.h1 || 'MISSING'}\n\n` +
      `## Archived body content (verbatim, tags stripped, original wording preserved)\n\n` +
      (extracted?.sections.map(s => `### ${s.heading}\n\n${s.text}\n`).join('\n') || stripTags(mainRegion)) +
      (extracted?.tables.length ? '\n\n## Spec table(s) (verbatim)\n\n' + extracted.tables.map(t => t.map(row => '| ' + row.join(' | ') + ' |').join('\n')).join('\n\n') : '') +
      (extracted?.listItems.length ? '\n\n## All list items on page (verbatim)\n\n' + extracted.listItems.map(li => '- ' + li).join('\n') : '');
    const safeSlug = slug.replace(/[\/\\]/g, '_') || 'home';
    fs.writeFileSync(path.join(CONTENT_DIR, safeSlug + '.md'), md, 'utf8');
  }
}

fs.writeFileSync(path.join(ROOT, 'research', 'urls.json'), JSON.stringify(urlsOut, null, 2));
fs.writeFileSync(path.join(ROOT, 'research', 'products.json'), JSON.stringify(productsOut, null, 2));
fs.writeFileSync(path.join(ROOT, 'research', 'images.json'), JSON.stringify(imagesOut, null, 2));

console.log('urls.json entries:', urlsOut.length);
console.log('products.json entries:', productsOut.length);
console.log('images.json entries:', imagesOut.length);
console.log('content archive files written:', fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md')).length);
