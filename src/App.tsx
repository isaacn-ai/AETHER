import { useState, useEffect, useCallback } from "react";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { Shop } from "@/pages/Shop";
import { ProductDetail } from "@/pages/ProductDetail";
import { CartPage } from "@/pages/Cart";
import { Checkout } from "@/pages/Checkout";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { NotFound } from "@/pages/NotFound";

function parseHash(hash: string): {
  path: string;
  params: Record<string, string>;
} {
  const clean = hash.replace(/^#/, "") || "/";
  const [path, queryString] = clean.split("?");
  const params: Record<string, string> = {};
  if (queryString) {
    for (const pair of queryString.split("&")) {
      const [key, value] = pair.split("=");
      if (key) params[key] = decodeURIComponent(value ?? "");
    }
  }
  return { path, params };
}

function Router() {
  const [hash, setHash] = useState(window.location.hash || "#/");

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash || "#/");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { path, params } = parseHash(hash);

  const renderPage = () => {
    if (path === "/") {
      return <Home onNavigate={navigate} />;
    }
    if (path === "/shop") {
      return (
        <Shop
          onNavigate={navigate}
          initialSearch={params.search}
          initialCollection={params.collection}
        />
      );
    }
    if (path.startsWith("/product/")) {
      const slug = path.replace("/product/", "");
      return <ProductDetail slug={slug} onNavigate={navigate} />;
    }
    if (path === "/cart") {
      return <CartPage onNavigate={navigate} />;
    }
    if (path === "/checkout") {
      return <Checkout onNavigate={navigate} />;
    }
    if (path === "/about") {
      return <About onNavigate={navigate} />;
    }
    if (path === "/contact") {
      return <Contact />;
    }
    return <NotFound onNavigate={navigate} />;
  };

  return (
    <Layout currentRoute={path} onNavigate={navigate}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <TooltipProvider>
      <CartProvider>
        <WishlistProvider>
          <Router />
        </WishlistProvider>
      </CartProvider>
    </TooltipProvider>
  );
}

export default App;
