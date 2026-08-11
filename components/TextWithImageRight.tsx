import Image from "next/image";
import FeatureIcon from "./icons/FeatureIcon";

export default function TextWithImageRight({
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
    <section className="p-padding-section-medium flex items-center gap-12 max-w-container-large mx-auto bg-bianco">
      <div className="flex-1">
        <h2 className="font-heading text-5xl text-blu mb-6">{title}</h2>
        <h3 className="font-heading text-3xl text-blu mb-6">{price}</h3>
        <p className="text-grigio-scuro mb-6 text-base">{description}</p>

        <h3 className="font-heading text-2xl text-oro-scuro mb-4">Alcune dotazioni della suite:</h3>
        <ul className="mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 mb-2 text-grigio-scuro text-base">
              <FeatureIcon name={feature.icon} className="w-6 h-6 text-oro-scuro" />
              {feature.text}
            </li>
          ))}
        </ul>



        <div className="flex gap-4">
          <button className="bg-blu text-bianco px-8 py-3 font-semibold">Scopri</button>
          <a href="#" className="flex items-center text-blu font-semibold">Prenota {">"}</a>
        </div>
      </div>
      <div className="flex-1 flex justify-end">
        <div className="relative w-[500px] h-[500px] rounded-full overflow-hidden border-2 border-oro p-[5px]">
          <div className="w-full h-full rounded-full overflow-hidden">
            <Image src={imageSrc} alt={imageAlt} width={500} height={500} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
