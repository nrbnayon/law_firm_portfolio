// app/(Landing)/our-team/page.tsx
"use client";
import { useEffect } from "react";
import { Header } from "@/components/layout/header";
import { TeamMemberCard } from "@/components/Team/TeamMemberCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAttorneys } from "@/redux/features/attorneys/attorneysSlice";
import { getFullImageUrl } from "@/lib/utils";

const fallbackTeamMembers = [
  {
    _id: "fallback-1",
    name: "John Doe",
    designation: "Senior Associate",
    email: "john@example.com",
    phone: "123-456-7890",
    role: "member",
    location: {
      line1: "123 Main St",
    },
    biography:
      "Experienced legal professional specializing in criminal defense.",
    profileImage: "/user.png",
    bannerImage: "/attorney.png",
    education: [],
    barAdmission: [],
    professionalMemberships: [],
    socialLinks: {
      facebook: "",
      twitter: "",
      linkedin: "",
    },
    status: "active" as const,
  },
  {
    _id: "fallback-2",
    name: "Jane Smith",
    designation: "Associate",
    email: "jane@example.com",
    phone: "123-456-7891",
    role: "member",
    location: {
      line1: "456 Oak Ave",
    },
    biography: "Dedicated attorney with expertise in white collar defense.",
    profileImage: "/user.png",
    bannerImage: "/attorney.png",
    education: [],
    barAdmission: [],
    professionalMemberships: [],
    socialLinks: {
      facebook: "",
      twitter: "",
      linkedin: "",
    },
    status: "active" as const,
  },
];

export default function OurTeamPage() {
  const dispatch = useAppDispatch();
  const { attorneys } = useAppSelector((state) => state.attorneys); 

  // console.log("attorneys data get:: ", attorneys);

  // Fetch team members on mount
  useEffect(() => {
    dispatch(fetchAttorneys({ role: "member", status: "active" }));
  }, [dispatch]);

  // Use API data if available, otherwise use fallback
  const teamMembers = attorneys.length > 0 ? attorneys : fallbackTeamMembers;

  return (
    <div>
      <Header show={true} background="white" isFixed={false} />
      <div className="bg-white md:pt-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-3 py-16">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-2xl md:text-3xl font-medium mb-4">Our Team</h1>
            <p className="text-lg text-text-medium">
              Our team is available to respond to your inquiry and provide an
              initial assessment of your legal matter.
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member._id}
                id={member._id}
                name={member.name}
                role={member.designation || "Team Member"}
                image={
                  getFullImageUrl(member.profileImage || "") || "/user.png"
                }
                description={member.biography}
                socialLinks={member.socialLinks}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
