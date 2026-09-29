"use client";

import { useState } from "react";

/* =========================================================
   CONFIGURAZIONE B&B
========================================================= */

const BNB_NAME = "Bell Suites Roma";
const BNB_ADDRESS = "Via Domodossola 23, 00183 Roma";

/* =========================================================
   TIPI
========================================================= */

type Category =
  | "transport"
  | "monument"
  | "food"
  | "shopping";

type PointOfInterest = {
  id: string;
  name: string;
  category: Category;
  description: string;
  distance: string;
  walkingTime: string;
  badgePosition?: { top: string; left: string };
};

/* =========================================================
   PUNTI DI INTERESSE
========================================================= */

const pointsOfInterest: PointOfInterest[] = [
  {
    id: "metro-re-di-roma",
    name: "Metro Re di Roma",
    category: "transport",
    description: "Linea A della metropolitana di Roma.",
    distance: "210 m",
    walkingTime: "3 min",
    badgePosition: { top: "45%", left: "55%" },
  },
  {
    id: "san-giovanni",
    name: "Basilica di San Giovanni in Laterano",
    category: "monument",
    description: "Una delle quattro basiliche papali maggiori di Roma.",
    distance: "1,4 km",
    walkingTime: "16 min",
    badgePosition: { top: "30%", left: "40%" },
  },
  {
    id: "porta-maggiore",
    name: "Porta Maggiore",
    category: "monument",
    description: "Antica porta monumentale delle mura di Roma.",
    distance: "1,4 km",
    walkingTime: "16 min",
    badgePosition: { top: "20%", left: "70%" },
  },
  {
    id: "appia-antica",
    name: "Via Appia Antica",
    category: "monument",
    description: "Uno dei percorsi archeologici più importanti di Roma.",
    distance: "1 km",
    walkingTime: "12 min",
    badgePosition: { top: "75%", left: "30%" },
  },
  {
    id: "colosseo",
    name: "Colosseo",
    category: "monument",
    description: "Il più famoso anfiteatro della Roma antica.",
    distance: "3,6 km",
    walkingTime: "45 min",
    badgePosition: { top: "15%", left: "25%" },
  },
  {
    id: "pompi",
    name: "Pompi",
    category: "food",
    description: "Storico locale romano conosciuto per il tiramisù.",
    distance: "120 m",
    walkingTime: "2 min",
    badgePosition: { top: "52%", left: "58%" },
  },
  {
    id: "via-appia-nuova",
    name: "Via Appia Nuova",
    category: "shopping",
    description: "Una delle principali vie commerciali della zona.",
    distance: "200 m",
    walkingTime: "3 min",
    badgePosition: { top: "48%", left: "50%" },
  },
];

const categoryLabels: Record<Category, string> = {
  transport: "Trasporti",
  monument: "Attrazioni",
  food: "Food",
  shopping: "Shopping",
};

