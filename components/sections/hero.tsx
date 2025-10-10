import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "../layout/header";

interface HeroProps {
  title: string;
  subtitle: string;
  showCTA?: boolean;
  imageSrc?: string;
}

export function Hero({
  title,
  subtitle,
  showCTA = false,
  imageSrc = "/hero.jpg",
}: HeroProps) {
  return (
    <div>
      <Header show={true} background="dark" isFixed={true} />
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center  bg-dark-bg">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#101010F2]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-3 py-20 w-full">
          <div className="max-w-4xl">
            <h1 className="font-georgia text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight text-balance text-light-bg ">
              {/* {title} */}
              Criminal Defense & <br /> Investigations
            </h1>
            <p className="text-lg mb-6 leading-relaxed text-text-light md:max-w-2/3">
              {subtitle}
            </p>
            {showCTA && (
              <Button className="font-medium px-8 py-6 text-base bg-primary-gold text-white hover:bg-secondary-gold transition-colors">
                Request a Consultation
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
