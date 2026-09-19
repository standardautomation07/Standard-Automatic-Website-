/**
 * Trusted clients & project partners — the organisations Standard Automatic
 * Solutions has delivered or is delivering projects with.
 *
 * SOURCE OF TRUTH: "Client List. 2026 MARCH.pdf" (3 pages, 45 completed
 * rows + 9 ongoing rows, row 46 of the completed table is blank). Every
 * organisation in that document is here, consolidated one record per
 * organisation. `sourceNames` keeps the exact spellings used in the PDF;
 * `projects[].site` keeps the exact site text. Locations are normalised only
 * where the spelling clearly refers to the same place; anything ambiguous is
 * flagged in `reviewNotes` rather than silently corrected.
 *
 * The PDF column is "Client name" but the organisations include end users,
 * contractors, developers and EPC / engineering companies, so the site uses
 * the neutral "clients & project partners" wording throughout.
 *
 * Product types are preserved per project for future project pages; the
 * showcase grid deliberately does not display them.
 */

export type ProjectStatus = "completed" | "ongoing";

export interface ClientProject {
  /** Serial number in the PDF table (completed 1–45, ongoing 1–9). */
  ref: string;
  projectName: string;
  /** Exact site text from the PDF. */
  site: string;
  /** Normalised display location. */
  location: string;
  productType: string;
  status: ProjectStatus;
}

export type LogoStatus = "verified" | "needs-review" | "unavailable";

export interface ClientOrganisation {
  id: string;
  displayName: string;
  /** Every spelling of the organisation used in the PDF. */
  sourceNames: string[];
  /** Path under /public, or null when only an initials placeholder exists. */
  logo: string | null;
  /** Short initials used when no logo is available. */
  initials: string;
  /** Where the logo file was obtained. */
  logoSource: string | null;
  logoStatus: LogoStatus;
  /** True when the supplied logo is a white / knockout version that needs a dark well. */
  logoOnDark?: boolean;
  officialWebsite: string | null;
  projects: ClientProject[];
  /** Data-quality notes for manual review; empty when nothing is flagged. */
  reviewNotes: string[];
}

const P = (
  ref: string,
  projectName: string,
  site: string,
  location: string,
  productType: string,
  status: ProjectStatus,
): ClientProject => ({ ref, projectName, site, location, productType, status });

