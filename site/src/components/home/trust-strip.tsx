import { siteConfig } from "@/lib/site-config";

/**
 * Every fact here is verified from the archived content (legacy/content/about-us.md)
 * or the client's build-approval brief. No employee/project/installation counts -
 * none exist in the source material, and the brief explicitly forbids inventing them.
 */
export function TrustStrip() {
  const facts = [
    { label: "Established", value: String(siteConfig.foundedYear) },
    { label: "Certification", value: siteConfig.isoCertification },
    { label: "Based in", value: "Pune, Maharashtra, India" },
  ];

  return (
    <div className="grid grid-cols-1 divide-y divide-border border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {facts.map((f) => (
        <div key={f.label} className="px-6 py-5 text-center">
          <p className="font-display text-xl font-semibold text-brand-steel">{f.value}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-ink-muted">{f.label}</p>
        </div>
      ))}
    </div>
  );
}
