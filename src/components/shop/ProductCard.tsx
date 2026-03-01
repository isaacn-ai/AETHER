import { ShoppingBag, Heart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({
  product,
  onNavigate,
  onQuickView,
}: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  return (
    <div className="group">
      {/* Image */}
      <div
        className={`${product.gradient} aspect-[3/4] rounded-xl overflow-hidden relative cursor-pointer`}
        onClick={() => onNavigate(`/product/${product.slug}`)}
      >
        {/* Product initial */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-serif text-white/10 group-hover:text-white/15 transition-colors duration-500">
            {product.name.charAt(0)}
          </span>
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge
              variant={product.badge as "new" | "bestseller" | "sale" | "limited"}
            >
              {product.badge}
            </Badge>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleItem(product);
          }}
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
        >
          <Heart
            className={`h-3.5 w-3.5 ${
              isInWishlist(product.id)
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }`}
          />
        </button>

        {/* Hover actions */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 bg-white/90 text-black hover:bg-white text-xs"
              onClick={(e) => {
                e.stopPropagation();
                addItem(product);
              }}
            >
              <ShoppingBag className="h-3 w-3 mr-1" />
              Add to Bag
            </Button>
            {onQuickView && (
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/90 text-black hover:bg-white h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(product);
                }}
              >
                <Eye className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Product info */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <h3
          className="font-serif text-sm cursor-pointer hover:text-primary transition-colors leading-tight"
          onClick={() => onNavigate(`/product/${product.slug}`)}
        >
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {product.shortDescription}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gold">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
