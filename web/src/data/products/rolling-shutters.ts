import type { Faq, Integration, Product, SelectionRule } from "@/lib/types";

/**
 * Rolling Shutters — 13 products.
 *
 * Built from the normalised product data Standard Automatic Solutions issued
 * on 2026-09-05. That data is the source of truth for this family and the
 * specification tables are held verbatim in `src/data/product-specs.ts`.
 *
 * The rules that data sets, which the copy below follows:
 *
 *  - Steel slat thicknesses are published as the classes given, 0.8 / 1.0 /
 *    1.2 mm, and never widened. 1.5 mm is deliberately NOT offered as a normal
 *    MS catalogue option; heavier work is directed to the industrial line.
 *  - No universal maximum width or height appears anywhere. Standard lines say
 *    custom sizes, industrial says subject to engineering, wind-rated says to
 *    project wind loads, polycarbonate says profile and drive dependent, and
 *    counter says to the opening.
 *  - No open-area percentage, core thickness, U-value, cycle rating, wind
 *    speed or corrosion lifetime is published, because none was supplied.
 *    Those fields exist in the specification and read as configuration
 *    dependent until real data exists for them.
 *  - Nothing claims bulletproof, unbreakable, fireproof, blast resistant,
 *    storm-proof or maintenance-free.
 *
 * The fire-rated rolling shutter is a real part of this range but already has
 * a page under Fire & Safety Doors, where its compartment-line behaviour sits
 * with the rest of the life-safety products. It is cross-listed onto this
 * family rather than duplicated, because two pages for one product is a
 * doorway page.
 */

/* ------------------------------------------------------------------ *
 * Shared blocks. A shutter is a shutter: most of the buying decision,
 * the ordering questions and the couplings are common to the family, so
 * they live here once rather than thirteen times.
 * ------------------------------------------------------------------ */

const SIZE_CUSTOM = "Available in custom sizes.";
const SIZE_ENGINEERED = "Large openings available subject to engineering.";
const SIZE_WIND = "Designed according to project-specific wind loads.";
const SIZE_POLY = "Maximum size depends on the selected profile and drive system.";
const SIZE_COUNTER = "Designed according to the opening dimensions and the application.";

const shutterCompatibility: Integration[] = [
  {
    system: "Tubular and side motors",
    detail:
      "Motor selection follows curtain weight, opening width and height, barrel diameter, required torque and how often the shutter runs. It is calculated per opening rather than fixed by product line, and every powered shutter carries a manual override.",
  },
  {
    system: "Control stations",
    detail:
      "Push button station, key switch or remote handset. Open, close and stop are separate commands, so the shutter can be held part open where the application needs it.",
  },
  {
    system: "Access control",
    detail:
      "A volt-free contact from a card reader, keypad, intercom or barrier controller releases the shutter. It responds to the contact and does not care which credential technology sits in front of it.",
  },
  {
    system: "Safety devices",
    detail:
      "Photocell across the opening and a safety edge on the bottom rail, wired so that either one stops and reverses a closing curtain.",
  },
  {
    system: "Building management",
    detail:
      "Open, closed and fault states can be reported to a BMS or SCADA point where the control panel provides the outputs.",
  },
];

const shutterOrdering: string[] = [
  "Clear opening width and height, measured between the finished reveals rather than the frame",
  "Headroom above the opening and side room at both jambs, which decide the barrel and guide arrangement",
  "Whether the shutter is face mounted, fitted between the jambs or recessed",
  "How many times a day it will be operated, which sizes the drive and decides manual against motorised",
  "Internal or external, and the exposure if external",
  "Finish and colour, and any locking requirement",
  "Power supply available at the opening, where the shutter is motorised",
];

const shutterInstallation: string[] = [
  "A site survey confirms clear width and height, headroom, side room and the plumb of both jambs before anything is manufactured.",
  "Headroom above the lintel has to take the rolled curtain and side room has to take the guides. These two dimensions rule out more shutters than opening width does.",
  "Structural fixings are agreed against the substrate, because masonry, concrete, steel and cladding rail all behave differently under the load a shutter imposes.",
  "Where the shutter is motorised, a local supply and isolator are provided by the electrical contractor.",
  "Commissioning sets the open and close limits, tests every safety device, and hands over both normal operation and the manual override.",
];

const commonFaq = (name: string): Faq[] => [
  {
    question: `What sizes is the ${name} available in?`,
    answer:
      "It is made to the opening rather than supplied in fixed sizes. Send us the clear width and height along with the headroom and side room available, and we will confirm what the configuration supports.",
  },
  {
    question: "Can it be motorised, and can an existing shutter be motorised?",
    answer:
      "Yes to both, where the curtain and barrel suit it. Motor selection follows curtain weight, opening size, barrel diameter and how often the shutter runs, so it is calculated for the opening rather than taken from a product line.",
  },
  {
    question: "What happens during a power failure?",
    answer:
      "Every powered shutter is supplied with a manual override, by hand chain, crank or release depending on the configuration. It is part of the specification rather than an accessory.",
  },
  {
    question: "What do you need from us to quote?",
    answer:
      "Clear opening width and height, the headroom and side room, roughly how many times a day it will be used, whether it is internal or external, and the finish you want. That is usually enough for a configuration and a price.",
  },
];

const doc = (title: string, kind: "Brochure" | "Datasheet" | "Technical drawing") => ({
  title,
  kind,
  href: null,
  note:
    kind === "Technical drawing"
      ? "Produced per project after the site survey."
      : "In preparation. Ask us and we will send the current specification sheet.",
});

const standardDocs = (name: string) => [
  doc(`${name} datasheet`, "Datasheet"),
  doc("Opening survey and technical drawing", "Technical drawing"),
];

const cycleSelection: SelectionRule[] = [
  {
    condition: "The shutter is opened and closed many times a day",
    recommendation:
      "Size on duty first and motorise it. A shutter chosen only on curtain size will wear at the barrel and drive long before the curtain gives out.",
  },
  {
    condition: "The opening is external or exposed",
    recommendation:
      "State the exposure. It decides the guide section, whether wind locks are needed, and rules out lighter curtains regardless of opening size.",
  },
];

