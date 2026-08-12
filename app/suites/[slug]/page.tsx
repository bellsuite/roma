import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const suitesData: { [key: string]: { name: string; photos: string[] } } = {
  "suite-1": {
    name: "Suite 1",
    photos: [
      "/foto-suites/suite-1/_MG_8931.avif",
      "/foto-suites/suite-1/_MG_8932.avif",
      "/foto-suites/suite-1/_MG_8933.avif",
      "/foto-suites/suite-1/_MG_8934.avif",
    ],
  },
  "suite-2": {
    name: "Suite 2",
    photos: [
      "/foto-suites/suite-2/_MG_8945.avif",
      "/foto-suites/suite-2/_MG_8946.avif",
      "/foto-suites/suite-2/_MG_8947.avif",
      "/foto-suites/suite-2/_MG_8948.avif",
    ],
  },
};

export default async function SuitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const suite = suitesData[slug];

  if (!suite) {
    return <div>Suite non trovata</div>;
  }

  return (
    <main className="min-h-screen bg-bianco">
      <Navbar />
      
      <section className="px-padding-global py-16 text-center">
        <h1 className="font-heading text-5xl text-blu mb-8">A Roman suites with a taste of the dolce vita</h1>
        
        <div className="flex justify-center gap-4 mb-16">
          <a href="/suites/suite-1" className={`px-8 py-3 rounded-md ${slug === 'suite-1' ? 'bg-blu text-bianco' : 'bg-grigio-chiarissimo text-blu'}`}>Suite 1</a>
          <a href="/suites/suite-2" className={`px-8 py-3 rounded-md ${slug === 'suite-2' ? 'bg-blu text-bianco' : 'bg-grigio-chiarissimo text-blu'}`}>Suite 2 {'>'}</a>
        </div>


        <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4 max-w-container-large mx-auto">
          {/* Main Large Photo */}
          <div className="relative aspect-[3/4] md:aspect-auto md:row-span-2 rounded-md overflow-hidden">
            <Image 
              src={suite.photos[0]} 
              alt={suite.name} 
              fill 
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover" 
            />
          </div>
          
          {/* Smaller Photos */}
          {suite.photos.slice(1, 3).map((photo, index) => (
            <div key={index} className="relative aspect-video rounded-md overflow-hidden">
              <Image 
                src={photo} 
                alt={`${suite.name} ${index + 2}`} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover" 
              />
            </div>
          ))}
        </div>


      </section>

      <Footer />
    </main>
  );
}
