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
      <div className="relative z-10">
        <h1 className="font-heading text-4xl md:text-6xl mb-6">Bell Suites, eleganza e<br />comfort nel cuore di Roma</h1>
        <p className="text-xl mb-8 max-w-2xl">Scopri Bell Suites, nuovissima struttura boutique inaugurata nel 2026: due eleganti suite di design da 45 mq, completamente ristrutturate, in una delle zone più comode e ben collegate della capitale.</p>
        <a href="/suites/suite-1" className="inline-block bg-bianco text-blu px-8 py-3 font-semibold cursor-pointer transition-colors duration-150 hover:bg-bianco/80 hover:text-blu rounded-md">Scopri</a>
      </div>
    </section>
  );
}
