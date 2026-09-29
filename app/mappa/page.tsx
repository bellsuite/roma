import Navbar from "@/components/Navbar";
import InteractiveMap from "@/components/InteractiveMap";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Separator from "@/components/Separator";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-bianco">
      <Navbar />
      
      <section className="px-padding-global pt-16 pb-8 text-center bg-bianco">
        <h1 className="font-heading text-4xl md:text-5xl text-blu mb-4">Posizione e Dintorni</h1>
        <p className="text-grigio max-w-2xl mx-auto text-base md:text-lg">
          Vivi Roma con comodità: esplora la mappa interattiva e scopri tutti i luoghi d'interesse, i trasporti e i locali vicini alle nostre suite.
        </p>
      </section>

      <InteractiveMap />

      <Separator />
      <ContactForm />
      <Footer />
    </main>
  );
}
