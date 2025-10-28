import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "../ui/card";

export default function About() {
  const dotRows = Array(12).fill(null);
  const dotsPerRow = 12;
  return (
    <div className="relative">
      {/* Feature Cards Section */}
      <section className="relative -mt-20 xl:-mt-28">
        <div className="max-w-7xl mx-auto px-3">
          <div className="flex flex-col md:flex-row border border-[#C9A961]">
            {[
              {
                icon: "/f1.svg",
                title: "Legal Strategies",
                desc: "Crafting smart, result-driven legal solutions through strategic insight and professional excellence.",
              },
              {
                icon: "/f2.svg",
                title: "Reliable Support",
                desc: "We ensure that our team is attentive to your legal needs and committed to guiding you through the process.",
              },
              {
                icon: "/f3.svg",
                title: "Path to Justice",
                desc: "Dedicated to advocating for your rights in the face of government scrutiny.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className={`flex-1 border-none rounded-none bg-white shadow-none p-0 ${
                  i === 1
                    ? "md:border-l md:border-r border-[#D9AA5A] relative"
                    : ""
                } ${i !== 2 ? "border-b md:border-b-0 border-[#C9A961]" : ""}`}
              >
                {i === 1 && (
                  <>
                    <div className="hidden md:block absolute left-0 top-[15%] bottom-[15%] w-[1px] bg-[#D9AA5A]" />
                    <div className="hidden md:block absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-[#D9AA5A]" />
                  </>
                )}
                <CardContent className="text-center px-4  sm:px-6 py-2 sm:py-8 flex flex-col items-center">
                  <div className="inline-flex items-center justify-center">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                      quality={100}
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-normal text-[#303030] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-[#555555] leading-relaxed max-w-sm">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main About Section */}
      <section className="flex min-h-screen items-center justify-center bg-white w-full">
        <div className="flex max-w-7xl px-3 sm:px-4 md:px-6 py-4 w-full items-center justify-center gap-6 sm:gap-8 lg:gap-10 flex-col lg:flex-row">
          {/* Image Section - Responsive */}
          <div className="relative w-full max-w-[300px] h-[350px] sm:max-w-[400px] sm:h-[470px] lg:max-w-[494px] lg:h-[581px] flex-shrink-0">
            {/* Dots Pattern */}
            <div className="flex flex-col w-[120px] h-[126px] sm:w-[150px] sm:h-[157px] lg:w-[173px] lg:h-[182px] items-start gap-1.5 sm:gap-2 lg:gap-2.5 absolute top-0 right-4 sm:right-6 lg:right-8">
              {dotRows.map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex items-center justify-between relative w-full"
                >
                  {Array(dotsPerRow)
                    .fill(null)
                    .map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#dd9d5c] rounded-[2px] sm:rounded-[3px]"
                      />
                    ))}
                </div>
              ))}
            </div>

            {/* Courthouse Image */}
            <Image
              className="absolute top-[35px] sm:top-[48px] lg:top-[59px] left-0 w-[240px] h-[280px] sm:w-[320px] sm:h-[374px] lg:w-[390px] lg:h-[456px] object-cover z-10"
              alt="Courthouse building"
              src="/high-court.png"
              height={456}
              width={390}
              quality={100}
            />

            {/* Law Scales Image */}
            <Image
              className="absolute top-[140px] sm:top-[188px] lg:top-[230px] z-20 left-[125px] sm:left-[167px] lg:left-[204px] w-[175px] h-[212px] sm:w-[238px] sm:h-[288px] lg:w-[290px] lg:h-[351px] object-cover"
              alt="Legal scales and hourglass"
              src="/law.png"
              height={351}
              width={290}
              quality={100}
            />
          </div>

          {/* Text Content - Responsive */}
          <div className="flex flex-col items-start justify-center gap-8 sm:gap-10 lg:gap-14 flex-1 max-w-full lg:max-w-[710px]">
            <div className="flex flex-col items-start gap-4 sm:gap-5 w-full">
              <h1 className="font-normal text-[#2f2f2f] text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0] leading-tight sm:leading-[1.2] lg:leading-[72.0px] w-full">
                Criminal Defense & <br /> White-Collar/Internal <br />{" "}
                Investigations
              </h1>

              <p className="font-normal text-[#545454] text-base sm:text-lg lg:text-2xl tracking-[0] leading-relaxed sm:leading-[1.6] lg:leading-[30px] w-full ">
                A boutique law firm concentrating on federal and state criminal
                defense and white-collar/internal investigations.
              </p>
            </div>

            <Link
              href="/insights"
              className="w-32 sm:w-36 bg-primary-gold text-center hover:bg-secondary-gold text-white font-normal text-lg sm:text-xl tracking-[0] leading-6 sm:leading-7 px-3 sm:px-4 py-2.5 sm:py-3 transition-colors duration-300"
            >
              Insights
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
