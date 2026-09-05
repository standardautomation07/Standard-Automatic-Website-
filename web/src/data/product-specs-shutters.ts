import type { Spec, SpecGroup } from "@/lib/types";

/**
 * Rolling Shutters specification tables.
 *
 * Authored from the normalised product data Standard Automatic Solutions
 * issued on 2026-09-05, and kept in the same shape for all thirteen products
 * so a specifier can compare like with like.
 *
 * The field list is the full common set the business asked the architecture to
 * support: identification, material, curtain, opening, guide, barrel and
 * shaft, bottom, operation, controls, performance, safety, finish and
 * installation. Every product carries the whole list. Most of it is not
 * answered, and that is the point — a named field showing "to be confirmed" is
 * honest and useful; a field quietly omitted hides the gap, and a field filled
 * with a plausible number is worse than either.
 *
 * Status follows the same rule as the rest of the site:
 *
 *  - CONFIRMED    — a fixed characteristic from the issued data.
 *  - CONFIGURABLE — a real figure, bounded by the configuration. The published
 *                   thickness classes sit here, because 0.8 / 1.0 / 1.2 mm is
 *                   the range across duties rather than one universal value.
 *  - TBC          — either the issued data itself says the value depends on
 *                   the project, or nothing was supplied and the row carries a
 *                   null value.
 *
 * Deliberately absent everywhere in this family, because none was supplied:
 * open-area percentage, insulation core thickness, U-value, acoustic rating,
 * cycle rating, wind speed, corrosion lifetime, fire certificate details, and
 * any universal maximum width or height.
 */

const fixed = (label: string, value: string, note?: string): Spec => ({
  label,
  value,
  status: "CONFIRMED",
  ...(note ? { note } : {}),
});

const configurable = (label: string, value: string, note?: string): Spec => ({
  label,
  value,
  status: "CONFIGURABLE",
  ...(note ? { note } : {}),
});

const projectSpecific = (label: string, value: string, note?: string): Spec => ({
  label,
  value,
  status: "TBC",
  ...(note ? { note } : {}),
});

const unanswered = (label: string, unit?: string, note?: string): Spec => ({
  label,
  value: null,
  status: "TBC",
  ...(unit ? { unit } : {}),
  ...(note ? { note } : {}),
});

const group = (name: string, specs: Spec[]): SpecGroup => ({ group: name, specs });

/** Values that differ per product. Everything not given falls back to a
 *  named-but-unanswered row rather than being dropped from the table. */
interface ShutterInput {
  family: string;
  material: string;
  grade?: string;
  coating?: string;
  surface?: string;
  construction: string;
  profile?: string;
  profileHeight?: string;
  thickness: Spec;
  endLock?: string;
  size: string;
  mullion?: string;
  guideMaterial?: string;
  windLock?: string;
  guideSeal?: string;
  barrel?: string;
  bottomProfile?: string;
  bottomSeal?: string;
  lock?: string;
  operation: string;
  motorTypes?: string;
  override: string;
  controls?: string;
  wind?: Spec;
  fire?: Spec;
  thermal?: Spec;
  acoustic?: Spec;
  corrosion: string;
  cycle?: Spec;
  safety: string;
  extraSafety?: string;
  finish: string;
  ral?: string;
  mounting?: string;
  /** Rows unique to this product, appended to the curtain group. */
  extraCurtain?: Spec[];
}

const HEADROOM_NOTE =
  "Confirmed at survey. Headroom and side room rule out more shutters than opening width does.";

