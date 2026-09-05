import type { ImageRef } from "@/lib/types";

/**
 * Image registry.
 *
 * Every image rendered on the site is declared here with its source, usage
 * status, product association and alt text. Components take an image *id*,
 * never a path, so an image can never appear without that provenance.
 *
 * Three usage classes exist today:
 *
 *  - "Unsplash License — free commercial use, no attribution required."
 *    Stand-in photography. It is NOT a photograph of a Standard Automation
 *    installation and alt text describes only what the photograph shows.
 *    Full per-file credits: public/images/photography/CREDITS.md
 *
 *  - "Company asset — supplier catalogue render published by Standard
 *    Automation." Clean product renders carried over from the company's own
 *    published material.
 *
 *  - "Standard Automation — original technical illustration, drawn for this
 *    website." Our own diagrams of how a door type works, built by
 *    scripts/build-door-diagrams.mjs. They carry no third-party rights and
 *    depict only what the issued technical data describes.
 *
 *  - "Standard Automation — AI-generated product visualisation." Product
 *    imagery generated to a written master visual definition, because no
 *    installation photography exists yet. Every such image is a plausible
 *    depiction rather than a record of a real installation, and is marked so
 *    that it can be swapped for real photography without touching anything
 *    downstream. What is verified about each product and what is a visual
 *    assumption is recorded per product in
 *    research/high-speed-doors-visual-definitions.md.
 *
 * No competitor imagery is used.
 */

const STOCK = "Unsplash — Unsplash License, free commercial use, no attribution required";
const OWN = "Standard Automatic Solutions — supplier catalogue render from the company's own published material";
const DIAGRAM = "Standard Automation — original technical illustration, drawn for this website";
const GENERATED = "Standard Automation — AI-generated product visualisation, built to the master visual definition in research/high-speed-doors-visual-definitions.md";

const PENDING = "Stand-in. Replace with owned installation photography before launch.";
const APPROVED = "Cleared for use — company's own published asset.";
const ORIGINAL = "Cleared for use — original artwork, no third-party rights.";
const VISUALISATION =
  "Interim visual. NOT a photograph of a Standard Automation installation, and not a photograph of any other manufacturer's product. Replace with owned installation photography when it exists.";

function stock(id: string, file: string, alt: string, association: string): ImageRef {
  return { id, src: `/images/photography/${file}`, alt, source: STOCK, usage: PENDING, association };
}

function own(id: string, file: string, alt: string, association: string, fit: "cover" | "contain" = "cover"): ImageRef {
  return { id, src: `/images/legacy/${file}`, alt, source: OWN, usage: APPROVED, association, fit };
}

/**
 * An original diagram of how a door type actually works. Used as the lead
 * image where the mechanism is the product and a photograph of a closed door
 * would show none of it. Built by scripts/build-door-diagrams.mjs.
 */
/**
 * One view from a generated product image package. `view` is the filename
 * suffix, so an id maps predictably onto the asset folder for that product.
 */
function generated(
  id: string,
  product: string,
  view: string,
  alt: string,
  association: string,
): ImageRef {
  return {
    id,
    src: `/images/products/high-speed-doors/${product}/${product}-${view}.webp`,
    alt,
    source: GENERATED,
    usage: VISUALISATION,
    association,
    fit: "cover",
  };
}

function diagram(id: string, file: string, alt: string, association: string): ImageRef {
  return {
    id,
    src: `/images/diagrams/${file}.svg`,
    alt,
    source: DIAGRAM,
    usage: ORIGINAL,
    association,
    fit: "cover",
  };
}

