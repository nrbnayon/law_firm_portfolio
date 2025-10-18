// app/(Landing)/our-team/page.tsx
import { Header } from "@/components/layout/header";
import { TeamMemberCard } from "@/components/Team/TeamMemberCard";
import { teamMembers } from "@/data/team-members";

export default function OurTeamPage() {
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
                key={member.id}
                id={member.id}
                name={member.name}
                role={member.role}
                image={member.image}
                description={member.description}
                socialLinks={member.socialLinks}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