function shutterSpec(i: ShutterInput): SpecGroup[] {
  return [
    group("Identification & material", [
      fixed("Product family", i.family),
      fixed("Material", i.material),
      i.grade ? fixed("Material grade", i.grade) : unanswered("Material grade"),
      i.coating ? fixed("Coating", i.coating) : unanswered("Coating"),
      i.surface ? fixed("Surface treatment", i.surface) : unanswered("Surface treatment"),
    ]),
    group("Curtain", [
      fixed("Construction", i.construction),
      i.profile ? configurable("Profile", i.profile) : unanswered("Profile"),
      i.profileHeight
        ? configurable("Profile height", i.profileHeight, "mm")
        : unanswered("Profile height", "mm"),
      i.thickness,
      i.endLock ? fixed("End lock", i.endLock) : unanswered("End lock"),
      unanswered("Slat weight", "kg/m", "Calculated with the profile when the shutter is engineered."),
      unanswered("Curtain weight", "kg/m²", "Sizes the barrel, the guides and the operator."),
      ...(i.extraCurtain ?? []),
    ]),
    group("Opening", [
      projectSpecific("Maximum width", i.size),
      projectSpecific("Maximum height", i.size),
      unanswered("Maximum area", "m²"),
      i.mullion ? fixed("Intermediate mullion", i.mullion) : unanswered("Intermediate mullion"),
    ]),
    group("Guide", [
      i.guideMaterial ? fixed("Guide material", i.guideMaterial) : unanswered("Guide material"),
      unanswered("Guide width", "mm"),
      unanswered("Guide depth", "mm"),
      unanswered("Curtain engagement", "mm", "How far the curtain sits into the guide."),
      i.windLock ? fixed("Wind lock", i.windLock) : unanswered("Wind lock"),
      i.guideSeal ? fixed("Guide seal", i.guideSeal) : unanswered("Guide seal"),
    ]),
    group("Barrel & shaft", [
      i.barrel ? fixed("Barrel type", i.barrel) : unanswered("Barrel type"),
      unanswered("Shaft diameter", "mm"),
      unanswered("Shaft material"),
      unanswered("Bracket"),
      unanswered("Hood / headbox"),
    ]),
    group("Bottom", [
      i.bottomProfile ? fixed("Bottom profile", i.bottomProfile) : unanswered("Bottom profile"),
      unanswered("Bottom bar dimensions", "mm"),
      i.bottomSeal ? fixed("Bottom seal", i.bottomSeal) : unanswered("Bottom seal"),
      i.lock ? fixed("Lock", i.lock) : unanswered("Lock"),
    ]),
    group("Operation & control", [
      fixed("Operation", i.operation),
      i.motorTypes ? fixed("Motor options", i.motorTypes) : unanswered("Motor options"),
      unanswered("Motor rating", "kW", "Selected against curtain weight, opening size and duty."),
      unanswered("Supply voltage", "V / phase / Hz"),
      fixed("Emergency manual override", i.override),
      i.controls ? fixed("Controls", i.controls) : unanswered("Controls"),
    ]),
    group("Performance", [
      i.wind ?? unanswered("Wind resistance", "class"),
      i.fire ?? unanswered("Fire rating", "minutes", "Published only against a certificate for the tested assembly."),
      i.thermal ?? unanswered("Thermal performance", "W/m²K"),
      i.acoustic ?? unanswered("Acoustic performance", "dB"),
      fixed("Corrosion resistance", i.corrosion),
      i.cycle ?? unanswered("Cycle rating", "cycles", "Stated only where the supplied system has been validated to it."),
      unanswered("Opening speed", "m/s"),
    ]),
    group("Safety", [
      fixed("Safety devices", i.safety),
      ...(i.extraSafety ? [fixed("Additional safety", i.extraSafety)] : []),
      unanswered("Anti-drop device"),
      unanswered("Brake"),
      unanswered("Obstacle detection"),
    ]),
    group("Finish", [
      fixed("Finish", i.finish),
      i.ral ? fixed("Colour", i.ral) : unanswered("Colour"),
    ]),
    group("Installation", [
      i.mounting ? fixed("Mounting", i.mounting) : fixed("Mounting", "Face mounted, between jamb or recessed"),
      unanswered("Headroom required", "mm", HEADROOM_NOTE),
      unanswered("Side room required", "mm", HEADROOM_NOTE),
      unanswered("Mounting substrate", undefined, "Agreed at survey; the fixing method follows from it."),
    ]),
  ];
}

const CUSTOM = "Available in custom sizes";
const ENGINEERED = "Large openings available subject to engineering";
const WIND_SIZE = "Designed according to project-specific wind loads";
const POLY_SIZE = "Depends on the selected profile and drive system";
const COUNTER_SIZE = "Designed according to the opening dimensions and the application";

const STD_SAFETY = "Photocell and safety edge available; manual override on every powered shutter";
const IND_SAFETY = "Photocell, safety edge and emergency stop";

