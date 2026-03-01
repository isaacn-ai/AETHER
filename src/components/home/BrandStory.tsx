import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface BrandStoryProps {
  onNavigate: (path: string) => void;
}

export function BrandStory({ onNavigate }: BrandStoryProps) {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <AnimatedSection animation="slideLeft">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl product-gradient-gold overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="block text-8xl font-serif text-white/10">
                      T
                    </span>
                    <span className="block text-xs tracking-luxury uppercase text-white/20 mt-4">
                      Est. 2024
                    </span>
                  </div>
                </div>
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-card border rounded-xl p-6 shadow-lg max-w-[220px]">
                <p className="text-3xl font-serif text-primary">15+</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Award-winning formulations
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Content side */}
          <AnimatedSection animation="slideRight">
            <div className="lg:pl-8">
              <p className="text-sm font-sans tracking-luxury uppercase text-primary mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Where Science Meets{" "}
                <span className="text-gradient-gold italic">Luxury</span>
              </h2>
              <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Born from a vision to redefine premium skincare, Titan
                  Cosmetic combines decades of dermatological research with the
                  world&apos;s most precious natural ingredients.
                </p>
                <p>
                  Each formula is meticulously crafted in our Swiss laboratories,
                  where cutting-edge biotechnology meets artisanal precision. We
                  believe that true luxury lies in results you can see and feel —
                  not just in packaging.
                </p>
                <p>
                  Our commitment to clean, sustainable beauty means every
                  product is free from parabens, sulfates, and artificial
                  fragrances — without ever compromising on efficacy.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-8">
                <div>
                  <p className="text-2xl font-serif text-primary">98%</p>
                  <p className="text-sm text-muted-foreground">
                    Natural ingredients
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-serif text-primary">50K+</p>
                  <p className="text-sm text-muted-foreground">
                    Happy customers
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-serif text-primary">0</p>
                  <p className="text-sm text-muted-foreground">
                    Animal testing
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="mt-10 group"
                onClick={() => onNavigate("/about")}
              >
                Learn More
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
