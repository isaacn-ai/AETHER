import { useState } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

interface NavbarProps {
  currentRoute: string;
  onNavigate: (path: string) => void;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isScrolled = useScroll(30);
  const { openCart, totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary/10 text-center py-2 px-4">
        <p className="text-xs tracking-luxury uppercase text-primary font-medium">
          Complimentary shipping on orders over $150
        </p>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-500",
          isScrolled
            ? "bg-background/95 backdrop-blur-lg shadow-sm border-b"
            : "bg-background/80 backdrop-blur-sm"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            {/* Desktop nav links (left) */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => onNavigate(link.href)}
                  className={cn(
                    "text-sm font-sans tracking-wide transition-colors duration-200 hover:text-primary relative py-1",
                    currentRoute === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                  {currentRoute === link.href && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary" />
                  )}
                </button>
              ))}
            </div>

            {/* Logo (center) */}
            <button
              onClick={() => onNavigate("/")}
              className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-auto lg:translate-x-0"
            >
              <h1 className="font-serif text-xl lg:text-2xl tracking-luxury uppercase">
                <span className="text-gradient-gold font-semibold">Titan</span>
              </h1>
            </button>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Search className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate("/about")}
                className="hidden sm:inline-flex text-muted-foreground hover:text-foreground"
              >
                <User className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
                onClick={() => onNavigate("/shop")}
              >
                <Heart className="h-4 w-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {wishlistCount}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
                onClick={openCart}
              >
                <ShoppingBag className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </nav>

        {/* Search bar */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 border-t",
            isSearchOpen ? "max-h-20 py-3" : "max-h-0 py-0 border-t-0"
          )}
        >
          <form
            onSubmit={handleSearch}
            className="mx-auto max-w-2xl px-4 flex gap-2"
          >
            <Input
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              autoFocus={isSearchOpen}
            />
            <Button type="submit" variant="default" size="default">
              Search
            </Button>
          </form>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 border-t",
            isMobileMenuOpen ? "max-h-60" : "max-h-0 border-t-0"
          )}
        >
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  onNavigate(link.href);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "block w-full text-left px-3 py-2 text-sm font-sans tracking-wide rounded-md transition-colors",
                  currentRoute === link.href
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
