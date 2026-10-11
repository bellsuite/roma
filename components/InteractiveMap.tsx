"use client";

import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* =========================================================
   CONFIGURAZIONE B&B
========================================================= */

const BNB_NAME = "Bell Suites Roma";
const BNB_ADDRESS = "Via Domodossola 23, 00183 Roma";
const BNB_LATITUDE = 41.8902; // Example latitude
const BNB_LONGITUDE = 12.4923; // Example longitude

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
  latitude: number;
  longitude: number;
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
    latitude: 41.8902,
    longitude: 12.4923,
  },
  {
    id: "san-giovanni",
    name: "Basilica di San Giovanni in Laterano",
    category: "monument",
    description: "Una delle quattro basiliche papali maggiori di Roma.",
    distance: "1,4 km",
    walkingTime: "16 min",
    latitude: 41.8902,
    longitude: 12.4923,
  },
  // Add other points of interest with latitude and longitude
];

const categoryLabels: Record<Category, string> = {
  transport: "Trasporti",
  monument: "Attrazioni",
  food: "Food",
  shopping: "Shopping",
};

export default function InteractiveMap() {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [map, setMap] = useState<L.Map | null>(null);

  const filteredPoints =
    activeCategory === "all"
      ? pointsOfInterest
      : pointsOfInterest.filter(
          (point) => point.category === activeCategory
        );

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add new markers
    filteredPoints.forEach((point) => {
      const marker = L.marker([point.latitude, point.longitude]).addTo(map);
      marker.bindPopup(`
        <h3>${point.name}</h3>
        <p>${point.description}</p>
        <p>Distance: ${point.distance}</p>
        <p>Walking Time: ${point.walkingTime}</p>
      `);
    });
  }, [map, filteredPoints, activeCategory]);

  useEffect(() => {
    if (!map) return;

    // Add a marker for the B&B
    const bnbMarker = L.marker([BNB_LATITUDE, BNB_LONGITUDE]).addTo(map);
    bnbMarker.bindPopup(`
      <h3>${BNB_NAME}</h3>
      <p>${BNB_ADDRESS}</p>
    `);
  }, [map]);

  useEffect(() => {
    if (map) return;

    const newMap = L.map("map").setView([BNB_LATITUDE, BNB_LONGITUDE], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© OpenStreetMap contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }).addTo(newMap);

    setMap(newMap);
  }, []);

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
            <div id="map" style={{ height: "100%", width: "100%" }} />
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
                  onClick={() => {
                    if (map) {
                      map.setView([point.latitude, point.longitude], 15);
                    }
                  }}
                  className={`flex gap-4 border-b border-[#EEEEEE] p-5 transition cursor-pointer hover:bg-[#EEEEEE]/30 ${
                    map && map.getCenter().lat === point.latitude && map.getCenter().lng === point.longitude ? "bg-[#EEEEEE]/40" : ""
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
