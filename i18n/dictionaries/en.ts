const en = {
  meta: {
    title: "Nusantara Tech Solution | Transforming Ideas into Digital Success",
    description:
      "Custom web, mobile and cloud applications for universities, foundations and growing businesses. IT consulting and application development from Tangerang Selatan, Indonesia.",
    ogDescription:
      "Your trusted partner for IT consulting and custom application development.",
    ogLocale: "en_US",
    ogImageAlt:
      "Nusantara Tech Solution: custom web, mobile and cloud applications",
    ogServices: "Web & mobile apps · Cloud · Dashboards",
  },
  nav: {
    home: "Home",
    services: "Services",
    process: "Process",
    work: "Work",
    contact: "Contact",
    cta: "Discuss your project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    main: "Main",
    language: "Language",
  },
  whatsappMessage:
    "Hello Nusatech, I'd like to discuss building an application.",
  hero: {
    titleLines: [
      { text: "Let us solve your critical" },
      { text: "application development", accent: true },
      { text: "challenges" },
    ],
    body: "Whether you're revamping an existing system or starting something new, our team designs, builds and runs it with you, from first requirement to the cloud.",
    primary: "Discuss your project",
    secondary: "See our work",
    brand: {
      // The company's own tagline, kept in English in every locale.
      title: "Transforming ideas into digital success",
      body: "Systems for universities, foundations and growing businesses since 2020.",
    },
    service: {
      title: "24H Service",
      body: "Support around the clock, at any hour.",
    },
    cloud: {
      title: "Cloud Support",
      checking: "Checking",
      services: [
        { name: "API", ok: "Healthy" },
        { name: "Database", ok: "Healthy" },
        { name: "Backups", ok: "Daily" },
      ],
    },
  },
  services: {
    title: ["What you can", "expect from us"],
    intro:
      "Six commitments behind every project, from the first line of code to long after launch.",
    clean: {
      title: "Clean Code",
      body: "Stable, readable code that is easy to scale and hand over.",
    },
    modern: {
      title: "Modern Development",
      body: "Current frameworks and practices, so your product stays ahead of the curve.",
    },
    value: {
      title: "Value for Money",
      body: "Cost-effective solutions, without compromising on quality.",
    },
    response: {
      title: "Faster Response",
      body: "Quick turnaround on your requests, and fast-loading applications for your users.",
      channel: "Reach the team directly on WhatsApp",
    },
    why: {
      title: "Why Nusatech?",
      body: "We're your partner for IT consulting and custom application development. Collaborators, not just vendors: we start from your goals, build what fits, and stay with you after launch.",
      points: [
        "Client-centric from day one",
        "Built for long-term growth",
        "Ongoing support after go-live",
      ],
    },
    certified: {
      title: "Experienced and certified professionals",
      body: "More than five years of app development experience across the team, with certifications from leading cloud and agile organisations.",
    },
    audience: {
      title: "Who we build for",
      body: "Technology with a positive social impact, for institutions and businesses alike.",
      sectors: [
        { term: "Education", detail: "Universities" },
        { term: "Health", detail: "Screening & care" },
        { term: "Social", detail: "Zakat & giving" },
        { term: "Business", detail: "Retail & SMEs" },
      ],
    },
  },
  process: {
    title: "Our Process",
    intro:
      "A clear path from idea to a running product. Here's what happens to your app along the way.",
    steps: [
      {
        title: "Requirements",
        body: "Workshops with your team to map users, goals and scope, before a single screen is drawn.",
      },
      {
        title: "Development",
        body: "Scrum sprints with regular demos, so you can try the product while it's being built.",
      },
      {
        title: "Testing & integration",
        body: "User acceptance testing, security checks and data migration from your existing systems.",
      },
      {
        title: "Launch & support",
        body: "Cloud deployment, monitoring and maintenance. We stay on after go-live.",
      },
    ],
    card: {
      statuses: {
        draft: "Draft",
        build: "Sprint 3",
        test: "In UAT",
        live: "Live",
      },
      notes: ["Who uses it?", "Must work on mobile", "Export to PDF"],
      sprint: "sprint 3 · demo ready",
      checklist: "Release checklist",
      checks: ["UAT passed", "Security check", "Data migrated"],
      deployed: "Live in the cloud · maintained after launch",
    },
  },
  work: {
    title: "Selected work",
    intro:
      "Systems we've designed and built for universities, foundations and businesses since 2020.",
    sectors: {
      health: "Health",
      education: "Education",
      retail: "Retail",
      social: "Social",
    },
    summaries: {
      cmhs: "Screening questionnaires, counsellor dashboard and PDF reports for students.",
      carbon:
        "Web app that calculates carbon emissions from activity data using standard emission factors.",
      rora: "Virtual cashier with stock-taking and inventory management.",
      econosphere:
        "iOS and Android app for a virtual economy simulation, with a web admin dashboard.",
      giving: "Online giving platforms for infaq and qurban programmes.",
      zakatpedia: "Digital zakat platform for Inisiatif Zakat Indonesia.",
    },
    names: {
      cmhs: "Campus Mental Health Screening",
    },
  },
  contact: {
    title: "Ready to get started?",
    body: "Have a digital idea? Tell us about it, and we'll help shape it into a product your users love.",
    cta: "Chat on WhatsApp",
    phone: "Phone",
    email: "Email",
    office: "Office",
    tagline:
      "Your trusted partner for IT consulting and custom application development.",
  },
};

export type Dictionary = typeof en;
export default en;
