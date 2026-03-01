import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface NotFoundProps {
  onNavigate: (path: string) => void;
}

export function NotFound({ onNavigate }: NotFoundProps) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-serif text-gradient-gold mb-6">404</p>
        <h2 className="font-serif text-2xl mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="luxury"
            onClick={() => onNavigate("/")}
            className="group"
          >
            Back to Home
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" onClick={() => onNavigate("/shop")}>
            Browse Products
          </Button>
        </div>
      </div>
    </section>
  );
}
