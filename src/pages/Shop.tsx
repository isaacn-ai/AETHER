import { useState, useMemo } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { QuickView } from "@/components/shop/QuickView";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GoldDivider } from "@/components/shared/GoldDivider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, Grid3X3, LayoutGrid } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import type { FilterState, Product, SortOption } from "@/types";

interface ShopProps {
  onNavigate: (path: string) => void;
  initialSearch?: string;
  initialCollection?: string;
}

export function Shop({ onNavigate, initialSearch, initialCollection }: ShopProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    collections: initialCollection
      ? [initialCollection as FilterState["collections"][number]]
      : [],
    priceRange: [0, 300],
    sortBy: "featured",
    searchQuery: initialSearch ?? "",
  });
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          p.category.includes(q)
      );
    }

    // Categories
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Collections
    if (filters.collections.length > 0) {
      result = result.filter((p) =>
        filters.collections.includes(p.collection)
      );
    }

    // Price range
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Sort
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (a.badge === "new" ? -1 : b.badge === "new" ? 1 : 0));
        break;
      default:
        // featured - bestsellers first
        result.sort((a, b) =>
          a.badge === "bestseller" ? -1 : b.badge === "bestseller" ? 1 : 0
        );
    }

    return result;
  }, [filters]);

  return (
    <>
      {/* Page header */}
      <section className="pt-8 pb-6 lg:pt-12 lg:pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
                {initialCollection
                  ? `The ${initialCollection.charAt(0).toUpperCase() + initialCollection.slice(1)} Collection`
                  : "Shop All"}
              </h1>
              <GoldDivider variant="line" className="py-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {initialSearch
                  ? `Showing results for "${initialSearch}"`
                  : "Explore our complete range of luxury skincare formulations."}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              </div>
            </aside>

            {/* Product area */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setMobileFilterOpen(true)}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {filteredProducts.length} product
                    {filteredProducts.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1">
                    <Button
                      variant={gridCols === 3 ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setGridCols(3)}
                    >
                      <Grid3X3 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant={gridCols === 4 ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setGridCols(4)}
                    >
                      <LayoutGrid className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) =>
                      setFilters({ ...filters, sortBy: value as SortOption })
                    }
                  >
                    <SelectTrigger className="w-[160px] h-9 text-xs">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-desc">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Product grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-serif text-xl mb-2">No products found</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Try adjusting your filters or search query.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        categories: [],
                        collections: [],
                        priceRange: [0, 300],
                        sortBy: "featured",
                        searchQuery: "",
                      })
                    }
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div
                  className={`grid grid-cols-2 gap-4 sm:gap-6 ${
                    gridCols === 4
                      ? "lg:grid-cols-4"
                      : "lg:grid-cols-3"
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onNavigate={onNavigate}
                      onQuickView={setQuickViewProduct}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filter sheet */}
      <Sheet
        open={mobileFilterOpen}
        onOpenChange={(open) => !open && setMobileFilterOpen(false)}
      >
        <SheetContent side="left" className="p-6">
          <SheetTitle className="sr-only">Filters</SheetTitle>
          <SheetDescription className="sr-only">
            Filter products by collection, category, and price
          </SheetDescription>
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            onClose={() => setMobileFilterOpen(false)}
            isMobile
          />
        </SheetContent>
      </Sheet>

      {/* Quick view */}
      <QuickView
        product={quickViewProduct}
        open={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onNavigate={onNavigate}
      />
    </>
  );
}
