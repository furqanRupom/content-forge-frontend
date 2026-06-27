"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Early Bird Beta",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Get unlimited access to all premium features completely free during our beta phase.",
    cta: "Claim Free Unlimited Access",
    ctaHref: "/register",
    featured: true,
    badge: "Limited Time Free Offer",
    features: [
      "Unlimited AI generations",
      "All 500+ templates unlocked",
      "All content types & professional tones",
      "Priority production generation speed",
      "Create custom favorites & collections",
      "Full context-aware workspace history",
      "Export directly to PDF / DOCX structures",
      "Priority customer email support",
    ],
  },
  {
    name: "Future Pro",
    monthlyPrice: 19,
    yearlyPrice: 14,
    description: "Planned cost structure for individual regular publishing workflows.",
    cta: "Included in Free Access",
    ctaHref: "/register",
    featured: false,
    features: [
      "Unlimited AI generations",
      "Standard individual templates",
      "Standard tones & models",
      "Regular processing speed",
      "History tracking logs",
    ],
  },
  {
    name: "Future Team",
    monthlyPrice: 49,
    yearlyPrice: 37,
    description: "Planned cost structure for advanced agencies and multi-user configurations.",
    cta: "Included in Free Access",
    ctaHref: "/register",
    featured: false,
    features: [
      "Everything in Pro tier core",
      "Up to 5 synced workspace seats",
      "Shared template library controls",
      "Centralized analytics metrics dashboard",
      "Custom brand voice configuration profiles",
    ],
  },
];

export default function PricingSection() {
  const [showFuturePricing, setShowFuturePricing] = useState(false);

  return (
    <section id="pricing" className="relative pt-12 pb-16 overflow-hidden">
      {/* Background ambient accents mapping dynamically to tokens */}
      <div className="absolute w-[450px] h-[450px] top-0 -right-48 rounded-full bg-primary/5 blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute w-80 h-80 bottom-0 -left-24 rounded-full bg-primary/5 blur-[90px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-muted/60 border border-border/40 rounded-sm px-2.5 py-0.5 text-[10px] font-bold uppercase text-primary tracking-wider mb-2.5">
            <Zap className="w-3 h-3" />
            Simple Pricing
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Get premium content generation <span className="text-primary">100% free</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed text-balance">
            ContentForge is currently completely free to use. Create unlimited copy without limits while we build out our product roadmap.
          </p>

          {/* Pricing preview model toggle */}
          <div className="inline-flex items-center gap-3 bg-card border border-border/60 px-3.5 py-1.5 rounded-sm mt-6 shadow-sm">
            <span className={cn("text-[11px] font-bold uppercase tracking-wider transition-colors", !showFuturePricing ? "text-primary" : "text-muted-foreground")}>
              Current Beta Tier
            </span>
            <Switch checked={showFuturePricing} onCheckedChange={setShowFuturePricing} className="data-[state=checked]:bg-primary" />
            <span className={cn("text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5", showFuturePricing ? "text-primary" : "text-muted-foreground")}>
              Preview Future Tiers
              <Badge className="text-[9px] px-1.5 py-0 h-4 bg-primary/10 text-primary border-0 font-bold tracking-normal rounded-sm">
                Future Plans
              </Badge>
            </span>
          </div>
        </div>

        {/* Dynamic Matrix Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start max-w-5xl mx-auto">
          {plans.map((plan) => {
            // If toggle is off, hide the preview blueprints to focus solely on current free features
            if (!showFuturePricing && !plan.featured) return null;

            return (
              <div
                key={plan.name}
                className={cn(
                  "bg-card border rounded-sm p-5 flex flex-col gap-5 transition-all relative",
                  plan.featured
                    ? "border-primary/50 shadow-md md:scale-[1.02] z-20 md:col-span-1"
                    : "border-border/60 shadow-sm opacity-70 hover:opacity-100 duration-200"
                )}
                style={{ gridColumn: !showFuturePricing && plan.featured ? "1 / -1" : undefined }}
              >
                {plan.featured && (
                  <div className="absolute -top-2.5 left-5">
                    <span className="bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm shadow-sm">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="font-sans font-bold text-sm text-foreground tracking-tight mb-1">{plan.name}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{plan.description}</p>
                </div>

                <div className="flex items-end gap-1 border-y border-border/40 py-3.5">
                  <span className="font-sans text-3xl font-bold text-foreground tracking-tight">
                    ${showFuturePricing ? plan.monthlyPrice : 0}
                  </span>
                  <span className="text-muted-foreground text-xs pb-0.5">
                    {plan.monthlyPrice === 0 || !showFuturePricing ? "/ free forever tier" : "/ month value"}
                  </span>
                </div>

                <Link href={plan.ctaHref} className="block">
                  <Button
                    size="sm"
                    className={cn(
                      "w-full text-xs font-bold py-2 h-9 rounded-sm transition-all shadow-sm",
                      plan.featured
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-border/40"
                    )}
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80 leading-normal">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-muted-foreground mt-8 max-w-md mx-auto text-balance">
          All active beta user profiles will retain grandfathered priority access status perks even after future enterprise plans roll out.
        </p>
      </div>
    </section>
  );
}
