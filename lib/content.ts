export const contact = {
  phoneDisplay: "+62 877-7733-1908",
  phoneHref: "tel:+6287777331908",
  whatsapp:
    "https://wa.me/6287777331908?text=Halo%20Nusatech%2C%20saya%20ingin%20berkonsultasi%20pembuatan%20aplikasi.",
  email: "admin@nusatechsolution.com",
  addressLines: [
    "Jl. Kunir No. 53, Pondok Cabe Udik",
    "Pamulang, Tangerang Selatan, Banten 15418",
  ],
  mapsHref:
    "https://maps.google.com/?q=Jl.+Kunir+No.+53+Pondok+Cabe+Udik+Pamulang",
};

export const nav = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

export const certifications = [
  { org: "AWS", name: "Certified Developer – Associate", count: 2 },
  { org: "Scrum.org", name: "Professional Scrum Developer", count: 2 },
  { org: "Google Cloud", name: "Cloud Digital Leader", count: 1 },
  { org: "Oracle", name: "Oracle Certified Associate", count: 1 },
  { org: "Hacktiv8", name: "Python for Data Science", count: 1 },
];

export const processSteps = [
  {
    key: "requirements",
    title: "Requirements",
    body: "Workshops with your team to map users, goals and scope — before a single screen is drawn.",
  },
  {
    key: "development",
    title: "Development",
    body: "Scrum sprints with regular demos, so you can try the product while it's being built.",
  },
  {
    key: "testing",
    title: "Testing & integration",
    body: "User acceptance testing, security checks and data migration from your existing systems.",
  },
  {
    key: "launch",
    title: "Launch & support",
    body: "Cloud deployment, monitoring and maintenance — we stay on after go-live.",
  },
] as const;

export type Tint = "sky" | "mint" | "sun";

export const projects: {
  name: string;
  client: string;
  year: number;
  sector: string;
  summary: string;
  tint: Tint;
}[] = [
  {
    name: "Campus Mental Health Screening",
    client: "Universitas Gadjah Mada",
    year: 2025,
    sector: "Health",
    summary:
      "Screening questionnaires, counsellor dashboard and PDF reports for students.",
    tint: "sky",
  },
  {
    name: "Carbon Calculator",
    client: "Universitas Brawijaya",
    year: 2024,
    sector: "Education",
    summary:
      "Web app that calculates carbon emissions from activity data using standard emission factors.",
    tint: "mint",
  },
  {
    name: "Rora Virtual Cashier",
    client: "Rora",
    year: 2024,
    sector: "Retail",
    summary: "Virtual cashier with stock-taking and inventory management.",
    tint: "sun",
  },
  {
    name: "Econosphere 2",
    client: "Universitas Gadjah Mada",
    year: 2023,
    sector: "Education",
    summary:
      "iOS and Android app for a virtual economy simulation, with a web admin dashboard.",
    tint: "mint",
  },
  {
    name: "GoInfaq & AbonKita Qurban",
    client: "Inisiatif Zakat Indonesia",
    year: 2021,
    sector: "Social",
    summary: "Online giving platforms for infaq and qurban programmes.",
    tint: "sun",
  },
  {
    name: "Zakatpedia",
    client: "Inisiatif Zakat Indonesia",
    year: 2020,
    sector: "Social",
    summary: "Digital zakat platform for Inisiatif Zakat Indonesia.",
    tint: "sky",
  },
];
