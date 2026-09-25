import type { Product } from "@/lib/types";

/**
 * Fire & Safety Doors — 2 products.
 *
 * Fire Rated Rolling Shutters carry the FRS-120 UD / FRS-240 UD values issued
 * by the company, and override the category guidance with them.
 */
export const fireSafetyProducts: Product[] = [
  {
    id: "fire-rated-rolling-shutters",
    familyId: "fire-safety-doors",
    categoryId: "fire-rated-shutters",
    name: "Fire Rated Rolling Shutters",
    status: "CONFIRMED",
    tagline:
      "Engineered fire-resistant rolling shutters designed for controlled fire compartmentation, automatic closure and protection of large industrial and commercial openings.",
    summary:
      "Fire rated rolling shutters FRS-120 UD and FRS-240 UD: 120 and 240 minute (FD 120 UD / FD 240 UD), motorized, with automatic fire closure, for openings up to 6000 × 6000 mm.",
    overview: [
      "Fire-rated rolling shutters provide controlled closure of large openings within fire compartmentation systems, helping restrict the passage of fire through normally open industrial and commercial openings.",
      "Two variants are offered: FRS-120 UD, with 120 minutes fire resistance (FD 120 UD), and FRS-240 UD, with 240 minutes fire resistance (FD 240 UD). Both are heavy-duty uninsulated metallic shutters with an interlocking steel fire-rated slat curtain of 1.2 mm nominal thickness, for openings up to 6000 mm wide × 6000 mm high.",
      "In normal use the shutter is motorized. On a fire signal from the building fire alarm system, the automatic fire-release mechanism releases the curtain for controlled descent, and emergency / manual operation is provided. The applicable standard is IS 3614:2021, with fire test method IS 17518 Part 1:2022.",
    ],
    quickFacts: [
      { label: "Fire resistance", value: "120 / 240 minutes" },
      { label: "Classification", value: "FD 120 UD / FD 240 UD" },
      { label: "Maximum opening", value: "6000 × 6000 mm" },
      { label: "Applicable standard", value: "IS 3614:2021" },
    ],
    benefits: [
      {
        title: "120 and 240 minute variants",
        body: "FRS-120 UD (FD 120 UD) and FRS-240 UD (FD 240 UD), selected against the fire compartmentation requirement of the opening.",
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
    variants: [
      {
        id: "frs-120-ud",
        name: "FRS-120 UD",
        note: "A heavy-duty uninsulated metallic fire-rated rolling shutter engineered for fire compartmentation and automatic closure in industrial and commercial environments.",
        status: "CONFIRMED",
        specs: [
          { label: "Fire resistance", value: "120 minutes" },
          { label: "Classification", value: "FD 120 UD" },
          { label: "Insulation", value: "Uninsulated (UD)" },
          { label: "Curtain", value: "Interlocking steel fire-rated slats" },
          { label: "Nominal curtain / slat thickness", value: "1.2 mm" },
          { label: "Maximum opening", value: "6000 mm W × 6000 mm H" },
          { label: "Operation", value: "Motorized" },
          { label: "Fire closure", value: "Automatic" },
          { label: "Fire alarm interface", value: "Available" },
          { label: "Emergency / manual operation", value: "Provided" },
          { label: "Side guides", value: "Heavy-duty steel" },
          { label: "Bottom bar", value: "Reinforced steel" },
          { label: "Hood", value: "Steel" },
        ],
      },
      {
        id: "frs-240-ud",
        name: "FRS-240 UD",
        note: "A heavy-duty uninsulated metallic fire-rated rolling shutter engineered for extended fire compartmentation requirements and automatic closure in demanding industrial environments.",
        status: "CONFIRMED",
        specs: [
          { label: "Fire resistance", value: "240 minutes" },
          { label: "Classification", value: "FD 240 UD" },
          { label: "Insulation", value: "Uninsulated (UD)" },
          { label: "Curtain", value: "Interlocking steel fire-rated slats" },
          { label: "Nominal curtain / slat thickness", value: "1.2 mm" },
          { label: "Maximum opening", value: "6000 mm W × 6000 mm H" },
          { label: "Operation", value: "Motorized" },
          { label: "Fire closure", value: "Automatic" },
          { label: "Fire alarm interface", value: "Available" },
          { label: "Emergency / manual operation", value: "Provided" },
          { label: "Side guides", value: "Heavy-duty steel" },
          { label: "Bottom bar", value: "Reinforced steel" },
          { label: "Hood", value: "Steel" },
        ],
      },
    ],
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
      "Fire compartmentation: the closed shutter maintains the compartment line at the opening. Emergency / manual operation is provided.",
    ],
    construction: [
      "Steel fire-rated curtain, 1.2 mm nominal thickness",
      "Interlocking steel fire-rated slats",
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
      "FRS-120 UD — 120 minutes fire resistance, FD 120 UD",
      "FRS-240 UD — 240 minutes fire resistance, FD 240 UD",
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
      "The opening size, the fire resistance period required (120 or 240 minutes) and the wall construction are established before the variant is specified.",
      "The shutter is installed in the structural opening with an engineered fixing arrangement: heavy-duty side guides, the steel barrel assembly on structural brackets, and the steel hood.",
      "The fire alarm interface is connected to the building fire alarm system.",
      "Commissioning covers motorized operation, the automatic fire release with controlled descent, and emergency / manual operation.",
    ],
    selectionGuide: [
      {
        condition: "The opening requires 120 minutes fire resistance",
        recommendation: "FRS-120 UD — classification FD 120 UD.",
      },
      {
        condition: "The opening requires 240 minutes fire resistance",
        recommendation: "FRS-240 UD — classification FD 240 UD, for extended fire compartmentation requirements.",
      },
      {
        condition: "The opening is large",
        recommendation:
          "Both variants are designed for openings up to 6000 mm wide × 6000 mm high, where conventional fire-rated door systems may not provide the required operational configuration.",
      },
      {
        condition: "The opening is in daily use as well",
        recommendation: "Both variants are motorized for normal operation, with automatic fire closure on a fire signal.",
      },
    ],
    faq: [
      {
        question: "What is the difference between FRS-120 UD and FRS-240 UD?",
        answer:
          "FRS-120 UD has 120 minutes fire resistance, classification FD 120 UD. FRS-240 UD has 240 minutes fire resistance, classification FD 240 UD. Both are uninsulated (UD) metallic fire rated rolling shutters with interlocking steel fire-rated slats of 1.2 mm nominal thickness.",
      },
      {
        question: "Which standard applies?",
        answer: "The applicable standard is IS 3614:2021. The fire test method is IS 17518 Part 1:2022.",
      },
      {
        question: "Does the shutter close automatically in a fire?",
        answer:
          "Yes. On a fire signal from the building fire alarm system, the automatic fire-release mechanism releases the curtain and the shutter descends under control to close the opening.",
      },
      {
        question: "What is the maximum opening size?",
        answer: "Both variants are designed for openings up to 6000 mm wide × 6000 mm high.",
      },
      {
        question: "Can it be used as a normal shutter day to day?",
        answer: "Yes. In normal use the shutter is motorized, and emergency / manual operation is provided.",
      },
    ],
    ordering: [
      "Clear opening width and height, up to 6000 × 6000 mm",
      "Fire resistance required: 120 minutes (FRS-120 UD) or 240 minutes (FRS-240 UD)",
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
        title: "Technical submittal — FRS-120 UD / FRS-240 UD",
        kind: "Datasheet",
        href: null,
        note: "Prepared for your opening on request.",
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
      "Automatic sliding doors with HPL, painted steel or powder-coated aluminium leaves, lead-lined options and glazed vision panels, for hospital, clean room and cold store openings.",
    overview: [
      "A sliding door on a compartment or controlled-area opening has to satisfy two requirements at once. It must move automatically and hygienically for the traffic that uses it every day, and it must close properly against its frame when the building's fire or containment strategy requires it.",
      "Leaf construction follows the environment: HPL, painted steel or powder-coated aluminium faces, with lead sheet where radiation shielding is required, and single or double glazed vision panels for sightlines through the opening.",
    ],
    quickFacts: [
      { label: "Leaf thickness", value: "4.5 mm" },
      { label: "Lead sheet option", value: "3.0 mm" },
      { label: "Reference size", value: "1800 × 2100 mm" },
      { label: "Fire rating", value: "Certification dependent", qualified: true },
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
      "Fire rating is not published for this product. A rating applies to a tested assembly as installed, and only against a certificate for that assembly. Ask us and we will confirm what can be certified for your opening.",
    related: ["fire-rated-rolling-shutters", "automatic-sliding-glass-doors", "high-speed-roll-up-door"],
    documents: [
      { title: "Fire test certificate", kind: "Certificate", href: null, note: "Issued per certified assembly. Ask us for the certificate covering the configuration proposed for your opening." },
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
