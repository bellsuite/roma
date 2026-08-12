import Image from "next/image";
import FeatureIcon from "./icons/FeatureIcon";

export default function TextWithImageLeft({
  title,
  price,
  description,
  features,
  imageSrc,
  imageAlt,
}: {
  title: string;
  price: string;
  description: string;
  features: { text: string; icon: string }[];
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <section className="p-padding-section-medium max-w-container-large mx-auto bg-bianco">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Mobile Title & Price (Mobile: order-1 & order-2) */}
        <div className="w-full md:hidden order-1">
          <h2 className="font-heading text-5xl text-blu mb-1">{title}</h2>
        </div>
        <div className="w-full md:hidden order-2">
          <h3 className="font-heading text-3xl text-blu mb-6 w-full text-left">{price}</h3>
        </div>

        {/* Image (Desktop: Left, Mobile: order-3) */}
        <div className="w-full md:flex-1 flex justify-center md:justify-start order-3 md:order-none">
          <div className="relative w-full max-w-[500px] aspect-square rounded-full overflow-hidden border-1 border-oro p-[4px]">
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image src={imageSrc} alt={imageAlt} width={500} height={500} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Content (Desktop: Right, Mobile: order-4) */}
        <div className="flex-1 order-4 md:order-none">
          {/* Desktop Title & Price */}
          <h2 className="hidden md:block font-heading text-5xl text-blu mb-6">{title}</h2>
          <h3 className="hidden md:block font-heading text-3xl text-blu mb-6">{price}</h3>
          
          <p className="text-grigio-scuro mb-6 text-base">{description}</p>

          <h3 className="font-heading text-2xl text-oro-scuro mb-4">Alcune dotazioni della suite:</h3>
          <ul className="mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 mb-2 text-grigio-scuro text-base">
                <FeatureIcon name={feature.icon} className="w-6 h-6 text-oro" />
                {feature.text}
              </li>
            ))}
          </ul>

          <div className="flex gap-4">
            <button className="bg-blu text-bianco px-8 py-3 font-semibold transition-colors duration-150 hover:bg-blu/80 rounded-md">Scopri</button>
            <a href="#" className="flex items-center text-blu font-semibold px-4 py-3 rounded-md transition-colors duration-150 hover:bg-blu/10">Prenota {">"}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
