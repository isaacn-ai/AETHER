import { useCart } from "@/context/CartContext";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GoldDivider } from "@/components/shared/GoldDivider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface CartPageProps {
  onNavigate: (path: string) => void;
}

export function CartPage({ onNavigate }: CartPageProps) {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    shipping,
    tax,
    total,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-4">
        <AnimatedSection className="text-center">
          <div className="rounded-full bg-muted p-8 mx-auto w-fit mb-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="font-serif text-3xl mb-3">Your Bag is Empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Explore our luxury skincare collection and find your perfect routine.
          </p>
          <Button
            variant="luxury"
            size="lg"
            onClick={() => onNavigate("/shop")}
            className="group"
          >
            Start Shopping
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </AnimatedSection>
      </section>
    );
  }

  return (
    <section className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl">Shopping Bag</h1>
            <GoldDivider variant="line" className="py-4" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                {items.length} item{items.length !== 1 ? "s" : ""}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
                onClick={clearCart}
              >
                Clear All
              </Button>
            </div>

            <div className="divide-y">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 sm:gap-6 py-6">
                  <div
                    className={`${item.product.gradient} h-24 w-24 sm:h-32 sm:w-32 rounded-lg flex-shrink-0 flex items-center justify-center cursor-pointer`}
                    onClick={() =>
                      onNavigate(`/product/${item.product.slug}`)
                    }
                  >
                    <span className="text-3xl font-serif text-white/10">
                      {item.product.name.charAt(0)}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h3
                          className="font-serif cursor-pointer hover:text-primary transition-colors"
                          onClick={() =>
                            onNavigate(`/product/${item.product.slug}`)
                          }
                        >
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.product.size}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="text-sm font-medium text-gold">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-card border rounded-xl p-6">
              <h3 className="font-serif text-lg mb-6">Order Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Complimentary
                      </span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Tax (estimated)
                  </span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-muted-foreground mt-3">
                  Add {formatPrice(150 - subtotal)} more for complimentary
                  shipping
                </p>
              )}

              <Separator className="my-4" />

              <div className="flex justify-between font-medium text-lg mb-6">
                <span>Total</span>
                <span className="text-gold">{formatPrice(total)}</span>
              </div>

              <Button
                variant="luxury"
                size="lg"
                className="w-full group"
                onClick={() => onNavigate("/checkout")}
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3 text-xs"
                onClick={() => onNavigate("/shop")}
              >
                Continue Shopping
              </Button>

              <Separator className="my-6" />

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Truck className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Free shipping on orders over $150</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <RotateCcw className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>30-day hassle-free returns</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Secure SSL encrypted checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
