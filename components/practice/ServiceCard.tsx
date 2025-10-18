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

  const shouldHaveBorder = index === 1;

  return (
    <div
      className={
        shouldHaveBorder
          ? "border-t border-b border-[#B88D43] py-4 md:py-0 md:border-b-0 md:border-t-0 md:border-l md:border-r px-2"
          : ""
      }
    >
      <div className="flex items-center mb-4 ">
        {IconComponent ? (
          <IconComponent
            className="w-8 h-8 flex-shrink-0 mt-1"
            style={{ color: "var(--secondary-gold)" }}
          />
        ) : typeof icon === "string" ? (
          <Image
            src={icon}
            alt={title}
            width={iconSize}
            height={iconSize}
            className="object-contain flex-shrink-0"
            quality={100}
          />
        ) : null}
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <ul className="space-y-3 text-lg md:text-xl ml-4 md:ml-8">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="text-primary-gold flex-shrink-0 leading-normal">
              •
            </span>
            <span className="text-gray flex-1 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
