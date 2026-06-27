
"use client";

import {
  Sparkles,
  LayoutTemplate,
  Zap,
  Star,
  BarChart3,
  Shield,
  RefreshCw,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description:
      "Describe what you need and our AI produces high-quality, on-brand content in under 5 seconds. Powered by the latest language models.",
  },
  {
    icon: LayoutTemplate,
    title: "500+ Expert Templates",
    description:
      "Skip the blank page with templates built by top copywriters across 30+ content categories.",
  },
  {
    icon: Star,
    title: "Favorites & Collections",
    description:
      "Save your best outputs, organize by project, and reuse what works.",
  },
  {
    icon: Zap,
    title: "Instant Regeneration",
    description:
      "Not quite right? Regenerate with one click — tweak tone, length, or style in seconds.",
  },
  {
    icon: BarChart3,
    title: "Generation Dashboard",
    description:
      "Track every piece of content you've created, search your history, and monitor your usage at a glance.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your data is encrypted and never used to train AI models. What you create is yours.",
  },
  {
    icon: RefreshCw,
    title: "Smart Iterations",
    description:
      "Refine and iterate on generated content with follow-up prompts and context-aware edits.",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description:
      "Generate content in 25+ languages for global audiences without losing quality.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-16 overflow-hidden">
      {/* Decorative ambient background orb tied strictly to your main primary configuration */}
      <div className="absolute w-80 h-80 top-16 -right-24 rounded-full bg-primary/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block with compact spacing layout */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-sm mb-3.5 shadow-sm">
            <Sparkles className="w-3 h-3" />
            Everything You Need
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
            Built for <span className="text-primary">content creators</span>
            <br /> who don't want to slow down
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto text-balance">
            From first draft to final copy, ContentForge AI handles every step
            of your content workflow — so you can focus on ideas, not execution.
          </p>
        </div>

        {/* Bento Layout Grid — Height constraints optimized for clear density mapping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[190px]">
          {/* Feature 1 — Hero card layout spans 2 columns & 2 rows */}
          <FeatureCard feature={features[0]} className="lg:col-span-2 lg:row-span-2" isHero />

          {/* Feature 2 */}
          <FeatureCard feature={features[1]} />

          {/* Feature 3 */}
          <FeatureCard feature={features[2]} />

          {/* Feature 4 */}
          <FeatureCard feature={features[3]} />

          {/* Feature 5 — Large structural configuration dashboard card layout */}
          <FeatureCard feature={features[4]} className="lg:col-span-1 lg:row-span-2" isHero />

          {/* Feature 6 */}
          <FeatureCard feature={features[5]} />

          {/* Feature 7 */}
          <FeatureCard feature={features[6]} />

          {/* Feature 8 */}
          <FeatureCard feature={features[7]} />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  className,
  isHero = false,
}: {
  feature: (typeof features)[number];
  className?: string;
  isHero?: boolean;
}) {
  const Icon = feature.icon;

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden p-5 rounded-sm border border-border bg-card hover:bg-muted/40 transition-all duration-200 shadow-2xs group",
        className
      )}
    >
      <div className="relative z-10 flex flex-col h-full justify-between gap-3">
        <div>
          <div className="w-9 h-9 rounded-sm flex items-center justify-center mb-3.5 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
            <Icon className="w-4 h-4" />
          </div>
          <h3 className="font-sans font-bold text-xs sm:text-sm text-foreground mb-1.5 tracking-tight">
            {feature.title}
          </h3>
          <p
            className={cn(
              "text-xs text-muted-foreground leading-relaxed text-pretty",
              isHero ? "sm:text-sm max-w-md" : ""
            )}
          >
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}