export const rollingShutterProducts: Product[] = [
  /* =========================================================== 01 MS */
  {
    id: "ms-solid-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "solid-steel-rolling-shutters",
    name: "MS Solid Rolling Shutter",
    status: "CONFIRMED",
    tagline: "The standard steel shutter, in three curtain weights.",
    summary:
      "Mild steel interlocking slat curtain in 0.8, 1.0 and 1.2 mm, push-up, gear or motorised, for shops, godowns and commercial openings.",
    overview: [
      "A mild steel rolling shutter is the default way to close a commercial opening in India, and for good reason: an interlocking single-skin steel curtain rolling onto a barrel is simple, repairable and cheap to own. The three duties below are the same product built in three curtain weights, and the weight is what you are actually choosing.",
      "Light duty at 0.8 mm suits a small shop or garage opening that is operated by hand. Standard duty at 1.0 mm is the general commercial curtain. Heavy duty at 1.2 mm is for wider openings and for shutters used hard enough that the curtain, rather than the lock, is the thing under stress.",
      "Above that the honest answer is a different product. Rather than pushing a mild steel curtain thicker and hoping, larger and heavier openings are engineered as an industrial shutter, where the guide, shaft and drive are sized together with the curtain.",
    ],
    quickFacts: [
      { label: "Slat thickness", value: "0.8 / 1.0 / 1.2 mm", qualified: true },
      { label: "Profile", value: "Approx. 75–80 mm class", qualified: true },
      { label: "Operation", value: "Push-up, gear or motorised" },
      { label: "Sizes", value: "Custom", qualified: true },
    ],
    benefits: [
      { title: "Three curtain weights, one product", body: "0.8, 1.0 and 1.2 mm cover the small shop through to the warehouse opening without changing how the shutter works or how it is serviced." },
      { title: "Economical to own", body: "A single-skin steel curtain is inexpensive to buy, repairable slat by slat, and understood by every maintenance team." },
      { title: "Manual or powered", body: "Push-up, gear operated or motorised, and a manual shutter can be motorised later without replacing the curtain." },
      { title: "Made to the opening", body: "Curtain, guides and bottom rail are cut to the aperture rather than fitted from a stock size." },
    ],
    variants: [
      { id: "light-duty", name: "Light duty — 0.8 mm", note: "0.8 mm curtain in the 75–80 mm profile class, for small shops, garages and small commercial openings operated by hand.", status: "CONFIRMED" },
      { id: "standard-duty", name: "Standard duty — 1.0 mm", note: "1.0 mm curtain, the general commercial specification for shops, commercial buildings, godowns and small warehouses.", status: "CONFIRMED" },
      { id: "heavy-duty", name: "Heavy duty — 1.2 mm", note: "1.2 mm curtain in a heavier construction, gear operated or motorised, for larger commercial openings, godowns and warehouses.", status: "CONFIRMED" },
    ],
    applications: ["Small shops", "Garages", "Shops and commercial buildings", "Godowns", "Small warehouses", "Larger commercial premises"],
    industries: ["retail-commercial", "warehousing-logistics", "manufacturing"],
    environments: ["internal", "external", "security"],
    operatingMethod: [
      "Interlocking mild steel slats form a single-skin curtain that rolls onto a barrel above the opening.",
      "The curtain runs in MS or GI guides at both jambs and closes onto an MS bottom rail.",
      "Operation is push-up on a light curtain, gear operated as the curtain gets heavier, or motorised.",
      "A motorised shutter carries a manual override so it can be operated during a power failure.",
    ],
    construction: [
      "Mild steel or CR steel interlocking slats, curved and formed profile",
      "Slat thickness 0.8, 1.0 or 1.2 mm depending on duty",
      "Approximately 75–80 mm profile class",
      "MS or GI guides, conventional guide construction",
      "MS bottom rail",
      "Primer and paint finish, with powder coating optional",
    ],
    compatibility: shutterCompatibility,
    installation: shutterInstallation,
    ordering: shutterOrdering,
    selectionGuide: [
      ...cycleSelection,
      { condition: "A small shop or garage operated by hand", recommendation: "Light duty at 0.8 mm. Anything heavier makes a hand-operated shutter harder to use for no benefit." },
      { condition: "A general commercial opening", recommendation: "Standard duty at 1.0 mm. This is the curtain most commercial openings should be quoted on." },
      { condition: "A wide opening, or one used hard", recommendation: "Heavy duty at 1.2 mm, gear operated or motorised." },
      { condition: "Bigger or heavier than that", recommendation: "Move to the industrial rolling shutter, where the guide, shaft and drive are engineered with the curtain rather than the curtain simply being made thicker." },
      { condition: "The opening is coastal or chemically aggressive", recommendation: "Mild steel is the wrong base. Look at the GI, Galvalume or stainless lines." },
    ],
    faq: [
      { question: "Which thickness should we specify?", answer: "0.8 mm for a small hand-operated shop opening, 1.0 mm for general commercial work, and 1.2 mm for larger openings or heavier use. Those three are the mild steel range; we do not offer a heavier mild steel curtain as a standard catalogue option." },
      { question: "Why not just specify a thicker mild steel curtain?", answer: "Because past 1.2 mm the curtain stops being the only thing that has to change. The guide, shaft, brackets and drive all have to be sized with it, which is what the industrial rolling shutter is. Making only the curtain heavier moves the failure somewhere else." },
      { question: "How long will the paint finish last?", answer: "That depends on the environment and on how the shutter is looked after, so we do not publish a figure. What we can say is that coating condition decides service life on a steel curtain, and that a galvanized or Galvalume base is the better answer where corrosion is the concern." },
      ...commonFaq("MS Solid Rolling Shutter"),
    ],
    related: ["galvanized-steel-rolling-shutters", "galvalume-rolling-shutters", "industrial-rolling-shutters"],
    documents: standardDocs("MS Solid Rolling Shutter"),
    imageId: "p-shutter-ms-solid",
    facets: { material: ["MS"], construction: "Solid", duty: ["Light", "Standard", "Heavy"], operation: ["Manual", "Gear", "Motorized"], performance: ["Standard"] },
    comparison: { material: "Mild steel", thickness: "0.8–1.2 mm", corrosion: "Standard, coating dependent", operation: "Manual, gear or motorised" },
    legacyUrls: ["m-s-rolling-shutters.html"],
  },

  /* =========================================================== 02 GI */
  {
    id: "galvanized-steel-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "solid-steel-rolling-shutters",
    name: "GI Solid Rolling Shutter",
    status: "CONFIRMED",
    tagline: "The same steel shutter, galvanized before it is formed.",
    summary:
      "Galvanized steel interlocking curtain in the 0.8–1.0 mm class and 1.2 mm heavy duty, for shops, godowns and outdoor openings where a painted curtain would not last.",
    overview: [
      "A GI shutter is a mild steel shutter with the corrosion problem addressed at the material rather than at the paint. The zinc coating is on the steel before the slat is formed, so the protection is not something that has to be maintained on site to keep working.",
      "That makes it the sensible default on any opening that sees weather, washdown or humidity. It costs more than mild steel and less than stainless, and for most outdoor commercial openings it is the right point on that line.",
      "Two duties are offered: a 0.8 to 1.0 mm class curtain for general commercial work, and a 1.2 mm heavy curtain with a reinforced guide for warehouses and industrial buildings.",
    ],
    quickFacts: [
      { label: "Slat thickness", value: "0.8–1.0 mm class, 1.2 mm heavy", qualified: true },
      { label: "Profile", value: "Approx. 75–80 mm class", qualified: true },
      { label: "Finish", value: "Galvanized, powder coat optional" },
      { label: "Sizes", value: "Custom", qualified: true },
    ],
    benefits: [
      { title: "Corrosion resistance built into the steel", body: "The zinc coating is applied to the steel rather than painted onto the finished curtain, so protection does not depend on a site-applied finish being maintained." },
      { title: "A better base for outdoor openings", body: "A corrosion-resistant alternative to conventional mild steel where the opening sees weather, humidity or washdown." },
      { title: "Two duties", body: "0.8 to 1.0 mm class for general commercial work, 1.2 mm with a reinforced guide for warehouse and industrial openings." },
      { title: "Finish to requirement", body: "Left galvanized, or powder coated to a specified colour where the elevation matters." },
    ],
    variants: [
      { id: "standard-duty", name: "Standard duty — 0.8–1.0 mm class", note: "Interlocking galvanized curtain in the 0.8 to 1.0 mm class, manual, gear or motorised, for shops, commercial buildings, godowns and outdoor openings.", status: "CONFIRMED" },
      { id: "heavy-duty", name: "Heavy duty — 1.2 mm", note: "Heavy interlocking GI curtain at 1.2 mm with a reinforced guide, gear operated or motorised, for warehouses, godowns and commercial or industrial buildings.", status: "CONFIRMED" },
    ],
    applications: ["Shops", "Commercial buildings", "Godowns", "Outdoor openings", "Warehouses", "Industrial buildings"],
    industries: ["retail-commercial", "warehousing-logistics", "manufacturing"],
    environments: ["internal", "external", "security"],
    operatingMethod: [
      "Interlocking galvanized steel slats form the curtain, which rolls onto a barrel above the opening.",
      "The curtain runs in guides at both jambs; the heavy duty configuration uses a reinforced guide.",
      "Operation is manual, gear operated or motorised depending on curtain weight and use.",
      "A motorised shutter carries a manual override for use during a power failure.",
    ],
    construction: [
      "Galvanized steel interlocking slats, curved and formed profile",
      "Slat thickness 0.8 to 1.0 mm class, or 1.2 mm heavy duty",
      "Approximately 75–80 mm profile class",
      "Reinforced guide on the heavy duty configuration",
      "Galvanized finish, powder coating optional",
    ],
    compatibility: shutterCompatibility,
    installation: shutterInstallation,
    ordering: shutterOrdering,
    selectionGuide: [
      ...cycleSelection,
      { condition: "The opening is outdoors or gets wet", recommendation: "GI over mild steel. The protection is in the material rather than in a finish that has to be maintained." },
      { condition: "A warehouse or industrial opening", recommendation: "Heavy duty at 1.2 mm with the reinforced guide." },
      { condition: "Coastal, or a chemically aggressive process area", recommendation: "GI may not be enough. Look at Galvalume for a better coating, or stainless where the environment is genuinely aggressive." },
      { condition: "Appearance matters on the elevation", recommendation: "Specify the powder coated finish over the galvanized base." },
    ],
    faq: [
      { question: "How much longer does a GI shutter last than a painted MS one?", answer: "We do not publish a figure, because it depends on the environment, the coating specification and how the shutter is maintained. What is fair to say is that the corrosion protection is in the steel rather than in a surface finish, which is why it is the better choice for an exposed opening." },
      { question: "Can a GI shutter be powder coated?", answer: "Yes. The galvanized base does the corrosion work and the powder coat gives the colour, which is the usual specification where the shutter is on a visible elevation." },
      { question: "Is GI suitable for a coastal site?", answer: "It is better than mild steel, but for a genuinely coastal or chemically aggressive installation we would point you at Galvalume or stainless steel rather than claim GI will be sufficient." },
      ...commonFaq("GI Solid Rolling Shutter"),
    ],
    related: ["ms-solid-rolling-shutters", "galvalume-rolling-shutters", "industrial-rolling-shutters"],
    documents: standardDocs("GI Solid Rolling Shutter"),
    imageId: "p-shutter-galvanized",
    facets: { material: ["GI"], construction: "Solid", duty: ["Standard", "Heavy"], operation: ["Manual", "Gear", "Motorized"], performance: ["Standard"] },
    comparison: { material: "Galvanized steel", thickness: "0.8–1.2 mm", corrosion: "Good", operation: "Manual, gear or motorised" },
    legacyUrls: ["g-i-rolling-shutters.html"],
  },

  /* ==================================================== 03 GALVALUME */
  {
    id: "galvalume-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "solid-steel-rolling-shutters",
    name: "Galvalume Rolling Shutter",
    status: "CONFIRMED",
    tagline: "Aluminium-zinc coated steel, where galvanized is not quite enough.",
    summary:
      "Aluminium-zinc coated steel curtain in the 1.0 mm class and 1.2 mm heavy duty, for exposed commercial and industrial openings.",
    overview: [
      "Galvalume is steel coated with an aluminium-zinc alloy rather than zinc alone. It sits above galvanized on corrosion protection while keeping everything else about a steel shutter: the strength, the repairability and the cost base.",
      "It is the line to specify where the opening is genuinely exposed and a galvanized curtain has been marginal — coastal-adjacent sites, industrial atmospheres, and elevations that take driven rain.",
      "Two duties are offered, a 1.0 mm class curtain and a 1.2 mm class heavy curtain, both in the same interlocking profile as the rest of the steel range.",
    ],
    quickFacts: [
      { label: "Material", value: "Aluminium-zinc coated steel" },
      { label: "Slat thickness", value: "1.0 mm class, 1.2 mm heavy", qualified: true },
      { label: "Profile", value: "Approx. 75–80 mm class", qualified: true },
      { label: "Sizes", value: "Custom", qualified: true },
    ],
    benefits: [
      { title: "Enhanced corrosion protection", body: "An aluminium-zinc coating gives better protection than zinc alone, on the same steel shutter construction." },
      { title: "Steel behaviour, better coating", body: "The strength, repairability and cost base of a steel curtain, with the coating doing the work in an exposed environment." },
      { title: "Two duties", body: "1.0 mm class for commercial and outdoor openings, 1.2 mm class for warehouses and industrial buildings." },
      { title: "Finish options", body: "The Galvalume metallic finish left exposed, or powder coated to a specified colour." },
    ],
    variants: [
      { id: "standard", name: "Standard — 1.0 mm class", note: "Interlocking Galvalume curtain in the 1.0 mm class, manual, gear or motorised, for commercial, industrial and exposed outdoor openings.", status: "CONFIRMED" },
      { id: "heavy-duty", name: "Heavy duty — 1.2 mm class", note: "Heavy interlocking Galvalume curtain in the 1.2 mm class, for warehouses, industrial buildings and exposed openings.", status: "CONFIRMED" },
    ],
    applications: ["Commercial buildings", "Industrial buildings", "Outdoor openings", "Exposed environments", "Warehouses"],
    industries: ["manufacturing", "warehousing-logistics", "retail-commercial"],
    environments: ["external", "internal", "security"],
    operatingMethod: [
      "Interlocking Galvalume slats form the curtain, which rolls onto a barrel above the opening.",
      "The curtain runs in guides at both jambs and closes onto a bottom rail.",
      "Operation is manual, gear operated or motorised.",
      "A motorised shutter carries a manual override for use during a power failure.",
    ],
    construction: [
      "Aluminium-zinc coated steel interlocking slats",
      "Slat thickness 1.0 mm class, or 1.2 mm class heavy duty",
      "Approximately 75–80 mm profile class",
      "Galvalume metallic finish, powder coating optional",
    ],
    compatibility: shutterCompatibility,
    installation: shutterInstallation,
    ordering: shutterOrdering,
    selectionGuide: [
      ...cycleSelection,
      { condition: "Galvanized has been marginal on this site before", recommendation: "Galvalume. The aluminium-zinc coating is the step up while keeping a steel curtain." },
      { condition: "An exposed elevation taking driven rain", recommendation: "Galvalume in the 1.0 mm class, or 1.2 mm where the span is wide." },
      { condition: "A food, pharmaceutical or washdown area", recommendation: "Stainless steel is the better answer, because the cleaning regime rather than the weather is what governs." },
    ],
    faq: [
      { question: "How is Galvalume different from galvanized?", answer: "Galvanized steel is coated with zinc; Galvalume is coated with an aluminium-zinc alloy. In practice the alloy coating gives better protection in exposed conditions, on the same steel curtain." },
      { question: "How long will it last in a coastal environment?", answer: "We do not publish a corrosion life, because it depends on the specific atmosphere, the coating specification and maintenance. We can tell you where Galvalume sits relative to galvanized and stainless, and specify against the site rather than against a number." },
      ...commonFaq("Galvalume Rolling Shutter"),
    ],
    related: ["galvanized-steel-rolling-shutters", "stainless-steel-rolling-shutters", "windproof-rolling-shutters"],
    documents: standardDocs("Galvalume Rolling Shutter"),
    imageId: "p-shutter-galvalume",
    facets: { material: ["Galvalume"], construction: "Solid", duty: ["Standard", "Heavy"], operation: ["Manual", "Gear", "Motorized"], performance: ["Standard"] },
    comparison: { material: "Aluminium-zinc steel", thickness: "1.0–1.2 mm", corrosion: "Enhanced", operation: "Manual, gear or motorised" },
  },

  /* ==================================================== 04 ALUMINIUM */
  {
    id: "aluminium-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "architectural-rolling-shutters",
    name: "Aluminium Rolling Shutter",
    status: "CONFIRMED",
    tagline: "Light, corrosion resistant, and made to be looked at.",
    summary:
      "Roll-formed and extruded aluminium curtains in standard, heavy duty and premium configurations, for showrooms, offices and commercial entrances.",
    overview: [
      "Aluminium is specified for three reasons: it does not corrode the way steel does, it is light enough that a large curtain stays easy to operate, and it takes a finish that suits a front elevation rather than a service yard.",
      "The range runs from a roll-formed standard profile through a heavier roll-formed section to a premium extruded architectural profile. Profile dimensions differ between them, which is the point — an extruded architectural section is not the same shape as a roll-formed one, and we do not force a single steel-style profile size across the range.",
      "Because the curtain is light, aluminium automates well. A shutter that would need gear operation in steel will often run comfortably on a tubular motor in aluminium.",
    ],
    quickFacts: [
      { label: "Standard", value: "Approx. 1.0 mm class", qualified: true },
      { label: "Heavy duty", value: "Approx. 1.2–1.5 mm class", qualified: true },
      { label: "Premium", value: "Extruded, configuration dependent", qualified: true },
      { label: "Finish", value: "Mill, anodised, powder coated, RAL" },
    ],
    benefits: [
      { title: "Corrosion resistant without a coating to maintain", body: "Aluminium does not rely on a sacrificial coating, which is why it suits humid and coastal commercial elevations." },
      { title: "Light curtain, easy operation", body: "A lighter curtain is easier to operate by hand and easier to automate, and puts less load on the barrel and drive." },
      { title: "A finish for the front of the building", body: "Mill finish, anodised, powder coated or a specified RAL colour, for showrooms, offices and retail entrances." },
      { title: "Three constructions", body: "Roll-formed standard, heavier roll-formed, and an extruded architectural profile where the section itself is part of the design." },
    ],
    variants: [
      { id: "standard", name: "Standard — roll-formed", note: "Lightweight roll-formed aluminium profile in approximately the 1.0 mm class, for shops, offices and commercial entrances.", status: "CONFIRMED" },
      { id: "heavy-duty", name: "Heavy duty — roll-formed", note: "Heavier roll-formed aluminium profile in approximately the 1.2 to 1.5 mm class, for wider openings and heavier use.", status: "CONFIRMED" },
      { id: "premium", name: "Premium — extruded", note: "Extruded architectural aluminium profile. Thickness and profile dimensions are configuration dependent, because an extruded section is specified by its geometry rather than by sheet thickness.", status: "CONFIRMED" },
    ],
    applications: ["Shops", "Showrooms", "Offices", "Premium retail", "Commercial entrances"],
    industries: ["retail-commercial", "infrastructure-transit", "healthcare"],
    environments: ["internal", "external", "security"],
    operatingMethod: [
      "Roll-formed or extruded aluminium sections form the curtain, which rolls onto a barrel above the opening.",
      "Single wall, double wall or insulated construction depending on the configuration selected.",
      "Operation is manual, gear operated where applicable, or motorised — the light curtain makes motorisation straightforward.",
      "A motorised shutter carries a manual override for use during a power failure.",
    ],
    construction: [
      "Roll-formed aluminium profile, approximately 1.0 mm class on the standard configuration",
      "Heavier roll-formed profile, approximately 1.2 to 1.5 mm class on heavy duty",
      "Extruded architectural profile on the premium configuration, dimensions configuration dependent",
      "Single wall, double wall or insulated construction where applicable",
      "Mill, anodised, powder coated or RAL colour finish",
    ],
    compatibility: shutterCompatibility,
    installation: shutterInstallation,
    ordering: [...shutterOrdering, "Finish and RAL colour reference, where a specific colour is required"],
    selectionGuide: [
      ...cycleSelection,
      { condition: "A shop front or showroom entrance", recommendation: "Standard roll-formed aluminium, with the finish chosen to suit the elevation." },
      { condition: "A wider opening or heavier use", recommendation: "Heavy duty roll-formed, in approximately the 1.2 to 1.5 mm class." },
      { condition: "The profile itself is part of the architecture", recommendation: "Premium extruded. The section geometry is specified with the design rather than taken from a standard slat." },
      { condition: "Security is the dominant requirement, not appearance", recommendation: "A steel curtain will give more resistance for the money. Aluminium is chosen for corrosion, weight and finish." },
    ],
    faq: [
      { question: "What thickness is the aluminium curtain?", answer: "Approximately the 1.0 mm class on the standard roll-formed profile and approximately 1.2 to 1.5 mm on heavy duty. The premium extruded profile is configuration dependent, because an extruded section is defined by its geometry rather than by a sheet thickness." },
      { question: "Is aluminium as secure as steel?", answer: "For the same opening, a steel curtain gives more physical resistance. Aluminium is specified where corrosion resistance, curtain weight and finish matter more, which on a showroom or office entrance is often the correct trade." },
      { question: "Can we have a specific colour?", answer: "Yes. Anodised, powder coated or a specified RAL colour. Give us the RAL reference with the enquiry and it is quoted with the shutter." },
      ...commonFaq("Aluminium Rolling Shutter"),
    ],
    related: ["stainless-steel-rolling-shutters", "polycarbonate-rolling-shutters", "counter-service-rolling-shutters"],
    documents: standardDocs("Aluminium Rolling Shutter"),
    imageId: "p-shutter-aluminium",
    facets: { material: ["Aluminium"], construction: "Solid", duty: ["Standard", "Heavy"], operation: ["Manual", "Gear", "Motorized", "Smart"], performance: ["Standard"] },
    comparison: { material: "Aluminium", thickness: "Profile dependent", corrosion: "High", operation: "Manual, gear or motorised" },
    legacyUrls: ["aluminium-rolling-shutters.html", "aluminium-single-wall.html"],
  },

  /* ==================================================== 05 STAINLESS */
  {
    id: "stainless-steel-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "architectural-rolling-shutters",
    name: "Stainless Steel Rolling Shutter",
    status: "CONFIRMED",
    tagline: "For openings where the cleaning regime, or the sea, decides the specification.",
    summary:
      "SS304 and SS316 interlocking curtains in brushed, satin or polished finish, for food, pharmaceutical, healthcare and coastal installations.",
    overview: [
      "Stainless steel is specified when something in the environment will destroy a coated curtain: a washdown regime with aggressive cleaning agents, a process atmosphere, or coastal salt. It is the most expensive metal option in the range and it is chosen for a reason, not for appearance alone.",
      "SS304 covers most food, pharmaceutical and healthcare work. SS316 is the specification for genuinely aggressive or coastal environments, where the additional alloying does work that 304 cannot.",
      "Thickness is quoted by profile rather than as one number for the range. A curved interlocking slat and a heavy-duty profile are not the same section, and pretending they share a thickness would be misleading.",
    ],
    quickFacts: [
      { label: "Grades", value: "SS304 and SS316" },
      { label: "SS304 standard", value: "Approx. 0.9–1.2 mm class", qualified: true },
      { label: "SS316", value: "Configuration dependent", qualified: true },
      { label: "Finish", value: "Brushed, satin or polished" },
    ],
    benefits: [
      { title: "Survives the cleaning regime", body: "A stainless curtain tolerates washdown and cleaning agents that would strip a painted or powder coated finish." },
      { title: "Two grades, chosen deliberately", body: "SS304 for food, pharmaceutical and healthcare areas; SS316 where the environment is coastal or chemically aggressive." },
      { title: "Finish to suit the room", body: "Brushed, satin or polished, so the shutter matches the stainless already specified around it." },
      { title: "Stainless guides where it matters", body: "Guides in SS, MS or GI depending on the configuration, with stainless preferred on high-corrosion installations." },
    ],
    variants: [
      { id: "ss304-standard", name: "SS304 standard", note: "Curved interlocking SS304 curtain in approximately the 0.9 to 1.2 mm class depending on the profile selected, for food, pharmaceutical, healthcare and premium commercial openings.", status: "CONFIRMED" },
      { id: "ss304-heavy", name: "SS304 heavy duty", note: "Heavy-duty interlocking SS304 curtain in approximately the 1.2 mm class or as the profile requires, for wider openings and heavier use.", status: "CONFIRMED" },
      { id: "ss316-coastal", name: "SS316 special / coastal", note: "SS316 curtain for coastal and high-corrosion installations. Thickness is configuration dependent and is confirmed with the profile.", status: "CONFIRMED" },
    ],
    applications: ["Food processing", "Pharmaceutical manufacturing", "Hospitals and healthcare", "Premium commercial", "Coastal and high-corrosion areas"],
    industries: ["cold-chain-food", "pharmaceutical-cleanroom", "healthcare", "retail-commercial"],
    environments: ["internal", "external", "hygiene", "security"],
    operatingMethod: [
      "Interlocking stainless steel slats form the curtain, which rolls onto a barrel above the opening.",
      "Guides are specified in stainless, MS or GI according to the configuration, with stainless preferred where corrosion governs.",
      "Operation is manual, gear operated or motorised.",
      "A motorised shutter carries a manual override for use during a power failure.",
    ],
    construction: [
      "Stainless steel interlocking slats, curved or heavy-duty interlocking profile",
      "SS304 in approximately the 0.9 to 1.2 mm class depending on profile",
      "SS316 for coastal and high-corrosion work, thickness configuration dependent",
      "Guides in SS, MS or GI depending on the configuration",
      "Brushed, satin or polished finish",
    ],
    compatibility: shutterCompatibility,
    installation: shutterInstallation,
    ordering: [...shutterOrdering, "The cleaning or washdown regime the shutter has to survive, and the grade required"],
    selectionGuide: [
      ...cycleSelection,
      { condition: "A food, pharmaceutical or healthcare area", recommendation: "SS304, with the finish chosen to match the surrounding stainless." },
      { condition: "Coastal, or a chemically aggressive process", recommendation: "SS316. This is the situation the grade exists for, and 304 should not be substituted to save cost." },
      { condition: "The area is hosed down at pressure", recommendation: "Specify stainless guides as well as a stainless curtain. A stainless curtain in mild steel guides fails at the guides." },
      { condition: "Appearance is the only driver", recommendation: "Anodised or powder coated aluminium will usually give the look for less. Stainless earns its cost where the environment is genuinely aggressive." },
    ],
    faq: [
      { question: "What thickness is a stainless curtain?", answer: "It depends on the profile. SS304 standard is approximately the 0.9 to 1.2 mm class and the heavy-duty profile is approximately 1.2 mm or as the section requires; SS316 is configuration dependent. We quote thickness against the profile rather than publishing one figure for every stainless shutter." },
      { question: "When is SS316 actually necessary?", answer: "Coastal installations and chemically aggressive process areas. If the environment is a normal food or pharmaceutical production space, SS304 is usually the correct and more economical specification." },
      { question: "Should the guides be stainless too?", answer: "On a high-corrosion installation, yes. A stainless curtain running in mild steel guides moves the corrosion problem to the guides rather than solving it." },
      ...commonFaq("Stainless Steel Rolling Shutter"),
    ],
    related: ["aluminium-rolling-shutters", "counter-service-rolling-shutters", "galvalume-rolling-shutters"],
    documents: standardDocs("Stainless Steel Rolling Shutter"),
    imageId: "p-shutter-stainless",
    facets: { material: ["Stainless Steel"], construction: "Solid", duty: ["Standard", "Heavy"], operation: ["Manual", "Gear", "Motorized"], performance: ["Standard"] },
    comparison: { material: "Stainless steel", thickness: "Profile dependent", corrosion: "High", operation: "Manual, gear or motorised" },
  },

  /* =================================================== 06 PERFORATED */
  {
    id: "perforated-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "open-curtain-rolling-shutters",
    name: "Perforated Rolling Shutter",
    status: "CONFIRMED",
    tagline: "A closed shutter you can see and breathe through.",
    summary:
      "MS, GI or aluminium curtains perforated in fine, standard vision or heavy-duty patterns, for retail, malls and parking structures.",
    overview: [
      "Perforating the slat turns a solid shutter into one that still secures the opening but lets light, air and some visibility through it. That matters in two quite different places: a shop front that wants the display seen after hours, and a parking structure that needs ventilation through a secured opening.",
      "Three patterns are offered. Fine perforation prioritises security and airflow with limited visibility. Standard vision opens the pattern up for a genuine view through the curtain. Heavy-duty perforation reinforces the curtain and guide for larger or harder-worked openings.",
      "Open area is a property of the pattern, not of the product. Hole shape, size and pitch are selected with you, and the resulting open area follows from that choice rather than being a fixed figure we can publish in advance.",
    ],
    quickFacts: [
      { label: "Materials", value: "MS, GI or aluminium" },
      { label: "Metal thickness", value: "0.8 / 1.0 / 1.2 mm class", qualified: true },
      { label: "Open area", value: "Pattern specific", qualified: true },
      { label: "Sizes", value: "Custom", qualified: true },
    ],
    benefits: [
      { title: "Security with airflow", body: "The opening stays secured while air moves through it, which is why perforated curtains suit parking structures and covered service areas." },
      { title: "Three patterns for three jobs", body: "Fine for security and ventilation, standard vision for a genuine view through, heavy duty for larger or harder-worked openings." },
      { title: "Choose the material to the environment", body: "Mild steel, galvanized or aluminium, in the 0.8, 1.0 and 1.2 mm classes." },
      { title: "Pattern selected with you", body: "Hole shape, size and pitch are chosen against the visibility and airflow you need rather than fixed in advance." },
    ],
    variants: [
      { id: "fine", name: "Fine perforated", note: "A fine perforation pattern prioritising security, airflow and light transmission with limited visibility through the curtain. Hole size and pitch are configuration dependent.", status: "CONFIRMED" },
      { id: "standard-vision", name: "Standard vision perforated", note: "A more open pattern giving better visibility along with ventilation, for retail storefront security where the display should stay visible.", status: "CONFIRMED" },
      { id: "heavy-duty", name: "Heavy-duty perforated", note: "Reinforced perforated metal curtain with a heavy-duty guide, for larger openings and harder use.", status: "CONFIRMED" },
    ],
    applications: ["Shops and retail", "Showrooms", "Shopping malls", "Parking structures", "Commercial buildings"],
    industries: ["retail-commercial", "infrastructure-transit", "warehousing-logistics"],
    environments: ["internal", "external", "security"],
    operatingMethod: [
      "Perforated interlocking slats form the curtain, which rolls onto a barrel above the opening.",
      "The perforation pattern is selected against the visibility and ventilation required for the opening.",
      "Operation is manual, gear operated or motorised.",
      "A motorised shutter carries a manual override for use during a power failure.",
    ],
    construction: [
      "Perforated interlocking slats in mild steel, galvanized steel or aluminium",
      "Metal thickness in the 0.8, 1.0 or 1.2 mm class",
      "Hole shape, size and pitch selected per project",
      "Heavy-duty guide on the reinforced configuration",
    ],
    compatibility: shutterCompatibility,
    installation: shutterInstallation,
    ordering: [...shutterOrdering, "How much visibility and ventilation the opening needs, which drives the perforation pattern"],
    selectionGuide: [
      ...cycleSelection,
      { condition: "Ventilation matters more than seeing through", recommendation: "Fine perforated. It moves air and light while keeping the opening visually closed." },
      { condition: "The display should stay visible after hours", recommendation: "Standard vision perforated, or look at the vision and window shutter if you want defined window sections rather than an overall pattern." },
      { condition: "A parking structure or large service opening", recommendation: "Heavy-duty perforated with the reinforced guide." },
      { condition: "Maximum visibility and airflow is the point", recommendation: "A rolling grille will beat any perforated curtain on both, at the cost of weather closure." },
    ],
    faq: [
      { question: "What open area percentage do we get?", answer: "It depends entirely on the pattern selected, since open area is a function of hole shape, size and pitch. We will not quote a universal figure. Tell us the visibility and ventilation you need and we will confirm the pattern and the open area it gives." },
      { question: "How is this different from a vision shutter?", answer: "A perforated curtain is perforated across its area, giving diffuse light and partial visibility. A vision shutter has defined window or vision sections in an otherwise solid curtain, giving a clear view through those sections. They are different products for different intents." },
      { question: "Which material should we choose?", answer: "Mild steel for an internal or sheltered opening, galvanized where the opening is exposed, aluminium where corrosion resistance and weight matter or the shutter is on a front elevation." },
      ...commonFaq("Perforated Rolling Shutter"),
    ],
    related: ["vision-window-rolling-shutters", "grille-rolling-shutters", "polycarbonate-rolling-shutters"],
    documents: standardDocs("Perforated Rolling Shutter"),
    imageId: "p-shutter-perforated",
    facets: { material: ["MS", "GI", "Aluminium"], construction: "Perforated", duty: ["Standard", "Heavy"], operation: ["Manual", "Gear", "Motorized"], performance: ["Standard"] },
    comparison: { material: "MS, GI or aluminium", thickness: "0.8–1.2 mm", corrosion: "Material dependent", operation: "Manual, gear or motorised" },
    legacyUrls: ["perforated-rolling-shutters.html"],
  },

  /* ======================================================= 07 VISION */
  {
    id: "vision-window-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "open-curtain-rolling-shutters",
    name: "Vision / Window Rolling Shutter",
    status: "CONFIRMED",
    tagline: "Security that still lets the shop front sell.",
    summary:
      "Solid curtains with defined vision and window sections, in standard, large-vision and mixed configurations, for showrooms and retail storefronts.",
    overview: [
      "A vision shutter is a solid curtain with deliberate window sections set into it. That is a different intent from a perforated curtain: rather than a diffuse pattern across the whole area, you get a clear view through defined parts of the shutter and a solid curtain everywhere else.",
      "For a shop front that is the right trade. The display stays visible and lit after hours, which is when a good deal of window shopping actually happens, while the opening is closed and secured.",
      "Three configurations cover the range: a standard vision section, a larger vision area where visibility is the priority, and a mixed curtain that combines solid, perforated and vision sections in one curtain.",
    ],
    quickFacts: [
      { label: "Configurations", value: "Standard, large vision, mixed" },
      { label: "Vision section height", value: "Configuration dependent", qualified: true },
      { label: "Curtain", value: "Solid with defined vision sections" },
      { label: "Sizes", value: "Custom", qualified: true },
    ],
    benefits: [
      { title: "The display keeps working after hours", body: "Defined vision sections give a clear view of the storefront while the opening is closed and secured." },
      { title: "A clear view, not a diffuse one", body: "Window sections give genuine visibility through the curtain, which a perforated pattern cannot." },
      { title: "Mixed curtains where one answer is not enough", body: "Solid, perforated and vision sections can be combined in a single curtain, positioned where each is actually needed." },
      { title: "Solid where it counts", body: "The rest of the curtain stays solid, so the vision sections do not become the weak point across the whole opening." },
    ],
    variants: [
      { id: "standard-vision", name: "Standard vision", note: "A medium viewing area set into an otherwise solid curtain. Vision section height and window pattern are configuration dependent.", status: "CONFIRMED" },
      { id: "large-vision", name: "Large vision", note: "Larger window and opening sections for greater visibility, where the storefront display is the priority.", status: "CONFIRMED" },
      { id: "mixed-curtain", name: "Mixed curtain", note: "A single curtain combining solid slats, perforated sections and vision or window sections, each positioned where it is needed on the opening.", status: "CONFIRMED" },
    ],
    applications: ["Showrooms", "Retail storefronts", "Shopping malls", "Commercial storefronts"],
    industries: ["retail-commercial", "infrastructure-transit"],
    environments: ["internal", "external", "security"],
    operatingMethod: [
      "A solid interlocking curtain carries defined vision or window sections at set heights.",
      "The vision pattern and section height are set out with the shop front so the sections land where the display is.",
      "Operation is manual, gear operated or motorised.",
      "A motorised shutter carries a manual override for use during a power failure.",
    ],
    construction: [
      "Solid interlocking slats with defined vision or window sections",
      "Vision section height and window pattern configuration dependent",
      "Mixed curtain construction combining solid, perforated and vision sections where specified",
      "Material, profile and thickness selected with the configuration",
    ],
    compatibility: shutterCompatibility,
    installation: shutterInstallation,
    ordering: [...shutterOrdering, "Where the display sits behind the opening, so the vision sections can be set out to line up with it"],
    selectionGuide: [
      ...cycleSelection,
      { condition: "A shop front with a lit display", recommendation: "Standard or large vision, with the section height set out against where the display actually sits." },
      { condition: "Visibility is the dominant requirement", recommendation: "Large vision, or a rolling grille if you want the opening effectively transparent." },
      { condition: "Different parts of the opening need different things", recommendation: "A mixed curtain. Solid at the bottom where security matters, vision at eye level, perforated where you need airflow." },
      { condition: "You want diffuse light and airflow rather than a clear view", recommendation: "A perforated curtain is the correct product; these two are often confused." },
    ],
    faq: [
      { question: "How large can the vision section be?", answer: "It is configuration dependent. A bigger vision area means less solid curtain, so the section height is set against both the visibility you want and the security the opening needs. We work it out with you rather than publishing a fixed size." },
      { question: "Is a vision shutter less secure than a solid one?", answer: "The vision sections are the more accessible part of the curtain, which is why they are normally set above the level someone can easily reach and why the lower curtain stays solid. If security is the overriding concern, a solid curtain is the stronger answer." },
      { question: "Can we combine vision with perforated sections?", answer: "Yes, that is the mixed curtain configuration: solid, perforated and vision sections in one curtain, each placed where it does the most good." },
      ...commonFaq("Vision / Window Rolling Shutter"),
    ],
    related: ["perforated-rolling-shutters", "polycarbonate-rolling-shutters", "grille-rolling-shutters"],
    documents: standardDocs("Vision / Window Rolling Shutter"),
    imageId: "p-shutter-vision",
    facets: { material: ["MS", "GI", "Aluminium"], construction: "Vision", duty: ["Standard"], operation: ["Manual", "Gear", "Motorized"], performance: ["Standard"] },
    comparison: { material: "MS, GI or aluminium", thickness: "Profile dependent", corrosion: "Material dependent", operation: "Manual, gear or motorised" },
  },

  /* ======================================================= 08 GRILLE */
  {
    id: "grille-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "open-curtain-rolling-shutters",
    name: "Rolling Grille",
    status: "CONFIRMED",
    tagline: "Maximum visibility and airflow, on a curtain that still locks.",
    summary:
      "Link, lattice and bar-construction grilles in steel, aluminium and stainless, including a high-cycle configuration for constantly-operated openings.",
    overview: [
      "A rolling grille is the open end of this family. Rod, bar and link construction leaves most of the opening genuinely open, so a mall unit stays visible and a parking deck stays ventilated while the opening is secured overnight.",
      "It does not close the opening against weather, and it is not meant to. Where an opening needs both security and weather closure, a grille is often paired with a solid shutter rather than asked to do both jobs.",
      "Four configurations are offered: steel, aluminium and stainless constructions, plus a high-cycle configuration for openings operated many times a day, where the barrel, bearings and drive are specified for the duty rather than the span.",
    ],
    quickFacts: [
      { label: "Constructions", value: "Link, lattice, open security, bar/rod" },
      { label: "Bar diameter", value: "Approx. 6–8 mm class, design dependent", qualified: true },
      { label: "Opening spacing", value: "Approx. 35–150 mm, pattern dependent", qualified: true },
      { label: "Cycle rating", value: "Configuration dependent", qualified: true },
    ],
    benefits: [
      { title: "The opening stays visible", body: "An open curtain leaves the unit behind it on display, which is why malls specify grilles rather than solid shutters at the shop line." },
      { title: "Genuine ventilation", body: "Airflow through the opening is essentially unimpeded, which matters in parking structures and covered service areas." },
      { title: "Built for the duty where required", body: "The high-cycle configuration specifies the barrel, bearings and drive against how often the grille runs rather than against how wide it is." },
      { title: "Three materials", body: "Steel for cost and strength, aluminium for weight and corrosion, stainless where the environment is aggressive." },
    ],
    variants: [
      { id: "steel", name: "Steel rolling grille", note: "Steel rod, bar and link construction. Bar diameter in approximately the 6 to 8 mm class and opening spacing approximately 35 to 150 mm, both depending on the pattern selected.", status: "CONFIRMED" },
      { id: "aluminium", name: "Aluminium rolling grille", note: "Aluminium link or lattice construction, lighter and corrosion resistant, for retail and commercial entrances.", status: "CONFIRMED" },
      { id: "stainless", name: "Stainless steel rolling grille", note: "Stainless construction for high-corrosion, coastal and hygiene-sensitive installations.", status: "CONFIRMED" },
      { id: "high-cycle", name: "High-cycle security grille", note: "Specified for openings operated frequently through the day, with the barrel, bearings and drive selected against the duty. Cycle rating is confirmed for the supplied system rather than published as a headline.", status: "CONFIRMED" },
    ],
    applications: ["Retail units", "Shopping malls", "Parking structures", "Airports and transit", "Commercial entrances"],
    industries: ["retail-commercial", "infrastructure-transit"],
    environments: ["internal", "external", "security"],
    operatingMethod: [
      "Rod, bar and link elements form an open curtain which rolls onto a barrel above the opening.",
      "The grille pattern, bar diameter and opening spacing are selected against the visibility and security required.",
      "Operation is manual, gear operated or motorised; frequently-operated openings are motorised as a matter of course.",
      "A motorised grille carries a manual override for use during a power failure.",
    ],
    construction: [
      "Link, lattice, open security or bar and rod construction",
      "Steel, aluminium or stainless steel elements",
      "Bar diameter approximately 6 to 8 mm class depending on design",
      "Opening spacing approximately 35 to 150 mm depending on pattern",
      "Barrel, bearings and drive specified against duty on the high-cycle configuration",
    ],
    compatibility: shutterCompatibility,
    installation: shutterInstallation,
    ordering: [...shutterOrdering, "How many times a day the grille is operated, which decides whether the high-cycle configuration is required"],
    selectionGuide: [
      ...cycleSelection,
      { condition: "A mall unit that must stay visible", recommendation: "A rolling grille at the shop line. Nothing else gives the same visibility while closing the opening." },
      { condition: "The opening runs many times a day", recommendation: "The high-cycle configuration. On a frequently-operated grille the duty, not the span, is what wears the system out." },
      { condition: "The opening also has to keep weather out", recommendation: "A grille will not do that. Pair it with a solid shutter, or specify a solid curtain instead." },
      { condition: "Coastal or hygiene-sensitive", recommendation: "Stainless construction, and stainless guides with it." },
    ],
    faq: [
      { question: "What bar diameter and spacing do you use?", answer: "Bar diameter is typically in the 6 to 8 mm class and opening spacing approximately 35 to 150 mm, but both depend on the pattern selected. These are reference ranges for the constructions available, not one universal specification." },
      { question: "How many cycles will a grille last?", answer: "We will not publish a headline cycle figure. Cycle life depends on the specific system, its drive and how it is maintained, and we only state a rating where the supplied system has actually been validated to it. For frequently operated openings, ask for the high-cycle configuration and we will confirm what it is rated for." },
      { question: "Does a rolling grille keep weather out?", answer: "No, and it is not designed to. It secures and ventilates an opening while leaving it visible. Where weather closure is also needed, the usual answer is a grille paired with a solid shutter." },
      ...commonFaq("Rolling Grille"),
    ],
    related: ["perforated-rolling-shutters", "vision-window-rolling-shutters", "polycarbonate-rolling-shutters"],
    documents: standardDocs("Rolling Grille"),
    imageId: "p-shutter-grille",
    facets: { material: ["MS", "Aluminium", "Stainless Steel"], construction: "Grille", duty: ["Standard", "Heavy"], operation: ["Manual", "Gear", "Motorized"], performance: ["Standard", "High Cycle"] },
    comparison: { material: "Steel, aluminium or stainless", thickness: "Bar and link dependent", corrosion: "Material dependent", operation: "Manual, gear or motorised" },
  },

  /* ================================================ 09 POLYCARBONATE */
  {
    id: "polycarbonate-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "transparent-rolling-shutters",
    name: "Transparent Polycarbonate Rolling Shutter",
    status: "CONFIRMED",
    tagline: "Closed, secured, and still a shop window.",
    summary:
      "UV-resistant polycarbonate curtains with aluminium connectors, clear or tinted, for showrooms, jewellery retail and premium storefronts.",
    overview: [
      "A polycarbonate shutter closes the opening with transparent interlocking sections instead of metal slats. The storefront stays a storefront: the display is visible, lit and selling, while the opening is closed.",
      "It is specified where the value of the display being seen outweighs the extra cost over a grille, which is why it is most common in jewellery, luxury retail and high-end showrooms in covered malls.",
      "Polycarbonate sections interlock with aluminium connectors, with stainless connecting hardware where the environment requires it. Operation is primarily motorised, with manual emergency operation where the configuration allows.",
    ],
    quickFacts: [
      { label: "Material", value: "UV-resistant polycarbonate" },
      { label: "Standard thickness", value: "Approx. 2–3 mm class", qualified: true },
      { label: "Heavier / custom", value: "Approx. 3–5 mm class", qualified: true },
      { label: "Sizes", value: "Profile and drive dependent", qualified: true },
    ],
    benefits: [
      { title: "The display keeps selling", body: "A transparent curtain leaves the storefront visible and lit while the opening is closed and secured." },
      { title: "UV-resistant material", body: "The polycarbonate is UV stabilised, which is what keeps a transparent curtain from yellowing in a daylit mall atrium." },
      { title: "A premium appearance", body: "Clear or tinted sections with aluminium connectors, for elevations where a metal shutter would look wrong." },
      { title: "Built to be operated", body: "Primarily motorised, with manual emergency operation where the configuration allows it." },
    ],
    variants: [
      { id: "clear", name: "Clear", note: "Clear UV-resistant polycarbonate sections, for maximum visibility of the display behind the opening.", status: "CONFIRMED" },
      { id: "tinted", name: "Tinted", note: "Tinted polycarbonate sections, where glare or a degree of screening is wanted alongside visibility.", status: "CONFIRMED" },
      { id: "premium-security", name: "Premium security", note: "A heavier configuration for premium retail. Section thickness, connector and hardware specification are confirmed per project.", status: "CONFIRMED" },
    ],
    applications: ["Showrooms", "Luxury retail", "Jewellery retail", "Shopping malls", "Premium commercial"],
    industries: ["retail-commercial", "infrastructure-transit"],
    environments: ["internal", "security"],
    operatingMethod: [
      "Transparent polycarbonate sections interlock with aluminium connectors to form the curtain.",
      "Connecting rods and hardware are specified with the configuration, in stainless where the environment requires it.",
      "The curtain rolls onto a barrel above the opening and runs in guides at both jambs.",
      "Operation is primarily motorised, with manual emergency operation where the configuration allows it.",
    ],
    construction: [
      "UV-resistant polycarbonate interlocking sections",
      "Approximately 2 to 3 mm standard class, or 3 to 5 mm heavier and custom class",
      "Aluminium connectors, with stainless connecting hardware where applicable",
      "Guide material and bottom profile specified with the configuration",
      "Clear or tinted sections",
    ],
    compatibility: shutterCompatibility,
    installation: shutterInstallation,
    ordering: [...shutterOrdering, "Whether clear or tinted is required, and the lighting conditions the storefront sits in"],
    selectionGuide: [
      ...cycleSelection,
      { condition: "The display is the reason the shutter is being bought", recommendation: "Clear polycarbonate. Nothing else keeps a storefront this visible while closed." },
      { condition: "Strong daylight or glare on the elevation", recommendation: "Tinted sections." },
      { condition: "The opening is large", recommendation: "Size is limited by the profile and drive rather than by a catalogue figure. Send the opening dimensions and we will confirm what the configuration supports." },
      { condition: "Physical attack resistance is the requirement", recommendation: "A metal shutter or grille is the honest answer. We do not present polycarbonate as a security-rated barrier." },
    ],
    faq: [
      { question: "How thick are the polycarbonate sections?", answer: "Approximately the 2 to 3 mm class as standard, with a 3 to 5 mm heavier and custom class available. These are reference ranges for the profiles available rather than universal values, and the section is confirmed with the configuration." },
      { question: "Is a polycarbonate shutter bulletproof or unbreakable?", answer: "No, and we will not describe it that way. It is a transparent security shutter for storefronts. We publish no impact, ballistic or fire performance for it, because no such test data has been supplied to us." },
      { question: "Will it yellow over time?", answer: "The material is UV stabilised, which is what the UV-resistant specification is for. We do not publish a discolouration figure or a service life, because that depends on the installation and the exposure." },
      { question: "How large can the opening be?", answer: "Maximum size depends on the selected profile and drive system rather than on a fixed catalogue limit. Give us the opening and we will confirm what is achievable." },
      ...commonFaq("Transparent Polycarbonate Rolling Shutter"),
    ],
    related: ["vision-window-rolling-shutters", "grille-rolling-shutters", "aluminium-rolling-shutters"],
    documents: standardDocs("Transparent Polycarbonate Rolling Shutter"),
    imageId: "p-shutter-polycarbonate",
    facets: { material: ["Polycarbonate"], construction: "Transparent", duty: ["Standard"], operation: ["Motorized", "Smart"], performance: ["Standard"] },
    comparison: { material: "Polycarbonate", thickness: "2–5 mm class", corrosion: "Not applicable", operation: "Primarily motorised" },
    legacyUrls: ["polycarbonate-rolling-shutters.html", "polycarbonate.html"],
  },

  /* ==================================================== 10 INSULATED */
  {
    id: "insulated-double-wall-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "insulated-rolling-shutters",
    name: "Insulated Rolling Shutter",
    status: "CONFIRMED",
    tagline: "A double-wall slat with a core, where the opening separates two climates.",
    summary:
      "Double-wall aluminium, GI or steel slats with an insulating core, in standard, thermal and industrial configurations, for warehouses, food and temperature-controlled areas.",
    overview: [
      "An insulated shutter replaces the single-skin slat with a double-wall profile and an insulating core. That does two things at once: it slows heat transfer through the closed opening, and it noticeably reduces noise through it.",
      "It is specified where an opening separates two environments that need to stay different — a temperature-controlled store from a dispatch hall, a production area from a yard, or a loading area from an office elevation.",
      "Core material and thickness are selected against the requirement rather than fixed. PU, PIR, mineral wool and other tested insulations are all used, and which one is right depends on the thermal, acoustic and fire requirements of the opening.",
    ],
    quickFacts: [
      { label: "Construction", value: "Double-wall profile with core" },
      { label: "Face materials", value: "Aluminium, GI or steel" },
      { label: "Core thickness", value: "Configuration dependent", qualified: true },
      { label: "Thermal performance", value: "Configuration dependent", qualified: true },
    ],
    benefits: [
      { title: "Thermal separation", body: "A double-wall slat with an insulating core slows heat transfer through a closed opening in a way a single-skin curtain cannot." },
      { title: "Quieter openings", body: "The same construction reduces noise transfer, which matters where a production or loading area backs onto occupied space." },
      { title: "Better sealing", body: "Guide and bottom seals close the perimeter, which is what turns an insulated curtain into an insulated opening." },
      { title: "Core selected to the requirement", body: "PU, PIR, mineral wool or another tested insulation, chosen against the thermal, acoustic and fire requirements rather than fixed by product line." },
    ],
    variants: [
      { id: "standard", name: "Standard insulated", note: "Double-wall profile with an insulating core, for general commercial and light industrial openings that need thermal and acoustic separation.", status: "CONFIRMED" },
      { id: "thermal", name: "Thermal insulated", note: "Specified where thermal separation is the primary requirement, with the core and the perimeter sealing selected against the differential the opening has to hold.", status: "CONFIRMED" },
      { id: "industrial", name: "Industrial insulated", note: "Heavier construction for industrial openings, with the curtain, guide and drive sized for the span as well as the insulation requirement.", status: "CONFIRMED" },
    ],
    applications: ["Warehouses", "Factories", "Loading areas", "Food processing", "Temperature-controlled spaces"],
    industries: ["cold-chain-food", "manufacturing", "warehousing-logistics"],
    environments: ["internal", "external", "cold"],
    operatingMethod: [
      "Double-wall slats with an insulating core form the curtain, which rolls onto a barrel above the opening.",
      "Guide and bottom seals close the perimeter so the insulated curtain becomes an insulated opening.",
      "Operation is manual, gear operated or motorised depending on curtain weight.",
      "A motorised shutter carries a manual override for use during a power failure.",
    ],
    construction: [
      "Double-wall slat profile with an insulating core",
      "Face material in aluminium, GI or steel",
      "Core in PU, PIR, mineral wool or another tested insulation",
      "Core thickness and overall profile thickness configuration dependent",
      "Guide seal and bottom seal to close the perimeter",
    ],
    compatibility: shutterCompatibility,
    installation: [
      ...shutterInstallation,
      "Where the opening separates temperatures, the perimeter seal detail is set out with the building fabric rather than fitted afterwards.",
    ],
    ordering: [...shutterOrdering, "The temperature or acoustic differential the opening has to hold, which decides the core and the sealing"],
    selectionGuide: [
      ...cycleSelection,
      { condition: "The opening separates two temperatures", recommendation: "State the differential. It decides the core, the core thickness and the perimeter sealing, which together are what actually deliver the performance." },
      { condition: "Noise through the opening is the problem", recommendation: "The same construction helps, but state the acoustic requirement explicitly, because it can point at a different core." },
      { condition: "A large industrial span as well as insulation", recommendation: "The industrial insulated configuration, where the curtain and drive are sized for the span alongside the insulation." },
      { condition: "The room is a freezer and the opening is used constantly", recommendation: "An insulated shutter is not a rapid door. Where cycle time drives the air exchange, look at the high speed cold storage door instead." },
    ],
    faq: [
      { question: "What U-value does it achieve?", answer: "We only publish a U-value where real test data exists for the specific construction, and none has been supplied for these configurations. Tell us the differential the opening has to hold and we will specify the core and sealing against it rather than quote a number we cannot support." },
      { question: "How thick is the insulating core?", answer: "It is configuration dependent. Core material and thickness are chosen against the thermal and acoustic requirement, so there is no single figure that applies across the range." },
      { question: "Does it reduce noise as well as heat?", answer: "Yes, the double-wall construction with a core reduces noise transfer as well. If acoustic performance is the main reason for specifying it, say so, because it can change which core is appropriate." },
      ...commonFaq("Insulated Rolling Shutter"),
    ],
    related: ["industrial-rolling-shutters", "galvanized-steel-rolling-shutters", "high-speed-cold-storage-freezer-door"],
    documents: standardDocs("Insulated Rolling Shutter"),
    imageId: "p-shutter-insulated",
    facets: { material: ["Aluminium", "GI", "MS"], construction: "Insulated", duty: ["Standard", "Heavy", "Industrial"], operation: ["Manual", "Gear", "Motorized"], performance: ["Insulated"] },
    comparison: { material: "Aluminium, GI or steel", thickness: "Double-wall, core dependent", corrosion: "Material dependent", operation: "Manual, gear or motorised" },
    legacyUrls: ["insulated-rolling-shutters.html"],
  },

  /* =================================================== 11 INDUSTRIAL */
  {
    id: "industrial-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "industrial-rolling-shutters",
    name: "Industrial Rolling Shutter",
    status: "CONFIRMED",
    tagline: "Engineered as an assembly, not selected from a size list.",
    summary:
      "Heavy GI and MS curtains with reinforced guides, heavy shafts and industrial drives, in standard, heavy duty and extra heavy duty configurations.",
    overview: [
      "Past a certain opening size, a rolling shutter stops being a product you pick and becomes an assembly you engineer. Curtain weight sets the shaft. The shaft sets the brackets. The guide has to hold the curtain against whatever load the elevation sees. The drive has to move all of it, repeatedly, and stop it safely.",
      "That is what this line is. Three configurations cover increasing spans and loads, and in each of them the curtain, guide, shaft and drive are sized together rather than mixed and matched.",
      "We deliberately do not publish a maximum width or height. Large openings are available subject to engineering, and what is achievable on your opening depends on curtain weight, profile, shaft, guide, wind load and the drive system.",
    ],
    quickFacts: [
      { label: "Curtain", value: "GI / MS, approx. 1.0–1.2 mm class", qualified: true },
      { label: "Guide", value: "Reinforced" },
      { label: "Drive", value: "Side or industrial drive" },
      { label: "Sizes", value: "Subject to engineering", qualified: true },
    ],
    benefits: [
      { title: "Sized as one assembly", body: "Curtain, guide, shaft, brackets and drive are specified together against the opening rather than assembled from separate standard parts." },
      { title: "Built for continuous duty", body: "Heavy shaft, industrial drive and a reinforced guide, for openings that work all day rather than opening twice." },
      { title: "Safety as part of the specification", body: "Photocell, emergency stop and emergency manual override on every configuration, with a safety edge available." },
      { title: "Options that suit large openings", body: "Wind locks, a wicket door for pedestrians, an intermediate mullion on a wide span, and vision sections in the curtain." },
    ],
    variants: [
      { id: "standard", name: "Industrial standard", note: "GI or MS heavy-duty curtain in approximately the 1.0 to 1.2 mm class, reinforced guide, heavy-duty shaft and a side or industrial drive, motorised with emergency manual override.", status: "CONFIRMED" },
      { id: "heavy-duty", name: "Industrial heavy duty", note: "1.2 mm class or engineered heavier construction, reinforced guide, heavy shaft and barrel, industrial drive, with a wind-lock option.", status: "CONFIRMED" },
      { id: "extra-heavy-duty", name: "Industrial extra heavy duty", note: "Engineered heavy profile with reinforced guide, heavy shaft, direct or indirect industrial drive and wind-load engineering for the specific opening.", status: "CONFIRMED" },
    ],
    applications: ["Factories and production halls", "Warehouses", "Loading and dispatch areas", "Industrial buildings", "Large vehicle openings"],
    industries: ["manufacturing", "warehousing-logistics", "automotive"],
    environments: ["internal", "external", "security"],
    operatingMethod: [
      "A heavy interlocking curtain rolls onto a heavy-duty shaft carried on engineered brackets above the opening.",
      "Reinforced guides retain the curtain against the load the opening imposes; wind locks are added where the elevation requires them.",
      "A side or industrial drive, direct or indirect depending on the configuration, powers the shutter.",
      "A photocell, emergency stop and emergency manual override govern operation, with a safety edge available.",
    ],
    construction: [
      "GI or MS heavy-duty curtain, approximately 1.0 to 1.2 mm class, or engineered heavier on the extra heavy duty configuration",
      "Reinforced guide, with wind-lock option",
      "Heavy-duty shaft and barrel with engineered brackets",
      "Side, industrial, direct or indirect drive depending on configuration",
      "Wicket door, intermediate mullion and vision section available as options",
    ],
    compatibility: [
      ...shutterCompatibility,
      {
        system: "Traffic signalling",
        detail:
          "Volt-free outputs drive red and green lights either side of a large vehicle opening, so drivers are told when to approach.",
      },
    ],
    installation: [
      ...shutterInstallation,
      "On a large opening the structural capacity of the lintel and jambs is checked against the assembly weight and the load path before manufacture, not on the day of installation.",
    ],
    ordering: [
      ...shutterOrdering,
      "The wind exposure of the elevation, where the opening is external",
      "Whether a wicket door, intermediate mullion or vision section is required",
      "Any traffic signalling or access control the shutter has to interface with",
    ],
    selectionGuide: [
      ...cycleSelection,
      { condition: "The opening is beyond the standard MS and GI range", recommendation: "This is the line. Rather than a thicker curtain in a standard assembly, the whole assembly is engineered to the opening." },
      { condition: "A wide vehicle opening", recommendation: "Consider an intermediate mullion, which lets a wide span be closed without an unmanageable single curtain." },
      { condition: "People need to pass through when the shutter is closed", recommendation: "A wicket door in the curtain, so the main shutter is not cycled for pedestrian traffic." },
      { condition: "The elevation is wind exposed", recommendation: "Wind locks and wind-load engineering. See the windproof and storm-resistant line, which can also be applied as a configuration here." },
    ],
    faq: [
      { question: "What is the maximum size you can supply?", answer: "We do not publish one, because there is not an honest single answer. Large openings are available subject to engineering, and what is achievable depends on curtain weight, profile, shaft, guide, wind load and the drive system. Send the opening and we will tell you what it takes." },
      { question: "What is the difference between the three configurations?", answer: "Increasing span and load. Standard is a heavy-duty curtain in approximately the 1.0 to 1.2 mm class on a reinforced guide. Heavy duty steps to 1.2 mm class or engineered heavier with a heavier shaft and a wind-lock option. Extra heavy duty is engineered per opening, including the wind-load calculation." },
      { question: "Can people get through without opening the whole shutter?", answer: "Yes, with a wicket door in the curtain. On a busy opening that is worth specifying, because it stops the main shutter being cycled every time someone walks through." },
      { question: "What safety devices are included?", answer: "Photocell, emergency stop and an emergency manual override independent of the power supply, with a safety edge available. On a curtain this heavy those are part of the specification rather than options." },
      ...commonFaq("Industrial Rolling Shutter"),
    ],
    related: ["windproof-rolling-shutters", "insulated-double-wall-rolling-shutters", "galvanized-steel-rolling-shutters"],
    documents: standardDocs("Industrial Rolling Shutter"),
    imageId: "p-shutter-industrial",
    facets: { material: ["GI", "MS"], construction: "Solid", duty: ["Industrial", "Heavy"], operation: ["Motorized", "Gear"], performance: ["Standard", "Wind Resistant"] },
    comparison: { material: "GI or mild steel", thickness: "1.0–1.2 mm and engineered", corrosion: "Material dependent", operation: "Motorised with manual override" },
  },

  /* ====================================================== 12 COUNTER */
  {
    id: "counter-service-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "counter-rolling-shutters",
    name: "Counter / Service Window Shutter",
    status: "CONFIRMED",
    tagline: "A small shutter for a service opening, finished for the room it sits in.",
    summary:
      "Aluminium, GI and stainless counter shutters for service counters, food counters, pharmacies, ticket windows and kiosks.",
    overview: [
      "A counter shutter closes a service opening rather than a doorway. It is smaller, lighter and operated far more often than a building shutter, and it is usually visible from inside a finished room, so the finish matters as much as the mechanism.",
      "Three materials cover almost all of it. Aluminium for general service counters and kiosks, GI where cost governs and the opening is not on show, and stainless where the counter is in a food or clinical area and has to survive cleaning.",
      "Sizes are set by the opening. There is no standard counter shutter size, and there should not be, because the whole point is that it fits the aperture in the joinery or the wall.",
    ],
    quickFacts: [
      { label: "Aluminium", value: "Approx. 1.0 mm class", qualified: true },
      { label: "GI", value: "Approx. 0.8–1.0 mm class", qualified: true },
      { label: "Stainless", value: "SS304 class", qualified: true },
      { label: "Sizes", value: "To the opening", qualified: true },
    ],
    benefits: [
      { title: "Made to the service opening", body: "Designed around the aperture in the counter or wall rather than fitted from a standard size." },
      { title: "Operated many times a day", body: "Light curtain and a compact headbox, so opening and closing by hand stays easy across a shift." },
      { title: "A finish that suits the room", body: "Anodised or powder coated aluminium, galvanized, or stainless in a food or clinical area." },
      { title: "Locks where it needs to", body: "Integral locking at the bottom rail, so the counter is secured without a separate fitting." },
    ],
    variants: [
      { id: "aluminium", name: "Aluminium counter shutter", note: "Approximately 1.0 mm class aluminium construction where applicable, for service counters, kiosks and reception openings.", status: "CONFIRMED" },
      { id: "gi", name: "GI counter shutter", note: "Approximately 0.8 to 1.0 mm class galvanized construction where applicable, where cost governs and the opening is not on display.", status: "CONFIRMED" },
      { id: "stainless", name: "Stainless steel counter shutter", note: "SS304-class construction where applicable, for food counters, pharmacies and clinical service openings that are cleaned regularly.", status: "CONFIRMED" },
    ],
    applications: ["Service counters", "Food counters", "Pharmacies", "Ticket windows", "Kiosks", "Reception and service openings"],
    industries: ["retail-commercial", "healthcare", "cold-chain-food", "infrastructure-transit"],
    environments: ["internal", "hygiene", "security"],
    operatingMethod: [
      "A light interlocking curtain rolls onto a compact barrel in a headbox above the service opening.",
      "The curtain runs in slim guides at both sides and closes onto a bottom rail with an integral lock.",
      "Operation is manual, gear operated, or motorised where the size and use suit it.",
      "Face mounted, fitted between the jambs or recessed into the joinery depending on the detail.",
    ],
    construction: [
      "Aluminium construction in approximately the 1.0 mm class where applicable",
      "Galvanized construction in approximately the 0.8 to 1.0 mm class where applicable",
      "SS304-class stainless construction where applicable",
      "Compact headbox, slim guides and a bottom rail with integral lock",
      "Anodised, powder coated, galvanized or stainless finish",
    ],
    compatibility: shutterCompatibility,
    installation: [
      "A survey confirms the aperture in the counter or wall, the headroom above it for the headbox, and the side clearance for the guides.",
      "The mounting detail is agreed with the joiner or the builder: face mounted, between jamb, or recessed into the joinery.",
      "Where the shutter is motorised, a local supply is provided at the headbox.",
      "Commissioning sets the limits, tests the lock and hands over operation.",
    ],
    ordering: [
      "Clear width and height of the service opening",
      "Headroom above the opening for the headbox",
      "Side clearance available for the guides",
      "Face mounted, between jamb or recessed",
      "Material and finish, and whether it has to survive a cleaning regime",
      "Locking requirement, and whether motorisation is wanted",
    ],
    selectionGuide: [
      { condition: "A food counter or pharmacy service window", recommendation: "Stainless. The cleaning regime rather than the size is what decides it." },
      { condition: "A reception, kiosk or ticket window on show", recommendation: "Aluminium, anodised or powder coated to suit the joinery." },
      { condition: "A back-of-house service opening", recommendation: "GI is the economical answer where the opening is not on display." },
      { condition: "The opening is large enough to be awkward by hand", recommendation: "Motorise it. A counter shutter is operated far more often than a building shutter, and hand operation stops being reasonable quite quickly." },
    ],
    faq: [
      { question: "What sizes do counter shutters come in?", answer: "They are made to the opening. Give us the clear width and height of the service aperture plus the headroom and side clearance available and we will confirm the configuration." },
      { question: "Which material for a food counter?", answer: "Stainless, in SS304 class. It is the only one of the three that reliably survives the cleaning agents used in a food or clinical area." },
      { question: "Can a counter shutter be motorised?", answer: "Yes, where the size and use suit it. Because a counter shutter is operated so frequently, motorisation is often worth more here than on a larger building shutter." },
      { question: "How is it fixed to the counter?", answer: "Face mounted, between the jambs, or recessed into the joinery. The detail is agreed with your joiner or builder at survey, because it has to be coordinated before the joinery is made." },
    ],
    related: ["stainless-steel-rolling-shutters", "aluminium-rolling-shutters", "galvanized-steel-rolling-shutters"],
    documents: standardDocs("Counter / Service Window Shutter"),
    imageId: "p-shutter-counter",
    facets: { material: ["Aluminium", "GI", "Stainless Steel"], construction: "Solid", duty: ["Light", "Standard"], operation: ["Manual", "Gear", "Motorized"], performance: ["Standard"] },
    comparison: { material: "Aluminium, GI or stainless", thickness: "0.8–1.0 mm class", corrosion: "Material dependent", operation: "Manual, gear or motorised" },
  },

  /* ==================================================== 13 WINDPROOF */
  {
    id: "windproof-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "industrial-rolling-shutters",
    name: "Windproof / Storm-Resistant Rolling Shutter",
    status: "CONFIRMED",
    tagline: "Engineered for high-wind and storm-prone environments, to the project wind load.",
    summary:
      "Reinforced curtains with wind locks, end locks and engineered anchoring, in windproof standard, heavy duty and storm-resistant configurations.",
    overview: [
      "Wind does not load a shutter evenly, and it does not fail one politely. A curtain that is not retained properly leaves its guides, and once that happens the opening is gone and so, often, is what was behind it. A wind-rated shutter is about retention and anchoring at least as much as it is about curtain thickness.",
      "This line reinforces the whole load path: a reinforced interlocking curtain, wind locks and end locks that keep it in the guides, a wind-resistant guide section, a reinforced bottom bar, and structural fixing sized for the load rather than for convenience.",
      "It can also be applied as an upgrade to a suitable MS, GI, Galvalume or industrial shutter rather than being a separate purchase, which is often the right answer on a building with a mix of exposed and sheltered openings.",
    ],
    quickFacts: [
      { label: "Curtain", value: "Reinforced, 1.0 / 1.2 mm class", qualified: true },
      { label: "Retention", value: "Wind locks and end locks" },
      { label: "Wind performance", value: "To project wind load", qualified: true },
      { label: "Sizes", value: "To project wind loads", qualified: true },
    ],
    benefits: [
      { title: "Retention along the whole load path", body: "Wind locks and end locks keep the curtain in the guides under load, which is the failure that actually matters on an exposed opening." },
      { title: "Engineered to the project, not to a slogan", body: "Specified against the site wind load, the opening dimensions and the anchoring arrangement rather than against a headline wind speed." },
      { title: "Reinforced where the load goes", body: "Wind-resistant guide section, reinforced bottom bar, heavy-duty shaft and structural fixing sized for the load path." },
      { title: "Available as an upgrade", body: "Can be applied as a configuration on suitable MS, GI, Galvalume and industrial shutters instead of being specified as a separate product." },
    ],
    variants: [
      { id: "windproof-standard", name: "Windproof standard", note: "Reinforced interlocking curtain in the 1.0 or 1.2 mm class with a wind-resistant guide, wind locks, end locks and a reinforced bottom bar.", status: "CONFIRMED" },
      { id: "windproof-heavy", name: "Windproof heavy duty", note: "1.2 mm class or engineered heavier profile with a reinforced guide, enhanced end locking, a wind-lock system and a heavy-duty shaft.", status: "CONFIRMED" },
      { id: "storm-resistant", name: "Storm-resistant", note: "Project-engineered curtain with reinforced guides, wind locks, storm anchoring, structural fixing and an appropriately sized shaft and drive.", status: "CONFIRMED" },
    ],
    applications: ["Coastal buildings", "Cyclone-prone locations", "High-wind sites", "Exposed commercial buildings", "Industrial facilities"],
    industries: ["manufacturing", "warehousing-logistics", "infrastructure-transit"],
    environments: ["external", "security"],
    operatingMethod: [
      "A reinforced interlocking curtain runs in a wind-resistant guide section at both jambs.",
      "Wind locks and end locks retain the curtain in the guides under load, which is what stops it leaving the guide in a gust.",
      "A reinforced bottom bar and heavy-duty shaft carry the load into engineered structural fixings.",
      "Operation is motorised with an emergency manual override, with the drive sized for the reinforced assembly.",
    ],
    construction: [
      "Reinforced interlocking curtain in the 1.0 or 1.2 mm class, or engineered heavier",
      "Wind-resistant guide section with wind locks and enhanced end locking",
      "Reinforced bottom bar",
      "Heavy-duty shaft with storm anchoring and structural fixing on the storm-resistant configuration",
    ],
    compatibility: shutterCompatibility,
    installation: [
      ...shutterInstallation,
      "The structural fixing and anchoring are designed against the project wind load and the substrate, and are as much a part of the wind performance as the curtain is.",
      "The elevation exposure is established before the guide section and locking arrangement are selected.",
    ],
    ordering: [
      ...shutterOrdering,
      "The site wind load or wind classification the opening has to be designed to",
      "The substrate and structural arrangement available for anchoring",
      "Any tested configuration or documentation the project specification requires",
    ],
    selectionGuide: [
      ...cycleSelection,
      { condition: "A coastal or cyclone-prone site", recommendation: "The storm-resistant configuration, engineered against the project wind load with the anchoring designed alongside it." },
      { condition: "An exposed elevation but not a storm-rated requirement", recommendation: "Windproof standard or heavy duty, with the guide and locking selected against the exposure." },
      { condition: "A mix of exposed and sheltered openings on one building", recommendation: "Apply the wind configuration as an upgrade to the suitable MS, GI, Galvalume or industrial shutters rather than specifying a separate product throughout." },
      { condition: "The specification calls for a tested wind classification", recommendation: "Tell us at enquiry. Wind classification is confirmed against tested configurations and the documentation required, not asserted." },
    ],
    faq: [
      { question: "What wind speed is it rated to?", answer: "We do not publish a wind speed, and we would be sceptical of anyone who does without naming the test. Wind performance depends on the site wind load, the opening dimensions, the guide and anchoring arrangement and the selected configuration. Give us the project wind load and we will engineer to it." },
      { question: "What actually makes a shutter windproof?", answer: "Retention. Wind locks and end locks keeping the curtain in a wind-resistant guide, a reinforced bottom bar, and anchoring sized for the load path. A thicker curtain on its own does not solve it, because the failure is the curtain leaving the guide." },
      { question: "Can we upgrade our existing shutters instead?", answer: "Where the shutter is suitable, yes. The wind configuration can be applied to MS, GI, Galvalume and industrial shutters, which is often the sensible answer when only some openings on a building are exposed." },
      { question: "Is it storm-proof?", answer: "We will not use that word. It is engineered for high-wind and storm-prone environments according to project-specific wind-load requirements, and its performance is defined by the configuration and the anchoring rather than by a claim." },
      ...commonFaq("Windproof / Storm-Resistant Rolling Shutter"),
    ],
    related: ["industrial-rolling-shutters", "galvalume-rolling-shutters", "galvanized-steel-rolling-shutters"],
    documents: standardDocs("Windproof / Storm-Resistant Rolling Shutter"),
    imageId: "p-shutter-windproof",
    facets: { material: ["MS", "GI", "Galvalume", "Aluminium"], construction: "Wind Resistant", duty: ["Standard", "Heavy", "Industrial"], operation: ["Motorized", "Gear"], performance: ["Wind Resistant", "Storm Resistant"] },
    comparison: { material: "MS, GI, Galvalume or aluminium", thickness: "1.0–1.2 mm and engineered", corrosion: "Material dependent", operation: "Motorised with manual override" },
  },
];

