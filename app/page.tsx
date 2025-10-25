import About from "@/components/sections/About";
import { Hero } from "@/components/sections/hero";
import OurApproach from "@/components/sections/OurApproach";
import Services from "@/components/sections/Services";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Law Firm Portfolio Management",
  description:
    "Professional portfolio management for law firms and legal practices. Efficiently manage cases, clients, documents, billing, and deadlines. Enhance your legal practice with streamlined workflows and comprehensive case tracking.",
  tags: [
    "law firm software",
    "legal portfolio management",
    "case management system",
    "attorney case tracking",
    "legal document management",
    "client relationship management",
    "legal practice software",
    "law office management",
    "legal billing software",
    "court deadline tracking",
  ],
  type: "website",
});

export default function Home() {
  return (
    <div>
      <div className="relative">
        <Hero
          title="Criminal Defense, White-Collar, & Internal Investigations"
          subtitle="Disciplined federal and state criminal defense, white-collar matters, and internal investigations--quiet, effective, trial-ready."
          showCTA
        />
        <About />
        <Services />
        <OurApproach />
      </div>
    </div>
  );
}
