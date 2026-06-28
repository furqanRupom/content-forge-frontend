"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, LayoutTemplate } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllTemplates } from "@/services/template.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export interface ITemplate {
  id: string;
  key: string;
  title: string;
  description: string;
  type: string;
  category: string;
  promptHint: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  generationJobs: [];
  _count: {
    generationJobs: number;
  };
}

export default function TemplatesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Fetch all templates via server payload
  const { data, isLoading } = useQuery({
    queryKey: ["templates", "active-library"],
    queryFn: async () => {
      const res = await getAllTemplates("isActive=true&limit=100");
      return res;
    },
  });

  const templates: ITemplate[] = data?.success ? data?.data : [];

  // Generate a dynamic list of unique categories and count how many templates exist for each
  const categoryMap = templates.reduce((acc, current) => {
    acc[current.category] = (acc[current.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dynamicCategories = Object.entries(categoryMap).map(([name, count]) => ({
    name,
    count,
  }));

  // Filter templates dynamically by state
  const filteredTemplates = selectedCategory === "All"
    ? templates.slice(0, 6) // Limit to 6 prominent elements for section layout aesthetics
    : templates.filter(t => t.category === selectedCategory).slice(0, 6);

  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      {/* Background radial ambient glow tied to style configuration defaults */}
      <div className="absolute w-80 h-80 bottom-0 left-0 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

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
              Browse templates crafted by expert copywriters. Filter by format, industry, or goal — then let AI do the heavy lifting.
            </p>
          </div>
          <Link href="/templates" className="flex-shrink-0">
            <span className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline underline-offset-4 group cursor-pointer">
              View all templates
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Dynamic Category Pills Menu Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`text-[11px] font-medium px-3.5 py-1 rounded-sm shadow-xs transition-all cursor-pointer ${selectedCategory === "All"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground/80 hover:text-foreground border border-border/60"
              }`}
          >
            All Templates
          </button>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-24 rounded-sm bg-muted" />
            ))
            : dynamicCategories.map(({ name, count }) => (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`text-[11px] px-3 py-1 rounded-sm font-medium border transition-all shadow-xs cursor-pointer ${selectedCategory === name
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground/80 hover:text-foreground border-border/60 hover:border-primary/40"
                  }`}
              >
                {name}
                <span className={`ml-1.5 font-normal ${selectedCategory === name ? "text-primary-foreground/70" : "text-muted-foreground/60"}`}>
                  {count}
                </span>
              </button>
            ))}
        </div>

        {/* Grid Container Matrix mapping either Skeletons or real API rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            // Shadcn Skeleton Cards Layout Frame
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card border border-border/60 rounded-sm p-5 space-y-4 flex flex-col justify-between h-[160px]">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-3 w-16 bg-muted rounded-sm" />
                    <Skeleton className="h-4 w-12 bg-muted rounded-sm" />
                  </div>
                  <Skeleton className="h-4 w-3/4 bg-muted rounded-sm" />
                  <Skeleton className="h-3 w-full bg-muted rounded-sm" />
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border/40">
                  <Skeleton className="h-3 w-14 bg-muted rounded-sm" />
                  <Skeleton className="h-3 w-20 bg-muted rounded-sm" />
                </div>
              </div>
            ))
          ) : filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <Link
                key={template.id}
                href={`/dashboard/generate?templateId=${template.id}`}
                className="bg-card border border-border/60 rounded-sm p-5 flex flex-col justify-between transition-all duration-200 hover:border-primary/40 shadow-xs group cursor-pointer relative"
              >
                <div className="flex flex-col h-full justify-between gap-5">
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                        {template.category}
                      </span>
                      <Badge variant="outline" className="text-[9px] font-mono tracking-tight bg-muted/50 text-foreground px-1.5 py-0 rounded-sm">
                        {template.type}
                      </Badge>
                    </div>
                    <h3 className="font-sans font-semibold text-sm text-foreground mb-1.5 tracking-tight group-hover:text-primary transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <span className="text-[11px] font-mono text-muted-foreground/80">
                      {template._count?.generationJobs ?? 0} uses
                    </span>
                    <span className="text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0 flex items-center gap-1">
                      Use template <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            // No results safe-fall back boundary block
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12 border border-dashed border-border rounded-sm bg-muted/10">
              <p className="text-xs font-mono text-muted-foreground">
                No active templates cataloged under this category filter selection.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}