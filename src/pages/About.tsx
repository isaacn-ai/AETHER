import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GoldDivider } from "@/components/shared/GoldDivider";
import { Button } from "@/components/ui/button";
import {
  Beaker,
  Leaf,
  Heart,
  Award,
  ArrowRight,
  Globe,
  Sparkles,
  Shield,
} from "lucide-react";

interface AboutProps {
  onNavigate: (path: string) => void;
}

const values = [
  {
    icon: Beaker,
    title: "Science-Driven",
    description:
      "Every formula is backed by peer-reviewed research and developed in our Swiss laboratories with the latest in dermatological science.",
  },
  {
    icon: Leaf,
    title: "Clean Beauty",
    description:
      "Free from parabens, sulfates, phthalates, and artificial fragrances. 98% naturally derived ingredients sourced ethically.",
  },
  {
    icon: Heart,
    title: "Cruelty Free",
    description:
      "We never test on animals. All products are certified cruelty-free and we are committed to ethical beauty practices.",
  },
  {
    icon: Globe,
    title: "Sustainable",
    description:
      "Eco-conscious packaging, carbon-neutral shipping, and partnerships with reforestation programs worldwide.",
  },
];

const milestones = [
  { year: "2024", title: "Founded", description: "Titan Cosmetic is born with a vision to redefine luxury skincare." },
  { year: "2024", title: "First Collection", description: "Launch of The Gold Collection with 3 hero products." },
  { year: "2025", title: "Global Expansion", description: "Expanded to 25+ countries with Crystal and Pearl collections." },
  { year: "2026", title: "50K Customers", description: "Reached 50,000 loyal customers worldwide." },
];

export function About({ onNavigate }: AboutProps) {
  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection animation="slideLeft">
              <p className="text-sm font-sans tracking-luxury uppercase text-primary mb-4">
                Our Story
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight">
                Redefining{" "}
                <span className="text-gradient-gold italic">Luxury</span>{" "}
                Skincare
              </h1>
              <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Titan Cosmetic was founded on a singular belief: that truly
                  exceptional skincare should deliver visible, transformative
                  results without compromising on integrity.
                </p>
                <p>
                  Combining decades of dermatological research with the world's
                  most precious natural ingredients — from 24K gold to marine
                  collagen to crystalline minerals — we've created formulations
                  that honor the science of skin while celebrating the art of
                  self-care.
                </p>
                <p>
                  Every product in our collection represents the pinnacle of
                  clean luxury: potent, purposeful, and crafted with unwavering
                  attention to detail.
                </p>
              </div>
              <Button
                variant="luxury"
                size="lg"
                className="mt-8 group"
                onClick={() => onNavigate("/shop")}
              >
                Explore Our Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </AnimatedSection>

            <AnimatedSection animation="slideRight">
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl product-gradient-gold overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="h-16 w-16 text-white/10 mx-auto mb-4" />
                      <span className="block text-xs tracking-luxury uppercase text-white/20">
                        Crafted with Purpose
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-4 lg:-left-8 bg-card border rounded-xl p-5 shadow-lg">
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Award Winning</p>
                      <p className="text-xs text-muted-foreground">
                        15+ beauty awards
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-sans tracking-luxury uppercase text-primary mb-3">
              Our Values
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl">
              What We Stand For
            </h2>
            <GoldDivider variant="dots" className="py-6" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedSection
                key={value.title}
                animation="fadeUp"
                delay={index * 0.1}
              >
                <div className="text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-sans tracking-luxury uppercase text-primary mb-3">
              Our Journey
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl">
              Milestones
            </h2>
            <GoldDivider variant="dots" className="py-6" />
          </AnimatedSection>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <AnimatedSection
                key={index}
                animation="fadeUp"
                delay={index * 0.1}
              >
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-16 pt-1">
                    <span className="text-sm font-medium text-primary">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="relative pl-6 border-l border-primary/20 pb-2">
                    <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-primary" />
                    <h3 className="font-serif text-lg">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl sm:text-4xl mb-6">
              The Titan Promise
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Every Titan product comes with our unwavering commitment: if you
              don't see visible results within 30 days, we'll refund your
              purchase — no questions asked. Because we believe in the
              transformative power of our formulations.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="mt-8"
              onClick={() => onNavigate("/contact")}
            >
              Get in Touch
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