/**
 * Size statements, published per line so that no universal maximum is implied
 * anywhere in the family. Rendered in the Dimensions accordion section.
 */
export const shutterSizeStatements: Record<string, string> = {
  "ms-solid-rolling-shutters": SIZE_CUSTOM,
  "galvanized-steel-rolling-shutters": SIZE_CUSTOM,
  "galvalume-rolling-shutters": SIZE_CUSTOM,
  "aluminium-rolling-shutters": SIZE_CUSTOM,
  "stainless-steel-rolling-shutters": SIZE_CUSTOM,
  "perforated-rolling-shutters": SIZE_CUSTOM,
  "vision-window-rolling-shutters": SIZE_CUSTOM,
  "grille-rolling-shutters": SIZE_CUSTOM,
  "polycarbonate-rolling-shutters": SIZE_POLY,
  "insulated-double-wall-rolling-shutters": SIZE_CUSTOM,
  "industrial-rolling-shutters": SIZE_ENGINEERED,
  "counter-service-rolling-shutters": SIZE_COUNTER,
  "windproof-rolling-shutters": SIZE_WIND,
  "fire-rated-rolling-shutters": "Maximum size subject to the tested configuration.",
};

/** The general caveat shown under every shutter specification table. */
export const SHUTTER_DISCLAIMER =
  "Specifications may vary according to opening dimensions, selected profile, material, operating method, site conditions and final system configuration.";

/** Shown additionally on the wind-rated line. */
export const WIND_DISCLAIMER =
  "Wind performance depends on site wind load, opening dimensions, the guide and anchoring arrangement and the selected system configuration.";

/** Shown additionally on the fire-rated line. */
export const FIRE_DISCLAIMER =
  "Fire-rated performance applies only to tested and certified system configurations.";
