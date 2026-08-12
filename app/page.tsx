import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TextWithImageRight from "@/components/TextWithImageRight";
import TextWithImageLeft from "@/components/TextWithImageLeft";
import Separator from "@/components/Separator";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

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
      <ContactForm />
      <Footer />
    </main>
  );
}
