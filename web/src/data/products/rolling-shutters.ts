import type { Product } from "@/lib/types";

/**
 * Rolling Shutters — 6 products.
 *
 * Naming note carried from research/product-source-matrix.csv: the previous
 * site's insulated shutter page contradicted itself (title "Galvanize Rolling
 * Shutter", heading "Insulated Rolling Shutters"). The product's identity is
 * confirmed; its exact commercial name is not, and that is stated on the page.
 */
export const rollingShutterProducts: Product[] = [
  {
    id: "galvanized-steel-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "single-wall-rolling-shutters",
    name: "Galvanized Steel Rolling Shutters",
    status: "CONFIRMED",
    tagline: "The workhorse curtain for wide industrial openings.",
    summary:
      "Galvanized steel rolling shutters in 75, 125 and 150 mm slat profiles, 0.80–1.2 mm thick, for factory, warehouse and large-aperture openings.",
    overview: [
      "Galvanized steel is the default curtain material for industrial rolling shutters because it combines span, security and corrosion resistance at a sensible cost. The zinc coating protects the slat in the humid, dusty and coastal conditions where plain mild steel would need constant maintenance.",
      "When open, the curtain is stored in a barrel above the opening, so the aperture is completely unobstructed and no side room is consumed. That is what makes this type suitable for the very wide openings found on industrial units and godowns.",
    ],
    quickFacts: [
      { label: "Slat height", value: "75 / 125 / 150 mm" },
      { label: "Slat thickness", value: "0.80–1.2 mm" },
      { label: "Curtain", value: "Galvanized steel" },
      { label: "Operation", value: "Electric or manual" },
    ],
    benefits: [
      { title: "Wide apertures", body: "Steel curtains cover large industrial openings that would need multiple leaves in other door types." },
      { title: "Corrosion protected", body: "Galvanized slats hold up in humid, dusty and coastal environments better than uncoated steel." },
      { title: "Physical security", body: "A solid steel curtain in steel guides is a real barrier, not just a closure." },
      { title: "Clear opening", body: "The curtain rolls above the lintel, so nothing intrudes into the aperture or the wall beside it." },
    ],
    variants: [
      { id: "manual", name: "Manual push-pull or gear", note: "For smaller and lower-cycle openings where a drive is not justified. Gear operation extends the practical size range of a hand-operated shutter.", status: "CONFIRMED" },
      { id: "motorised", name: "Motorised", note: "Side, central or Australian-type drive selected against curtain weight and daily cycle count, with manual override.", status: "CONFIRMED" },
    ],
    specGroups: [
      {
        group: "Curtain",
        specs: [
          { label: "Type code", value: "GL78RS" },
          { label: "Curtain material", value: "Galvanized steel" },
          { label: "Slat height", value: "75 mm, 125 mm, 150 mm" },
          { label: "Slat thickness", value: "0.80 mm to 1.2 mm" },
          { label: "Standard colour", value: "Silver or customised" },
        ],
      },
      {
        group: "Frame and operation",
        specs: [
          { label: "Guides and frame", value: "Steel" },
          { label: "Operation", value: "Electric or manual" },
          { label: "Size", value: "Made to the opening" },
        ],
      },
    ],
    applications: [
      "Warehouses and godowns",
      "Factories and industrial units",
      "Large apertures over 16 sq m",
      "Commercial and retail frontages",
      "Basement and parking entries",
    ],
    industries: ["manufacturing", "warehousing-logistics", "retail-commercial"],
    environments: ["internal", "external", "security"],
    operatingMethod: [
      "Interlocking galvanized slats form a curtain that winds onto a barrel above the opening.",
      "Steel guides at each jamb retain the curtain and carry wind load.",
      "A side, central or in-barrel drive turns the barrel, with adjustable open and close limits.",
      "A hand chain, crank or release allows the shutter to be moved without power.",
    ],
    construction: [
      "Interlocking galvanized steel slats, 75 / 125 / 150 mm profile, 0.80–1.2 mm",
      "Steel barrel, end plates and guides",
      "Bottom rail with locking provision on manual shutters",
    ],
    related: ["insulated-double-wall-rolling-shutters", "aluminium-rolling-shutters", "grille-rolling-shutters"],
    documents: [
      { title: "Rolling Shutter range brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-shutter-galvanized",
    legacyUrls: ["m-s-rolling-shutters.html"],
  },
  {
    id: "aluminium-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "single-wall-rolling-shutters",
    name: "Aluminium Rolling Shutters",
    status: "CONFIRMED",
    tagline: "A lighter curtain and a cleaner finish for visible frontages.",
    summary:
      "Aluminium rolling shutters in 55 and 75 mm slat profiles, single and double wall, 0.45–1.00 mm, for shopfronts and commercial openings.",
    overview: [
      "Aluminium slats weigh substantially less than steel of the same profile, which reduces the load on the barrel, the guides and the operator. On a shopfront or light commercial opening that means a smaller drive, quieter running, and a shutter that can often still be worked by hand.",
      "Aluminium also finishes better than galvanized steel and resists corrosion without repainting, which is why the type is common wherever the shutter forms part of the visible frontage rather than a back-of-house opening.",
    ],
    quickFacts: [
      { label: "Slat height", value: "55 / 75 mm" },
      { label: "Slat thickness", value: "0.45–1.00 mm" },
      { label: "Construction", value: "Single and double wall" },
      { label: "Operation", value: "Electric or manual" },
    ],
    benefits: [
      { title: "Light curtain", body: "Lower curtain weight means a smaller operator, less load on the structure and easier manual operation." },
      { title: "Clean finish", body: "Aluminium takes a powder coat well and resists corrosion without repainting." },
      { title: "Single or double wall", body: "Single wall for light-duty frontages, double wall where more rigidity is wanted." },
      { title: "Suited to visible frontages", body: "Appropriate where the shutter is part of the building's face, not a service opening." },
    ],
    variants: [
      { id: "single-wall", name: "Single wall", note: "The lightest curtain in the range. Suits small and medium shopfronts, service counters and kiosks.", status: "CONFIRMED" },
      { id: "double-wall", name: "Double wall", note: "A stiffer slat for wider openings and more exposed frontages, at higher curtain weight.", status: "CONFIRMED" },
    ],
    specGroups: [
      {
        group: "Curtain",
        specs: [
          { label: "Type code", value: "AL55RS, AL75RS" },
          { label: "Curtain material", value: "Aluminium, single and double wall" },
          { label: "Slat height", value: "55 mm, 75 mm" },
          { label: "Slat thickness", value: "0.45 mm to 1.00 mm" },
          { label: "Standard colour", value: "White or customised" },
        ],
      },
      {
        group: "Frame and operation",
        specs: [
          { label: "Guides and frame", value: "Steel" },
          { label: "Operation", value: "Electric or manual" },
          { label: "Size", value: "Made to the opening" },
        ],
      },
    ],
    applications: [
      "Shopfronts and showrooms",
      "Commercial and office frontages",
      "Malls and retail units",
      "Service counters and kiosks",
    ],
    industries: ["retail-commercial"],
    environments: ["external", "security"],
    operatingMethod: [
      "Interlocking aluminium slats wind onto a barrel above the opening.",
      "Steel guides retain the curtain at each jamb.",
      "A tubular, Australian-type or side drive turns the barrel, with adjustable limits.",
      "A crank or release allows manual operation without power.",
    ],
    construction: [
      "Interlocking aluminium slats, 55 / 75 mm profile, 0.45–1.00 mm, single or double wall",
      "Steel barrel, end plates and guides",
      "Powder-coated finish to a specified colour",
    ],
    related: ["perforated-rolling-shutters", "polycarbonate-rolling-shutters", "galvanized-steel-rolling-shutters"],
    documents: [
      { title: "Rolling Shutter range brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-shutter-aluminium",
    legacyUrls: ["aluminium-rolling-shutters.html", "aluminium-single-wall.html"],
  },
  {
    id: "grille-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "single-wall-rolling-shutters",
    name: "Grille Rolling Shutters",
    status: "CONFIRMED",
    tagline: "A secure line you can see and breathe through.",
    summary:
      "Bright bar grille shutters that secure an opening while keeping the frontage visible and allowing air to move through it.",
    overview: [
      "A grille shutter replaces the solid curtain with a lattice of bright bars and links. Closed, it is a real physical barrier; open to view, it lets light and air pass and lets a patrol or a passer-by see what is behind it.",
      "The type is common on mall units, parking entries and service areas — anywhere an opening has to be secured without being blanked off entirely.",
    ],
    quickFacts: [
      { label: "Curtain", value: "Bright bar lattice" },
      { label: "Visibility", value: "See-through when closed" },
      { label: "Airflow", value: "Open curtain" },
      { label: "Specification", value: "To be confirmed per opening" },
    ],
    benefits: [
      { title: "Secure but see-through", body: "A steel lattice barrier that still allows the frontage behind it to be seen." },
      { title: "Air movement", body: "The open curtain lets air pass, which matters on parking, plant and service openings." },
      { title: "Lighter than a solid curtain", body: "A grille curtain weighs less than a solid one of the same size, so the drive and structure are smaller." },
      { title: "Deterrent visibility", body: "Interiors stay visible to patrols and passers-by rather than being hidden behind a blank face." },
    ],
    variants: [
      { id: "bright-bar", name: "Bright bar lattice", note: "Vertical bright bars on horizontal links, the standard grille construction. Bar spacing is set against the security requirement.", status: "CONFIRMED" },
    ],
    specGroups: [],
    applications: [
      "Shopping mall units",
      "Parking and basement entries",
      "Service and plant areas",
      "Showroom frontages",
    ],
    industries: ["retail-commercial", "infrastructure-transit"],
    environments: ["internal", "security"],
    operatingMethod: [
      "Bright bars and links form an open lattice curtain that winds onto a barrel above the opening.",
      "Steel guides retain the curtain at each jamb.",
      "A side or central drive turns the barrel, with adjustable limits, or the shutter is operated by hand.",
    ],
    construction: [
      "Bright bar and link lattice curtain",
      "Steel barrel, end plates and guides",
      "Bottom rail with locking provision on manual shutters",
    ],
    related: ["perforated-rolling-shutters", "polycarbonate-rolling-shutters", "galvanized-steel-rolling-shutters"],
    documents: [
      { title: "Rolling Shutter range brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-shutter-grille",
    legacyUrls: ["m-s-grill-rolling-shutters.html"],
  },
  {
    id: "perforated-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "single-wall-rolling-shutters",
    name: "Perforated Rolling Shutters",
    status: "CONFIRMED",
    tagline: "A solid slat, punched for light and airflow.",
    summary:
      "Perforated slat shutters that keep the rigidity of a solid curtain while admitting light and ventilation through the closed opening.",
    overview: [
      "A perforated shutter is a solid curtain with a punched slat pattern. It sits between a solid shutter and a grille: more rigid and more weather-resisting than a lattice, but still admitting light and air through the closed opening.",
      "It suits frontages that need partial visibility and ventilation without giving up the security and structural behaviour of a conventional slat curtain.",
    ],
    quickFacts: [
      { label: "Curtain", value: "Perforated solid slat" },
      { label: "Visibility", value: "Partial" },
      { label: "Airflow", value: "Through the slat perforation" },
      { label: "Specification", value: "To be confirmed per opening" },
    ],
    benefits: [
      { title: "Light and airflow", body: "Punched slats admit daylight and allow ventilation while the shutter is closed." },
      { title: "Solid-slat rigidity", body: "Retains the structural behaviour and weather resistance of a conventional curtain." },
      { title: "Partial visibility", body: "Frontages stay partly visible, which suits retail and display openings." },
      { title: "Manual or motorised", body: "Available with side, central or tubular drives, and by hand on smaller openings." },
    ],
    variants: [
      { id: "perforated-slat", name: "Perforated slat", note: "Perforation pattern and open area set against how much light, air and visibility the opening needs.", status: "CONFIRMED" },
    ],
    specGroups: [],
    applications: [
      "Retail and showroom frontages",
      "Parking and ventilated service areas",
      "Mall and arcade units",
      "Openings needing light and security together",
    ],
    industries: ["retail-commercial"],
    environments: ["internal", "external", "security"],
    operatingMethod: [
      "Perforated interlocking slats form a curtain that winds onto a barrel above the opening.",
      "Steel guides retain the curtain at each jamb.",
      "A side, central or tubular drive turns the barrel, with adjustable limits.",
    ],
    construction: [
      "Perforated interlocking slats",
      "Steel barrel, end plates and guides",
      "Powder-coated finish to a specified colour",
    ],
    related: ["grille-rolling-shutters", "polycarbonate-rolling-shutters", "aluminium-rolling-shutters"],
    documents: [
      { title: "Rolling Shutter range brochure", kind: "Brochure", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-shutter-perforated",
    legacyUrls: ["perforated-shutters.html"],
  },
  {
    id: "polycarbonate-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "single-wall-rolling-shutters",
    name: "Polycarbonate Rolling Shutters",
    status: "CONFIRMED",
    tagline: "A shutter you can see straight through, closed.",
    summary:
      "Transparent polycarbonate shutters in 85–170 mm profiles, cutting around 80% of incident UV while keeping the frontage visible.",
    overview: [
      "A polycarbonate shutter uses transparent panels instead of a solid slat, so the frontage behind it stays visible when the shutter is closed. For a retail unit in a mall or on a high street, that turns closing time from a blank steel face back into a display window.",
      "Polycarbonate is also considerably tougher than glass for its weight, blocks most incident UV, and performs better than glass on both sound and heat transfer.",
    ],
    quickFacts: [
      { label: "Panel height", value: "85 / 100 / 115 / 170 mm" },
      { label: "Panel thickness", value: "1.5–5.0 mm" },
      { label: "UV blocked", value: "Approximately 80%" },
      { label: "Fire behaviour", value: "Flame retardant, Class I" },
    ],
    benefits: [
      { title: "Full visibility", body: "Transparent panels keep the display visible while the unit is closed and secured." },
      { title: "UV protection", body: "Cuts roughly 80% of incident ultraviolet, protecting stock and display materials behind the shutter." },
      { title: "Better than glass thermally and acoustically", body: "Stated as around 3–4 dB better than glass on sound, with substantially better heat insulation." },
      { title: "Fire retardant and recyclable", body: "Flame retardant and self-extinguishing Class I, ROHS compliant, and the panel can be recycled." },
    ],
    variants: [
      { id: "transparent", name: "Fully transparent", note: "The full curtain in polycarbonate, for display frontages where visibility is the point.", status: "CONFIRMED" },
      { id: "mixed-slat", name: "Mixed polycarbonate and steel slat", note: "Alternating transparent and solid slats, trading some visibility for more physical resistance.", status: "POTENTIAL" },
    ],
    specGroups: [
      {
        group: "Curtain",
        specs: [
          { label: "Type code", value: "AD-TD001" },
          { label: "Panel material", value: "Polycarbonate" },
          { label: "Standard finish", value: "Transparent" },
          { label: "Panel height", value: "85 mm, 100 mm, 115 mm, 170 mm" },
          { label: "Panel thickness", value: "1.5 / 2.1 / 3.2 / 4.8 / 5.0 mm" },
        ],
      },
      {
        group: "Frame and operation",
        specs: [
          { label: "Frame", value: "Colour steel or aluminium alloy" },
          { label: "Open style", value: "Rolling, folding or sliding" },
          { label: "Operation", value: "Electric or manual" },
        ],
      },
      {
        group: "Performance",
        specs: [
          { label: "UV blocked", value: "Approximately 80%" },
          { label: "Acoustic performance", value: "Approximately 3–4 dB better than glass" },
          { label: "Fire behaviour", value: "Flame retardant, self-extinguishing Class I" },
          { label: "Compliance", value: "ROHS; panel is recyclable" },
        ],
      },
    ],
    applications: [
      "Retail units and high-grade shops",
      "Shopping malls and arcades",
      "Exhibition and display centres",
      "Showrooms and commercial frontages",
    ],
    industries: ["retail-commercial"],
    environments: ["internal", "security"],
    operatingMethod: [
      "Transparent polycarbonate panels are linked into a curtain that winds onto a barrel above the opening.",
      "Guides in colour steel or aluminium alloy retain the curtain at each jamb.",
      "A drive turns the barrel, with adjustable limits; the curtain can also be arranged to fold or slide.",
    ],
    construction: [
      "Polycarbonate panels, 1.5–5.0 mm, in 85–170 mm profiles",
      "Colour steel or aluminium alloy frame and guides",
      "Steel barrel and end plates",
    ],
    related: ["grille-rolling-shutters", "perforated-rolling-shutters", "aluminium-rolling-shutters"],
    documents: [
      { title: "Polycarbonate Shutter datasheet", kind: "Datasheet", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-shutter-polycarbonate",
    legacyUrls: ["polycarbonate-rolling-shutters.html", "polycarbonate.html"],
  },
  {
    id: "insulated-double-wall-rolling-shutters",
    familyId: "rolling-shutters",
    categoryId: "insulated-rolling-shutters",
    name: "Insulated Double-Wall Rolling Shutters",
    status: "CONFIRMED",
    tagline: "Double-wall slats where the opening separates two climates.",
    summary:
      "Double-wall insulated shutters for openings that need thermal and acoustic separation as well as security, without giving up the compact roll.",
    overview: [
      "An insulated shutter uses a double-wall slat with an insulating core rather than a single folded profile. The result is a curtain that slows heat transfer and cuts sound through the opening, while keeping the compact roll and clear aperture of a standard rolling shutter.",
      "The type is specified where a shutter closes an opening between conditioned and unconditioned space, or where noise transmission through a large aperture is a problem for neighbours or for the workspace behind it.",
    ],
    quickFacts: [
      { label: "Curtain", value: "Double-wall insulated slat" },
      { label: "Purpose", value: "Thermal and acoustic separation" },
      { label: "Operation", value: "Electric or manual" },
      { label: "Specification", value: "To be confirmed per opening" },
    ],
    benefits: [
      { title: "Thermal separation", body: "An insulating core in the slat reduces heat transfer through the closed opening." },
      { title: "Sound reduction", body: "Double-wall construction cuts noise transmission compared with a single-skin curtain." },
      { title: "Same compact roll", body: "Insulation is added without needing side room or intruding into the opening." },
      { title: "Industrial duty", body: "Steel construction and steel guides, motorised or manual as the opening requires." },
    ],
    variants: [
      { id: "galvanised-insulated", name: "Galvanised insulated", note: "Galvanised double-wall slat with an insulating core — the standard industrial configuration.", status: "CONFIRMED" },
      { id: "aluminium-insulated", name: "Aluminium insulated", note: "A lighter insulated slat for frontages where curtain weight and finish matter more than span.", status: "POTENTIAL" },
    ],
    specGroups: [],
    applications: [
      "Openings between conditioned and unconditioned space",
      "Cold and chilled storage areas",
      "Noise-sensitive industrial and urban sites",
      "Workshops and service bays",
    ],
    industries: ["manufacturing", "cold-chain-food", "warehousing-logistics"],
    environments: ["internal", "cold"],
    operatingMethod: [
      "Double-wall insulated slats form a curtain that winds onto a barrel above the opening.",
      "Steel guides retain the curtain; perimeter and bottom seals close the gaps around it.",
      "A side or central drive turns the barrel, with adjustable limits and a manual override.",
    ],
    construction: [
      "Double-wall slats with an insulating core",
      "Steel barrel, end plates and guides",
      "Perimeter and bottom seals to retain the thermal envelope",
    ],
    namingNote:
      "Working name. The previous product page for this shutter carried a page title reading “Galvanize Rolling Shutter” while its heading read “Insulated Rolling Shutters”. The product itself is confirmed; the exact commercial name needs confirming from the business.",
    related: ["galvanized-steel-rolling-shutters", "fire-rated-rolling-shutters", "high-speed-insulated-panel-doors"],
    documents: [
      { title: "Insulated Rolling Shutter datasheet", kind: "Datasheet", href: null, note: "In preparation — ask us for the specification sheet in the meantime." },
    ],
    imageId: "p-shutter-insulated",
    legacyUrls: ["g-i-rolling-shutters.html"],
  },
];
