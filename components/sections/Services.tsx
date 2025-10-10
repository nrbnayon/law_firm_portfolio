import Image from "next/image";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Services() {
  return (
    <div>
      <section className="mb-20">
        <div className="max-w-7xl mx-auto ">
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                title: "Criminal Defense",
                desc: "Federal & State Criminal Defense period Indictments, Grand Juries, Trials. Target/witness representation, pre-charge advocacy, trial.",
                image: "/s1.png",
                href: "/practice/criminal-defense",
              },
              {
                title: "White Collar Defense",
                desc: "Independent inquiries, privilege protection, remediation, and negotiations with enforcement agencies. We help clients understand their legal exposure and develop strategic solutions.",
                image: "/s2.png",
                href: "/practice/white-collar-defense",
              },
            ].map((service, i) => (
              <Card
                key={i}
                className="border shadow-none overflow-hidden p-10 rounded-none"
              >
                <div className="relative h-74">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-0">
                  <h3 className="font-georgia text-xl md:text-3xl mb-3">
                    {service.title}
                  </h3>
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
      </section>
    </div>
  );
}
