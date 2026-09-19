import { SectionHeading } from "@/components/ui/section-heading";
import { ClientCard } from "@/components/clients/client-card";
import { clientOrganisations, clientStats } from "@/data/clients";

interface ClientShowcaseProps {
  /** Two-digit section number for the homepage; omitted on standalone pages. */
  index?: string;
  /** Heading level context: the homepage uses h2 inside SectionHeading. */
  className?: string;
}

/**
 * Trusted Clients & Project Partners.
 *
 * Every organisation in the client list is rendered — there is no curated
 * subset. The copy stays factual: the numbers are computed from the dataset
 * in `src/data/clients.ts`, never typed by hand.
 */
export function ClientShowcase({ index, className = "" }: ClientShowcaseProps) {
  const stats = [
    { value: clientStats.organisations, label: "Organisations" },
    { value: clientStats.projects, label: "Project records" },
    { value: clientStats.locations, label: "Locations" },
  ];

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className={`scroll-mt-20 border-b border-line bg-paper-sunken py-20 lg:py-28 ${className}`}
    >
      <div className="shell">
        <SectionHeading
          index={index}
          eyebrow="Trusted clients & project partners"
          align="between"
          title={<span id="clients-heading">Organisations we have worked with.</span>}
          lede="Organisations and project partners across industrial, infrastructure, commercial and manufacturing projects — end users, contractors, developers and engineering companies, completed and ongoing."
          action={
            <dl className="grid grid-cols-3 gap-6 md:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-left md:text-right">
                  <dd className="font-display text-3xl font-medium tracking-tight text-steel-900">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-steel-500">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          }
        />

        <ul className="mt-14 grid hairline-grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {clientOrganisations.map((org) => (
            <li key={org.id} className="min-w-0">
              <ClientCard org={org} />
            </li>
          ))}
        </ul>

        <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-steel-500">
          Logos are the property of their respective organisations. Select an organisation for its
          project list.
        </p>
      </div>
    </section>
  );
}
