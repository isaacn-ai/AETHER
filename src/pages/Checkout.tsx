import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock, ChevronLeft, Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface CheckoutProps {
  onNavigate: (path: string) => void;
}

export function Checkout({ onNavigate }: CheckoutProps) {
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();
  const [step, setStep] = useState<"info" | "payment" | "confirmation">(
    "info"
  );
  const [orderNumber] = useState(() =>
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (items.length === 0 && step !== "confirmation") {
    onNavigate("/cart");
    return null;
  }

  if (step === "confirmation") {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-4 py-20">
        <AnimatedSection className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <Check className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="font-serif text-3xl mb-3">Order Confirmed</h2>
          <p className="text-muted-foreground mb-2">
            Thank you for your purchase, {formData.firstName}!
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Order #TC-{orderNumber}{" "}
            has been placed. You&apos;ll receive a confirmation email at{" "}
            {formData.email}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="luxury" onClick={() => onNavigate("/shop")}>
              Continue Shopping
            </Button>
            <Button variant="outline" onClick={() => onNavigate("/")}>
              Back to Home
            </Button>
          </div>
        </AnimatedSection>
      </section>
    );
  }

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
    window.scrollTo(0, 0);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setStep("confirmation");
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-8 lg:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() =>
              step === "payment" ? setStep("info") : onNavigate("/cart")
            }
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            {step === "payment" ? "Back" : "Cart"}
          </button>
          <h1 className="font-serif text-2xl sm:text-3xl">Checkout</h1>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                step === "info"
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/20 text-primary"
              }`}
            >
              {step === "payment" ? (
                <Check className="h-4 w-4" />
              ) : (
                "1"
              )}
            </div>
            <span className="text-sm hidden sm:inline">Information</span>
          </div>
          <div className="h-px flex-1 bg-border max-w-[80px]" />
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                step === "payment"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <span className="text-sm hidden sm:inline">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {step === "info" && (
              <form onSubmit={handleSubmitInfo} className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg mb-4">
                    Contact Information
                  </h3>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-serif text-lg mb-4">Shipping Address</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          updateField("firstName", e.target.value)
                        }
                        required
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          updateField("lastName", e.target.value)
                        }
                        required
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      placeholder="123 Main Street"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        required
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => updateField("state", e.target.value)}
                        required
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={formData.zip}
                        onChange={(e) => updateField("zip", e.target.value)}
                        required
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(v) => updateField("country", v)}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button variant="luxury" size="lg" type="submit" className="w-full">
                  Continue to Payment
                </Button>
              </form>
            )}

            {step === "payment" && (
              <form onSubmit={handleSubmitPayment} className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg mb-4">Payment Details</h3>
                  <div className="bg-muted/50 border rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Lock className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">
                        Your payment information is encrypted and secure.
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        value={formData.cardName}
                        onChange={(e) =>
                          updateField("cardName", e.target.value)
                        }
                        required
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          updateField("cardNumber", e.target.value)
                        }
                        placeholder="1234 5678 9012 3456"
                        required
                        className="mt-1.5"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input
                          id="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={(e) =>
                            updateField("cardExpiry", e.target.value)
                          }
                          placeholder="MM/YY"
                          required
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardCvc">CVC</Label>
                        <Input
                          id="cardCvc"
                          value={formData.cardCvc}
                          onChange={(e) =>
                            updateField("cardCvc", e.target.value)
                          }
                          placeholder="123"
                          required
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-serif text-lg mb-3">Shipping To</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.firstName} {formData.lastName}
                    <br />
                    {formData.address}
                    <br />
                    {formData.city}, {formData.state} {formData.zip}
                  </p>
                </div>

                <Button variant="luxury" size="lg" type="submit" className="w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  Place Order — {formatPrice(total)}
                </Button>
              </form>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 bg-card border rounded-xl p-6">
              <h3 className="font-serif text-lg mb-4">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div
                      className={`${item.product.gradient} h-14 w-14 rounded-lg flex-shrink-0 flex items-center justify-center relative`}
                    >
                      <span className="text-sm font-serif text-white/20">
                        {item.product.name.charAt(0)}
                      </span>
                      <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground text-[10px] font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-tight">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.product.size}
                      </p>
                    </div>
                    <span className="text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="mb-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Complimentary
                      </span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span className="text-gold">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
