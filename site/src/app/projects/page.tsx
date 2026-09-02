import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { RequestQuoteButton } from "@/components/cta/request-quote-button";

export const metadata: Metadata = {
  title: "Projects",
  description: "Standard Automation project case studies.",
  alternates: { canonical: "/projects" },
};

/**
 * No real project/case-study content exists in the audited archive
 * (research/MASTER-AUDIT.md §10; planning/OPEN-BUSINESS-DECISIONS.md item 16).
 * This page ships with the section's architecture in place and an honest
 * empty state, rather than fabricated projects.
 */
export default function ProjectsPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }]} />
      <div className="container-x pb-20">
        <h1 className="mb-4 font-display text-3xl font-semibold sm:text-4xl">Projects</h1>
        <div className="max-w-xl rounded-sm border border-border bg-surface-raised p-8 text-center">
          <p className="text-ink-muted">
            Project case studies are being prepared and will be published
            here soon. In the meantime, see our{" "}
            <a href="/clients" className="text-brand-steel hover:underline">client list</a>{" "}
            or get in touch to discuss a similar requirement.
          </p>
          <div className="mt-6">
            <RequestQuoteButton />
          </div>
        </div>
      </div>
    </>
  );
}
