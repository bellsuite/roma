import InteractiveMap from "@/components/InteractiveMap";
import PointsOfInterest from "@/components/PointsOfInterest";
import { getDictionary } from "@/app/dictionaries";

export default async function MapPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'it' | 'en');
  const m = dict.mappa;

  return (
    <main className="min-h-screen bg-bianco">
      <section aria-labelledby="interactive-map-title" className="w-full bg-bianco pt-16 text-center md:text-left">
        <div className="mx-auto w-[calc(100%-24px)] max-w-[1200px] sm:w-[calc(100%-40px)]">
          <p className="font-heading text-2xl text-oro-scuro mb-4">
            {m.subtitle}
          </p>
          <h1
            id="interactive-map-title"
            className="m-0 font-serif text-4xl font-normal leading-[1.05] text-blu sm:text-5xl"
          >
            {m.title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-grigio-scuro sm:text-base">
            {m.description}
          </p>
        </div>
      </section>

      <InteractiveMap />

      <PointsOfInterest lang={lang} />
    </main>
  );
}
