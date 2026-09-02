import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { TrustStrip } from "@/components/home/trust-strip";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Standard Automatic Solutions Pvt Ltd is a manufacturer and supplier of rolling shutters, automatic sliding gates, doors, and road barriers, based in Pune since 2006.",
  alternates: { canonical: "/about-us" },
};

export default function AboutUsPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "About Us", href: "/about-us" }]} />
      <div className="container-x pb-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h1 className="mb-6 font-display text-3xl font-semibold sm:text-4xl">
              Manufacturer &amp; Supplier of Industrial Doors
            </h1>
            <div className="space-y-4 text-ink-muted">
              <p>
                We are the manufacturer and supplier of Rolling Shutters,
                automatic sliding gates, doors, swing gates, and road
                barriers, and we also provide entrance automation systems
                installation services.
              </p>
              <p>
                {siteConfig.legalName} is a leading enterprise engaged in
                manufacturing and supplying a comprehensive assortment of the
                best quality automatic rolling shutters, sliding gates,
                doors, swing gates and road barriers. Our foundation was laid
                in {siteConfig.foundedYear} at Pune, Maharashtra, with the
                intention of providing clients unmatched quality products.
              </p>
              <p>
                Products are manufactured using quality raw material and the
                latest techniques, designed and developed with precision to
                meet international quality standards. They are widely
                acknowledged among clients for excellent finish, corrosion
                resistance, reliable performance, robust construction, and
                the ability to withstand extreme weather conditions.
              </p>
              <p>
                To offer a flawless collection of products, we have
                established a state-of-the-art infrastructural facility,
                installed with the latest machines and equipment.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border">
            <Image
              src="/images/legacy/aboutus.jpg"
              alt="Standard Automation manufacturing facility"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16">
          <TrustStrip />
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <ValueBlock
            title="Vision & Mission"
            text="We aim to offer our valued customers high-quality solutions at affordable rates. Our vision is to earn a global name in the industry through innovative and modern products designed with advanced technology."
          />
          <ValueBlock
            title="Our Infrastructure"
            text="Our premises house a highly advanced infrastructure facility, installed with all the required machines and tools, enabling us to deliver our products in large quantity."
          />
          <ValueBlock
            title="Quality Policy"
            text="We believe in delivering high-quality, state-of-the-art, safe and energy-efficient products, continuously striving to meet or exceed our customers' requirements and expectations."
          />
        </div>
      </div>
    </>
  );
}

function ValueBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-sm border border-border p-5">
      <h2 className="mb-2 font-display text-lg font-semibold">{title}</h2>
      <p className="text-sm text-ink-muted">{text}</p>
    </div>
  );
}
