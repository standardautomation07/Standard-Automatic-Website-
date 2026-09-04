import { Suspense } from "react";
import type { Metadata } from "next";
import { families, products } from "@/lib/catalog";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { addressLine, mailtoHref, siteConfig, telHref, whatsappHref } from "@/lib/site-config";
import { Mail, MapPin, Phone, WhatsApp } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description:
    "Request a quotation for entrance automation, industrial doors, rolling shutters, loading bay equipment or access control. Call, WhatsApp or send us the opening details.",
  alternates: { canonical: "/contact" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  const formProducts = products.map(({ id, name, familyId }) => ({ id, name, familyId }));
  const formFamilies = families.map(({ id, name }) => ({ id, name }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <section className="border-b border-line bg-paper pt-10 lg:pt-14">
        <div className="shell pb-14 lg:pb-16">
          <Breadcrumb trail={trail} />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-amber-deep">Contact</p>
              <h1 className="mt-5 text-display-2 text-steel-900">
                Tell us about the opening.
              </h1>
            </div>
            <p className="text-base leading-relaxed text-steel-600 lg:col-span-5">
              Width, height, daily traffic and site conditions are usually enough for us to come
              back with a specification and a price. A photograph helps.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper-sunken py-14 lg:py-20">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="border border-line bg-paper-raised p-8 text-sm text-steel-600">
                  Loading enquiry form…
                </div>
              }
            >
              <EnquiryForm products={formProducts} families={formFamilies} />
            </Suspense>
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-line bg-paper-raised">
              <div className="border-b border-line p-7">
                <h2 className="eyebrow text-steel-500">Direct lines</h2>
                <ul className="mt-5 space-y-4">
                  <li>
                    <a
                      href={telHref()}
                      className="flex items-start gap-3 text-base text-steel-900 hover:text-amber-deep"
                    >
                      <Phone className="mt-1 h-5 w-5 shrink-0 text-amber" />
                      <span>
                        {siteConfig.phone}
                        <span className="block text-sm text-steel-500">Phone</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={whatsappHref("Hello Standard Automation, I have an enquiry.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-base text-steel-900 hover:text-amber-deep"
                    >
                      <WhatsApp className="mt-1 h-5 w-5 shrink-0 text-amber" />
                      <span>
                        {siteConfig.whatsapp}
                        <span className="block text-sm text-steel-500">WhatsApp</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={mailtoHref("Website enquiry")}
                      className="flex items-start gap-3 break-all text-base text-steel-900 hover:text-amber-deep"
                    >
                      <Mail className="mt-1 h-5 w-5 shrink-0 text-amber" />
                      <span>
                        {siteConfig.email}
                        <span className="block text-sm text-steel-500">Email</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="p-7">
                <h2 className="eyebrow text-steel-500">Office</h2>
                <div className="mt-5 flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-amber" />
                  <address className="not-italic leading-relaxed text-steel-700">
                    {siteConfig.legalName}
                    <br />
                    {addressLine}
                    <br />
                    {siteConfig.address.countryName}
                  </address>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
