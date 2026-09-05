import type { Product } from "@/lib/types";

/** Loading Bay Equipment — 2 products. */
export const loadingBayProducts: Product[] = [
  {
    id: "dock-levellers",
    familyId: "loading-bay",
    categoryId: "dock-levellers",
    name: "Dock Levellers",
    status: "CONFIRMED",
    tagline: "A driveable bridge between the dock floor and the vehicle bed.",
    summary:
      "Hydraulic dock levellers with 2000 and 2500 mm platforms, working above and below dock level, on a 14 mm tear plate deck rated from -35 °C to +50 °C.",
    overview: [
      "A dock leveller is a hinged platform recessed into the dock edge. Raised and lowered hydraulically, it drops a lip onto the vehicle bed and forms a continuous, load-bearing ramp from the warehouse floor into the trailer.",
      "The specification that matters most is working range. Trailer beds sit at different heights depending on the vehicle, its suspension and how much of the load has already come off. A leveller that works both above and below dock level lets one bay serve a mixed fleet without packing or improvised dock plates.",
    ],
    quickFacts: [
      { label: "Platform length", value: "2000 / 2500 mm" },
      { label: "Working range", value: "225–750 mm above and below dock" },
      { label: "Deck", value: "14 mm tear plate" },
      { label: "Operating temperature", value: "-35 °C to +50 °C" },
    ],
    benefits: [
      { title: "Continuous crossing", body: "Handling equipment drives on and off the trailer over a single load-bearing surface — no step, no loose plate." },
      { title: "Works above and below dock", body: "Upper and lower working ranges accommodate different bed heights at the same bay." },
      { title: "Built for repeated loading", body: "A 14 mm tear plate deck with double 5° bending, finished in epoxy resin for long-term corrosion protection." },
      { title: "Wide operating temperature", body: "Rated for operation from -35 °C to +50 °C, including cold-chain bays." },
    ],
    variants: [
      { id: "swing-lip", name: "Swing lip", note: "The lip hinges out and lowers onto the vehicle bed. The standard arrangement where vehicles dock consistently.", status: "CONFIRMED" },
      { id: "telescopic-lip", name: "Telescopic lip", note: "The lip extends horizontally, giving longer reach and more accurate placement on a mixed or awkwardly docked fleet.", status: "POTENTIAL" },
    ],
    applications: [
      "Distribution centres and 3PL warehouses",
      "Manufacturing dispatch bays",
      "Cold chain and food logistics",
      "Packaging and FMCG plants",
      "Transport and freight terminals",
    ],
    industries: ["warehousing-logistics", "cold-chain-food", "manufacturing", "retail-commercial"],
    environments: ["external", "cold"],
    operatingMethod: [
      "The platform is set into a foundation pit at the dock edge, hinged along its rear edge.",
      "A hydraulic cylinder raises the platform; the lip extends and lowers onto the vehicle bed.",
      "The deck settles onto the bed and follows it as the trailer's suspension moves under load.",
      "After loading, the lip retracts and the platform returns to the stored, level position.",
    ],
    construction: [
      "14 mm tear plate deck with double 5° bending",
      "Hydraulic cylinder, power pack and dead-man control station",
      "Epoxy resin finish for long-term corrosion protection",
      "Rear hinge and pit frame set into the dock edge",
    ],
    related: ["dock-shelters-and-houses", "high-speed-roll-up-door", "industrial-sectional-overhead-doors"],
    documents: [
      { title: "Dock Leveller datasheet", kind: "Datasheet", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
      { title: "Pit construction drawing", kind: "Technical drawing", href: null, note: "Issued per project so the builder can form the pit correctly." },
    ],
    imageId: "p-dock-leveller",
    legacyUrls: ["dock-levellers.html"],
  },
  {
    id: "dock-shelters-and-houses",
    familyId: "loading-bay",
    categoryId: "dock-shelters",
    name: "Dock Shelters & Dock Houses",
    status: "CONFIRMED",
    tagline: "Sealing the gap around the vehicle, not just under it.",
    summary:
      "Aluminium alloy dock shelters and dock houses rated above force 10 wind with a 10–20 year service life, for heat retention and weather protection.",
    overview: [
      "A dock leveller closes the gap under the trailer; a shelter or dock house closes it around the trailer. Without one, a docked opening is effectively a hole in the building — losing conditioned air and admitting rain, dust and insects for the whole time a vehicle is on the bay.",
      "Shelters are made to the bay: the frame is sized to the opening and the vehicle mix, and the sealing arrangement is chosen to suit how accurately vehicles can be reversed onto the dock.",
    ],
    quickFacts: [
      { label: "Frame", value: "Aluminium alloy" },
      { label: "Wind loading", value: "Above force 10" },
      { label: "Service life", value: "10–20 years" },
      { label: "Function", value: "Heat retention, dustproof, waterproof" },
    ],
    benefits: [
      { title: "Heat retention", body: "Sealing around the trailer holds conditioned air in the building while the bay is occupied." },
      { title: "Dust and waterproof", body: "Keeps rain and airborne dust out of the loading area and off the goods being handled." },
      { title: "Wind rated", body: "Specified for wind loading above force 10." },
      { title: "Long service life", body: "Aluminium alloy construction with a stated service life of 10–20 years." },
    ],
    variants: [
      { id: "curtain", name: "Curtain shelter", note: "Sprung frame with sealing curtains at the head and sides. The general-purpose arrangement for a mixed fleet.", status: "CONFIRMED" },
      { id: "dock-house", name: "Dock house", note: "A built-out housing enclosing the bay, used where the dock face sits flush with the building line or the fleet varies widely.", status: "CONFIRMED" },
      { id: "inflatable", name: "Inflatable shelter", note: "Inflating cushions form to the vehicle body for the tightest seal. Specified where temperature loss is the governing concern.", status: "POTENTIAL" },
    ],
    applications: [
      "Warehouse and distribution loading bays",
      "Cold chain and temperature-controlled docks",
      "Manufacturing and packaging dispatch",
      "Transport and logistics terminals",
    ],
    industries: ["warehousing-logistics", "cold-chain-food", "manufacturing"],
    environments: ["external", "cold"],
    operatingMethod: [
      "A frame is fixed around the dock opening and sized to the vehicle mix using the bay.",
      "Sealing curtains or cushions at the head and both sides close against the vehicle body as it reverses on.",
      "The seal is passive — there is nothing to operate and nothing to power.",
      "The frame is designed to deflect on impact rather than transfer load into the building structure.",
    ],
    construction: [
      "Aluminium alloy frame fixed around the dock opening",
      "Head and side sealing curtains or cushions",
      "Impact-deflecting mounting arrangement",
    ],
    related: ["dock-levellers", "high-speed-roll-up-door", "industrial-sectional-overhead-doors"],
    documents: [
      { title: "Dock Shelter datasheet", kind: "Datasheet", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-dock-shelter",
    legacyUrls: ["dock-house.html"],
  },
];
