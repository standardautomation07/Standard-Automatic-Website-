import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PhoneCTA } from "@/components/cta/phone-cta";
import { EmailCTA } from "@/components/cta/email-cta";
import { WhatsAppCTA } from "@/components/cta/whatsapp-cta";

export const metadata: Metadata = {
  title: "Service & Support",
  description: "Get in touch with Standard Automation for installation, service and support enquiries.",
};

/**
 * No service/support content (SLAs, warranty terms, AMC programs) exists in
 * the audited archive - see planning/OPEN-BUSINESS-DECISIONS.md item 18.
 * This page intentionally states only that support is available and how to
 * reach the team, rather than inventing specific service terms.
 */
export default function ServiceSupportPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Service & Support", href: "/service-support" }]} />
      <div className="container-x pb-20">
        <h1 className="mb-4 font-display text-3xl font-semibold sm:text-4xl">Service &amp; Support</h1>
        <p className="mb-8 max-w-xl text-ink-muted">
          For installation queries, maintenance, spare parts or any other
          support requirement, please contact our team directly.
        </p>
        <div className="flex flex-wrap gap-4">
          <PhoneCTA />
          <EmailCTA subject="Service and support enquiry" />
          <WhatsAppCTA message="Hi, I need help with service/support for a Standard Automation product." />
        </div>
      </div>
    </>
  );
}
