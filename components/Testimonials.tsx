export type TestimonialReview = {
  quote: string;
  name: string;
  location: string;
  initials?: string;
  date?: string;
};

export interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  reviews?: TestimonialReview[];
}

const defaultReviews: TestimonialReview[] = [
  {
    quote: "Signora buongiorno le volevamo fare i complimenti per i due appartamentini che ci ha dato, veramente belli,comodi e funzionale grazie per la sua disponibilità. Speriamo di rivederci a presto e grazie ancora per averci ospitati. Buona giornata",
    name: "Giuseppe P",
    location: "Ragusa, Italia",
    initials: "GP",
    date: "19 settembre 2026",
  },
];

export default function Testimonials({
  title = "Svegliarsi a San Giovanni",
  subtitle = "Le impressioni di chi ha vissuto Roma da queste stanze",
  reviews = defaultReviews,
}: TestimonialsProps) {
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

          <div>
            {reviews.map((review, index) => {
              return (
                <article
                  key={`${review.name}-${index}`}
                  className="flex flex-col justify-between border-2 border-oro bg-bianco p-6 text-grigio-scuro md:p-8"
                >
                  <div className="space-y-6">
                    {review.date && (
                      <p className="text-sm font-medium text-grigio-scuro">
                        {review.date}
                      </p>
                    )}

                    <div className="space-y-4">
                      <p className="text-base leading-7 text-grigio-scuro">
                        &ldquo;{review.quote}&rdquo;
                      </p>

                      <div className="flex items-center gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-oro-chiaro font-heading text-sm font-semibold text-blu">
                          {review.initials ?? review.name.slice(0, 2).toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <p className="text-base font-semibold leading-6 text-blu">
                            {review.name}
                          </p>
                          <p className="text-base leading-6 text-grigio-scuro">
                            {review.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
