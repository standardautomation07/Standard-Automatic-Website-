import type { Product } from "@/lib/types";

/** Loading Bay Solutions — 2 products. */
export const loadingBayProducts: Product[] = [
  {
    slug: "dock-levellers",
    category: "loading-bay",
    name: "Dock Levellers",
    tagline: "A driveable bridge between the dock floor and the vehicle bed.",
    summary:
      "Hydraulic dock levellers with 2000 and 2500 mm platform lengths, working above and below dock level to suit a mixed vehicle fleet.",
    overview: [
      "A dock leveller is a hinged platform recessed into the dock edge. Raised and lowered hydraulically, it drops a lip onto the vehicle bed and forms a continuous, load-bearing ramp from the warehouse floor into the trailer.",
      "The specification that matters is working range. Trailer beds sit at different heights depending on the vehicle, its suspension and how much of the load has already come off. A leveller that works both above and below dock level lets one bay serve a mixed fleet without packing or improvised dock plates.",
    ],
    benefits: [
      {
        title: "Continuous crossing",
        body: "Forklifts drive on and off the trailer over a single load-bearing surface — no step, no loose plate.",
      },
      {
        title: "Works above and below dock",
        body: "Upper and lower working ranges accommodate different bed heights at the same bay.",
      },
      {
        title: "Built for repeated loading",
        body: "A 14 mm tear plate deck with double 5° bending, finished in epoxy resin for long-term corrosion protection.",
      },
      {
        title: "Wide operating temperature",
        body: "Rated for operation from -35 °C to +50 °C, including cold-chain bays.",
      },
    ],
    applications: [
      "Distribution centres and 3PL warehouses",
      "Manufacturing dispatch bays",
      "Cold chain and food logistics",
      "Packaging and FMCG plants",
      "Transport and freight terminals",
    ],
    howItWorks: [
      "The platform is set into a foundation pit at the dock edge, hinged along its rear edge.",
      "A hydraulic cylinder raises the platform; the lip extends and lowers onto the vehicle bed.",
      "The deck settles onto the bed and follows it as the trailer's suspension moves under load.",
      "After loading, the lip retracts and the platform returns to the stored, level position.",
    ],
    specs: [
      { label: "Platform length", value: "2000 mm or 2500 mm (±2)" },
      { label: "Platform width", value: "1830 mm, 2000 mm or 2130 mm (±2)" },
      { label: "Platform height", value: "500 mm or 600 mm (±2)" },
      { label: "Foundation pit length", value: "2000 mm or 2500 mm (±2)" },
      { label: "Foundation pit width", value: "1880 mm, 2050 mm or 2180 mm (±2)" },
      { label: "Foundation pit depth", value: "515 mm or 615 mm (±2)" },
      { label: "Upper working range", value: "725–750 mm" },
      { label: "Lower working range", value: "225–380 mm" },
      { label: "Deck material", value: "14 mm tear plate, double 5° bending" },
      { label: "Finish", value: "Epoxy resin, long-term anti-corrosion" },
      { label: "Power consumption", value: "≤ 1.5 kW" },
      { label: "Operating temperature", value: "-35 °C to +50 °C" },
    ],
    image: "/images/photography/loading-bay-trailer.jpg",
    imageAlt: "Trailer positioned at a loading ramp",
    related: ["dock-houses", "high-speed-roll-up-doors", "overhead-sectional-doors"],
    legacyUrl: "https://www.standardautomation.in/dock-levellers.html",
  },
  {
    slug: "dock-houses",
    category: "loading-bay",
    name: "Dock Houses & Shelters",
    tagline: "Sealing the gap around the vehicle, not just under it.",
    summary:
      "Aluminium alloy dock houses and shelters that seal around a docked trailer, rated above force 10 wind, for heat retention and weather protection.",
    overview: [
      "A dock leveller closes the gap under the trailer; a dock house or shelter closes it around the trailer. Without one, the docked opening is effectively a hole in the building, losing conditioned air and admitting rain, dust and insects for the whole time a vehicle is on the bay.",
      "Shelters are made to the bay: the frame is sized to the opening and the vehicle mix, and the sealing curtains or cushions are chosen to suit how accurately vehicles can be reversed onto the dock.",
    ],
    benefits: [
      {
        title: "Heat retention",
        body: "Sealing around the trailer holds conditioned air in the building while the bay is occupied.",
      },
      {
        title: "Dust and waterproof",
        body: "Keeps rain and airborne dust out of the loading area and off the goods being handled.",
      },
      {
        title: "Wind rated",
        body: "Specified for wind loading above force 10.",
      },
      {
        title: "Long service life",
        body: "Aluminium alloy construction with a stated service life of 10–20 years.",
      },
    ],
    applications: [
      "Warehouse and distribution loading bays",
      "Cold chain and temperature-controlled docks",
      "Manufacturing and packaging dispatch",
      "Transport and logistics terminals",
    ],
    specs: [
      { label: "Frame material", value: "Aluminium alloy" },
      { label: "Function", value: "Heat retention, dustproof, waterproof" },
      { label: "Wind loading", value: "Above force 10" },
      { label: "Service life", value: "10–20 years" },
      { label: "Size and colour", value: "Made to the bay and to requirement" },
    ],
    image: "/images/photography/loading-bay.jpg",
    imageAlt: "Row of loading docks on a distribution building",
    related: ["dock-levellers", "high-speed-roll-up-doors", "overhead-sectional-doors"],
    legacyUrl: "https://www.standardautomation.in/dock-house.html",
  },
];
