// pages/criminal-defense.tsx
import { ProcessCard } from "@/components/practice/ProcessCard";
import { ServiceCard } from "@/components/practice/ServiceCard";
import { Hero } from "@/components/sections/hero";

import { Check } from "lucide-react";
import Image from "next/image";

export default function CriminalDefensePage() {
  const serviceCards = [
    {
      icon: "/f3.png",
      title: "Federal Criminal Defense",
      items: [
        "Grand jury investigations",
        "Indictments and trials",
        "RICO and multi-defendant conspiracies",
        "White collar crimes",
        "Healthcare fraud",
      ],
    },
    {
      icon: "/f3.png",
      title: "State Criminal Defense",
      items: [
        "Public Integrity & Government Crimes",
        "Organized Crime",
        "Enterprise & Conspiracy",
        "Financial & Corporate Crimes",
        "Complex Felony Charges",
      ],
    },
    {
      icon: "/f3.png",
      title: "Pre-Charge Advocacy",
      items: [
        "Target letters",
        "Witness representation",
        "Immunity negotiations",
        "Proffer sessions",
        "Declination requests",
      ],
    },
  ];

  const processPhases = [
    {
      number: "1",
      title: "Pre-Charge",
      description:
        "Analyzed case details and evidence to assess charge viability, ensuring legal compliance and strategic readiness before proceedings.",
    },
    {
      number: "2",
      title: "Post Charge",
      description:
        "Managed case proceedings and prepared legal arguments after charges were filed. Ensured compliance with court procedures and client representation.",
    },
    {
      number: "3",
      title: "Trial Phase",
      description:
        "Presented arguments, examined witnesses, and ensured effective case representation in court proceedings.",
    },
  ];

  const clientTypes = [
    "Individuals facing state or federal criminal charges",
    "Targets of grand jury investigations",
    "Witnesses requiring counsel during grand jury proceedings",
    "Corporate executives and professionals under investigation",
    "Organizations facing regulatory enforcement actions",
  ];

  return (
    <div className="bg-white">
      <Hero
        title="Criminal Defense"
        subtitle="Federal & State Criminal Defense | Indictments, Grand Juries, Trials, Target/witness representation, pre-charge advocacy, trial, and"
        imageSrc="/p1.png"
        darkBg={false}
      />

      <div className="w-full min-h-screen">
        {/* Overview Section */}
        <div className="py-10 md:py-24 max-w-7xl mx-auto px-3">
          <div>
            <h2 className="font-georgia text-3xl mb-6 font-bold">Overview</h2>
            <p
              className="text-base leading-relaxed max-w-4xl"
              style={{ color: "var(--text-medium)" }}
            >
              Our criminal defense practice represents clients in all types of
              criminal matters, from misdemeanors to complex felonies, in both
              state and federal courts. We handle cases at every stage of the
              criminal process, from pre-charge investigations through trial.
              Our comprehensive approach ensures that clients receive the
              strongest possible defense at every stage of their case. We
              believe in a client-centered approach, keeping you informed and
              involved throughout the process while vigorously defending your
              rights and interests.
            </p>
          </div>
        </div>

        {/* Who We Help Section */}
        <div className="py-10 md:py-40 max-w-7xl mx-auto px-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="font-georgia text-3xl mb-6 font-bold">
                Who We Help
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "var(--text-medium)" }}
              >
                We represent a diverse range of clients, including:
              </p>
              <ul className="space-y-3 ml-2">
                {clientTypes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-medium)" }}
                    >
                      • {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-80">
              <Image
                src="/fbi.png"
                alt="Justice"
                width={395}
                height={333}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Key Matters Section - Now Using Reusable Cards */}
        <div className="mt-28 mb-10 md:my-32 w-full max-w-7xl mx-auto px-3">
          <div>
            <h2 className="font-georgia text-3xl mb-6 font-bold">
              Key Matters We Handle
            </h2>

            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto ">
              {serviceCards.map((card, index) => (
                <ServiceCard
                  key={index}
                  index={index}
                  icon={card.icon}
                  title={card.title}
                  items={card.items}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Defense Process Section - Now Using Reusable Cards */}
        <div
          className="py-24 my-20"
          style={{ backgroundColor: "var(--light-bg-tertiary)" }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-georgia text-3xl mb-4 font-bold">
                Our Defense Process
              </h2>
              <p
                className="text-base max-w-3xl mx-auto"
                style={{ color: "var(--text-medium)" }}
              >
                We provide comprehensive representation at every stage of the
                criminal process.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {processPhases.map((phase, i) => (
                <ProcessCard
                  key={i}
                  number={phase.number}
                  title={phase.title}
                  description={phase.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
