import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Separator from "@/components/Separator";

export default function ContattiPage() {
  return (
    <main className="min-h-screen bg-bianco">
      <Navbar />

      {/* Header Section */}
      <section className="px-padding-global pt-16 pb-12 mb-16 bg-blu text-bianco">
        <div className="max-w-container-medium mx-auto text-center">
          <p className="font-heading text-xl text-oro-chiaro mb-3">Bell Suites Roma</p>
          <h1 className="font-heading text-4xl md:text-6xl mb-6">Contatti & Info Utili</h1>
          <p className="text-bianco/80 text-lg max-w-2xl mx-auto">
            Siamo a tua completa disposizione per qualsiasi informazione sul tuo soggiorno a Roma, le nostre suite o le modalità di check-in.
          </p>
        </div>
      </section>

      {/* Main Info Grid */}
      <section className="px-padding-global py-16">
        <div className="max-w-container-medium mx-auto grid md:grid-cols-2 gap-12">

          {/* Card 1: Dove Siamo & Indirizzo */}
          <div className="border border-oro/40 p-8 rounded-lg bg-bianco shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-heading text-2xl text-blu mb-4">Indirizzo della Struttura</h2>
              <p className="text-grigio-scuro text-lg mb-4 font-semibold">
                Bell Suites Roma
              </p>
              <p className="text-grigio-scuro mb-6 leading-relaxed">
                Via Domodossola 23<br />
                00183 Roma (RM) - Italia
              </p>
            </div>
            <a
              href="/mappa"
              className="inline-flex items-center text-blu font-semibold hover:underline mt-4"
            >
              Visualizza sulla mappa interattiva &rarr;
            </a>
          </div>

          {/* Card 2: Contatti Diretti & Host */}
          <div className="border border-oro/40 p-8 rounded-lg bg-bianco shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-heading text-2xl text-blu mb-4">Contatti Diretti dell&apos;Host</h2>
              <p className="text-grigio-scuro mb-2">
                Host: <strong className="text-blu">Ilaria</strong>
              </p>
              <p className="text-grigio-scuro mb-6 leading-relaxed">
                Per urgenze, indicazioni stradali in tempo reale o assistenza durante il soggiorno, puoi contattarci direttamente al numero:
              </p>
              <div className="mb-6">
                <a
                  href="tel:+393331234567"
                  className="text-2xl font-heading text-blu hover:text-oro-scuro transition-colors block mb-2"
                >
                  +39 333 1234567
                </a>
                <p className="text-xs text-grigio">Disponibile anche via WhatsApp / SMS</p>
              </div>
            </div>
            <div className="pt-4 border-t border-grigio-chiarissimo flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61594115744038"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blu text-bianco px-4 py-2 rounded text-sm font-semibold hover:bg-blu/80 transition-colors"
              >
                Facebook Ufficiale
              </a>
            </div>
          </div>

        </div>
      </section>

      <Separator />

      {/* Check-in Tips Section */}
      <section className="px-padding-global pt-8 pb-32 bg-bianco">
        <div className="max-w-container-medium mx-auto">
          <h2 className="font-heading text-3xl text-blu text-center mb-4">Consigli Utili per il Check-in</h2>
          <p className="text-grigio-scuro text-center max-w-2xl mx-auto mb-12">
            Per garantirti un arrivo senza stress e iniziare al meglio il tuo soggiorno romano, ti invitiamo a seguire queste semplici indicazioni:
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-oro/30 rounded-lg bg-bianco">
              <div className="text-3xl mb-4">⏰</div>
              <h3 className="font-heading text-xl text-blu mb-2">Orari & Preavviso</h3>
              <p className="text-grigio-scuro text-sm leading-relaxed">
                Il check-in standard è disponibile dalle 14:00 in poi. Ti chiediamo di comunicarci il tuo orario d&apos;arrivo previsto o eventuali ritardi almeno 30-60 minuti prima tramite chiamata o WhatsApp.
              </p>
            </div>

            <div className="p-6 border border-oro/30 rounded-lg bg-bianco">
              <div className="text-3xl mb-4">🪪</div>
              <h3 className="font-heading text-xl text-blu mb-2">Documenti d&apos;Identità</h3>
              <p className="text-grigio-scuro text-sm leading-relaxed">
                Come richiesto dalla normativa italiana vigente, all&apos;arrivo è necessario esibire un documento d&apos;identità in corso di validità di tutti gli ospiti per la registrazione di legge.
              </p>
            </div>

            <div className="p-6 border border-oro/30 rounded-lg bg-bianco">
              <div className="text-3xl mb-4">🥐</div>
              <h3 className="font-heading text-xl text-blu mb-2">Colazione & Voucher</h3>
              <p className="text-grigio-scuro text-sm leading-relaxed">
                All&apos;arrivo ti consegneremo il voucher colazione incluso nel soggiorno, utilizzabile presso la rinomata Pasticceria Pompi (situata a pochi passi in Via Albalonga).
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
