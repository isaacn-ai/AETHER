import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onNavigate: (path: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
      })
        .from(subRef.current, { y: 40, opacity: 0, duration: 0.9 }, "-=0.6")
        .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(
          orbRef.current,
          { scale: 0.5, opacity: 0, duration: 1.5, ease: "elastic.out(1,0.5)" },
          "-=1"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />

      {/* Decorative gold orb */}
      <div
        ref={orbRef}
        className="absolute right-[10%] top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div className="relative h-[400px] w-[400px] xl:h-[500px] xl:w-[500px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent animate-float" />
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-primary/5 animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute inset-16 rounded-full border border-primary/10 animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute inset-24 rounded-full bg-gradient-to-tr from-primary/5 to-transparent" />
          {/* Small accent dots */}
          <div className="absolute top-10 left-1/2 h-2 w-2 rounded-full bg-primary/30 animate-pulse-gold" />
          <div className="absolute bottom-20 right-10 h-1.5 w-1.5 rounded-full bg-primary/20 animate-pulse-gold" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/3 left-5 h-1 w-1 rounded-full bg-primary/25 animate-pulse-gold" style={{ animationDelay: "0.5s" }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-sans tracking-luxury uppercase text-primary mb-6">
            Premium Skincare
          </p>

          <h2
            ref={headingRef}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[0.95] tracking-tight"
          >
            Awaken
            <br />
            Your{" "}
            <span className="text-gradient-gold italic">Radiance</span>
          </h2>

          <p
            ref={subRef}
            className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg font-light"
          >
            Science-backed luxury skincare that harnesses the power of precious
            minerals and advanced biotechnology for visibly transformative
            results.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
            <Button
              variant="luxury"
              size="xl"
              onClick={() => onNavigate("/shop")}
              className="group"
            >
              Discover Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => onNavigate("/about")}
            >
              Our Story
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-16 flex flex-wrap gap-8 text-xs text-muted-foreground tracking-wider uppercase">
            <span>Dermatologist Tested</span>
            <span className="hidden sm:inline">|</span>
            <span>Cruelty Free</span>
            <span className="hidden sm:inline">|</span>
            <span>Clean Ingredients</span>
          </div>
        </div>
      </div>
    </section>
  );
}
