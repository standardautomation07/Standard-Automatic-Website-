import type { Industry } from "@/lib/types";

/**
 * Eight industries, selected from the thirteen the market addresses
 * (research/market-product-research.md §5) by keeping only those the
 * confirmed product range genuinely serves.
 *
 * Each page describes the *constraint* the sector has and which products
 * answer it. None of them claims work delivered — real project references
 * are pending, and /projects says so.
 */
export const industries: Industry[] = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    tagline: "Separating processes without slowing the material flow between them.",
    challenges: [
      {
        title: "Openings that are also process boundaries",
        body: "A production hall is a set of areas that have to stay different from each other — cleaner, cooler, quieter — connected by openings that are crossed constantly. The door is what holds that difference.",
      },
      {
        title: "Duty cycle nobody counted",
        body: "Openings inside a plant are used far more than anyone estimates at design stage. Drives sized on leaf weight alone overheat within months.",
      },
      {
        title: "Compartment lines through production",
        body: "Fire strategy usually puts a rated wall straight through the middle of a building that needs material to move across it.",
      },
      {
        title: "Impact is routine",
        body: "Where forklifts and doors share a route, contact is a matter of when. The question is whether it takes the opening out of service.",
      },
    ],
    considerations: [
      "Count the cycles per day on each opening before sizing anything.",
      "Decide what each opening actually has to separate — temperature, dust, noise, or nothing.",
      "Identify which openings sit on a fire compartment line and treat those as a separate specification.",
      "Check the traffic route against the guide positions: impact tolerance is cheaper than downtime.",
      "Agree the manual release arrangement for every powered opening on the plant.",
    ],
    typicalApplications: [
      "Production hall separations",
      "Internal throughways between process areas",
      "Dispatch and goods-in openings",
      "Fire compartment openings through production",
      "Plant perimeter and main gate",
    ],
    recommendedProductIds: [
      "high-speed-roll-up-doors",
      "self-repairing-high-speed-doors",
      "high-speed-insulated-panel-doors",
      "industrial-sectional-overhead-doors",
      "fire-rated-rolling-shutters",
      "automatic-sliding-gates",
    ],
    imageId: "i-manufacturing",
  },
  {
    id: "warehousing-logistics",
    name: "Warehousing & Logistics",
    tagline: "Every second an opening stands open is conditioned air and pedestrian risk.",
    challenges: [
      {
        title: "Openings crossed hundreds of times a day",
        body: "A throughway or dock door in a distribution centre is used continuously. Cycle time, not opening size, is what the building pays for.",
      },
      {
        title: "The bay is a hole in the building",
        body: "A docked vehicle without a shelter leaves the opening effectively open for the whole time it is there.",
      },
      {
        title: "Mixed fleet, one bay",
        body: "Bed heights vary by vehicle, by suspension and by how much of the load has already come off. One bay has to serve all of them.",
      },
      {
        title: "Shared vehicle and pedestrian routes",
        body: "Fast-cycling doors on constrained routes need detection that works for both, not just for vehicles.",
      },
    ],
    considerations: [
      "Match door cycle time to the actual movement rate at each opening.",
      "Specify the leveller working range against the full vehicle mix, not the most common truck.",
      "Seal the bay around the vehicle as well as under it, especially on temperature-controlled sites.",
      "Plan impact tolerance into openings on forklift routes.",
      "Interlock doors with dock equipment so a leveller cannot deploy against a closed door.",
    ],
    typicalApplications: [
      "Dock doors and dispatch openings",
      "Internal throughways between zones",
      "Loading bays with levellers and shelters",
      "Yard entrance and exit gates",
      "Staff and contractor access points",
    ],
    recommendedProductIds: [
      "high-speed-roll-up-doors",
      "self-repairing-high-speed-doors",
      "dock-levellers",
      "dock-shelters-and-houses",
      "industrial-sectional-overhead-doors",
      "automatic-sliding-gates",
    ],
    imageId: "i-warehousing",
  },
  {
    id: "cold-chain-food",
    name: "Cold Chain & Food Processing",
    tagline: "Holding a temperature differential across an opening that never stays shut.",
    challenges: [
      {
        title: "Every opening is an energy loss",
        body: "A chilled or frozen area loses its differential through the door. Open time and seal quality are the whole specification.",
      },
      {
        title: "Washdown environments",
        body: "Food areas are hosed and foamed down. Painted steel and open chain drives do not survive that; stainless frames and enclosed gearing do.",
      },
      {
        title: "Condensation and ice",
        body: "Warm humid air meeting a cold surface produces condensation, then ice, then a door that will not seal.",
      },
      {
        title: "Hygiene as a design constraint",
        body: "Surfaces have to be wipeable and free of ledges that collect residue — that rules some constructions out entirely.",
      },
    ],
    considerations: [
      "Specify the temperature range on both sides of every opening, not just the cold side.",
      "Decide whether the door is inside the washdown zone; that determines frame and drive selection.",
      "Insulated shutters and rigid panel high speed doors hold a differential that a fabric curtain will not.",
      "Cold store and freezer room doors themselves are not currently a confirmed Standard Automation line — ask us and we will say so plainly.",
      "Plan for the drive to be outside the wet zone wherever the layout allows it.",
    ],
    typicalApplications: [
      "Chilled and ambient area separations",
      "Food processing hall throughways",
      "Temperature-controlled dock bays",
      "Washdown area openings",
      "Compartment openings in cold storage",
    ],
    recommendedProductIds: [
      "high-speed-insulated-panel-doors",
      "insulated-double-wall-rolling-shutters",
      "high-speed-roll-up-doors",
      "dock-levellers",
      "dock-shelters-and-houses",
      "fire-rated-sliding-doors",
    ],
    imageId: "i-cold-chain",
  },
  {
    id: "pharmaceutical-cleanroom",
    name: "Pharmaceutical & Cleanroom",
    tagline: "Controlled transitions where the door is part of the classification.",
    challenges: [
      {
        title: "Pressure cascades depend on doors",
        body: "Classified areas hold a pressure differential. An opening that stays open too long, or seals badly, breaks the cascade.",
      },
      {
        title: "Particulate from the door itself",
        body: "A door in a classified area must not be a particle source. Construction, surfaces and drive position all matter.",
      },
      {
        title: "Interlocked transitions",
        body: "Airlocks need two openings that cannot be open at once, and that requires the doors to be specified as a pair.",
      },
      {
        title: "Cleanable surfaces",
        body: "Every surface has to be wipeable, with no ledges or fixings that collect residue.",
      },
    ],
    considerations: [
      "Specify the classification and pressure differential for each side of the opening.",
      "Interlocking has to be designed in, not added after commissioning.",
      "Hygienic sliding doors and gear-drive operators avoid the exposed chain and dust traps of standard industrial hardware.",
      "Fully classified cleanroom and hermetic door lines are not currently confirmed Standard Automation products — we will tell you where the range stops.",
      "Agree the cleaning regime early; it drives material and finish selection.",
    ],
    typicalApplications: [
      "Classified area transitions and airlocks",
      "Material transfer openings",
      "Corridor and gowning room doors",
      "Warehouse-to-production transitions",
      "Diagnostic and imaging rooms with shielding",
    ],
    recommendedProductIds: [
      "fire-rated-sliding-doors",
      "high-speed-roll-up-doors",
      "side-motors-gear-drive",
      "automatic-sliding-glass-doors",
    ],
    imageId: "i-pharma",
  },
  {
    id: "automotive",
    name: "Automotive",
    tagline: "Line-side openings where a stopped door stops the line.",
    challenges: [
      {
        title: "Takt time reaches the door",
        body: "Line-side and inter-shop openings sit inside the production cycle. A slow door becomes a constraint on the whole line.",
      },
      {
        title: "Paint and weld shop separation",
        body: "Fume, overspray and particulate have to be contained without stopping material moving between shops.",
      },
      {
        title: "Heavy internal traffic",
        body: "Tugs, forklifts and AGVs run continuously through the same openings, and the guides are in their path.",
      },
      {
        title: "Large vehicle openings",
        body: "Finished vehicle and component openings are wide, often external, and wind-loaded.",
      },
    ],
    considerations: [
      "Cycle time on line-side openings should be specified against takt, not against convenience.",
      "Self-repairing doors pay for themselves where AGV and forklift routes pass close to the guides.",
      "Wide external openings need wind class specified before curtain type is chosen.",
      "Insulated panel doors hold a differential between shops that a fabric curtain will not.",
      "Interlocking with plant control and traffic signalling should be agreed at design stage.",
    ],
    typicalApplications: [
      "Inter-shop openings",
      "Line-side and AGV routes",
      "Paint and weld shop separations",
      "Finished vehicle dispatch",
      "Plant perimeter gates",
    ],
    recommendedProductIds: [
      "self-repairing-high-speed-doors",
      "high-speed-roll-up-doors",
      "high-speed-insulated-panel-doors",
      "industrial-sectional-overhead-doors",
      "automatic-sliding-gates",
    ],
    imageId: "i-automotive",
  },
  {
    id: "retail-commercial",
    name: "Retail & Commercial",
    tagline: "Frontages that have to secure without going blank, and lobbies that have to flow.",
    challenges: [
      {
        title: "Closing time should not mean a blank face",
        body: "A solid steel shutter secures a unit and kills the display. Visibility through the closed opening is often worth more than the extra resistance.",
      },
      {
        title: "Peak footfall at the entrance",
        body: "A lobby entrance has to move people at peak and still make an access decision at the door line.",
      },
      {
        title: "Conditioning loss through the door",
        body: "A busy conditioned lobby loses a great deal of air through an entrance that is open longer than it needs to be.",
      },
      {
        title: "Security hardware that looks like fit-out",
        body: "Access control in a corporate lobby has to read as part of the building, not as a checkpoint.",
      },
    ],
    considerations: [
      "Decide how much visibility the closed frontage needs — that chooses between grille, perforated and polycarbonate.",
      "Size lobby lanes for peak flow and include at least one wide accessible lane.",
      "Bi-parting entrance doors clear the opening in roughly half the time of a single leaf.",
      "Part-open modes on automatic doors cut conditioning loss materially.",
      "Agree escape route behaviour for every entrance before ordering.",
    ],
    typicalApplications: [
      "Shopfronts and mall units",
      "Corporate and commercial building lobbies",
      "Parking entries and exits",
      "Showroom and display frontages",
      "Service and back-of-house openings",
    ],
    recommendedProductIds: [
      "polycarbonate-rolling-shutters",
      "grille-rolling-shutters",
      "aluminium-rolling-shutters",
      "automatic-sliding-glass-doors",
      "flap-barriers",
      "boom-barriers",
    ],
    imageId: "i-retail",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    tagline: "Corridors carrying beds and trolleys, doors carrying compartment lines.",
    challenges: [
      {
        title: "Constant trolley and bed movement",
        body: "Clinical corridors are used continuously by people with both hands full. A door that has to be pulled is a door that gets propped open.",
      },
      {
        title: "Compartment lines through clinical areas",
        body: "Hospital fire strategy puts rated lines through corridors that must stay usable every hour of the day.",
      },
      {
        title: "Shielded rooms",
        body: "Imaging and diagnostic rooms need doors that shield as well as open automatically.",
      },
      {
        title: "Cleanable surfaces",
        body: "Infection control governs surface selection as much as durability does.",
      },
    ],
    considerations: [
      "Hands-free activation matters more here than anywhere else — specify elbow, foot or sensor operation.",
      "Every clinical corridor door on a compartment line needs its fire behaviour agreed with the fire strategy.",
      "Lead lining and lead glass have to be specified with the room, not retrofitted.",
      "Surfaces should be wipeable with the cleaning agents actually used on the ward.",
      "Escape route behaviour on entrance doors must be defined before ordering.",
    ],
    typicalApplications: [
      "Ward and theatre corridor doors",
      "Imaging and diagnostic rooms",
      "Main entrance lobbies",
      "Compartment openings on clinical routes",
      "Staff-only access points",
    ],
    recommendedProductIds: [
      "fire-rated-sliding-doors",
      "automatic-sliding-glass-doors",
      "flap-barriers",
      "automatic-swing-gates",
    ],
    imageId: "i-healthcare",
  },
  {
    id: "infrastructure-transit",
    name: "Infrastructure & Transit",
    tagline: "Peak-flow entries and perimeter points with nobody watching them.",
    challenges: [
      {
        title: "Peak flow without losing the decision",
        body: "A transit entry has to admit large numbers quickly while still validating every passage.",
      },
      {
        title: "Unsupervised perimeter points",
        body: "A waist-height unit at an unwatched perimeter is a formality. It has to be unclimbable to mean anything.",
      },
      {
        title: "Vehicle lines that must actually stop a vehicle",
        body: "A boom barrier meters traffic. Where the line has to be held physically, that is a different product.",
      },
      {
        title: "Continuous operation",
        body: "These are 24-hour environments; duty rating and failure behaviour matter more than they do anywhere else.",
      },
    ],
    considerations: [
      "Calculate lane throughput at peak, and provision at least one accessible lane.",
      "Grade the perimeter properly: tripod where supervised, full height where not.",
      "Separate metering from physical barriers at the vehicle line — they are different jobs.",
      "Define fail state for every controlled point against the escape and security strategy.",
      "Plan maintenance access on units that cannot be taken out of service during operating hours.",
    ],
    typicalApplications: [
      "Station and terminal entry gates",
      "Unsupervised perimeter access points",
      "Vehicle entries and service gates",
      "Restricted and technical areas",
      "Staff and contractor access",
    ],
    recommendedProductIds: [
      "full-height-turnstiles",
      "flap-barriers",
      "tripod-turnstiles",
      "bollards",
      "boom-barriers",
      "retractable-gates",
    ],
    imageId: "i-transit",
  },
];

export const industryById = Object.fromEntries(industries.map((i) => [i.id, i])) as Record<
  Industry["id"],
  Industry
>;
