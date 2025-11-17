// app/(Landing)/our-team/[id]/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Header } from "@/components/layout/header";
import { notFound } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAttorneyById,
  clearSelectedAttorney,
} from "@/redux/features/attorneys/attorneysSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getFullImageUrl } from "@/lib/utils";

export default function TeamDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the params Promise
  const { id } = use(params);

  const dispatch = useAppDispatch();
  const { selectedAttorney, isLoading, error } = useAppSelector(
    (state) => state.attorneys
  );

  const [hasFetched, setHasFetched] = useState(false);

  // Fetch attorney by ID on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchAttorneyById(id))
        .unwrap()
        .then((data) => {
          setHasFetched(true);
        })
        .catch((err) => {
          console.error("Error fetching attorney:", err);
          setHasFetched(true);
        });
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearSelectedAttorney());
    };
  }, [dispatch, id]);

  // Show error if any
  useEffect(() => {
    if (error) {
      console.error("Redux error:", error);
    }
  }, [error]);

  if (isLoading || !hasFetched) {
    return (
      <div>
        <Header show={true} background="white" isFixed={false} />
        <div className="bg-white md:pt-20 min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!selectedAttorney || error) {
    console.log("Attorney not found or error occurred");
    notFound();
  }

  const member = selectedAttorney;

  console.log("Team member details:: ", member);

  // Get full image URLs
  const profileImageUrl =
    getFullImageUrl(member.profileImage || "") || "/user.png";
  const bannerImageUrl =
    getFullImageUrl(member.bannerImage || "") || "/attorney.png";
  const location = `${member.location.line1} ${member.location.line2 || ""} ${
    member.location.line3 || ""
  }`.trim();

  // Handle email click
  const handleEmailClick = () => {
    window.location.href = `mailto:${member.email}`;
  };

  // Handle phone click
  const handlePhoneClick = () => {
    window.location.href = `tel:${member.phone}`;
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
                alt={`${member.name} background`}
                fill
                className="object-cover"
                quality={100}
              />
            ) : (
              <img
                src={bannerImageUrl}
                alt={`${member.name} background`}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-[#11101299]"></div>
          </div>

          {/* Profile Section - Overlapping */}
          <div className="relative -mt-24 ml-10">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              {/* Profile Image */}
              <div className="shrink-0">
                <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white bg-white mb-2">
                  {profileImageUrl.startsWith("data:") ||
                  profileImageUrl.startsWith("/") ? (
                    <Image
                      src={profileImageUrl}
                      alt={member.name}
                      width={176}
                      height={176}
                      className="object-cover w-full h-full"
                      quality={100}
                    />
                  ) : (
                    <img
                      src={profileImageUrl}
                      alt={member.name}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <h1 className="text-xl md:text-3xl mb-3 font-bold">
                  {member.name}
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
                        <p className="text-sm">{member.email}</p>
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
                        <p className="text-sm">{member.phone}</p>
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
                        <p className="text-sm">{location}</p>
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
              {member.biography}
            </p>
          </div>
        </section>

        {/* Education Section */}
        {member.education && member.education.length > 0 && (
          <section className="my-10 border border-border/70 p-7 bg-[#fcfdff]">
            <h2 className="text-xl md:text-3xl mb-6 font-bold">Education</h2>
            <ul className="space-y-1 text-lg text-text-medium ml-2">
              {member.education.map((edu, index) => (
                <li key={index} className="flex gap-2">
                  <span>•</span>
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Bar Admissions and Professional Memberships */}
        {((member.barAdmission && member.barAdmission.length > 0) ||
          (member.professionalMemberships &&
            member.professionalMemberships.length > 0)) && (
          <section className="my-8 md:mt-10 md:mb-40 border border-border/70 card-bg">
            <div className="grid md:grid-cols-2">
              {/* Bar Admissions */}
              {member.barAdmission && member.barAdmission.length > 0 && (
                <div className="w-full h-full border border-border/70 p-7">
                  <h2 className="text-xl md:text-3xl mb-6 font-bold">
                    Bar Admissions
                  </h2>
                  <ul className="space-y-1 text-lg text-text-medium ml-2">
                    {member.barAdmission.map((admission, index) => (
                      <li key={index} className="flex gap-2">
                        <span>•</span>
                        <span>{admission}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Professional Memberships */}
              {member.professionalMemberships &&
                member.professionalMemberships.length > 0 && (
                  <div className="w-full h-full border border-border/70 p-7">
                    <h2 className="text-xl md:text-3xl mb-6 font-bold">
                      Professional Memberships
                    </h2>
                    <ul className="space-y-1 text-lg text-text-medium ml-2">
                      {member.professionalMemberships.map(
                        (membership, index) => (
                          <li key={index} className="flex gap-2">
                            <span>•</span>
                            <span>{membership}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
