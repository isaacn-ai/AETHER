import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Heart, Star, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface QuickViewProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export function QuickView({
  product,
  open,
  onClose,
  onNavigate,
}: QuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div
            className={`${product.gradient} aspect-square sm:aspect-auto sm:min-h-[400px] flex items-center justify-center`}
          >
            <span className="text-8xl font-serif text-white/10">
              {product.name.charAt(0)}
            </span>
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="text-left">
              <div className="flex items-center gap-2 mb-1">
                {product.badge && (
                  <Badge
                    variant={
                      product.badge as
                        | "new"
                        | "bestseller"
                        | "sale"
                        | "limited"
                    }
                  >
                    {product.badge}
                  </Badge>
                )}
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="text-xs text-muted-foreground">
                    {product.rating}
                  </span>
                </div>
              </div>
              <DialogTitle className="font-serif text-xl">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                {product.shortDescription}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-xl font-medium text-gold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <Separator className="my-4" />

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {product.description}
            </p>

            <p className="text-xs text-muted-foreground mt-3">
              {product.size}
            </p>

            <div className="mt-auto pt-6 space-y-3">
              {/* Quantity */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Qty:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="luxury"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Bag
                </Button>
                <Button
                  variant="outline"
                  size="icon"
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

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs"
                onClick={() => {
                  onClose();
                  onNavigate(`/product/${product.slug}`);
                }}
              >
                View Full Details
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
