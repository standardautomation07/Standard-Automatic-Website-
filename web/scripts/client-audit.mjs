// Builds src/data/client-logo-audit.json and a reconciliation summary from src/data/clients.ts.
import fs from "fs";
const { clientOrganisations, clientStats, organisationLocations, organisationCounts } = await import("../src/data/clients.ts");
const audit = clientOrganisations.map((o) => ({
  organization: o.displayName, sourceName: o.sourceNames.join(" | "), officialWebsite: o.officialWebsite, logo: o.logo, logoSource: o.logoSource,
  logoStatus: o.logoStatus, locations: organisationLocations(o), completedProjectCount: organisationCounts(o).completed,
  ongoingProjectCount: organisationCounts(o).ongoing, notes: o.reviewNotes.join(" "),
}));
fs.writeFileSync("src/data/client-logo-audit.json", JSON.stringify({ generatedFrom: "Client List. 2026 MARCH.pdf", stats: clientStats, organisations: audit }, null, 2) + "\n");
const refs = clientOrganisations.flatMap((o) => o.projects.map((p) => p.ref));
const missing = [];
for (let i = 1; i <= 45; i++) if (!refs.includes("C" + i)) missing.push("C" + i);
for (let i = 1; i <= 9; i++) if (!refs.includes("O" + i)) missing.push("O" + i);
const dupes = refs.filter((r, i) => refs.indexOf(r) !== i);
console.log(JSON.stringify({ ...clientStats, pdfRowsMapped: refs.length, missingRows: missing, duplicateRows: dupes }, null, 1));
for (const o of clientOrganisations) if (o.logoStatus !== "verified") console.log(" review:", o.displayName, "—", o.logoStatus);
