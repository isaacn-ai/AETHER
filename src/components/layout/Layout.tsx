import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

interface LayoutProps {
  children: ReactNode;
  currentRoute: string;
  onNavigate: (path: string) => void;
}

export function Layout({ children, currentRoute, onNavigate }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar currentRoute={currentRoute} onNavigate={onNavigate} />
      <main className="flex-1">{children}</main>
      <Footer onNavigate={onNavigate} />
      <CartDrawer onNavigate={onNavigate} />
    </div>
  );
}
