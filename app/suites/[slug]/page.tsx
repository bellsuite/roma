import Image from "next/image";
import Navbar from "@/components/Navbar";
import Separator from "@/components/Separator";
import SuitesGeneralDescription from "@/components/SuitesGeneralDescription";
import SuiteAmenities from "@/components/SuiteAmenities";
import TiramisuVoucher from "@/components/TiramisuVoucher";
import ContactForm from "@/components/ContactForm";
import PointsOfInterest from "@/components/PointsOfInterest";
import Footer from "@/components/Footer";
import SuiteGallery from "@/components/SuiteGallery";
const suitesData: { [key: string]: { name: string; photos: string[]; video?: string } } = {
  "suite-1": {
    name: "Suite Uno",
    photos: [
      "/foto-suites/suite-1/_MG_8939.avif",
      "/foto-suites/suite-1/_MG_8932.avif",
      "/foto-suites/suite-1/_MG_8933.avif",
      "/foto-suites/suite-1/_MG_8934.avif",
      "/foto-suites/suite-1/_MG_8936.avif",
      "/foto-suites/suite-1/_MG_8938.avif",
      "/foto-suites/suite-1/_MG_8931.avif",
      "/foto-suites/suite-1/_MG_8940.avif",
      "/foto-suites/suite-1/_MG_8941.avif",
      "/foto-suites/suite-1/_MG_8956.avif",
    ],
    video: "/foto-suites/suite-1/video-app1.mp4",
  },
  "suite-2": {
    name: "Suite Due",
    photos: [
      "/foto-suites/suite-2/_MG_8945.avif",
      "/foto-suites/suite-2/_MG_8946.avif",
      "/foto-suites/suite-2/_MG_8947.avif",
      "/foto-suites/suite-2/_MG_8948.avif",
      "/foto-suites/suite-2/_MG_8951.avif",
      "/foto-suites/suite-2/_MG_8952.avif",
      "/foto-suites/suite-2/_MG_8953.avif",
      "/foto-suites/suite-2/_MG_8954.avif",
      "/foto-suites/suite-2/_MG_8955.avif",
      "/foto-suites/suite-2/_MG_8959.avif",
    ],
    video: "/foto-suites/suite-2/video-app2.mp4",
  },
};

export default async function SuitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const suite = suitesData[slug];

  if (!suite) {
    return <div>Suite non trovata</div>;
  }

  // Combine photos and video into a single media array for the gallery, placing video as the 4th item (index 3)
  const media = [...suite.photos];
  if (suite.video) {
    media.splice(3, 0, suite.video);
  }

  return (
    <main className="min-h-screen bg-bianco">
      <Navbar />
      
      <section className="px-padding-global py-16 text-center">
        <h1 className="font-heading text-4xl md:text-5xl text-blu mb-8">Suite romane con un assaggio di dolce vita</h1>
        
        <div className="flex justify-center gap-4 mb-16">
          <a href="/suites/suite-1" className={`px-8 py-3 rounded-md ${slug === 'suite-1' ? 'bg-blu text-bianco' : 'bg-grigio-chiarissimo text-blu'}`}>Suite Uno</a>
          <a href="/suites/suite-2" className={`px-8 py-3 rounded-md ${slug === 'suite-2' ? 'bg-blu text-bianco' : 'bg-grigio-chiarissimo text-blu'}`}>Suite Due</a>
        </div>


        <SuiteGallery media={media} name={suite.name} />

      </section>

      <SuitesGeneralDescription />
      <SuiteAmenities />
      <Separator />
      <TiramisuVoucher />
      <PointsOfInterest />
      <ContactForm />      
      <Footer />
    </main>
  );
}
