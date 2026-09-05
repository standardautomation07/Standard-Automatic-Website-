import type { Spec, SpecGroup } from "@/lib/types";

/**
 * Rolling Shutters specification tables.
 *
 * Authored from the product data Standard Automatic Solutions issued on
 * 2026-09-05 and the conventional MS/GI engineering reference data issued with
 * it. Every product carries the same field list so a specifier can compare
 * like with like.
 *
 * Every field now carries an answer. Where a field has a catalogue value it is
 * published. Where it genuinely varies, the answer states what it varies with
 * rather than leaving the row blank:
 *
 *  - "Configuration dependent"  — varies with the selected profile, size or
 *    construction.
 *  - "Project specific"         — needs engineering or a site assessment.
 *  - "Survey dependent"         — measured at survey.
 *  - "Calculated from ..."      — derived once the profile and opening are set.
 *  - "Selected according to ..."— chosen against a stated driver.
 *  - "Certified configuration dependent" — needs test or certificate evidence.
 *  - "Not rated" / "Not applicable" / "Optional" / "Available" — plain answers.
 *
 * A field that says what it depends on is a finished answer. A blank row is
 * not, and a plausible invented number is worse than either. Nothing here
 * states a curtain weight, motor rating, opening speed, wind class, fire
 * rating, U-value, dB figure, cycle life or certificate number, because none
 * of those has been supplied.
 *
 * Status still drives the badge in the table:
 *
 *  - CONFIRMED    — a fixed characteristic, shown plainly.
 *  - CONFIGURABLE — a real figure or range bounded by the configuration.
 *  - TBC          — reserved for a genuinely empty field. Nothing in this
 *                   family uses it any more.
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

const group = (name: string, specs: Spec[]): SpecGroup => ({ group: name, specs });

/* ------------------------------------------------------------------ *
 * Conventional MS / GI engineering reference data.
 *
 * These are the reference ranges for conventional shutter construction. They
 * are deliberately expressed as classes selected against the opening rather
 * than as single values, because that is how they are actually chosen — and
 * they are not applied to the industrial, fire-rated or wind-rated systems,
 * which are engineered.
 * ------------------------------------------------------------------ */

const PROFILE_CLASS = "Curved / interlocking, approximately 75–80 mm class";
const GUIDE_WIDTH = "65 / 75 / 100 mm class depending on opening size";
const GUIDE_DEPTH = "Configuration dependent; conventional systems approximately 65–100 mm class";
const GUIDE_THICKNESS = "3.15 mm class conventional guide construction";
const ENGAGEMENT = "40–60 mm depending on opening width";
const SHAFT = "32 / 40 / 50 mm class, selected according to shutter width and curtain load";
const BRACKET =
  "Steel bracket, size selected according to shutter height and load; conventional reference range from 300 × 300 mm upward";
const SLAT_WEIGHT = "Calculated from the selected profile and material";
const CURTAIN_WEIGHT = "Calculated from the selected profile, material and opening dimensions";
const MOTOR_RATING =
  "Selected according to curtain weight, opening size, barrel and duty cycle";
const VOLTAGE = "230 V AC single-phase or 415 V AC three-phase depending on the selected motor";
const CONTROLS =
  "Push button, key switch, RF remote, access control, GSM or Wi-Fi where compatible";
const OVERRIDE = "Manual override available on powered configurations";
const MOTOR_OPTIONS =
  "Tubular, central or side-mounted motor depending on shutter size and configuration";
const SAFETY_DEVICES =
  "Photocell, safety edge and emergency stop available depending on the motor and control configuration";
const ANTI_DROP = "Available where required; configuration dependent";
const BRAKE = "Motor or gear brake according to the selected operator";
const OBSTACLE = "Available with a compatible control and safety system";
const CYCLE = "Duty dependent; the operator is selected according to operating frequency";
const SPEED = "Motor and configuration dependent";
const SUBSTRATE =
  "Masonry, RCC, structural steel or other suitable structural support; fixing selected according to the substrate";
const MOUNTING = "Face mounted, between jamb or recessed";
const SURVEY = "Survey dependent";
const CONFIG = "Configuration dependent";
const PROJECT = "Project specific";
const NOT_RATED = "Not rated";
const NOT_FIRE_RATED = "Not fire-rated unless supplied as a certified fire-rated system";
const WIND_STANDARD = "Standard configuration; wind-resistant configuration available";

