import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Phone, WhatsApp } from "@/components/ui/icons";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";

interface CtaBandProps {
  title?: string;
  lede?: string;
  whatsappMessage?: string;
}

export function CtaBand({
  title = "Let's automate your next entrance.",
  lede = "Send us the opening — width, height, traffic and site conditions — and we will come back with a specification and a quotation.",
  whatsappMessage = "Hello Standard Automation, I would like a quote.",
}: CtaBandProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src="/images/photography/entrance-night.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/50" />
      <div className="grid-rule absolute inset-0" aria-hidden="true" />

      <div className="shell relative py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow text-amber">Get in touch</p>
          <h2 className="mt-5 text-display-2 text-white">{title}</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-steel-300">{lede}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Request a Quote
            </ButtonLink>
            <ButtonLink href={whatsappHref(whatsappMessage)} variant="onDark" size="lg">
              <WhatsApp className="h-5 w-5" />
              WhatsApp Us
            </ButtonLink>
            <ButtonLink href={telHref()} variant="onDark" size="lg">
              <Phone className="h-5 w-5" />
              {siteConfig.phone}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
