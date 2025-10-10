import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function About() {
  const dotRows = Array(12).fill(null);
  const dotsPerRow = 12;
  return (
    <div className="relative">
      {/* Feature Cards Section */}
      <section className="relative -mt-32">
        <div className="max-w-7xl mx-auto px-3">
          <div className="flex flex-col md:flex-row border border-[#C9A961]">
            {[
              {
                icon: "/f1.png",
                title: "Legal Strategies",
                desc: "Crafting smart, result-driven legal solutions through strategic insight and professional excellence.",
              },
              {
                icon: "/f2.png",
                title: "All Time Support",
                desc: "The dedicated team always ensures everything is done right, even when challenges arise.",
              },
              {
                icon: "/f3.png",
                title: "Path to Justice",
                desc: "Dedicated to delivering fair and just results with honesty and accuracy.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className={`flex-1 border-none rounded-none bg-white shadow-none p-0 ${
                  i === 1 ? "border-l border-r border-[#D9AA5A] relative" : ""
                }`}
              >
                {i === 1 && (
                  <>
                    <div className="absolute left-0 top-[15%] bottom-[15%] w-[1px] bg-[#D9AA5A]" />
                    <div className="absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-[#D9AA5A]" />
                  </>
                )}
                <CardContent className="text-center p-6 flex flex-col items-center">
                  <div className="inline-flex items-center justify-center mb-4">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    />
                  </div>
                  <h3 className="font-georgia text-xl md:text-2xl font-normal text-[#1a1a1a] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#666666] leading-relaxed">
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
        <div className="flex max-w-7xl px-3 py-8 w-full items-center justify-center gap-10 flex-col lg:flex-row">
          <div className="relative w-full max-w-[494px] h-[581px] flex-shrink-0">
            <div className="flex flex-col w-[173px] h-[182px] items-start gap-2.5 absolute top-0 right-8">
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
                        className="w-1.5 h-1.5 bg-[#dd9d5c] rounded-[3px]"
                      />
                    ))}
                </div>
              ))}
            </div>

            <Image
              className="absolute top-[59px] left-px w-[390px] h-[456px] object-cover z-10"
              alt="Courthouse building"
              src="/high-court.png"
              height={456}
              width={390}
            />

            <Image
              className="absolute top-[230px] z-20 left-[204px] w-[290px] h-[351px] object-cover"
              alt="Legal scales and hourglass"
              src="/law.png"
              height={351}
              width={290}
            />
          </div>

          <div className="flex flex-col items-start justify-center gap-[59px] flex-1 max-w-[706px]">
            <div className="flex flex-col items-start gap-5 w-full">
              <h1 className="font-georgia font-normal text-[#2f2f2f] text-6xl tracking-[0] leading-[72.0px] w-full">
                Criminal Defense &amp; Investigations
              </h1>

              <p className="font-normal text-[#545454] text-xl tracking-[0] leading-[30px] w-full">
                A boutique law firm providing exceptional criminal defense and
                thorough internal investigations, with decades of combined
                experience in complex state and period after cases.
              </p>
            </div>

            <Link
              href="/insights"
              className="w-36 bg-primary-gold text-center  hover:bg-secondary-gold text-white font-normal text-xl tracking-[0] leading-7 px-4 py-3"
            >
              Insights
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
