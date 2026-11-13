import Separator from "@/components/Separator";
import { getDictionary } from "@/app/dictionaries";
import Image from 'next/image';

export default async function ContattiPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'it' | 'en');
  const c = dict.contatti;

  return (
    <main className="min-h-screen bg-bianco">
      {/* Header Section */}
      <section className="px-padding-global pt-16 pb-12 mb-16 bg-blu text-bianco">
        <div className="max-w-container-medium mx-auto text-center">
          <p className="font-heading text-xl text-oro-chiaro mb-3">{c.badge}</p>
          <h1 className="font-heading text-4xl md:text-6xl mb-6">{c.title}</h1>
          <p className="text-bianco/80 text-lg max-w-2xl mx-auto">{c.subtitle}</p>
        </div>
      </section>

      {/* Main Info Grid */}
      <section className="px-padding-global py-16">
        <div className="max-w-container-medium mx-auto grid md:grid-cols-2 gap-12">

          {/* Card 1: Dove Siamo & Indirizzo */}
          <div className="border border-oro/40 p-8 rounded-lg bg-bianco shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-heading text-2xl text-blu mb-4">{c.addressTitle}</h2>
              <p className="text-grigio-scuro text-lg mb-4 font-semibold">
                {c.addressName}
              </p>
              <p className="text-grigio-scuro mb-6 leading-relaxed whitespace-pre-line">
                {c.addressText}
              </p>
              <a href={`/${lang}/mappa`}>
                <Image
                  src="/banner-indirizzo.avif"
                  alt="Banner Indirizzo"
                  width={500}
                  height={300}
                  className="mb-4 cursor-pointer"
                />
              </a>
            </div>
            <a
              href={`/${lang}/mappa`}
              className="inline-flex items-center text-blu font-semibold hover:underline mt-4"
            >
              {c.mapLink}
            </a>
          </div>

          {/* Card 2: Contatti Diretti & Host */}
          <div className="border border-oro/40 p-8 rounded-lg bg-bianco shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-heading text-2xl text-blu mb-4">{c.hostTitle}</h2>
              <p className="text-grigio-scuro mb-2">
                Host: <strong className="text-blu">{c.host}</strong>
              </p>
              <p className="text-grigio-scuro mb-6 leading-relaxed">
                {c.hostDesc}
              </p>
              <div className="mb-6">
                <a
                  href="tel:+39 3920261228"
                  className="text-2xl font-heading text-blu hover:text-oro-scuro transition-colors block mb-1 cursor-pointer"
                >
                  +39 3920261228
                </a>
                <p className="text-xs text-grigio mb-4">{c.whatsapp}</p>

                <a
                  href="mailto:info@bellsuites.it"
                  className="text-xl font-heading text-blu hover:text-oro-scuro transition-colors block mb-1 cursor-pointer"
                >
                  info@bellsuites.it
                </a>
                <p className="text-xs text-grigio">{c.emailLabel}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-grigio-chiarissimo flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61594115744038"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blu text-bianco px-4 py-2 rounded text-sm font-semibold hover:bg-blu/80 transition-colors"
              >
                {c.facebook}
              </a>
            </div>
          </div>

        </div>
      </section>

      <Separator />

      {/* Check-in Tips Section */}
      <section className="px-padding-global pt-8 pb-32 bg-bianco">
        <div className="max-w-container-medium mx-auto">
          <h2 className="font-heading text-3xl text-blu text-center mb-4">{c.tipsTitle}</h2>
          <p className="text-grigio-scuro text-center max-w-2xl mx-auto mb-12">
            {c.tipsDesc}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-oro/30 rounded-lg bg-bianco">
              <div className="text-3xl mb-4">⏰</div>
              <h3 className="font-heading text-xl text-blu mb-2">{c.t1Title}</h3>
              <p className="text-grigio-scuro text-sm leading-relaxed">
                {c.t1Desc}
              </p>
            </div>

            <div className="p-6 border border-oro/30 rounded-lg bg-bianco">
              <div className="text-3xl mb-4">🪪</div>
              <h3 className="font-heading text-xl text-blu mb-2">{c.t2Title}</h3>
              <p className="text-grigio-scuro text-sm leading-relaxed">
                {c.t2Desc}
              </p>
            </div>

            <div className="p-6 border border-oro/30 rounded-lg bg-bianco">
              <div className="text-3xl mb-4">🥐</div>
              <h3 className="font-heading text-xl text-blu mb-2">{c.t3Title}</h3>
              <p className="text-grigio-scuro text-sm leading-relaxed">
                {c.t3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
