import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { Media } from "@/components/ui/media";
import { TrustedPartners } from "@/components/clients/trusted-partners";
import { trustedPartnerStats } from "@/data/trusted-partners";

export const metadata: Metadata = {
  title: "Trusted Partners",
  description: `Trusted Partners — ${trustedPartnerStats.publicOrganisations} organizations Standard Automatic Solutions works with across industrial, infrastructure and commercial projects.`,
  alternates: { canonical: "/projects" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Trusted Partners", path: "/projects" },
];

/**
 * The Trusted Partners showcase is built from the master organisation
 * dataset (src/data/trusted-partners.ts). Written-up case studies are still being
 * documented, so the page says so rather than inventing them.
 */
export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <section className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0 overflow-hidden">
          <Media id="warehouse-interior" sizes="100vw" priority decorative className="img-settle opacity-55" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/20" />
        <div className="grid-fine absolute inset-0" aria-hidden="true" />
        <div className="hero-in shell relative flex min-h-[24rem] flex-col justify-end py-14 lg:min-h-[32rem] lg:py-20">
          <Breadcrumb trail={trail} tone="dark" />
          <p className="eyebrow mt-8 text-amber">Projects</p>
          <h1 className="mt-5 max-w-3xl text-display-2 text-white">Trusted Partners</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-steel-300">
            Organizations we work with across industrial, infrastructure and commercial projects.
          </p>
        </div>
      </section>

      <TrustedPartners />

      <section className="bg-paper py-16 lg:py-24">
        <div className="shell" data-reveal>
          <div className="max-w-2xl border-l-2 border-amber bg-paper-raised p-8">
            <h2 className="font-display text-xl font-medium text-steel-900">
              Written case studies are being prepared.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-steel-700">
              We are documenting completed installations properly — site, opening, the products
              specified and why — and confirming each reference before it is published, rather than
              filling this page with stock photography and invented case studies.
            </p>
            <p className="mt-4 text-base leading-relaxed text-steel-700">
              If you would like references relevant to your sector in the meantime, ask us directly
              and we will share what the client has agreed we can share.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ask for references for your sector."
        lede="Tell us what you are building and we will share the relevant installation experience directly."
      />
    </>
  );
}
