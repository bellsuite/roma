import Navbar from "@/components/Navbar";
import InteractiveMap from "@/components/InteractiveMap";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Separator from "@/components/Separator";
import PointsOfInterest from "@/components/PointsOfInterest";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-bianco">
      <Navbar />

      <section aria-labelledby="interactive-map-title" className="w-full bg-bianco pt-16 text-center md:text-left">
        <div className="mx-auto w-[calc(100%-24px)] max-w-[1200px] sm:w-[calc(100%-40px)]">
            <p className="font-heading text-2xl text-oro-scuro mb-4">
              Scopri dove ci troviano e i punti di interesse più vicini alle suites:
            </p>
            <h1
              id="interactive-map-title"
              className="m-0 font-serif text-4xl font-normal leading-[1.05] text-blu sm:text-5xl"
            >
              Il B&B nel cuore di Roma
            </h1>
            <p className="mt-4 text-sm leading-7 text-grigio-scuro sm:text-base">
              Bell Suites Roma si trova in una posizione privilegiata, a due passi dalla metro Re di Roma e dai principali monumenti della città.
            </p>
        </div>
      </section>

      <InteractiveMap />

      <PointsOfInterest />

      <Separator />
      <ContactForm />
      <Footer />
    </main>
  );
}