export const clientOrganisations: ClientOrganisation[] = [
  {
    id: "urc-construction",
    displayName: "URC Construction (P) Ltd",
    sourceNames: ["URC Construction (P) Ltd"],
    logo: "/images/clients/urc-construction.png",
    initials: "URC",
    logoSource: "https://www.urcindia.com/img/new_logo.svg (official website header)",
    logoStatus: "verified",
    officialWebsite: "https://www.urcindia.com",
    projects: [
      P("C1", "Pune Metro", "Kothrud Depo", "Kothrud Depot, Pune", "Motorized Rolling Shutter", "completed"),
      P("C6", "Pune Metro", "Shivaji Nagar", "Shivaji Nagar, Pune", "Motorized Rolling Shutter", "completed"),
      P("C10", "Pune Metro", "Kothrud Depo", "Kothrud Depot, Pune", "Automatic Sliding Gate", "completed"),
      P("C11", "Pune Metro", "Shivaji Nagar", "Shivaji Nagar, Pune", "Motorized Rolling Shutter", "completed"),
      P("C26", "Pune Metro", "pune", "Pune", "Motorized Rolling Shutter", "completed"),
    ],
    reviewNotes: [],
  },
  {
    id: "godrej-boyce",
    displayName: "Godrej & Boyce Mfg Co Ltd",
    sourceNames: ["Godrej & Boyce Mfg Co Ltd"],
    logo: "/images/clients/godrej-boyce.png",
    initials: "G&B",
    logoSource: "https://www.godrej.com/resources/logo.png (Godrej group official website)",
    logoStatus: "verified",
    officialWebsite: "https://www.godrej.com",
    projects: [
      P("C2", "Factory Gate", "Pirangut", "Pirangut, Pune", "Automatic Sliding Gate", "completed"),
      P("C8", "Factory plant", "Shirwal", "Shirwal, Satara", "Motorized Rolling Shutter", "completed"),
      P("C28", "R&D Plant", "PIRANGUT", "Pirangut, Pune", "Sliding Gate", "completed"),
    ],
    reviewNotes: [],
  },
  {
    id: "ador-powertron",
    displayName: "Ador Powertron",
    sourceNames: ["Ador Powertron"],
    logo: "/images/clients/ador-powertron.png",
    initials: "AP",
    logoSource: "https://adorpowertron.com (official website header image)",
    logoStatus: "verified",
    officialWebsite: "https://adorpowertron.com",
    projects: [
      P("C3", "Factory plant", "chinchawad Pine", "Chinchwad, Pune", "High Speed Door", "completed"),
    ],
    reviewNotes: ['Site given as "chinchawad Pine" in the PDF; read as Chinchwad, Pune.'],
  },
  {
    id: "suroj-buildcon",
    displayName: "Suroj Buildcon Pvt Ltd",
    sourceNames: ["SUROJ BUILDCON PVT LTD"],
    logo: "/images/clients/suroj-buildcon.svg",
    initials: "SB",
    logoSource: "https://www.suroj.in/img/logo-suroj.svg (official website)",
    logoStatus: "verified",
    officialWebsite: "https://www.suroj.in",
    projects: [
      P("C4", "ITC Project", "Nadiad Gujrat", "Nadiad, Gujarat", "Motorized Rolling Shutter", "completed"),
      P("C30", "ITC Project", "Nadiad Gujrat", "Nadiad, Gujarat", "Motorised Rolling Shutter", "completed"),
      P("C31", "Asian Paints", "GUJRAT", "Gujarat", "Motorised Rolling Shutter", "completed"),
    ],
    reviewNotes: [],
  },
  {
    id: "precast-india",
    displayName: "Precast India Infrastructures Pvt Ltd",
    sourceNames: ["PRECAST INDIA INFRASTRUCTURES PVT.LTD."],
    logo: null,
    initials: "PII",
    logoSource: null,
    logoStatus: "needs-review",
    officialWebsite: "https://www.precastindia.co.in",
    projects: [
      P("C5", "WILO-Mather & Platt Pumps", "KHANDALA SATARA", "Khandala, Satara", "Motorized Rolling Shutter", "completed"),
      P("C12", "Chitale Food", "Sangali", "Sangli", "Motorized Rolling Shutter", "completed"),
      P("C13", "Nxtra Project", "HINJEWADI Pune", "Hinjewadi, Pune", "Motorised Fire Rated Rolling Shutter", "completed"),
      P("C22", "Nxtra Project", "HINJEWADI Pune", "Hinjewadi, Pune", "Fire Door", "completed"),
    ],
    reviewNotes: ["Official website found but it carries no separable logo file; initials placeholder until a logo is supplied."],
  },
  {
    id: "godrej-industries",
    displayName: "Godrej Industries Ltd",
    sourceNames: ["GODREJ INDUSTRIES LTD"],
    logo: "/images/clients/godrej-industries.png",
    initials: "GI",
    logoSource: "https://www.godrej.com/resources/logo.png (Godrej group master logo; godrejindustries.com blocks automated access)",
    logoStatus: "needs-review",
    officialWebsite: "https://www.godrejindustries.com",
    projects: [
      P("C7", "Factory plant", "Ambernath", "Ambernath, Thane", "High Speed Door", "completed"),
    ],
    reviewNotes: ["Godrej group master logo used; confirm Godrej Industries does not require a distinct lock-up."],
  },
  {
    id: "abb-india",
    displayName: "ABB India Limited",
    sourceNames: ["ABB India Limited"],
    logo: "/images/clients/abb-india.svg",
    initials: "ABB",
    logoSource: "Wikimedia Commons ABB_logo.svg (official wordmark; abb.com serves the logo inline only)",
    logoStatus: "verified",
    officialWebsite: "https://new.abb.com/indian-subcontinent",
    projects: [
      P("C9", "Traction Motors", "Vadodara Gujrat", "Vadodara, Gujarat", "High Speed Door", "completed"),
    ],
    reviewNotes: [],
  },
  {
    id: "xerbia-developers",
    displayName: "Xerbia Developers",
    sourceNames: ["Xerbia Developers"],
    logo: null,
    initials: "XD",
    logoSource: null,
    logoStatus: "unavailable",
    officialWebsite: null,
    projects: [
      P("C14", "Wangini", "Karjat", "Karjat, Raigad", "Rolling Shutter", "completed"),
    ],
    reviewNotes: ["No official website or logo could be verified (xerbia.com now belongs to an unrelated business)."],
  },
  {
    id: "bhate-raje",
    displayName: "Bhate & Raje Construction Company Pvt Ltd",
    sourceNames: ["Bhate & raje Construction Company Ltd"],
    logo: "/images/clients/bhate-raje.png",
    initials: "B&R",
    logoSource: "https://bhateraje.com/assets/img/logo/bhate-and-raje.png (official website)",
    logoStatus: "verified",
    officialWebsite: "https://bhateraje.com",
    projects: [
      P("C15", "Pune Metro", "pune", "Pune", "Motorized Rolling Shutter", "completed"),
      P("C20", "Tetra Pak", "CHAKAN PUNE", "Chakan, Pune", "Aluminium Rolling Shutter", "completed"),
    ],
    reviewNotes: [],
  },
  {
    id: "sambhav-building-systems",
    displayName: "Sambhav Building Systems Pvt Ltd",
    sourceNames: ["M/s SAMBHAV BUILDING SYSTEMS PVT LTD"],
    logo: null,
    initials: "SBS",
    logoSource: null,
    logoStatus: "unavailable",
    officialWebsite: null,
    projects: [
      P("C16", "Air Force Station", "Sarwasa  UP", "Sarsawa, Uttar Pradesh", "Motorized Rolling Shutter", "completed"),
    ],
    reviewNotes: [
      "No official website or logo could be found.",
      'Site given as "Sarwasa UP"; read as Air Force Station Sarsawa, Uttar Pradesh — confirm.',
    ],
  },
  {
    id: "sula-vineyards",
    displayName: "Sula Vineyards",
    sourceNames: ["Sula Vineyards"],
    logo: "/images/clients/sula-vineyards.png",
    initials: "SV",
    logoSource: "https://sulavineyards.com/images/media2/home-page/sula-logo-main.png (official website)",
    logoStatus: "verified",
    officialWebsite: "https://sulavineyards.com",
    projects: [
      P("C17", "Factory plant", "Nashik", "Nashik", "High Speed Door", "completed"),
    ],
    reviewNotes: [],
  },
  {
    id: "amul-kaira",
    displayName: "Kaira District Co-operative Milk Producers' Union Ltd (Amul Dairy)",
    sourceNames: ["Kaira District Co-operative Milk Producers' Union Limited. Amul dairy"],
    logo: "/images/clients/amul-kaira.png",
    initials: "AMUL",
    logoSource: "https://www.amuldairy.com/assets/img/Amul_Logo.png (Kaira Union / Amul Dairy official website)",
    logoStatus: "verified",
    officialWebsite: "https://www.amuldairy.com",
    projects: [
      P("C18", "Amul factory plant", "Anand", "Anand, Gujarat", "High Speed Door", "completed"),
    ],
    reviewNotes: [],
  },
  {
    id: "itd-cementation",
    displayName: "ITD Cementation India Ltd",
    sourceNames: ["ITD CEMENTATION IND LTD", "ITD CEMENTATION"],
    logo: null,
    initials: "ITD",
    logoSource: null,
    logoStatus: "needs-review",
    officialWebsite: "https://www.itdcem.co.in",
    projects: [
      P("C19", "Pune Airport", "PUNE", "Pune", "Gear Rolling Shutter", "completed"),
      P("O3", "Aerospace Museum, MES, Palam, Delhi", "DELHI", "Palam, Delhi", "Gear Operated Grill Rolling Shutter", "ongoing"),
    ],
    reviewNotes: [
      "itdcem.co.in now redirects to cemindia.co.in (rebranded Cemindia); the PDF uses the ITD Cementation name, so no logo is shown until the correct mark is confirmed.",
    ],
  },
  {
    id: "suvijay-buildcon",
    displayName: "Suvijay Buildcon",
    sourceNames: ["SUVIJIAY BUILDCON"],
    logo: null,
    initials: "SB",
    logoSource: null,
    logoStatus: "unavailable",
    officialWebsite: null,
    projects: [
      P("C21", "FIAT", "Pune", "Pune", "High Speed Door", "completed"),
    ],
    reviewNotes: ['PDF spelling "SUVIJIAY BUILDCON" looks like a typo; displayed as Suvijay Buildcon — confirm. No website or logo found.'],
  },
  {
    id: "gaurav-engineers",
    displayName: "Gaurav Engineers",
    sourceNames: ["Gaurav Engineers"],
    logo: null,
    initials: "GE",
    logoSource: null,
    logoStatus: "unavailable",
    officialWebsite: null,
    projects: [
      P("C23", "Kirloskar Factory Plant", "kirloska wadi", "Kirloskarwadi, Sangli", "Rolling Shutter", "completed"),
    ],
    reviewNotes: ["No official website or logo could be found."],
  },
  {
    id: "sms-india",
    displayName: "SMS India Pvt Ltd",
    sourceNames: ["SMS INDIA PVT LTD"],
    logo: "/images/clients/sms-india.svg",
    initials: "SMS",
    logoSource: "https://www.sms-group.com (SMS group official website header asset)",
    logoStatus: "needs-review",
    officialWebsite: "https://www.sms-group.com",
    projects: [
      P("C24", "Rail Coach Factory", "LUCKNOW", "Lucknow, Uttar Pradesh", "Rolling Shutter", "completed"),
    ],
    reviewNotes: ["SMS group logo used on the assumption SMS India Pvt Ltd is the SMS group Indian subsidiary — confirm."],
  },
  {
    id: "lt-construction",
    displayName: "Larsen & Toubro Limited, Construction",
    sourceNames: ["Larsen & Toubro Limited, Construction"],
    logo: "/images/clients/lt-construction.svg",
    initials: "L&T",
    logoSource: "https://www.larsentoubro.com (official website header SVG, white version)",
    logoStatus: "verified",
    logoOnDark: true,
    officialWebsite: "https://www.lntecc.com",
    projects: [
      P("C25", "NMDC Slurry Pump House, Bacheli", "BACHELI COMPLEX, DANTEWADA,", "Bacheli, Dantewada, Chhattisgarh", "Motorized Rolling Shutter", "completed"),
      P("C27", "Ram Mandir Ayodhya / Prayagraj", "Utter pradesh", "Ayodhya–Prayagraj, Uttar Pradesh", "Motorized Rolling Shutter", "completed"),
      P("C35", "Vizag", "Vizag", "Visakhapatnam", "Gear Rolling Shutter", "completed"),
      P("C36", "BARC", "TARAPUR", "Tarapur", "Motorised Rolling Shutter", "completed"),
      P("C43", "Ram Mandir Ayodhya / Prayagraj", "Utter pradesh", "Ayodhya–Prayagraj, Uttar Pradesh", "Aluminium Rolling Shutter", "completed"),
      P("O1", "Project SP-III, c/o NMDC Ltd", "KIRANDUL Dantewada Chhattisgarh", "Kirandul, Dantewada, Chhattisgarh", "Rolling Shutter", "ongoing"),
    ],
    reviewNotes: [
      'Rows C27/C43 give the project as "Ram Mandir Ayodhya Prayagraj" with site "Utter pradesh"; the exact site (Ayodhya or Prayagraj) is ambiguous.',
      "Only a white logo is published by L&T; it is shown on a dark well rather than recoloured.",
    ],
  },
  {
    id: "manipal-energy-infra",
    displayName: "Manipal Energy & Infra Pvt Ltd",
    sourceNames: ["MANIPAL ENERGY & INFRA PVT TD"],
    logo: "/images/clients/manipal-energy-infra.png",
    initials: "MEI",
    logoSource: "https://manipalenergy.in/images/meil_logo.png (official website)",
    logoStatus: "verified",
    officialWebsite: "https://manipalenergy.in",
    projects: [
      P("C29", "NMDC Bacheli", "CHATTISAGARGH", "Bacheli, Chhattisgarh", "Motorised Rolling Shutter", "completed"),
    ],
    reviewNotes: [],
  },
  {
    id: "crescon-projects",
    displayName: "Crescon Projects & Services Pvt Ltd",
    sourceNames: ["CRESCON PROJECTS & SERVICES PVT LTD"],
    logo: "/images/clients/crescon-projects.png",
    initials: "CPS",
    logoSource: "https://cresconprojects.com/assets/img/logo.png (official website)",
    logoStatus: "verified",
    officialWebsite: "https://cresconprojects.com",
    projects: [
      P("C32", "ITC Factory Plant", "KOLKATA WEST BENGAL", "Kolkata, West Bengal", "Rolling Shutter", "completed"),
    ],
    reviewNotes: [],
  },
  {
    id: "asmita-engineering",
    displayName: "Asmita Engineering Equipments",
    sourceNames: ["ASMITA ENGINEERING EUIPMENTS"],
    logo: null,
    initials: "AE",
    logoSource: null,
    logoStatus: "unavailable",
    officialWebsite: null,
    projects: [
      P("C33", "Pune", "PUNE", "Pune", "Rolling Shutter", "completed"),
    ],
    reviewNotes: ['PDF spelling "EUIPMENTS" corrected to Equipments. No website or logo found.'],
  },
  {
    id: "raheja-universal",
    displayName: "Raheja Universal Ltd",
    sourceNames: ["RAHEJA UNIVERSAL LTD"],
    logo: "/images/clients/raheja-universal.png",
    initials: "RU",
    logoSource: "https://www.rahejauniversal.com/images/logo.png (official website)",
    logoStatus: "verified",
    officialWebsite: "https://www.rahejauniversal.com",
    projects: [
      P("C34", "Tesla Park 2", "MUMBAI", "Mumbai", "Motorised Rolling Shutter", "completed"),
    ],
    reviewNotes: [],
  },
  {
    id: "vtp-realty",
    displayName: "VTP Realty",
    sourceNames: ["VTP REALTY - RISING WELWORTH", "VTP REALTY"],
    logo: "/images/clients/vtp-realty.png",
    initials: "VTP",
    logoSource: "https://www.vtprealty.in/images/footer/new-vtp-logo.png (official website)",
    logoStatus: "verified",
    officialWebsite: "https://www.vtprealty.in",
    projects: [
      P("C37", "Altitude by VTP Group", "PUNE", "Pune", "Motorised Rolling Shutter", "completed"),
      P("C44", "VTP Altair", "pune", "Pune", "Rolling Shutter", "completed"),
      P("C45", "VTP Bellissimo", "pune", "Pune", "Rolling Shutter", "completed"),
      P("O9", "VTP Sierra", "PASHAN", "Pashan, Pune", "Rolling Shutter", "ongoing"),
    ],
    reviewNotes: ['"VTP REALTY - RISING WELWORTH" (row C37) consolidated under VTP Realty as a project entity of the same developer — confirm.'],
  },
  {
    id: "rr-construction",
    displayName: "R R Construction",
    sourceNames: ["R R CONSTRUCTION"],
    logo: null,
    initials: "RR",
    logoSource: null,
    logoStatus: "unavailable",
    officialWebsite: null,
    projects: [
      P("C38", "Toyo Factory, Khalapur", "MUMBAI", "Khalapur (Mumbai)", "Motorised Rolling Shutter", "completed"),
    ],
    reviewNotes: [
      "Name too generic to identify an official website or logo.",
      'Project "Toyo Factory, Khalapur" with site "MUMBAI" — Khalapur is in Raigad district; both preserved.',
    ],
  },
  {
    id: "loreal-india",
    displayName: "L'Oréal India",
    sourceNames: ["LOREAL INDIA"],
    logo: "/images/clients/loreal-india.svg",
    initials: "L'O",
    logoSource: "Wikimedia Commons L'Oréal_logo.svg (official wordmark)",
    logoStatus: "verified",
    officialWebsite: "https://www.loreal.com/en/india/",
    projects: [
      P("C39", "Chakan", "PUNE", "Chakan, Pune", "Fire Shutter", "completed"),
    ],
    reviewNotes: [],
  },
  {
    id: "spg-infraprojects",
    displayName: "SPG Infraprojects Pvt Ltd",
    sourceNames: ["SPG INFRAPROJECTS PVT LTD"],
    logo: "/images/clients/spg-infraprojects.png",
    initials: "SPG",
    logoSource: "https://spginfra.com (official website header)",
    logoStatus: "verified",
    officialWebsite: "https://spginfra.com",
    projects: [
      P("C40", "Income Tax Building, Nariman Point", "MUMBAI", "Nariman Point, Mumbai", "SS Rolling Shutter", "completed"),
    ],
    reviewNotes: [],
  },
  {
    id: "cbre-south-asia",
    displayName: "CBRE South Asia",
    sourceNames: ["CBRE SOUTH ASIA"],
    logo: "/images/clients/cbre-south-asia.svg",
    initials: "CBRE",
    logoSource: "Wikimedia Commons CBRE_Group_logo.svg (official wordmark; cbre.co.in serves the logo inline only)",
    logoStatus: "verified",
    officialWebsite: "https://www.cbre.co.in",
    projects: [
      P("C41", "DLF Cybercity", "CHENNAI", "Chennai", "Retractable Gates", "completed"),
      P("O4", "DLF Cybercity", "CHENNAI", "Chennai", "Retractable Gates", "ongoing"),
    ],
    reviewNotes: [],
  },
  {
    id: "safe-lifters",
    displayName: "Safe Lifters Pvt Ltd",
    sourceNames: ["Safe Lifters Pvt Ltd"],
    logo: "/images/clients/safe-lifters.svg",
    initials: "SL",
    logoSource: "https://safelifters.com/wp-content/uploads/2024/07/safe-logo-final.svg (official website)",
    logoStatus: "verified",
    officialWebsite: "https://safelifters.com",
    projects: [
      P("C42", "Hadapsar, Pune", "PUNE", "Hadapsar, Pune", "Rolling Shutter", "completed"),
    ],
    reviewNotes: [],
  },
  {
    id: "tata-construction",
    displayName: "Tata Construction Ltd",
    sourceNames: ["TATA CONSTRUCTION LTD"],
    logo: null,
    initials: "TC",
    logoSource: null,
    logoStatus: "needs-review",
    officialWebsite: null,
    projects: [
      P("O2", "BARC", "TARAPUR", "Tarapur", "Motorised Rolling Shutter", "ongoing"),
    ],
    reviewNotes: ['"TATA CONSTRUCTION LTD" does not match a registered Tata company name (possibly Tata Projects Ltd); no logo assigned until confirmed.'],
  },
  {
    id: "shapoorji-pallonji",
    displayName: "Shapoorji Pallonji And Company Pvt Ltd",
    sourceNames: ["Shapoorji Pallonji And Company Private Limited"],
    logo: "/images/clients/shapoorji-pallonji.svg",
    initials: "SP",
    logoSource: "https://www.shapoorjipallonji.com/assets/vectors/icons/icon_splogo_blue.svg (official website)",
    logoStatus: "verified",
    officialWebsite: "https://www.shapoorjipallonji.com",
    projects: [
      P("O5", "Lower Parel", "MUMBAI", "Lower Parel, Mumbai", "Fire Rated Door", "ongoing"),
    ],
    reviewNotes: [],
  },
  {
    id: "milecon-engineering",
    displayName: "Milecon Engineering Pvt Ltd",
    sourceNames: ["MILECON ENGINEERING PRIVATE LIMITED"],
    logo: "/images/clients/milecon-engineering.png",
    initials: "ME",
    logoSource: "https://milecon.in/images/logo.png (official website)",
    logoStatus: "verified",
    officialWebsite: "https://milecon.in",
    projects: [
      P("O6", "Tata Motors Plant, Sanand", "GUJRAT", "Sanand, Gujarat", "High Speed Door", "ongoing"),
    ],
    reviewNotes: [],
  },
  {
    id: "amara-raja-infra",
    displayName: "Amara Raja Infra Pvt Ltd",
    sourceNames: ["Amara Raja Infra Private Limited"],
    logo: "/images/clients/amara-raja-infra.png",
    initials: "ARI",
    logoSource: "https://amararajainfra.com/wp-content/uploads/2023/05/thumbnail_AR_Infra_logo.png (official website)",
    logoStatus: "verified",
    officialWebsite: "https://www.amararajainfra.com",
    projects: [
      P("O7", "AMNS Plant", "GUJRAT", "Gujarat", "Rolling Shutter", "ongoing"),
    ],
    reviewNotes: [],
  },
  {
    id: "inditech-valves",
    displayName: "Inditech Valves Ltd",
    sourceNames: ["INDITECH VALVES LTD"],
    logo: "/images/clients/inditech-valves.png",
    initials: "IV",
    logoSource: "https://www.inditechvalves.com/wp-content/uploads/2024/02/IndiTech-Logo-svg.svg (official website; rasterised)",
    logoStatus: "verified",
    officialWebsite: "https://www.inditechvalves.com",
    projects: [
      P("O8", "Alandi Plant, Pune", "pune", "Alandi, Pune", "Sliding Gate", "ongoing"),
    ],
    reviewNotes: [],
  },
];

