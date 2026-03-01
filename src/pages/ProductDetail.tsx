import { useState, useMemo } from "react";
import { products, reviews } from "@/data/products";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GoldDivider } from "@/components/shared/GoldDivider";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShoppingBag,
  Heart,
  Star,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Shield,
  ChevronLeft,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import { categoryLabels, collectionLabels } from "@/data/products";

interface ProductDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export function ProductDetail({ slug, onNavigate }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const product = products.find((p) => p.slug === slug);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && (p.collection === product.collection || p.category === product.category))
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => onNavigate("/shop")}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button
            onClick={() => onNavigate("/shop")}
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="h-3 w-3" />
            Shop
          </button>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product section */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <AnimatedSection animation="fadeIn">
              <div
                className={`${product.gradient} aspect-square rounded-2xl overflow-hidden relative sticky top-28`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[120px] font-serif text-white/10">
                    {product.name.charAt(0)}
                  </span>
                </div>
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant={
                        product.badge as
                          | "new"
                          | "bestseller"
                          | "sale"
                          | "limited"
                      }
                      className="text-sm px-3 py-1"
                    >
                      {product.badge}
                    </Badge>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Details */}
            <AnimatedSection animation="fadeUp">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-sans tracking-wider uppercase text-primary">
                    {collectionLabels[product.collection]}
                  </span>
                  <span className="text-xs text-muted-foreground">|</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {categoryLabels[product.category]}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl mb-3">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-serif text-gold">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>

                <p className="text-sm text-muted-foreground mb-8">
                  Size: {product.size}
                </p>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-3 border rounded-md px-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="luxury"
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Bag — {formatPrice(product.price * quantity)}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => toggleItem(product)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isInWishlist(product.id)
                          ? "fill-red-500 text-red-500"
                          : ""
                      }`}
                    />
                  </Button>
                </div>

                {/* Trust signals */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Free shipping $150+</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <RotateCcw className="h-4 w-4 text-primary" />
                    <span>30-day returns</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Secure checkout</span>
                  </div>
                </div>

                <Separator className="mb-8" />

                {/* Tabs */}
                <Tabs defaultValue="benefits" className="w-full">
                  <TabsList className="w-full justify-start bg-transparent border-b rounded-none p-0 h-auto">
                    {["benefits", "ingredients", "how-to-use"].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-xs tracking-wider uppercase"
                      >
                        {tab.replace(/-/g, " ")}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value="benefits" className="pt-6">
                    <ul className="space-y-3">
                      {product.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start gap-3 text-sm"
                        >
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="ingredients" className="pt-6">
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients.map((ingredient) => (
                        <span
                          key={ingredient}
                          className="text-sm bg-muted px-3 py-1.5 rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="how-to-use" className="pt-6">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {product.howToUse}
                    </p>
                  </TabsContent>
                </Tabs>

                {/* FAQ */}
                <div className="mt-8">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="shipping">
                      <AccordionTrigger className="text-sm">
                        Shipping Information
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Complimentary shipping on orders over $150. Standard
                        shipping (3-5 business days) is $12. Express shipping
                        (1-2 business days) is available at checkout.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="returns">
                      <AccordionTrigger className="text-sm">
                        Returns & Exchanges
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        We accept returns within 30 days of purchase for unused,
                        unopened products in original packaging. Contact our
                        customer care team to initiate a return.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl">
              Customer Reviews
            </h2>
            <GoldDivider variant="line" className="py-4" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <AnimatedSection key={review.id} animation="fadeUp">
                <div className="bg-card border rounded-xl p-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < review.rating
                            ? "fill-primary text-primary"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <h4 className="font-medium text-sm mb-2">{review.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    &ldquo;{review.body}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{review.author}</span>
                    {review.verified && (
                      <Badge variant="gold" className="text-[10px]">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl">
                You May Also Like
              </h2>
              <GoldDivider variant="line" className="py-4" />
            </AnimatedSection>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
