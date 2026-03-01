import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartItem } from "./CartItem";
import { formatPrice } from "@/lib/utils";

interface CartDrawerProps {
  onNavigate: (path: string) => void;
}

export function CartDrawer({ onNavigate }: CartDrawerProps) {
  const { items, isOpen, closeCart, subtotal, shipping, total, totalItems } =
    useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle className="font-serif text-xl">
            Shopping Bag ({totalItems})
          </SheetTitle>
          <SheetDescription className="sr-only">
            Your shopping cart items
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
            <div className="rounded-full bg-muted p-6">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="font-serif text-lg">Your bag is empty</p>
              <p className="text-sm text-muted-foreground mt-1">
                Discover our luxury skincare collection
              </p>
            </div>
            <Button
              className="mt-2"
              onClick={() => {
                closeCart();
                onNavigate("/shop");
              }}
            >
              Explore Products
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </ScrollArea>

            <div className="border-t bg-muted/30 p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
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
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  Free shipping on orders over $150
                </p>
              )}
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span className="text-gold">{formatPrice(total)}</span>
              </div>
              <div className="space-y-2 pt-2">
                <Button
                  className="w-full"
                  variant="luxury"
                  size="lg"
                  onClick={() => {
                    closeCart();
                    onNavigate("/checkout");
                  }}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    closeCart();
                    onNavigate("/cart");
                  }}
                >
                  View Full Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
