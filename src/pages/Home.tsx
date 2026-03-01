import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStory } from "@/components/home/BrandStory";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { IngredientsSection } from "@/components/home/IngredientsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

interface HomeProps {
  onNavigate: (path: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <FeaturedProducts onNavigate={onNavigate} />
      <BrandStory onNavigate={onNavigate} />
      <CategoryShowcase onNavigate={onNavigate} />
      <IngredientsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
