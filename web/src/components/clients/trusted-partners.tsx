import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { publicTrustedPartners, type TrustedPartner } from "@/data/trusted-partners";

type PublicPartner = TrustedPartner & { logo: string };

interface TrustedPartnersProps {
  /** Two-digit section number on the homepage; omitted on standalone pages. */
  index?: string;
  className?: string;
  /**
   * `grid` is the full named showcase, one card per organisation.
   * `marquee` is the compact single-line treatment used where the section is
   * one of many on a long page and the full grid would cost too much height.
   */
  variant?: "grid" | "marquee";
}

/**
 * Trusted Partners — the single public showcase of the organisations in
 * `src/data/trusted-partners.ts` that have a verified logo. Organisations
 * still without a logo stay in the dataset and the audit file but are not
 * shown until a logo is supplied.
 *
 * Both treatments render the same organisations from the same source, and
 * carry only the organisation's full-colour logo and its name. Nothing else
 * from the source is rendered here.
 */
export function TrustedPartners({ index, className = "", variant = "grid" }: TrustedPartnersProps) {
  const isMarquee = variant === "marquee";

  return (
    <section
      id="trusted-partners"
      aria-labelledby="trusted-partners-heading"
      className={`scroll-mt-20 border-b border-line bg-paper-sunken ${
        isMarquee ? "py-16 lg:py-20" : "py-20 lg:py-28"
      } ${className}`}
    >
      <div className="shell">
        <SectionHeading
          index={index}
          eyebrow={`${publicTrustedPartners.length} organisations`}
          title={<span id="trusted-partners-heading">Trusted Partners</span>}
          lede="Organizations we work with across industrial, infrastructure and commercial projects."
        />
      </div>

      {isMarquee ? (
        <PartnerMarquee />
      ) : (
        <div className="shell">
          <ul className="mt-14 grid hairline-grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {publicTrustedPartners.map((org) => (
              <li key={org.id} className="min-w-0">
                <PartnerCard org={org} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="shell">
        <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-steel-500">
          Logos are the property of their respective organisations.
        </p>
      </div>
    </section>
  );
}

/**
 * One continuous line of logos, full width of the page rather than the
 * shell, so the run reads as a moving band rather than a boxed widget.
 *
 * The run is rendered twice inside one track; the second copy is hidden from
 * assistive technology because it repeats the first. The cycle time is
 * derived from how many organisations there are, so adding one changes the
 * length of the loop rather than how fast the logos travel.
 */
function PartnerMarquee() {
  const cycle = `${publicTrustedPartners.length * 3}s`;

  return (
    <div
      className="marquee mt-12 lg:mt-14"
      style={{ "--marquee-duration": cycle } as CSSProperties}
    >
      <div className="marquee-track">
        <PartnerRun />
        <PartnerRun duplicate />
      </div>
    </div>
  );
}

function PartnerRun({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="marquee-run" aria-hidden={duplicate || undefined}>
      {publicTrustedPartners.map((org) => (
        <li key={org.id} className="shrink-0 px-5 lg:px-7">
          <PartnerLogo org={org} compact />
        </li>
      ))}
    </ul>
  );
}

function PartnerCard({ org }: { org: PublicPartner }) {
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
 *
 * The compact well is the marquee's: a fixed box so every logo occupies the
 * same slot, which is also what keeps the two runs exactly the same width.
 * Logos sit slightly held back and come to full strength on hover, so the
 * band supports the page rather than competing with it.
 */
function PartnerLogo({ org, compact = false }: { org: PublicPartner; compact?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center ${
        compact ? "h-16 w-36 lg:h-20 lg:w-44" : "h-24 w-full"
      } ${org.logoOnDark ? (compact ? "bg-ink px-4" : "bg-ink px-6") : "px-2"}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static logo assets of mixed formats (SVG/PNG); shown unprocessed in original colour */}
      <img
        src={org.logo}
        alt={org.name}
        loading="lazy"
        decoding="async"
        className={
          compact
            ? "max-h-11 w-auto max-w-full object-contain opacity-85 transition-opacity duration-300 hover:opacity-100 lg:max-h-14"
            : "max-h-16 w-auto max-w-[11rem] object-contain"
        }
      />
    </div>
  );
}
