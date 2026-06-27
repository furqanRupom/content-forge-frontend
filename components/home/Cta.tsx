"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="relative pt-10 pb-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-card border border-border/60 rounded-sm p-8 sm:p-12 text-center overflow-hidden relative shadow-md">
          {/* Ambient system orbs matching token parameters */}
          <div className="absolute w-72 h-72 -top-20 -left-20 rounded-full bg-primary/5 blur-[80px] pointer-events-none animate-pulse-slow" />
          <div className="absolute w-64 h-64 -bottom-16 -right-16 rounded-full bg-primary/5 blur-[70px] pointer-events-none animate-pulse-slow" />

          <div className="relative z-10">
            {/* Center icon badge block */}
            <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>

            <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-foreground text-balance">
              Ready to forge your <br />
              <span className="text-primary">best content yet?</span>
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-8 text-balance leading-relaxed">
              Join thousands of creators using ContentForge AI to write faster and bypass creative blocks. Get unlimited access completely free during our launch phase.
            </p>

            {/* Flat design dynamic CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register" className="w-full sm:w-auto">
                <Button 
                  size="sm" 
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold h-9 px-6 rounded-sm shadow-sm group flex items-center justify-center gap-1.5"
                >
                  Start Forging Free
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/templates" className="w-full sm:w-auto">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full sm:w-auto bg-background border-border/80 text-foreground/80 hover:text-foreground hover:bg-muted/40 text-xs font-bold h-9 px-5 rounded-sm"
                >
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
