"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Play, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const trustBadges = [
  "No credit card required",
  "500+ templates",
  "Free forever plan",
];

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden pt-28 pb-16">
      {/* Dynamic ambient orbs mapped directly to the current theme config */}
      <div className="absolute w-[600px] h-[450px] -top-20 -left-48 rounded-full bg-primary/10 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute w-[500px] h-[400px] -top-10 -right-32 rounded-full bg-primary/15 blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "2s" }} />

      {/* Grid background matching global styles */}
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_60%,transparent_100%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-popover/80 border border-border/60 px-3.5 py-1 rounded-sm flex items-center gap-2 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground/80 tracking-wide">
              AI-Powered Content Generation — Now in Beta
            </span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary border-0 rounded-sm font-bold">NEW</Badge>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-balance mb-6">
          Forge content that{" "}
          <span className="relative inline-block text-primary">
            actually converts
            <svg className="absolute -bottom-1.5 left-0 right-0 w-full" viewBox="0 0 400 12" fill="none" preserveAspectRatio="none">
              <path d="M2 8 Q100 2 200 8 Q300 14 398 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/60" />
            </svg>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 text-balance">
          From blank page to polished copy in seconds. ContentForge AI combines
          500+ expert-crafted templates with powerful generation — so you can
          write blogs, emails, ads, and more without the creative block.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link href="/register">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm h-11 px-6 font-medium rounded-sm shadow-md transition-all flex items-center gap-2 group">
              Start Forging Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Button variant="outline" size="lg" className="bg-popover/40 border-border/80 text-foreground/80 hover:text-foreground text-sm h-11 px-5 font-medium rounded-sm flex items-center gap-2.5 transition-all">
            <div className="w-5 h-5 rounded-sm flex items-center justify-center bg-primary/10">
              <Play className="w-2.5 h-2.5 text-primary fill-primary ml-0.5" />
            </div>
            Watch 90s demo
          </Button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {trustBadges.map((badge) => (
            <div key={badge} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              {badge}
            </div>
          ))}
        </div>

        {/* Mock UI preview */}
        <div className="mt-14 relative max-w-4xl mx-auto">
          {/* Subtle glow underneath panel matching configuration dynamic */}
          <div className="absolute -inset-2 rounded-sm bg-primary/10 opacity-40 blur-xl pointer-events-none" />

          <div className="relative bg-card rounded-sm overflow-hidden border border-border shadow-md">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/60 bg-muted/20">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-background/80 border border-border/40 rounded-sm px-3 py-0.5 text-[10px] text-muted-foreground text-center max-w-md mx-auto">
                  app.contentforge.ai/generate
                </div>
              </div>
            </div>

            {/* Mock workspace content */}
            <div className="p-5 sm:p-6 grid sm:grid-cols-2 gap-5 text-left min-h-[220px]">
              {/* Left: prompt panel */}
              <div className="space-y-3">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Prompt input</div>
                <div className="bg-background/60 border border-border/60 rounded-sm p-3 text-xs text-foreground/80 leading-relaxed">
                  Write a compelling product launch email for a new project management SaaS targeting startup founders...
                </div>
                <div className="flex gap-1.5">
                  <div className="bg-primary/10 border border-primary/20 rounded-sm px-2.5 py-1 text-[10px] text-primary font-semibold flex-shrink-0">Email</div>
                  <div className="bg-muted border border-border/40 rounded-sm px-2.5 py-1 text-[10px] text-muted-foreground">Professional</div>
                </div>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs w-full py-2 rounded-sm h-9 flex items-center justify-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Generate Content
                </Button>
              </div>

              {/* Right: output panel */}
              <div className="space-y-3 border-t sm:border-t-0 sm:border-l border-border/60 pt-4 sm:pt-0 sm:pl-5">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                  <span>Output stream</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                    <div className="w-1 h-1 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <div className="w-1 h-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 rounded-sm bg-foreground/10 w-4/5" />
                  <div className="h-2.5 rounded-sm bg-foreground/10 w-full" />
                  <div className="h-2.5 rounded-sm bg-foreground/10 w-3/4" />
                  <div className="h-2.5 rounded-sm bg-foreground/5 w-full" />
                  <div className="h-2.5 rounded-sm bg-foreground/5 w-5/6" />
                  <div className="h-2.5 rounded-sm bg-primary/20 w-2/3 mt-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
