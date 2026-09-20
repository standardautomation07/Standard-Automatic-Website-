// Automated validation for the Trusted Partners implementation.
//
//   node scripts/validate-partners.mjs            -> validate + write src/data/client-logo-audit.json
//   node scripts/validate-partners.mjs --check    -> validate only (exit 1 on failure)
//
// Sources of truth:
//   PDF_ROWS  — every "Client name" cell of "Client List. 2026 MARCH.pdf" (45 completed + 9 ongoing),
//               transcribed verbatim, mapped to a master organisation id.
//   WEB_LOGOS — the 43 logo images on the previous website's client page (standardautomation.in),
//               mapped to a master organisation id (duplicates of PDF organisations resolve to them).
import fs from "fs";
import path from "path";
import { clientOrganisations, clientStats, organisationCounts, organisationLocations } from "../src/data/clients.ts";

const PDF_ROWS = [
  ["C1", "URC Construction (P) Ltd", "urc-construction"], ["C2", "Godrej & Boyce Mfg Co Ltd", "godrej-boyce"], ["C3", "Ador Powertron", "ador-powertron"],
  ["C4", "SUROJ BUILDCON PVT LTD", "suroj-buildcon"], ["C5", "PRECAST INDIA INFRASTRUCTURES PVT.LTD.", "precast-india"], ["C6", "URC Construction (P) Ltd", "urc-construction"],
  ["C7", "GODREJ INDUSTRIES LTD", "godrej-industries"], ["C8", "Godrej & Boyce Mfg Co Ltd", "godrej-boyce"], ["C9", "ABB India Limited", "abb-india"],
  ["C10", "URC Construction (P) Ltd", "urc-construction"], ["C11", "URC Construction (P) Ltd", "urc-construction"], ["C12", "PRECAST INDIA INFRASTRUCTURES PVT.LTD.", "precast-india"],
  ["C13", "PRECAST INDIA INFRASTRUCTURES PVT.LTD.", "precast-india"], ["C14", "Xerbia Developers", "xerbia-developers"], ["C15", "Bhate & raje Construction Company Ltd", "bhate-raje"],
  ["C16", "M/s SAMBHAV BUILDING SYSTEMS PVT LTD", "sambhav-building-systems"], ["C17", "Sula Vineyards", "sula-vineyards"],
  ["C18", "Kaira District Co-operative Milk Producers' Union Limited. Amul dairy", "amul-kaira"], ["C19", "ITD CEMENTATION IND LTD", "itd-cementation"],
  ["C20", "Bhate & raje Construction Company Ltd", "bhate-raje"], ["C21", "SUVIJIAY BUILDCON", "suvijay-buildcon"], ["C22", "PRECAST INDIA INFRASTRUCTURES PVT.LTD.", "precast-india"],
  ["C23", "Gaurav Engineers", "gaurav-engineers"], ["C24", "SMS INDIA PVT LTD", "sms-india"], ["C25", "Larsen & Toubro Limited, Construction", "lt-construction"],
  ["C26", "URC Construction (P) Ltd", "urc-construction"], ["C27", "Larsen & Toubro Limited, Construction", "lt-construction"], ["C28", "Godrej & Boyce Mfg Co Ltd", "godrej-boyce"],
  ["C29", "MANIPAL ENERGY & INFRA PVT TD", "manipal-energy-infra"], ["C30", "SUROJ BUILDCON PVT LTD", "suroj-buildcon"], ["C31", "SUROJ BUILDCON PVT LTD", "suroj-buildcon"],
  ["C32", "CRESCON PROJECTS & SERVICES PVT LTD", "crescon-projects"], ["C33", "ASMITA ENGINEERING EUIPMENTS", "asmita-engineering"], ["C34", "RAHEJA UNIVERSAL LTD", "raheja-universal"],
  ["C35", "Larsen & Toubro Limited, Construction", "lt-construction"], ["C36", "Larsen & Toubro Limited, Construction", "lt-construction"], ["C37", "VTP REALTY - RISING WELWORTH", "vtp-realty"],
  ["C38", "R R CONSTRUCTION", "rr-construction"], ["C39", "LOREAL INDIA", "loreal-india"], ["C40", "SPG INFRAPROJECTS PVT LTD", "spg-infraprojects"],
  ["C41", "CBRE SOUTH ASIA", "cbre-south-asia"], ["C42", "Safe Lifters Pvt Ltd", "safe-lifters"], ["C43", "Larsen & Toubro Limited, Construction", "lt-construction"],
  ["C44", "VTP REALTY", "vtp-realty"], ["C45", "VTP REALTY", "vtp-realty"],
  ["O1", "Larsen & Toubro Limited, Construction", "lt-construction"], ["O2", "TATA CONSTRUCTION LTD", "tata-construction"], ["O3", "ITD CEMENTATION", "itd-cementation"],
  ["O4", "CBRE SOUTH ASIA", "cbre-south-asia"], ["O5", "Shapoorji Pallonji And Company Private Limited", "shapoorji-pallonji"],
  ["O6", "MILECON ENGINEERING PRIVATE LIMITED", "milecon-engineering"], ["O7", "Amara Raja Infra Private Limited", "amara-raja-infra"],
  ["O8", "INDITECH VALVES LTD", "inditech-valves"], ["O9", "VTP REALTY", "vtp-realty"],
];

