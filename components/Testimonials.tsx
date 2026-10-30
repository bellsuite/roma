'use client';

import { useState, useEffect, useCallback } from "react";

export type TestimonialReview = {
  quote: string;
  name: string;
  location: string;
  initials?: string;
  date?: string;
  rating?: number;
  source?: string;
};

export interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  reviews?: TestimonialReview[];
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

/**
 * Tronca il testo della recensione a massimo 250 caratteri,
 * terminando al confine di parola per non troncare a metà e aggiungendo '...' se più lungo.
 */
function truncateQuote(text: string, maxLength: number = 240): string {
  if (!text || text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  const cleanCut = lastSpace > maxLength - 30 ? cut.slice(0, lastSpace) : cut;
  return `${cleanCut.trimEnd().replace(/[,;:\s]+$/, "")}...`;
}

/**
 * Rimuove il giorno lasciando solo il mese (ed eventuale anno), es. "19 settembre 2026" -> "Settembre 2026"
 */
function formatMonthOnly(date?: string): string {
  if (!date) return "";
  const cleaned = date.replace(/^\d{1,2}\s+/, "");
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

/**
 * Recensioni predefinite di Bell Suites Roma.
 * Per aggiungere una nuova recensione, basta inserire un nuovo oggetto nell'array qui sotto:
 * {
 *   quote: "Testo della recensione...",
 *   name: "Nome Cognome",
 *   location: "Città, Nazione",
 *   initials: "NC", // opzionale, ricavato in automatico se omesso
 *   date: "Mese Anno", // es. "Settembre 2026"
 *   rating: 5, // opzionale, da 1 a 5 stelle
 *   source: "Airbnb", // opzionale, default: "Airbnb"
 * }
 */
export const defaultReviews: TestimonialReview[] = [
  {
    quote:
      "Signora buongiorno le volevamo fare i complimenti per i due appartamentini che ci ha dato, veramente belli, comodi e funzionale grazie per la sua disponibilità. Speriamo di rivederci a presto e grazie ancora per averci ospitati. Buona giornata",
    name: "Giuseppe P.",
    location: "Ragusa, Italia",
    initials: "GP",
    date: "Settembre 2026",
    rating: 5,
    source: "Airbnb",
  },
  {
    quote:
      "Everything was absolutely perfect! The apartment was wonderful, and the staff provided exceptional service throughout our stay. We had a fantastic experience and will definitely be back! Highly recommended!",
    name: "Armine",
    location: "Yerevan, Armenia",
    initials: "A",
    date: "Ottobre 2026",
    rating: 5,
    source: "Airbnb",
  },
  {
    quote:
      "Great host, the space was super clean and lots of space ! She was really nice and gave me some coupons for croissants and coffee ! Amazing place",
    name: "Victoria",
    location: "Monterrey, Messico",
    initials: "V",
    date: "Ottobre 2026",
    rating: 5,
    source: "Airbnb",
  },
  {
    quote:
      "Our stay was fantastic from start to finish! The space was beautiful, well-maintained, and equipped with everything we needed. The bed was extremely comfortable / The location made it so easy to walk to nearby cafes, supermarkets etc.Ilaria was an excellent host—communication was clear and welcoming throughout. We would definitely love to stay here again😊 10/10👏",
    name: "Nardos",
    location: "1 anno su Airbnb",
    initials: "N",
    date: "Ottobre 2026",
    rating: 5,
    source: "Airbnb",
  },
  {
    quote:
      "Il soggiorno nell'appartamento di Ilaria è stato super. La casa è davvero bella e confortevole. C'è grande cura del dettaglio e la pulizia era egregia. La posizione è comoda, vicino alla metro linea A da cui ti colleghi a tutto. In fase di check out Ilaria è stata davvero gentile e ci ha ospitato i bagagli oltre il tempo consentito. Questo è stato molto importante perché ci ha permesso di visitare anche il giorno di rientro. Consigliatissimo",
    name: "Erika",
    location: "6 mesi su Airbnb",
    initials: "E",
    date: "Ottobre 2026",
    rating: 5,
    source: "Airbnb",
  },
  {
    quote:
      "Modern apartment with everything we needed, just a 5-minute walk from the metro. The host gave us a warm welcome, and breakfast included a croissant and cappuccino at the café next door. We had a very pleasant stay!",
    name: "Helene",
    location: "1 mese su Airbnb",
    initials: "H",
    date: "Ottobre 2026",
    rating: 5,
    source: "Airbnb",
  },
  {
    quote:
      "Appartement tout neuf à 5 min du métro . Hauts plafonds, cuisine et bain aménagés, climatisation, sèche cheveux, machine à laver , lave vaisselle... tout parfait . Excellent accueil de notre hôte !",
    name: "José Manuel",
    location: "5 anni su Airbnb",
    initials: "JM",
    date: "Ottobre 2026",
    rating: 5,
    source: "Airbnb",
  },
];

export default function Testimonials({
  title = "Svegliarsi a San Giovanni",
  subtitle = "Le impressioni di chi ha vissuto Roma da queste stanze",
  reviews = defaultReviews,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 6000,
}: TestimonialsProps) {
  const totalReviews = reviews.length;

  // --- Infinite loop via clones ---
  // La lista renderizzata è [ultima, ...tutte, prima], quindi:
  //   indice 0          = clone dell'ultima slide (usato per il "salto silenzioso" indietro)
  //   indici 1..N       = slide reali
  //   indice N+1        = clone della prima slide (usato per il "salto silenzioso" avanti)
  // L'indice "logico" visibile va da 0 a N-1; quello "interno" (trackIndex) va da 1 a N.
  const [trackIndex, setTrackIndex] = useState(1); // parte dalla prima slide reale
  const [isAnimating, setIsAnimating] = useState(true); // false = salto silenzioso senza CSS

  // Indice logico per i pallini (0-based sul numero di slide reali)
  const dotIndex = trackIndex <= 0 ? totalReviews - 1
    : trackIndex >= totalReviews + 1 ? 0
    : trackIndex - 1;

  // Lista estesa con clone inizio/fine
  const extendedReviews =
    totalReviews > 1
      ? [reviews[totalReviews - 1], ...reviews, reviews[0]]
      : reviews;

  // Coordinate touch per gestire lo swipe su mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    if (totalReviews <= 1) return;
    setIsAnimating(true);
    setTrackIndex((prev) => prev - 1);
  }, [totalReviews]);

  const handleNext = useCallback(() => {
    if (totalReviews <= 1) return;
    setIsAnimating(true);
    setTrackIndex((prev) => prev + 1);
  }, [totalReviews]);

  // Quando la transizione CSS finisce, controlliamo se siamo su un clone
  // e, in tal caso, saltiamo silenziosamente alla slide reale corrispondente
  const handleTransitionEnd = useCallback(() => {
    if (trackIndex === 0) {
      // Eravamo sul clone dell'ultima: salta all'ultima reale senza animazione
      setIsAnimating(false);
      setTrackIndex(totalReviews);
    } else if (trackIndex === totalReviews + 1) {
      // Eravamo sul clone della prima: salta alla prima reale senza animazione
      setIsAnimating(false);
      setTrackIndex(1);
    }
  }, [trackIndex, totalReviews]);

  // Gestione swipe su mobile
  const minSwipeDistance = 40;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchEndY(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (
      totalReviews <= 1 ||
      touchStartX === null ||
      touchEndX === null ||
      touchStartY === null ||
      touchEndY === null
    ) {
      return;
    }

    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;

    // Assicuriamoci che il movimento sia prevalentemente orizzontale
    // per non interferire con lo scrolling verticale naturale della pagina
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe verso sinistra -> vai avanti
        handleNext();
      } else {
        // Swipe verso destra -> vai indietro
        handlePrev();
      }
    }

    setTouchStartX(null);
    setTouchStartY(null);
    setTouchEndX(null);
    setTouchEndY(null);
  };

  // Navigazione da tastiera con le frecce quando il carousel ha il focus
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Autoplay opzionale (se attivato da props)
  useEffect(() => {
    if (!autoPlay || totalReviews <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, totalReviews, handleNext]);

  return (
    <section
      id="reviews"
      className="bg-bianco"
      style={{
        paddingTop: "var(--spacing-padding-section-medium)",
        paddingBottom: "var(--spacing-padding-section-medium)",
      }}
    >
      <div className="mx-auto max-w-container-large px-padding-global">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="max-w-xl">
            <h2 className="font-heading text-4xl md:text-5xl leading-tight text-blu">
              {title}
            </h2>
            <p className="mt-3 text-base md:text-lg leading-relaxed text-grigio-scuro">
              {subtitle}
            </p>
          </div>

          <div className="min-w-0 w-full">
            {/* Finestra dello Slider Orizzontale con loop infinito */}
            <div
              className="relative w-full overflow-hidden touch-pan-y focus:outline-none focus:ring-2 focus:ring-oro/50 rounded-sm"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="region"
              aria-roledescription="carousel"
              aria-label="Recensioni degli ospiti"
            >
              <div
                className={`flex items-stretch will-change-transform ${isAnimating ? "transition-transform duration-500 ease-out" : ""}`}
                style={{ transform: `translateX(-${trackIndex * 100}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedReviews.map((review, index) => {
                  return (
                    <div
                      key={`${review.name}-${index}`}
                      className="w-full shrink-0 flex flex-col"
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`Recensione ${index + 1} di ${totalReviews}`}
                    >
                      {/* Box Recensione con altezza fissa uniforme */}
                      <article className="flex flex-1 flex-col justify-between border-2 border-oro bg-bianco p-6 text-grigio-scuro md:p-8">
                        <div className="space-y-4">
                          {/* Mese della Recensione e Valutazione a Stelle */}
                          <div className="flex items-center justify-between gap-4 border-b border-oro/20 pb-3">
                            {review.date ? (
                              <p className="text-sm font-medium text-grigio">
                                {formatMonthOnly(review.date)}
                              </p>
                            ) : (
                              <span />
                            )}

                            {review.rating && (
                              <div
                                className="flex items-center gap-1 text-oro"
                                aria-label={`Valutazione: ${review.rating} su 5 stelle`}
                              >
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <svg
                                    key={i}
                                    className="h-4 w-4 fill-current text-oro"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Testo del feedback (troncato a massimo 250 caratteri con ...) */}
                          <p className="text-base leading-6 sm:leading-7 text-grigio-scuro italic md:text-lg">
                            &ldquo;{truncateQuote(review.quote, 250)}&rdquo;
                          </p>
                        </div>

                        {/* Profilo Ospite */}
                        <div className="mt-4 flex items-center gap-4 border-t border-oro/20 pt-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-oro-chiaro font-heading text-sm font-semibold text-blu">
                            {review.initials ?? review.name.slice(0, 2).toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="text-base font-semibold leading-6 text-blu">
                              {review.name}
                            </p>
                            <p className="text-sm leading-5 text-grigio">
                              {review.location}
                            </p>
                          </div>
                        </div>
                      </article>

                      {/* Citazione Fonte Airbnb sotto al box */}
                      <div className="mt-2.5 flex items-center justify-between px-1 text-xs text-grigio">
                        <span className="flex items-center gap-1.5">
                          <span>Fonte:</span>
                          <span className="font-semibold text-blu">
                            {review.source ?? "Airbnb"}
                          </span>
                        </span>
                        <span className="text-[11px] text-grigio/80">Recensione verificata</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controlli di navigazione (Frecce e Pallini) */}
            {totalReviews > 1 && (
              <div className="mt-6 flex items-center justify-between gap-4">
                {/* Freccia Indietro */}
                {showArrows && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Recensione precedente"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-oro/60 bg-bianco text-blu shadow-xs transition-all hover:bg-oro-chiaro/40 hover:border-oro active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-oro"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )}

                {/* Pallini indicatori (Dots) */}
                {showDots && (
                  <div
                    className="flex flex-1 items-center justify-center gap-2 py-1"
                    role="tablist"
                    aria-label="Selettore recensioni"
                  >
                    {reviews.map((_, index) => {
                      const isActive = dotIndex === index;
                      return (
                        <button
                          key={index}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-label={`Vai alla recensione ${index + 1} di ${totalReviews}`}
                          onClick={() => { setIsAnimating(true); setTrackIndex(index + 1); }}
                          className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-oro cursor-pointer ${isActive
                            ? "h-2.5 w-7 bg-oro"
                            : "h-2.5 w-2.5 bg-oro/30 hover:bg-oro/60"
                            }`}
                        />
                      );
                    })}
                  </div>
                )}

                {/* Freccia Avanti */}
                {showArrows && (
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Recensione successiva"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-oro/60 bg-bianco text-blu shadow-xs transition-all hover:bg-oro-chiaro/40 hover:border-oro active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-oro"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Suggerimento per gesture mobile */}
            {totalReviews > 1 && (
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-grigio/70 md:hidden">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                <span>Scorri con il dito per sfogliare</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
