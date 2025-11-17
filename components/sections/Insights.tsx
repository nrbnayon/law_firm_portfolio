// components/sections/Insights.tsx
"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/sections/hero";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchInsights } from "@/redux/features/insights/insightsSlice";

const fallbackCaseResults = [
  {
    _id: "fallback-1",
    type: "Criminal Defense",
    title: "Not Guilty Verdict in State Felony Trial",
    description:
      "Defended client against serious felony charges carrying potential 15-year sentence.",
    outcome: "Full acquittal after week-long jury trial.",
    status: "active" as const,
  },
  {
    _id: "fallback-2",
    type: "White Collar Defense",
    title: "Federal Securities Fraud Charges Dismissed",
    description:
      "Represented CEO of publicly traded company charged with securities fraud and insider trading.",
    outcome:
      "All charges dismissed after motion to suppress evidence was granted.",
    status: "active" as const,
  },
];

export default function Insights() {
  const [filter, setFilter] = useState("All");
  const dispatch = useAppDispatch();
  const { insights, isLoading } = useAppSelector((state) => state.insights);

  // Fetch insights on mount
  useEffect(() => {
    dispatch(fetchInsights({ status: "active" }));
  }, [dispatch]);

  // Use API data if available, otherwise use fallback
  const caseResults = insights.length > 0 ? insights : fallbackCaseResults;

  // Get unique practice areas/types
  const practiceAreas = [
    "All",
    ...new Set(caseResults.map((insight) => insight.type)),
  ];

  const filteredResults =
    filter === "All"
      ? caseResults
      : caseResults.filter((insight) => insight.type === filter);

  return (
    <div className="mb-10 md:mb-40">
      <Hero
        title="Insights"
        subtitle="A selection of our non-confidential case outcomes that demonstrate our experience and capabilities."
        imageSrc="/insight.png"
        darkBg={false}
        height="min-h-[40vh] md:min-h-[50vh]"
        padding="pt-20"
      />

      <section className="py-10 md:py-24">
        <div className="max-w-7xl mx-auto px-3">
          <div className="mb-12">
            <h2 className="font-bold text-xl md:text-3xl mb-3">
              Request a Consultation
            </h2>
            <p className="text-lg text-text-medium leading-relaxed my-5 bg-[#F9FAFB] py-6 pl-5">
              The insights below are not legal advice. To obtain legal advice,
              please contact our office. Past results do not guarantee future
              outcomes.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="  font-bold text-xl mb-5 md:mb-10">
              Filter by Practice Area:
            </h3>
            <div className="flex flex-wrap gap-4">
              {practiceAreas.map((option) => (
                <button
                  key={option}
                  onClick={() => setFilter(option)}
                  className="px-6 py-2 text-base font-medium transition-colors"
                  style={{
                    backgroundColor:
                      filter === option ? "var(--dark-bg)" : "transparent",
                    color:
                      filter === option
                        ? "var(--text-white)"
                        : "var(--text-dark)",
                    border: "1px solid var(--dark-bg)",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResults.map((result) => (
              <Card
                key={result._id}
                className="border rounded-none shadow-[0px_4px_50px_0px_#00000014] hover:shadow-2xl p-0"
                style={{
                  backgroundColor: "var(--text-white)",
                  borderColor: "var(--light-bg-tertiary)",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4 text-xl font-medium text-[#DD9D5C]">
                    <Image
                      src="/justice.svg"
                      alt="logo"
                      width={50}
                      height={50}
                      quality={100}
                    />
                    <span>{result.type}</span>
                  </div>

                  <div className="w-full border-b border-[#E0E0E0] mb-3">
                    <h3 className="font-bold text-xl md:text-2xl mb-4">
                      {result.title}
                    </h3>
                    <p className="text-lg leading-relaxed mb-4 text-gray">
                      {result.description}
                    </p>
                  </div>
                  <p className="text-lg font-medium">
                    <span className="font-semibold">Outcome:</span>{" "}
                    {result.outcome}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
