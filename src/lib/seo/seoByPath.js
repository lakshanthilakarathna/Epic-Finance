/**
 * Per-route SEO. Keys are Next.js router paths (no trailing slash except "/").
 * @typedef {{ title: string; description: string; keywords?: string; ogImage?: string }} SeoEntry
 */

/** @type {Record<string, SeoEntry>} */
const SEO_BY_PATH = {
  "/": {
    title: "Vehicle finance New Zealand | Fast car loans & flexible lending",
    description:
      "Epic Finance helps New Zealanders get car, boat, commercial and personal loans with clear steps, quick decisions and support from a local team. Compare options and apply online.",
    keywords:
      "vehicle finance NZ, car loan New Zealand, boat finance, personal loan, Epic Finance",
  },
  "/about": {
    title: "About Epic Finance | Trusted vehicle finance in New Zealand",
    description:
      "Learn how Epic Finance supports New Zealand drivers and borrowers with transparent vehicle finance, fair assessments and a straightforward application process.",
    keywords: "about Epic Finance, vehicle finance company NZ, car finance team",
  },
  "/contact": {
    title: "Contact Epic Finance | Get help with your loan application",
    description:
      "Contact Epic Finance for questions about car finance, loan applications or repayments. Reach our New Zealand team by email or the contact form.",
    keywords: "contact Epic Finance, car finance NZ contact, loan enquiry",
  },
  "/car-finance": {
    title: "Car finance NZ | New & used vehicle loans | Epic Finance",
    description:
      "Finance your next car in New Zealand with Epic Finance: pre-approval, deposit and no-deposit options, and answers to common car loan questions.",
    keywords: "car finance NZ, vehicle loan, used car finance, car loan pre-approval",
  },
  "/boat-motorbike-caravan-loans": {
    title: "Boat, motorbike & caravan finance NZ | Epic Finance",
    description:
      "Fund boats, motorbikes and caravans in New Zealand with tailored recreational vehicle finance. Fast responses and flexible structures for new or used purchases.",
    keywords: "boat finance NZ, motorbike loan, caravan finance, RV loan New Zealand",
  },
  "/commercial-vehicle-loan": {
    title: "Commercial vehicle finance NZ | Vans & work vehicles | Epic Finance",
    description:
      "Finance vans, utes and work vehicles for your business in New Zealand. Epic Finance offers commercial vehicle loans with clear terms and quick turnaround.",
    keywords: "commercial vehicle finance NZ, business van loan, work vehicle finance",
  },
  "/personal-loan": {
    title: "Personal loans NZ | Flexible borrowing | Epic Finance",
    description:
      "Explore personal loan options in New Zealand for planned expenses or consolidation. See how Epic Finance assesses applications and what to expect.",
    keywords: "personal loan NZ, unsecured loan, Epic Finance personal loan",
  },
  "/debt-consolidation-loans": {
    title: "Debt consolidation loans NZ | Simplify repayments | Epic Finance",
    description:
      "Combine eligible debts into one structured repayment with a New Zealand debt consolidation loan. Understand eligibility, costs and next steps with Epic Finance.",
    keywords: "debt consolidation NZ, consolidate loans, repayment simplification",
  },
  "/loan-application": {
    title: "Apply for finance | Online loan application | Epic Finance",
    description:
      "Submit your vehicle or personal loan application online. Upload documents securely and get a response from the Epic Finance team in New Zealand.",
    keywords: "loan application NZ, apply car finance online, Epic Finance apply",
  },
  "/loan-calculator": {
    title: "Loan calculator NZ | Estimate repayments | Epic Finance",
    description:
      "Use the Epic Finance loan calculator to estimate repayments for vehicle or personal loans in New Zealand. Adjust amount, rate and term to explore scenarios.",
    keywords: "loan calculator NZ, repayment estimate, car loan calculator",
  },
  "/privacy-policy": {
    title: "Privacy policy | How Epic Finance uses your data",
    description:
      "Read how Epic Finance collects, uses and protects personal information when you use our website or apply for finance in New Zealand.",
    keywords: "Epic Finance privacy, data policy NZ",
  },
  "/complaints-feedback": {
    title: "Complaints & feedback | Epic Finance",
    description:
      "Submit feedback or a complaint about Epic Finance services. We aim to respond fairly and in line with New Zealand expectations.",
    keywords: "Epic Finance complaint, feedback, disputes",
  },
  "/sitemap": {
    title: "Sitemap | Epic Finance",
    description: "Browse all pages on the Epic Finance website: services, tools, legal and contact.",
    keywords: "sitemap, Epic Finance pages",
  },
};

const DEFAULT_SEO = {
  title: "Epic Finance | Vehicle finance New Zealand",
  description:
    "Fair, flexible vehicle and personal finance for New Zealanders. Apply online with Epic Finance.",
  keywords: "Epic Finance, vehicle finance NZ, car loan New Zealand",
};

/**
 * @param {string} pathname
 * @returns {SeoEntry}
 */
export function getSeoForPath(pathname) {
  const key =
    !pathname || pathname === "/"
      ? "/"
      : pathname.replace(/\/+$/, "") || "/";
  return SEO_BY_PATH[key] ?? DEFAULT_SEO;
}
