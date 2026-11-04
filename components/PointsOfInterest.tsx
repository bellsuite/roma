import React from 'react';
import { getDictionary } from "@/app/dictionaries";

export default async function PointsOfInterest({ lang = 'it' }: { lang?: string }) {
  const dict = await getDictionary(lang as 'it' | 'en');
  const poi = dict.pointsOfInterest;

  return (
    <section className="relative w-full py-section-padding-large px-padding-global bg-blu mt-24">
      {/* Hero Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/vespa.avif"
          alt="Roma"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blu/60"></div>
      </div>

      <div className="relative z-10 max-w-container-large mx-auto py-24">
        <h2 className="text-3xl md:text-5xl font-sans text-white mb-16">
          {poi.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-16 md:gap-y-20">
          {poi.points.map((point: { number: string; description: string }, index: number) => (
            <div key={index} className="flex items-start pl-6 border-l border-white">
              <div className="flex flex-col items-left md:items-start max-w-xs py-4">
                <span className="text-6xl md:text-8xl font-heading text-white mb-4">
                  {point.number}
                </span>
                <p className="text-lg md:text-xl font-heading font-semibold text-white leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