export default function InteractiveMap() {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [selectedPoi, setSelectedPoi] = useState<string | null>(null);

  const filteredPoints =
    activeCategory === "all"
      ? pointsOfInterest
      : pointsOfInterest.filter(
          (point) => point.category === activeCategory
        );

  return (
    <section
      aria-labelledby="interactive-map-title"
      className="w-full bg-bianco py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-[calc(100%-24px)] max-w-[1200px] sm:w-[calc(100%-40px)]">

        {/* HEADER */}
        <header className="mb-8 flex flex-col gap-6 lg:mb-9 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div>
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#AB8D47]">
              Scopri Roma
            </span>
            <h2
              id="interactive-map-title"
              className="m-0 max-w-3xl font-serif text-4xl font-normal leading-[1.05] text-[#183058] sm:text-5xl lg:text-[56px]"
            >
              Il B&B nel cuore di Roma
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#7A7D82] sm:text-base">
              Scopri cosa puoi raggiungere facilmente partendo da Via Domodossola.
            </p>
          </div>

          <div className="shrink-0 border-l border-[#C0C0C4] pl-5 text-sm leading-6 text-[#7A7D82]">
            <span className="block">{BNB_ADDRESS.split(",")[0]}</span>
            <span className="block">00183 Roma</span>
          </div>
        </header>

        {/* MAP + SIDEBAR */}
        <div className="grid min-h-[620px] overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_rgba(24,48,88,0.08)] lg:grid-cols-[minmax(0,1.6fr)_minmax(340px,0.8fr)]">

          {/* MAPPA MONOCROMATICA (IFRAME CON FILTRO CSS + OVERLAY PIN) */}
          <div className="relative min-h-[430px] lg:min-h-[620px] overflow-hidden">
            <iframe
              title="Mappa Bell Suites Roma"
              src="https://maps.google.com/maps?q=Via+Domodossola+23,+00183+Roma&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 h-full w-full border-0 grayscale contrast-125 brightness-95"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Overlay B&B Marker al centro */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#183058] text-white shadow-[0_8px_25px_rgba(0,0,0,0.3)]">
                <span className="text-xl">⌂</span>
              </div>
              <div className="mt-1 bg-[#183058] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                {BNB_NAME}
              </div>
            </div>

            {/* Overlay POI Pins */}
            {filteredPoints.map((point) => {
              const symbols: Record<Category, string> = {
                transport: "M",
                monument: "✦",
                food: "●",
                shopping: "◆",
              };
              const colors: Record<Category, string> = {
                transport: "text-[#183058]",
                monument: "text-[#AB8D47]",
                food: "text-[#68562C]",
                shopping: "text-[#7A7D82]",
              };

              return (
                <div
                  key={point.id}
                  style={point.badgePosition}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  onClick={() => setSelectedPoi(point.id)}
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white text-xs font-bold shadow-[0_4px_14px_rgba(0,0,0,0.2)] ${colors[point.category]} transition-transform hover:scale-110`}>
                    {symbols[point.category]}
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-[#183058] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow whitespace-nowrap z-20">
                    {point.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* SIDEBAR */}
          <aside className="flex min-w-0 flex-col border-t border-[#EEEEEE] bg-white lg:border-l lg:border-t-0">

            {/* FILTRI */}
            <div className="flex gap-2 overflow-x-auto border-b border-[#EEEEEE] p-5">
              <button
                type="button"
                aria-pressed={activeCategory === "all"}
                onClick={() => setActiveCategory("all")}
                className={`shrink-0 rounded-full border px-3.5 py-2 text-xs transition ${
                  activeCategory === "all"
                    ? "border-[#183058] bg-[#183058] text-white"
                    : "border-[#C0C0C4] bg-transparent text-[#7A7D82] hover:border-[#183058] hover:text-[#183058]"
                }`}
              >
                Tutti
              </button>

              {(Object.keys(categoryLabels) as Category[]).map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full border px-3.5 py-2 text-xs transition ${
                    activeCategory === category
                      ? "border-[#183058] bg-[#183058] text-white"
                      : "border-[#C0C0C4] bg-transparent text-[#7A7D82] hover:border-[#183058] hover:text-[#183058]"
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>

            {/* LISTA */}
            <div className="flex-1 overflow-y-auto lg:max-h-[500px]">
              {filteredPoints.map((point) => (
                <article
                  key={point.id}
                  onClick={() => setSelectedPoi(point.id)}
                  className={`flex gap-4 border-b border-[#EEEEEE] p-5 transition cursor-pointer hover:bg-[#EEEEEE]/30 ${
                    selectedPoi === point.id ? "bg-[#EEEEEE]/40" : ""
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEEEEE] text-xs font-bold ${
                      point.category === "transport"
                        ? "text-[#183058]"
                        : point.category === "monument"
                          ? "text-[#AB8D47]"
                          : point.category === "food"
                            ? "text-[#68562C]"
                            : "text-[#7A7D82]"
                    }`}
                    aria-hidden="true"
                  >
                    {point.category === "transport" && "M"}
                    {point.category === "monument" && "✦"}
                    {point.category === "food" && "●"}
                    {point.category === "shopping" && "◆"}
                  </div>

                  <div className="min-w-0">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#7A7D82]">
                      {categoryLabels[point.category]}
                    </span>
                    <h3 className="m-0 font-serif text-lg font-normal leading-tight text-[#183058]">
                      {point.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-5 text-[#7A7D82]">
                      {point.description}
                    </p>
                    <div className="mt-2 flex gap-2 text-[11px] text-[#7A7D82]">
                      <strong className="text-[#183058]">{point.walkingTime}</strong>
                      <span>{point.distance}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* CTA */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=Via+Domodossola+23,+00183+Roma`}
              target="_blank"
              rel="noopener noreferrer"
              className="m-5 flex items-center justify-between rounded-xl bg-[#183058] px-5 py-4 text-sm font-semibold text-white no-underline transition hover:-translate-y-px hover:bg-[#183058]/90 focus:outline-none focus:ring-2 focus:ring-[#183058] focus:ring-offset-2"
            >
              <span>Come raggiungerci</span>
              <span aria-hidden="true" className="text-lg">↗</span>
            </a>

          </aside>

        </div>

      </div>
    </section>
  );
}