/* ------------------------------------------------------------------ *
 * Derived helpers — everything the UI and the audit need is computed
 * from the records above so the numbers can never drift from the data.
 * ------------------------------------------------------------------ */

export function organisationLocations(org: ClientOrganisation): string[] {
  return Array.from(new Set(org.projects.map((p) => p.location)));
}

export function organisationCounts(org: ClientOrganisation) {
  const completed = org.projects.filter((p) => p.status === "completed").length;
  const ongoing = org.projects.length - completed;
  return { completed, ongoing };
}

export const clientStats = (() => {
  const projects = clientOrganisations.flatMap((o) => o.projects);
  const locations = new Set(projects.map((p) => p.location));
  return {
    organisations: clientOrganisations.length,
    organisationsWithCompleted: clientOrganisations.filter((o) => organisationCounts(o).completed > 0).length,
    organisationsWithOngoing: clientOrganisations.filter((o) => organisationCounts(o).ongoing > 0).length,
    projects: projects.length,
    completedProjects: projects.filter((p) => p.status === "completed").length,
    ongoingProjects: projects.filter((p) => p.status === "ongoing").length,
    locations: locations.size,
    verifiedLogos: clientOrganisations.filter((o) => o.logoStatus === "verified").length,
    logosNeedingReview: clientOrganisations.filter((o) => o.logoStatus !== "verified").length,
  };
})();
