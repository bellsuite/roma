import React from 'react';

interface VoucherProps {
  title: string;
  subtitle?: string;
  code: string;
  value: string;
  description: string;
}

export default function Voucher({ title, subtitle, code, value, description }: VoucherProps) {
  return (
    <section className="px-padding-global bg-bianco">
      <div className="max-w-max-width-medium mx-auto py-section-padding-medium border-1 border-nero p-8 md:p-12">
        <h5 className="font-heading text-xl md:text-2xl text-blu mb-2">{title}</h5>
        {subtitle && <p className="text-grigio-scuro mb-6">{subtitle}</p>}
        
        <div className="font-heading text-[60px] md:text-[96px] text-oro mb-4 leading-none">
          {value}
        </div>
        
        <p className="text-grigio-scuro mb-6">{description}</p>
        
        <div className="border-t-1 border-dashed border-grigio-chiaro pt-6 mt-6">
          <p className="text-sm text-grigio">Codice voucher:</p>
          <span className="font-bold text-blu text-xl">{code}</span>
        </div>
      </div>
    </section>
  );
}
