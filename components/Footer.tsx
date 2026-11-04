import Image from "next/image";
import { getDictionary } from "@/app/dictionaries";

export default async function Footer({ lang = "it" }: { lang?: string }) {
  const dict = await getDictionary(lang as 'it' | 'en');
  const f = dict.footer;

  return (
    <footer className="bg-blu text-bianco px-padding-global py-16">
      <div className="max-w-container-large mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Logo Column */}
          <div className="col-span-1">
            <img src="/logo.svg" alt="Logo Bell Suites" className="w-[144px] h-auto object-contain" />
          </div>
          {/* Empty Column for Mobile */}
          <div className="col-span-1 block md:hidden"></div>

          <div className="col-span-1">
            <h3 className="font-body font-semibold text-lg mb-6">{f.suites}</h3>
            <ul className="space-y-4 text-bianco/80">
              <li><a href={`/${lang}/suites/suite-1`} className="hover:text-bianco">{f.suitePalatino}</a></li>
              <li><a href={`/${lang}/suites/suite-2`} className="hover:text-bianco">{f.suiteAventino}</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-body font-semibold text-lg mb-6">{f.zone}</h3>
            <ul className="space-y-4 text-bianco/80">
              <li><a href={`/${lang}/mappa`} className="hover:text-bianco">{f.map}</a></li>
              <li><a href={`/${lang}/contatti`} className="hover:text-bianco">{f.contact}</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-body font-semibold text-lg mb-6">{f.follow}</h3>
            <ul className="space-y-4 text-bianco/80">
              <li><a target="_blank" href="https://www.facebook.com/profile.php?id=61594115744038" className="hover:text-bianco">{f.facebook}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-bianco/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 text-sm">
            <div className="flex gap-4">
              <p>&copy; 2026 Bell Suites Roma. {f.rights}</p>
            </div>
          </div>

          <div className="text-xs text-bianco/60 space-y-1">
            <p>CIR: 058091-CAV-17282 | CIN: IT058091B4YXH78MUS | Nome della struttura: Bell Suites | Codice fiscale del titolare: NNBLRI71B67H501R | Codice ISTAT Regione: 12</p>
            <p>Codice ISTAT Provincia: 058 | Codice ISTAT Comune: 091 | Codice ISTAT Categoria: B4</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
