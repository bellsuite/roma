export default function Hero() {
  return (
    <section 
      className="relative h-[calc(100vh-200px)] md:h-screen flex flex-col items-center justify-center text-center p-padding-global text-bianco"
      style={{
        backgroundImage: "url('/foto-suites/suite-1/_MG_8939.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-blu/60"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <span className="inline-block bg-oro-chiaro text-grigio-scurissimo text-xs md:text-sm font-semibold tracking-wider uppercase px-3 py-1 rounded mb-4">
          Nuovissima Apertura 2026
        </span>
        <h1 className="font-heading text-4xl md:text-6xl mb-4 leading-tight">
          Bell Suites Roma
        </h1>
        <p className="font-heading text-xl md:text-2xl mb-6 max-w-2xl mx-auto text-bianco">
          A soli 4 minuti a piedi dalla Metro A (Re di Roma)
        </p>
        <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto text-bianco/90 leading-relaxed">
          Due eleganti suite di design da 45 mq, completamente ristrutturate. La posizione strategica perfetta per vivere Roma, collegata direttamente a <strong>San Giovanni, il Colosseo e Piazza di Spagna</strong>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#contact-form" className="w-full sm:w-auto inline-block bg-oro-chiaro text-grigio-scurissimo px-8 py-3 font-semibold cursor-pointer transition-colors duration-150 hover:opacity-80 rounded-md">
            Prenota Ora
          </a>
          <a href="/suites/suite-1" className="w-full sm:w-auto inline-block bg-transparent border border-bianco text-bianco px-8 py-3 font-semibold cursor-pointer transition-colors duration-150 hover:bg-bianco hover:text-blu rounded-md">
            Scopri le Suite
          </a>
        </div>
      </div>
    </section>
  );
}

