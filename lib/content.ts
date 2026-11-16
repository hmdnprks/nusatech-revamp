import type { Dictionary } from "@/i18n/dictionaries/en";

export const contact = {
  phoneDisplay: "+62 877-7733-1908",
  phoneHref: "tel:+6287777331908",
  email: "admin@nusatechsolution.com",
  addressLines: [
    "Jl. Kunir No. 53, Pondok Cabe Udik",
    "Pamulang, Tangerang Selatan, Banten 15418",
  ],
  mapsHref:
    "https://maps.google.com/?q=Jl.+Kunir+No.+53+Pondok+Cabe+Udik+Pamulang",
};

export const whatsappHref = (message: string) =>
  `https://wa.me/6287777331908?text=${encodeURIComponent(message)}`;

export const navIds = [
  "home",
  "services",
  "process",
  "work",
  "contact",
] as const;
export type NavId = (typeof navIds)[number];

// Certification titles are official names and stay in English in every locale.
export const certifications = [
  { org: "AWS", name: "Certified Developer – Associate", count: 2 },
  { org: "Scrum.org", name: "Professional Scrum Developer", count: 2 },
  { org: "Google Cloud", name: "Cloud Digital Leader", count: 1 },
  { org: "Oracle", name: "Oracle Certified Associate", count: 1 },
  { org: "Hacktiv8", name: "Python for Data Science", count: 1 },
];

/** Sky for institutional clients, sun for community and commerce clients. */
export type Tint = "sky" | "sun";
type ProjectKey = keyof Dictionary["work"]["summaries"];
type SectorKey = keyof Dictionary["work"]["sectors"];

export const projects: {
  key: ProjectKey;
  /** Product names stay as-is; descriptive ones are translated via `work.names`. */
  name: string;
  client: string;
  /** Client initials, shown on the thumbnail until real screenshots exist. */
  short: string;
  year: number;
  sector: SectorKey;
  tint: Tint;
}[] = [
  {
    key: "cmhs",
    name: "Campus Mental Health Screening",
    client: "Universitas Gadjah Mada",
    short: "UGM",
    year: 2025,
    sector: "health",
    tint: "sky",
  },
  {
    key: "carbon",
    name: "Carbon Calculator",
    client: "Universitas Brawijaya",
    short: "UB",
    year: 2024,
    sector: "education",
    tint: "sky",
  },
  {
    key: "rora",
    name: "Rora Virtual Cashier",
    client: "Rora",
    short: "Rora",
    year: 2024,
    sector: "retail",
    tint: "sun",
  },
  {
    key: "econosphere",
    name: "Econosphere 2",
    client: "Universitas Gadjah Mada",
    short: "UGM",
    year: 2023,
    sector: "education",
    tint: "sky",
  },
  {
    key: "giving",
    name: "GoInfaq & AbonKita Qurban",
    client: "Inisiatif Zakat Indonesia",
    short: "IZI",
    year: 2021,
    sector: "social",
    tint: "sun",
  },
  {
    key: "zakatpedia",
    name: "Zakatpedia",
    client: "Inisiatif Zakat Indonesia",
    short: "IZI",
    year: 2020,
    sector: "social",
    tint: "sun",
  },
];
