import Image from "next/image";
import React from "react";

export default function OurApproach() {
  return (
    <section className="py-5 md:py-10 bg-white mb-20 md:mb-40">
      <div className="max-w-7xl mx-auto px-3 py-10 bg-light-bg-tertiary">
        <div className="text-center mb-5 md:mb-10 border-b-1 pb-4 md:pb-0 md:border-0">
          <h2 className="  font-bold text-4xl md:text-5xl mb-3">
            Our Approach
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Four principles guide our practice and ensure exceptional client
            representation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-5">
          {[
            {
              icon: "/a1.svg",
              title: "Disciplined Advocacy",
              desc: "We fight relentlessly to protect our clients' rights and interests, leaving no stone unturned in pursuit of the best possible outcome.",
            },
            {
              icon: "/a2.svg",
              title: "Investigation",
              desc: "We conduct exhaustive factual and legal research to develop comprehensive case strategies and uncover crucial evidence.",
            },
            {
              icon: "/a3.svg",
              title: "Strategic Counsel",
              desc: "We provide clear strategic advice tailored to each client's unique situation, helping navigate complex legal challenges.",
            },
            {
              icon: "/a4.svg",
              title: "Legal Excellence",
              desc: "Our attorneys bring long-time expertise and continually hone their skills to remain at the forefront of criminal law developments.",
            },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center mb-4">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={100}
                  height={100}
                  quality={100}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="  text-xl md:text-2xl mb-3 font-bold">
                {item.title}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
