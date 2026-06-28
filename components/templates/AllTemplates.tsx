"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAllTemplates } from "@/services/template.service";
import { Search, LayoutTemplate, ArrowRight, Star, TrendingUp, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

export default function TemplatesPage() {
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [search, setSearch] = useState<string>("");

    // Pagination Grid Matrix States
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 8;

    // Fetch the entire template matrix from the endpoint engine
    const { data, isLoading } = useQuery({
        queryKey: ["templates", "full-directory"],
        queryFn: async () => {
            const res = await getAllTemplates("isActive=true&limit=200");
            return res;
        },
    });

    const templates: ITemplate[] = data?.success ? data?.data : [];

    // Reset pagination window safely whenever filter vectors shift
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, search]);

    // Dynamically extract categories from current database configurations
    const structuralCategories = useMemo(() => {
        return ["All", ...Array.from(new Set(templates.map((t) => t.category)))];
    }, [templates]);

    // Perform multi-layered client-side filtration purely
    const filteredTemplates = useMemo(() => {
        return templates.filter((t) => {
            const matchCategory = activeCategory === "All" || t.category === activeCategory;
            const matchSearch =
                t.title.toLowerCase().includes(search.toLowerCase()) ||
                t.description.toLowerCase().includes(search.toLowerCase());
            return matchCategory && matchSearch;
        });
    }, [templates, activeCategory, search]);

    // Compute calculated window coordinates based on active pagination bounds
    const totalItems = filteredTemplates.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    const paginatedTemplates = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredTemplates.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredTemplates, currentPage, itemsPerPage]);

    return (
        <main className="min-h-screen pt-20 pb-16 relative overflow-hidden bg-background">
            {/* Structural subtle ambient lighting nodes */}
            <div className="absolute w-96 h-96 -top-24 -right-24 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
            <div className="absolute w-80 h-80 bottom-32 -left-24 rounded-full bg-primary/5 blur-[90px] pointer-events-none" />

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

                {/* Category Tabs List */}
                <div className="flex flex-wrap gap-1.5 mb-8 justify-center max-w-4xl mx-auto">
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-6 w-20 rounded-sm bg-muted" />
                        ))
                        : structuralCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1 rounded-sm text-[11px] font-bold transition-all border uppercase tracking-wider cursor-pointer ${activeCategory === cat
                                    ? "bg-primary border-primary text-primary-foreground shadow-xs"
                                    : "bg-card border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                </div>

                {/* Dynamic Matrix Statistics Row */}
                <div className="flex items-center justify-between mb-5 text-xs text-muted-foreground font-medium border-b border-border/40 pb-3 gap-4">
                    <div className="flex items-center gap-2">
                        <span>
                            {isLoading ? "Calculating" : totalItems} templates matching selection
                        </span>
                        {!isLoading && totalItems > 0 && (
                            <span className="text-muted-foreground/60 font-mono text-[11px]">
                                (Showing {Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(totalItems, currentPage * itemsPerPage)})
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] uppercase tracking-wide font-bold text-foreground/80">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" />
                        <span>Sorted by popularity</span>
                    </div>
                </div>

                {/* Templates Matrix Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {isLoading ? (
                        Array.from({ length: itemsPerPage }).map((_, i) => (
                            <div key={i} className="bg-card border border-border/60 rounded-sm p-4 h-[165px] flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-3.5 w-16 bg-muted" />
                                        <Skeleton className="h-3.5 w-12 bg-muted" />
                                    </div>
                                    <Skeleton className="h-4 w-5/6 bg-muted" />
                                    <Skeleton className="h-3 w-full bg-muted" />
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-border/40">
                                    <Skeleton className="h-3.5 w-12 bg-muted" />
                                    <Skeleton className="h-3.5 w-10 bg-muted" />
                                </div>
                            </div>
                        ))
                    ) : (
                        paginatedTemplates.map((template) => (
                            <Link
                                key={template.id}
                                href={`/dashboard/generate?templateId=${template.id}`}
                                className="bg-card border border-border/60 rounded-sm p-4 shadow-xs hover:border-primary/40 transition-all duration-200 group flex flex-col justify-between gap-4 cursor-pointer"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-2.5">
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground bg-muted border border-border/40 px-1.5 py-0.5 rounded-sm truncate max-w-[120px]">
                                            {template.category}
                                        </span>
                                        <Badge variant="outline" className="text-[8px] font-mono tracking-tight bg-primary/5 text-primary border-primary/10 px-1.5 py-0 rounded-sm">
                                            {template.type}
                                        </Badge>
                                    </div>
                                    <h3 className="font-sans font-bold text-sm text-foreground mb-1 tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                                        {template.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                        {template.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-t border-border/40 pt-2.5 mt-auto">
                                    <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                        <span>{template._count?.generationJobs ?? 0} uses</span>
                                    </div>
                                    <div className="text-[11px] font-bold uppercase tracking-wide text-primary flex items-center gap-1 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                                        Use <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                {/* Empty Search Result Fallback Context */}
                {!isLoading && totalItems === 0 && (
                    <div className="text-center py-16 border border-dashed border-border/60 rounded-sm bg-card/40 max-w-md mx-auto mt-6">
                        <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
                        <h3 className="font-sans font-bold text-sm text-foreground mb-1">No templates found</h3>
                        <p className="text-muted-foreground text-xs max-w-xs mx-auto">
                            Try updating your search query keywords or filter by an alternative category tab.
                        </p>
                    </div>
                )}

                {/* Pagination Engine Controller Row */}
                {!isLoading && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-10 pt-4 border-t border-border/30">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-sm bg-card border-border/60 text-foreground cursor-pointer disabled:opacity-40"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }).map((_, i) => {
                                const pageNum = i + 1;
                                if (
                                    pageNum === 1 ||
                                    pageNum === totalPages ||
                                    Math.abs(pageNum - currentPage) <= 1
                                ) {
                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={currentPage === pageNum ? "default" : "outline"}
                                            className={`h-8 w-8 text-xs font-mono rounded-sm cursor-pointer ${currentPage === pageNum
                                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                : "bg-card border-border/60 text-muted-foreground hover:text-foreground"
                                                }`}
                                            onClick={() => setCurrentPage(pageNum)}
                                        >
                                            {pageNum}
                                        </Button>
                                    );
                                } else if (
                                    pageNum === 2 ||
                                    pageNum === totalPages - 1
                                ) {
                                    return (
                                        <span key={pageNum} className="px-1 text-xs text-muted-foreground/60 font-mono">
                                            ...
                                        </span>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-sm bg-card border-border/60 text-foreground cursor-pointer disabled:opacity-40"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
        </main>
    );
}