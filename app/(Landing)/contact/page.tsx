import { Hero } from "@/components/sections/hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-white">
      <Hero
        title="Contact Us"
        subtitle="Confidential Consultation | Secure intake, clear next steps."
        imageSrc="/insight.png"
        darkBg={false}
        height="min-h-[40vh] md:min-h-[50vh]"
        padding="pt-20"
      />

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-3">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-12">
            {/* Contact Information */}
            <div>
              <h2
                className="font-bold text-3xl md:text-4xl mb-6"
                style={{ color: "var(--text-dark)" }}
              >
                Contact Information
              </h2>
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: "var(--text-medium)" }}
              >
                Our team is available to respond to your inquiry and provide an
                initial assessment of your legal matter.
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 p-3 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--primary-gold)" }}
                  >
                    <Image
                      src="/icon/Mail.svg"
                      alt="email"
                      width={16}
                      height={16}
                      quality={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-lg mb-1"
                      style={{ color: "var(--text-dark)" }}
                    >
                      Email
                    </h3>
                    <p
                      className="text-lg"
                      style={{ color: "var(--text-medium)" }}
                    >
                      info@cwhitelaws.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--primary-gold)" }}
                  >
                    <Phone
                      className="w-6 h-6"
                      style={{ color: "var(--text-white)" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-lg mb-1"
                      style={{ color: "var(--text-dark)" }}
                    >
                      Phone
                    </h3>
                    <p
                      className="text-lg"
                      style={{ color: "var(--text-medium)" }}
                    >
                      713-236-7700
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--primary-gold)" }}
                  >
                    <MapPin
                      className="w-6 h-6"
                      style={{ color: "var(--text-white)" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-lg mb-1"
                      style={{ color: "var(--text-dark)" }}
                    >
                      Location
                    </h3>
                    <p
                      className="text-lg"
                      style={{ color: "var(--text-medium)" }}
                    >
                      Lyric Tower 440 Louisiana St., STE
                      <br />
                      900 Houston, TX 77002
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Request a Consultation Form */}
            <div
              className="p-8 md:p-12 rounded-none border md:col-span-2"
              style={{ backgroundColor: "var(--text-white)" }}
            >
              <h2
                className="font-bold text-3xl md:text-4xl mb-8"
                style={{ color: "var(--text-dark)" }}
              >
                Request a Consultation
              </h2>

              <form className="space-y-6">
                <div>
                  <label
                    className="block text-base font-medium mb-2"
                    style={{ color: "var(--text-dark)" }}
                  >
                    Full Name{" "}
                    <span style={{ color: "var(--secondary-gold)" }}>*</span>
                  </label>
                  <Input
                    className="w-full rounded-none h-12  !border-[#E0E0E0]"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-base font-medium mb-2"
                      style={{ color: "var(--text-dark)" }}
                    >
                      Email Address{" "}
                      <span style={{ color: "var(--secondary-gold)" }}>*</span>
                    </label>
                    <Input
                      className="w-full rounded-none h-12  !border-[#E0E0E0]"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-base font-medium mb-2"
                      style={{ color: "var(--text-dark)" }}
                    >
                      Phone number{" "}
                      <span style={{ color: "var(--secondary-gold)" }}>*</span>
                    </label>
                    <Input
                      type="tel"
                      className="w-full rounded-none h-12  !border-[#E0E0E0]"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-base font-medium mb-2"
                    style={{ color: "var(--text-dark)" }}
                  >
                    Matter Type{" "}
                    <span style={{ color: "var(--secondary-gold)" }}>*</span>
                  </label>
                  <select
                    className="w-full rounded-none h-12  border !border-[#E0E0E0]  focus:outline-none focus:ring-1 px-2"
                    style={{
                      color: "var(--text-medium)",
                    }}
                  >
                    <option value="">Select matter type</option>
                    <option value="criminal-defense">Criminal Defense</option>
                    <option value="white-collar">White Collar Defense</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-base font-medium mb-2"
                    style={{ color: "var(--text-dark)" }}
                  >
                    Brief Description of your Matter{" "}
                    <span style={{ color: "var(--secondary-gold)" }}>*</span>
                  </label>
                  <Textarea
                    className="w-full min-h-32 rounded-none  border !border-[#E0E0E0]"
                    placeholder="Enter your message"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="attorney-agreement"
                    className="mt-1"
                  />
                  <label
                    htmlFor="attorney-agreement"
                    className="text-sm"
                    style={{ color: "var(--text-medium)" }}
                  >
                    I understand that submitting this form does not create an
                    attorney-client relationship and that conflict checks must
                    be completed before representation begins.
                    <span style={{ color: "var(--secondary-gold)" }}>*</span>
                  </label>
                </div>

                <Button
                  className="w-full font-medium py-5 text-lg !rounded-none"
                  style={{
                    backgroundColor: "var(--text-dark)",
                    color: "var(--text-white)",
                  }}
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
