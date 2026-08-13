import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TextWithImageRight from "@/components/TextWithImageRight";
import TextWithImageLeft from "@/components/TextWithImageLeft";
import Separator from "@/components/Separator";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Voucher from "@/components/Voucher";
import PointsOfInterest from "@/components/PointsOfInterest";
import SuitesGeneralDescription from "@/components/SuitesGeneralDescription";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TextWithImageRight 
        priority
        title="Suite one, a quiet refuge"
        price="160 EUR a notte"
        description="La tariffa comprende: tassa di soggiorno e un voucher colazione presso Pompi (valore indicativo di circa 2,50 EUR per ospite)."
        features={[
          { text: "Rainfall showers and marble bathrooms", icon: "shower" },
          { text: "A fully equipped kitchen with a espresso machine", icon: "kitchen" },
          { text: "Connessione Wi-Fi in fibra ottica ultra veloce (2,5 Gbps)", icon: "wifi" },
          { text: "Aria condizionata", icon: "climate" }
        ]}
        imageSrc="/foto-suites/suite-1/_MG_8939.avif"
        imageAlt="Suite 1"
        suitePath="/suites/suite-1"
      />
      <Separator />
      <TextWithImageLeft 
        title="Suite two, a modern sanctuary"
        price="175 EUR a notte"
        description="La tariffa comprende: tassa di soggiorno e un voucher colazione presso Pompi (valore indicativo di circa 2,50 EUR per ospite)."
        features={[
          { text: "Rainfall showers and marble bathrooms", icon: "shower" },
          { text: "A fully equipped kitchen with a espresso machine", icon: "kitchen" },
          { text: "Connessione Wi-Fi in fibra ottica ultra veloce (2,5 Gbps)", icon: "wifi" },
          { text: "Aria condizionata", icon: "climate" }
        ]}
        imageSrc="/foto-suites/suite-2/_MG_8945.avif"
        imageAlt="Suite 2"
        suitePath="/suites/suite-2"
      />
      <SuitesGeneralDescription />
      <SuitesGeneralDescription />
      <Separator />
      <Voucher 
        title="Voucher Colazione Omaggio"
        subtitle="Un dolce risveglio"
        code="BSR-POMPI-2026"
        value="€ 5.00"
        description="Valido per una colazione completa presso la rinomata pasticceria Pompi, a pochi passi dalle Bell Suites."
      />
      <PointsOfInterest 
        title="Cosa vedere nei dintorni"
        points={[
          { title: "Metro Re di Roma (Linea A)", distance: "150m", description: "Collegamento diretto con il centro storico e le principali stazioni." },
          { title: "Basilica di San Giovanni", distance: "800m", description: "Una delle quattro basiliche papali di Roma." },
          { title: "Colosseo", distance: "2.5km", description: "Il simbolo eterno della città eterna." }
        ]}
      />
      <Separator />
      <ContactForm />
      <Footer />
    </main>
  );
}
