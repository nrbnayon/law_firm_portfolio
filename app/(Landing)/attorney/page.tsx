// app\(Landing)\attorney\page.tsx
"use client";
import { useEffect } from "react";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { Header } from "@/components/layout/header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAttorneys } from "@/redux/features/attorneys/attorneysSlice";
import { getFullImageUrl } from "@/lib/utils";

export default function AttorneyPage() {
  const dispatch = useAppDispatch();
  const { attorneys, isLoading } = useAppSelector((state) => state.attorneys);

  // Fetch attorneys on mount
  useEffect(() => {
    dispatch(fetchAttorneys({ role: "admin" }));
  }, [dispatch]);

  // Get the first attorney (or you can modify this to get a specific attorney)
  const attorney = attorneys.length > 0 ? attorneys[0] : null;

  const attorneyData = attorney
    ? {
        name: attorney.name,
        email: attorney.email,
        phone: attorney.phone,
        location: `${attorney.location.line1} ${
          attorney.location.line2 || ""
        } ${attorney.location.line3 || ""}`.trim(),
        biography: attorney.biography,
        profileImage: attorney.profileImage || "/user.png",
        bannerImage: attorney.bannerImage || "/attorney.png",
        education: attorney.education,
        barAdmission: attorney.barAdmission,
        professionalMemberships: attorney.professionalMemberships,
      }
    : {
        name: "Chauntelle",
        email: "info@cwwhitelaw.com",
        phone: "713-236-7700",
        location: "Lyric Tower 440 Louisiana St, STE 900, Houston TX 77002",
        biography:
          "Chauntelle Wood White is the Founding Attorney of C.W. White. A seasoned first-chair trial lawyer, she has successfully tried more than 40 jury and bench trials across criminal and civil matters. Her background spans public service and elite, big-law firm practice. She is known for steady courtroom presence, her charisma, clear judgment under pressure, and practical, results-oriented problem-solving. Clients and colleagues rely on her discipline, credibility, and unwavering advocacy. Chauntelle's work centers on Federal and State Criminal Litigation, and White-Collar Investigations, and Grand-Jury Representation. She routinely handles high-stakes cases and responds to aggressive federal and state inquiries, navigating complex, sensitive issues with discretion and rigor. Her command of federal and state regulatory frameworks equips her to lead investigations, manage pre-indictment strategy, and advise on corporate governance and compliance. Before entering private practice, Chauntelle served as a Felony Prosecutor in Houston. She is also a proud veteran of the United States Air Force Reserve, where she served for eight years.",
        profileImage: "/user.png",
        bannerImage: "/attorney.png",
        education: [
          "J.D., Southern University Law Center - cum laude - Law Review Senior Editor and Moot Court Board Member",
          "B.S., Cameron University",
        ],
        barAdmission: [
          "Texas, Louisiana, and Illinois.",
          "U.S. District Courts for the Northern, Western and Southern Districts of Texas",
          "U.S. District Courts for the Eastern, Middle, and Western Districts of Louisiana",
        ],
        professionalMemberships: [
          "Federal Bar Association",
          "Houston Bar Association",
          "Houston Young Lawyers Association",
          "American Bar Association",
          "Texas Bar Foundation, Lifetime Fellow",
          "Innocence Project of Texas, Board Member",
          "University of Houston, Adjunct Professor",
        ],
      };

  // Get full image URLs
  const profileImageUrl =
    getFullImageUrl(attorneyData.profileImage) || attorneyData.profileImage;
  const bannerImageUrl =
    getFullImageUrl(attorneyData.bannerImage) || attorneyData.bannerImage;

  // Handle email click
  const handleEmailClick = () => {
    window.location.href = `mailto:${attorneyData.email}`;
  };

  // Handle phone click
  const handlePhoneClick = () => {
    window.location.href = `tel:${attorneyData.phone}`;
  };

  return (
    <div>
      <Header show={true} background="white" isFixed={false} />
      <div className="bg-white md:pt-20 min-h-screen max-w-7xl mx-auto px-3">
        {/* Hero Section with Background Image and Profile */}
        <section className="border border-border/70 p-5 bg-[#fcfdff]">
          {/* Background Image */}
          <div className="relative h-[280px] w-full">
            {bannerImageUrl.startsWith("data:") ||
            bannerImageUrl.startsWith("/") ? (
              <Image
                src={bannerImageUrl}
                alt="Attorney background"
                fill
                className="object-cover"
                quality={100}
              />
            ) : (
              <img
                src={bannerImageUrl}
                alt="Attorney background"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-[#11101299]"></div>
          </div>

          {/* Profile Section - Overlapping */}
          <div className="relative -mt-24 ml-10">
            <div className="flex flex-col md:flex-row md:items-center gap-8 ">
              {/* Profile Image */}
              <div className="shrink-0">
                <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white bg-white mb-2">
                  {profileImageUrl.startsWith("data:") ||
                  profileImageUrl.startsWith("/") ? (
                    <Image
                      src={profileImageUrl}
                      alt={attorneyData.name}
                      width={176}
                      height={176}
                      className="object-cover w-full h-full"
                      quality={100}
                    />
                  ) : (
                    <img
                      src={profileImageUrl}
                      alt={attorneyData.name}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <h1 className="text-xl md:text-3xl mb-3 font-bold">
                  {attorneyData.name}
                </h1>
              </div>

              {/* Contact Info with Tooltips */}
              <div className="grow md:mt-20">
                <TooltipProvider>
                  <div className="flex flex-wrap gap-x-12 gap-y-4  justify-center items-center">
                    {/* Email */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="flex flex-col items-center justify-center gap-1 cursor-pointer"
                          onClick={handleEmailClick}
                        >
                          <Image
                            src="/icon/email.svg"
                            alt="email"
                            width={24}
                            height={24}
                            quality={100}
                            className="w-full h-full object-cover"
                          />
                          <p className="text-sm text-[#747086]">Email</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">{attorneyData.email}</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Phone */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="flex flex-col items-center justify-center gap-1 relative border-l border-r border-[#E8E8E8] px-12 cursor-pointer"
                          onClick={handlePhoneClick}
                        >
                          <Image
                            src="/icon/call.svg"
                            alt="phone"
                            width={24}
                            height={24}
                            quality={100}
                            className="w-full h-full object-cover"
                          />
                          <p className="text-sm text-[#747086]">Phone</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">{attorneyData.phone}</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Location */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                          <MapPin className="w-7 h-7 text-primary" />
                          <p className="text-sm text-[#747086] ">Location</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[300px]">
                        <p className="text-sm">{attorneyData.location}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </section>

        {/* Biography Section */}
        <section className="my-10 border border-border/70 p-7 bg-[#fcfdff]">
          <div>
            <h2 className="text-xl md:text-3xl mb-6 font-bold">Biography</h2>
            <p className="text-lg leading-relaxed text-text-medium text-justify">
              {attorneyData.biography}
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section className="my-10 border border-border/70 p-7 bg-[#fcfdff]">
          <h2 className="text-xl md:text-3xl mb-6 font-bold">Education</h2>
          <ul className="space-y-1 text-lg text-text-medium ml-2">
            {attorneyData.education.map((edu, index) => (
              <li key={index} className="flex gap-2">
                <span>•</span>
                <span>{edu}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Bar Admissions and Professional Memberships */}
        <section className="my-8 md:mt-10 md:mb-40 border border-border/70 card-bg">
          <div className="grid md:grid-cols-2">
            {/* Bar Admissions */}
            <div className="w-full h-full border border-border/70 p-7">
              <h2 className="text-xl md:text-3xl mb-6   font-bold">
                Bar Admissions
              </h2>
              <ul className="space-y-1 text-lg text-text-medium ml-2">
                {attorneyData.barAdmission.map((bar, index) => (
                  <li key={index} className="flex gap-2">
                    <span>•</span>
                    <span>{bar}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Memberships */}
            <div className="w-full h-full border border-border/70 p-7">
              <h2 className="text-xl md:text-3xl mb-6   font-bold">
                Professional Memberships
              </h2>
              <ul className="space-y-1 text-lg text-text-medium ml-2">
                {attorneyData.professionalMemberships.map((member, index) => (
                  <li key={index} className="flex gap-2">
                    <span>•</span>
                    <span>{member}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
