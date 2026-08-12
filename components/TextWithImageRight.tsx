import Image from "next/image";
import FeatureIcon from "./icons/FeatureIcon";

export default function TextWithImageRight({
  title,
  price,
  description,
  features,
  imageSrc,
  imageAlt,
  priority = false,
}: {
  title: string;
  price: string;
  description: string;
  features: { text: string; icon: string }[];
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
}) {
  return (
    <section className="px-padding-global bg-bianco">
      <div className="max-w-container-large mx-auto py-16 flex flex-col md:flex-row items-center gap-5">
        {/* Mobile Title & Price (Mobile: order-1 & order-2) */}
        <div className="w-full md:hidden order-1">
          <h2 className="font-heading text-3xl md:text-4xl text-blu mb-1">{title}</h2>
        </div>
        <div className="w-full md:hidden order-2">
          <h3 className="font-heading text-2xl text-blu mb-2 w-full text-left">{price}</h3>
        </div>

        {/* Content (Desktop: Left, Mobile: order-3) */}
        <div className="flex-1 order-3 md:order-none gap-12">
          {/* Desktop Title & Price */}
          <h2 className="hidden md:block font-heading text-5xl text-blu mb-6">{title}</h2>
          <h3 className="hidden md:block font-heading text-3xl text-blu mb-6">{price}</h3>
          
          <p className="text-grigio-scuro mb-6 text-base">{description}</p>

          <h3 className="font-heading text-2xl text-oro-scuro mb-4">Alcune dotazioni della suite:</h3>
          <ul className="mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 mb-2 text-grigio-scuro text-base">
                <div className="flex items-center justify-center w-8 md:w-6">
                  <FeatureIcon name={feature.icon} className="text-oro" />
                </div>
                {feature.text}
              </li>
            ))}
          </ul>

          <div className="flex gap-4">
            <button className="bg-blu text-bianco px-8 py-3 font-semibold transition-colors duration-150 hover:bg-blu/80 hover:cursor-pointer rounded-md">Scopri</button>
            <a href="#contact-form" className="flex items-center text-blu font-semibold px-4 py-3 rounded-md transition-colors duration-150 hover:bg-blu/10">Prenota {">"}</a>
          </div>
        </div>

        {/* Image (Desktop: Right, Mobile: order-4) */}
        <div className="w-full md:flex-1 flex justify-center md:justify-end order-4 md:order-none">
          <div className="relative w-full max-w-[500px] aspect-square rounded-full overflow-hidden border-1 border-oro p-[4px]">
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image src={imageSrc} alt={imageAlt} width={500} height={500} priority={priority} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}