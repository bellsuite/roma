import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-blu text-bianco px-padding-global py-16">
      <div className="max-w-container-large mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          {/* Logo Column */}
          <div className="col-span-1">
            <img src="/logo.svg" alt="Logo Bell Suites" className="w-[144px] h-auto object-contain" />
          </div>
          {/* Empty Column for Mobile */}
          <div className="col-span-1 block md:hidden"></div>

          <div className="col-span-1">
            <h3 className="font-body font-semibold text-lg mb-6">Le Suite</h3>
            <ul className="space-y-4 text-bianco/80">
              <li><a href="/suites/suite-1" className="hover:text-bianco">Suite Palatino</a></li>
              <li><a href="/suites/suite-2" className="hover:text-bianco">Suite Aventino</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-body font-semibold text-lg mb-6">La zona</h3>
            <ul className="space-y-4 text-bianco/80">
              <li><a href="/mappa" className="hover:text-bianco">Mappa</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-body font-semibold text-lg mb-6">Legale</h3>
            <ul className="space-y-4 text-bianco/80">
              <li><a href="#" className="hover:text-bianco">Privacy</a></li>
              <li><a href="#" className="hover:text-bianco">Cookies</a></li>
              <li><a href="#" className="hover:text-bianco">Termini</a></li>
              <li><a href="#" className="hover:text-bianco">Disclaimer</a></li>
              <li><a href="#" className="hover:text-bianco">Mappa del sito</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-body font-semibold text-lg mb-6">Seguici</h3>
            <ul className="space-y-4 text-bianco/80">
              <li><a target="_blank" href="https://www.facebook.com/profile.php?id=61594115744038" className="hover:text-bianco">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-bianco/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 text-sm">
            <div className="flex gap-4">
              <p>&copy; 2026 Bell Suites Roma. Tutti i diritti riservati.</p>
              <a href="#" className="underline hover:text-bianco">Privacy Policy</a>
              <a href="#" className="underline hover:text-bianco">Termini di servizio</a>
              <a href="#" className="underline hover:text-bianco">Impostazioni Cookies</a>
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
