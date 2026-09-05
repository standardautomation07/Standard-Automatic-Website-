import type { Product } from "@/lib/types";

/**
 * Industrial Doors — 3 products. See high-speed-doors.ts for the rules that
 * govern specification values and copy in this folder.
 */
export const industrialDoorProducts: Product[] = [
  {
    id: "industrial-sectional-overhead-doors",
    familyId: "industrial-doors",
    categoryId: "sectional-overhead-doors",
    name: "Industrial Sectional Overhead Doors",
    status: "CONFIRMED",
    tagline: "Insulated panels that stack overhead and free the whole opening.",
    summary:
      "Insulated sectional doors in aluminium or galvanized steel with a PUF core, 40–50 mm thick, spanning up to 10 m, in manual and motorised configurations.",
    overview: [
      "A sectional door is built from horizontal insulated panels hinged together, running on tracks that curve from vertical to horizontal above the opening. When open, the whole door sits flat under the roof — the aperture is completely clear, and so is the wall on either side of it.",
      "That geometry is why sectional doors are standard on industrial elevations: nothing intrudes into the opening or the space beside it, the panels carry real insulation, and the perimeter can be properly sealed against weather. The variant that has to be decided first is the track and lift configuration, and it is set by the headroom available above the opening rather than by the door itself.",
    ],
    quickFacts: [
      { label: "Panel thickness", value: "40–50 mm PUF insulated" },
      { label: "Maximum span", value: "Up to 10 m wide" },
      { label: "Panel height", value: "300 mm" },
      { label: "Wind resistance", value: "EN 12424" },
    ],
    benefits: [
      {
        title: "Full clear opening",
        body: "The door stacks horizontally under the roof, leaving both the aperture and the flanking wall usable.",
      },
      {
        title: "Insulated panels",
        body: "40–50 mm PUF-cored aluminium or galvanized steel sections give real thermal and acoustic separation.",
      },
      {
        title: "Sealed perimeter",
        body: "Seals at the head, jambs and floor limit draught, rain and dust ingress at the opening.",
      },
      {
        title: "Protected counterbalance",
        body: "Spring-break and cable-break devices arrest the leaf if the counterbalance fails — not an option, part of the door.",
      },
    ],
    variants: [
      { id: "standard-lift", name: "Standard lift", note: "The default arrangement where there is moderate clear headroom above the opening. The leaf runs up the wall then turns back under the roof.", status: "CONFIRMED" },
      { id: "high-lift", name: "High lift", note: "Extends the vertical track so the leaf travels further up before turning, freeing usable height beneath the horizontal track. For buildings with generous headroom.", status: "POTENTIAL" },
      { id: "vertical-lift", name: "Vertical lift", note: "The leaf stores entirely vertically against the wall. Suits very high internal clearance and keeps the ceiling completely clear.", status: "POTENTIAL" },
      { id: "low-headroom", name: "Low headroom", note: "A second horizontal track lets the door operate where there is very little space between the top of the opening and the structure.", status: "POTENTIAL" },
      { id: "glazed-vision", name: "Glazed vision panels", note: "Vision sections in one or more panels, or a full-vision glazed leaf, where daylight or sightlines through the opening matter.", status: "CONFIRMED" },
      { id: "wicket-door", name: "Wicket access door", note: "A pedestrian door built into the leaf, interlocked so the main door only runs when the wicket is closed.", status: "CONFIRMED" },
    ],
    applications: [
      "Warehouse and factory external openings",
      "Large apertures over 16 sq m",
      "Vehicle and workshop access doors",
      "Industrial units and godowns",
      "Dispatch bays, usually paired with a dock leveller",
    ],
    industries: ["manufacturing", "warehousing-logistics", "automotive", "cold-chain-food"],
    environments: ["internal", "external"],
    operatingMethod: [
      "Hinged insulated panels run in vertical tracks that curve to horizontal above the opening.",
      "A torsion spring counterbalances the leaf weight so it can be moved by hand or by a modest operator.",
      "Spring-break and cable-break safety devices arrest the door if the counterbalance fails.",
      "An operator drives the torsion shaft or the top panel, with adjustable open and close limits set at commissioning.",
    ],
    construction: [
      "PUF-cored aluminium or galvanized steel sections, 40–50 mm thick, 300 mm high",
      "Steel frame with vertical and horizontal track to the chosen lift configuration",
      "Torsion spring counterbalance with spring-break and anti-fall devices",
      "Perimeter seals at head, jambs and floor",
    ],
    related: ["aluminium-garage-doors", "high-speed-rigid-insulated-door", "insulated-double-wall-rolling-shutters"],
    documents: [
      { title: "Sectional Overhead Door brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
      { title: "Lift configuration drawing", kind: "Technical drawing", href: null, note: "Produced per project once headroom and side room are surveyed." },
    ],
    imageId: "p-sectional-overhead",
    legacyUrls: ["overhead-sectional-doors.html", "sectional-door.html"],
  },
  {
    id: "aluminium-garage-doors",
    familyId: "industrial-doors",
    categoryId: "garage-doors",
    name: "Aluminium Garage Doors",
    status: "CONFIRMED",
    tagline: "Glazed aluminium sections where the opening is part of the elevation.",
    summary:
      "Sectional garage doors in aluminium with glazed panels, powder-coated hardware and a full set of counterbalance safety devices.",
    overview: [
      "An aluminium garage door is a sectional door built for appearance as much as function: aluminium sections with glazed inserts admit daylight and give the elevation a lighter, more architectural line than a solid steel leaf.",
      "The mechanics are those of any sectional door — torsion counterbalance, tracks curving overhead, perimeter sealing — so the safety hardware that matters on a heavy overhead leaf is unchanged by the finish.",
    ],
    quickFacts: [
      { label: "Panel", value: "Glazed aluminium sections" },
      { label: "Hardware", value: "2.5 mm galvanized steel, powder coated" },
      { label: "Protection class", value: "IP55" },
      { label: "Wind resistance", value: "EN 12424" },
    ],
    benefits: [
      { title: "Daylight through the opening", body: "Glazed aluminium sections light the space behind the door without leaving it open." },
      { title: "Protected counterbalance", body: "Spring-break and anti-fall devices arrest the leaf if a spring or cable fails." },
      { title: "Sealed perimeter", body: "Seals around the leaf hold heat and keep weather out of the space behind." },
      { title: "Wind rated", body: "The assembly is specified against EN 12424 wind loading classes." },
    ],
    variants: [
      { id: "full-vision", name: "Full-vision glazed", note: "Glazing across the full leaf, for showroom and display frontages where the opening is on view.", status: "CONFIRMED" },
      { id: "insulated-panel", name: "Insulated panel", note: "Foam-filled sections with selected glazed inserts, where thermal performance matters as well as daylight.", status: "CONFIRMED" },
    ],
    applications: [
      "Showroom and display frontages",
      "Commercial garages and service bays",
      "Premium residential garages",
      "Openings up to 10 m wide",
    ],
    industries: ["retail-commercial", "automotive"],
    environments: ["external"],
    operatingMethod: [
      "Hinged aluminium sections run in tracks that curve from vertical to horizontal above the opening.",
      "A torsion spring counterbalances the leaf; the operator supplies movement rather than lift.",
      "Obstruction detection stops and reverses a closing leaf.",
      "A manual release allows the door to be moved by hand during a power failure.",
    ],
    construction: [
      "Aluminium sections with glazed inserts and a foam fill",
      "2.5 mm powder-coated galvanized steel hardware and track",
      "Torsion counterbalance with spring-break and anti-fall devices",
    ],
    related: ["residential-garage-doors", "industrial-sectional-overhead-doors", "high-speed-rigid-insulated-door"],
    documents: [
      { title: "Aluminium Garage Door brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-garage-aluminium",
    legacyUrls: ["garage-door.html"],
  },
  {
    id: "residential-garage-doors",
    familyId: "industrial-doors",
    categoryId: "garage-doors",
    name: "Residential Garage Doors",
    status: "CONFIRMED",
    tagline: "Insulated sectional doors sized for private and society parking.",
    summary:
      "Insulated steel sectional garage doors with remote operation, IP55 hardware and full counterbalance safety devices.",
    overview: [
      "A residential garage door is a smaller sectional door, usually remote operated and often forming part of the house envelope rather than an outbuilding. Insulation, seal quality and quiet running matter more here than raw duty cycle.",
      "The safety requirements do not scale down with the door. A counterbalanced overhead leaf in a domestic setting still needs spring-break protection, an anti-fall device and obstruction detection on the operator.",
    ],
    quickFacts: [
      { label: "Panel", value: "Foam-cored galvanized steel" },
      { label: "Hardware", value: "2.5 mm galvanized steel, powder coated" },
      { label: "Protection class", value: "IP55" },
      { label: "Wind resistance", value: "EN 12424" },
    ],
    benefits: [
      { title: "Insulated leaf", body: "Foam-cored steel sections reduce heat loss where the garage adjoins living space." },
      { title: "Quiet, sealed operation", body: "Perimeter sealing and adjustable pulley brackets keep the leaf running smoothly and quietly." },
      { title: "Full safety hardware", body: "Spring-break and cable-break devices as standard, with obstruction detection on the operator." },
      { title: "Remote operated", body: "Handset or wall control, with a manual release cord for use during a power failure." },
    ],
    variants: [
      { id: "remote-operated", name: "Remote operated", note: "Handset and wall control with a manual release cord — the usual arrangement for a private garage.", status: "CONFIRMED" },
      { id: "manual", name: "Manual with counterbalance", note: "Spring-balanced manual operation where power is not available at the opening or is not wanted.", status: "CONFIRMED" },
    ],
    applications: [
      "Private residences and villas",
      "Apartment and society parking",
      "Small commercial garages",
    ],
    industries: ["retail-commercial"],
    environments: ["external"],
    operatingMethod: [
      "Hinged insulated steel sections run in tracks curving overhead.",
      "A torsion spring carries the leaf weight; the operator supplies controlled movement.",
      "Obstruction detection stops and reverses the leaf if it meets resistance while closing.",
      "A release cord disengages the operator so the door can be lifted by hand without power.",
    ],
    construction: [
      "Foam-cored galvanized steel sections",
      "2.5 mm powder-coated galvanized steel hardware and track",
      "Torsion counterbalance with spring-break and anti-fall devices",
      "Perimeter seals at head, jambs and floor",
    ],
    related: ["aluminium-garage-doors", "industrial-sectional-overhead-doors", "automatic-swing-gates"],
    documents: [
      { title: "Residential Garage Door brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-garage-residential",
    legacyUrls: ["residential-garage-door.html"],
  },
];