interface ShutterInput {
  family: string;
  material: string;
  grade: string;
  coating: string;
  surface: string;
  construction: string;
  profile: string;
  profileHeight: string;
  thickness: Spec;
  endLock?: string;
  slatWeight?: string;
  curtainWeight?: string;
  size: string;
  area?: string;
  mullion?: string;
  guideMaterial: string;
  guideWidth?: string;
  guideDepth?: string;
  guideThickness?: string;
  engagement?: string;
  windLock?: string;
  guideSeal?: string;
  barrel: string;
  shaft?: string;
  shaftMaterial?: string;
  bracket?: string;
  hood: string;
  bottomProfile: string;
  bottomBar?: string;
  bottomSeal?: string;
  lock?: string;
  operation: string;
  motorOptions?: string;
  motorRating?: string;
  voltage?: string;
  override?: string;
  controls?: string;
  wind?: string;
  fire?: string;
  thermal?: string;
  acoustic?: string;
  corrosion: string;
  cycle?: string;
  speed?: string;
  safety?: string;
  extraSafety?: string;
  antiDrop?: string;
  brake?: string;
  obstacle?: string;
  finish: string;
  colour: string;
  mounting?: string;
  headroom?: string;
  sideRoom?: string;
  substrate?: string;
  extraCurtain?: Spec[];
}

function shutterSpec(i: ShutterInput): SpecGroup[] {
  return [
    group("Identification & material", [
      fixed("Product family", i.family),
      fixed("Material", i.material),
      fixed("Material grade", i.grade),
      fixed("Coating", i.coating),
      fixed("Surface treatment", i.surface),
    ]),
    group("Curtain", [
      fixed("Construction", i.construction),
      configurable("Profile", i.profile),
      configurable("Profile height", i.profileHeight),
      i.thickness,
      fixed("End lock", i.endLock ?? CONFIG),
      fixed("Slat weight", i.slatWeight ?? SLAT_WEIGHT),
      fixed("Curtain weight", i.curtainWeight ?? CURTAIN_WEIGHT),
      ...(i.extraCurtain ?? []),
    ]),
    group("Opening", [
      configurable("Maximum width", i.size),
      configurable("Maximum height", i.size),
      configurable("Maximum area", i.area ?? CONFIG),
      fixed("Intermediate mullion", i.mullion ?? "Available for large or multiple curtain arrangements"),
    ]),
    group("Guide", [
      fixed("Guide material", i.guideMaterial),
      configurable("Guide width", i.guideWidth ?? GUIDE_WIDTH),
      configurable("Guide depth", i.guideDepth ?? GUIDE_DEPTH),
      configurable("Guide thickness", i.guideThickness ?? GUIDE_THICKNESS),
      configurable("Curtain engagement", i.engagement ?? ENGAGEMENT),
      fixed("Wind lock", i.windLock ?? "Optional; required where wind exposure or design demands it"),
      fixed("Guide seal", i.guideSeal ?? "Optional; configuration dependent"),
    ]),
    group("Barrel & shaft", [
      fixed("Barrel type", i.barrel),
      configurable("Shaft diameter", i.shaft ?? SHAFT),
      fixed("Shaft material", i.shaftMaterial ?? "Steel"),
      configurable("Bracket", i.bracket ?? BRACKET),
      fixed("Hood / headbox", i.hood),
    ]),
    group("Bottom", [
      fixed("Bottom profile", i.bottomProfile),
      configurable("Bottom bar dimensions", i.bottomBar ?? CONFIG),
      fixed("Bottom seal", i.bottomSeal ?? "Optional rubber or EPDM seal where required"),
      fixed("Lock", i.lock ?? "Central or side locking according to configuration"),
    ]),
    group("Operation & control", [
      fixed("Operation", i.operation),
      fixed("Motor options", i.motorOptions ?? MOTOR_OPTIONS),
      configurable("Motor rating", i.motorRating ?? MOTOR_RATING),
      fixed("Supply voltage", i.voltage ?? VOLTAGE),
      fixed("Emergency manual override", i.override ?? OVERRIDE),
      fixed("Controls", i.controls ?? CONTROLS),
    ]),
    group("Performance", [
      configurable("Wind resistance", i.wind ?? WIND_STANDARD),
      fixed("Fire rating", i.fire ?? NOT_FIRE_RATED),
      fixed("Thermal performance", i.thermal ?? NOT_RATED),
      fixed("Acoustic performance", i.acoustic ?? "Not specifically rated; configuration dependent"),
      fixed("Corrosion resistance", i.corrosion),
      configurable("Cycle rating", i.cycle ?? CYCLE),
      configurable("Opening speed", i.speed ?? SPEED),
    ]),
    group("Safety", [
      fixed("Safety devices", i.safety ?? SAFETY_DEVICES),
      ...(i.extraSafety ? [fixed("Additional safety", i.extraSafety)] : []),
      fixed("Anti-drop device", i.antiDrop ?? ANTI_DROP),
      fixed("Brake", i.brake ?? BRAKE),
      fixed("Obstacle detection", i.obstacle ?? OBSTACLE),
    ]),
    group("Finish", [fixed("Finish", i.finish), fixed("Colour", i.colour)]),
    group("Installation", [
      fixed("Mounting", i.mounting ?? MOUNTING),
      configurable("Headroom required", i.headroom ?? SURVEY),
      configurable("Side room required", i.sideRoom ?? SURVEY),
      fixed("Mounting substrate", i.substrate ?? SUBSTRATE),
    ]),
  ];
}

