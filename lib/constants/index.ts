export const APP_CONFIG = {
  name: "Law Firm Portfolio",
  description:
    "Professional law firm portfolio management system. Streamline case management, client relations, and legal document organization.",
  version: "1.0.0",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  firm: {
    name: process.env.NEXT_PUBLIC_FIRM_NAME || "Law Firm Portfolio",
    phone: process.env.NEXT_PUBLIC_FIRM_PHONE,
    email: process.env.NEXT_PUBLIC_FIRM_EMAIL,
    address: process.env.NEXT_PUBLIC_FIRM_ADDRESS,
  },
} as const;