const list: ImageRef[] = [
  // ---------------------------------------------------------------- site
  stock("hero-facility", "hero-facility.jpg", "Modern industrial building exterior with a row of loading docks", "Homepage hero"),
  stock("facility-night", "facility-night.jpg", "An industrial plant illuminated at night", "Engineering capability section"),
  stock("entrance-night", "entrance-night.jpg", "An illuminated building lobby seen at night through glass entrance doors", "Call-to-action band"),
  stock("installation", "installation.jpg", "A technician inspecting a door installation on site", "Service and support"),
  stock("engineering-panel", "engineering-panel.jpg", "An engineer operating an industrial equipment control panel", "Controls and commissioning"),
  stock("engineering-fabrication", "engineering-fabrication.jpg", "A fabricator grinding a steel beam with sparks flying", "Engineering capability"),
  stock("engineering-welding", "engineering-welding.jpg", "A welder working on steel in protective equipment", "Fabrication capability"),
  stock("warehouse-interior", "warehouse-interior.jpg", "The interior of a large distribution warehouse", "Projects section"),
  stock("commercial-building", "commercial-building.jpg", "A modern commercial building with a large glazed facade", "About page"),

  // ------------------------------------------------------------ families
  stock("family-industrial-doors", "garage-door-house.jpg", "A closed sectional overhead door beside a brick wall", "Industrial Doors family"),
  own("family-high-speed-doors", "intro.jpg", "A high speed door at a warehouse opening with a forklift passing through", "High Speed Doors family"),
  stock("family-rolling-shutters", "rolling-shutters.jpg", "Closed roller shutters across a commercial frontage", "Rolling Shutters family"),
  stock("family-fire-safety", "shutter-red.jpg", "A closed red rolling shutter at a building opening", "Fire & Safety Doors family"),
  stock("family-automatic-gates", "gates-industrial.jpg", "An industrial site entrance with a large powered gate", "Automatic Gates family"),
  stock("family-entrance-automation", "entrance-automation.jpg", "Automatic glass entrance doors at a modern building", "Entrance Automation family"),
  stock("family-loading-bay", "loading-bay.jpg", "A row of loading docks on a distribution building", "Loading Bay Equipment family"),
  stock("family-access-control", "security-access.jpg", "A row of access-control turnstiles in a building lobby", "Access Control family"),

  // ------------------------------------------------------------ products
  stock("p-sectional-overhead", "garage-door-house.jpg", "A closed sectional overhead door beside a brick wall", "Industrial Sectional Overhead Doors"),
  stock("p-garage-aluminium", "garage-door-modern.jpg", "A modern building elevation with a sectional garage door", "Aluminium Garage Doors"),
  stock("p-garage-residential", "parking-entry.jpg", "A controlled vehicle entrance to a parking structure", "Residential Garage Doors"),

  // High Speed Doors — the lead image for each of the seven types is an
  // original diagram of that mechanism, because the mechanism is what makes
  // the products different from each other. Contextual photography follows in
  // each gallery, described only as what it actually shows.
  diagram(
    "p-hsd-roll-up",
    "high-speed-roll-up-door",
    "Diagram of a high speed roll-up door: a flexible curtain winding onto a drum above the opening and running in side guides",
    "High Speed Roll-Up Door",
  ),
  diagram(
    "p-hsd-fold-up",
    "high-speed-fold-up-door",
    "Diagram of a high speed fold-up door: the curtain gathered into horizontal folds on lifting straps above the opening",
    "High Speed Fold-Up Door",
  ),
  diagram(
    "p-hsd-self-repairing",
    "high-speed-self-repairing-door",
    "Diagram of a high speed self-repairing door: the curtain released from one side guide after impact, with its path back into the guide at the top of travel",
    "High Speed Self-Repairing Door",
  ),
  diagram(
    "p-hsd-spiral",
    "high-speed-spiral-door",
    "Diagram of a high speed spiral door: rigid insulated panels carried into a spiral track above the opening",
    "High Speed Spiral Door",
  ),
  diagram(
    "p-hsd-rigid",
    "high-speed-rigid-insulated-door",
    "Diagram of a high speed rigid insulated door: double-skin panels lifting vertically, with a section showing the insulation core between two metal skins",
    "High Speed Rigid / Insulated Door",
  ),
  diagram(
    "p-hsd-cleanroom",
    "high-speed-cleanroom-hygiene-door",
    "Diagram of a high speed cleanroom door: a sealed rapid-door assembly in a stainless frame with side and bottom seals between two controlled rooms",
    "High Speed Cleanroom / Hygiene Door",
  ),
  diagram(
    "p-hsd-cold-store",
    "high-speed-cold-storage-freezer-door",
    "Diagram of a high speed cold storage door: an insulated curtain with heated side guides and a cold-storage bottom seal at a freezer room opening",
    "High Speed Cold Storage / Freezer Door",
  ),

  // High Speed Roll-Up Door — generated product image package, six views built
  // to one master visual definition so the same door appears in all of them.
  generated(
    "hsd-roll-up-hero",
    "high-speed-roll-up-door",
    "hero",
    "A blue PVC high speed roll-up door, closed, in an internal warehouse opening, with galvanized steel side guides and a geared motor at the head",
    "High Speed Roll-Up Door — lead image",
  ),
  generated(
    "hsd-roll-up-front",
    "high-speed-roll-up-door",
    "front",
    "Front elevation of a blue PVC high speed roll-up door showing the full curtain, both side guides, the barrel and the wall-mounted control panel",
    "High Speed Roll-Up Door — front view",
  ),
  generated(
    "hsd-roll-up-angle",
    "high-speed-roll-up-door",
    "angle",
    "A blue PVC high speed roll-up door seen from a three-quarter angle, showing the depth of the side guide, the end of the barrel and the geared motor housing",
    "High Speed Roll-Up Door — three-quarter view",
  ),
  generated(
    "hsd-roll-up-operational",
    "high-speed-roll-up-door",
    "operational",
    "A high speed roll-up door part open with a forklift driving through the clear opening beneath the raised curtain",
    "High Speed Roll-Up Door — in operation",
  ),
  generated(
    "hsd-roll-up-detail",
    "high-speed-roll-up-door",
    "detail",
    "Close-up of the lower corner of a high speed door, showing the woven texture of the blue PVC curtain, the black rubber bottom edge and the bolted galvanized steel side guide",
    "High Speed Roll-Up Door — construction detail",
  ),
  generated(
    "hsd-roll-up-application",
    "high-speed-roll-up-door",
    "application",
    "A blue high speed roll-up door closed in a dividing wall of a distribution warehouse, with loaded pallet racking either side of a wide concrete aisle",
    "High Speed Roll-Up Door — installed application",
  ),

  // High Speed Fold-Up Door — package in progress.
  generated(
    "hsd-fold-up-hero",
    "high-speed-fold-up-door",
    "hero",
    "A tall anthracite high speed fold-up door in the external elevation of a logistics building, with horizontal aluminium wind bars and a rectangular head box",
    "High Speed Fold-Up Door — lead image",
  ),
  generated(
    "hsd-fold-up-front",
    "high-speed-fold-up-door",
    "front",
    "Front elevation of a tall anthracite high speed fold-up door showing the wind bars, the vision window band and the rectangular galvanized head box",
    "High Speed Fold-Up Door — front view",
  ),

  // Contextual photography used in the High Speed Doors galleries.
  own("g-hsd-installation", "intro.jpg", "A high speed door at a warehouse opening with a forklift passing through", "High Speed Doors gallery"),
  stock("g-hsd-rollup-context", "industrial-doors.jpg", "A closed roll-up industrial door on an internal opening", "High Speed Doors gallery"),
  stock("g-hsd-wide-opening", "loading-bay-trailer.jpg", "A trailer positioned at a loading ramp beneath a wide door opening", "High Speed Doors gallery"),
  stock("g-hsd-forklift", "warehouse-forklift.jpg", "A forklift operating inside a large warehouse", "High Speed Doors gallery"),
  stock("g-hsd-production", "manufacturing.jpg", "Large production machinery inside a manufacturing plant", "High Speed Doors gallery"),
  stock("g-hsd-cleanroom", "industry-cleanroom.jpg", "Workers in protective suits inside a cleanroom", "High Speed Doors gallery"),
  stock("g-hsd-food", "industry-food.jpg", "A worker filling trays on a food processing line", "High Speed Doors gallery"),
  stock("g-hsd-cold-chain", "industry-cold-chain.jpg", "Frozen product stacked in a cold storage facility", "High Speed Doors gallery"),
  stock("g-hsd-warehouse", "warehouse-interior.jpg", "The interior of a large distribution warehouse", "High Speed Doors gallery"),

  stock("p-shutter-galvanized", "shutter-grey.jpg", "A closed steel rolling shutter set in a plain wall", "Galvanized Steel Rolling Shutters"),
  stock("p-shutter-aluminium", "shutter-brown.jpg", "A closed aluminium-finish roller shutter", "Aluminium Rolling Shutters"),
  stock("p-shutter-grille", "shutter-slats.jpg", "Close detail of rolling shutter slats", "Rolling Grille"),

  // Rolling Shutters — placeholder photography for the lines added on
  // 2026-09-05. These are licensed stock images standing in for product
  // photography that does not exist yet; the image id is what the product
  // references, so each one can be swapped for a real photograph without
  // touching the product data.
  stock("p-shutter-ms-solid", "shutter-grey.jpg", "A closed steel rolling shutter set in a plain wall", "MS Solid Rolling Shutter"),
  stock("p-shutter-galvalume", "shutter-white.jpg", "A closed metallic-finish rolling shutter with horizontal slats", "Galvalume Rolling Shutter"),
  stock("p-shutter-stainless", "industry-food.jpg", "A worker filling trays on a food processing line", "Stainless Steel Rolling Shutter"),
  stock("p-shutter-vision", "industry-retail.jpg", "Shoppers inside a modern shopping mall", "Vision / Window Rolling Shutter"),
  stock("p-shutter-industrial", "loading-bay.jpg", "A row of loading docks on a distribution building", "Industrial Rolling Shutter"),
  stock("p-shutter-counter", "commercial-building.jpg", "A modern commercial building with a large glazed facade", "Counter / Service Window Shutter"),
  stock("p-shutter-windproof", "facility-night.jpg", "An industrial plant illuminated at night", "Windproof / Storm-Resistant Rolling Shutter"),
  stock("p-shutter-perforated", "shutter-white.jpg", "A white rolling shutter with horizontal slats", "Perforated Rolling Shutters"),
  stock("p-shutter-polycarbonate", "rolling-shutters.jpg", "Closed roller shutters across a retail frontage", "Polycarbonate Rolling Shutters"),
  stock("p-shutter-insulated", "door-red-shutter.jpg", "A closed insulated shutter door on an industrial elevation", "Insulated Double-Wall Rolling Shutters"),

  stock("p-fire-shutter", "shutter-red.jpg", "A closed red rolling shutter at a building opening", "Fire Rated Rolling Shutters"),
  stock("p-fire-sliding-door", "installation.jpg", "A technician inspecting a door installation on site", "Fire Rated Sliding Doors"),

  stock("p-gate-sliding", "gates-industrial.jpg", "An industrial site entrance with a large powered gate", "Automatic Sliding Gates"),
  stock("p-gate-telescopic", "gate-metal.jpg", "A black metal gate at a site entrance", "Telescopic Sliding Gates"),
  stock("p-gate-swing", "gate-driveway.jpg", "A gated driveway entrance", "Automatic Swing Gates"),
  stock("p-gate-retractable", "gate-sliding.jpg", "A yellow and black site gate across a vehicle entrance", "Retractable Gates"),

  stock("p-auto-sliding-doors", "entrance-automation.jpg", "Automatic glass entrance doors at a modern building", "Automatic Sliding Glass Doors"),
  stock("p-swing-doors", "industry-healthcare.jpg", "A hospital corridor with doors along it", "Automatic Swing Doors"),
  stock("p-hermetic-doors", "industry-cleanroom.jpg", "Workers in protective suits inside a cleanroom", "Hermetic & Cleanroom Doors"),

  stock("p-dock-leveller", "loading-bay-trailer.jpg", "A trailer positioned at a loading ramp", "Dock Levellers"),
  stock("p-dock-shelter", "loading-bay.jpg", "A row of loading docks on a distribution building", "Dock Shelters & Dock Houses"),

  own("p-tripod-turnstile", "HL145.PNG", "A tripod turnstile unit", "Tripod Turnstiles", "contain"),
  own("p-flap-barrier", "Flap-A203.PNG", "A flap barrier lane unit", "Flap Barriers", "contain"),
  own("p-full-height-turnstile", "fullG535.PNG", "A full height turnstile", "Full Height Turnstiles", "contain"),
  own("p-bollard", "bollard-cover.jpg", "A protection bollard installed beside an industrial door opening", "Bollards"),
  stock("p-boom-barrier", "barrier-arm.jpg", "A boom barrier arm at a controlled vehicle entry", "Boom Barriers"),
  stock("p-retractable-barrier", "barrier-closed.jpg", "A vehicle waiting at a closed barrier line", "Retractable Barriers"),


  // ---------------------------------------------------------- galleries
  own("g-tripod-yl121", "YL121.PNG", "A tripod turnstile, alternative model", "Tripod Turnstiles gallery", "contain"),
  own("g-tripod-el128", "EL128.PNG", "A tripod turnstile with an extended housing", "Tripod Turnstiles gallery", "contain"),
  own("g-flap-e242", "FLAPE242.PNG", "A flap barrier with an alternative housing", "Flap Barriers gallery", "contain"),
  own("g-flap-h249", "FLAPH249.PNG", "A flap barrier with an angled housing", "Flap Barriers gallery", "contain"),
  own("g-flap-y248", "FLAPY248.PNG", "A pair of flap barrier lanes", "Flap Barriers gallery", "contain"),
  own("g-full-g538", "FULLG538.PNG", "A full height turnstile, alternative series", "Full Height Turnstiles gallery", "contain"),
  own("g-full-g535-2", "FULLG535-2.PNG", "A twin-lane full height turnstile", "Full Height Turnstiles gallery", "contain"),

  // ----------------------------------------------------------- industries
  stock("i-manufacturing", "industry-plant-robotics.jpg", "An industrial robot arm inside a production plant", "Manufacturing industry"),
  stock("i-warehousing", "warehouse-forklift.jpg", "A forklift operating inside a large warehouse", "Warehousing & Logistics industry"),
  stock("i-cold-chain", "industry-cold-chain.jpg", "Frozen product stacked in a cold storage facility", "Cold Chain & Food Processing industry"),
  stock("i-pharma", "industry-cleanroom.jpg", "Workers in protective suits inside a cleanroom", "Pharmaceutical & Cleanroom industry"),
  stock("i-automotive", "industry-automotive.jpg", "Robotic arms assembling a car body on a production line", "Automotive industry"),
  stock("i-retail", "industry-retail.jpg", "Shoppers inside a modern shopping mall", "Retail & Commercial industry"),
  stock("i-healthcare", "industry-healthcare.jpg", "An empty hospital corridor with doors along it", "Healthcare industry"),
  stock("i-transit", "industry-transit.jpg", "People walking through a modern airport terminal", "Infrastructure & Transit industry"),
  stock("i-food", "industry-food.jpg", "A worker filling trays on a food processing line", "Food processing applications"),
];

export const images: Record<string, ImageRef> = Object.fromEntries(
  list.map((image) => [image.id, image]),
);

export function image(id: string): ImageRef {
  const found = images[id];
  if (!found) throw new Error(`Unknown image id: ${id}`);
  return found;
}

export const imageList = list;
