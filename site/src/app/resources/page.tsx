import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { WhatsAppCTA } from "@/components/cta/whatsapp-cta";
import { EmailCTA } from "@/components/cta/email-cta";

export const metadata: Metadata = {
  title: "Resources",
  description: "Brochures and technical datasheets from Standard Automation.",
  alternates: { canonical: "/resources" },
};

/**
 * Zero brochures/PDFs exist in the audited archive (research/seo-audit.md;
 * planning/OPEN-BUSINESS-DECISIONS.md item 14). No placeholder documents are
 * linked here - real ones should be uploaded to the CMS `resource` type
 * (planning/CONTENT-MODEL.md) once produced.
 */
export default function ResourcesPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }]} />
      <div className="container-x pb-20">
        <h1 className="mb-4 font-display text-3xl font-semibold sm:text-4xl">Resources</h1>
        <div className="max-w-xl rounded-sm border border-border bg-surface-raised p-8 text-center">
          <p className="text-ink-muted">
            Product brochures and technical datasheets are not yet available
            for download. If you need detailed specifications for a specific
            product, please get in touch directly.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <EmailCTA subject="Product documentation request" />
            <WhatsAppCTA />
          </div>
        </div>
      </div>
    </>
  );
}
