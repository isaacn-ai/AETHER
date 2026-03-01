import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GoldDivider } from "@/components/shared/GoldDivider";
import { Star, Quote } from "lucide-react";
import { reviews } from "@/data/products";

export function TestimonialsSection() {
  const featuredReviews = reviews.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-sans tracking-luxury uppercase text-primary mb-3">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
            Loved by Thousands
          </h2>
          <GoldDivider variant="dots" className="py-6" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredReviews.map((review, index) => (
            <AnimatedSection
              key={review.id}
              animation="fadeUp"
              delay={index * 0.15}
            >
              <div className="bg-card border rounded-xl p-8 h-full flex flex-col relative">
                <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />

                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-primary text-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>

                <h4 className="font-serif text-lg mb-3">{review.title}</h4>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  &ldquo;{review.body}&rdquo;
                </p>

                <div className="mt-6 pt-4 border-t flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {review.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.author}</p>
                    {review.verified && (
                      <p className="text-xs text-primary">Verified Purchase</p>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
