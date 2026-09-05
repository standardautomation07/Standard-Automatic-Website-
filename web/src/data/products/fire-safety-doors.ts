import type { Product } from "@/lib/types";

/**
 * Fire & Safety Doors — 2 products.
 *
 * No fire rating is published for either product. A rating belongs to a
 * tested assembly, not to a product name, and no test certificate has been
 * supplied for these lines. Both pages say so explicitly rather than quoting
 * a rating the market commonly advertises.
 */
export const fireSafetyProducts: Product[] = [
  {
    id: "fire-rated-rolling-shutters",
    familyId: "fire-safety-doors",
    categoryId: "fire-rated-shutters",
    name: "Fire Rated Rolling Shutters",
    status: "CONFIRMED",
    tagline: "Holding the compartment line where a large aperture cuts through it.",
    summary:
      "Galvanised double-wall, silicon-insulated shutters in 75 and 100 mm profiles with a stated 21 dB sound reduction, for openings in fire-rated walls.",
    overview: [
      "A fire rated shutter closes an opening in a fire compartment wall. Its job is to hold that line for a stated period so the building's escape and containment strategy still works after a large aperture has been cut through a rated wall.",
      "Construction follows from that: a galvanised double-wall curtain with a silicon-insulated strip between the skins, running in steel guides sized to retain the curtain under heat. The same construction gives useful acoustic performance as a by-product — a stated 21 dB sound reduction.",
    ],
    quickFacts: [
      { label: "Slat height", value: "75 / 100 mm" },
      { label: "Curtain thickness", value: "25 mm" },
      { label: "Sound reduction", value: "21 dB" },
      { label: "Fire rating", value: "Certification dependent", qualified: true },
    ],
    benefits: [
      {
        title: "Compartment openings",
        body: "Specified where a large aperture passes through a fire-rated wall and the compartment line has to be maintained.",
      },
      {
        title: "Radiant heat protection",
        body: "Insulated double-wall construction limits radiant heat transfer through the closed curtain.",
      },
      {
        title: "21 dB sound reduction",
        body: "The same insulated build gives a stated sound reduction value of 21 dB in normal daily use.",
      },
      {
        title: "Corrosion protected",
        body: "Galvanised slats and steel guides, for industrial and service environments.",
      },
    ],
    variants: [
      {
        id: "insulated-double-wall",
        name: "Galvanised double-wall insulated",
        note: "The standard construction: galvanised double-wall slats with a silicon insulated strip, in steel guides.",
        status: "CONFIRMED",
      },
      {
        id: "auto-close-release",
        name: "Alarm-linked auto-close",
        note: "Interface to the fire alarm panel with a battery-backed release, so the shutter closes on alarm at a governed speed. Specified against the building's fire strategy.",
        status: "POTENTIAL",
      },
    ],
    applications: [
      "Fire compartment openings",
      "Warehouse and plant separations",
      "Basement, service and plant rooms",
      "Commercial buildings with rated wall lines",
    ],
    industries: ["manufacturing", "warehousing-logistics", "retail-commercial", "healthcare"],
    environments: ["fire", "internal"],
    operatingMethod: [
      "Galvanised double-wall slats with an insulated strip form a curtain that winds onto a barrel above the opening.",
      "In normal use the shutter is operated like any other motorised shutter, by push button, key switch or remote.",
      "On a fire signal the drive releases and the curtain descends at a governed speed to close the compartment line.",
      "A manual release allows the shutter to be closed or opened for testing and during a power failure.",
    ],
    construction: [
      "Galvanised double-wall slats, 75 / 100 mm profile, with a silicon insulated strip",
      "25 mm curtain thickness",
      "Steel guides and end plates sized to retain the curtain under heat",
    ],
    namingNote:
      "Fire rating is not published for this product. A rating applies to a tested assembly — curtain, guides, fixings, motor and release as installed — and only against a certificate for that assembly. Ask us and we will confirm what rating can be certified for your opening.",
    related: ["fire-rated-sliding-doors", "insulated-double-wall-rolling-shutters", "galvanized-steel-rolling-shutters"],
    documents: [
      { title: "Fire test certificate", kind: "Certificate", href: null, note: "Issued per certified assembly. Ask us for the certificate covering the configuration proposed for your opening." },
      { title: "Fire Rated Shutter datasheet", kind: "Datasheet", href: null, note: "In preparation." },
    ],
    imageId: "p-fire-shutter",
    // Genuinely part of the rolling shutter range, but its page lives here
    // with the rest of the life-safety products. Cross-listed onto Rolling
    // Shutters rather than duplicated: one product, one URL.
    crossListedIn: ["rolling-shutters"],
    facets: {
      material: ["MS", "GI"],
      construction: "Fire Rated",
      duty: ["Heavy", "Industrial"],
      operation: ["Motorized", "Gear"],
      performance: ["Fire Rated"],
    },
    comparison: {
      material: "Steel, tested assembly",
      thickness: "Per tested configuration",
      corrosion: "Material dependent",
      operation: "Motorised with automatic closure on alarm",
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
    imageId: "p-fire-sliding-door",
    legacyUrls: ["fire-sliding-door.html"],
  },
];
