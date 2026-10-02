import type { Product } from "@/lib/types";

/**
 * Fire & Safety Doors — 2 products.
 *
 * Fire Rated Rolling Shutters require project-specific performance evidence;
 * do not publish a fire-resistance duration without supporting documentation.
 */
export const fireSafetyProducts: Product[] = [
  {
    id: "fire-rated-rolling-shutters",
    familyId: "fire-safety-doors",
    categoryId: "fire-rated-shutters",
    name: "Fire Rated Rolling Shutters",
    status: "CONFIRMED",
    tagline:
      "Fire-resistant rolling shutter systems designed for fire compartmentation applications.",
    summary:
      "Fire-resistant rolling shutter systems designed for fire compartmentation applications. Specific fire-resistance performance depends on the product configuration, tested assembly, dimensions and installation conditions.",
    overview: [
      "These systems are intended for large openings within fire compartmentation applications. Project-specific performance must be confirmed against the proposed configuration and supporting documentation.",
      "The shutter uses heavy-duty uninsulated metallic construction with an interlocking steel slat curtain of 1.2 mm nominal thickness, for openings up to 6000 mm wide × 6000 mm high.",
      "In normal use the shutter is motorized. On a fire signal from the building fire alarm system, the automatic fire-release mechanism releases the curtain for controlled descent, and emergency / manual operation is provided.",
      "Specific fire-resistance performance depends on the product configuration, tested assembly, dimensions and installation conditions. Relevant test reports and compliance documentation should be requested for the project configuration.",
    ],
    quickFacts: [
      { label: "Fire performance", value: "Configuration and project documentation dependent", qualified: true },
      { label: "Normal operation", value: "Motorized" },
      { label: "Maximum opening", value: "6000 × 6000 mm" },
      { label: "Fire closure", value: "Automatic on fire signal" },
    ],
    benefits: [
      {
        title: "Project-specific fire performance",
        body: "Specific performance depends on the product configuration, tested assembly, dimensions and installation conditions. Request project documentation for the proposed configuration.",
      },
      {
        title: "Automatic fire closure",
        body: "Fire alarm interface and automatic fire-release mechanism for controlled descent of the curtain on a fire signal.",
      },
      {
        title: "Large openings",
        body: "Designed for openings up to 6000 mm wide × 6000 mm high in industrial and commercial buildings.",
      },
      {
        title: "Heavy-duty steel construction",
        body: "Interlocking steel fire-rated slats, heavy-duty structural steel side guides, reinforced steel bottom bar, steel barrel and steel hood.",
      },
    ],
    variants: [],
    applications: [
      "Industrial manufacturing facilities",
      "Warehouses & logistics centres",
      "Fire compartment openings",
      "Electrical & utility rooms",
      "Plant & process areas",
      "Commercial buildings",
      "Service & material openings",
      "Industrial fire separation",
    ],
    industries: ["manufacturing", "warehousing-logistics", "retail-commercial", "healthcare"],
    environments: ["fire", "internal"],
    operatingMethod: [
      "Normal operation: the shutter is opened and closed by its motor and gearbox for daily use.",
      "Fire signal: the building fire alarm system signals the shutter through the fire alarm interface.",
      "Fire release: the automatic fire-release mechanism releases the curtain.",
      "Automatic closure: the curtain descends under control to close the opening.",
      "The curtain descends under control to close the opening. Project-specific fire performance depends on the configuration and its supporting documentation. Emergency / manual operation is provided.",
    ],
    construction: [
      "Steel curtain, 1.2 mm nominal thickness",
      "Interlocking steel slats",
      "Heavy-duty structural steel side guides",
      "Reinforced steel bottom bar",
      "Heavy-duty steel barrel assembly",
      "Structural brackets",
      "Steel hood — protective enclosure",
      "Motor / gearbox for motorized normal operation",
      "Automatic fire-release mechanism",
      "Control / fire alarm interface",
    ],
    safety: [
      "Automatic fire closure on a fire signal from the building fire alarm system",
      "Controlled shutter descent on fire release",
      "Emergency / manual operation provided",
    ],
    controls: [
      "Motorized normal operation",
      "Fire alarm interface to the building fire alarm system",
      "Automatic fire-release mechanism",
    ],
    options: [
      "Project configuration is confirmed against the opening and supporting documentation",
    ],
    maintenance: [
      "The fire-release mechanism and controlled descent are checked at scheduled intervals as part of fire system maintenance",
      "Motorized and emergency / manual operation are checked at each service visit",
    ],
    integration: [
      {
        system: "Building fire alarm system",
        detail:
          "The fire alarm interface receives the fire signal; the automatic fire-release mechanism then releases the curtain for controlled descent.",
      },
      {
        system: "Motor / gearbox",
        detail: "Motorized opening and closing of the shutter in normal daily use.",
      },
      {
        system: "Emergency / manual operation",
        detail: "Provided for operation of the shutter when required.",
      },
    ],
    installation: [
      "The opening dimensions, wall construction and project-specific fire-performance documentation are established before the configuration is specified.",
      "The shutter is installed in the structural opening with an engineered fixing arrangement: heavy-duty side guides, the steel barrel assembly on structural brackets, and the steel hood.",
      "The fire alarm interface is connected to the building fire alarm system.",
      "Commissioning covers motorized operation, the automatic fire release with controlled descent, and emergency / manual operation.",
    ],
    selectionGuide: [
      {
        condition: "The opening is part of a fire compartmentation strategy",
        recommendation: "Confirm the proposed configuration, tested assembly, dimensions and installation conditions with the project team and request the relevant documentation.",
      },
      {
        condition: "Project-specific compliance evidence is required",
        recommendation: "Request relevant test reports and compliance documentation from the engineering team for the proposed configuration.",
      },
      {
        condition: "The opening is large",
        recommendation:
          "The shutter is designed for openings up to 6000 mm wide × 6000 mm high, where conventional fire-rated door systems may not provide the required operational configuration.",
      },
      {
        condition: "The opening is in daily use as well",
        recommendation: "The shutter is motorized for normal operation, with automatic fire closure on a fire signal.",
      },
    ],
    faq: [
      {
        question: "What determines the fire-resistance performance?",
        answer:
          "Specific fire-resistance performance depends on the product configuration, tested assembly, dimensions and installation conditions. Request relevant project-specific documentation for the proposed configuration.",
      },
      {
        question: "What compliance documentation should be requested?",
        answer: "Project-specific compliance documentation and test reports should be requested from our engineering team for the proposed configuration. Their availability should be confirmed for the project.",
      },
      {
        question: "Does the shutter close automatically in a fire?",
        answer:
          "Yes. On a fire signal from the building fire alarm system, the automatic fire-release mechanism releases the curtain and the shutter descends under control to close the opening.",
      },
      {
        question: "What is the maximum opening size?",
        answer: "The shutter is designed for openings up to 6000 mm wide × 6000 mm high.",
      },
      {
        question: "Can it be used as a normal shutter day to day?",
        answer: "Yes. In normal use the shutter is motorized, and emergency / manual operation is provided.",
      },
    ],
    ordering: [
      "Clear opening width and height, up to 6000 × 6000 mm",
      "Project fire-performance requirements and the documentation required for the proposed configuration",
      "The compartment line the opening sits on, and whether it is on an escape route",
      "The building fire alarm system the fire alarm interface connects to",
      "Headroom and side room available, and the structural substrate for fixing",
      "Whether the opening is used daily as well as for fire separation",
      "Site conditions",
    ],
    dimensionsNote:
      "Designed for large industrial and commercial openings where conventional fire-rated door systems may not provide the required operational configuration.",
    applicationImages: [
      { name: "Industrial Manufacturing Facilities", imageId: "i-manufacturing" },
      { name: "Warehouses & Logistics Centres", imageId: "warehouse-interior" },
      { name: "Fire Compartment Openings", imageId: "fire-shutter-industrial-application" },
      { name: "Electrical & Utility Rooms", imageId: "engineering-panel" },
      { name: "Plant & Process Areas", imageId: "g-hsd-production" },
      { name: "Commercial Buildings", imageId: "commercial-building" },
      { name: "Service & Material Openings", imageId: "p-shutter-industrial" },
      { name: "Industrial Fire Separation", imageId: "facility-night" },
    ],
    related: ["fire-rated-sliding-doors", "insulated-double-wall-rolling-shutters", "galvanized-steel-rolling-shutters"],
    documents: [
      {
        title: "Technical submittal — fire-resistant rolling shutter",
        kind: "Datasheet",
        href: null,
        note: "Request project-specific compliance documentation and test reports from our engineering team for the proposed configuration. Availability must be confirmed for the project.",
      },
    ],
    imageId: "fire-shutter-installed",
    galleryIds: [
      "fire-shutter-installed",
      "fire-shutter-guide-detail",
      "fire-shutter-industrial-application",
    ],
    // Genuinely part of the rolling shutter range, but its page lives here
    // with the rest of the life-safety products. Cross-listed onto Rolling
    // Shutters rather than duplicated: one product, one URL.
    crossListedIn: ["rolling-shutters"],
    facets: {
      material: ["MS"],
      construction: "Fire Rated",
      duty: ["Heavy", "Industrial"],
      operation: ["Motorized"],
      performance: ["Fire Rated"],
    },
    comparison: {
      material: "Interlocking steel fire-rated slats",
      thickness: "1.2 mm nominal",
      corrosion: "Steel construction",
      operation: "Motorized, automatic fire closure",
    },
    legacyUrls: ["fire-proof-rolling-shutters.html", "fire-proof-shutters.html"],
  },
  {
    id: "fire-rated-sliding-doors",
    familyId: "fire-safety-doors",
    categoryId: "fire-rated-doors",
    name: "Fire Rated Sliding Doors",
    status: "CONFIRMED",
    tagline: "Automatic sliding leaves on compartment and controlled-area openings.",
    summary:
      "Automatic sliding door systems with HPL, painted steel or powder-coated aluminium leaves, lead-lined options and glazed vision panels, for compartment and controlled-area openings. No specific fire-resistance rating is stated for this product.",
    overview: [
      "Fire-resistant sliding door systems are designed for fire compartmentation applications. Specific fire-resistance performance depends on the selected doorset configuration, tested assembly, dimensions and installation conditions.",
      "Leaf construction follows the environment: HPL, painted steel or powder-coated aluminium faces, with lead sheet where radiation shielding is required, and single or double glazed vision panels for sightlines through the opening.",
      "No specific fire-resistance rating is stated for this product. Relevant test reports and compliance documentation should be requested for the proposed project configuration.",
    ],
    quickFacts: [
      { label: "Leaf thickness", value: "4.5 mm" },
      { label: "Lead sheet option", value: "3.0 mm" },
      { label: "Reference size", value: "1800 × 2100 mm" },
      { label: "Fire performance", value: "No specific rating is stated; confirm project-specific documentation.", qualified: true },
    ],
    benefits: [
      { title: "Automatic and hands-free", body: "Powered sliding operation suits corridors where trolleys and beds are moved constantly." },
      { title: "Hygienic surfaces", body: "HPL and powder-coated faces wipe down, for clean room and healthcare environments." },
      { title: "Shielding option", body: "Lead sheet in the leaf where radiation shielding is required, with lead glass vision panels." },
      { title: "Vision panels", body: "Single or double glazed windows in an aluminium frame give sightlines through the opening." },
    ],
    variants: [
      { id: "automatic", name: "Automatic operation", note: "Sensor, push plate or hands-free activation for corridors in constant use.", status: "CONFIRMED" },
      { id: "lead-lined", name: "Lead-lined / shielded", note: "3.0 mm lead sheet in the leaf with lead glass vision panels, for diagnostic and imaging rooms.", status: "CONFIRMED" },
      { id: "vision-panel", name: "Glazed vision panel", note: "Single glazing in an aluminium frame, or double glazing, where sightlines through the opening are needed.", status: "CONFIRMED" },
    ],
    applications: [
      "Hospitals and diagnostic suites",
      "Clean rooms and controlled areas",
      "Cold storage systems",
      "Warehouse compartment openings",
    ],
    industries: ["healthcare", "pharmaceutical-cleanroom", "cold-chain-food"],
    environments: ["fire", "hygiene", "internal"],
    operatingMethod: [
      "A header-mounted operator carries the leaf on a track and drives it open and closed.",
      "Sensors, a push plate or hands-free activation open the door; presence detection holds it open while the threshold is occupied.",
      "On a fire signal the door closes against its frame according to the agreed fire strategy.",
      "The leaf can be operated manually without power.",
    ],
    construction: [
      "4.5 mm leaf with HPL, painted steel or powder-coated aluminium facing",
      "Aluminium frame with 1.0 mm door plate",
      "Optional 3.0 mm lead sheet lining with lead glass vision panels",
    ],
    namingNote:
      "No specific fire-resistance rating is stated for this product. Specific fire-resistance performance depends on the selected doorset configuration, tested assembly, dimensions and installation conditions. Request relevant test reports and compliance documentation for the proposed project configuration; availability and scope must be confirmed.",
    related: ["fire-rated-rolling-shutters", "automatic-sliding-glass-doors", "high-speed-roll-up-door"],
    documents: [
      { title: "Fire Rated Sliding Door datasheet", kind: "Datasheet", href: null, note: "In preparation." },
    ],
    imageId: "fire-sliding-supplied",
    galleryIds: [
      "fire-sliding-angle",
      "fire-sliding-panel-section",
      "fire-sliding-track",
      "fire-sliding-closing-end",
      "fire-sliding-site",
    ],
    legacyUrls: ["fire-sliding-door.html"],
  },
];