const CUSTOM_SIZE = "Custom size; configuration dependent";

export const rollingShutterSpecs: Record<string, SpecGroup[]> = {
  /* ------------------------------------------------------------ R01 MS */
  "ms-solid-rolling-shutters": shutterSpec({
    family: "MS Solid Rolling Shutter",
    material: "Mild steel / CR steel",
    grade: "Commercial mild steel or cold-rolled steel; grade selected according to manufacturing requirement",
    coating: "Primer and paint",
    surface: "Powder coating optional",
    construction: "Single-skin interlocking metal slats",
    profile: PROFILE_CLASS,
    profileHeight: "Approximately 75–80 mm class",
    thickness: configurable(
      "Slat thickness",
      "0.8 mm / 1.0 mm / 1.2 mm",
      "Light duty 0.8 mm, standard duty 1.0 mm, heavy duty 1.2 mm.",
    ),
    size: CUSTOM_SIZE,
    guideMaterial: "MS / GI conventional guide construction",
    barrel: "Spring-balanced barrel for conventional manual shutters",
    hood: "MS or GI hood; size configuration dependent",
    bottomProfile: "MS bottom rail",
    operation: "Push-up, gear operated or motorised",
    corrosion: "Standard; dependent on the coating and its maintenance",
    finish: "Primer and paint, or powder coating",
    colour: "Standard colours; custom RAL available",
  }),

  /* ------------------------------------------------------------ R02 GI */
  "galvanized-steel-rolling-shutters": shutterSpec({
    family: "GI Solid Rolling Shutter",
    material: "Galvanized steel",
    grade: "Galvanized steel selected according to the required coating specification",
    coating: "Zinc galvanized protective coating",
    surface: "Galvanized finish; powder coating optional",
    construction: "Single-skin interlocking galvanized steel slats",
    profile: PROFILE_CLASS,
    profileHeight: "Approximately 75–80 mm class",
    thickness: configurable(
      "Slat thickness",
      "0.8–1.0 mm class standard / 1.2 mm heavy duty",
    ),
    size: CUSTOM_SIZE,
    guideMaterial: "GI / MS conventional guide construction; reinforced guide on the heavy duty configuration",
    barrel: "Spring-balanced barrel for conventional manual systems",
    hood: "GI or MS hood; size configuration dependent",
    bottomProfile: "GI or MS bottom rail",
    operation: "Manual, gear operated or motorised",
    corrosion: "Good; galvanized surface protection",
    finish: "Galvanized, or powder coated",
    colour: "Natural galvanized finish, or custom RAL powder coating",
  }),

  /* ----------------------------------------------------- R03 GALVALUME */
  "galvalume-rolling-shutters": shutterSpec({
    family: "Galvalume Rolling Shutter",
    material: "Aluminium-zinc coated steel (Galvalume)",
    grade: "Aluminium-zinc coated steel selected according to the required coating specification",
    coating: "Aluminium-zinc alloy coating",
    surface: "Galvalume metallic finish; powder coating optional",
    construction: "Interlocking formed steel slats",
    profile: PROFILE_CLASS,
    profileHeight: "Approximately 75–80 mm class",
    thickness: configurable("Slat thickness", "1.0 mm class standard / 1.2 mm class heavy duty"),
    size: CUSTOM_SIZE,
    guideMaterial: "Galvanized steel or MS as the configuration requires",
    barrel: "Spring-balanced conventional barrel, or motorised barrel according to configuration",
    shaft: "32 / 40 / 50 mm class for conventional applications; larger engineered systems project specific",
    hood: "Galvalume or GI hood; size configuration dependent",
    bottomProfile: "Galvalume or GI bottom rail",
    operation: "Manual, gear operated or motorised",
    corrosion: "Enhanced corrosion protection compared with conventional painted MS; environment dependent",
    finish: "Galvalume metallic coating, or powder coating",
    colour: "Metallic Galvalume, or custom powder-coated colours",
  }),

  /* ---------------------------------------------------- R04 ALUMINIUM */
  "aluminium-rolling-shutters": shutterSpec({
    family: "Aluminium Rolling Shutter",
    material: "Aluminium",
    grade: "Aluminium alloy selected according to the profile and system",
    coating: "Mill finish, anodised or powder coated",
    surface: "Anodised or powder coated",
    construction: "Roll-formed aluminium, or extruded architectural aluminium on the premium configuration",
    profile: "Profile dependent; single wall, double wall or insulated depending on configuration",
    profileHeight: "Profile dependent",
    thickness: configurable(
      "Slat thickness",
      "Approximately 1.0 mm class standard / 1.2–1.5 mm class heavy duty / extruded configuration dependent",
      "An extruded architectural section is specified by geometry rather than by sheet thickness.",
    ),
    size: CUSTOM_SIZE,
    guideMaterial: "Aluminium or steel depending on the system",
    shaft: CONFIG,
    bracket: "Aluminium or steel according to the system",
    barrel: "Conventional or motorised barrel according to configuration",
    hood: "Aluminium hood or headbox; size configuration dependent",
    bottomProfile: "Aluminium bottom rail",
    operation: "Manual, gear operated where applicable, or motorised",
    corrosion: "High relative corrosion resistance",
    thermal: "Configuration dependent; insulated configurations available",
    acoustic: CONFIG,
    finish: "Mill finish, anodised or powder coated",
    colour: "Natural, anodised, powder coated or custom RAL",
  }),

  /* ---------------------------------------------------- R05 STAINLESS */
  "stainless-steel-rolling-shutters": shutterSpec({
    family: "Stainless Steel Rolling Shutter",
    material: "Stainless steel",
    grade: "SS304 standard; SS316 for coastal and high-corrosion environments",
    coating: "None; corrosion resistance is inherent to the alloy",
    surface: "Brushed, satin or polished",
    construction: "Curved interlocking, or heavy-duty interlocking where applicable",
    profile: CONFIG,
    profileHeight: CONFIG,
    thickness: configurable(
      "Slat thickness",
      "SS304 approximately 0.9–1.2 mm class / SS304 heavy approximately 1.2 mm class / SS316 configuration dependent",
    ),
    size: CUSTOM_SIZE,
    guideMaterial: "Stainless steel preferred for washdown and high-corrosion environments; MS or GI where suitable",
    guideThickness: CONFIG,
    shaft: CONFIG,
    barrel: "Conventional or motorised barrel according to configuration",
    hood: "Stainless hood or headbox; size configuration dependent",
    bottomProfile: "Stainless steel bottom rail",
    operation: "Manual, gear operated or motorised",
    motorRating: "Selected according to curtain load and duty",
    corrosion: "High; SS316 specified for coastal and chemically aggressive environments",
    thermal: "Not rated unless supplied as an insulated configuration",
    acoustic: "Not rated unless specified",
    finish: "Brushed, satin or polished",
    colour: "Natural stainless finish; powder coating only where suitable",
  }),

  /* --------------------------------------------------- R06 PERFORATED */
  "perforated-rolling-shutters": shutterSpec({
    family: "Perforated Rolling Shutter",
    material: "MS / GI / aluminium",
    grade: "Selected according to the material chosen for the installation",
    coating: "Paint, galvanized, powder coating or anodising depending on material",
    surface: "Powder coating or anodising optional",
    construction: "Perforated interlocking slats; reinforced curtain on the heavy-duty configuration",
    profile:
      "Approximately 75–80 mm class for steel-based conventional construction; aluminium profile dependent",
    profileHeight: "Approximately 75–80 mm class for steel construction; aluminium profile dependent",
    thickness: configurable("Slat thickness", "0.8 / 1.0 / 1.2 mm class for metal constructions"),
    size: CUSTOM_SIZE,
    guideMaterial: "MS, GI or aluminium according to the curtain material",
    engagement: "40–60 mm class for conventional steel arrangements",
    barrel: "Conventional or motorised barrel according to configuration",
    hood: "Hood or headbox to suit the material; size configuration dependent",
    bottomProfile: "MS, GI or aluminium bottom profile depending on material",
    operation: "Manual, gear operated or motorised",
    corrosion: "Depends on the material and finish selected",
    wind: CONFIG,
    fire: "Not fire-rated unless separately tested and certified",
    finish: "Paint, galvanized, powder coating or anodising depending on material",
    colour: "Standard colours; custom RAL available",
    extraCurtain: [
      fixed("Perforation pattern", "Fine, standard vision or heavy-duty pattern"),
      configurable("Hole shape", "Pattern dependent"),
      configurable("Hole size", "Pattern dependent"),
      configurable("Hole pitch", "Pattern dependent"),
      configurable(
        "Open area",
        "Pattern dependent",
        "Open area follows from hole shape, size and pitch. There is no universal figure for a perforated curtain.",
      ),
    ],
  }),

  /* ------------------------------------------------------- R07 VISION */
  "vision-window-rolling-shutters": shutterSpec({
    family: "Vision / Window Rolling Shutter",
    material: "MS / GI / aluminium",
    grade: "Selected according to the material chosen for the installation",
    coating: "Paint, powder coating or anodising depending on material",
    surface: "Powder coating or anodising optional",
    construction: "Solid interlocking curtain with defined vision or window sections",
    profile: CONFIG,
    profileHeight: CONFIG,
    thickness: configurable("Slat thickness", "Selected according to the material and profile"),
    size: CUSTOM_SIZE,
    guideMaterial: "Material and size selected according to the curtain",
    barrel: "Conventional or motorised barrel according to configuration",
    hood: "Hood or headbox to suit the material; size configuration dependent",
    bottomProfile: "Bottom rail to suit the curtain material",
    operation: "Manual or gear operated; motorised recommended for larger and mixed curtains",
    corrosion: "Depends on the material and finish selected",
    wind: CONFIG,
    acoustic: CONFIG,
    finish: "Paint, powder coating or anodising depending on material",
    colour: "Standard colours; custom RAL available",
    extraCurtain: [
      configurable("Vision section height", CONFIG),
      configurable("Window / opening pattern", CONFIG),
      fixed("Solid section", "Solid interlocking slats outside the vision sections"),
      fixed("Mixed curtain", "Solid, perforated and vision sections can be combined in one curtain"),
    ],
  }),

  /* ------------------------------------------------------- R08 GRILLE */
  "grille-rolling-shutters": shutterSpec({
    family: "Rolling Grille",
    material: "Steel / aluminium / stainless steel",
    grade: "Steel MS or GI as selected; stainless SS304 or SS316; aluminium profile dependent",
    coating: "Paint, galvanized, powder coating, anodising or brushed stainless depending on material",
    surface: "Powder coating, anodising or brushed stainless depending on material",
    construction: "Link, lattice, open security or bar-and-rod construction",
    profile: "Grille pattern selected according to the application",
    profileHeight: "Pattern dependent",
    thickness: configurable("Bar / rod diameter", "Approximately 6–8 mm class depending on design"),
    slatWeight: "Not applicable to a grille; weight is calculated from the selected construction",
    curtainWeight: "Calculated from the selected grille construction and opening dimensions",
    size: CUSTOM_SIZE,
    guideMaterial: "Steel, aluminium or stainless steel according to the product",
    shaft: CONFIG,
    bracket: CONFIG,
    barrel: "Barrel and bearings specified against duty on the high-cycle configuration",
    hood: "Hood or headbox to suit the construction; size configuration dependent",
    bottomProfile: "Bottom rail appropriate to the grille construction",
    operation: "Manual, gear operated or motorised; high-cycle configuration available",
    corrosion: "Depends on the material and finish selected",
    wind: CONFIG,
    cycle:
      "Product and system dependent; a validated rating is published only for a system actually tested to it",
    finish: "Paint, galvanized, powder coating, anodising or brushed stainless",
    colour: "Standard colours; custom RAL available",
    extraCurtain: [
      configurable("Opening spacing", "Approximately 35–150 mm depending on grille pattern"),
      configurable("Link dimensions", CONFIG),
      configurable("Grille pitch", "Pattern dependent"),
    ],
  }),

  /* ------------------------------------------------ R09 POLYCARBONATE */
  "polycarbonate-rolling-shutters": shutterSpec({
    family: "Transparent Polycarbonate Rolling Shutter",
    material: "UV-resistant polycarbonate",
    grade: "UV-stabilised polycarbonate; grade configuration dependent",
    coating: "Not applicable; UV stabilisation is within the material",
    surface: "UV stabilised",
    construction: "Polycarbonate interlocking sections with aluminium connectors",
    profile: CONFIG,
    profileHeight: CONFIG,
    thickness: configurable(
      "Section thickness",
      "Approximately 2–3 mm standard class / 3–5 mm heavier or custom class",
    ),
    slatWeight: "Calculated from the selected section and connectors",
    curtainWeight: "Calculated from the selected section, connectors and opening dimensions",
    size: "Depends on the selected profile and drive system",
    guideMaterial: "Aluminium, steel or stainless steel depending on configuration",
    barrel: "Motorised barrel; configuration dependent",
    shaft: CONFIG,
    hood: "Aluminium hood or headbox; size configuration dependent",
    bottomProfile: "Aluminium bottom profile",
    bottomSeal: "EPDM or rubber seal where required",
    operation: "Primarily motorised",
    override: "Manual emergency operation available depending on the drive",
    corrosion: "Not applicable to the curtain; hardware specified to the environment",
    fire: "Not rated; no fire classification is assigned without testing",
    thermal: "Not rated unless tested",
    acoustic: "Not rated unless tested",
    wind: CONFIG,
    finish: "Clear or tinted polycarbonate; aluminium components finished to requirement",
    colour: "Clear or tinted",
    extraCurtain: [
      fixed("Connector material", "Aluminium connectors; stainless steel depending on system"),
      fixed("Connecting rod", "Stainless steel or corrosion-resistant hardware where applicable"),
      configurable("Transparency", "High; configuration dependent"),
    ],
  }),

  /* ---------------------------------------------------- R10 INSULATED */
  "insulated-double-wall-rolling-shutters": shutterSpec({
    family: "Insulated Rolling Shutter",
    material: "Aluminium / GI / steel",
    grade: "Face material selected according to the environment and the insulation requirement",
    coating: "Paint, powder coating, galvanized or aluminium finish depending on face material",
    surface: "Powder coating optional",
    construction: "Double-wall insulated profile",
    profile: "Double-wall insulated slat",
    profileHeight: CONFIG,
    thickness: configurable("Overall profile thickness", CONFIG),
    size: CUSTOM_SIZE,
    guideMaterial: "Sealed or reinforced guide according to the profile",
    guideSeal: "Guide seal fitted",
    barrel: "Conventional or motorised barrel according to configuration",
    shaft: CONFIG,
    hood: "Hood or headbox to suit the face material; size configuration dependent",
    bottomProfile: "Insulated bottom rail",
    bottomSeal: "EPDM or rubber seal",
    operation: "Gear operated or motorised",
    motorRating: "Selected according to curtain weight, opening and duty",
    corrosion: "Depends on the face material and finish selected",
    thermal:
      "Configuration dependent; a U-value is published only where actual product test data exists",
    acoustic:
      "Configuration dependent; a tested dB figure is published only where documented",
    fire: "Not automatically fire-rated; a fire rating requires a certified system",
    finish: "Paint, powder coating, galvanized or aluminium finish",
    colour: "Standard colours; custom RAL available",
    extraCurtain: [
      fixed("Core material", "PU / PUF, PIR, mineral wool or another tested insulation"),
      configurable("Core thickness", CONFIG),
    ],
  }),

  /* --------------------------------------------------- R11 INDUSTRIAL */
  "industrial-rolling-shutters": shutterSpec({
    family: "Industrial Rolling Shutter",
    material: "GI / MS",
    grade: "Selected according to the engineered curtain specification",
    coating: "Paint, powder coating or galvanized",
    surface: "Powder coating optional",
    construction: "Heavy-duty interlocking curtain; engineered heavier profile on extra heavy duty",
    profile: "Heavy-duty interlocking; configuration dependent",
    profileHeight: CONFIG,
    thickness: configurable(
      "Slat thickness",
      "Standard approximately 1.0–1.2 mm class / heavy 1.2 mm class / extra heavy engineered heavier profile",
    ),
    size: "Large and custom sizes available subject to engineering",
    area: "Project engineered",
    mullion: "Available",
    guideMaterial: "Reinforced guide",
    guideWidth: "75 / 100 / 150 / 200 mm class depending on opening and system",
    guideDepth: CONFIG,
    guideThickness: "Engineered to the curtain and load",
    engagement: "Configuration dependent; increased engagement for wind exposure",
    windLock: "Available",
    barrel: "Heavy-duty barrel and shaft system",
    shaft: "Heavy-duty steel shaft; diameter selected according to curtain load",
    bracket: "Heavy-duty steel bracket; engineered to the opening",
    hood: "Heavy-duty hood where specified; size configuration dependent",
    bottomProfile: "Reinforced bottom rail",
    operation: "Motorised",
    motorOptions: "Side-mounted, direct drive, indirect drive or industrial operator",
    override: "Emergency manual override, independent of the power supply",
    corrosion: "Depends on the material and finish selected",
    wind: PROJECT,
    cycle: "Duty dependent; high-cycle configurations available",
    safety: "Photocell, safety edge, emergency stop, brake and manual override",
    extraSafety: "Wicket door, vision section and intermediate mullion available as options",
    finish: "Paint, powder coating or galvanized",
    colour: "Standard colours; custom RAL available",
  }),

  /* ------------------------------------------------------ R12 COUNTER */
  "counter-service-rolling-shutters": shutterSpec({
    family: "Counter / Service Window Shutter",
    material: "Aluminium / GI / stainless steel",
    grade: "SS304 class on the stainless configuration; aluminium and GI selected to the application",
    coating: "Anodised, powder coated, galvanized or stainless depending on material",
    surface: "Anodised, powder coated or brushed depending on material",
    construction: "Light interlocking curtain in a compact headbox",
    profile: "Compact interlocking section",
    profileHeight: CONFIG,
    thickness: configurable(
      "Slat thickness",
      "Aluminium approximately 1.0 mm class / GI approximately 0.8–1.0 mm class / stainless SS304 class, configuration dependent",
    ),
    size: "Custom to the opening",
    guideMaterial: "Compact aluminium, GI or stainless guide according to the construction",
    guideWidth: CONFIG,
    guideDepth: CONFIG,
    guideThickness: CONFIG,
    engagement: CONFIG,
    barrel: "Compact barrel within the headbox",
    shaft: CONFIG,
    bracket: CONFIG,
    hood: "Compact headbox; dimensions configuration dependent",
    bottomProfile: "Compact bottom rail with integral lock",
    lock: "Integral lock at the bottom rail",
    operation: "Manual, gear operated or motorised where suitable",
    motorOptions: "Tubular or compact motor where suitable",
    controls: "Push button, key switch or remote where compatible",
    corrosion: "Depends on the material and finish selected",
    finish: "Anodised or powder coated aluminium; galvanized or powder coated GI; brushed or satin stainless",
    colour: "Standard colours; custom RAL on coated finishes",
    mounting: "Face mounted, between jamb or recessed into the joinery",
    headroom: CONFIG,
    sideRoom: CONFIG,
  }),

  /* ---------------------------------------------------- R13 WINDPROOF */
  "windproof-rolling-shutters": shutterSpec({
    family: "Windproof / Storm-Resistant Rolling Shutter",
    material: "MS / GI / Galvalume / aluminium / industrial steel",
    grade: "Selected according to the engineered curtain specification and the environment",
    coating: "Paint, powder coating, galvanized, Galvalume or anodised depending on material",
    surface: "Powder coating optional",
    construction: "Reinforced interlocking curtain; project-engineered on the storm-resistant configuration",
    profile: "Reinforced interlocking",
    profileHeight: CONFIG,
    thickness: configurable(
      "Slat thickness",
      "Windproof standard 1.0 / 1.2 mm class / windproof heavy 1.2 mm class or engineered heavier / storm-resistant project engineered",
    ),
    endLock: "Enhanced end locking",
    size: "Project engineered to the design wind load",
    area: "Project engineered",
    guideMaterial: "Wind-resistant reinforced guide",
    guideWidth: "Engineered to the opening and the design wind pressure",
    guideDepth: "Engineered to the opening and the design wind pressure",
    guideThickness: "Engineered to the curtain and the design wind pressure",
    engagement: "Increased engagement, engineered to the design wind pressure",
    windLock: "Yes; wind-lock system fitted",
    barrel: "Heavy-duty barrel and shaft system",
    shaft: "Selected according to curtain load and design wind pressure",
    bracket: "Engineered to the curtain load and anchoring arrangement",
    hood: "Hood where specified; size configuration dependent",
    bottomProfile: "Reinforced bottom profile",
    operation: "Motorised",
    override: "Manual emergency override",
    corrosion: "Depends on the material and finish selected",
    wind: "Project and design specific; a wind classification is published only where actual tested classification exists",
    cycle: "Duty dependent",
    safety: "Photocell, safety edge, emergency stop and manual override",
    extraSafety:
      "Engineered anchoring and structural fixing designed to the project wind load; design pressure and safety pressure are project specific",
    finish: "Paint, powder coating, galvanized, Galvalume or anodised depending on material",
    colour: "Standard colours; custom RAL available",
  }),

  /* --------------------------------------------------- R14 FIRE RATED */
  /**
   * Listed under Fire & Safety Doors and cross-listed onto Rolling Shutters.
   *
   * The published values below are the ones the company already carries in its
   * own material — profile heights, curtain thickness, finish, sound reduction
   * and type code. Everything that depends on a test or a certificate says so.
   * No certificate number, test laboratory, tested size, fire classification or
   * closing speed is stated, because none has been supplied.
   */
  "fire-rated-rolling-shutters": shutterSpec({
    family: "Fire Rated Rolling Shutter",
    material: "Galvanized steel; certified fire-rated construction",
    grade: "Certified configuration dependent",
    coating: "Galvanized",
    surface: "Silver galvanized; customised where the certified system allows",
    construction: "Galvanized double wall with silicon insulated strip",
    profile: "75 mm / 100 mm",
    profileHeight: "75 mm, 100 mm",
    thickness: fixed("Curtain thickness", "25 mm"),
    slatWeight: "Certified configuration dependent",
    curtainWeight: "Certified configuration dependent",
    size: "Certified configuration dependent",
    area: "Certified configuration dependent",
    mullion: "Certified configuration dependent",
    guideMaterial: "Certified fire-rated guide construction, steel",
    guideWidth: "Certified configuration dependent",
    guideDepth: "Certified configuration dependent",
    guideThickness: "Certified configuration dependent",
    engagement: "Certified configuration dependent",
    windLock: "Not applicable to the certified fire configuration unless specified",
    guideSeal: "Certified configuration dependent",
    barrel: "Certified fire-rated barrel assembly",
    shaft: "Certified configuration dependent",
    bracket: "Certified configuration dependent",
    hood: "Certified configuration dependent",
    bottomProfile: "Certified fire-rated bottom bar",
    bottomBar: "Certified configuration dependent",
    bottomSeal: "Certified configuration dependent",
    lock: "Certified configuration dependent",
    operation: "Electric or manual",
    motorOptions: "Certified configuration dependent",
    motorRating: "Certified configuration dependent",
    override: "Certified release mechanism with manual operation",
    controls:
      "Normal operation by push button or key switch; fire alarm interface available where specified",
    wind: "Not applicable to the certified fire configuration unless separately tested",
    fire:
      "FD 120 / FD 180 / FD 240 according to the supplied certified configuration; the rating applies only to the tested system",
    thermal: "Certificate and test dependent",
    acoustic: "21 dB airborne sound reduction",
    corrosion: "Galvanized surface protection",
    cycle: "Certified configuration dependent",
    speed: "Certified configuration dependent; controlled descent on release",
    safety:
      "Automatic fire-triggered closing where specified, fire alarm interface, certified release mechanism and manual release",
    extraSafety:
      "Test standard, certificate reference and maximum tested opening are stated from the actual certificate for the supplied system",
    antiDrop: "Certified configuration dependent",
    brake: "Certified configuration dependent",
    obstacle: "Certified configuration dependent",
    finish: "Silver galvanized; customised where the certified system allows",
    colour: "Silver or customised",
    substrate: "Structural opening prepared to the certified system requirement",
    extraCurtain: [fixed("Type code", "FR75, FR100")],
  }),
};
