import { useState } from "react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/10 p-10 md:p-16 text-center overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 h-32 w-32 rounded-full bg-primary/5 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-primary/5 translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl mb-4">
                Join the World of{" "}
                <span className="text-gradient-gold italic">Titan</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                Subscribe for exclusive access to new launches, limited editions,
                beauty tips, and a 15% welcome discount on your first order.
              </p>

              {submitted ? (
                <div className="text-center">
                  <p className="text-primary font-serif text-xl mb-2">
                    Welcome to Titan
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Check your email for your exclusive 15% discount code.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-background/80"
                  />
                  <Button type="submit" variant="luxury" size="default">
                    Subscribe
                  </Button>
                </form>
              )}

              <p className="text-xs text-muted-foreground mt-4">
                No spam, ever. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
