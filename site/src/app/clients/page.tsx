import type { Metadata } from "next";
import Image from "next/image";
import fs from "node:fs";
import path from "node:path";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export const metadata: Metadata = {
  title: "Clients",
  description: "Some of the clients and end users Standard Automation has supplied.",
  alternates: { canonical: "/clients" },
};

const CLIENT_LOGOS = fs
  .readdirSync(path.join(process.cwd(), "public", "images", "legacy"))
  .filter((f) => /^\d+\.(jpg|png)$/i.test(f))
  .sort((a, b) => parseInt(a) - parseInt(b));

export default function ClientsPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Clients", href: "/clients" }]} />
      <div className="container-x pb-20">
        <h1 className="mb-2 font-display text-3xl font-semibold sm:text-4xl">Clients</h1>
        <p className="mb-10 max-w-2xl text-ink-muted">
          Some of our valued clients and end users. Individual client names
          are not published here as none were attributed to these logos in
          the archived source material.
        </p>
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-6">
          {CLIENT_LOGOS.map((logo) => (
            <div key={logo} className="relative aspect-[3/2] rounded-sm border border-border bg-surface-raised p-3">
              <Image src={`/images/legacy/${logo}`} alt="Client logo" fill className="object-contain p-2" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
