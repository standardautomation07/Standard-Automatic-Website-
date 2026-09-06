import { families, familyPath, industries, industryPath, productPath, productsInFamily } from "@/lib/catalog";
import { siteConfig } from "@/lib/site-config";

/**
 * llms.txt — a plain-language index for AI assistants and answer engines,
 * built from the same catalogue data as the rest of the site so it can never
 * drift out of sync with what is actually published.
 *
 * https://llmstxt.org/ — no official schema is enforced by any crawler yet;
 * this follows the emerging convention of an H1, a one-line summary, and
 * link sections a model can use to decide what to fetch next.
 */
export const dynamic = "force-static";

function line(name: string, path: string, description: string) {
  return `- [${name}](${siteConfig.url}${path}): ${description}`;
}

export async function GET() {
  const body = `# ${siteConfig.shortName}

> ${siteConfig.legalName} designs, supplies and installs entrance automation, industrial doors, rolling shutters, loading bay equipment and access control systems, engineered from Pune, India since ${siteConfig.foundedYear}. ${siteConfig.isoCertification} registered.

Specifications on this site are stated only where the company itself publishes the underlying figures; anything unconfirmed is marked "to be confirmed" rather than invented. Products carry no price — contact the company for a quotation against a surveyed opening.

## Product families

${families
  .map((family) =>
    line(family.name, familyPath(family.id), family.summary),
  )
  .join("\n")}

## Products

${families
  .flatMap((family) =>
    productsInFamily(family.id).map((product) =>
      line(product.name, productPath(product), product.summary),
    ),
  )
  .join("\n")}

## Industries served

${industries
  .map((industry) => line(industry.name, industryPath(industry.id), industry.tagline))
  .join("\n")}

## Company

${line("About", "/about", "Company background, ISO 9001:2015 certification, founding year.")}
${line("Contact", "/contact", `Phone ${siteConfig.phone}, email ${siteConfig.email}, ${siteConfig.address.city} ${siteConfig.address.region}.`)}
${line("Service & support", "/service-support", "Installation, commissioning and maintenance support.")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
