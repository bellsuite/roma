import React from 'react';

const points = [
  { number: '2', description: 'Minuti a piedi dalla pasticceria Pompi' },
  { number: '15', description: 'Minuti di cammino da Piazza Navona' },
  { number: '4', description: 'Metropolitana Linea A fermata Re di Roma' },
  { number: '5', description: 'Minuti per il Colosseo in taxi' },
  { number: '10', description: 'Minuti dal parco di Villa Borghese' },
  { number: '15', description: 'Minuti dalla Basilica di San Pietro' },
];

export default function PointsOfInterest() {
  return (
    <section className="relative w-full py-section-padding-large px-padding-global bg-blu my-24">
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
        <h2 className="text-3xl md:text-5xl font-sans text-white mb-16 text-center">
          Punti di interesse nelle vicinanze
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-16 md:gap-y-20">
          {points.map((point, index) => (
            <div key={index} className="flex items-start pl-6 border-l border-white">
              <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xs py-4">
                <span className="text-6xl md:text-7xl font-heading text-white mb-4">
                  {point.number}
                </span>
                <p className="text-lg md:text-xl font-light text-white leading-relaxed">
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
