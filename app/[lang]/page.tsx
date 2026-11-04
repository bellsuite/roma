import Hero from "@/components/Hero";
import TextWithImageRight from "@/components/TextWithImageRight";
import TextWithImageLeft from "@/components/TextWithImageLeft";
import Separator from "@/components/Separator";
import Testimonials from "@/components/Testimonials";
import { getDictionary, type Locale } from "@/app/dictionaries";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <main className="min-h-screen">
      <Hero lang={lang} />

      <TextWithImageRight
        priority
        title={dict.home.palatinoTitle}
        price={dict.home.price}
        description={dict.home.palatinoDesc}
        features={[
          { text: dict.home.features.shower, icon: "shower" },
          { text: dict.home.features.kitchen, icon: "kitchen" },
          { text: dict.home.features.wifi, icon: "wifi" },
          { text: dict.home.features.climate, icon: "climate" },
          { text: dict.home.features.window, icon: "window_closed" },
          { text: dict.home.features.laundry, icon: "laundry" },
          { text: dict.home.features.chair, icon: "chair" }
        ]}
        imageSrc="/foto-suites/suite-1/camera_1.avif"
        imageAlt="Suite Palatino"
        suitePath={`/${lang}/suites/suite-1`}
        discoverText={dict.home.discover}
        bookText={dict.home.book}
      />
      <Separator />
      <TextWithImageLeft
        title={dict.home.aventinoTitle}
        price={dict.home.price}
        description={dict.home.aventinoDesc}
        features={[
          { text: dict.home.features.shower, icon: "shower" },
          { text: dict.home.features.kitchen, icon: "kitchen" },
          { text: dict.home.features.wifi, icon: "wifi" },
          { text: dict.home.features.climate, icon: "climate" },
          { text: dict.home.features.window, icon: "window_closed" },
          { text: dict.home.features.laundry, icon: "laundry" },
          { text: dict.home.features.chair, icon: "chair" }
        ]}
        imageSrc="/foto-suites/suite-2/camera_1.avif"
        imageAlt="Suite Aventino"
        suitePath={`/${lang}/suites/suite-2`}
        discoverText={dict.home.discover}
        bookText={dict.home.book}
      />
      <Separator />
      <Testimonials />
    </main>
  );
}
