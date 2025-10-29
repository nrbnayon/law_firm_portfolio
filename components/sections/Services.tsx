import Image from "next/image";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Services() {
  return (
    <div className="mb-20 px-2">
      <div className="max-w-7xl mx-auto ">
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              title: "Federal & State Criminal Defense",
              desc: "Indictments, Grand Juries, Trials, Target/Witness Representation, and Pre-charge advocacy.",
              image: "/s1.png",
              href: "/practice/criminal-defense",
            },
            {
              title: "White-Collar Defense",
              desc: "Employee representation, Fraud, Bribery, Public Corruption, Money Laundering, Conspiracy, Pre-Charge Investigations, and Related offenses.",
              image: "/s2.png",
              href: "/practice/white-collar-defense",
            },
          ].map((service, i) => (
            <Card
              key={i}
              className="border shadow-none overflow-hidden p-4 md:p-10 rounded-none"
            >
              <div className="relative h-74">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
              <CardContent className="p-0">
                <h3 className="  text-xl md:text-3xl mb-3">{service.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {service.desc}
                </p>
                <Link href={service.href}>
                  <Button
                    variant="outline"
                    className="border border-primary-gold  text-primary-gold hover:bg-primary-gold hover:text-white"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