const WEB_LOGOS = {
  "11.jpg": "zf-india", "12.jpg": "monier", "13.jpg": "john-deere", "14.jpg": "tata-dlt", "15.jpg": "uno-minda", "16.jpg": "flash-electronics", "17.jpg": "iac",
  "18.jpg": "lmt-tools", "19.jpg": "tech-mahindra", "20.jpg": "general-motors", "22.jpg": "burckhardt-compression", "23.jpg": "kirloskar", "24.jpg": "thermax",
  "25.jpg": "revati", "26.jpg": "amazon", "27.jpg": "flipkart", "28.jpg": "royal-enfield", "29.jpg": "pn-gadgil", "30.jpg": "ranka-jewellers", "32.jpg": "cummins",
  "33.jpg": "reliance-trends", "34.jpg": "pari", "36.jpg": "dellorto", "38.jpg": "kirloskar", "39.jpg": "posco", "42.jpg": "uno-minda", "43.jpg": "thermax",
  "44.jpg": "takshi-auto", "l1.png": "vtp-realty", "l2.png": "ador-powertron", "l3.png": "sula-vineyards", "l4.png": "kempegowda-airport", "l5.png": "iit-gandhinagar",
  "l6.png": "vizag-steel", "l7.png": "sms-india", "l8.png": "godrej-agrovet", "l9.png": "godrej-properties", "l10.png": "godrej-industries", "l11.png": "raviraj-realty",
  "l12.png": "wienerberger", "l13.png": "kolte-patil", "l14.png": "siddhivinayak-groups", "l15.png": "raheja-universal",
};

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const fail = (msg) => failures.push(msg);
const ids = clientOrganisations.map((o) => o.id);
const idSet = new Set(ids);

