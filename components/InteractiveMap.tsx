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
  svgIcon?: string;
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
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="25" fill="none" viewBox="0 0 23 25">
  <mask id="a" width="24" height="26" x="-.5" y="-.5" fill="#000" maskUnits="userSpaceOnUse">
    <path fill="#fff" d="M-.5-.5h24v26h-24z"/>
    <path d="m11.516 2.51 8.958 8.309.023.021h-.035v11.356H2.5v-11.38h.04l8.954-8.306.011-.01z"/>
  </mask>
  <path stroke="#fff" stroke-linejoin="round" stroke-width="5" d="m11.516 2.51 8.958 8.309.023.021h-.035v11.356H2.5v-11.38h.04l8.954-8.306.011-.01z" mask="url(#a)"/>
</svg>
`,
  },
  {
    id: "metro-re-di-roma",
    name: "Metro Re di Roma",
    address: "Piazza dei Re di Roma, 00183 Roma",
    position: [41.881839, 12.513202],
    symbol: "M",
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" fill="currentColor" viewBox="0 0 28 29">
  <path d="M3.31 23.63V5.655q0-.945.633-1.6.633-.654 1.554-.655h.945q.685 0 1.243.398.555.398.803 1.06l5.447 14.902 5.402-14.775a2.4 2.4 0 0 1 .852-1.15q.596-.435 1.342-.435h.7q.97 0 1.652.704.683.704.683 1.7V23.63q0 .689-.47 1.17a1.54 1.54 0 0 1-1.144.481q-.674 0-1.137-.481a1.62 1.62 0 0 1-.464-1.17V8.962L15.67 24.359a1.4 1.4 0 0 1-.49.647q-.34.245-.763.245h-.982q-.416 0-.758-.248a1.4 1.4 0 0 1-.492-.651l-5.66-15.27V23.63q0 .689-.47 1.17a1.54 1.54 0 0 1-1.144.481q-.672 0-1.136-.481a1.62 1.62 0 0 1-.465-1.17"/>
</svg>`,
  },
  {
    id: "pompi",
    name: "Pasticceria Pompi",
    address: "Via Albalonga 9, 00183 Roma",
    position: [41.880426, 12.513658],
    symbol: "P",
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" fill="currentColor" viewBox="0 0 28 29">
  <path d="M23.37 20.889q.783.419 1.32-.269t.13-1.434l-2.06-4.005-1.568 4.393zm-6.155-1.255h2.046l2.802-7.232q.175-.419.13-.822-.043-.403-.478-.613l-2.41-1.075a.84.84 0 0 0-.813 0q-.406.21-.435.627zm-8.6 0h2.01l-.813-9.115q-.03-.448-.392-.657-.363-.21-.856.03L6.27 10.908q-.377.15-.42.672-.045.523.101.941zM4.5 20.889l2.177-1.315-1.568-4.393-2.06 4.154q-.408.837.173 1.36.58.522 1.278.194m7.867-1.255h3.106l.958-10.878a.8.8 0 0 0-.218-.702.9.9 0 0 0-.682-.284h-3.193q-.465 0-.697.284-.233.284-.203.702zM3.86 22.876a2.68 2.68 0 0 1-2.03-.883Q1 21.11 1 19.873q0-.38.131-.742.13-.36.29-.711l2.65-5.285a3.66 3.66 0 0 1-.056-2.406q.38-1.19 1.473-1.682L7.9 8.031q.465-.18.943-.213.48-.033.893.229a2.83 2.83 0 0 1 .929-1.606 2.48 2.48 0 0 1 1.674-.629h3.193q.95 0 1.674.584t.93 1.531q.434-.172.903-.139.468.035.903.243l2.439 1.016q1.116.44 1.513 1.611.398 1.172-.082 2.297l2.636 5.435q.123.343.272.678.148.335.148.685 0 1.32-.916 2.222a3.03 3.03 0 0 1-2.204.901q-.335 0-.63-.138-.297-.138-.6-.264l-1.744-.883H7.067l-1.65.883a9 9 0 0 1-.752.28 2.6 2.6 0 0 1-.804.122"/>
</svg>`,
  },
  {
    id: "san-giovanni",
    name: "Basilica di San Giovanni in Laterano",
    address: "Piazza di San Giovanni in Laterano, 00184 Roma",
    position: [41.8860367, 12.5070516],
    symbol: "SG",
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" fill="currentColor" viewBox="0 0 28 29">
  <path d="M2.204 24.584v-6.112q0-.61.314-1.107.315-.498.87-.765l3.606-1.64v-2.644q0-.6.296-1.083.297-.48.794-.76l4.861-2.558V5.458h-1.333a.94.94 0 0 1-.704-.295 1 1 0 0 1-.285-.729q0-.433.285-.722a.95.95 0 0 1 .704-.29h1.333V2.049q0-.43.287-.725a.95.95 0 0 1 .708-.293q.42 0 .702.293.282.294.281.725v1.373h1.334a.94.94 0 0 1 .703.295q.286.295.286.728 0 .434-.285.723a.95.95 0 0 1-.704.29h-1.334v2.457l4.862 2.559q.497.278.793.76.297.48.297 1.082v2.645L24.48 16.6q.556.267.87.765.315.497.315 1.107v6.112q0 .85-.582 1.446a1.88 1.88 0 0 1-1.396.597h-7.354a.94.94 0 0 1-.704-.294 1 1 0 0 1-.285-.731v-3.843q0-.612-.406-1.031-.405-.42-1-.42-.593 0-1.003.42t-.41 1.031v3.843q0 .438-.286.731a.94.94 0 0 1-.703.294H4.182a1.88 1.88 0 0 1-1.397-.597 2 2 0 0 1-.58-1.446m1.978 0h6.365V21.7a3.5 3.5 0 0 1 .992-2.493q.992-1.047 2.4-1.047t2.398 1.047q.992 1.049.992 2.493v2.884h6.357v-6.231l-4.79-2.182V12.19l-4.962-2.648-4.962 2.648v3.982l-4.79 2.182zm9.754-8.432q.666 0 1.13-.48.465-.48.465-1.165 0-.678-.466-1.16a1.52 1.52 0 0 0-1.132-.482q-.666 0-1.13.484-.465.483-.465 1.162 0 .685.466 1.163t1.132.478"/>
</svg>
`,
  },
  {
    id: "santa-maria-maggiore",
    name: "Basilica di Santa Maria Maggiore",
    address: "Piazza di Santa Maria Maggiore, 00185 Roma",
    position: [41.897166, 12.498818],
    symbol: "S",
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" fill="currentColor" viewBox="0 0 28 29">
  <path d="M2.204 24.584v-6.112q0-.61.314-1.107.315-.498.87-.765l3.606-1.64v-2.644q0-.6.296-1.083.297-.48.794-.76l4.861-2.558V5.458h-1.333a.94.94 0 0 1-.704-.295 1 1 0 0 1-.285-.729q0-.433.285-.722a.95.95 0 0 1 .704-.29h1.333V2.049q0-.43.287-.725a.95.95 0 0 1 .708-.293q.42 0 .702.293.282.294.281.725v1.373h1.334a.94.94 0 0 1 .703.295q.286.295.286.728 0 .434-.285.723a.95.95 0 0 1-.704.29h-1.334v2.457l4.862 2.559q.497.278.793.76.297.48.297 1.082v2.645L24.48 16.6q.556.267.87.765.315.497.315 1.107v6.112q0 .85-.582 1.446a1.88 1.88 0 0 1-1.396.597h-7.354a.94.94 0 0 1-.704-.294 1 1 0 0 1-.285-.731v-3.843q0-.612-.406-1.031-.405-.42-1-.42-.593 0-1.003.42t-.41 1.031v3.843q0 .438-.286.731a.94.94 0 0 1-.703.294H4.182a1.88 1.88 0 0 1-1.397-.597 2 2 0 0 1-.58-1.446m1.978 0h6.365V21.7a3.5 3.5 0 0 1 .992-2.493q.992-1.047 2.4-1.047t2.398 1.047q.992 1.049.992 2.493v2.884h6.357v-6.231l-4.79-2.182V12.19l-4.962-2.648-4.962 2.648v3.982l-4.79 2.182zm9.754-8.432q.666 0 1.13-.48.465-.48.465-1.165 0-.678-.466-1.16a1.52 1.52 0 0 0-1.132-.482q-.666 0-1.13.484-.465.483-.465 1.162 0 .685.466 1.163t1.132.478"/>
</svg>`,
  },
  {
    id: "colosseo",
    name: "Colosseo",
    address: "Piazza del Colosseo, 00184 Roma",
    position: [41.890422, 12.491139],
    symbol: "C",
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="31" height="22" fill="none" viewBox="0 0 31 22">
  <path fill="#183058" fill-rule="evenodd" d="M18.727 9.997a.515.515 0 0 0-.266-.532c-.151-.085-.146-.111-.532-.116-.337-.645-.707-1.083-.101-1.12.368-.021 4.1.061 4.546.132.29.045 5.852.514 6.888 1.588.527.546.269 1.266.497 2.183.021.086.161 1.732.174 1.882.076.899-.1.987.441 1.563.68.724-.14 1.105-.124 1.732.056 2.207.684 3.218-.818 3.348-.894.077-1.158.143-1.173-.522-.01-.46-.012-2.142-.476-2.594-.371-.362-1.559-.586-1.577 1.021-.02 1.768.346 2.387-.382 2.415-1.14.043-1.307.078-1.363-.381-.244-1.98.035-2.86-.834-3.289-.864-.427-1.204.56-1.673-.185-.395-.627-2.836-5.425-3.078-5.9-.129-.254-.123-.25-.247-.505-.012-.021-.01-.025-.113-.216l-.05.064a26 26 0 0 1-.537-1.06c.386.006.38.032.532.117.036.02.231.131.266.375M23 14.718c.716.026 1.014.175 1.02-.54a34 34 0 0 0-.152-1.87c-.193-1.15-2.341-1.585-2.147.771.112 1.351.112 1.353.147 1.43.127.276.922.208 1.132.21m4.774-.23c-.02-.695.06-2.473-1.006-2.57-1.113-.102-.97 1.206-.88 2.565.008.112-.088.49 1.033.556.635.037.868.083.853-.551m-9.898-3.002c.043.093.041.085.356.685.281.537 2.827 5.391 3.474 6.726.462.952 1.239 2.063.52 2.353-.22.09-2.036.177-2.518.163-.687-.021-.465-.778-.537-2.533-.077-1.875-1.689-1.868-2.394-1.06-.645.74-.078 3.127-.408 3.523-.11.131-.676.125-.735.125-.064-.001-.736-.008-.795-.017-.562-.082-.267-1.226-.366-2.726-.105-1.582-1.688-1.763-2.39-.903-.623.764-.084 3.287-.558 3.497-.23.102-1.494-.006-1.55-.02-.378-.09-.222-.71-.242-2.58-.01-.97-.766-1.493-1.458-1.368-1.743.314-.898 3.374-1.247 3.732-.09.09-.151.154-1.588.053-.534-.037-.344-.306-.389-2.575-.015-.74-.593-1.23-1.178-1.163-1.394.16-.873 2.176-1.14 3.191-.114.429-.589.285-1.21.242-1.861-.128-1.172-.994-1.134-3.365.008-.532-.576-.748-.325-1.433.189-.514.552-.377.604-1.39.092-1.821.25-1.815.147-2.827-.035-.353-.604-.82-.144-1.456.79-1.092.276-1.252.564-2.921.077-.443.053-1.334.089-1.579.215-1.503.006-1.525.263-2.642C2.004 1.404 8.408.234 9.368.148c1.163-.104 2.165-.423 2.802.403.203.265 5.224 9.963 5.546 10.621zM3.649 8.219c-.02.65-.075 1.008.383.926 1.375-.245 1.585-.177 1.623-.765.108-1.7-.011-1.877-.102-2.01-.552-.814-1.753-.514-1.866.906zm10.222 2.727c-.12-.053-.975-.43-1.617.307-.188.216-.281.66-.294.721-.162 2.419.03 2.464.226 2.511.068.017 2.018.08 2.231-.107.217-.192.328-2.383-.094-2.984-.201-.286-.437-.435-.452-.448m-8.51 2.446c.003-.063.012-.344-.001-.788-.023-.738-.738-1.189-1.326-.94-.795.338-.753 1.273-.847 2.664-.067.996.457.605 1.158.575.105-.005.21-.004.315-.01.858-.049.718-.378.702-1.501M8.589 11.1c-1.013.266-1.026.859-1.086 1.51-.172 1.858-.118 2.103.454 2.085.126-.003.885-.026 1.577-.138.317-.05.407-.142.373-2.107-.074-1.249-.796-1.345-1.318-1.35m1.474-3.507c.017-.724.023-.72.018-1.097-.025-1.99-1.778-1.47-2.123-.626-.195.479-.194 2.017-.194 2.193 0 .729.358.523 1.752.41.606-.049.563-.278.547-.88" clip-rule="evenodd"/>
</svg>`,
  },
  {
    id: "terme-caracalla",
    name: "Terme di Caracalla",
    address: "Viale delle Terme di Caracalla, 00153 Roma",
    position: [41.8790454, 12.48996],
    symbol: "T",
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" fill="currentColor" viewBox="0 0 28 29">
  <path d="M.925 23.267V11.875q0-.43.287-.728a.94.94 0 0 1 .707-.297q.42 0 .703.297.28.298.281.728v1.366h2.999V4.404q0-.43.287-.728a.94.94 0 0 1 .707-.297q.42 0 .702.297.282.298.282.728V5.77h2.702V4.404q0-.43.286-.728a.94.94 0 0 1 .708-.297q.42 0 .702.297.281.298.281.728V5.77h2.75V4.404q0-.43.287-.728a.94.94 0 0 1 .708-.297q.42 0 .702.297.282.298.282.728V5.77h2.701V4.404q0-.43.287-.728a.94.94 0 0 1 .707-.297q.42 0 .706.297.285.298.285.728v8.837h2.992v-1.366q0-.43.287-.728a.94.94 0 0 1 .706-.297q.42 0 .706.297.285.298.286.728v11.392q0 .846-.58 1.441a1.9 1.9 0 0 1-1.405.595h-7.548a.94.94 0 0 1-.703-.294 1 1 0 0 1-.286-.724v-2.768q0-1.083-.721-1.825a2.38 2.38 0 0 0-1.773-.743q-1.052 0-1.773.742-.722.743-.722 1.826v2.768a1 1 0 0 1-.285.724.94.94 0 0 1-.704.294H2.903a1.88 1.88 0 0 1-1.4-.595 2 2 0 0 1-.578-1.441m1.978 0h6.559v-1.75q0-1.933 1.298-3.269 1.297-1.335 3.175-1.336 1.877 0 3.175 1.336 1.297 1.335 1.297 3.269v1.75h6.56v-7.983h-3.989a.94.94 0 0 1-.704-.294 1 1 0 0 1-.285-.724V7.813H7.88v6.453a1 1 0 0 1-.284.724.94.94 0 0 1-.704.294H2.903zm8.064-9.221h1.231a.21.21 0 0 0 .18-.088.3.3 0 0 0 .064-.187v-2.116a.88.88 0 0 0-.252-.64.84.84 0 0 0-.624-.257.82.82 0 0 0-.62.258.9.9 0 0 0-.246.639v2.115q0 .105.084.19a.25.25 0 0 0 .183.085m4.728 0h1.231a.21.21 0 0 0 .18-.088.3.3 0 0 0 .063-.187v-2.116a.88.88 0 0 0-.251-.64.84.84 0 0 0-.624-.257.82.82 0 0 0-.62.258.9.9 0 0 0-.246.639v2.115q0 .105.084.19a.26.26 0 0 0 .183.085"/>
</svg>
`,
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
        });

        mapInstanceRef.current = newMap;

        const initialBounds = L.latLngBounds([
          [41.8798489, 12.5143497], // Bell Suites Roma
          [41.881839, 12.513202],   // Metro Re di Roma
          [41.880426, 12.513658],   // Pasticceria Pompi
        ]);
        newMap.fitBounds(initialBounds, { padding: [60, 60], maxZoom: 17.5 });

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
              }">${place.svgIcon || place.symbol}</div><div class="mt-1 px-2.5 py-1 bg-[#183058] text-white text-[11px] font-semibold rounded-md shadow-md whitespace-nowrap">${place.name}</div></div>`,
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
