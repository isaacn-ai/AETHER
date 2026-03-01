import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { categoryLabels, collectionLabels } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import type { FilterState, ProductCategory, ProductCollection } from "@/types";

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  onClose,
  isMobile,
}: FilterSidebarProps) {
  const toggleCategory = (category: ProductCategory) => {
    const categories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories });
  };

  const toggleCollection = (collection: ProductCollection) => {
    const collections = filters.collections.includes(collection)
      ? filters.collections.filter((c) => c !== collection)
      : [...filters.collections, collection];
    onFiltersChange({ ...filters, collections });
  };

  const clearAll = () => {
    onFiltersChange({
      categories: [],
      collections: [],
      priceRange: [0, 300],
      sortBy: "featured",
      searchQuery: "",
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.collections.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 300;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg">Filters</h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-xs text-muted-foreground"
            >
              Clear All
            </Button>
          )}
          {isMobile && onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Collections */}
      <div>
        <h4 className="text-sm font-medium mb-3 tracking-wide uppercase">
          Collections
        </h4>
        <div className="space-y-2.5">
          {(Object.keys(collectionLabels) as ProductCollection[]).map(
            (collection) => (
              <label
                key={collection}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <Checkbox
                  checked={filters.collections.includes(collection)}
                  onCheckedChange={() => toggleCollection(collection)}
                />
                <Label className="cursor-pointer text-sm font-normal">
                  {collectionLabels[collection]}
                </Label>
              </label>
            )
          )}
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <h4 className="text-sm font-medium mb-3 tracking-wide uppercase">
          Category
        </h4>
        <div className="space-y-2.5">
          {(Object.keys(categoryLabels) as ProductCategory[]).map(
            (category) => (
              <label
                key={category}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <Checkbox
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label className="cursor-pointer text-sm font-normal">
                  {categoryLabels[category]}
                </Label>
              </label>
            )
          )}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-medium mb-3 tracking-wide uppercase">
          Price Range
        </h4>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              priceRange: value as [number, number],
            })
          }
          min={0}
          max={300}
          step={10}
          className="mt-4"
        />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{formatPrice(filters.priceRange[0])}</span>
          <span>{formatPrice(filters.priceRange[1])}</span>
        </div>
      </div>
    </div>
  );
}
