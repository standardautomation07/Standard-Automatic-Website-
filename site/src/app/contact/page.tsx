import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PhoneCTA } from "@/components/cta/phone-cta";
import { EmailCTA } from "@/components/cta/email-cta";
import { WhatsAppCTA } from "@/components/cta/whatsapp-cta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${siteConfig.legalName} in Pune, Maharashtra for rolling shutters, gates, doors and loading bay equipment.`,
};

export default async function ContactPage(props: PageProps<"/contact">) {
  const searchParams = await props.searchParams;
  const product = typeof searchParams.product === "string" ? searchParams.product : "";

  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <div className="container-x pb-20">
        <h1 className="mb-10 font-display text-3xl font-semibold sm:text-4xl">Contact Us</h1>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <address className="not-italic">
              <p className="font-display text-lg font-semibold">{siteConfig.legalName}</p>
              <p className="mt-2 text-ink-muted">
                {siteConfig.address.street}<br />
                {siteConfig.address.locality}, {siteConfig.address.city}{" "}
                {siteConfig.address.postalCode}<br />
                {siteConfig.address.region}, India
              </p>
            </address>
            <div className="mt-6 space-y-3">
              <PhoneCTA />
              <EmailCTA />
              <WhatsAppCTA />
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-lg font-semibold">Send an Enquiry</h2>
            <EnquiryForm defaultProduct={product} />
          </div>
        </div>
      </div>
    </>
  );
}
