const SITEDATA = {
  organizationName: "SecureGlobal",
  defaultLocale: "en",
  locales: ["en", "es"] as const,
  services: [
    { id: "threat-detection", image: "https://placehold.co/600x400.png", dataAiHint: "security network" },
    { id: "vulnerability-assessment", image: "https://placehold.co/600x400.png", dataAiHint: "lock key" },
    { id: "incident-response", image: "https://placehold.co/600x400.png", dataAiHint: "alert shield" },
    { id: "security-consulting", image: "https://placehold.co/600x400.png", dataAiHint: "team meeting" },
    { id: "access-governance", image: "https://placehold.co/600x400.png", dataAiHint: "identity access" },
    { id: "vulnerability-management", image: "https://placehold.co/600x400.png", dataAiHint: "shield system" },
    { id: "security-awareness-training", image: "https://placehold.co/600x400.png", dataAiHint: "training education" },
    { id: "nis2-compliance", image: "https://placehold.co/600x400.png", dataAiHint: "compliance regulation" },
  ],
  contact: {
    phone: "+1-555-123-4567",
    email: "contact@secureglobal.com",
    address: "123 Security Avenue,\nTech City, CA 90210,\nUnited States"
  }
};

export type Locale = typeof SITEDATA.locales[number];

export const siteConfig = SITEDATA;
