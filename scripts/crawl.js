// One-off audit crawler for standardautomation.in. Not part of any future site build.
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const BASE_HOST = 'www.standardautomation.in';
const START_URLS = [
  'https://www.standardautomation.in/',
];

const SITEMAP_URLS = fs.readFileSync(path.join(__dirname, 'sitemap-urls.txt'), 'utf8')
  .split('\n').map(s => s.trim()).filter(Boolean);

const OUT_RAW = path.join(__dirname, '..', 'legacy', 'content', 'raw');
fs.mkdirSync(OUT_RAW, { recursive: true });

function fetchUrl(urlStr, redirectCount = 0) {
  return new Promise((resolve) => {
    let u;
    try { u = new URL(urlStr); } catch (e) {
      return resolve({ url: urlStr, error: 'invalid-url' });
    }
    const lib = u.protocol === 'https:' ? https : http;
    const req = lib.get(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Standard-Automation-Audit-Bot/1.0; internal audit)' }, timeout: 20000 }, (res) => {
      const status = res.statusCode;
      if ([301, 302, 307, 308].includes(status) && res.headers.location && redirectCount < 5) {
        const next = new URL(res.headers.location, u).toString();
        res.resume();
        return resolve(fetchUrl(next, redirectCount + 1).then(r => ({ ...r, redirectedFrom: urlStr, redirectStatus: status })));
      }
      let data = [];
      res.on('data', (c) => data.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(data);
        resolve({ url: urlStr, status, headers: res.headers, body: buf.toString('utf8'), finalUrl: urlStr });
      });
    });
    req.on('timeout', () => { req.destroy(); resolve({ url: urlStr, error: 'timeout' }); });
    req.on('error', (e) => resolve({ url: urlStr, error: e.message }));
  });
}

function extractMeta(html) {
  const get = (re) => { const m = html.match(re); return m ? m[1].trim() : null; };
  const title = get(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const metaDesc = get(/<meta[^>]+name=["']description["'][^>]+content=["']([\s\S]*?)["']/i)
    || get(/<meta[^>]+content=["']([\s\S]*?)["'][^>]+name=["']description["']/i);
  const metaKeywords = get(/<meta[^>]+name=["']keywords["'][^>]+content=["']([\s\S]*?)["']/i);
  const canonical = get(/<link[^>]+rel=["']canonical["'][^>]+href=["']([\s\S]*?)["']/i);
  const robots = get(/<meta[^>]+name=["']robots["'][^>]+content=["']([\s\S]*?)["']/i);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const imgs = [...html.matchAll(/<img[^>]+>/gi)].map(m => {
    const tag = m[0];
    const src = (tag.match(/src=["']([^"']+)["']/i) || [,null])[1];
    const alt = (tag.match(/alt=["']([^"']*)["']/i) || [,null])[1];
    const width = (tag.match(/width=["']?(\d+)/i) || [,null])[1];
    const height = (tag.match(/height=["']?(\d+)/i) || [,null])[1];
    return { src, alt, width, height };
  });
  const links = [...html.matchAll(/<a\s[^>]*href=["']([^"'#][^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)].map(m => ({
    href: m[1].trim(), text: m[2].replace(/<[^>]+>/g, '').trim(),
  }));
  const pdfLinks = [...html.matchAll(/href=["']([^"']+\.pdf)["']/gi)].map(m => m[1]);
  return { title, metaDesc, metaKeywords, canonical, robots, h1s, h2s, h3s, imgs, links, pdfLinks };
}

async function main() {
  const seen = new Map();
  const queue = [...new Set([...START_URLS, ...SITEMAP_URLS])];
  const results = [];
  let i = 0;
  while (i < queue.length) {
    const url = queue[i++];
    if (seen.has(url)) continue;
    seen.set(url, true);
    process.stderr.write(`Fetching [${i}/${queue.length}] ${url}\n`);
    const r = await fetchUrl(url);
    const record = { url, status: r.status || null, error: r.error || null, finalUrl: r.finalUrl || url, redirectedFrom: r.redirectedFrom || null, redirectStatus: r.redirectStatus || null };
    if (r.body) {
      const meta = extractMeta(r.body);
      Object.assign(record, meta);
      // save raw html
      const slug = new URL(url).pathname.replace(/^\/+/, '').replace(/\/$/, '') || 'index';
      const safeSlug = slug.replace(/[^a-zA-Z0-9._-]/g, '_') || 'home';
      fs.writeFileSync(path.join(OUT_RAW, safeSlug.endsWith('.html') ? safeSlug : safeSlug + '.html'), r.body, 'utf8');
      record.rawFile = 'legacy/content/raw/' + (safeSlug.endsWith('.html') ? safeSlug : safeSlug + '.html');
      // discover new internal links
      for (const l of meta.links) {
        try {
          const abs = new URL(l.href, url).toString().split('#')[0];
          const au = new URL(abs);
          if (au.hostname.replace(/^www\./, '') === BASE_HOST.replace(/^www\./, '') && /\.html?$|\/$/.test(au.pathname) && !seen.has(abs) && !queue.includes(abs)) {
            queue.push(abs);
          }
        } catch (e) {}
      }
    }
    results.push(record);
  }
  fs.writeFileSync(path.join(__dirname, 'crawl-results.json'), JSON.stringify(results, null, 2), 'utf8');
  console.log(`Done. ${results.length} URLs processed.`);
}

main();
