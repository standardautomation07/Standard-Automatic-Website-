import { SectionHeading } from "@/components/ui/section-heading";
import { trustedPartners, type TrustedPartner } from "@/data/trusted-partners";

interface TrustedPartnersProps {
  /** Two-digit section number on the homepage; omitted on standalone pages. */
  index?: string;
  className?: string;
}

/**
 * Trusted Partners — the single public showcase of every organisation in
 * `src/data/trusted-partners.ts`, one grid, one card each.
 *
 * Each card carries only the organisation's full-colour logo and its name.
 * Nothing else from the source is rendered here.
 */
export function TrustedPartners({ index, className = "" }: TrustedPartnersProps) {
  return (
    <section
      id="trusted-partners"
      aria-labelledby="trusted-partners-heading"
      className={`scroll-mt-20 border-b border-line bg-paper-sunken py-20 lg:py-28 ${className}`}
    >
      <div className="shell">
        <SectionHeading
          index={index}
          eyebrow={`${trustedPartners.length} organisations`}
          title={<span id="trusted-partners-heading">Trusted Partners</span>}
          lede="Organizations we work with across industrial, infrastructure and commercial projects."
        />

        <ul className="mt-14 grid hairline-grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {trustedPartners.map((org) => (
            <li key={org.id} className="min-w-0">
              <PartnerCard org={org} />
            </li>
          ))}
        </ul>

        <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-steel-500">
          Logos are the property of their respective organisations.
        </p>
      </div>
    </section>
  );
}

function PartnerCard({ org }: { org: TrustedPartner }) {
  return (
    <article className="flex h-full flex-col items-center bg-paper-raised px-6 pb-7 pt-8 text-center transition-colors duration-300 hover:bg-paper">
      <PartnerLogo org={org} />
      <h3 className="mt-6 font-display text-base font-medium leading-snug text-steel-900">
        {org.name}
      </h3>
    </article>
  );
}

/**
 * Consistent logo well: every logo keeps its aspect ratio inside the same
 * box and is shown in its original full-colour treatment. A logo published
 * only as a white knockout sits on a dark well rather than being recoloured.
 * Organisations without a verified logo get a clearly marked placeholder
 * (and an entry in client-logo-audit.json) — they still appear.
 */
function PartnerLogo({ org }: { org: TrustedPartner }) {
  if (!org.logo) {
    return (
      <div
        className="flex h-24 w-full flex-col items-center justify-center border border-dashed border-steel-300 bg-paper-sunken"
        role="img"
        aria-label={`${org.name} — logo to be supplied`}
      >
        <span className="font-display text-2xl font-medium tracking-tight text-steel-500">
          {org.initials}
        </span>
        <span className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-steel-400">
          Logo pending
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex h-24 w-full items-center justify-center ${org.logoOnDark ? "bg-ink px-6" : "px-4"}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static logo assets of mixed formats (SVG/PNG); shown unprocessed in original colour */}
      <img
        src={org.logo}
        alt={org.name}
        loading="lazy"
        decoding="async"
        className="max-h-16 w-auto max-w-[11rem] object-contain"
      />
    </div>
  );
}
