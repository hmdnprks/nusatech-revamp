import type { Dictionary } from "@/i18n/dictionaries/en";

export const contact = {
  email: "admin@nusatechsolution.com",
  area: "Jakarta",
  mapsHref: "https://maps.google.com/?q=Jakarta",
};

// The address split at "@", so narrow screens can wrap it there and not mid-word.
export const emailParts = contact.email.split("@") as [string, string];

export const mailtoHref = ({ subject, body }: Dictionary["email"]) =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

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
  sector: SectorKey;
  tint: Tint;
}[] = [
  {
    key: "cmhs",
    name: "Campus Mental Health Screening",
    client: "Universitas Gadjah Mada",
    short: "UGM",
    sector: "health",
    tint: "sky",
  },
  {
    key: "carbon",
    name: "Carbon Calculator",
    client: "Universitas Brawijaya",
    short: "UB",
    sector: "education",
    tint: "sky",
  },
  {
    key: "rora",
    name: "Rora Virtual Cashier",
    client: "Rora",
    short: "Rora",
    sector: "retail",
    tint: "sun",
  },
  {
    key: "econosphere",
    name: "Econosphere 2",
    client: "Universitas Gadjah Mada",
    short: "UGM",
    sector: "education",
    tint: "sky",
  },
  {
    key: "giving",
    name: "GoInfaq & AbonKita Qurban",
    client: "Inisiatif Zakat Indonesia",
    short: "IZI",
    sector: "social",
    tint: "sun",
  },
  {
    key: "zakatpedia",
    name: "Zakatpedia",
    client: "Inisiatif Zakat Indonesia",
    short: "IZI",
    sector: "social",
    tint: "sun",
  },
];
