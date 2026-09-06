import type { FamilyId, Product } from "@/lib/types";

/**
 * Ordering questions and size statements for the tabbed product detail.
 *
 * Two things the detail tabs need that are not product specifications:
 *
 *  - **Ordering information** — what we need from the customer before the
 *    product can be configured and priced. These are questions, not claims,
 *    and they are a property of the product type: every powered gate needs
 *    leaf weight and duty answered, every turnstile needs lane count and
 *    throughput. Held per family, with per-product overrides where a product
 *    genuinely asks something different.
 *
 *  - **Size statements** — the plain-language answer to "how big can it be".
 *    Deliberately says what the limit depends on rather than implying one
 *    number covers every opening. No product on this site publishes a
 *    universal maximum.
 *
 * Nothing here states a specification. Rolling Shutters and High Speed Doors
 * carry their own, authored with their issued data; this covers the rest.
 */

const SURVEY_BASICS = [
  "Clear opening width and height, measured between the finished reveals rather than the frame",
  "Headroom above the opening and side room at both jambs",
  "Whether the installation is face mounted, between the jambs or recessed",
  "Internal or external, and the exposure of the elevation if external",
];

const POWER_AND_USE = [
  "Roughly how many times a day it will be operated, which sizes the drive",
  "Power supply available at the opening, where the product is powered",
  "Any access control, alarm or signalling system it has to interface with",
];

const orderingByFamily: Record<FamilyId, string[]> = {
  "high-speed-doors": [],
  "rolling-shutters": [],

  "industrial-doors": [
    ...SURVEY_BASICS,
    "Available headroom for the track and the lift configuration it allows — standard, high, vertical or low headroom",
    "What the opening separates, if anything: temperature, noise, dust or weather",
    ...POWER_AND_USE,
    "Finish and colour, and whether glazing or vision panels are required",
  ],

  "fire-safety-doors": [
    "Clear opening width and height, and the compartment line the opening sits on",
    "The fire rating the building's fire strategy requires for this opening",
    "Whether the opening is on an escape route, and the escape provision required",
    "How the assembly is to be released on alarm, and whether an alarm interface is available",
    "Headroom and side room available, and the structural substrate for fixing",
    "Whether the opening is used daily as well as being a fire assembly",
    "Any certification or documentation the project specification requires",
  ],

  "automatic-gates": [
    "Clear opening width, and the side-run or swing room available beside it",
    "Leaf height and approximate leaf weight, or the infill and frame you want, so we can calculate it",
    "Ground conditions and levels across the opening, and whether a track can be laid",
    "Roughly how many times a day the gate will be operated",
    "Power supply available at the gate, and the cable route to it",
    "How the gate is to be released: intercom, card, remote, keypad or loop",
    "Site exposure, and any safety or signalling requirement at the crossing point",
  ],

  "entrance-automation": [
    "Clear opening width and height, and the structural opening around it",
    "Available side-run for the leaves to park into, which decides sliding against swing",
    "Header depth and height available above the opening",
    "Expected footfall, and whether the doorway sits on an escape route",
    "The escape behaviour required on alarm, agreed against the building fire strategy",
    "Power supply at the header, and any access control or reception override",
    "Glazing specification and finish to match the surrounding facade or joinery",
  ],

  "loading-bay": [
    "Dock height above the yard, and the range of vehicle bed heights served",
    "Bay width and the pit or structural arrangement available",
    "The handling equipment used across it, and its axle load rather than gross weight",
    "How many vehicles the bay turns round in a day",
    "Whether the bay is exposed, and what the building has to keep out",
    "Power supply at the bay, and any interlock with the bay door or traffic signals",
    "Any levelling, sealing or vehicle restraint already in place",
  ],

  "access-control": [
    "Number of lanes required, and whether one has to be accessible width",
    "Expected throughput at peak, in people or vehicles per minute",
    "Indoor or outdoor, and the degree of weather exposure",
    "Credential technology to be used, and whether readers are supplied by others",
    "Behaviour required on power failure and on fire alarm, agreed with the fire strategy",
    "Floor or ground construction, and the cable routes available to each lane",
    "Direction control required: entry only, exit only or bidirectional",
  ],
};

const sizeByFamily: Record<FamilyId, string> = {
  "high-speed-doors": "Available in custom sizes.",
  "rolling-shutters": "Available in custom sizes.",
  "industrial-doors": "Made to the opening. Available in custom sizes.",
  "fire-safety-doors": "Maximum size is subject to the tested and certified configuration.",
  "automatic-gates":
    "Engineered to the opening. Leaf weight, side-run and ground conditions decide what is achievable.",
  "entrance-automation":
    "Made to the opening. Clear width depends on the leaf arrangement and the side-run available.",
  "loading-bay": "Engineered to the bay. Platform and pit dimensions are set out per project.",
  "access-control":
    "Lane width and housing dimensions are configuration dependent; at least one accessible lane is normally required per bank.",
};

/** Questions we need answered before this product can be configured. */
export function orderingFor(product: Product): string[] {
  return product.ordering ?? orderingByFamily[product.familyId] ?? [];
}

/** Plain-language answer to how big it can be. */
export function sizeStatementFor(product: Product, published?: string): string {
  return published ?? sizeByFamily[product.familyId] ?? "Available in custom sizes.";
}
