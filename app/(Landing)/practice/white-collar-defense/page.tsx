import { Hero } from "@/components/sections/hero"
import { FileText, Search, AlertCircle, FileCheck } from "lucide-react"
import Image from "next/image"

export default function WhiteCollarDefensePage() {
  return (
    <div style={{ backgroundColor: "var(--light-bg)" }}>
      <Hero
        title="White Collar Defense"
        subtitle="Federal & State Criminal Defense | Indictments, Grand Juries, Trials, Target/witness representation, pre-charge advocacy, trial."
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl mb-6" style={{ color: "var(--text-dark)" }}>
            Overview
          </h2>
          <p className="text-base leading-relaxed max-w-4xl" style={{ color: "var(--text-medium)" }}>
            Our investigations practice helps organizations respond effectively to allegations of wrongdoing, compliance
            failures, or in anticipation of government scrutiny. We conduct thorough, independent investigations that
            allow clients to understand their legal exposure and make informed decisions about remediation and
            disclosure. We specialize in conducting independent inquiries, protecting attorney-client privilege,
            developing remediation strategies, and negotiating with enforcement agencies. Our approach ensures that
            organizations can address issues thoroughly while minimizing legal exposure.
          </p>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "var(--light-bg-tertiary)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl mb-8" style={{ color: "var(--text-dark)" }}>
            Common Investigation Triggers
          </h2>
          <p className="text-base leading-relaxed mb-12 max-w-4xl" style={{ color: "var(--text-medium)" }}>
            Organizations typically engage us for investigations in response to:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: FileText,
                title: "Government Subpoenas or CIDs",
                desc: "Receipt of a grand jury subpoena, civil investigative demand (CID), or other formal request for information from a government agency requires a prompt internal investigation to understand potential exposure before responding.",
              },
              {
                icon: Search,
                title: "Search Warrants or Raids",
                desc: "After execution of a search warrant, organizations need to quickly understand what information authorities have seized and the potential legal implications of that evidence.",
              },
              {
                icon: AlertCircle,
                title: "Whistleblower Allegations",
                desc: "Internal complaints or external whistleblower allegations require prompt, thorough investigation to assess validity and determine appropriate responses.",
              },
              {
                icon: FileCheck,
                title: "Voluntary Self-Disclosure Considerations",
                desc: "Organizations that discover potential legal violations may need an independent investigation to determine whether voluntary disclosure to authorities is appropriate.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-sm" style={{ backgroundColor: "var(--text-white)" }}>
                <div className="flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--light-bg-secondary)" }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: "var(--secondary-gold)" }} />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-2" style={{ color: "var(--text-dark)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-medium)" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "var(--light-bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl mb-6" style={{ color: "var(--text-dark)" }}>
                Our Commitment to Independence
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-medium)" }}>
                When conducting investigations, we maintain strict independence and objectivity. Our goal is to uncover
                the truth and provide an accurate assessment of the facts and legal implications—not to advocate for a
                predetermined outcome. This independence is critical for investigations that may be reviewed by
                regulators, board committees, or courts. Our reputation for thoroughness and impartiality gives our
                findings credibility with these important audiences.
              </p>
            </div>

            <div className="relative">
              <div className="relative h-96">
                <Image
                  src="/lady-justice-statue-scales-courthouse.jpg"
                  alt="Justice"
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
              <div className="absolute -top-8 -right-8 grid grid-cols-6 gap-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--secondary-gold)" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "var(--light-bg-tertiary)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl mb-4" style={{ color: "var(--text-dark)" }}>
              Investigation to Resolution Process
            </h2>
            <p className="text-base max-w-3xl mx-auto" style={{ color: "var(--text-medium)" }}>
              Our structured approach helps organizations move from uncertainty to resolution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "1",
                title: "Initial Assessment",
                desc: "We begin with a rapid assessment of the allegations or concerns, helping you understand the potential scope and severity of the issue. This initial phase informs the structure of the full investigation.",
              },
              {
                number: "2",
                title: "Comprehensive Investigation",
                desc: "Our team conducts a thorough investigation, including document review, witness interviews, forensic analysis, and legal research. We work efficiently while maintaining the integrity and confidentiality of the process.",
              },
              {
                number: "3",
                title: "Findings & Recommendations",
                desc: "We provide clear findings regarding what happened and the legal implications. Our recommendations include concrete steps for remediation, compliance improvements, and potential self-disclosure considerations.",
              },
              {
                number: "4",
                title: "Resolution Support",
                desc: "When appropriate, we assist with implementing remediation plans, negotiating with regulators or prosecutors, and resolving the matter with minimal disruption to you or your organization's.",
              },
            ].map((phase, i) => (
              <div key={i} className="text-center p-6 rounded-sm" style={{ backgroundColor: "var(--text-white)" }}>
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 font-serif text-2xl"
                  style={{ backgroundColor: "var(--secondary-gold)", color: "var(--text-white)" }}
                >
                  {phase.number}
                </div>
                <h3 className="font-serif text-xl mb-4" style={{ color: "var(--text-dark)" }}>
                  {phase.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-medium)" }}>
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