// 1. every PDF organisation exists in the master dataset, with its row recorded
for (const [ref, name, id] of PDF_ROWS) {
  const org = clientOrganisations.find((o) => o.id === id);
  if (!org) { fail(`PDF row ${ref} (${name}) has no master organisation ${id}`); continue; }
  if (!org.sourceNames.includes(name)) fail(`PDF row ${ref}: source name "${name}" not recorded on ${id}`);
  if (!org.projects.some((p) => p.ref === ref)) fail(`PDF row ${ref} not recorded as a project on ${id}`);
}
// 2. every previous-website logo maps to a master organisation
for (const [file, id] of Object.entries(WEB_LOGOS)) if (!idSet.has(id)) fail(`website logo ${file} maps to unknown organisation ${id}`);
// 3. no duplicate ids / display names / normalised names
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");
for (const key of ["id", "displayName"]) {
  const seen = new Map();
  for (const o of clientOrganisations) { const k = key === "id" ? o.id : norm(o.displayName); if (seen.has(k)) fail(`duplicate ${key}: ${o[key]} / ${seen.get(k)}`); seen.set(k, o[key]); }
}
// 4. public rules: name, logo or explicit placeholder, unique logo files that exist, relationship set
const logoUse = new Map();
for (const o of clientOrganisations) {
  if (!o.displayName.trim()) fail(`${o.id}: empty display name`);
  if (!o.relationship) fail(`${o.id}: no relationship classification`);
  if (o.logo) {
    const f = path.join(root, "public", o.logo);
    if (!fs.existsSync(f)) fail(`${o.id}: logo file missing ${o.logo}`);
    if (logoUse.has(o.logo) && !(o.id === "godrej-industries")) fail(`${o.id}: logo ${o.logo} also used by ${logoUse.get(o.logo)}`);
    logoUse.set(o.logo, o.id);
    if (o.logoStatus === "unavailable") fail(`${o.id}: has a logo but status is unavailable`);
  } else {
    if (!o.initials) fail(`${o.id}: no logo and no placeholder initials`);
    if (o.logoStatus === "verified") fail(`${o.id}: no logo but status is verified`);
  }
}
// 5. exactly one public component, rendered once per page, and no obsolete grid left behind
const src = (p) => fs.readFileSync(path.join(root, p), "utf8");
const obsolete = ["src/components/clients/client-showcase.tsx", "src/components/clients/client-card.tsx"];
for (const p of obsolete) if (fs.existsSync(path.join(root, p))) fail(`obsolete component still present: ${p}`);
for (const page of ["src/app/page.tsx", "src/app/projects/page.tsx"]) {
  const n = (src(page).match(/<TrustedPartners\b/g) || []).length;
  if (n !== 1) fail(`${page} renders TrustedPartners ${n} times (expected 1)`);
  if (/ClientShowcase|client-showcase|client-card/.test(src(page))) fail(`${page} still references the old client grid`);
}
const tp = src("src/components/clients/trusted-partners.tsx");
for (const banned of ["organisationLocations", "productType", "project.status", "org.relationship", "grayscale"]) if (tp.includes(banned)) fail(`trusted-partners.tsx exposes ${banned}`);

// Reconciliation numbers
const pdfIds = new Set(PDF_ROWS.map((r) => r[2]));
const webIds = new Set(Object.values(WEB_LOGOS));
const webOnly = [...webIds].filter((i) => !pdfIds.has(i));
const report = {
  pdfOrganisationOccurrences: PDF_ROWS.length,
  pdfUniqueOrganisations: pdfIds.size,
  websiteLogoOccurrences: Object.keys(WEB_LOGOS).length,
  websiteUniqueOrganisations: webIds.size,
  websiteOnlyOrganisations: webOnly.length,
  masterOrganisations: clientOrganisations.length,
  publicOrganisations: clientOrganisations.length,
  contractors: clientStats.contractors,
  endUsers: clientStats.endUsers,
  projectPartners: clientStats.projectPartners,
  pendingClassification: clientStats.pendingClassification,
  verifiedFullColourLogos: clientStats.verifiedLogos,
  logoReviewRequired: clientStats.logosNeedingReview,
  duplicatesConsolidated: PDF_ROWS.length - pdfIds.size + (Object.keys(WEB_LOGOS).length - webOnly.length),
  missingOrganisations: [...pdfIds, ...webIds].filter((i) => !idSet.has(i)).length,
  duplicatePublicEntries: ids.length - new Set(ids).size,
  projects: clientStats.projects,
  completedProjects: clientStats.completedProjects,
  ongoingProjects: clientStats.ongoingProjects,
  locations: clientStats.locations,
};

if (!process.argv.includes("--check")) {
  const audit = clientOrganisations.map((o) => ({
    organization: o.displayName, relationship: o.relationship, sourceName: o.sourceNames.join(" | "), officialWebsite: o.officialWebsite,
    logo: o.logo, logoSource: o.logoSource, logoStatus: o.logoStatus, locations: organisationLocations(o),
    completedProjectCount: organisationCounts(o).completed, ongoingProjectCount: organisationCounts(o).ongoing, notes: o.reviewNotes.join(" "),
  }));
  fs.writeFileSync(path.join(root, "src/data/client-logo-audit.json"), JSON.stringify({ generatedFrom: ["Client List. 2026 MARCH.pdf", "https://www.standardautomation.in/clients.html"], reconciliation: report, organisations: audit }, null, 2) + "\n");
}
console.log(JSON.stringify(report, null, 1));
if (failures.length) { console.error("\nVALIDATION FAILED:"); failures.forEach((f) => console.error(" -", f)); process.exit(1); }
console.log("\nVALIDATION PASSED");
