import { products } from "@/data/products";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GoldDivider } from "@/components/shared/GoldDivider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Heart, Star, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";

interface FeaturedProductsProps {
  onNavigate: (path: string) => void;
}

export function FeaturedProducts({ onNavigate }: FeaturedProductsProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const featured = products.filter(
    (p) => p.badge === "bestseller" || p.badge === "new"
  ).slice(0, 4);

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-sans tracking-luxury uppercase text-primary mb-3">
            Curated Selection
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
            Featured Products
          </h2>
          <GoldDivider variant="dots" className="py-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most coveted formulas, chosen for their extraordinary
            efficacy and luxurious sensory experience.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featured.map((product, index) => (
            <AnimatedSection
              key={product.id}
              animation="fadeUp"
              delay={index * 0.1}
            >
              <div className="group relative">
                {/* Image */}
                <div
                  className={`${product.gradient} aspect-[3/4] rounded-xl overflow-hidden relative cursor-pointer`}
                  onClick={() => onNavigate(`/product/${product.slug}`)}
                >
                  {/* Product initial */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-serif text-white/10 group-hover:text-white/20 transition-colors duration-500">
                      {product.name.charAt(0)}
                    </span>
                  </div>

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={
                          product.badge as "new" | "bestseller" | "sale" | "limited"
                        }
                      >
                        {product.badge}
                      </Badge>
                    </div>
                  )}

                  {/* Hover actions */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1 bg-white/90 text-black hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem(product);
                        }}
                      >
                        <ShoppingBag className="h-3.5 w-3.5 mr-1" />
                        Add to Bag
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="bg-white/90 text-black hover:bg-white h-9 w-9"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItem(product);
                        }}
                      >
                        <Heart
                          className={`h-3.5 w-3.5 ${
                            isInWishlist(product.id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Product info */}
                <div className="mt-4 space-y-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-xs text-muted-foreground">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>
                  <h3
                    className="font-serif text-base cursor-pointer hover:text-primary transition-colors"
                    onClick={() => onNavigate(`/product/${product.slug}`)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {product.shortDescription}
                  </p>
                  <p className="text-sm font-medium text-gold">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-14">
          <Button
            variant="outline"
            size="lg"
            onClick={() => onNavigate("/shop")}
            className="group"
          >
            View All Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
