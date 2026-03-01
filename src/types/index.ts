export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  category: ProductCategory;
  collection: ProductCollection;
  tags: string[];
  rating: number;
  reviewCount: number;
  ingredients: string[];
  benefits: string[];
  howToUse: string;
  size: string;
  badge?: "new" | "bestseller" | "limited" | "sale";
  inStock: boolean;
  gradient: string;
  accentColor: string;
}

export type ProductCategory =
  | "serums"
  | "moisturizers"
  | "cleansers"
  | "masks"
  | "eye-care"
  | "sun-protection"
  | "toners"
  | "mists";

export type ProductCollection =
  | "gold"
  | "crystal"
  | "pearl"
  | "essentials";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface FilterState {
  categories: ProductCategory[];
  collections: ProductCollection[];
  priceRange: [number, number];
  sortBy: SortOption;
  searchQuery: string;
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

export type Route =
  | "/"
  | "/shop"
  | "/about"
  | "/contact"
  | "/cart"
  | "/checkout"
  | `/product/${string}`;
