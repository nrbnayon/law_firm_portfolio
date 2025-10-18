// pages/criminal-defense.tsx
import { ProcessCard } from "@/components/practice/ProcessCard";
import { ServiceCard } from "@/components/practice/ServiceCard";
import { Hero } from "@/components/sections/hero";

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
        title="Criminal Defense & Investigations"
        subtitle="Federal & State Criminal Defense. Pre-charge investigations, grand jury representation, indictments, target/witness representation, and trial."
        imageSrc="/p1.png"
        darkBg={false}
        height="min-h-[40vh] md:min-h-[50vh]"
        padding="pt-20"
      />

      <div className="w-full min-h-screen">
        {/* Overview Section */}
        <div className="py-10 md:py-24 max-w-7xl mx-auto px-3">
          <h2 className="text-2xl md:text-3xl mb-6 font-bold">Overview</h2>
          <p
            className="text-xl leading-relaxed w-full text-justify"
            style={{ color: "var(--text-medium)" }}
          >
            Our criminal defense practice represents clients in all types of
            criminal matters, from misdemeanors to complex felonies, in both
            state and federal courts. We handle cases at every stage of the
            criminal process, from pre-charge investigations through trial. Our
            comprehensive approach ensures that clients receive the strongest
            possible defense at every stage of their case. We believe in a
            client-centered approach, keeping you informed and involved
            throughout the process while vigorously defending your rights and
            interests.
          </p>
        </div>

        {/* Who We Help Section */}
        <div className="py-10 md:py-20 max-w-7xl mx-auto px-3">
          <div className="flex flex-col-reverse md:flex-row justify-between gap-6 md:gap-10">
            <div className="flex flex-col justify-center flex-1">
              <h2 className="text-3xl mb-6 font-bold">Who We Help</h2>
              <p
                className="text-xl leading-relaxed mb-4"
                style={{ color: "var(--text-medium)" }}
              >
                We represent a diverse range of clients, including:
              </p>
              <ul className="space-y-4 ml-2">
                {clientTypes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="text-xl"
                      style={{ color: "var(--text-medium)" }}
                    >
                      • {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-center md:justify-end flex-shrink-0">
              <Image
                src="/fbi.png"
                alt="Justice"
                width={395}
                height={333}
                className="object-contain w-full max-w-[395px] h-auto"
                quality={100}
              />
            </div>
          </div>
        </div>

        {/* Key Matters Section - Now Using Reusable Cards */}
        <div className="my-5 md:mb-32 md:mt-20  w-full max-w-7xl mx-auto px-3">
          <h2 className="  text-3xl mb-6 md:mb-10 font-bold">
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

        {/* Defense Process Section - Now Using Reusable Cards */}
        <div
          className="py-24 mb-20"
          style={{ backgroundColor: "var(--light-bg-tertiary)" }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl mb-4 font-bold">
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
