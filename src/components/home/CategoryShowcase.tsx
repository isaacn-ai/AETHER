import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GoldDivider } from "@/components/shared/GoldDivider";
import { ArrowRight } from "lucide-react";
import { collectionDescriptions } from "@/data/products";

interface CategoryShowcaseProps {
  onNavigate: (path: string) => void;
}

const collections = [
  {
    key: "gold",
    name: "The Gold Collection",
    gradient: "product-gradient-gold",
    initial: "Au",
  },
  {
    key: "crystal",
    name: "The Crystal Collection",
    gradient: "product-gradient-crystal",
    initial: "Cr",
  },
  {
    key: "pearl",
    name: "The Pearl Collection",
    gradient: "product-gradient-pearl",
    initial: "Pe",
  },
];

export function CategoryShowcase({ onNavigate }: CategoryShowcaseProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-sans tracking-luxury uppercase text-primary mb-3">
            Our Collections
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
            Curated for Excellence
          </h2>
          <GoldDivider variant="dots" className="py-6" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((collection, index) => (
            <AnimatedSection
              key={collection.key}
              animation="fadeUp"
              delay={index * 0.15}
            >
              <button
                onClick={() =>
                  onNavigate(`/shop?collection=${collection.key}`)
                }
                className="group block w-full text-left"
              >
                <div
                  className={`${collection.gradient} aspect-[3/4] rounded-xl overflow-hidden relative`}
                >
                  {/* Collection symbol */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl font-display italic text-white/10 group-hover:text-white/20 transition-colors duration-700">
                      {collection.initial}
                    </span>
                  </div>

                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-serif text-xl text-white mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-white/70 line-clamp-2">
                      {collectionDescriptions[collection.key]}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-white/80 group-hover:text-white transition-colors">
                      <span className="text-xs tracking-wider uppercase">
                        Explore
                      </span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
