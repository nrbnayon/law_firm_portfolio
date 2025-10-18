// app/(Landing)/our-team/[id]/page.tsx
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Header } from "@/components/layout/header";
import { getTeamMemberById, teamMembers } from "@/data/team-members";
import { notFound } from "next/navigation";

// Generate static params for all team members
export async function generateStaticParams() {
  return teamMembers.map((member) => ({
    id: member.id,
  }));
}

export default function TeamDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const member = getTeamMemberById(params.id);

  if (!member) {
    notFound();
  }

  return (
    <div>
      <Header show={true} background="white" isFixed={false} />
      <div className="bg-white md:pt-20 min-h-screen max-w-7xl mx-auto px-3">
        {/* Hero Section with Background Image and Profile */}
        <section className="border border-border p-5 bg-[#fcfdff]">
          {/* Background Image */}
          <div className="relative h-[280px] w-full">
            <Image
              src={member.backgroundImage}
              alt={`${member.name} background`}
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-[#11101299]"></div>
          </div>

          {/* Profile Section - Overlapping */}
          <div className="relative -mt-24 ml-10">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white bg-white mb-2">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={176}
                    height={176}
                    className="object-cover w-full h-full"
                    quality={100}
                  />
                </div>
                <h1 className="text-xl md:text-3xl mb-3 font-bold">
                  {member.name}
                </h1>
              </div>

              {/* Contact Info */}
              <div className="flex-grow md:mt-20">
                {/* Contact Info Row */}
                <div className="flex flex-wrap gap-x-12 gap-y-4 justify-center items-center">
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
                    <p className="text-xs">Location</p>
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
            <p className="text-lg leading-relaxed text-text-medium text-justify">
              {member.biography}
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section className="my-10 border border-border p-7 bg-[#fcfdff]">
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

        {/* Bar Admissions and Professional Memberships */}
        <section className="my-8 md:mt-10 md:mb-40 border border-border card-bg">
          <div className="grid md:grid-cols-2">
            {/* Bar Admissions */}
            <div className="w-full h-full border border-border p-7">
              <h2 className="text-xl md:text-3xl mb-6 font-bold">
                Bar Admissions
              </h2>
              <ul className="space-y-1 text-lg text-text-medium ml-2">
                {member.barAdmissions.map((admission, index) => (
                  <li key={index} className="flex gap-2">
                    <span>•</span>
                    <span>{admission}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Memberships */}
            <div className="w-full h-full border border-border p-7">
              <h2 className="text-xl md:text-3xl mb-6 font-bold">
                Professional Memberships
              </h2>
              <ul className="space-y-1 text-lg text-text-medium ml-2">
                {member.professionalMemberships.map((membership, index) => (
                  <li key={index} className="flex gap-2">
                    <span>•</span>
                    <span>{membership}</span>
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
