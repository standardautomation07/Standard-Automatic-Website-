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

/**
 * One view from a generated package for a product outside High Speed Doors.
 * Same provenance and caveat as `generated` — an interim visualisation built
 * to a written master definition, to be replaced by installation photography
 * under the same filename — with the family folder made explicit. `fit`
 * defaults to cover; a wide elevation that must not be cropped passes
 * "contain".
 */
function visualised(
  id: string,
  family: string,
  product: string,
  view: string,
  alt: string,
  association: string,
  definition: string,
  fit: "cover" | "contain" = "cover",
): ImageRef {
  return {
    id,
    src: `/images/products/${family}/${product}/${product}-${view}.webp`,
    alt,
    source: `Standard Automation — AI-generated product visualisation, built to the master visual definition in ${definition}`,
    usage: VISUALISATION,
    association,
    fit,
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
  stock("family-automatic-gates", "gates-industrial.jpg", "A factory floor with yellow safety railings around conveyor lines", "Automatic Gates family"),
  stock("family-entrance-automation", "entrance-automation.jpg", "Glass pivot doors at an office entrance, photographed at night", "Entrance Automation family"),
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

  // High Speed Roll-Up Door — generated gallery views built to the master
  // visual definition taken from the supplied hero; the hero itself is untouched.
  visualised(
    "hsd-roll-up-angle",
    "high-speed-doors",
    "high-speed-roll-up-door",
    "angle",
    "A blue PVC high speed roll-up door seen from a three-quarter angle, closed, with its full-width clear vision band, brushed stainless hood and side guides, wall control box and yellow-and-black bollards",
    "High Speed Roll-Up Door — three-quarter view",
    "research/roll-up-door-visual-definition.md",
  ),
  visualised(
    "hsd-roll-up-operational",
    "high-speed-doors",
    "high-speed-roll-up-door",
    "operational",
    "A blue PVC high speed roll-up door two-thirds open, the curtain rolled up into its stainless hood, with a second warehouse zone and pallet racking visible through the clear opening",
    "High Speed Roll-Up Door — in operation",
    "research/roll-up-door-visual-definition.md",
  ),
  visualised(
    "hsd-roll-up-controls",
    "high-speed-doors",
    "high-speed-roll-up-door",
    "controls",
    "Close-up of the wall-mounted control box beside a high speed roll-up door, with display, push buttons and red emergency stop, a yellow-and-black bollard in the foreground and the blue curtain and stainless guide behind",
    "High Speed Roll-Up Door — operator controls",
    "research/roll-up-door-visual-definition.md",
  ),

  visualised(
    "shutter-vision-hero",
    "rolling-shutters",
    "vision-window-rolling-shutters",
    "hero",
    "European exterior window roller shutters on a modern white-rendered house: a large ground-floor window with its anthracite aluminium roller shutter lowered two-thirds, slim foam-filled slats running in aluminium guide rails beneath a compact shutter box above the window, warm light beneath the curtain, a neighbouring window with its shutter raised and an upper window fully closed, in soft evening light",
    "Vision / Window Rolling Shutter — lead image",
    "research/vision-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-gi-solid-hero",
    "rolling-shutters",
    "galvanized-steel-rolling-shutters",
    "hero",
    "A galvanised steel rolling shutter closed across the loading opening of a light-grey clad factory shed, its spangled curved slats running between plain galvanised channel guides beneath a square galvanised hood, with a wall control station and red emergency stop at the jamb, yellow-and-black bollards and a wet concrete forecourt",
    "GI Solid Rolling Shutter — lead image",
    "research/gi-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-insulated-hero",
    "rolling-shutters",
    "insulated-double-wall-rolling-shutters",
    "hero",
    "An insulated double-wall rolling shutter lowered to about two-thirds across the loading opening of a white-panelled temperature-controlled logistics building, its thick spangled galvanised slats running between black guides with rubber seals beneath a stainless hood, cool interior light beneath the bottom rail, a wall control station with red emergency stop at the jamb and yellow-and-black bollards on the concrete apron",
    "Insulated Rolling Shutter — lead image",
    "research/insulated-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-windproof-hero",
    "rolling-shutters",
    "windproof-rolling-shutters",
    "hero",
    "A large wind-resistant industrial rolling shutter closed across the opening of a dark-grey clad logistics building at a harbour under a heavy grey sky: a curtain of flat silver-grey slats running in heavy box-section guide columns beneath a matching flat hood, a wall control station with a red emergency stop at the jamb, a wet concrete apron and harbour cranes on the horizon",
    "Windproof / Storm-Resistant Rolling Shutter — lead image",
    "research/windproof-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-galvalume-hero",
    "rolling-shutters",
    "galvalume-rolling-shutters",
    "hero",
    "A Galvalume steel rolling shutter lowered to about two-thirds across the loading entrance of a modern light-grey clad logistics building, its smooth silvery-matte curved slats running between matching guides beneath a plain hood, warm interior light beneath the curtain, a wall control station with red emergency stop at the jamb and yellow-and-black bollards on the concrete apron",
    "Galvalume Rolling Shutter — lead image",
    "research/galvalume-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-grille-hero",
    "rolling-shutters",
    "grille-rolling-shutters",
    "hero",
    "A rolling grille of horizontal aluminium rods joined by cast links in a brick-bond pattern closed across the wide entrance of a premium mall store, the lit interior visible through it, between aluminium guides beneath a plain hood with a solid bottom rail on a polished stone floor",
    "Rolling Grille — lead image",
    "research/grille-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-polycarbonate-hero",
    "rolling-shutters",
    "polycarbonate-rolling-shutters",
    "hero",
    "A transparent polycarbonate rolling shutter closed across the entrance of a premium boutique at dusk, its clear curved slats joined by slim aluminium profiles showing the lit interior through the curtain, between stainless guides beneath a brushed stainless hood with an aluminium bottom rail on a polished stone floor",
    "Transparent Rolling Shutter — lead image",
    "research/polycarbonate-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-perforated-hero",
    "rolling-shutters",
    "perforated-rolling-shutters",
    "hero",
    "A perforated steel rolling shutter closed across the glazed entrance of a premium retail store at dusk, its satin silver-grey curved slats punched with a dense pattern of small round holes through which the lit shop interior glows, between matching guides beneath a plain hood, with a small control station at the jamb and a wide paved pavement in front",
    "Perforated Rolling Shutter — lead image",
    "research/perforated-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-stainless-hero",
    "rolling-shutters",
    "stainless-steel-rolling-shutters",
    "hero",
    "A brushed stainless steel rolling shutter lowered to about two-thirds across the wide entrance of a premium automobile showroom at dusk, its satin-grained curved slats catching soft reflections between stainless guide channels beneath a plain stainless hood, warm showroom light spilling beneath the curtain onto dark polished stone paving under a deep cantilevered concrete canopy",
    "Stainless Steel Rolling Shutter — lead image",
    "research/stainless-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-aluminium-hero",
    "rolling-shutters",
    "aluminium-rolling-shutters",
    "hero",
    "A satin anodised aluminium rolling shutter closed across a stone-clad showroom entrance, its smooth double-wall slats running between anodised guides beneath a plain aluminium hood, with a wall control station and red emergency stop at the jamb, yellow-and-black bollards and a paved forecourt in soft evening light",
    "Aluminium Rolling Shutter — lead image",
    "research/aluminium-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-ms-solid-hero",
    "rolling-shutters",
    "ms-solid-rolling-shutters",
    "hero",
    "A dark graphite-grey mild steel rolling shutter closed across the loading opening of a light-grey clad warehouse, its curved interlocking slats running between dark grey channel guides beneath a plain square hood, with a wall control station and red emergency stop at the jamb, yellow-and-black bollards and a wet concrete forecourt",
    "MS Solid Rolling Shutter — lead image",
    "research/ms-solid-shutter-visual-definition.md",
  ),
  visualised(
    "hsd-cold-store-hero",
    "high-speed-doors",
    "high-speed-cold-storage-freezer-door",
    "hero",
    "A royal-blue high speed insulated cold storage door lowered to about two-thirds across an opening in the white insulated-panel wall of a chilled warehouse, its quilted curtain with a full-width clear vision band running in stainless guide columns with thick black thermal seals beneath a plain stainless hood, cool-lit racking and a light haze of cold air visible beneath the insulated bottom bar, a line of frost along the sill, a wall control station with display and red emergency stop beside the guide and yellow-and-black bollards",
    "High Speed Cold Storage / Freezer Door — lead image",
    "research/cold-storage-door-visual-definition.md",
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
  visualised(
    "hsd-spiral-hero",
    "high-speed-doors",
    "high-speed-spiral-door",
    "hero",
    "A silver high speed spiral door lowered to about two-thirds across the loading opening of a light-grey clad factory, its rigid aluminium panels alternating solid and glazed rows between silver guide columns beneath a plain brushed stainless hood, the lit warehouse showing beneath the black safety edge, a wall control station with display and red emergency stop beside the guide and yellow-and-black bollards on the concrete apron",
    "High Speed Spiral Door — lead image",
    "research/spiral-door-visual-definition.md",
  ),
  visualised(
    "hsd-self-repairing-hero",
    "high-speed-doors",
    "high-speed-self-repairing-door",
    "hero",
    "A safety-yellow high speed self-repairing door lowered to about two-thirds across a wide internal warehouse opening, its taut PVC curtain with a full-width clear vision band running in brushed stainless guide columns with flexible black retention channels beneath a plain stainless hood, the lit hall visible beneath the bottom rail, a wall control station with display and red emergency stop beside the guide and yellow-and-black bollards on the polished concrete floor",
    "High Speed Self-Repairing Door — lead image",
    "research/self-repairing-door-visual-definition.md",
  ),
  // High Speed Self-Repairing Door — generated gallery views built to the
  // master visual definition taken from the supplied hero; the hero is untouched.
  visualised(
    "hsd-self-repairing-angle",
    "high-speed-doors",
    "high-speed-self-repairing-door",
    "angle",
    "A yellow PVC high speed self-repairing door seen from a three-quarter angle, closed, with its full-width clear vision band, brushed stainless hood and guide columns, wall control box and yellow-and-black bollards",
    "High Speed Self-Repairing Door — three-quarter view",
    "research/self-repairing-door-visual-definition.md",
  ),
  visualised(
    "hsd-self-repairing-curtain",
    "high-speed-doors",
    "high-speed-self-repairing-door",
    "curtain",
    "Close-up of the yellow reinforced PVC curtain of a high speed self-repairing door, showing the woven scrim texture under the coating, a welded horizontal reinforcing seam and the aluminium edge strip of the clear vision band",
    "High Speed Self-Repairing Door — curtain construction",
    "research/self-repairing-door-visual-definition.md",
  ),
  visualised(
    "hsd-self-repairing-mechanism",
    "high-speed-doors",
    "high-speed-self-repairing-door",
    "mechanism",
    "Close-up of the self-repairing guide of a high speed door: the yellow curtain's edge bead has released from the black flexible channel in the stainless guide over a short section after impact, the curtain bowing away undamaged while above and below the bead remains seated",
    "High Speed Self-Repairing Door — curtain release from the flexible guide",
    "research/self-repairing-door-visual-definition.md",
  ),
  visualised(
    "hsd-self-repairing-guide",
    "high-speed-doors",
    "high-speed-self-repairing-door",
    "guide",
    "Bottom corner of a high speed self-repairing door: the aluminium bottom rail with its black soft floor seal, the foot of the stainless guide column bolted to the floor, and the curtain's edge bead running in the black flexible guide channel",
    "High Speed Self-Repairing Door — bottom rail, seal and guide detail",
    "research/self-repairing-door-visual-definition.md",
  ),
  visualised(
    "hsd-self-repairing-header",
    "high-speed-doors",
    "high-speed-self-repairing-door",
    "header",
    "Top corner of a high speed self-repairing door: the plain stainless hood over the roller, the flared re-entry mouth at the head of the guide that re-threads the curtain edge, and the geared electric operator on the roller shaft end",
    "High Speed Self-Repairing Door — hood, guide re-entry mouth and operator",
    "research/self-repairing-door-visual-definition.md",
  ),

  // High Speed Spiral Door — generated gallery views built to the master
  // visual definition taken from the supplied hero; the hero is untouched.
  visualised(
    "hsd-spiral-angle",
    "high-speed-doors",
    "high-speed-spiral-door",
    "angle",
    "A high speed spiral door on an external factory entrance seen from a three-quarter angle, closed: silver anodised aluminium panels alternating with full-width glazed rows, stainless hood with the spiral end plate at its right, guide columns, control box and yellow-and-black bollards",
    "High Speed Spiral Door — three-quarter view",
    "research/spiral-door-visual-definition.md",
  ),
  visualised(
    "hsd-spiral-panels",
    "high-speed-doors",
    "high-speed-spiral-door",
    "panels",
    "Close-up of the leaf of a high speed spiral door: rigid silver anodised aluminium panels alternating with clear glazed panels in slim silver frames, hinged along fine joint lines with black seals",
    "High Speed Spiral Door — panel construction",
    "research/spiral-door-visual-definition.md",
  ),
  visualised(
    "hsd-spiral-spiral",
    "high-speed-doors",
    "high-speed-spiral-door",
    "spiral",
    "Side of the head of a high speed spiral door with the hood end cover removed: the round steel side plate with its machined spiral groove, the panel-end rollers running in the outer turn of the track and the leaf entering from the guide column below",
    "High Speed Spiral Door — spiral guide mechanism",
    "research/spiral-door-visual-definition.md",
  ),
  visualised(
    "hsd-spiral-guide",
    "high-speed-doors",
    "high-speed-spiral-door",
    "guide",
    "Bottom corner of a closed high speed spiral door: the leading aluminium panel with its black rubber safety edge on the concrete, a glazed panel above, and the foot of the guide column bolted to the plinth with its black seal",
    "High Speed Spiral Door — guide and bottom seal detail",
    "research/spiral-door-visual-definition.md",
  ),

  // High Speed Fold-Up Door — generated gallery views built to the master
  // visual definition taken from the supplied hero; the hero is untouched.
  visualised(
    "hsd-fold-up-angle",
    "high-speed-doors",
    "high-speed-fold-up-door",
    "angle",
    "A high speed fold-up door on an external factory entrance seen from a three-quarter angle, closed: blue reinforced PVC curtain with horizontal wind-bar ridges, two black lifting straps and a row of three vision windows, under a plain stainless hood between black steel guides, with control box and yellow-and-black bollards",
    "High Speed Fold-Up Door — three-quarter view",
    "research/fold-up-door-visual-definition.md",
  ),
  visualised(
    "hsd-fold-up-curtain",
    "high-speed-doors",
    "high-speed-fold-up-door",
    "curtain",
    "Close-up of the blue reinforced PVC curtain of a high speed fold-up door: the rounded ridge of a wind-bar pocket, a black woven lifting strap crossing it, the welded edge of a clear vision window and the fabric's woven scrim texture",
    "High Speed Fold-Up Door — curtain construction",
    "research/fold-up-door-visual-definition.md",
  ),
  visualised(
    "hsd-fold-up-folding",
    "high-speed-doors",
    "high-speed-fold-up-door",
    "folding",
    "Head of an open high speed fold-up door seen from below: the blue curtain gathered into a stack of horizontal folds around its wind bars under the stainless hood, the two black lifting straps taut down the face of the stack, the bottom bar with its safety edge lowest, wind-bar end rollers in the black side guides",
    "High Speed Fold-Up Door — folding mechanism",
    "research/fold-up-door-visual-definition.md",
  ),
  visualised(
    "hsd-fold-up-guide",
    "high-speed-doors",
    "high-speed-fold-up-door",
    "guide",
    "Bottom corner of a closed high speed fold-up door: the bottom bar in the lowest curtain pocket with its black rubber safety edge on the concrete, a wind-bar ridge and lifting strap above, and the foot of the black steel guide column bolted to the plinth where the curtain edge enters the guide",
    "High Speed Fold-Up Door — guide and bottom seal detail",
    "research/fold-up-door-visual-definition.md",
  ),
  visualised(
    "hsd-fold-up-drive",
    "high-speed-doors",
    "high-speed-fold-up-door",
    "drive",
    "Top corner of a high speed fold-up door: the plain stainless hood with the geared electric drive motor on the strap drum shaft and its conduit, the blue curtain with wind-bar ridges and a lifting strap running up into the hood beside the black guide column",
    "High Speed Fold-Up Door — hood and drive",
    "research/fold-up-door-visual-definition.md",
  ),

  // High Speed Rigid / Insulated Door — generated gallery views built to the
  // master visual definition taken from the supplied hero; the hero is untouched.
  visualised(
    "hsd-rigid-angle",
    "high-speed-doors",
    "high-speed-rigid-insulated-door",
    "angle",
    "A high speed rigid insulated door in a warehouse opening seen from a three-quarter angle, closed: smooth blue double-skin panels joined by slim aluminium profiles, a full-width glazed vision row, a plain stainless hood, black steel guide columns, control box and bollards",
    "High Speed Rigid / Insulated Door — three-quarter view",
    "research/rigid-insulated-door-visual-definition.md",
  ),
  visualised(
    "hsd-rigid-panels",
    "high-speed-doors",
    "high-speed-rigid-insulated-door",
    "panels",
    "Close-up of the leaf of a high speed rigid insulated door: two smooth blue double-skin panels meeting along a brushed-aluminium joint profile with a black seal, and the aluminium-framed glazed vision panel with a slim mullion below",
    "High Speed Rigid / Insulated Door — panel construction",
    "research/rigid-insulated-door-visual-definition.md",
  ),
  visualised(
    "hsd-rigid-guide",
    "high-speed-doors",
    "high-speed-rigid-insulated-door",
    "guide",
    "Close-up of the side guide of a high speed rigid insulated door: the ends of two blue insulated panels entering the black steel guide column, each carrying a guide roller on a short axle running in the channel, with the aluminium joint profile between them and a black side seal",
    "High Speed Rigid / Insulated Door — side guide and panel connection",
    "research/rigid-insulated-door-visual-definition.md",
  ),
  visualised(
    "hsd-rigid-drive",
    "high-speed-doors",
    "high-speed-rigid-insulated-door",
    "drive",
    "Top corner of a high speed rigid insulated door: the plain stainless hood with the geared electric drive motor on the shaft end and its conduit, the top blue panel with its aluminium joint profile running in the black guide column",
    "High Speed Rigid / Insulated Door — hood and drive",
    "research/rigid-insulated-door-visual-definition.md",
  ),
  visualised(
    "hsd-rigid-section",
    "high-speed-doors",
    "high-speed-rigid-insulated-door",
    "section",
    "A cut sample of a high speed rigid insulated door panel on a bench: blue metal outer and inner skins with the rigid polyurethane foam insulation core filling the thickness between them, and aluminium joint profiles along the top and bottom edges",
    "High Speed Rigid / Insulated Door — insulated panel construction",
    "research/rigid-insulated-door-visual-definition.md",
  ),

  // MS Solid Rolling Shutter — generated gallery views built to the master
  // visual definition; generated with the hero and a supplied reference photo
  // as image inputs so the shutter and its drive stay identical across views.
  visualised(
    "shutter-ms-solid-elevation",
    "rolling-shutters",
    "ms-solid-rolling-shutters",
    "elevation",
    "Front elevation of a closed dark grey mild steel rolling shutter: curved interlocking slats between channel guides, the head box with its geared motor at the right-hand end, hand chain and red and green pull cords beside the guide, the wall control box, and the bottom rail on the hatched concrete apron",
    "MS Solid Rolling Shutter — front elevation",
    "research/ms-solid-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-ms-solid-half-open",
    "rolling-shutters",
    "ms-solid-rolling-shutters",
    "half-open",
    "A dark grey mild steel rolling shutter half open, seen square on: the curtain raised to mid height into the head box, the warehouse floor and racking visible through the opening, with the motor, hand chain, pull cords and control box at the right",
    "MS Solid Rolling Shutter — half open",
    "research/ms-solid-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-ms-solid-slat-profile",
    "rolling-shutters",
    "ms-solid-rolling-shutters",
    "slat-profile",
    "Close-up along the edge of a mild steel rolling shutter curtain at the guide: the ends of the curved slats seen in profile, each rolled edge hooked into the slat below, with the hand chain and pull cords beside the guide",
    "MS Solid Rolling Shutter — slat profile and interlock",
    "research/ms-solid-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-ms-solid-bottom-rail",
    "rolling-shutters",
    "ms-solid-rolling-shutters",
    "bottom-rail",
    "The bottom of a closed mild steel rolling shutter seen square on: the straight bottom rail flat on the concrete with its keyed lock and pull handle, the lowest curved slats above, the hand chain and pull cords at the left guide and a bollard at the edge",
    "MS Solid Rolling Shutter — bottom rail and lock",
    "research/ms-solid-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-ms-solid-drive",
    "rolling-shutters",
    "ms-solid-rolling-shutters",
    "drive",
    "The drive end of a motorised mild steel rolling shutter: the geared motor unit on the right-hand end of the head box, the hand chain and red and green pull cords hanging beside the guide, and the wall control box with display, push buttons and emergency stop, with the closed curtain at the left",
    "MS Solid Rolling Shutter — motor, chain and control box",
    "research/ms-solid-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-ms-solid-site",
    "rolling-shutters",
    "ms-solid-rolling-shutters",
    "site",
    "A dark grey mild steel rolling shutter installed on a clad industrial building, seen from a three-quarter angle: head box with motor, hand chain and pull cords, control box, both bollards and the hatched apron",
    "MS Solid Rolling Shutter — installed",
    "research/ms-solid-shutter-visual-definition.md",
  ),

  // Perforated Rolling Shutter — generated gallery views; the hero and the
  // supplied MS shutter reference were attached to every prompt as image inputs.
  visualised(
    "shutter-perforated-angle",
    "rolling-shutters",
    "perforated-rolling-shutters",
    "angle",
    "A brushed stainless perforated rolling shutter closed across a showroom front, seen from a three-quarter angle: curved slats with staggered round perforations, stainless head box with the motor at its right-hand end, hand chain and pull cords beside the guide, and yellow-and-black bollards",
    "Perforated Rolling Shutter — three-quarter view",
    "research/perforated-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-perforated-slats",
    "rolling-shutters",
    "perforated-rolling-shutters",
    "slats",
    "Extreme close-up of a perforated rolling shutter curtain: four curved brushed stainless slats with staggered rows of round perforations, joined by rolled interlocks, light from the showroom showing through the holes",
    "Perforated Rolling Shutter — perforation and slat interlock",
    "research/perforated-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-perforated-bottom-rail",
    "rolling-shutters",
    "perforated-rolling-shutters",
    "bottom-rail",
    "Bottom corner of a closed perforated rolling shutter: the channel guide holding the perforated slat ends, the brushed stainless bottom rail on the paving with its lock, the guide foot bolted down, and the hand chain and pull cords beside the guide",
    "Perforated Rolling Shutter — guide and bottom rail",
    "research/perforated-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-perforated-drive",
    "rolling-shutters",
    "perforated-rolling-shutters",
    "drive",
    "The drive end of a motorised perforated rolling shutter: the enclosed geared motor unit on the end of the stainless head box, the hand chain and red and green pull cords beside the guide, and the wall control box with display, push buttons and emergency stop",
    "Perforated Rolling Shutter — motor, chain and control box",
    "research/perforated-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-perforated-site",
    "rolling-shutters",
    "perforated-rolling-shutters",
    "site",
    "A perforated rolling shutter closed on a showroom front, seen square on: stainless head box, perforated curtain, guides, motor with chain and cords, control box and bollards beside the glazed shop window",
    "Perforated Rolling Shutter — installed",
    "research/perforated-shutter-visual-definition.md",
  ),

  // Rolling Grille — generated gallery views; the hero and the supplied MS
  // shutter reference were attached to every prompt as image inputs.
  visualised(
    "shutter-grille-angle",
    "rolling-shutters",
    "grille-rolling-shutters",
    "angle",
    "A stainless rolling grille closed across a showroom front, seen from a three-quarter angle: horizontal rods with staggered vertical links in a brick pattern, stainless head box with the motor at its right-hand end, hand chain and pull cords beside the guide, and yellow-and-black bollards",
    "Rolling Grille — three-quarter view",
    "research/grille-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-grille-pattern",
    "rolling-shutters",
    "grille-rolling-shutters",
    "pattern",
    "Extreme close-up of a rolling grille curtain: round stainless rods joined by short vertical links with rolled eyes, staggered in a brick pattern, the showroom softly out of focus behind",
    "Rolling Grille — rod-and-link pattern",
    "research/grille-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-grille-bottom-rail",
    "rolling-shutters",
    "grille-rolling-shutters",
    "bottom-rail",
    "Bottom corner of a closed rolling grille: the channel guide holding the rod ends, the stainless bottom rail on the paving with its lock, the guide foot bolted down, and the hand chain and red and green pull cords beside the guide",
    "Rolling Grille — guide and bottom rail",
    "research/grille-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-grille-drive",
    "rolling-shutters",
    "grille-rolling-shutters",
    "drive",
    "The drive end of a motorised rolling grille: the geared motor unit on the end of the stainless head box, the hand chain and red and green pull cords beside the guide, and the wall control box with display, push buttons and emergency stop, with the rod-and-link curtain at the left",
    "Rolling Grille — motor, chain and control box",
    "research/grille-shutter-visual-definition.md",
  ),

  // Transparent Polycarbonate Rolling Shutter — generated gallery views; the hero
  // and the supplied MS shutter reference were attached to every prompt as image inputs.
  visualised(
    "shutter-polycarbonate-angle",
    "rolling-shutters",
    "polycarbonate-rolling-shutters",
    "angle",
    "A transparent polycarbonate rolling shutter closed across a showroom front, seen from a three-quarter angle: clear curved slats joined by slim aluminium connectors with the lit display visible through them, stainless head box with the motor at its right-hand end, hand chain and pull cords beside the guide, and yellow-and-black bollards",
    "Transparent Polycarbonate Rolling Shutter — three-quarter view",
    "research/polycarbonate-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-polycarbonate-slats",
    "rolling-shutters",
    "polycarbonate-rolling-shutters",
    "slats",
    "Extreme close-up of a transparent polycarbonate rolling shutter curtain: clear curved slats seated in slim brushed-aluminium connector profiles, light refracting through the polycarbonate, the showroom softly out of focus behind",
    "Transparent Polycarbonate Rolling Shutter — slat and connector detail",
    "research/polycarbonate-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-polycarbonate-bottom-rail",
    "rolling-shutters",
    "polycarbonate-rolling-shutters",
    "bottom-rail",
    "Bottom corner of a closed transparent polycarbonate rolling shutter: the channel guide holding the clear slat ends and their aluminium connectors, the brushed aluminium bottom rail on the paving with its lock, the guide foot bolted down, and the hand chain and pull cords beside the guide",
    "Transparent Polycarbonate Rolling Shutter — guide and bottom rail",
    "research/polycarbonate-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-polycarbonate-drive",
    "rolling-shutters",
    "polycarbonate-rolling-shutters",
    "drive",
    "The drive end of a motorised transparent polycarbonate rolling shutter: the enclosed geared motor unit on the end of the stainless head box, the hand chain and red and green pull cords beside the guide, and the wall control box with display and emergency stop, with the clear curtain at the left",
    "Transparent Polycarbonate Rolling Shutter — motor, chain and control box",
    "research/polycarbonate-shutter-visual-definition.md",
  ),

  // Automatic Sliding Gates — generated gallery views; the hero was attached to
  // every prompt as the image input so the gate and operator stay identical.
  visualised(
    "gate-sliding-angle",
    "automatic-gates",
    "automatic-sliding-gates",
    "angle",
    "An automatic sliding gate seen from the driveway at a three-quarter angle, the anthracite slatted leaf a third open and sliding behind the boundary wall, with the operator on its plinth, the rack along the bottom rail and the ground track in view",
    "Automatic Sliding Gates — three-quarter view, leaf part open",
    "research/sliding-gate-visual-definition.md",
  ),
  visualised(
    "gate-sliding-track",
    "automatic-gates",
    "automatic-sliding-gates",
    "track",
    "Ground-level close-up of a sliding gate's lower mechanism: the steel ground track flush in the paving, grooved wheels under the gate's bottom rail running on it, and the toothed rack bolted along the rail",
    "Automatic Sliding Gates — track, wheels and rack",
    "research/sliding-gate-visual-definition.md",
  ),
  visualised(
    "gate-sliding-operator",
    "automatic-gates",
    "automatic-sliding-gates",
    "operator",
    "The automatic sliding-gate operator, a compact grey housing bolted to a concrete plinth beside the leaf with the rack on the gate's bottom rail running behind it, the manual release cover on the front and the ground track beneath",
    "Automatic Sliding Gates — operator",
    "research/sliding-gate-visual-definition.md",
  ),
  visualised(
    "gate-sliding-controls",
    "automatic-gates",
    "automatic-sliding-gates",
    "controls",
    "Control and safety hardware at a sliding gate post: a photocell sensor mounted low on the anthracite post, the access reader plate on the white pillar and a small control enclosure with antenna near the operator",
    "Automatic Sliding Gates — photocell, reader and control enclosure",
    "research/sliding-gate-visual-definition.md",
  ),
  visualised(
    "gate-sliding-site",
    "automatic-gates",
    "automatic-sliding-gates",
    "site",
    "A complete automatic sliding gate installation seen from the street, gate closed: the anthracite slatted leaf between white pillars, the operator on its plinth, the ground track, planting and the modern house behind",
    "Automatic Sliding Gates — installed entrance",
    "research/sliding-gate-visual-definition.md",
  ),

  // Automatic Swing Gates — generated gallery views; the hero was attached to
  // every prompt as the image input so the gate and operators stay identical.
  visualised(
    "gate-swing-angle",
    "automatic-gates",
    "automatic-swing-gates",
    "angle",
    "An automatic double-leaf swing gate seen from the street at a three-quarter angle, both anthracite slatted leaves half open and swinging inward, with a linear ram operator on each white pillar reaching to its leaf",
    "Automatic Swing Gates — three-quarter view, leaves half open",
    "research/swing-gate-visual-definition.md",
  ),
  visualised(
    "gate-swing-operator",
    "automatic-gates",
    "automatic-swing-gates",
    "operator",
    "Close-up of a linear ram swing-gate operator: the grey and silver actuator body on its pillar bracket, the chrome rod extending to the bracket bolted to the anthracite leaf, and the manual release cover",
    "Automatic Swing Gates — linear ram operator",
    "research/swing-gate-visual-definition.md",
  ),
  visualised(
    "gate-swing-hinge",
    "automatic-gates",
    "automatic-swing-gates",
    "hinge",
    "The hinge side of an automatic swing gate leaf: black hinges carrying the anthracite leaf on its post beside the white pillar, with the ram operator running from its pillar bracket along the leaf to the front bracket, the leaf slightly open",
    "Automatic Swing Gates — hinge and operator connection",
    "research/swing-gate-visual-definition.md",
  ),
  visualised(
    "gate-swing-controls",
    "automatic-gates",
    "automatic-swing-gates",
    "controls",
    "Control and safety hardware on a swing gate pillar: a keypad and reader plate at hand height, a small control enclosure with antenna above, and a photocell sensor mounted low facing across the opening",
    "Automatic Swing Gates — keypad, control enclosure and photocell",
    "research/swing-gate-visual-definition.md",
  ),
  visualised(
    "gate-swing-site",
    "automatic-gates",
    "automatic-swing-gates",
    "site",
    "A complete automatic swing gate installation seen from the street, both leaves fully open with the operators on the pillars, the drive leading to a modern house between white walls and planting",
    "Automatic Swing Gates — installed entrance, leaves open",
    "research/swing-gate-visual-definition.md",
  ),

  // Retractable Gates — generated gallery views; the hero was attached to every
  // prompt as the image input so the lattice, wheels and head unit stay identical.
  visualised(
    "gate-retractable-angle",
    "automatic-gates",
    "retractable-gates",
    "angle",
    "A motorised retractable gate seen along its length from the forecourt, the stainless folding lattice half retracted: the sections near the end post compressed into a tight stack against the wall while those towards the head unit are still extended",
    "Retractable Gates — three-quarter view, lattice half retracted",
    "research/retractable-gate-visual-definition.md",
  ),
  visualised(
    "gate-retractable-lattice",
    "automatic-gates",
    "retractable-gates",
    "lattice",
    "Close-up of a retractable gate's folding lattice: brushed stainless square-tube uprights with black caps, the diagonal cross tubes crossing between them and the pivot rivets at each joint",
    "Retractable Gates — lattice structure and joints",
    "research/retractable-gate-visual-definition.md",
  ),
  visualised(
    "gate-retractable-wheels",
    "automatic-gates",
    "retractable-gates",
    "wheels",
    "Ground-level close-up of a retractable gate's wheel bases: the black base under each upright with its small wheels and orange guard running on the flush ground track, several bases in a row with the lattice rising above",
    "Retractable Gates — wheel bases and track",
    "research/retractable-gate-visual-definition.md",
  ),
  visualised(
    "gate-retractable-head-unit",
    "automatic-gates",
    "retractable-gates",
    "head-unit",
    "The leading head unit of a motorised retractable gate: the dark grey housing on its wheeled base with a light-grey control panel and amber beacon, and the joint where the last lattice section connects to it",
    "Retractable Gates — drive head unit and control panel",
    "research/retractable-gate-visual-definition.md",
  ),
  visualised(
    "gate-retractable-site",
    "automatic-gates",
    "retractable-gates",
    "site",
    "A motorised retractable gate fully extended across a wide factory entrance, seen from the road: the stainless lattice, the end post at the wall and the head unit with its beacon, the clad building behind",
    "Retractable Gates — installed, fully extended",
    "research/retractable-gate-visual-definition.md",
  ),

  // Telescopic Sliding Gates — generated gallery views; the hero was attached to
  // every prompt as the image input so the leaves, tracks and operator stay identical.
  visualised(
    "gate-telescopic-angle",
    "automatic-gates",
    "telescopic-sliding-gates",
    "angle",
    "A three-leaf telescopic sliding gate seen from the apron at a three-quarter angle, half open with the anthracite leaves nested side by side on their parallel tracks, the operator at the wall end and the posts in view",
    "Telescopic Sliding Gates — three-quarter view, leaves nested",
    "research/telescopic-gate-visual-definition.md",
  ),
  visualised(
    "gate-telescopic-leaves",
    "automatic-gates",
    "telescopic-sliding-gates",
    "leaves",
    "Close-up of the three overlapping leaves of a telescopic sliding gate: anthracite flat-panel leaves side by side on parallel tracks with their frame stiles stepped one behind another and the wheel carriages beneath",
    "Telescopic Sliding Gates — overlapping leaves",
    "research/telescopic-gate-visual-definition.md",
  ),
  visualised(
    "gate-telescopic-track",
    "automatic-gates",
    "telescopic-sliding-gates",
    "track",
    "Ground-level close-up of a telescopic gate's three parallel rails in the flush track channel, each leaf's black wheel carriage running on its own rail",
    "Telescopic Sliding Gates — parallel tracks and carriages",
    "research/telescopic-gate-visual-definition.md",
  ),
  visualised(
    "gate-telescopic-operator",
    "automatic-gates",
    "telescopic-sliding-gates",
    "operator",
    "The automatic operator of a telescopic sliding gate: a compact grey gear-motor housing on its concrete plinth against the leading leaf, the rack on the leaf's bottom rail running behind it, manual release cover on the front, tracks passing beneath",
    "Telescopic Sliding Gates — operator and rack",
    "research/telescopic-gate-visual-definition.md",
  ),
  visualised(
    "gate-telescopic-site",
    "automatic-gates",
    "telescopic-sliding-gates",
    "site",
    "A telescopic sliding gate fully closed across a wide office entrance seen from the road: three anthracite leaves extended end to end between posts with beacons, the operator at the wall and the glass-fronted building behind",
    "Telescopic Sliding Gates — installed, fully closed",
    "research/telescopic-gate-visual-definition.md",
  ),

  // Industrial Sectional Overhead Doors — generated gallery views; the hero was
  // attached to every prompt as the image input so the door stays identical.
  visualised(
    "sectional-overhead-angle",
    "industrial-doors",
    "industrial-sectional-overhead-doors",
    "angle",
    "An industrial sectional overhead door seen from inside the warehouse at a three-quarter angle, closed: five white insulated panels with a row of four windows, galvanised hinges and vertical tracks, the torsion shaft and black springs above the head, the control box and bollards",
    "Industrial Sectional Overhead Doors — three-quarter view, closed",
    "research/sectional-door-visual-definition.md",
  ),
  visualised(
    "sectional-overhead-panels",
    "industrial-doors",
    "industrial-sectional-overhead-doors",
    "joint",
    "Square-on close-up of a sectional door panel joint: two flush white insulated panels meeting along a level joint line, a galvanised intermediate hinge bolted across it and the corner of a black-framed window above",
    "Industrial Sectional Overhead Doors — panel joint and hinge",
    "research/sectional-door-visual-definition.md",
  ),
  visualised(
    "sectional-overhead-track",
    "industrial-doors",
    "industrial-sectional-overhead-doors",
    "track",
    "Close-up at the jamb of a sectional door: the galvanised end hinge with its roller running in the vertical track, the panel edges against the black jamb seal, and the track curving overhead",
    "Industrial Sectional Overhead Doors — track, roller and seal",
    "research/sectional-door-visual-definition.md",
  ),
  visualised(
    "sectional-overhead-mechanism",
    "industrial-doors",
    "industrial-sectional-overhead-doors",
    "mechanism",
    "The overhead mechanism of an industrial sectional door: galvanised torsion shaft in its brackets, black torsion springs, the cable drum with lifting cable, and the door operator on the shaft end with its chain override",
    "Industrial Sectional Overhead Doors — torsion shaft, springs and operator",
    "research/sectional-door-visual-definition.md",
  ),
  visualised(
    "sectional-overhead-site",
    "industrial-doors",
    "industrial-sectional-overhead-doors",
    "site",
    "An industrial sectional door two-thirds open seen from inside the warehouse, the upper panels travelling onto the horizontal overhead tracks under the roof while the lower panels remain in the vertical tracks, the loading yard visible through the opening",
    "Industrial Sectional Overhead Doors — door opening overhead",
    "research/sectional-door-visual-definition.md",
  ),

  // Aluminium Garage Doors — generated gallery views; the hero was attached to
  // every prompt as the image input so the door stays identical.
  visualised(
    "garage-aluminium-angle",
    "industrial-doors",
    "aluminium-garage-doors",
    "angle",
    "A full-view glazed aluminium sectional garage door seen from the driveway at a three-quarter angle, closed: four rows of satin silver aluminium sections with slim mullions and clear glazing on a modern residential garage at dusk",
    "Aluminium Garage Doors — three-quarter view, closed",
    "research/aluminium-garage-door-visual-definition.md",
  ),
  visualised(
    "garage-aluminium-section",
    "industrial-doors",
    "aluminium-garage-doors",
    "section",
    "Close-up of an aluminium garage door at a section joint: satin silver anodised aluminium rails meeting along a fine joint, a vertical mullion with glazing beads holding clear glass either side",
    "Aluminium Garage Doors — aluminium section and glazing detail",
    "research/aluminium-garage-door-visual-definition.md",
  ),
  visualised(
    "garage-aluminium-track",
    "industrial-doors",
    "aluminium-garage-doors",
    "track",
    "Inside view at the jamb of an aluminium garage door: a galvanised end hinge on the aluminium section edge with its roller in the powder-coated vertical track, the hinge across the section joint, and the track curving overhead",
    "Aluminium Garage Doors — hinge, roller and track",
    "research/aluminium-garage-door-visual-definition.md",
  ),
  visualised(
    "garage-aluminium-operator",
    "industrial-doors",
    "aluminium-garage-doors",
    "operator",
    "Inside view of an aluminium garage door's drive: the ceiling-mounted operator on its brackets, the drive rail and trolley arm connected to the top section, the torsion spring above the door head and the horizontal tracks, with the clear-glazed door below",
    "Aluminium Garage Doors — operator, rail and torsion spring",
    "research/aluminium-garage-door-visual-definition.md",
  ),
  visualised(
    "garage-aluminium-site",
    "industrial-doors",
    "aluminium-garage-doors",
    "site",
    "A glazed aluminium garage door two-thirds open at dusk, the upper sections travelling overhead into the garage while the lower sections remain in the vertical tracks, the lit empty garage visible through the opening",
    "Aluminium Garage Doors — door opening overhead",
    "research/aluminium-garage-door-visual-definition.md",
  ),

  // Residential Garage Doors — generated gallery views; the hero was attached to
  // every prompt as the image input so the door stays identical.
  visualised(
    "garage-residential-angle",
    "industrial-doors",
    "residential-garage-doors",
    "angle",
    "A silver-grey insulated steel sectional garage door seen from the driveway at a three-quarter angle, closed, with its fine horizontal groove lines and a row of four black-framed windows, on a contemporary house at dusk",
    "Residential Garage Doors — three-quarter view, closed",
    "research/residential-garage-door-visual-definition.md",
  ),
  visualised(
    "garage-residential-panels",
    "industrial-doors",
    "residential-garage-doors",
    "panels",
    "Square-on close-up of a residential garage door face: two flush silver-grey steel sections meeting along a level rounded joint, each with fine horizontal groove lines, and the lower edge of the black-framed windows above",
    "Residential Garage Doors — section joint and surface finish",
    "research/residential-garage-door-visual-definition.md",
  ),
  visualised(
    "garage-residential-track",
    "industrial-doors",
    "residential-garage-doors",
    "track",
    "Inside view at the jamb of a residential garage door: a galvanised end hinge on the section edge with its roller in the powder-coated vertical track, an intermediate hinge across the joint, the black jamb seal and the track curving overhead",
    "Residential Garage Doors — hinge, roller and track",
    "research/residential-garage-door-visual-definition.md",
  ),
  visualised(
    "garage-residential-operator",
    "industrial-doors",
    "residential-garage-doors",
    "operator",
    "Inside view of a residential garage door's drive: the ceiling-mounted operator at the end of its drive rail, the trolley arm to the top section with the release cord, the torsion spring above the door head and the horizontal tracks, with the silver-grey door and its window row below",
    "Residential Garage Doors — operator, rail and torsion spring",
    "research/residential-garage-door-visual-definition.md",
  ),
  visualised(
    "garage-residential-site",
    "industrial-doors",
    "residential-garage-doors",
    "site",
    "A contemporary house at dusk with one silver-grey sectional garage door two-thirds open, its upper sections travelling overhead into the lit empty garage while the lower sections remain in the tracks, and the second door closed beside it",
    "Residential Garage Doors — door opening on a contemporary house",
    "research/residential-garage-door-visual-definition.md",
  ),

  // Fire Rated Rolling Shutters — generated gallery views built to the heavy
  // fire-shutter construction in the definition; the supplied MS shutter
  // reference fixed the drive. No rating or certification is implied.
  visualised(
    "fire-shutter-installed",
    "fire-safety-doors",
    "fire-rated-rolling-shutters",
    "installed",
    "A fire rated rolling shutter closed across a large opening in a concrete compartment wall inside an industrial building: flat galvanised double-skin slats, the curtain coil on an exposed barrel between bolted steel end plates, heavy galvanised guides, the side motor with hand chain, a control box and yellow-and-black bollards",
    "Fire Rated Rolling Shutters — installed, closed",
    "research/fire-rated-shutter-visual-definition.md",
  ),
  visualised(
    "fire-shutter-guide-detail",
    "fire-safety-doors",
    "fire-rated-rolling-shutters",
    "guide-detail",
    "Close-up at the base of a fire rated rolling shutter guide: the heavy galvanised angle guide anchored to the concrete wall with large bolts, the flat galvanised slats with riveted end locks entering the guide, and the angle-section bottom bar resting on the floor",
    "Fire Rated Rolling Shutters — guide and bottom bar detail",
    "research/fire-rated-shutter-visual-definition.md",
  ),
  visualised(
    "fire-shutter-industrial-application",
    "fire-safety-doors",
    "fire-rated-rolling-shutters",
    "industrial-application",
    "A fire rated rolling shutter closed in a long concrete compartment wall dividing two production areas of a factory, with the curtain coil and end plates at the head, the side motor and chain, a control box, an alarm bell and a sprinkler pipe on the wall",
    "Fire Rated Rolling Shutters — fire compartment wall application",
    "research/fire-rated-shutter-visual-definition.md",
  ),

  // Fire Rated Sliding Doors — generated gallery views; the hero was attached to
  // every prompt as the image input. No rating or certification is implied.
  visualised(
    "fire-sliding-angle",
    "fire-safety-doors",
    "fire-rated-sliding-doors",
    "angle",
    "An industrial fire rated sliding door seen at a three-quarter angle inside a warehouse, the silver-grey steel leaf a third open on its bracketed overhead track with trolley hangers, header box, jamb frame, control box and bollards in view",
    "Fire Rated Sliding Doors — three-quarter view, leaf part open",
    "research/fire-rated-sliding-door-visual-definition.md",
  ),
  visualised(
    "fire-sliding-panel-section",
    "fire-safety-doors",
    "fire-rated-sliding-doors",
    "panel-section",
    "A cut sample of a fire rated sliding door panel on a bench: silver-grey painted steel skins on both faces with the rigid polyurethane foam insulation core between them and a galvanised steel edge channel",
    "Fire Rated Sliding Doors — PUF-insulated panel section",
    "research/fire-rated-sliding-door-visual-definition.md",
  ),
  visualised(
    "fire-sliding-track",
    "fire-safety-doors",
    "fire-rated-sliding-doors",
    "track",
    "Looking up at a fire rated sliding door's overhead track: the galvanised track on heavy wall brackets with steel trolley hangers and paired rollers bolted to the top edge of the silver-grey leaf",
    "Fire Rated Sliding Doors — track and trolley hangers",
    "research/fire-rated-sliding-door-visual-definition.md",
  ),
  visualised(
    "fire-sliding-closing-end",
    "fire-safety-doors",
    "fire-rated-sliding-doors",
    "closing-end",
    "The closing end of a fire rated sliding door: the grey header box on the track, the leaf's leading edge meeting the galvanised jamb frame, the floor guide at the base and the wall control box with emergency stop",
    "Fire Rated Sliding Doors — header box, jamb frame and floor guide",
    "research/fire-rated-sliding-door-visual-definition.md",
  ),
  visualised(
    "fire-sliding-site",
    "fire-safety-doors",
    "fire-rated-sliding-doors",
    "site",
    "An industrial fire rated sliding door installed in a light-grey clad compartment wall inside a warehouse, the leaf, overhead track, brackets, header box, control box and bollards all visible",
    "Fire Rated Sliding Doors — installed in a compartment wall",
    "research/fire-rated-sliding-door-visual-definition.md",
  ),

  // Automatic Sliding Glass Doors — generated gallery views; the hero was attached
  // to every prompt as the image input so the door stays identical.
  visualised(
    "auto-sliding-doors-angle",
    "entrance-automation",
    "automatic-sliding-glass-doors",
    "angle",
    "A bi-parting automatic sliding glass door at an office lobby entrance seen from a three-quarter angle, the two framed glass leaves parted half open beneath the satin-silver header with its activation sensor, fixed side lights either side",
    "Automatic Sliding Glass Doors — three-quarter view, leaves open",
    "research/sliding-glass-door-visual-definition.md",
  ),
  visualised(
    "auto-sliding-doors-frame",
    "entrance-automation",
    "automatic-sliding-glass-doors",
    "frame",
    "Close-up of an automatic sliding glass door's meeting stile: the slim satin-silver aluminium frame profile with the toughened glass seated in its gasket, the vertical brush seal on the stile and the floor guide track below",
    "Automatic Sliding Glass Doors — leaf frame and glazing detail",
    "research/sliding-glass-door-visual-definition.md",
  ),
  visualised(
    "auto-sliding-doors-sensor",
    "entrance-automation",
    "automatic-sliding-glass-doors",
    "sensor",
    "The activation sensor of an automatic sliding glass door: a small black sensor unit with its dark lens mounted on the face of the satin-silver header above the sliding leaves",
    "Automatic Sliding Glass Doors — activation sensor on the header",
    "research/sliding-glass-door-visual-definition.md",
  ),
  visualised(
    "auto-sliding-doors-site",
    "entrance-automation",
    "automatic-sliding-glass-doors",
    "site",
    "An office lobby entrance in the evening with the automatic sliding glass door parting as a person walks through hands-free, the framed glass leaves, header and side lights lit warmly from inside",
    "Automatic Sliding Glass Doors — hands-free entry at an office lobby",
    "research/sliding-glass-door-visual-definition.md",
  ),

  // Automatic Swing Doors — generated gallery views; the hero was attached to
  // every prompt as the image input so the doorset and operators stay identical.
  visualised(
    "swing-doors-angle",
    "entrance-automation",
    "automatic-swing-doors",
    "angle",
    "A pair of glazed aluminium automatic swing doors at an office lobby seen from a three-quarter angle, both leaves swung open by the surface-mounted operators and articulated arms on the transom, with stainless pull handles and butt hinges",
    "Automatic Swing Doors — three-quarter view, leaves open",
    "research/swing-door-visual-definition.md",
  ),
  visualised(
    "swing-doors-hinge",
    "entrance-automation",
    "automatic-swing-doors",
    "hinge",
    "Close-up of the hinge side of an automatic swing door: the aluminium jamb, a satin stainless butt hinge carrying the framed glass leaf, the leaf frame profile and glass edge, and the operator's arm pivot above",
    "Automatic Swing Doors — hinge, frame and arm pivot",
    "research/swing-door-visual-definition.md",
  ),
  visualised(
    "swing-doors-sensors",
    "entrance-automation",
    "automatic-swing-doors",
    "sensors",
    "Activation and safety hardware of an automatic swing door: the black activation sensor on the transom-mounted operator, a presence sensor strip on the top rail of the leaf, and a plain stainless push plate on the wall beside the frame",
    "Automatic Swing Doors — sensors and push plate",
    "research/swing-door-visual-definition.md",
  ),
  visualised(
    "swing-doors-site",
    "entrance-automation",
    "automatic-swing-doors",
    "site",
    "An office lobby entrance with the automatic swing doors opening hands-free as a person walks in, the operators and arms visible on the transom, glazed leaves in aluminium frames",
    "Automatic Swing Doors — hands-free entry at an office lobby",
    "research/swing-door-visual-definition.md",
  ),

  // GI Solid Rolling Shutter — generated engineering views; the hero fixed the
  // galvanised curtain and the supplied MS reference fixed the drive.
  visualised(
    "shutter-gi-solid-slat-macro",
    "rolling-shutters",
    "galvanized-steel-rolling-shutters",
    "slat-macro",
    "Macro view of a galvanised steel rolling shutter curtain: four curved interlocking slats with the matte hot-dip galvanised zinc surface and its faint spangle, the rolled interlock joints between slats and the crisp folded profile edges",
    "GI Solid Rolling Shutter — galvanised slat macro",
    "research/gi-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-gi-solid-guide",
    "rolling-shutters",
    "galvanized-steel-rolling-shutters",
    "guide",
    "Close-up at one jamb of a galvanised rolling shutter in a factory: the heavy galvanised angle guide bolted to the steel column, the curtain of interlocked slats entering the guide channel, the galvanised angle bottom rail on the floor and the hand chain and pull cords beside it",
    "GI Solid Rolling Shutter — angle guide and bottom rail",
    "research/gi-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-gi-solid-barrel",
    "rolling-shutters",
    "galvanized-steel-rolling-shutters",
    "barrel",
    "The upper mechanism of a galvanised rolling shutter seen from below: the galvanised curtain wound around the steel barrel, the barrel bearing on a galvanised end plate bolted to the column bracket, and the geared side motor with hand chain on the end plate",
    "GI Solid Rolling Shutter — barrel, end plate and drive",
    "research/gi-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-gi-solid-factory",
    "rolling-shutters",
    "galvanized-steel-rolling-shutters",
    "factory",
    "A large galvanised rolling shutter installed on a factory bay opening in a pre-engineered steel shed, the curtain two-thirds down, with angle guides, the side motor and chain, yellow-and-black bollards and yellow floor markings",
    "GI Solid Rolling Shutter — factory bay installation",
    "research/gi-shutter-visual-definition.md",
  ),

  // Aluminium Rolling Shutter — generated engineering views built to the hero's
  // satin-anodised extruded curtain.
  visualised(
    "shutter-aluminium-profile",
    "rolling-shutters",
    "aluminium-rolling-shutters",
    "profile",
    "Five extruded double-wall aluminium rolling shutter slats seen end-on on a neutral background, each section showing its two walls and hollow chamber and the hook interlock that joins it to the next, in a satin anodised finish",
    "Aluminium Rolling Shutter — extruded slat profile",
    "research/aluminium-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-aluminium-guide",
    "rolling-shutters",
    "aluminium-rolling-shutters",
    "guide",
    "Close-up at one jamb of an aluminium rolling shutter: the satin anodised guide channel with black pile seals gripping the curtain edge, the interlocked double-wall slats entering the guide and the aluminium bottom rail with its rubber seal at the floor",
    "Aluminium Rolling Shutter — guide, pile seals and bottom rail",
    "research/aluminium-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-aluminium-barrel",
    "rolling-shutters",
    "aluminium-rolling-shutters",
    "barrel",
    "The upper mechanism of an aluminium rolling shutter with the hood cover off: the anodised curtain wound around the octagonal barrel on aluminium end plates, the tubular motor cable at the barrel end and the wall control station below",
    "Aluminium Rolling Shutter — barrel and tubular motor",
    "research/aluminium-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-aluminium-showroom",
    "rolling-shutters",
    "aluminium-rolling-shutters",
    "showroom",
    "A satin anodised aluminium rolling shutter installed on a stone-clad showroom entrance, the curtain a third open beneath the anodised hood between aluminium guides, with yellow-and-black bollards",
    "Aluminium Rolling Shutter — showroom installation",
    "research/aluminium-shutter-visual-definition.md",
  ),

  visualised(
    "shutter-insulated-slat-macro",
    "rolling-shutters",
    "insulated-double-wall-rolling-shutters",
    "slat-macro",
    "Close-up along the curtain of an insulated double-wall rolling shutter: galvanised slats with a convex profile interlocking one above the next, the cut end of each slat showing the two steel skins with the pale foam core between them, warehouse racking soft in the background",
    "Insulated Rolling Shutter — double-wall slat with foam core",
    "research/insulated-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-insulated-guide",
    "rolling-shutters",
    "insulated-double-wall-rolling-shutters",
    "guide",
    "Close-up at one jamb of an insulated rolling shutter: the black steel guide channel with a rubber edge seal gripping the galvanised double-wall curtain and the rubber bottom seal meeting the polished concrete floor",
    "Insulated Rolling Shutter — guide, edge seal and bottom seal",
    "research/insulated-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-insulated-cold-store",
    "rolling-shutters",
    "insulated-double-wall-rolling-shutters",
    "cold-store",
    "A galvanised insulated rolling shutter installed in a white insulated-panel wall of a chilled store, the curtain a third open beneath a stainless hood, with the wall control station at the jamb, yellow-and-black bollards and palletised goods on the floor",
    "Insulated Rolling Shutter — chilled-store installation",
    "research/insulated-shutter-visual-definition.md",
  ),

  visualised(
    "dock-leveller-lip",
    "loading-bay",
    "dock-levellers",
    "lip",
    "Seen from inside a trailer looking back to the dock: the swing lip of a hydraulic dock leveller folded down and resting on the trailer floor, its hinge line running the full width, the chequer-plate deck rising behind it to the warehouse floor between the black dock bumpers",
    "Dock Levellers — swing lip resting on the vehicle bed",
    "research/dock-leveller-visual-definition.md",
  ),
  visualised(
    "dock-leveller-hydraulics",
    "loading-bay",
    "dock-levellers",
    "hydraulics",
    "A hydraulic dock leveller raised to its full height seen from the pit front: the underside stiffening ribs of the chequer-plate deck, the single lift cylinder with its hoses, the hydraulic power pack, the black pit frame and rear hinge, and the dock bumpers either side",
    "Dock Levellers — raised deck, lift cylinder and power pack",
    "research/dock-leveller-visual-definition.md",
  ),
  visualised(
    "dock-leveller-bridging",
    "loading-bay",
    "dock-levellers",
    "bridging",
    "From the warehouse floor looking out through an open loading bay: the dock leveller deck sloping gently down with its lip on the floor of a plain white trailer, forming one continuous ramp, with a hand pallet truck parked to the side and the sectional door raised above",
    "Dock Levellers — bridging from the dock floor into the trailer",
    "research/dock-leveller-visual-definition.md",
  ),
  visualised(
    "dock-leveller-controls",
    "loading-bay",
    "dock-levellers",
    "controls",
    "The dock leveller control station on the wall beside the bay: a light-grey box with a green raise button, red mushroom emergency stop and key switch, its conduit running down to the pit, with the deck stored level with the warehouse floor and the open bay beyond",
    "Dock Levellers — wall control station",
    "research/dock-leveller-visual-definition.md",
  ),
  visualised(
    "dock-leveller-loading-bay",
    "loading-bay",
    "dock-levellers",
    "loading-bay",
    "A row of loading bays on a distribution building seen from the yard: the nearest bay open with the dock leveller deck at the dock edge in its stored position, black rubber bumpers, a black dock shelter around the opening, the sectional door raised and yellow wheel guides on the apron",
    "Dock Levellers — loading bay from the yard",
    "research/dock-leveller-visual-definition.md",
  ),

  visualised(
    "dock-shelter-sealed",
    "loading-bay",
    "dock-shelters-and-houses",
    "sealed",
    "A plain white trailer reversed onto a loading bay with the black curtain dock shelter closed around it: the side curtains with their yellow guide stripes pressed against the trailer body and the head curtain over its roof, the neighbouring empty bay, dock leveller and yellow wheel guides alongside",
    "Dock Shelters & Dock Houses — curtains sealed around a docked trailer",
    "research/dock-shelter-visual-definition.md",
  ),
  visualised(
    "dock-shelter-frame",
    "loading-bay",
    "dock-shelters-and-houses",
    "frame",
    "Top corner of a curtain dock shelter with the front curtain drawn back to show the construction: the aluminium frame members, the hinged scissor arms that let the frame deflect on impact and return, the tensioned black PVC head and side curtains and the yellow guide stripe",
    "Dock Shelters & Dock Houses — aluminium frame and deflecting arms",
    "research/dock-shelter-visual-definition.md",
  ),
  visualised(
    "dock-shelter-curtain",
    "loading-bay",
    "dock-shelters-and-houses",
    "curtain",
    "Close-up of the foot of a dock shelter side curtain: the heavy black PVC with its vertical yellow guide stripe and welded edge hanging beside the sectional door, with the black rubber dock bumper and the dock leveller edge below on the concrete dock face",
    "Dock Shelters & Dock Houses — side curtain and dock bumper",
    "research/dock-shelter-visual-definition.md",
  ),
  visualised(
    "dock-shelter-dock-house",
    "loading-bay",
    "dock-shelters-and-houses",
    "dock-house",
    "A dock house built out from the face of a distribution building: a rectangular housing in light-grey insulated panels with a flat roof, carrying the same black curtain shelter, white sectional door, dock leveller, bumpers and yellow wheel guides on its front, with the standard shelters on the wall beyond",
    "Dock Shelters & Dock Houses — dock house variant",
    "research/dock-shelter-visual-definition.md",
  ),
  visualised(
    "dock-shelter-inside",
    "loading-bay",
    "dock-shelters-and-houses",
    "inside",
    "From the warehouse floor looking out through an open bay: a plain white trailer docked with its doors open and pallets inside, the black shelter side curtains with yellow stripes closing the gap either side of the trailer body and the dock leveller bridging into it",
    "Dock Shelters & Dock Houses — docked trailer seen from inside",
    "research/dock-shelter-visual-definition.md",
  ),

  visualised(
    "retractable-barrier-closed",
    "access-control",
    "retractable-barriers",
    "closed",
    "A folding-arm boom barrier closed across an office car park entry lane, the white articulated boom with red bands lowered straight and level from its brushed stainless cabinet, a dark car waiting behind it and the speed hump in the lane",
    "Retractable Barriers — closed across the lane",
    "research/retractable-barrier-visual-definition.md",
  ),
  visualised(
    "retractable-barrier-joint",
    "access-control",
    "retractable-barriers",
    "joint",
    "Close-up of the articulation joint of a folding-arm boom barrier: the black knuckle hinge between the two white aluminium boom sections with its pivot and the link rod that folds the outer section as the boom rises, red reflective bands on each side against trees and sky",
    "Retractable Barriers — articulation knuckle and fold link",
    "research/retractable-barrier-visual-definition.md",
  ),
  visualised(
    "retractable-barrier-cabinet",
    "access-control",
    "retractable-barriers",
    "cabinet",
    "Close-up of the top of the barrier cabinet: the brushed stainless housing with its plain door and lock, the black boom flange and drive cover at the root of the white boom, and the amber LED strip on the dark centre panel below",
    "Retractable Barriers — cabinet and boom mounting",
    "research/retractable-barrier-visual-definition.md",
  ),
  visualised(
    "retractable-barrier-low-headroom",
    "access-control",
    "retractable-barriers",
    "low-headroom",
    "The same folding-arm barrier at the entry ramp of an underground car park with a low concrete ceiling: the boom raised and folded at its knuckle so the outer section hangs vertically under the ceiling, a grey car passing beneath",
    "Retractable Barriers — folded boom under a low ceiling",
    "research/retractable-barrier-visual-definition.md",
  ),
  visualised(
    "retractable-barrier-folded",
    "access-control",
    "retractable-barriers",
    "folded",
    "Side view of the folding-arm barrier fully raised at the office entrance: the inner boom section vertical from the cabinet and the outer section folded down beside it at the knuckle into a compact stack, with hedges and the glass building behind",
    "Retractable Barriers — raised and folded into its stack",
    "research/retractable-barrier-visual-definition.md",
  ),

  visualised(
    "tripod-turnstile-unit",
    "access-control",
    "tripod-turnstiles",
    "unit",
    "A single brushed stainless tripod turnstile seen three-quarter from the passage side in a lobby: the slim housing on its base plate, the black rotor hub with three polished arms, the green arrow indicator on the side face and the sloped top cap with reader symbol and green LED band",
    "Tripod Turnstiles — single unit",
    "research/tripod-turnstile-visual-definition.md",
  ),
  visualised(
    "tripod-turnstile-rotor-hub",
    "access-control",
    "tripod-turnstiles",
    "rotor-hub",
    "Macro of the rotor hub of a tripod turnstile: the black cast hub on the brushed stainless housing face where the three polished tubular arms meet at 120 degrees, with their sockets and the hub cover",
    "Tripod Turnstiles — rotor hub and arms",
    "research/tripod-turnstile-visual-definition.md",
  ),
  visualised(
    "tripod-turnstile-drop-arm",
    "access-control",
    "tripod-turnstiles",
    "drop-arm",
    "A tripod turnstile in emergency release: its three stainless arms dropped to hang vertically against the housing beside the black hub, leaving the passage clear, with the side indicator showing an amber arrow, in a lobby with glass balustrades",
    "Tripod Turnstiles — drop-arm emergency release",
    "research/tripod-turnstile-visual-definition.md",
  ),
  visualised(
    "tripod-turnstile-reader-top",
    "access-control",
    "tripod-turnstiles",
    "reader-top",
    "Close-up of the sloped black top cap of a tripod turnstile with its contactless reader symbol and the green LED status band around the cap edge, the brushed stainless housing and the root of a polished arm below",
    "Tripod Turnstiles — reader cap and status band",
    "research/tripod-turnstile-visual-definition.md",
  ),
  visualised(
    "tripod-turnstile-gate-house",
    "access-control",
    "tripod-turnstiles",
    "gate-house",
    "Three stainless tripod turnstiles in a row at a factory gate house under a flat canopy, with stainless and glass guide railings between the lanes, the security cabin window alongside and a light-grey clad factory building across the paved forecourt",
    "Tripod Turnstiles — factory gate-house installation",
    "research/tripod-turnstile-visual-definition.md",
  ),

  visualised(
    "flap-barrier-lane-open",
    "access-control",
    "flap-barriers",
    "lane-open",
    "A single flap barrier lane in a lobby with its glass wings fully retracted into the two brushed stainless housings so the lane is clear, the green arrow indicators lit on the end faces and the black top caps with reader symbols",
    "Flap Barriers — lane open, wings retracted",
    "research/flap-barrier-visual-definition.md",
  ),
  visualised(
    "flap-barrier-wing",
    "access-control",
    "flap-barriers",
    "wing",
    "Close-up of a toughened glass wing where it emerges from the black-lined slot in the brushed stainless housing of a flap barrier, the polished glass edge reflecting the lobby",
    "Flap Barriers — glass wing and housing slot",
    "research/flap-barrier-visual-definition.md",
  ),
  visualised(
    "flap-barrier-sensors",
    "access-control",
    "flap-barriers",
    "sensors",
    "Looking along the inside of a flap barrier lane: the black glass sensor panels on the inner faces of the housings with rows of small infrared sensor windows at different heights, the glass wings at the end of the lane and the polished floor",
    "Flap Barriers — infrared sensor array along the lane",
    "research/flap-barrier-visual-definition.md",
  ),
  visualised(
    "flap-barrier-wide-lane",
    "access-control",
    "flap-barriers",
    "wide-lane",
    "A bank of flap barrier lanes in a lobby where the nearest lane is a wide accessible lane with longer glass wings across the wider gap and the standard-width lanes beside it, all in identical brushed stainless housings",
    "Flap Barriers — wide accessible lane beside standard lanes",
    "research/flap-barrier-visual-definition.md",
  ),
  visualised(
    "flap-barrier-reader-cap",
    "access-control",
    "flap-barriers",
    "reader-cap",
    "Close-up of the sloped black glass top cap of a flap barrier housing with its white contactless reader symbol and the blue LED line along its edge, the brushed stainless housing below",
    "Flap Barriers — reader cap and status light",
    "research/flap-barrier-visual-definition.md",
  ),

  visualised(
    "full-height-turnstile-single-rotor",
    "access-control",
    "full-height-turnstiles",
    "single-rotor",
    "A single-rotor full height turnstile set into a run of grey steel palisade fencing at a factory perimeter: the brushed stainless frame and flat canopy with its downlight, the three-wing rotor of horizontal polished tubes inside the curved cage of vertical tubes, and the black reader panel on the post",
    "Full Height Turnstiles — single-rotor unit",
    "research/full-height-turnstile-visual-definition.md",
  ),
  visualised(
    "full-height-turnstile-rotor",
    "access-control",
    "full-height-turnstiles",
    "rotor",
    "Close-up inside the lane of a full height turnstile: the polished horizontal stainless tubes of one rotor wing radiating from the central column with their rounded ends, interleaving with the vertical tubes of the cage behind",
    "Full Height Turnstiles — rotor and cage",
    "research/full-height-turnstile-visual-definition.md",
  ),
  visualised(
    "full-height-turnstile-head",
    "access-control",
    "full-height-turnstiles",
    "head",
    "Looking up at the head of a full height turnstile from inside the lane: the underside of the flat brushed stainless canopy with its round downlight, the plain circular top bearing housing of the rotor column and the tops of the rotor tubes and cage tubes beneath it",
    "Full Height Turnstiles — canopy and rotor top bearing",
    "research/full-height-turnstile-visual-definition.md",
  ),
  visualised(
    "full-height-turnstile-reader",
    "access-control",
    "full-height-turnstiles",
    "reader",
    "Close-up of the black reader panel on the brushed stainless post of a full height turnstile: a green arrow indicator above the white contactless reader symbol, with the rotor tubes soft in the background",
    "Full Height Turnstiles — reader panel and indicator",
    "research/full-height-turnstile-visual-definition.md",
  ),
  visualised(
    "full-height-turnstile-perimeter",
    "access-control",
    "full-height-turnstiles",
    "perimeter",
    "A twin-rotor full height turnstile installed as an unmanned pedestrian entry point in a run of grey steel palisade fencing on an industrial site, with a paved approach path, the factory building and its yard beyond, in daylight",
    "Full Height Turnstiles — unmanned perimeter entry",
    "research/full-height-turnstile-visual-definition.md",
  ),

  visualised(
    "shutter-windproof-wind-locks",
    "rolling-shutters",
    "windproof-rolling-shutters",
    "wind-locks",
    "Close-up along the edge of a windproof rolling shutter curtain with the guide removed: the ends of the curved galvanised laths with plain riveted end locks, and a heavy zinc-plated cast wind-lock riveted through every fourth lath end, the block that runs inside the wind-anchor guide and holds the curtain under wind load",
    "Windproof / Storm-Resistant Rolling Shutter — wind-locks at the lath ends",
    "research/windproof-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-windproof-wind-anchor-guide",
    "rolling-shutters",
    "windproof-rolling-shutters",
    "wind-anchor-guide",
    "Close-up at the jamb of a windproof rolling shutter: the deep galvanised wind-anchor guide channel on its grey steel angle, fixed to the brick jamb with heavy anchor bolts, the curved galvanised laths running into the guide and a wind-lock head visible in its mouth",
    "Windproof / Storm-Resistant Rolling Shutter — wind-anchor guide and structural fixing",
    "research/windproof-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-windproof-bottom-rail",
    "rolling-shutters",
    "windproof-rolling-shutters",
    "bottom-rail",
    "Floor-level close-up of the reinforced bottom of a windproof rolling shutter: the heavy galvanised T-section bottom rail riveted to the lowest lath, running inside the channel guides on their angles, a black rubber seal on the concrete and a padlockable ground bolt",
    "Windproof / Storm-Resistant Rolling Shutter — reinforced bottom rail",
    "research/windproof-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-windproof-barrel",
    "rolling-shutters",
    "windproof-rolling-shutters",
    "barrel",
    "The head of a windproof rolling shutter with the coil casing removed, seen from below inside the building: the galvanised curtain coiled on a heavy primed steel barrel carried on thick end plates bolted to the steelwork, with a flange-mounted geared operator and its endless hand chain on the end plate",
    "Windproof / Storm-Resistant Rolling Shutter — heavy-duty barrel, end plates and operator",
    "research/windproof-shutter-visual-definition.md",
  ),
  visualised(
    "shutter-windproof-half-open",
    "rolling-shutters",
    "windproof-rolling-shutters",
    "half-open",
    "A windproof rolling shutter on a brick factory loading bay raised to half height, square-on: the curved galvanised laths and T-section bottom rail at mid height between heavy channel guides on grey angles, the galvanised coil casing above and the warehouse floor visible beneath",
    "Windproof / Storm-Resistant Rolling Shutter — half open",
    "research/windproof-shutter-visual-definition.md",
  ),

  visualised(
    "hsd-roll-up-hero",
    "high-speed-doors",
    "high-speed-roll-up-door",
    "hero",
    "A royal-blue high speed roll-up door lowered to about two-thirds across a wide internal warehouse opening, its taut PVC curtain with a full-width clear vision band running between brushed stainless guide columns beneath a plain stainless hood, the lit dispatch hall visible beneath the bottom rail, a wall control station with display and red emergency stop beside the guide and yellow-and-black bollards on the polished concrete floor",
    "High Speed Roll-Up Door — lead image",
    "research/roll-up-door-visual-definition.md",
  ),
  visualised(
    "hsd-roll-up-detail",
    "high-speed-doors",
    "high-speed-roll-up-door",
    "detail",
    "Close-up of the edge of a blue PVC high speed roll-up door: the brushed stainless guide column with its black brush seal, the curtain's reinforcing seam and the aluminium edge strip of the clear vision band",
    "High Speed Roll-Up Door — curtain and guide detail",
    "research/roll-up-door-visual-definition.md",
  ),
  visualised(
    "hsd-roll-up-application",
    "high-speed-doors",
    "high-speed-roll-up-door",
    "application",
    "A blue PVC high speed roll-up door closed in a partition wall between two zones of a warehouse, with loaded pallet racking to one side and yellow floor markings leading to the opening",
    "High Speed Roll-Up Door — installed application",
    "research/roll-up-door-visual-definition.md",
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
    "hermetic-doors-supplied",
    "entrance-automation",
    "hermetic-cleanroom-doors",
    "supplied",
    "A blue hermetic sliding door part open in a white-panelled clean corridor, its single leaf with a rounded vision window running under a stainless header, the gowned operators and equipment of the clean area visible through the opening, and a touchless reader on the wall beside it",
    "Hermetic & Cleanroom Doors — lead image",
    "aspect-[6/5]",
  ),
  supplied(
    "retractable-barrier-supplied",
    "access-control",
    "retractable-barriers",
    "supplied",
    "A retractable arm barrier raised at a business park entrance, its red and white striped arm hinged part way along so the outer section folds back over the pedestal rather than sweeping a full arc, with a lit status strip down the pedestal and a car waiting beyond",
    "Retractable Barriers — lead image",
    "aspect-[6/5]",
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
  visualised(
    "boom-barrier-angle",
    "access-control",
    "boom-barriers",
    "angle",
    "An automatic boom barrier seen from across the lane with its arm raised vertical beside the cabinet: a graphite-grey pedestal with brushed silver side panels, an amber status strip on the front face, a reader plate on the side and a black boom boss carrying the white and red arm",
    "Boom Barriers — raised, from the far side of the lane",
    "research/boom-barrier-visual-definition.md",
  ),
  visualised(
    "boom-barrier-cabinet",
    "access-control",
    "boom-barriers",
    "cabinet",
    "Close-up of a boom barrier operator cabinet: graphite-grey front face with brushed silver side panels and top cap, a vertical amber status strip, a card reader plate on the side and the black boom boss with the lowered white and red arm leading out of frame",
    "Boom Barriers — operator cabinet",
    "research/boom-barrier-visual-definition.md",
  ),
  visualised(
    "boom-barrier-detail",
    "access-control",
    "boom-barriers",
    "detail",
    "Detail of a boom barrier's boom boss: a black cylindrical boss with a ring of stainless bolts fixed to the graphite-grey side face of the cabinet below the brushed silver top cap, with the root of the white arm and its first red reflective band clamped into it",
    "Boom Barriers — boom boss and arm root",
    "research/boom-barrier-visual-definition.md",
  ),
  visualised(
    "boom-barrier-installed",
    "access-control",
    "boom-barriers",
    "installed",
    "A boom barrier installed at a business-park entrance beside a glazed gatehouse, arm raised, with a plain grey saloon car passing through towards the car park and glass office buildings beyond",
    "Boom Barriers — installed at a vehicle entrance",
    "research/boom-barrier-visual-definition.md",
  ),
  visualised(
    "boom-barrier-side",
    "access-control",
    "boom-barriers",
    "side",
    "Side elevation of a boom barrier with its arm horizontal across the lane: the graphite-grey cabinet with brushed silver side panels and amber status strip at the left, the white arm with evenly spaced red reflective bands, and a black tip support post at the far kerb",
    "Boom Barriers — full boom length, side elevation",
    "research/boom-barrier-visual-definition.md",
    "contain",
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
  visualised(
    "bollard-angle",
    "access-control",
    "bollards",
    "angle",
    "A row of four raised rising bollards seen from a low angle along the line, each a brushed stainless cylinder with a flat black cap, an amber LED band beneath it and a flush stainless ground collar, on a stone-paved office forecourt",
    "Bollards — the row from a low side angle",
    "research/bollard-visual-definition.md",
  ),
  visualised(
    "bollard-raised",
    "access-control",
    "bollards",
    "raised",
    "Close-up of one raised rising bollard: a brushed stainless cylinder with a flat black cap and a single amber LED band beneath it, standing in its flush stainless ground collar on stone paving",
    "Bollards — raised, close-up",
    "research/bollard-visual-definition.md",
    "contain",
  ),
  visualised(
    "bollard-retracted",
    "access-control",
    "bollards",
    "retracted",
    "The same row of four rising bollards fully retracted, only their flush stainless ground collars and black caps showing level with the paving, leaving the forecourt clear to the office entrance",
    "Bollards — retracted, flush with the paving",
    "research/bollard-visual-definition.md",
  ),
  visualised(
    "bollard-installation",
    "access-control",
    "bollards",
    "installation",
    "Installation detail of a rising bollard part-way up: the cylinder rising through its flush stainless ground collar, the narrow gap around it and the polished lower section that sits below ground when raised, with the black cap and amber LED band at the top",
    "Bollards — part-raised in the ground collar",
    "research/bollard-visual-definition.md",
  ),
  visualised(
    "bollard-application",
    "access-control",
    "bollards",
    "application",
    "Four raised rising bollards holding the line between a forecourt roadway and a glass office entrance, with a plain grey saloon car stopped on the roadway short of them",
    "Bollards — holding a vehicle line at an entrance",
    "research/bollard-visual-definition.md",
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
  visualised(
    "hsd-fold-up-hero",
    "high-speed-doors",
    "high-speed-fold-up-door",
    "hero",
    "A royal-blue high speed fold-up door half open on the loading opening of a light-grey clad factory: the lower curtain with its wind-bar ridges, two black lifting straps and a row of three vision windows spanning the full width between the black guide columns, the raised half gathered into a full-width stack of horizontal folds beneath the plain stainless hood, warehouse pallets visible below the bottom bar, a wall control station with red emergency stop beside the guide and yellow-and-black bollards on the concrete apron",
    "High Speed Fold-Up Door — lead image",
    "research/fold-up-door-visual-definition.md",
  ),

  // Contextual photography used in the High Speed Doors galleries.
  own("g-hsd-installation", "intro.jpg", "A high speed door at a warehouse opening with a forklift passing through", "High Speed Doors gallery"),
  stock("g-hsd-rollup-context", "industrial-doors.jpg", "A closed roll-up industrial door on an internal opening", "High Speed Doors gallery"),
  stock("g-hsd-wide-opening", "loading-bay-trailer.jpg", "A refrigerated trailer raised on a hydraulic tipping platform outside a warehouse", "High Speed Doors gallery"),
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

  stock("p-gate-sliding", "gates-industrial.jpg", "A factory floor with yellow safety railings around conveyor lines", "Automatic Sliding Gates"),
  stock("p-gate-telescopic", "gate-metal.jpg", "A black metal gate at a site entrance", "Telescopic Sliding Gates"),
  stock("p-gate-swing", "gate-driveway.jpg", "A gated driveway entrance", "Automatic Swing Gates"),
  stock("p-gate-retractable", "gate-sliding.jpg", "A yellow and black site gate across a vehicle entrance", "Retractable Gates"),

  stock("p-auto-sliding-doors", "entrance-automation.jpg", "Glass pivot doors at an office entrance, photographed at night", "Automatic Sliding Glass Doors"),
  stock("p-swing-doors", "industry-healthcare.jpg", "A hospital corridor with doors along it", "Automatic Swing Doors"),
  stock("p-hermetic-doors", "industry-cleanroom.jpg", "Workers in protective suits inside a cleanroom", "Hermetic & Cleanroom Doors"),

  stock("p-dock-leveller", "loading-bay-trailer.jpg", "A refrigerated trailer raised on a hydraulic tipping platform outside a warehouse", "Dock Levellers"),
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
