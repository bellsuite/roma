import Separator from "@/components/Separator";
import SuitesGeneralDescription from "@/components/SuitesGeneralDescription";
import SuiteAmenities from "@/components/SuiteAmenities";
import TiramisuVoucher from "@/components/TiramisuVoucher";
import PointsOfInterest from "@/components/PointsOfInterest";
import SuiteGallery from "@/components/SuiteGallery";
import { getDictionary } from "@/app/dictionaries";

const suitesData: { [key: string]: { name: string; photos: string[]; video?: string } } = {
  "suite-1": {
    name: "Suite Palatino",
    photos: [
      "/foto-suites/suite-1/camera_1.avif",
      "/foto-suites/suite-1/soggiorno_1.avif",
      "/foto-suites/suite-1/bagno-1.avif",
      "/foto-suites/suite-1/camera_2.avif",
      "/foto-suites/suite-1/camera_3.avif",
      "/foto-suites/suite-1/soggiorno_2.avif",
      "/foto-suites/suite-1/soggiorno_3.avif",
      "/foto-suites/suite-1/cucina_1.avif",
      "/foto-suites/suite-1/cucina_2.avif",
      "/foto-suites/suite-1/cucina_3.avif",
      "/foto-suites/suite-1/bagno-2.avif",
      "/foto-suites/suite-1/bagno-3.avif",
      "/foto-suites/suite-1/entrata_1.avif",
      "/foto-suites/suite-1/entrata_2.avif",
    ],
    video: "/foto-suites/suite-1/video-app1.mp4",
  },
  "suite-2": {
    name: "Suite Aventino",
    photos: [
      "/foto-suites/suite-2/camera_1.avif",
      "/foto-suites/suite-2/soggiorno_1.avif",
      "/foto-suites/suite-2/bagno_1.avif",
      "/foto-suites/suite-2/camera_2.avif",
      "/foto-suites/suite-2/camera_3.avif",
      "/foto-suites/suite-2/camera_4.avif",
      "/foto-suites/suite-2/soggiorno_2.avif",
      "/foto-suites/suite-2/soggiorno_3.avif",
      "/foto-suites/suite-2/cucina_1.avif",
      "/foto-suites/suite-2/cucina_2.avif",
      "/foto-suites/suite-2/bagno_2.avif",
      "/foto-suites/suite-2/bagno_3.avif",
    ],
    video: "/foto-suites/suite-2/video-app2.mp4",
  },
};

export default async function SuitePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang as 'it' | 'en');
  const suite = suitesData[slug];

  if (!suite) {
    return <div>{dict.suitesDetail.notFound}</div>;
  }

  const media = [...suite.photos];
  if (suite.video) {
    media.splice(3, 0, suite.video);
  }

  return (
    <main className="min-h-screen bg-bianco">
      <section className="px-padding-global py-16 text-center">
        <h1 className="font-heading text-4xl md:text-5xl text-blu mb-8">{dict.suitesDetail.title}</h1>

        <div className="flex justify-center gap-4 mb-16">
          <a
            href={`/${lang}/suites/suite-1`}
            className={`px-8 py-3 rounded-md ${
              slug === 'suite-1' ? 'bg-blu text-bianco' : 'bg-grigio-chiarissimo text-blu'
            }`}
          >
            Suite Palatino
          </a>
          <a
            href={`/${lang}/suites/suite-2`}
            className={`px-8 py-3 rounded-md ${
              slug === 'suite-2' ? 'bg-blu text-bianco' : 'bg-grigio-chiarissimo text-blu'
            }`}
          >
            Suite Aventino
          </a>
        </div>

        <SuiteGallery media={media} name={suite.name} />
      </section>

      <SuitesGeneralDescription />
      <SuiteAmenities />
      <Separator />
      <TiramisuVoucher />
      <PointsOfInterest lang={lang} />
    </main>
  );
}
