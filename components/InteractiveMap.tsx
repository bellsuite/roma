"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

const BNB_POSITION: [number, number] = [41.88005, 12.5142];

type Place = {
  id: string;
  name: string;
  address: string;
  position: [number, number];
  symbol: string;
  featured?: boolean;
};

const places: Place[] = [
  {
    id: "bell-suites",
    name: "Bell Suites Roma",
    address: "Via Domodossola 23, 00183 Roma",
    position: [41.8798489, 12.5143497],
    symbol: "⌂",
    featured: true,
  },
  {
    id: "metro-re-di-roma",
    name: "Metro Re di Roma",
    address: "Piazza dei Re di Roma, 00183 Roma",
    position: [41.881839, 12.513202],
    symbol: "M",
  },
  {
    id: "pompi",
    name: "Pasticceria Pompi",
    address: "Via Albalonga 9, 00183 Roma",
    position: [41.880426, 12.513658],
    symbol: "P",
  },
  {
    id: "san-giovanni",
    name: "Basilica di San Giovanni in Laterano",
    address: "Piazza di San Giovanni in Laterano, 00184 Roma",
    position: [41.8860367, 12.5070516],
    symbol: "✦",
  },
  {
    id: "santa-maria-maggiore",
    name: "Basilica di Santa Maria Maggiore",
    address: "Piazza di Santa Maria Maggiore, 00185 Roma",
    position: [41.897166, 12.498818],
    symbol: "S",
  },
  {
    id: "colosseo",
    name: "Colosseo",
    address: "Piazza del Colosseo, 00184 Roma",
    position: [41.890422, 12.491139],
    symbol: "C",
  },
  {
    id: "terme-caracalla",
    name: "Terme di Caracalla",
    address: "Viale delle Terme di Caracalla, 00153 Roma",
    position: [41.8790454, 12.48996],
    symbol: "T",
  },
];

function createPopup(place: Place) {
  const content = document.createElement("div");
  content.className = "p-2 font-sans";

  const title = document.createElement("h3");
  title.className = "font-serif text-base font-bold text-[#183058] m-0 mb-1";
  title.textContent = place.name;

  const address = document.createElement("p");
  address.className = "text-xs text-[#7A7D82] m-0 mb-2";
  address.textContent = place.address;

  const directions = document.createElement("a");
  directions.href = `https://www.google.com/maps/dir/?api=1&destination=${place.position[0]},${place.position[1]}`;
  directions.target = "_blank";
  directions.rel = "noopener noreferrer";
  directions.className = "inline-flex items-center gap-1 text-xs font-semibold text-[#183058] hover:underline";
  directions.innerHTML = 'Apri in Maps <span aria-hidden="true">↗</span>';

  content.append(title, address, directions);
  return content;
}

export default function InteractiveMap() {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    import("leaflet")
      .then(({ default: L }) => {
        if (cancelled || !mapElementRef.current) return;

        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }

        const newMap = L.map(mapElementRef.current, {
          zoomControl: false,
          scrollWheelZoom: true,
        }).setView(BNB_POSITION, 17.5);

        mapInstanceRef.current = newMap;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(newMap);

        places.forEach((place) => {
          const iconSize = place.featured ? 48 : 38;
          const marker = L.marker(place.position, {
            title: place.name,
            alt: place.name,
            zIndexOffset: place.featured ? 1000 : 100,
            icon: L.divIcon({
              className: "bg-transparent",
              html: `<div class="flex flex-col items-center group cursor-pointer"><div class="flex items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110 ${
                place.featured
                  ? "h-12 w-12 bg-[#183058] text-white text-xl font-bold ring-4 ring-[#AB8D47]/40"
                  : "h-9 w-9 bg-white text-[#183058] text-xs font-bold"
              }">${place.symbol}</div><div class="mt-1 px-2.5 py-1 bg-[#183058] text-white text-[11px] font-semibold rounded-md shadow-md whitespace-nowrap">${place.name}</div></div>`,
              iconSize: [iconSize, iconSize + 28],
              iconAnchor: [iconSize / 2, iconSize / 2],
              popupAnchor: [0, -iconSize / 2],
            }),
          }).addTo(newMap);

          marker.bindPopup(createPopup(place), {
            closeButton: true,
            maxWidth: 280,
            className: "rounded-xl shadow-xl",
            autoPanPadding: [24, 24],
          });
        });
      })
      .catch(() => {
        if (!cancelled) setMapError(true);
      });

    return () => {
      cancelled = true;
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  return (
    <section
      aria-labelledby="interactive-map-title"
      className="w-full bg-bianco py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-[calc(100%-24px)] max-w-[1200px] sm:w-[calc(100%-40px)]">

        {/* HEADER */}
        <header className="mb-8 text-center max-w-3xl mx-auto">
          <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#AB8D47]">
            Posizione Strategica
          </span>
          <h2
            id="interactive-map-title"
            className="m-0 font-serif text-4xl font-normal leading-[1.05] text-[#183058] sm:text-5xl"
          >
            Esplora i dintorni
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#7A7D82] sm:text-base">
            Bell Suites Roma si trova in una posizione privilegiata, a due passi dalla metro Re di Roma, dallo storico Tiramisù Pompi e dai principali monumenti della città.
          </p>
        </header>

        {/* MAP CONTAINER */}
        <div className="relative h-[500px] lg:h-[650px] w-full overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_rgba(24,48,88,0.08)]">
          <div ref={mapElementRef} className="h-full w-full" />

          {mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/90 p-6 text-center text-sm text-[#7A7D82]" role="alert">
              Non è stato possibile caricare la mappa interattiva. Riprova a ricaricare la pagina.
            </div>
          )}

          {/* ZOOM CONTROLS */}
          <div className="absolute bottom-6 right-6 z-[1000] flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_4px_20px_rgba(24,48,88,0.2)] border border-[#EEEEEE]">
            <button
              type="button"
              onClick={handleZoomIn}
              aria-label="Zoom avanti"
              className="flex h-11 w-11 items-center justify-center text-xl font-bold text-[#183058] transition hover:bg-[#EEEEEE] active:bg-[#C0C0C4]"
            >
              +
            </button>
            <div className="h-[1px] w-full bg-[#EEEEEE]" />
            <button
              type="button"
              onClick={handleZoomOut}
              aria-label="Zoom indietro"
              className="flex h-11 w-11 items-center justify-center text-xl font-bold text-[#183058] transition hover:bg-[#EEEEEE] active:bg-[#C0C0C4]"
            >
              −
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
