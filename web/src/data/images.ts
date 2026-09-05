import type { ImageRef } from "@/lib/types";

/**
 * Image registry.
 *
 * Every image rendered on the site is declared here with its source, usage
 * status, product association and alt text. Components take an image *id*,
 * never a path, so an image can never appear without that provenance.
 *
 * Two usage classes exist today:
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
 * No competitor imagery is used.
 */

const STOCK = "Unsplash — Unsplash License, free commercial use, no attribution required";
const OWN = "Standard Automatic Solutions — supplier catalogue render from the company's own published material";

const PENDING = "Stand-in. Replace with owned installation photography before launch.";
const APPROVED = "Cleared for use — company's own published asset.";

function stock(id: string, file: string, alt: string, association: string): ImageRef {
  return { id, src: `/images/photography/${file}`, alt, source: STOCK, usage: PENDING, association };
}

function own(id: string, file: string, alt: string, association: string, fit: "cover" | "contain" = "cover"): ImageRef {
  return { id, src: `/images/legacy/${file}`, alt, source: OWN, usage: APPROVED, association, fit };
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

  own("p-hsd-roll-up", "intro.jpg", "A high speed door at a warehouse opening with a forklift passing through", "High Speed Roll-Up Doors"),
  stock("p-hsd-self-repairing", "industrial-doors.jpg", "A roll-up industrial door on an internal warehouse opening", "Self-Repairing High Speed Doors"),
  stock("p-hsd-fold-up", "loading-bay-trailer.jpg", "A trailer positioned at a loading ramp beneath a wide door opening", "High Speed Fold-Up Doors"),
  stock("p-hsd-rigid", "manufacturing.jpg", "Large production machinery inside a manufacturing plant", "High Speed Insulated Panel Doors"),

  stock("p-shutter-galvanized", "shutter-grey.jpg", "A closed steel rolling shutter set in a plain wall", "Galvanized Steel Rolling Shutters"),
  stock("p-shutter-aluminium", "shutter-brown.jpg", "A closed aluminium-finish roller shutter", "Aluminium Rolling Shutters"),
  stock("p-shutter-grille", "shutter-slats.jpg", "Close detail of rolling shutter slats", "Grille Rolling Shutters"),
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
