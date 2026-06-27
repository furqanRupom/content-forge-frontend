"use client";

import { LayoutTemplate, Sparkles, Download } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: LayoutTemplate,
    title: "Pick a template",
    description:
      "Choose from 500+ templates built for every content type — or start from a blank prompt. Filter by goal, format, or industry.",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "Describe your needs",
    description:
      "Tell the AI your topic, tone, audience, and any key details. The more you share, the better the output. Takes 10 seconds.",
  },
  {
    step: "03",
    icon: Download,
    title: "Export & publish",
    description:
      "Get polished content instantly. Edit inline, regenerate sections, save to favorites, or export straight to your tools.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-muted/60 border border-border/40 rounded-sm px-2.5 py-0.5 text-[10px] font-bold uppercase text-primary tracking-wider mb-3">
            How it works
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            From idea to publish in <span className="text-primary">three steps</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto text-balance leading-relaxed">
            No learning curve. No tutorials needed. Just open ContentForge,
            describe what you need, and your content is ready.
          </p>
        </div>

        {/* Steps Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Desktop Connecting Line built around active core border colors */}
          <div 
            className="hidden md:block absolute top-8 h-0.5 border-t border-dashed border-border/60"
            style={{ left: "16.66%", right: "16.66%" }} 
          />

          {steps.map(({ step, icon: Icon, title, description }, i) => (
            <div key={step} className="relative text-center group">
              {/* Step counter button & icon structure wrapper */}
              <div className="relative w-16 h-16 mx-auto mb-5">
                {/* Micro glow element mapping strictly to configuration primary color */}
                <div className="absolute inset-0 rounded-sm bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none" />
                
                <div className="relative w-full h-full bg-card border border-border/80 rounded-sm flex items-center justify-center transition-all group-hover:border-primary/40 shadow-sm">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                
                {/* Numeric indicator accent badge */}
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-sm flex items-center justify-center text-[10px] font-bold bg-primary text-primary-foreground shadow-sm">
                  {step}
                </div>
              </div>

              <h3 className="font-sans font-semibold text-sm mb-2 text-foreground tracking-tight">
                {title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto text-balance">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
