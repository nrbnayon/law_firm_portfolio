import { Hero } from "@/components/sections/hero";
import Image from "next/image";

export default function WhiteCollarDefensePage() {
  return (
    <div className="bg-white">
      <Hero
        title="White-Collar Defense & Internal Investigations"
        subtitle="Indictments, grand juries, target/witness representation, and pre-charge advocacy."
        imageSrc="/hero.jpg"
        darkBg={true}
        height="min-h-[40vh] md:min-h-[50vh]"
        padding="pt-20"
      />
      <div className="py-10 md:py-20 max-w-7xl mx-auto px-3">
        <h2 className="text-2xl md:text-3xl mb-6 font-bold">Overview</h2>
        <p className="text-xl leading-relaxed w-full text-justify text-gray">
          Our white-collar practice is built for clients who need quiet strength
          under government scrutiny. We engage early—grand jury targets,
          subjects, and witnesses; subpoenas, CIDs, and search warrants—focusing
          on fact development, privilege protection, and defensible review.
        </p>
      </div>

      {/* Common Investigation Triggers */}
      <section className="max-w-7xl mx-auto px-3">
        <h2 className="text-2xl md:text-3xl font-medium mb-1">
          Common Investigation Triggers
        </h2>
        <p className="text-lg leading-relaxed mb-12 max-w-4xl text-gray">
          Individuals and Organizations engage us for investigations in response
          to:
        </p>

        <div className="space-y-5">
          {[
            {
              icon: "/a2.svg",
              title: "Government Subpoenas or CIDs",
              desc: "Receipt of a grand jury subpoena, civil investigative demand (CID), or other formal request for information from a government agency often necessitates an  investigation to understand potential exposure before responding.",
            },
            {
              icon: "/c1.svg",
              title: "Search Warrants or Raids",
              desc: "After execution of a search warrant, individuals and organizations need to quickly understand what information authorities have seized and the potential legal implications of that evidence.",
            },
            {
              icon: "/a1.svg",
              title: "Whistleblower Allegations",
              desc: "Complaints or external whistleblower allegations require prompt, thorough investigation to assess validity and determine appropriate responses.",
            },
            {
              icon: "/c2.svg",
              title: "Voluntary Self-Disclosure Considerations",
              desc: "Organizations that discover potential legal violations may need an investigation to determine whether voluntary disclosure to authorities is appropriate.",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                    quality={100}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-black font-medium text-xl mb-2">
                  {item.title}
                </h3>
                <p className="text-xl leading-relaxed text-gray-500 text-justify">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FBI */}
      <section className="py-10 md:py-20 max-w-7xl mx-auto px-3">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-6 md:gap-10 bg-[#F7F7F7] p-5">
          <div className="flex flex-col justify-center flex-1">
            <h2 className="text-3xl mb-6 font-bold">
              Our Commitment to Excellence
            </h2>
            <p className="text-xl leading-relaxed mb-4 text-gray text-justify">
              Serious charges and federal inquiries demand rigor and discretion.
              In white-collar matters, we lead interviews, grand jury strategy,
              and subpoena response to keep you ahead of the investigation. You
              get direct candor; diligence; and courtroom-level preparation from
              day one—because that’s how trust is earned.
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-end flex-shrink-0">
            <Image
              src="/fbi1.png"
              alt="Justice"
              width={395}
              height={333}
              className="object-contain w-full max-w-[395px] h-auto"
              quality={100}
            />
          </div>
        </div>
      </section>

      <section className="py-10 max-w-7xl mx-auto px-3 mb-10 md:mb-20">
        <div className="mb-5 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-normal mb-1">
            Internal investigation to Resolution Process
          </h2>
          <p className="text-lg leading-relaxed mb-12 max-w-4xl text-gray">
            Our structured approach helps individuals and organizations move
            from uncertainty to resolution.
          </p>
        </div>

        <div className="space-y-8">
          {[
            {
              number: "1",
              title: "Initial Assessment",
              desc: "We begin with a rapid assessment of the allegations or concerns, helping you understand the potential scope and severity of the issue. This initial phase informs the approach of the full investigation.",
            },
            {
              number: "2",
              title: "Comprehensive Investigation",
              desc: "Our team conducts a thorough investigation, including document review, witness interviews, forensic analysis, and legal research. We work efficiently while maintaining the integrity and confidentiality of the process.",
            },
            {
              number: "3",
              title: "Findings & Recommendations",
              desc: "We provide clear findings regarding the allegations or concerns and the legal implications. Our recommendations include concrete steps for remediation, compliance improvements, and potential self-disclosure considerations.",
            },
            {
              number: "4",
              title: "Resolution Support",
              desc: "When appropriate, we assist with implementing remediation plans, negotiating with regulators or prosecutors, and resolving the matter with minimal disruption to you or your organization.",
            },
          ].map((phase, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full text-2xl font-medium bg-primary-gold text-white">
                {phase.number}
              </div>
              <div className="flex-1">
                <h3 className="text-black text-xl font-medium mb-2">
                  {phase.title}
                </h3>
                <p className="text-lg leading-relaxed text-gray-500 text-justify">
                  {phase.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
