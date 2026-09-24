import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TextWithImageRight from "@/components/TextWithImageRight";
import TextWithImageLeft from "@/components/TextWithImageLeft";
import Separator from "@/components/Separator";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TextWithImageRight 
        priority
        title="Suite Palatino, un rifugio tranquillo"
        price="168 EUR a notte"
        description="La tariffa comprende: tassa di soggiorno e un voucher colazione presso Pompi (valore indicativo di circa 2,50 EUR per ospite)."
        features={[
          { text: "Docce a pioggia e bagni in marmo", icon: "shower" },
          { text: "Una cucina completamente attrezzata con macchina per espresso", icon: "kitchen" },
          { text: "Connessione Wi-Fi in fibra ottica ultra veloce (2,5 Gbps)", icon: "wifi" },
          { text: "Aria condizionata", icon: "climate" },
          { text: "Finestre insonorizzate", icon: "window_closed" }
        ]}
        imageSrc="/foto-suites/suite-1/camera_1.avif"
        imageAlt="Suite Palatino"
        suitePath="/suites/suite-1"
      />
      <Separator />
      <TextWithImageLeft 
        title="Suite Aventino, un santuario moderno"
        price="168 EUR a notte"
        description="La tariffa comprende: tassa di soggiorno e un voucher colazione presso Pompi (valore indicativo di circa 2,50 EUR per ospite)."
        features={[
          { text: "Docce a pioggia e bagni in marmo", icon: "shower" },
          { text: "Una cucina completamente attrezzata con macchina per espresso", icon: "kitchen" },
          { text: "Connessione Wi-Fi in fibra ottica ultra veloce (2,5 Gbps)", icon: "wifi" },
          { text: "Aria condizionata", icon: "climate" },
          { text: "Finestre insonorizzate", icon: "window_closed" }
        ]}
        imageSrc="/foto-suites/suite-2/camera_1.avif"
        imageAlt="Suite Aventino"
        suitePath="/suites/suite-2"
      />
      <Separator />
      <Testimonials />
      <Separator />
      <ContactForm />
      <Footer />
    </main>
  );
}
