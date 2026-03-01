import { GoldDivider } from "@/components/shared/GoldDivider";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-card border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GoldDivider variant="diamond" className="py-12" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 pb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl tracking-luxury uppercase mb-4">
              <span className="text-gradient-gold">Titan</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium skincare crafted with precious minerals and advanced
              biotechnology. Discover the art of timeless beauty.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-sans font-semibold tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Shop All", href: "/shop" },
                { label: "The Gold Collection", href: "/shop?collection=gold" },
                {
                  label: "The Crystal Collection",
                  href: "/shop?collection=crystal",
                },
                {
                  label: "The Pearl Collection",
                  href: "/shop?collection=pearl",
                },
                { label: "Bestsellers", href: "/shop?badge=bestseller" },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => onNavigate(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-sans font-semibold tracking-wider uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Our Story", href: "/about" },
                { label: "Ingredients", href: "/about" },
                { label: "Sustainability", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Careers", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-sans font-semibold tracking-wider uppercase mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Join our world of luxury skincare. Receive exclusive offers and
              beauty insights.
            </p>
            {subscribed ? (
              <p className="text-sm text-primary font-medium">
                Thank you for subscribing.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 text-sm"
                />
                <Button type="submit" size="sm" variant="default">
                  Join
                </Button>
              </form>
            )}
          </div>
        </div>

        <Separator />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Titan Cosmetic. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <button
                  key={item}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
