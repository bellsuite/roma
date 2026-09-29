import React from 'react';

export default function TiramisuVoucher() {
  return (
    <section className="px-padding-global py-section-padding-medium bg-bianco">
      <div className="max-w-container-large mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Text side */}
        <div className="space-y-8">
          <h2 className="text-4xl lg:text-5xl font-heading text-blu leading-tight">
            il tuo soggiorno include la colazione presso Pompi dove gusterete il miglior Tiramisù di Roma.
          </h2>
          <p className="text-lg text-grigio-scurissimo  leading-relaxed">
            Si trova a due minuti a piedi dalla tua suite.
          </p>
        </div>

        {/* Image side */}
        <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[600px] w-full overflow-hidden rounded-md">
          <img 
            src="/pompi.avif" 
            alt="Colazione da Pompi" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

