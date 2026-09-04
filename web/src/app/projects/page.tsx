import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaBand } from "@/components/cta/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { Media } from "@/components/ui/media";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Standard Automation project references. Installation case studies are being documented and will be published here as each client reference is confirmed.",
  alternates: { canonical: "/projects" },
  robots: { index: false, follow: true },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
];

/**
 * Ships deliberately empty. There is no verified project or case-study
 * material available (planning/OPEN-BUSINESS-DECISIONS.md item 16), and
 * inventing installations would be worse than an honest empty state.
 * `noindex` until there is real content here.
 */
export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <section className="relative isolate overflow-hidden bg-ink">
        <Media id="warehouse-interior" sizes="100vw" priority decorative className="opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="shell relative py-14 lg:py-20">
          <Breadcrumb trail={trail} tone="dark" />
          <p className="eyebrow mt-8 text-amber">Projects</p>
          <h1 className="mt-5 max-w-3xl text-display-2 text-white">Installation references</h1>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <div className="shell">
          <div className="max-w-2xl border-l-2 border-amber bg-paper-raised p-8">
            <h2 className="font-display text-xl font-medium text-steel-900">
              This section is being prepared.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-steel-700">
              We are documenting completed installations properly — site, opening, the products
              specified and why — and confirming each client reference before it is published.
              Rather than fill this page with stock photography and invented case studies, it stays
              empty until there is real material to put here.
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
