// app\admin\(dashboard)\dashboard\attorneys\page.tsx
"use client";
import { useEffect } from "react";
import Image from "next/image";
import { MapPin, Edit, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DashboardHeader from "@/components/Admin/DashboardHeader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAttorneys } from "@/redux/features/attorneys/attorneysSlice";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { getFullImageUrl } from "@/lib/utils";

export default function AdminAttorneyPage() {
  const router = useRouter();
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
        biography: "",
        profileImage: "/user.png",
        bannerImage: "/attorney.png",
        education: [],
        barAdmission: [],
        professionalMemberships: [],
      };

  const handleEdit = () => {
    router.push("/admin/dashboard/attorneys/edit");
  };

  // Get full image URLs
  const profileImageUrl =
    getFullImageUrl(attorneyData.profileImage) || attorneyData.profileImage;
  const bannerImageUrl =
    getFullImageUrl(attorneyData.bannerImage) || attorneyData.bannerImage;

  return (
    <div className="min-h-screen w-full mx-auto px-3">
      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Here you can manage your website"
      />

      {/* Hero Section with Background Image and Profile */}
      <section className="border border-border/70 p-5 bg-[#fcfdff] relative mt-4">
        {/* Edit Button */}
        <Button
          onClick={handleEdit}
          className="absolute top-7 right-7 z-10 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2"
          size="sm"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>

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
          <div className="flex flex-col md:flex-row md:items-center gap-8">
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
                <div className="flex flex-wrap gap-x-12 gap-y-4 justify-center items-center">
                  {/* Email */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                        <Mail className="w-6 h-6 text-[#D4AF37]" />
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
                      <div className="flex flex-col items-center justify-center gap-1 relative border-l border-r border-[#E8E8E8] px-12 cursor-pointer">
                        <Phone className="w-6 h-6 text-[#D4AF37]" />
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
                        <MapPin className="w-7 h-7 text-[#D4AF37]" />
                        <p className="text-sm text-[#747086]">Location</p>
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
      {attorneyData.biography && (
        <section className="my-10 border border-border/70 p-7 bg-[#fcfdff]">
          <div>
            <h2 className="text-xl md:text-3xl mb-6 font-bold">Biography</h2>
            <p className="text-lg leading-relaxed text-text-medium text-justify">
              {attorneyData.biography}
            </p>
          </div>
        </section>
      )}

      {/* Education Section */}
      {attorneyData.education.length > 0 && (
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
      )}

      {/* Bar Admissions and Professional Memberships */}
      {(attorneyData.barAdmission.length > 0 ||
        attorneyData.professionalMemberships.length > 0) && (
        <section className="my-8 md:mt-10 md:mb-40 border border-border/70 card-bg">
          <div className="grid md:grid-cols-2">
            {/* Bar Admissions */}
            {attorneyData.barAdmission.length > 0 && (
              <div className="w-full h-full border border-border/70 p-7">
                <h2 className="text-xl md:text-3xl mb-6 font-bold">
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
            )}

            {/* Professional Memberships */}
            {attorneyData.professionalMemberships.length > 0 && (
              <div className="w-full h-full border border-border/70 p-7">
                <h2 className="text-xl md:text-3xl mb-6 font-bold">
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
            )}
          </div>
        </section>
      )}
    </div>
  );
}
