// Automated validation for the Trusted Partners implementation.
//
//   node scripts/validate-partners.mjs           -> validate + write src/data/client-logo-audit.json
//   node scripts/validate-partners.mjs --check   -> validate only (exit 1 on failure)
//
// Source of truth: "Trusted_Partners_Editable.pdf". Its 91 name lines are
// embedded in src/data/trusted-partners.ts as `sourcePdfLines`; this script
// proves every one of them resolves to exactly one public card (or is an
// explicitly listed non-organisation line), that no card is duplicated, and
// that the public component exposes nothing but logo + name.
import fs from "fs";
import path from "path";
import {
  trustedPartners,
  trustedPartnerStats,
  sourcePdfLines,
  sourcePdfNonOrganisationLines,
} from "../src/data/trusted-partners.ts";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const fail = (m) => failures.push(m);

// 1. every source line -> exactly one organisation
const byLine = new Map();
for (const p of trustedPartners) for (const s of p.sourceNames) {
  if (byLine.has(s)) fail(`source line "${s}" claimed by ${byLine.get(s)} and ${p.id}`);
  byLine.set(s, p.id);
}
const distinct = [...new Set(sourcePdfLines)];
const missing = distinct.filter((l) => !byLine.has(l) && !sourcePdfNonOrganisationLines.includes(l));
for (const m of missing) fail(`source line "${m}" has no partner card`);
for (const s of byLine.keys()) if (!distinct.includes(s)) fail(`sourceName "${s}" is not in the PDF`);
for (const p of trustedPartners) {
  const n = p.sourceNames.reduce((a, s) => a + sourcePdfLines.filter((l) => l === s).length, 0);
  if (n !== p.occurrences) fail(`${p.id}: occurrences ${p.occurrences} != counted ${n}`);
}
// 2. no duplicate cards
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");
for (const key of ["id", "name"]) {
  const seen = new Map();
  for (const p of trustedPartners) { const k = key === "id" ? p.id : norm(p.name); if (seen.has(k)) fail(`duplicate ${key}: ${p[key]} / ${seen.get(k)}`); seen.set(k, p[key]); }
}
// 3. every card has a name and a logo or an explicit placeholder; logo files exist and are unique
const logoUse = new Map();
for (const p of trustedPartners) {
  if (!p.name.trim()) fail(`${p.id}: empty name`);
  if (p.logo) {
    if (!fs.existsSync(path.join(root, "public", p.logo))) fail(`${p.id}: logo file missing ${p.logo}`);
    if (logoUse.has(p.logo)) fail(`${p.id}: logo ${p.logo} also used by ${logoUse.get(p.logo)}`);
    logoUse.set(p.logo, p.id);
    if (p.logoStatus === "unavailable") fail(`${p.id}: has a logo but status unavailable`);
  } else {
    if (!p.initials) fail(`${p.id}: no logo and no placeholder initials`);
    if (p.logoStatus === "verified") fail(`${p.id}: no logo but status verified`);
  }
}
// orphan logo files
for (const f of fs.readdirSync(path.join(root, "public/images/trusted-partners"))) if (!logoUse.has("/images/trusted-partners/" + f)) fail(`orphan logo file ${f}`);
// 4. one public component, rendered once per page, no obsolete implementation, no leakage
const src = (p) => fs.readFileSync(path.join(root, p), "utf8");
for (const p of ["src/components/clients/client-showcase.tsx", "src/components/clients/client-card.tsx", "src/data/clients.ts", "public/images/clients"])
  if (fs.existsSync(path.join(root, p))) fail(`obsolete implementation still present: ${p}`);
for (const page of ["src/app/page.tsx", "src/app/projects/page.tsx"]) {
  const n = (src(page).match(/<TrustedPartners\b/g) || []).length;
  if (n !== 1) fail(`${page} renders TrustedPartners ${n} times (expected 1)`);
}
const tp = src("src/components/clients/trusted-partners.tsx");
for (const banned of ["occurrences", "sourceNames", "notes", "logoStatus ===", "grayscale", "location", "project", "status"]) if (new RegExp(`org\\.${banned}|\\b${banned}\\b(?![^<]*-->)`).test(tp.replace(/\/\*\*[\s\S]*?\*\//g, ""))) fail(`trusted-partners.tsx exposes "${banned}"`);

const report = {
  pdfOrganisationOccurrences: sourcePdfLines.length,
  pdfDistinctLines: distinct.length,
  nonOrganisationLines: sourcePdfNonOrganisationLines,
  uniqueOrganisations: trustedPartners.length,
  publicTrustedPartners: trustedPartners.length,
  consolidatedSpellings: trustedPartners.filter((p) => p.sourceNames.length > 1).map((p) => `${p.name} <= ${p.sourceNames.join(" | ")}`),
  duplicatesConsolidated: sourcePdfLines.length - sourcePdfNonOrganisationLines.length - trustedPartners.length,
  verifiedFullColourLogos: trustedPartnerStats.verifiedLogos,
  logoReviewRequired: trustedPartnerStats.logosNeedingReview,
  placeholders: trustedPartners.filter((p) => !p.logo).map((p) => p.name),
  missingOrganisations: missing.length,
  duplicatePublicEntries: trustedPartners.length - new Set(trustedPartners.map((p) => p.id)).size,
};

if (!process.argv.includes("--check")) {
  const audit = trustedPartners.map((p) => ({
    organization: p.name, sourceNames: p.sourceNames, occurrencesInPdf: p.occurrences, logo: p.logo, logoSource: p.logoSource,
    officialWebsite: p.officialWebsite, logoStatus: p.logoStatus, logoOnDark: !!p.logoOnDark, verificationNotes: p.notes,
  }));
  fs.writeFileSync(path.join(root, "src/data/client-logo-audit.json"), JSON.stringify({ generatedFrom: "Trusted_Partners_Editable.pdf", reconciliation: report, organisations: audit }, null, 2) + "\n");
}
console.log(JSON.stringify(report, null, 1));
if (failures.length) { console.error("\nVALIDATION FAILED:"); failures.forEach((f) => console.error(" -", f)); process.exit(1); }
console.log("\nVALIDATION PASSED");
