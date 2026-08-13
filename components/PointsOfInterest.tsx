import React from 'react';

interface PointOfInterest {
  title: string;
  distance: string;
  description?: string;
}

interface PointsOfInterestProps {
  title: string;
  points: PointOfInterest[];
}

export default function PointsOfInterest({ title, points }: PointsOfInterestProps) {
  return (
    <section className="px-padding-global bg-bianco">
      <div className="max-w-container-medium mx-auto py-section-padding-medium">
        <h3 className="font-heading text-3xl md:text-4xl text-blu mb-12">{title}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {points.map((point, index) => (
            <div key={index} className="flex flex-col gap-2 border-b-1 border-grigio-chiaro pb-6">
              <div className="flex justify-between items-baseline">
                <h4 className="font-heading text-xl text-blu">{point.title}</h4>
                <span className="text-sm font-semibold text-oro">{point.distance}</span>
              </div>
              {point.description && (
                <p className="text-grigio-scuro text-base">{point.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
