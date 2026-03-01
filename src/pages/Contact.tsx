import { useState } from "react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GoldDivider } from "@/components/shared/GoldDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Check } from "lucide-react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Header */}
      <section className="pt-12 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <p className="text-sm font-sans tracking-luxury uppercase text-primary mb-3">
              Get in Touch
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl">Contact Us</h1>
            <GoldDivider variant="dots" className="py-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our dedicated customer care team is here to help with any questions
              about products, orders, or your skincare journey.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection animation="slideLeft">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground">
                        care@titancosmetic.com
                      </p>
                      <p className="text-sm text-muted-foreground">
                        press@titancosmetic.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">Phone</h3>
                      <p className="text-sm text-muted-foreground">
                        +1 (888) TITAN-SC
                      </p>
                      <p className="text-sm text-muted-foreground">
                        +1 (888) 848-2672
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">
                        Headquarters
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Titan Cosmetic Inc.
                        <br />
                        100 Luxury Lane, Suite 500
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">
                        Customer Care Hours
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Monday – Friday: 9am – 7pm EST
                        <br />
                        Saturday: 10am – 5pm EST
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection animation="slideRight">
                <div className="bg-card border rounded-xl p-6 sm:p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <Check className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h3 className="font-serif text-2xl mb-2">
                        Message Sent
                      </h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. Our team will respond within
                        24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              updateField("name", e.target.value)
                            }
                            required
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactEmail">Email</Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                            required
                            className="mt-1.5"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(v) => updateField("subject", v)}
                        >
                          <SelectTrigger className="mt-1.5">
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="order">Order Inquiry</SelectItem>
                            <SelectItem value="product">
                              Product Question
                            </SelectItem>
                            <SelectItem value="skincare">
                              Skincare Advice
                            </SelectItem>
                            <SelectItem value="returns">
                              Returns & Exchanges
                            </SelectItem>
                            <SelectItem value="wholesale">
                              Wholesale & Partnerships
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message">Message</Label>
                        <textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            updateField("message", e.target.value)
                          }
                          required
                          rows={5}
                          className="mt-1.5 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 font-sans resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <Button
                        variant="luxury"
                        size="lg"
                        type="submit"
                        className="w-full"
                      >
                        Send Message
                      </Button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
