import FeatureIcon from "./icons/FeatureIcon";

const columns = [
  [
    { text: "Angolo cottura completamente attrezzato", icon: "skillet_cooktop" },
    { text: "Frigorifero", icon: "kitchen" },
    { text: "Macchina per caffè espresso", icon: "coffee" },
    { text: "Bollitore elettrico", icon: "kettle" },
    { text: "Zona pranzo", icon: "restaurant" },
    { text: "Soggiorno", icon: "chair" },
    
  ],
  [
    { text: "Smart TV nel soggiorno", icon: "tv_displays" },
    { text: "Smart TV nella camera da letto", icon: "tv_displays" },
    { text: "Doccia di lusso con cromoterapia effetto pioggia", icon: "shower" },
    { text: "Asciugacapelli", icon: "airware" },
    { text: "Set di cortesia", icon: "self_care" },
    { text: "Finestre insonorizzate", icon: "window_closed" },    
  ],
  [
    { text: "Biancheria di qualità premium", icon: "workspace_premium" },
    { text: "Struttura adatta alle famiglie", icon: "family_restroom" },
    { text: "Culla disponibile su richiesta", icon: "crib" },
    { text: "Un voucher colazione presso Pompi incluso per ogni ospite", icon: "bakery_dining" },
    { text: "Struttura interamente non fumatori", icon: "smoke_free" },
  ],
];

export default function SuiteAmenities() {
  return (
    <section className="px-padding-global bg-bianco">
      <div className="max-w-container-large mx-auto pt-16">
        <h2 className="font-heading text-4xl text-blu mb-12 text-center">Tutte le dotazioni:</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-0 lg:gap-y-12">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6 py-3">
              {column.map((amenity, index) => (
                <div key={index} className="flex items-center gap-4 text-grigio-scurissimo text-base">
                  <div className="flex-shrink-0 flex items-center justify-center w-8">
                    <FeatureIcon name={amenity.icon} className="text-oro" />
                  </div>
                  <span>{amenity.text}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
