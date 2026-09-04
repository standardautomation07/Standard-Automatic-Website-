import type { Product } from "@/lib/types";

/**
 * Rolling Shutters — 9 products.
 *
 * Naming caveat, carried over from the audit: four of the old shutter URLs
 * contradict themselves (the page title and the H1 name different products,
 * and two pairs appear to have been swapped). The business has confirmed all
 * four are genuine, separate variants, but not which name belongs to which.
 * Each affected record carries a `namingNote` that is rendered on the page —
 * the names are working names, not confirmed ones.
 *
 * `polycarbonate-rolling-shutters.html` and `polycarbonate.html` are two URLs
 * for the same product and are published here once.
 */
export const rollingShutterProducts: Product[] = [
  {
    slug: "galvanized-rolling-shutters",
    category: "rolling-shutters",
    name: "Galvanized Rolling Shutters",
    tagline: "The workhorse shutter for wide industrial openings.",
    summary:
      "Galvanized steel rolling shutters in 75, 125 and 150 mm slat profiles, 0.80–1.2 mm thick, for factory, warehouse and large-aperture openings.",
    overview: [
      "Galvanized steel is the default curtain material for industrial rolling shutters because it combines span, security and corrosion resistance at a sensible cost. The zinc coating protects the slat in humid and coastal conditions where plain mild steel would need constant maintenance.",
      "When open, the curtain is stored in a barrel above the opening, so the aperture is completely unobstructed and no side room is consumed. That is what makes this type suitable for the very wide openings found on industrial units and godowns.",
    ],
    benefits: [
      {
        title: "Wide apertures",
        body: "Steel curtains cover large industrial openings — configurations up to 10 m wide are standard for this type.",
      },
      {
        title: "Corrosion protected",
        body: "Galvanized slats hold up in humid, dusty and coastal environments better than uncoated steel.",
      },
      {
        title: "Physical security",
        body: "A solid steel curtain in steel guides adds a real barrier between the outside and the opening it protects.",
      },
      {
        title: "Clear opening",
        body: "The curtain rolls above the lintel, so nothing intrudes into the aperture or the wall beside it.",
      },
    ],
    applications: [
      "Warehouses and godowns",
      "Factories and industrial units",
      "Large apertures over 16 sq m",
      "Commercial and retail frontages",
    ],
    specs: [
      { label: "Type code", value: "GL78RS" },
      { label: "Curtain material", value: "Galvanized steel" },
      { label: "Slat height", value: "75 mm, 125 mm, 150 mm" },
      { label: "Slat thickness", value: "0.80 mm to 1.2 mm" },
      { label: "Standard colour", value: "Silver or customised" },
      { label: "Guides and frame", value: "Steel" },
      { label: "Operation", value: "Electric or manual" },
      { label: "Size", value: "Made to the opening" },
    ],
    image: "/images/photography/shutter-grey.jpg",
    imageAlt: "A closed steel rolling shutter in a plain wall",
    related: ["insulated-rolling-shutters", "aluminium-rolling-shutters", "side-motor-with-chain-drive"],
    legacyUrl: "https://www.standardautomation.in/m-s-rolling-shutters.html",
  },
  {
    slug: "insulated-rolling-shutters",
    category: "rolling-shutters",
    name: "Insulated Rolling Shutters",
    tagline: "Double-wall slats where the opening separates two climates.",
    summary:
      "Insulated double-wall rolling shutters for openings that need thermal and acoustic separation as well as security.",
    overview: [
      "An insulated shutter uses a double-wall slat with an insulating core rather than a single folded profile. The result is a curtain that slows heat transfer and cuts sound through the opening, without giving up the compact roll and clear aperture of a standard rolling shutter.",
      "The type is specified where a shutter closes an opening between conditioned and unconditioned space, or where noise transmission through a large aperture is a problem for neighbours or for the workspace behind it.",
    ],
    benefits: [
      {
        title: "Thermal separation",
        body: "An insulating core in the slat reduces heat transfer through the closed opening.",
      },
      {
        title: "Sound reduction",
        body: "Double-wall construction cuts noise transmission compared with a single-skin curtain.",
      },
      {
        title: "Same compact roll",
        body: "Insulation is added without needing side room or intruding into the opening.",
      },
      {
        title: "Industrial duty",
        body: "Steel construction and steel guides, motorised or manual as the opening requires.",
      },
    ],
    applications: [
      "Openings between conditioned and unconditioned space",
      "Cold and chilled storage areas",
      "Noise-sensitive industrial and urban sites",
      "Workshops and service bays",
    ],
    specs: [],
    image: "/images/photography/shutter-white.jpg",
    imageAlt: "A white rolling shutter with horizontal slats",
    namingNote:
      "Working name. The source page titles this product \"Galvanize Rolling Shutter\" but headlines it \"Insulated Rolling Shutters\" — the business needs to confirm which it is.",
    related: ["galvanized-rolling-shutters", "fire-rated-rolling-shutters", "aluminium-rolling-shutters"],
    legacyUrl: "https://www.standardautomation.in/g-i-rolling-shutters.html",
  },
  {
    slug: "aluminium-rolling-shutters",
    category: "rolling-shutters",
    name: "Aluminium Rolling Shutters",
    tagline: "Lighter curtains and a cleaner finish for commercial frontages.",
    summary:
      "Aluminium rolling shutters in 55 and 75 mm slat profiles, single and double wall, 0.45–1.00 mm, for shopfronts and commercial openings.",
    overview: [
      "Aluminium slats weigh substantially less than steel of the same profile, which reduces the load on the barrel, the guides and the operator. On a shopfront or a light commercial opening that translates into a smaller drive, quieter running and a shutter that is easier to operate by hand.",
      "Aluminium also finishes better than galvanized steel and does not need painting to resist corrosion, which is why the type is common where the shutter is part of the visible frontage.",
    ],
    benefits: [
      {
        title: "Light curtain",
        body: "Lower curtain weight means a smaller operator, less load on the structure and easier manual operation.",
      },
      {
        title: "Clean finish",
        body: "Aluminium takes a powder coat well and resists corrosion without repainting.",
      },
      {
        title: "Single or double wall",
        body: "Single-wall for light-duty frontages, double-wall where more rigidity or insulation is wanted.",
      },
      {
        title: "Suited to visible frontages",
        body: "Appropriate where the shutter forms part of the building's face rather than a back-of-house opening.",
      },
    ],
    applications: [
      "Shopfronts and showrooms",
      "Commercial and office frontages",
      "Malls and retail units",
      "Low to medium security openings",
    ],
    specs: [
      { label: "Type code", value: "AL55RS, AL75RS" },
      { label: "Curtain material", value: "Aluminium, single and double wall" },
      { label: "Slat height", value: "55 mm, 75 mm" },
      { label: "Slat thickness", value: "0.45 mm to 1.00 mm" },
      { label: "Standard colour", value: "White or customised" },
      { label: "Guides and frame", value: "Steel" },
      { label: "Operation", value: "Electric or manual" },
      { label: "Size", value: "Made to the opening" },
    ],
    image: "/images/photography/shutter-brown.jpg",
    imageAlt: "A closed aluminium-finish roller shutter",
    related: ["aluminium-single-wall-rolling-shutters", "galvanized-rolling-shutters", "tubular-motor"],
    legacyUrl: "https://www.standardautomation.in/aluminium-rolling-shutters.html",
  },
  {
    slug: "aluminium-single-wall-rolling-shutters",
    category: "rolling-shutters",
    name: "Aluminium Single-Wall Rolling Shutters",
    tagline: "The lightest aluminium curtain, for light-duty frontages.",
    summary:
      "Single-wall aluminium rolling shutters for light-duty commercial openings where curtain weight and finish matter more than physical resistance.",
    overview: [
      "A single-wall aluminium slat is a folded profile with no inner skin. It is the lightest curtain in the range, which suits small and medium shopfront openings, service counters and kiosks where the shutter is closing rather than defending an aperture.",
      "Because the curtain is light, these shutters can often be operated manually on smaller openings and driven by a compact tubular motor where automation is wanted.",
    ],
    benefits: [
      {
        title: "Lightest curtain",
        body: "Minimal load on the barrel and structure — often hand-operable on smaller openings.",
      },
      {
        title: "Compact drive",
        body: "Suits tubular motors housed inside the barrel, with no external drive on the frontage.",
      },
      {
        title: "Corrosion resistant",
        body: "Aluminium needs no painting to survive humid and coastal conditions.",
      },
      {
        title: "Neat frontage",
        body: "Slim profile and clean finish for openings that are part of the visible shopfront.",
      },
    ],
    applications: [
      "Small and medium shopfronts",
      "Service counters and kiosks",
      "Light commercial openings",
      "Internal partitions and hatches",
    ],
    specs: [],
    image: "/images/photography/shutter-slats.jpg",
    imageAlt: "Close detail of rolling shutter slats",
    namingNote:
      "Working name. This URL (`aluminium-single-wall.html`) is headlined \"Fire Shutters\" on the source site, which contradicts its own address — the business has confirmed it is a genuine separate variant but not what it should be called.",
    related: ["aluminium-rolling-shutters", "tubular-motor", "perforated-rolling-shutters"],
    legacyUrl: "https://www.standardautomation.in/aluminium-single-wall.html",
  },
  {
    slug: "fire-rated-rolling-shutters",
    category: "rolling-shutters",
    name: "Fire Rated Rolling Shutters",
    tagline: "Galvanized double-wall curtains for compartment openings.",
    summary:
      "Fire rated rolling shutters with galvanized double-wall, silicon-insulated slats in 75 and 100 mm profiles, offering 21 dB sound reduction and radiant heat protection.",
    overview: [
      "A fire rated shutter closes an opening in a fire compartment wall. Its job is to hold the compartment line for a stated period so that the building's escape and containment strategy still works when a large aperture has been cut through a fire-rated wall.",
      "Construction reflects that: a galvanized double-wall curtain with a silicon-insulated strip between the skins, in steel guides sized to hold the curtain in place under heat. The same construction gives useful acoustic performance as a by-product.",
    ],
    benefits: [
      {
        title: "Compartment openings",
        body: "Specified where a large aperture passes through a fire-rated wall and the compartment line must be maintained.",
      },
      {
        title: "Radiant heat protection",
        body: "Insulated double-wall construction limits radiant heat transfer through the closed curtain.",
      },
      {
        title: "21 dB sound reduction",
        body: "The same insulated build gives a stated sound reduction value of 21 dB.",
      },
      {
        title: "Corrosion protected",
        body: "Galvanized slats and steel guides for industrial and service environments.",
      },
    ],
    applications: [
      "Fire compartment openings",
      "Warehouse and plant separations",
      "Basement and service areas",
      "Commercial buildings with rated wall lines",
    ],
    specs: [
      { label: "Type code", value: "FR75, FR100" },
      { label: "Curtain material", value: "Galvanized double wall with silicon insulated strip" },
      { label: "Slat height", value: "75 mm, 100 mm" },
      { label: "Curtain thickness", value: "25 mm" },
      { label: "Standard colour", value: "Silver or customised" },
      { label: "Sound reduction", value: "21 dB" },
      { label: "Guides and frame", value: "Steel" },
      { label: "Operation", value: "Electric or manual" },
    ],
    image: "/images/photography/shutter-red.jpg",
    imageAlt: "A closed red rolling shutter at a building opening",
    related: ["fire-proof-shutters", "insulated-rolling-shutters", "fire-sliding-doors"],
    legacyUrl: "https://www.standardautomation.in/fire-proof-rolling-shutters.html",
  },
  {
    slug: "fire-proof-shutters",
    category: "rolling-shutters",
    name: "Fire Proof Shutters",
    tagline: "A second fire shutter variant, confirmed but not yet named.",
    summary:
      "A separate fire shutter variant held in the range alongside the FR75/FR100 fire rated rolling shutter. Configuration details to be confirmed.",
    overview: [
      "This is a distinct fire shutter variant that the business has confirmed is genuinely separate from the FR75/FR100 fire rated rolling shutter, rather than a duplicate page. What it is called, and how its construction and rating differ, has not yet been confirmed.",
      "Rather than invent a specification, this page is published with the general characteristics of the product family and an explicit note. Contact us and we will confirm the exact variant, rating and construction for your opening.",
    ],
    benefits: [
      {
        title: "Compartment line integrity",
        body: "Fire shutters hold an opening in a rated wall for a stated period as part of the building's containment strategy.",
      },
      {
        title: "Insulated construction",
        body: "Double-skin curtains with an insulating layer limit radiant heat transfer through the closed shutter.",
      },
      {
        title: "Specified per opening",
        body: "Rating, drop mechanism and release arrangement are chosen against the building's fire strategy.",
      },
      {
        title: "Manual and motorised",
        body: "Powered operation for daily use, with a defined behaviour on alarm and on power failure.",
      },
    ],
    applications: [
      "Fire compartment openings",
      "Industrial and warehouse separations",
      "Service and plant rooms",
    ],
    specs: [],
    image: "/images/photography/door-red-shutter.jpg",
    imageAlt: "A closed shutter door on an industrial elevation",
    namingNote:
      "Working name. The source page at `fire-proof-shutters.html` is headlined \"Aluminium Rolling Shutters\", contradicting its own address. The business has confirmed the variant is real; its name and specification are still to be supplied.",
    related: ["fire-rated-rolling-shutters", "fire-sliding-doors", "insulated-rolling-shutters"],
    legacyUrl: "https://www.standardautomation.in/fire-proof-shutters.html",
  },
  {
    slug: "polycarbonate-rolling-shutters",
    category: "rolling-shutters",
    name: "Polycarbonate Rolling Shutters",
    tagline: "A shutter you can see straight through, closed.",
    summary:
      "Transparent polycarbonate rolling shutters in 85–170 mm profiles, cutting around 80% of UV while keeping the frontage visible day and night.",
    overview: [
      "A polycarbonate shutter uses transparent panels instead of a solid slat, so the frontage behind it stays visible when the shutter is closed. For a retail unit in a mall or a high street, that turns closing time from a blank steel face back into a display window.",
      "Polycarbonate is also considerably tougher than glass for its weight, blocks most incident UV, and performs better than glass on both sound and heat transfer.",
    ],
    benefits: [
      {
        title: "Full visibility",
        body: "Transparent panels keep the display visible while the unit is closed and secured.",
      },
      {
        title: "UV protection",
        body: "Cuts roughly 80% of incident ultraviolet, protecting stock and display materials behind the shutter.",
      },
      {
        title: "Better than glass thermally and acoustically",
        body: "Stated as around 3–4 dB better than glass on sound, with substantially better heat insulation.",
      },
      {
        title: "Fire retardant, recyclable",
        body: "Flame retardant and self-extinguishing Class I, ROHS compliant and recyclable.",
      },
    ],
    applications: [
      "Retail units and high-grade shops",
      "Shopping malls and arcades",
      "Exhibition and display centres",
      "Showrooms and commercial frontages",
    ],
    specs: [
      { label: "Type code", value: "AD-TD001" },
      { label: "Panel material", value: "Polycarbonate" },
      { label: "Standard finish", value: "Transparent" },
      { label: "Panel height", value: "85 mm, 100 mm, 115 mm, 170 mm" },
      { label: "Panel thickness", value: "1.5 / 2.1 / 3.2 / 4.8 / 5.0 mm" },
      { label: "Open style", value: "Rolling, folding or sliding" },
      { label: "Frame", value: "Colour steel or aluminium alloy" },
      { label: "Operation", value: "Electric or manual" },
      { label: "UV blocked", value: "Approximately 80%" },
      { label: "Fire behaviour", value: "Flame retardant, self-extinguishing Class I" },
      { label: "Compliance", value: "ROHS; panel is recyclable" },
    ],
    image: "/images/photography/rolling-shutters.jpg",
    imageAlt: "Closed roller shutters across a retail frontage",
    related: ["perforated-rolling-shutters", "bright-bar-rolling-shutters", "aluminium-rolling-shutters"],
    legacyUrl: "https://www.standardautomation.in/polycarbonate-rolling-shutters.html",
  },
  {
    slug: "bright-bar-rolling-shutters",
    category: "rolling-shutters",
    name: "Bright Bar Rolling Shutters",
    tagline: "An open grille curtain — secure, but you can see and breathe through it.",
    summary:
      "Bright bar grille rolling shutters that secure an opening while keeping the frontage visible and allowing air to move through it.",
    overview: [
      "A grille shutter replaces the solid curtain with a lattice of bright bars and links. Closed, it is a real physical barrier; open to view, it lets light and air pass, and lets a passer-by or a security patrol see what is behind it.",
      "The type is common on mall units, parking entries and service areas — anywhere the opening needs to be secured without being blanked off entirely.",
    ],
    benefits: [
      {
        title: "Secure but see-through",
        body: "A steel lattice barrier that still allows the frontage behind it to be seen.",
      },
      {
        title: "Air movement",
        body: "The open curtain lets air pass, useful on parking, plant and service openings.",
      },
      {
        title: "Light weight",
        body: "A grille curtain is lighter than a solid one of the same size, so the drive and structure are smaller.",
      },
      {
        title: "Deterrent visibility",
        body: "Interiors stay visible to patrols and passers-by rather than being hidden behind a solid face.",
      },
    ],
    applications: [
      "Shopping mall units",
      "Parking and basement entries",
      "Service and plant areas",
      "Showroom frontages",
    ],
    specs: [],
    image: "/images/photography/industrial-doors.jpg",
    imageAlt: "A closed roll-up shutter on a commercial opening",
    related: ["perforated-rolling-shutters", "polycarbonate-rolling-shutters", "galvanized-rolling-shutters"],
    legacyUrl: "https://www.standardautomation.in/m-s-grill-rolling-shutters.html",
  },
  {
    slug: "perforated-rolling-shutters",
    category: "rolling-shutters",
    name: "Perforated Rolling Shutters",
    tagline: "A solid slat, punched for light and airflow.",
    summary:
      "Perforated slat rolling shutters that keep the rigidity of a solid curtain while admitting light and ventilation through the closed opening.",
    overview: [
      "A perforated shutter is a solid curtain with a punched slat pattern. It sits between a solid shutter and a grille: more rigid and more weather-resisting than a lattice, but still admitting light and air through the closed opening.",
      "It suits frontages that need partial visibility and ventilation without giving up the security and structural behaviour of a conventional slat curtain.",
    ],
    benefits: [
      {
        title: "Light and airflow",
        body: "Punched slats admit daylight and allow ventilation while the shutter is closed.",
      },
      {
        title: "Solid-slat rigidity",
        body: "Retains the structural behaviour and weather resistance of a conventional curtain.",
      },
      {
        title: "Partial visibility",
        body: "Frontages stay partly visible, which suits retail and display openings.",
      },
      {
        title: "Manual or motorised",
        body: "Available with side, central or tubular drives, and with manual operation on smaller openings.",
      },
    ],
    applications: [
      "Retail and showroom frontages",
      "Parking and ventilated service areas",
      "Mall and arcade units",
      "Openings needing light and security together",
    ],
    specs: [],
    image: "/images/photography/shutter-grey.jpg",
    imageAlt: "A closed metal rolling shutter across an opening",
    related: ["bright-bar-rolling-shutters", "polycarbonate-rolling-shutters", "aluminium-rolling-shutters"],
    legacyUrl: "https://www.standardautomation.in/perforated-shutters.html",
  },
];
