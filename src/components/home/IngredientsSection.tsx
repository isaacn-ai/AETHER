import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GoldDivider } from "@/components/shared/GoldDivider";
import { Droplets, Gem, Sun, Leaf } from "lucide-react";

const ingredients = [
  {
    icon: Gem,
    name: "24K Gold",
    description:
      "Stimulates collagen production and cellular renewal for firm, luminous skin.",
  },
  {
    icon: Droplets,
    name: "Hyaluronic Acid",
    description:
      "Attracts 1000x its weight in water for deep, lasting hydration.",
  },
  {
    icon: Sun,
    name: "Vitamin C",
    description:
      "Powerful antioxidant that brightens, protects, and evens skin tone.",
  },
  {
    icon: Leaf,
    name: "Botanical Extracts",
    description:
      "Ethically sourced plant actives that soothe, repair, and nourish.",
  },
];

export function IngredientsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-sans tracking-luxury uppercase text-primary mb-3">
            Clean Beauty
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
            Powered by Nature
          </h2>
          <GoldDivider variant="dots" className="py-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every ingredient is carefully selected for its proven efficacy and
            sourced from the finest origins worldwide.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ingredients.map((item, index) => (
            <AnimatedSection
              key={item.name}
              animation="fadeUp"
              delay={index * 0.1}
            >
              <div className="text-center group">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
