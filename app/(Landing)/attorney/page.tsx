import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Header } from "@/components/layout/header";

export default function AttorneyPage() {
  return (
    <div>
      <Header show={true} background="white" isFixed={false} />
      <div className="bg-white md:pt-20 min-h-screen max-w-7xl mx-auto px-3">
        {/* Hero Section with Background Image and Profile */}
        <section className="border border-border p-5 bg-[#fcfdff]">
          {/* Background Image */}
          <div className="relative h-[280px] w-full">
            <Image
              src="/attorney.png"
              alt="Attorney background"
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-[#11101299]"></div>
          </div>

          {/* Profile Section - Overlapping */}
          <div className="relative -mt-24 ml-10">
            <div className="flex flex-col md:flex-row md:items-center gap-8 ">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white bg-white mb-2">
                  <Image
                    src="/user.png"
                    alt="Chauntelle"
                    width={176}
                    height={176}
                    className="object-cover w-full h-full"
                    quality={100}
                  />
                </div>
                <h1 className="text-xl md:text-3xl mb-3 font-bold">
                  Chauntelle
                </h1>
              </div>

              {/*  Contact Info */}
              <div className="flex-grow md:mt-20">
                {/* Contact Info Row */}
                <div className="flex flex-wrap gap-x-12 gap-y-4  justify-center items-center">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Mail className="w-5 h-5 text-primary" />
                    <p className="text-xs">Email</p>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 relative border-l border-r border-[#D9AA5A] px-12">
                    <Phone className="w-5 h-5 text-primary" />
                    <p className="text-xs">Phone</p>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1">
                    <MapPin className="w-5 h-5 text-primary" />
                    <p className="text-xs ">Location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Biography Section */}
        <section className="my-10 border border-border p-7 bg-[#fcfdff]">
          <div>
            <h2 className="text-xl md:text-3xl mb-6 font-bold">Biography</h2>
            <p className="text-base leading-relaxed text-text-medium max-w-5xl">
              I'm a seasoned trial lawyer with deep experience in federal
              criminal defense and sensitive investigations. A former Assistant
              U.S. Attorney, she leverages insider knowledge of government
              prosecutions to defend clients facing grand jury investigations,
              indictments, and high-stakes trials. Known for her meticulous
              preparation and strategic advocacy, Chauntelle is a trusted
              advisor in complex and high-profile cases.
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section className="my-10 border border-border p-7 bg-[#fcfdff]">
          <div>
            <h2 className="text-xl md:text-3xl mb-6   font-bold">Education</h2>
            <ul className="space-y-1 text-base text-text-medium ml-2">
              <li className="flex gap-2">
                <span>•</span>
                <span>
                  J.D., Southern University Law Center - cum laude - Law Review
                  Senior Editor and Moot Court Board Member
                </span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>B.S., Cameron University</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Bar Admissions and Professional Memberships */}
        <section className="mt-10 mb-40 border border-border bg-[#fcfdff]">
          <div>
            <div className="grid md:grid-cols-2">
              {/* Bar Admissions */}
              <div className="w-full h-full border border-border p-7">
                <h2 className="text-xl md:text-3xl mb-6   font-bold">
                  Bar Admissions
                </h2>
                <ul className="space-y-1 text-base text-text-medium ml-2">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Texas, Louisiana, and Illinois.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>
                      U.S. District Courts for the Northern, Western, and
                      Southern Districts of Texas
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>
                      U.S. District Courts for the Eastern, Middle, and Western
                      Districts of Louisiana
                    </span>
                  </li>
                </ul>
              </div>

              {/* Professional Memberships */}
              <div className="w-full h-full border border-border p-7">
                <h2 className="text-xl md:text-3xl mb-6   font-bold">
                  Professional Memberships
                </h2>
                <ul className="space-y-1 text-base text-text-medium ml-2">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Federal Bar Association</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Houston Bar Association</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Houston Young Lawyers Association</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>National Bar Association</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Texas Bar Foundation, Lifetime Fellow</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Innocence Project of Texas, Board Member</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>University of Houston, Adjunct Professor</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
