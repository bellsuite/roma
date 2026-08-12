import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-blu text-bianco px-padding-global py-16">
      <div className="max-w-container-large mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Image src="/logo.svg" alt="Bell Suites Logo" width={144} height={48} className="brightness-0 invert" />
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Apartments</h4>
            <ul className="space-y-4 text-bianco/80">
              <li><a href="#" className="hover:text-bianco">Apartment One</a></li>
              <li><a href="#" className="hover:text-bianco">Apartment Two</a></li>
              <li><a href="#" className="hover:text-bianco">Book now</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">The area</h4>
            <ul className="space-y-4 text-bianco/80">
              <li><a href="#" className="hover:text-bianco">San Giovanni</a></li>
              <li><a href="#" className="hover:text-bianco">Restaurants</a></li>
              <li><a href="#" className="hover:text-bianco">Map</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-bianco/80">
              <li><a href="#" className="hover:text-bianco">Privacy</a></li>
              <li><a href="#" className="hover:text-bianco">Cookies</a></li>
              <li><a href="#" className="hover:text-bianco">Terms</a></li>
              <li><a href="#" className="hover:text-bianco">Disclaimer</a></li>
              <li><a href="#" className="hover:text-bianco">Sitemap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Follow us</h4>
            <ul className="space-y-4 text-bianco/80">
              <li><a href="#" className="hover:text-bianco">Instagram</a></li>
              <li><a href="#" className="hover:text-bianco">Facebook</a></li>
              <li><a href="#" className="hover:text-bianco">Pinterest</a></li>
              <li><a href="#" className="hover:text-bianco">YouTube</a></li>
              <li><a href="#" className="hover:text-bianco">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-bianco/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 text-sm">
            <div className="flex gap-4">
              <p>&copy; 2026 Bell Suites Rome. All rights reserved.</p>
              <a href="#" className="underline hover:text-bianco">Privacy Policy</a>
              <a href="#" className="underline hover:text-bianco">Terms of Service</a>
              <a href="#" className="underline hover:text-bianco">Cookies Settings</a>
            </div>
            <div className="flex gap-4 text-xl">
              {/* Simple placeholder social icons */}
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="X">X</a>
              <a href="#" aria-label="LinkedIn">LI</a>
              <a href="#" aria-label="YouTube">YT</a>
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
