// components/cards/ServiceCard.tsx
import Image from "next/image";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon?: string | LucideIcon;
  title: string;
  items: string[];
  iconSize?: number;
  index?: number;
}

export function ServiceCard({
  icon,
  title,
  items,
  iconSize = 40,
  index = 0,
}: ServiceCardProps) {
  const IconComponent = typeof icon === "function" ? icon : null;

  const shouldHaveBorder = index === 1 || index === 3 || index === 5;

  return (
    <div
      className={
        shouldHaveBorder
          ? " border-t border-b border-[#B88D43] md:border-b-0 md:border-t-0 md:border-l md:border-r px-4"
          : ""
      }
    >
      <h3
        className="  text-xl mb-4 flex items-center gap-2"
        style={{ color: "var(--text-dark)" }}
      >
        {IconComponent ? (
          <IconComponent
            className="w-5 h-5"
            style={{ color: "var(--secondary-gold)" }}
          />
        ) : typeof icon === "string" ? (
          <Image
            src={icon}
            alt={title}
            width={iconSize}
            height={iconSize}
            className="object-cover"
            quality={100}
          />
        ) : null}
        {title}
      </h3>
      <ul
        className="space-y-2 text-base ml-4 md:ml-10"
        style={{ color: "var(--text-medium)" }}
      >
        {items.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
