"use client";

import Link from "next/link";
import { ArrowRight, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";

const templateCategories = [
  { name: "Blog & SEO", count: 48 },
  { name: "Email Marketing", count: 62 },
  { name: "Social Media", count: 75 },
  { name: "Ad Copy", count: 39 },
  { name: "Product Descriptions", count: 28 },
  { name: "Video Scripts", count: 33 },
];

const featuredTemplates = [
  {
    title: "Viral Twitter Thread",
    category: "Social Media",
    description: "Turn any insight into a structured, engaging Twitter thread that builds your audience.",
    uses: "12.4k uses",
    tag: "Trending",
  },
  {
    title: "Product Launch Email",
    category: "Email Marketing",
    description: "A high-converting launch email sequence with subject line, hook, and CTA included.",
    uses: "9.1k uses",
    tag: "Most Used",
  },
  {
    title: "SEO Blog Post",
    category: "Blog & SEO",
    description: "Full-length blog post with H1, meta description, introduction, sections, and CTA.",
    uses: "18.7k uses",
    tag: "Top Rated",
  },
  {
    title: "Google Ad Copy",
    category: "Ad Copy",
    description: "3 compelling headline + description combos optimized for click-through.",
    uses: "7.3k uses",
    tag: "Quick Win",
  },
  {
    title: "YouTube Video Script",
    category: "Video Scripts",
    description: "Full hook, body, and outro script with timestamps for any video format.",
    uses: "5.8k uses",
    tag: "New",
  },
  {
    title: "E-commerce Product Page",
    category: "Product Descriptions",
    description: "Benefit-driven product copy with features list, FAQs, and social proof.",
    uses: "4.2k uses",
    tag: "Popular",
  },
];

export default function TemplatesSection() {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      {/* Background radial ambient glow tied to style configuration defaults */}
      <div className="absolute w-80 h-80 bottom-0 left-0 rounded-full bg-primary/5 blur-[100px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-muted/60 border border-border/40 rounded-sm px-2.5 py-0.5 text-[10px] font-bold uppercase text-primary tracking-wider mb-2.5">
              <LayoutTemplate className="w-3 h-3" />
              Template Library
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Start from a <span className="text-primary">proven template</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed text-balance">
              Browse 500+ templates crafted by expert copywriters. Filter by
              format, industry, or goal — then let AI do the heavy lifting.
            </p>
          </div>
          <Link href="/templates" className="flex-shrink-0">
            <span className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline underline-offset-4 group cursor-pointer">
              View all templates
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Flat Category Pills Menu */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button className="bg-primary text-primary-foreground text-[11px] font-medium px-3.5 py-1 rounded-sm shadow-sm">
            All Templates
          </button>
          {templateCategories.map(({ name, count }) => (
            <button
              key={name}
              className="bg-card text-[11px] px-3 py-1 rounded-sm font-medium text-foreground/80 hover:text-foreground border border-border/60 transition-all hover:border-primary/40 shadow-sm"
            >
              {name}
              <span className="ml-1.5 text-muted-foreground/60 font-normal">{count}</span>
            </button>
          ))}
        </div>

        {/* Template Grid Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTemplates.map((template, i) => (
            <div
              key={i}
              className="bg-card border border-border/60 rounded-sm p-5 flex flex-col justify-between transition-all duration-200 hover:border-primary/40 shadow-sm relative group cursor-pointer"
            >
              <div className="relative z-10 flex flex-col h-full justify-between gap-5">
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                      {template.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-primary/10 text-primary border border-primary/10">
                      {template.tag}
                    </span>
                  </div>
                  <h3 className="font-sans font-semibold text-sm text-foreground mb-1.5 tracking-tight">
                    {template.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed text-balance">
                    {template.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <span className="text-[11px] font-medium text-muted-foreground/80">{template.uses}</span>
                  <span className="text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Use template <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
