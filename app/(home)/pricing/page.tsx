import { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import PricingSection from "@/components/home/Pricing";
import CTASection from "@/components/home/Cta";

export const metadata: Metadata = {
  title: "Pricing Plans | ContentForge AI",
  description: "Explore our plans and transparent platform guidelines. Get started instantly with our production-ready free generation tier.",
};

const faqs = [
  {
    q: "Is ContentForge AI really free right now?",
    a: "Yes. Our core platform features and starter templates are completely free to use. We are currently scaling our infrastructure and plan to introduce advanced Pro and Team tiers later on.",
  },
  {
    q: "What counts as a generation?",
    a: "Each time you process or generate text from a prompt or structural template, it counts as a single generation. Regenerating or tweaking an output also utilizes one generation credit.",
  },
  {
    q: "Do unused daily generations roll over?",
    a: "No, unused daily free generation allowances reset at midnight UTC every day and do not accumulate or roll over into the next day.",
  },
  {
    q: "Do I need to link a credit card to get started?",
    a: "Not at all. You can authenticate directly using your email, Google, or GitHub profile. No billing information or credit cards are collected.",
  },
  {
    q: "Is my generated content private?",
    a: "Absolutely. Your data and written outputs are encrypted both at rest and in transit. We strictly enforce a policy that never uses your personal inputs or copy models to train public AI sets.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen pt-16 relative overflow-hidden bg-background">
      {/* Structural subtle ambient lighting node */}
      <div className="absolute w-96 h-96 -top-24 left-1/2 -translate-x-1/2 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      {/* Renders pricing section structure */}
      <PricingSection />

      {/* FAQ Matrix Layout */}
      <section className="py-16 relative z-10 border-t border-border/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 bg-muted/60 border border-border/40 rounded-sm px-2.5 py-0.5 text-[10px] font-bold uppercase text-primary tracking-wider mb-2.5">
              <HelpCircle className="w-3 h-3" />
              FAQ
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Questions? <span className="text-primary">Answered.</span>
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-card border border-border/60 rounded-sm p-5 shadow-sm transition-colors hover:border-primary/30 duration-200"
              >
                <h3 className="font-sans font-bold text-sm text-foreground mb-1.5 tracking-tight">
                  {faq.q}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-0">
        <CTASection />
      </div>
    </main>
  );
}
