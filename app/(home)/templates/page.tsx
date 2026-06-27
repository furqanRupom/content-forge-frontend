"use client";

import { useState } from "react";
import { Search, LayoutTemplate, ArrowRight, Star, TrendingUp, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = [
  "All", "Blog & SEO", "Email Marketing", "Social Media",
  "Ad Copy", "Product Descriptions", "Video Scripts",
  "Sales Copy", "Press Release", "Landing Pages",
];

const templates = [
  { title: "Viral Twitter Thread", category: "Social Media", uses: "12.4k", tag: "Trending", desc: "Turn any insight into a structured, engaging Twitter thread that builds your audience." },
  { title: "Product Launch Email", category: "Email Marketing", uses: "9.1k", tag: "Popular", desc: "A high-converting launch email with subject line, hook, body, and CTA." },
  { title: "Long-form SEO Blog Post", category: "Blog & SEO", uses: "18.7k", tag: "Top Rated", desc: "Full blog post with H1, meta, intro, sections, and CTA optimized for search." },
  { title: "Google Ad Copy Set", category: "Ad Copy", uses: "7.3k", tag: "Quick Win", desc: "3 headline + description combos optimized for high click-through rates." },
  { title: "YouTube Video Script", category: "Video Scripts", uses: "5.8k", tag: "New", desc: "Full hook, body, and outro with timestamps for any video format or niche." },
  { title: "E-commerce Product Page", category: "Product Descriptions", uses: "4.2k", tag: "Popular", desc: "Benefit-driven product copy with features, FAQ, and social proof section." },
  { title: "Cold Outreach Email", category: "Email Marketing", uses: "11.2k", tag: "Top Rated", desc: "Personalized cold email that gets replies without feeling pushy or spammy." },
  { title: "LinkedIn Thought Leadership", category: "Social Media", uses: "6.7k", tag: "Trending", desc: "Long-form LinkedIn post format that builds authority and drives engagement." },
  { title: "Sales Landing Page", category: "Landing Pages", uses: "3.9k", tag: "New", desc: "Full landing page copy from hero to footer with objection handling." },
  { title: "Weekly Newsletter", category: "Email Marketing", uses: "8.4k", tag: "Popular", desc: "Engaging newsletter format with opener, main section, tips, and CTA." },
  { title: "Press Release", category: "Press Release", uses: "2.1k", tag: "Classic", desc: "Professional press release format for product launches, events, or company news." },
  { title: "Facebook Ad Copy", category: "Ad Copy", uses: "9.8k", tag: "Top Rated", desc: "Scroll-stopping Facebook ad copy with primary text, headline, and description." },
];

const tagColors: Record<string, string> = {
  "Trending": "text-amber-500 bg-amber-500/10 border-amber-500/20",
  "Top Rated": "text-primary bg-primary/10 border-primary/20",
  "Popular": "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  "Quick Win": "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
  "New": "text-rose-500 bg-rose-500/10 border-rose-500/20",
  "Classic": "text-violet-400 bg-violet-400/10 border-violet-400/20",
};

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = templates.filter((t) => {
    const matchCategory = activeCategory === "All" || t.category === activeCategory;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <main className="min-h-screen pt-20 pb-16 relative overflow-hidden bg-background">
      {/* Structural subtle ambient lighting node */}
      <div className="absolute w-96 h-96 -top-24 -right-24 rounded-full bg-primary/5 blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute w-80 h-80 bottom-32 -left-24 rounded-full bg-primary/5 blur-[90px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-muted/60 border border-border/40 rounded-sm px-2.5 py-0.5 text-[10px] font-bold uppercase text-primary tracking-wider mb-3">
            <LayoutTemplate className="w-3 h-3" />
            Template Library
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground">
            500+ templates, <span className="text-primary">every format</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">
            Browse expert-crafted templates for every content need. Filter by
            category, search by keyword, and start generating in seconds.
          </p>

          {/* Search Bar Input */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 rounded-sm bg-muted/20 border-border/60 focus-visible:ring-1 focus-visible:ring-primary/40 text-xs transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs Grid */}
        <div className="flex flex-wrap gap-1.5 mb-8 justify-center max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-sm text-[11px] font-bold transition-all border uppercase tracking-wider ${
                activeCategory === cat
                  ? "bg-primary border-primary text-primary-foreground shadow-sm"
                  : "bg-card border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Matrix Statistics Row */}
        <div className="flex items-center gap-3 mb-5 text-xs text-muted-foreground font-medium border-b border-border/40 pb-3">
          <span>{filtered.length} templates matching selection</span>
          <span className="text-border/60">•</span>
          <div className="flex items-center gap-1 text-[11px] uppercase tracking-wide font-bold text-foreground/80">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            <span>Sorted by popularity</span>
          </div>
        </div>

        {/* Templates Matrix Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((template, i) => (
            <div 
              key={i}
              className="bg-card border border-border/60 rounded-sm p-4 shadow-sm hover:border-primary/40 transition-all duration-200 group flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground bg-muted border border-border/40 px-1.5 py-0.5 rounded-sm">
                    {template.category}
                  </span>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 border rounded-sm ${tagColors[template.tag] || "text-primary bg-primary/10 border-primary/20"}`}>
                    {template.tag}
                  </span>
                </div>
                <h3 className="font-sans font-bold text-sm text-foreground mb-1 tracking-tight group-hover:text-primary transition-colors">
                  {template.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {template.desc}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-border/40 pt-2.5 mt-auto">
                <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{template.uses} uses</span>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wide text-primary flex items-center gap-1 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  Use <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search Result Fallback Context */}
        {filtered.length === 0 && (
          <div className="text-center py-16 border border-dashed border-border/60 rounded-sm bg-card/40 max-w-md mx-auto">
            <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
            <h3 className="font-sans font-bold text-sm text-foreground mb-1">No templates found</h3>
            <p className="text-muted-foreground text-xs max-w-xs mx-auto">Try updating your search query keywords or filter by an alternative category tab.</p>
          </div>
        )}
      </div>
    </main>
  );
}
