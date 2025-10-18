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
    <div className="border border-border bg-white overflow-hidden">
      {/* Team Member Image */}
      <Link href={`/our-team/${id}`}>
        <div className="relative h-[320px] w-full overflow-hidden cursor-pointer group">
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
      <div className="p-6">
        <Link href={`/our-team/${id}`}>
          <h3 className="text-2xl font-bold mb-1 hover:text-primary-gold transition-colors cursor-pointer">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-text-medium mb-4">{role}</p>

        {/* Description */}
        <p className="text-base text-text-medium text-justify leading-relaxed mb-6">
          {description}
        </p>

        {/* Social Links */}
        {socialLinks && (
          <div className="flex gap-3">
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary-gold hover:border-primary-gold hover:text-white transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary-gold hover:border-primary-gold hover:text-white transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary-gold hover:border-primary-gold hover:text-white transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
