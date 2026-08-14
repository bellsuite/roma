import React from 'react';

export default function TiramisuVoucher() {
  return (
    <section className="px-padding-global py-section-padding-medium bg-bianco">
      <div className="max-w-container-large mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Text side */}
        <div className="space-y-8">
          <h2 className="text-4xl lg:text-5xl font-heading text-blu leading-tight">
            Il tuo soggiorno include un voucher per il miglior tiramisù di Roma, offerto da noi
          </h2>
          <p className="text-lg text-grigio-scurissimo  leading-relaxed">
            Si trova a due minuti a piedi dalla tua porta. Il caffè è forte e i pasticcini sono preparati prima dell'alba.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-oro">
            <div>
              <h6 className="font-heading text-xl mb-2 text-blu font-semibold">Il tiramisù</h6>
              <p className="text-base text-grigio-scurissimo">Lo preparano allo stesso modo dal 1960. È il motivo per cui le persone attraversano la città.</p>
            </div>
            <div>
              <h6 className="font-heading text-xl mb-2 text-blu font-semibold">Il cornetto</h6>
              <p className="text-base text-grigio-scurissimo">Caldo, fragrante e ripieno di crema. Mangialo al banco come un vero romano.</p>
            </div>
          </div>
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

