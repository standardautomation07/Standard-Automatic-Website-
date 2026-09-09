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

/**
 * A product render supplied by Standard Automation itself, filed alongside
 * the generated package for the same product. Same folder shape as
 * `generated`, deliberately different provenance: this is the company's own
 * asset, so it is approved rather than carrying the "replace before launch"
 * caveat. `family` is the folder under products/, so this works for any
 * family rather than only high speed doors.
 */
function supplied(
  id: string,
  family: string,
  product: string,
  view: string,
  alt: string,
  association: string,
  aspect = "aspect-[3/2]",
): ImageRef {
  return {
    id,
    src: `/images/products/${family}/${product}/${product}-${view}.webp`,
    alt,
    source: OWN,
    usage: APPROVED,
    association,
    fit: "cover",
    aspect,
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
  supplied(
    "shutter-vision-supplied",
    "rolling-shutters",
    "vision-window-rolling-shutters",
    "supplied",
    "A galvanized steel vision rolling shutter part raised over a reception service counter, the office behind visible through the opening beneath the curtain, with a stainless head box carrying the company mark, and inset details of the slat with its glazed vision window and of the plain slat offered alongside it",
    "Vision / Window Rolling Shutter — lead image",
    "aspect-[5/3]",
  ),
  supplied(
    "shutter-gi-solid-supplied",
    "rolling-shutters",
    "galvanized-steel-rolling-shutters",
    "supplied",
    "A galvanized steel rolling shutter closed across an industrial opening, its spangled slats running the full width between side guides beneath a plain galvanized head box, with a two-button control station and emergency stop on the wall alongside and black and yellow bollards in front of the opening",
    "GI Solid Rolling Shutter — lead image",
    "aspect-[6/5]",
  ),
  supplied(
    "shutter-insulated-supplied",
    "rolling-shutters",
    "insulated-double-wall-rolling-shutters",
    "supplied",
    "A galvanized steel insulated rolling shutter closed across an industrial opening, its slats running the full width between side guides beneath a stainless head box carrying the company mark, with a control panel at the jamb and an inset cutaway of the slat showing the foam core between its two skins",
    "Insulated Rolling Shutter — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "shutter-windproof-supplied",
    "rolling-shutters",
    "windproof-rolling-shutters",
    "supplied",
    "A galvanized steel windproof rolling shutter closed across an industrial opening under a storm sky, with a wall-mounted control panel at the jamb, and inset details of the windproof slat profile and of the interlocking windlock guide rail that holds the curtain in its guides under wind load",
    "Windproof / Storm-Resistant Rolling Shutter — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "shutter-galvalume-supplied",
    "rolling-shutters",
    "galvalume-rolling-shutters",
    "supplied",
    "A galvalume rolling shutter closed across an industrial opening, its spangled aluminium-zinc coated slats running the full width between side guides, with a stainless head box carrying the company mark, a wall-mounted control panel at the jamb and an inset cutaway of the slat profile",
    "Galvalume Rolling Shutter — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "shutter-grille-supplied",
    "rolling-shutters",
    "grille-rolling-shutters",
    "supplied",
    "A stainless steel rolling grille closed across a showroom entrance, its horizontal tubes linked by vertical bars into an open lattice the interior shows through, with a stainless head box carrying the company mark, a wall-mounted control panel at the jamb and an inset cutaway of the tube-and-link profile",
    "Rolling Grille — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "shutter-polycarbonate-supplied",
    "rolling-shutters",
    "polycarbonate-rolling-shutters",
    "supplied",
    "A transparent polycarbonate rolling shutter closed across a showroom entrance, its clear slats separated by aluminium interlocks so the lit interior shows straight through, with a stainless head box carrying the company mark, a wall-mounted control panel at the jamb and an inset cutaway of the polycarbonate slat profile",
    "Transparent Polycarbonate Rolling Shutter — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "shutter-perforated-supplied",
    "rolling-shutters",
    "perforated-rolling-shutters",
    "supplied",
    "A perforated stainless steel rolling shutter closed across a showroom entrance, its slats pierced with a dense pattern of round holes that the interior shows through, with a stainless head box carrying the company mark, a wall-mounted control panel at the jamb and an inset cutaway of the perforated slat profile",
    "Perforated Rolling Shutter — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "shutter-stainless-supplied",
    "rolling-shutters",
    "stainless-steel-rolling-shutters",
    "supplied",
    "A stainless steel rolling shutter closed across a commercial entrance, its polished slats running the full width between stainless side guides beneath a brushed stainless head box with downlights, a two-button control station with emergency stop on the wall alongside, and stainless bollards set in front of the opening",
    "Stainless Steel Rolling Shutter — lead image",
    "aspect-[6/5]",
  ),
  supplied(
    "shutter-aluminium-supplied",
    "rolling-shutters",
    "aluminium-rolling-shutters",
    "supplied",
    "An aluminium rolling shutter part open across a commercial building entrance, the warehouse and a forklift visible inside, with a wide aluminium head box above and a control panel with display and emergency stop mounted on the pier alongside",
    "Aluminium Rolling Shutter — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "shutter-ms-solid-supplied",
    "rolling-shutters",
    "ms-solid-rolling-shutters",
    "supplied",
    "A dark grey mild steel rolling shutter part open across a warehouse entrance, the racking and a forklift visible inside, with a tube motor mounted on the head box, a control panel with display and emergency stop at the jamb and hatched yellow floor markings across the threshold",
    "MS Solid Rolling Shutter — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "hsd-cold-store-supplied",
    "high-speed-doors",
    "high-speed-cold-storage-freezer-door",
    "supplied",
    "A blue high speed cold storage door closed across an opening into a chilled warehouse, frost forming along the guides and the sill, with a full-width clear vision band showing the racking and handling equipment beyond, a stainless head box carrying the company mark and a control panel at the jamb",
    "High Speed Cold Storage / Freezer Door — lead image",
  ),
  supplied(
    "hsd-cleanroom-supplied",
    "high-speed-doors",
    "high-speed-cleanroom-hygiene-door",
    "supplied",
    "A blue high speed cleanroom door closed across an opening in a white-panelled clean area, with a full-width clear vision band across the middle of the curtain showing the equipment beyond, a stainless head box carrying the company mark and a stainless control panel at the jamb",
    "High Speed Cleanroom / Hygiene Door — lead image",
  ),
  supplied(
    "hsd-rigid-insulated-supplied",
    "high-speed-doors",
    "high-speed-rigid-insulated-door",
    "supplied",
    "A blue high speed rigid insulated door closed across an internal warehouse opening, its insulated panels divided by aluminium joints with a full-width clear vision band across the middle, a stainless head box carrying the company mark and a wall-mounted control panel at the jamb",
    "High Speed Rigid / Insulated Door — lead image",
  ),
  supplied(
    "hsd-spiral-supplied",
    "high-speed-doors",
    "high-speed-spiral-door",
    "supplied",
    "A high speed spiral door part open across a warehouse opening, its horizontal aluminium panels glazed across the upper half and carried into the coiled spiral track visible beside the head box, with a wall-mounted control panel at the jamb",
    "High Speed Spiral Door — lead image",
  ),
  supplied(
    "hsd-self-repairing-supplied",
    "high-speed-doors",
    "high-speed-self-repairing-door",
    "supplied",
    "A yellow high speed self-repairing door closed across an internal warehouse opening, with a full-width clear vision band across the middle of the curtain, a stainless head box carrying the company mark and a wall-mounted control panel beside the guide",
    "High Speed Self-Repairing Door — lead image",
  ),
  supplied(
    "hsd-roll-up-supplied",
    "high-speed-doors",
    "high-speed-roll-up-door",
    "supplied",
    "A blue high speed roll-up door closed across an internal warehouse opening, with a full-width clear vision band across the middle of the curtain, a stainless head box carrying the company mark and a wall-mounted control panel beside the guide",
    "High Speed Roll-Up Door — lead image",
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

  // Second views of shutters that already lead on a supplied render.
  supplied(
    "shutter-stainless-elevation",
    "rolling-shutters",
    "stainless-steel-rolling-shutters",
    "elevation",
    "A stainless steel rolling shutter closed across a commercial opening, its polished slats lit from the head box above, between stainless bollards, with a two-button control station and emergency stop on the wall alongside",
    "Stainless Steel Rolling Shutter — elevation",
    "aspect-[6/5]",
  ),
  supplied(
    "shutter-gi-solid-elevation",
    "rolling-shutters",
    "galvanized-steel-rolling-shutters",
    "elevation",
    "A galvanized steel rolling shutter closed across an industrial opening beneath a plain galvanized head box, between yellow and black bollards, with a two-button control station and emergency stop on the wall alongside",
    "GI Solid Rolling Shutter — elevation",
    "aspect-[6/5]",
  ),
  supplied(
    "shutter-ms-solid-powered",
    "rolling-shutters",
    "ms-solid-rolling-shutters",
    "powered",
    "A dark grey mild steel rolling shutter raised clear of a warehouse opening, the tube motor visible on the end of the head box and a control panel on the jamb, with racking and a forklift working inside",
    "MS Solid Rolling Shutter — powered operation",
    "aspect-[16/9]",
  ),
  supplied(
    "shutter-aluminium-powered",
    "rolling-shutters",
    "aluminium-rolling-shutters",
    "powered",
    "An aluminium rolling shutter part raised across a commercial building entrance, a control panel with display and emergency stop mounted on the pier beside it, with the loading area and a forklift beyond",
    "Aluminium Rolling Shutter — powered operation",
    "aspect-[16/9]",
  ),
  supplied(
    "shutter-gi-solid-powered",
    "rolling-shutters",
    "galvanized-steel-rolling-shutters",
    "powered",
    "A galvanized steel rolling shutter raised across an industrial opening, the tube motor mounted on the end of the head box and a control panel with emergency stop on the jamb, with pallet racking and a forklift inside",
    "GI Solid Rolling Shutter — powered operation",
    "aspect-[16/9]",
  ),

  supplied(
    "boom-barrier-supplied",
    "access-control",
    "boom-barriers",
    "supplied",
    "A boom barrier raised across a business park entrance, its red and white striped arm horizontal above the roadway, with a card reader and a lit status strip on the pedestal and a car waiting beyond",
    "Boom Barriers — gatehouse lane",
    "aspect-[6/5]",
  ),
  supplied(
    "boom-barrier-entrance",
    "access-control",
    "boom-barriers",
    "entrance",
    "A boom barrier lowered across an office forecourt lane, its red and white striped arm spanning the roadway from a pedestal with a lit status strip, with a speed hump and directional arrow marked on the surface",
    "Boom Barriers — lead image",
    "aspect-[6/5]",
  ),
  supplied(
    "bollard-supplied",
    "access-control",
    "bollards",
    "supplied",
    "Four stainless steel bollards raised in a line across a building forecourt, each with a reflective band below its black cap and set into a flush floor socket, separating the parking area from the entrance",
    "Bollards — lead image",
    "aspect-[6/5]",
  ),
  supplied(
    "full-height-turnstile-supplied",
    "access-control",
    "full-height-turnstiles",
    "supplied",
    "Two full height turnstiles side by side at a site boundary, each a floor-to-ceiling rotor of stainless steel bars in a stainless frame, with a card reader and a green direction arrow on the post beside each lane",
    "Full Height Turnstiles — lead image",
    "aspect-[6/5]",
  ),
  supplied(
    "flap-barrier-supplied",
    "access-control",
    "flap-barriers",
    "supplied",
    "Three flap barrier lanes in a building lobby, each a pair of stainless cabinets with retracting glass panels, a card reader on the top surface and a green direction arrow on the side",
    "Flap Barriers — lead image",
    "aspect-[6/5]",
  ),
  supplied(
    "tripod-turnstile-supplied",
    "access-control",
    "tripod-turnstiles",
    "supplied",
    "Three tripod turnstiles in a building lobby, each a stainless cabinet carrying a three-armed rotor, with a card reader on the top surface, a lit green band along the edge and a green direction arrow on the side",
    "Tripod Turnstiles — lead image",
    "aspect-[6/5]",
  ),
  supplied(
    "swing-doors-supplied",
    "entrance-automation",
    "automatic-swing-doors",
    "supplied",
    "A pair of glazed automatic swing doors standing open at a building entrance, each leaf driven by an articulated arm from an operator in the header above, with an accessibility press-to-open plate on the wall alongside",
    "Automatic Swing Doors — lead image",
    "aspect-[6/5]",
  ),
  supplied(
    "auto-sliding-doors-supplied",
    "entrance-automation",
    "automatic-sliding-glass-doors",
    "supplied",
    "A bi-parting automatic sliding glass door at a building entrance, two glazed leaves meeting at the centre between fixed side screens, with the operator header above carrying a motion sensor and the reception beyond visible through the glass",
    "Automatic Sliding Glass Doors — lead image",
    "aspect-[6/5]",
  ),
  // ------------------------------- supplied renders, other families
  supplied(
    "sectional-overhead-supplied",
    "industrial-doors",
    "industrial-sectional-overhead-doors",
    "supplied",
    "A white insulated sectional overhead door part raised inside a warehouse, its panels tracked up under the roof on torsion-spring gear, a row of glazed vision panels across one section and a control panel with emergency stop on the jamb, looking out to a loading yard",
    "Industrial Sectional Overhead Doors — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "garage-aluminium-supplied",
    "industrial-doors",
    "aluminium-garage-doors",
    "supplied",
    "A pair of full-view aluminium sectional doors on a house, each panel glazed the full width in a slim aluminium frame, the lit garage and a parked car visible through them at dusk",
    "Aluminium Garage Doors — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "garage-residential-supplied",
    "industrial-doors",
    "residential-garage-doors",
    "supplied",
    "Two grey sectional garage doors on a house, their horizontal panels broken by a row of small rectangular vision windows across the upper section",
    "Residential Garage Doors — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "fire-sliding-supplied",
    "fire-safety-doors",
    "fire-rated-sliding-doors",
    "supplied",
    "A single-leaf steel sliding door on an overhead track across an internal warehouse opening, the leaf part open with the warehouse beyond visible, a recessed flush handle in its face and a control station on the wall beside it",
    "Fire Rated Sliding Doors — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "fire-shutter-supplied",
    "fire-safety-doors",
    "fire-rated-rolling-shutters",
    "supplied",
    "A steel rolling shutter descended across an opening in a concrete wall with fire visible in the compartment behind it, an alarm sounder and a sign reading fire rated door on the wall alongside",
    "Fire Rated Rolling Shutters — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "dock-shelter-supplied",
    "loading-bay",
    "dock-shelters-and-houses",
    "supplied",
    "A row of three loading bays on a distribution building, each framed by a black inflatable dock shelter around a sectional door, with a trailer reversed onto the bay at the end of the row",
    "Dock Shelters & Dock Houses — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "dock-leveller-supplied",
    "loading-bay",
    "dock-levellers",
    "supplied",
    "A dock leveller extended out from a loading bay, its chequer-plate platform and hinged lip bridging from the dock edge, with the hydraulic frame beneath it and the warehouse floor visible through the open bay",
    "Dock Levellers — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "gate-retractable-supplied",
    "automatic-gates",
    "retractable-gates",
    "supplied",
    "An aluminium retractable gate extended across an industrial site entrance, its lattice of scissor links carried on castors along the ground with a powered drive column and beacon at the leading edge",
    "Retractable Gates — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "gate-telescopic-supplied",
    "automatic-gates",
    "telescopic-sliding-gates",
    "supplied",
    "A dark grey telescopic sliding gate part open across a commercial entrance, three nested leaves each running on its own bogie along a floor track so the gate stacks into a shorter run than its opening",
    "Telescopic Sliding Gates — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "gate-swing-supplied",
    "automatic-gates",
    "automatic-swing-gates",
    "supplied",
    "A pair of dark grey swing gate leaves standing open at a residential entrance, each driven by an articulated arm operator mounted on the pier beside it",
    "Automatic Swing Gates — lead image",
    "aspect-[16/9]",
  ),
  supplied(
    "gate-sliding-supplied",
    "automatic-gates",
    "automatic-sliding-gates",
    "supplied",
    "A dark grey sliding gate closed across a driveway, its horizontal slatted infill louvred so the garden shows through, running on a floor track with a rack-driven gate operator at the near pier",
    "Automatic Sliding Gates — lead image",
    "aspect-[16/9]",
  ),

  // High Speed Fold-Up Door. The lead image is the company's own render;
  // the generated package below it stands in until the rest is photographed.
  supplied(
    "hsd-fold-up-supplied",
    "high-speed-doors",
    "high-speed-fold-up-door",
    "supplied",
    "A blue high speed fold-up door in the elevation of a warehouse, the curtain gathered into horizontal folds on black lifting straps beneath a stainless head box, with vision panels across the middle of the curtain and a forklift working inside",
    "High Speed Fold-Up Door — lead image",
  ),
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
