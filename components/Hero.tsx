import { getDictionary } from "@/app/dictionaries";

export default async function Hero({ lang = 'it' }: { lang?: string }) {
  const dict = await getDictionary(lang as 'it' | 'en');
  const h = dict.hero;

  return (
    <section
      className="relative h-[calc(100vh-200px)] md:h-screen flex flex-col items-center justify-center text-center p-padding-global text-bianco"
      style={{
        backgroundImage: "url('/foto-suites/suite-1/camera_1.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-blu/60"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <span className="inline-block bg-oro-chiaro text-grigio-scurissimo text-xs md:text-sm font-semibold tracking-wider uppercase px-3 py-1 rounded mb-4">
          {h.badge}
        </span>
        <h1 className="font-heading text-4xl md:text-6xl mb-4 leading-tight">
          {h.title}
        </h1>
        <p className="font-heading text-xl md:text-2xl mb-6 max-w-2xl mx-auto text-bianco">
          {h.subtitle}
        </p>
        <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto text-bianco/90 leading-relaxed">
          {h.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href={`/${lang}/suites/suite-1`} className="w-full sm:w-auto inline-block bg-transparent border border-bianco text-bianco px-8 py-3 font-semibold cursor-pointer transition-colors duration-150 hover:bg-bianco hover:text-blu rounded-md">
            {h.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