export const rollingShutterSpecs: Record<string, SpecGroup[]> = {
  "ms-solid-rolling-shutters": shutterSpec({
    family: "MS Solid Rolling Shutter",
    material: "Mild steel / CR steel",
    coating: "Primer and paint",
    surface: "Powder coating optional",
    construction: "Single-skin interlocking metal slats",
    profile: "Curved / interlocking",
    profileHeight: "Approximately 75–80 mm class",
    thickness: configurable("Slat thickness", "0.8 / 1.0 / 1.2 mm", "Light, standard and heavy duty respectively."),
    size: CUSTOM,
    guideMaterial: "MS / GI, conventional guide construction",
    bottomProfile: "MS bottom rail",
    operation: "Push-up, gear operated or motorised",
    override: "Manual operation on gear and motorised configurations",
    corrosion: "Standard; depends on the coating and its maintenance",
    safety: STD_SAFETY,
    finish: "Primer and paint, powder coating optional",
  }),

  "galvanized-steel-rolling-shutters": shutterSpec({
    family: "GI Solid Rolling Shutter",
    material: "Galvanized steel",
    coating: "Galvanized",
    surface: "Powder coating optional",
    construction: "Interlocking curved / formed profile",
    profile: "Curved / interlocking",
    profileHeight: "Approximately 75–80 mm class",
    thickness: configurable("Slat thickness", "0.8–1.0 mm class, 1.2 mm heavy duty"),
    size: CUSTOM,
    guideMaterial: "Reinforced guide on the heavy duty configuration",
    operation: "Manual, gear operated or motorised",
    override: "Manual operation on gear and motorised configurations",
    corrosion: "Corrosion-resistant alternative to conventional mild steel",
    safety: STD_SAFETY,
    finish: "Galvanized, powder coating optional",
  }),

  "galvalume-rolling-shutters": shutterSpec({
    family: "Galvalume Rolling Shutter",
    material: "Aluminium-zinc coated steel (Galvalume)",
    coating: "Aluminium-zinc alloy",
    surface: "Powder coating optional",
    construction: "Interlocking formed profile",
    profile: "Interlocking",
    profileHeight: "Approximately 75–80 mm class",
    thickness: configurable("Slat thickness", "1.0 mm class, 1.2 mm class heavy duty"),
    size: CUSTOM,
    operation: "Manual, gear operated or motorised",
    override: "Manual operation on gear and motorised configurations",
    corrosion: "Enhanced corrosion protection with steel shutter construction",
    safety: STD_SAFETY,
    finish: "Galvalume metallic finish, powder coating optional",
  }),

  "aluminium-rolling-shutters": shutterSpec({
    family: "Aluminium Rolling Shutter",
    material: "Aluminium",
    construction: "Roll-formed profile, or extruded architectural profile on the premium configuration",
    profile: "Single wall, double wall or insulated where applicable",
    profileHeight: "Configuration dependent",
    thickness: configurable(
      "Slat thickness",
      "Approx. 1.0 mm class standard, 1.2–1.5 mm class heavy duty, extruded configuration dependent",
      "An extruded architectural section is specified by geometry rather than by sheet thickness.",
    ),
    size: CUSTOM,
    operation: "Manual, gear where applicable, or motorised",
    override: "Manual operation on gear and motorised configurations",
    corrosion: "High",
    safety: STD_SAFETY,
    finish: "Mill finish, anodised or powder coated",
    ral: "Custom RAL colours available",
  }),

  "stainless-steel-rolling-shutters": shutterSpec({
    family: "Stainless Steel Rolling Shutter",
    material: "Stainless steel",
    grade: "SS304, or SS316 for coastal and high-corrosion installations",
    construction: "Curved interlocking, or heavy-duty interlocking where applicable",
    profile: "Curved / interlocking",
    thickness: configurable(
      "Slat thickness",
      "SS304 approx. 0.9–1.2 mm class; SS304 heavy approx. 1.2 mm class; SS316 configuration dependent",
      "Quoted against the profile rather than as one figure for every stainless shutter.",
    ),
    size: CUSTOM,
    guideMaterial: "SS, MS or GI depending on configuration; SS preferred for high-corrosion installations",
    operation: "Manual, gear operated or motorised",
    override: "Manual operation on gear and motorised configurations",
    corrosion: "High; SS316 specified for coastal and chemically aggressive environments",
    safety: STD_SAFETY,
    finish: "Brushed, satin or polished",
  }),

  "perforated-rolling-shutters": shutterSpec({
    family: "Perforated Rolling Shutter",
    material: "MS, GI or aluminium",
    construction: "Perforated interlocking slats; reinforced curtain on the heavy-duty configuration",
    profile: "Interlocking",
    thickness: configurable("Slat thickness", "0.8 / 1.0 / 1.2 mm class", "For the metal versions."),
    size: CUSTOM,
    guideMaterial: "Heavy-duty guide on the reinforced configuration",
    operation: "Manual, gear operated or motorised",
    override: "Manual operation on gear and motorised configurations",
    corrosion: "Depends on the material selected",
    safety: STD_SAFETY,
    finish: "Paint, powder coating or anodised depending on material",
    extraCurtain: [
      projectSpecific("Hole shape", "Pattern specific"),
      projectSpecific("Hole size", "Pattern specific"),
      projectSpecific("Hole pitch", "Pattern specific"),
      projectSpecific(
        "Open area",
        "Pattern specific",
        "Open area follows from hole shape, size and pitch. There is no universal figure for a perforated curtain.",
      ),
    ],
  }),

  "vision-window-rolling-shutters": shutterSpec({
    family: "Vision / Window Rolling Shutter",
    material: "MS, GI or aluminium",
    construction: "Solid interlocking curtain with defined vision or window sections",
    profile: "Interlocking",
    thickness: configurable("Slat thickness", "Selected with the material and profile"),
    size: CUSTOM,
    operation: "Manual, gear operated or motorised",
    override: "Manual operation on gear and motorised configurations",
    corrosion: "Depends on the material selected",
    safety: STD_SAFETY,
    finish: "Paint, powder coating or anodised depending on material",
    extraCurtain: [
      projectSpecific("Vision section height", "Configuration dependent"),
      projectSpecific("Window / opening pattern", "Configuration dependent"),
      fixed("Solid section", "Solid interlocking slats outside the vision sections"),
      fixed("Mixed curtain", "Solid, perforated and vision sections in one curtain where specified"),
    ],
  }),

  "grille-rolling-shutters": shutterSpec({
    family: "Rolling Grille",
    material: "Steel, aluminium or stainless steel",
    construction: "Link, lattice, open security or bar and rod construction",
    profile: "Grille pattern selected per project",
    thickness: configurable("Bar / rod diameter", "Approximately 6–8 mm class depending on design"),
    size: CUSTOM,
    operation: "Manual, gear operated or motorised",
    override: "Manual operation on gear and motorised configurations",
    corrosion: "Depends on the material selected",
    safety: STD_SAFETY,
    finish: "Powder coated, anodised or stainless depending on material",
    cycle: projectSpecific(
      "Cycle rating",
      "Configuration dependent",
      "Stated only for a supplied system that has actually been validated to a rating. The high-cycle configuration is specified against the duty.",
    ),
    extraCurtain: [
      configurable("Opening spacing", "Approximately 35–150 mm depending on pattern"),
      projectSpecific("Link dimensions", "Pattern specific"),
      projectSpecific("Grille pitch", "Pattern specific"),
    ],
  }),

  "polycarbonate-rolling-shutters": shutterSpec({
    family: "Transparent Polycarbonate Rolling Shutter",
    material: "UV-resistant polycarbonate",
    surface: "UV stabilised",
    construction: "Polycarbonate interlocking sections with aluminium connectors",
    profile: "Interlocking polycarbonate section",
    thickness: configurable(
      "Section thickness",
      "Approximately 2–3 mm standard class, 3–5 mm heavier / custom class",
    ),
    size: POLY_SIZE,
    operation: "Primarily motorised",
    override: "Manual emergency operation where the configuration allows it",
    corrosion: "Not applicable to the curtain; hardware specified to the environment",
    safety: STD_SAFETY,
    finish: "Clear or tinted polycarbonate; aluminium components finished to requirement",
    extraCurtain: [
      fixed("Connector material", "Aluminium connectors"),
      fixed("Connecting hardware", "Stainless connecting hardware where applicable"),
      fixed("Transparency", "Clear or tinted"),
      projectSpecific("Polycarbonate grade", "Configuration dependent"),
    ],
  }),

  "insulated-double-wall-rolling-shutters": shutterSpec({
    family: "Insulated Rolling Shutter",
    material: "Aluminium, GI or steel face material",
    construction: "Double-wall profile with an insulating core",
    profile: "Double-wall insulated slat",
    thickness: projectSpecific("Overall profile thickness", "Configuration dependent"),
    size: CUSTOM,
    guideSeal: "Guide seal fitted",
    bottomSeal: "Bottom seal fitted",
    operation: "Manual, gear operated or motorised",
    override: "Manual operation on gear and motorised configurations",
    corrosion: "Depends on the face material selected",
    safety: STD_SAFETY,
    finish: "Powder coated, anodised or galvanized depending on face material",
    thermal: projectSpecific(
      "Thermal performance",
      "Configuration dependent",
      "A U-value is published only where real test data exists for the specific construction. None has been supplied for these configurations.",
    ),
    acoustic: projectSpecific("Acoustic performance", "Configuration dependent"),
    extraCurtain: [
      fixed("Core material", "PU / PUF, PIR, mineral wool or another tested insulation"),
      projectSpecific("Core thickness", "Configuration dependent"),
    ],
  }),

  "industrial-rolling-shutters": shutterSpec({
    family: "Industrial Rolling Shutter",
    material: "GI or MS",
    construction: "Heavy-duty interlocking curtain; engineered heavier profile on extra heavy duty",
    profile: "Heavy-duty interlocking",
    thickness: configurable(
      "Slat thickness",
      "Approximately 1.0–1.2 mm class, or engineered heavier",
    ),
    size: ENGINEERED,
    mullion: "Available on wide openings",
    guideMaterial: "Reinforced guide",
    windLock: "Wind-lock option",
    barrel: "Heavy-duty shaft and barrel with engineered brackets",
    operation: "Motorised",
    motorTypes: "Side or industrial drive, direct or indirect depending on configuration",
    override: "Emergency manual override, independent of the power supply",
    controls: "Industrial push button station with key switch isolation",
    corrosion: "Depends on the material selected",
    safety: IND_SAFETY,
    extraSafety: "Wicket door, vision section and intermediate mullion available as options",
    finish: "Paint, powder coating or galvanized depending on material",
  }),

  "counter-service-rolling-shutters": shutterSpec({
    family: "Counter / Service Window Shutter",
    material: "Aluminium, GI or stainless steel",
    grade: "SS304 class on the stainless configuration",
    construction: "Light interlocking curtain in a compact headbox",
    profile: "Compact interlocking section",
    thickness: configurable(
      "Slat thickness",
      "Aluminium approx. 1.0 mm class; GI approx. 0.8–1.0 mm class; stainless SS304 class",
    ),
    size: COUNTER_SIZE,
    bottomProfile: "Bottom rail with integral lock",
    lock: "Integral lock at the bottom rail",
    operation: "Manual, gear operated, or motorised where suitable",
    override: "Manual operation on gear and motorised configurations",
    corrosion: "Depends on the material selected",
    safety: STD_SAFETY,
    finish: "Anodised, powder coated, galvanized or stainless depending on material",
    mounting: "Face mounted, between jamb or recessed into the joinery",
  }),

  "windproof-rolling-shutters": shutterSpec({
    family: "Windproof / Storm-Resistant Rolling Shutter",
    material: "MS, GI, Galvalume, aluminium or industrial steel",
    construction: "Reinforced interlocking curtain; project-engineered on the storm-resistant configuration",
    profile: "Reinforced interlocking",
    thickness: configurable("Slat thickness", "1.0 / 1.2 mm class, or engineered heavier"),
    size: WIND_SIZE,
    endLock: "Enhanced end locking",
    guideMaterial: "Wind-resistant reinforced guide",
    windLock: "Wind-lock system",
    barrel: "Heavy-duty shaft",
    bottomProfile: "Reinforced bottom bar",
    operation: "Motorised",
    override: "Emergency manual override, independent of the power supply",
    corrosion: "Depends on the material selected",
    safety: IND_SAFETY,
    extraSafety: "Storm anchoring and structural fixing designed to the project wind load",
    finish: "Paint, powder coating, galvanized or Galvalume depending on material",
    wind: projectSpecific(
      "Wind resistance",
      "Engineered to the project wind load",
      "Represented as wind pressure, classification, tested configuration and anchoring rather than as a wind speed. No wind speed is claimed.",
    ),
  }),
};
