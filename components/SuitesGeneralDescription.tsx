export default function SuitesGeneralDescription({
  p1 = "Ogni suite offre camera con letto king-size, soggiorno accogliente, angolo cottura attrezzato e bagno privato con doccia effetto pioggia.",
  p2 = "Perfetta per soggiorni leisure e business, la struttura garantisce comfort moderno e servizi premium: Wi-Fi ad alta velocità, self check-in, finestre insonorizzate, macchina per espresso, aria condizionata e Smart TV. In omaggio, un voucher colazione presso Pompi, la pasticceria simbolo di Roma famosa per il suo tiramisù.",
  p3 = "A soli 150 metri dalla metro Re di Roma (Linea A), Bell Suites ti mette a un passo dal Colosseo, dalla Basilica di San Giovanni e dalle principali attrazioni della città. (Piano seminterrato, non servito da ascensore, accessibile con breve rampa di scale.)",
}: {
  p1?: string;
  p2?: string;
  p3?: string;
}) {
  return (
    <section className="px-padding-global bg-bianco">
      <div className="mx-auto flex flex-col gap-0 max-w-container-large">
        <p className="text-grigio-scurissimo leading-relaxed">
          {p1}
        </p>
        <p className="text-grigio-scurissimo leading-relaxed">
          {p2}
        </p>
        <p className="text-grigio-scurissimo leading-relaxed">
          {p3}
        </p>
      </div>
    </section>
  );
}
