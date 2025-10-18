// components/team/team-member-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";

interface TeamMemberCardProps {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export function TeamMemberCard({
  id,
  name,
  role,
  image,
  description,
  socialLinks,
}: TeamMemberCardProps) {
  return (
    <div className="bg-white overflow-hidden">
      {/* Team Member Image */}
      <Link href={`/our-team/${id}`}>
        <div className="relative h-[390px] w-full overflow-hidden cursor-pointer group">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            quality={100}
          />
        </div>
      </Link>

      {/* Team Member Info */}

      <div className="mt-6">
        <Link href={`/our-team/${id}`}>
          <h3 className="text-2xl font-bold mb-1 hover:text-primary-gold transition-colors cursor-pointer">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-text-medium mb-4">{role}</p>

        <p className="text-base text-text-medium text-center leading-relaxed px-6 py-4 border-y">
          {description}
        </p>
      </div>

      <div className="py-5">
        {/* Social Links */}
        {socialLinks && (
          <div className="flex gap-3">
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary-gold hover:border-primary-gold hover:text-white transition-all"
              >
                <Facebook className="w-5 h-5 text-[#787878] fill-[#787878]" />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary-gold hover:border-primary-gold hover:text-white transition-all"
              >
                <Twitter className="w-5 h-5 text-[#787878] fill-[#787878]" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary-gold hover:border-primary-gold hover:text-white transition-all"
              >
                <Linkedin className="w-5 h-5 text-[#787878] fill-[#787878]" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
