"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview, getDashboardChartData, getDashboardActivity } from "@/services/dashboard.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Sparkles, Zap, Coins, Star, ArrowUpRight, History, FileText } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import Link from "next/link";

interface UserDashboardViewProps {
    initialUser: any;
}

// Map seamlessly onto your Tailwind v4 global custom variables
const chartConfig = {
    total: {
        label: "Total Runs",
        color: "var(--chart-1)", // Uses your design system primary chart token
    },
    completed: {
        label: "Completed",
        color: "var(--chart-2)", // Uses your design system secondary chart token
    },
    failed: {
        label: "Failed Keys",
        color: "var(--destructive)", // Directly matches your destructive status context token
    },
} satisfies ChartConfig;

export default function UserDashboardView({ initialUser }: UserDashboardViewProps) {
    const [period, setPeriod] = useState<string>("7d");
    const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("total");

    // Fetching dynamic dashboard endpoints via react-query concurrent requests
    const { data: overviewData, isLoading: isOverviewLoading } = useQuery({
        queryKey: ["dashboard", "overview"],
        queryFn: () => getDashboardOverview().then((res) => res.data),
    });

    const { data: chartResponse, isLoading: isChartLoading } = useQuery({
        queryKey: ["dashboard", "charts", period],
        queryFn: () => getDashboardChartData(`period=${period}`).then((res) => res.data),
    });

    const { data: activityData, isLoading: isActivityLoading } = useQuery({
        queryKey: ["dashboard", "activity"],
        queryFn: () => getDashboardActivity("page=1&limit=5").then((res) => res.data),
    });

    const timelineData = chartResponse?.data || [];

    // Reduce totals dynamically across current active period window parameters
    const totalMetrics = useMemo(() => {
        return {
            total: timelineData.reduce((acc: number, curr: any) => acc + (curr.total || 0), 0),
            completed: timelineData.reduce((acc: number, curr: any) => acc + (curr.completed || 0), 0),
            failed: timelineData.reduce((acc: number, curr: any) => acc + (curr.failed || 0), 0),
        };
    }, [timelineData]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl min-w-full mx-auto">

            {/* Welcome Spotlight Branding Card */}
            <div className="relative bg-card border border-border/60 rounded-sm p-6 overflow-hidden shadow-xs">
                <div className="absolute w-64 h-64 -right-12 -top-12 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm mb-1">
                            <Sparkles className="w-3 h-3" /> Workspace Hub
                        </div>
                        <h1 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Welcome back, <span className="text-primary">{initialUser?.name || "Developer"}</span>!
                        </h1>
                        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
                            Analyze your operational processing footprint, review recent workspace outputs, or generate a fresh context layout right now.
                        </p>
                    </div>
                    <Link href="/dashboard/generate" className="flex-shrink-0">
                        <Button size="sm" className="rounded-sm font-bold text-xs cursor-pointer shadow-xs gap-1.5">
                            Launch Engine <Zap className="w-3.5 h-3.5 fill-current" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Statistical Metrics Matrix Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: "Total Generations", val: overviewData?.totalGenerations, sub: "All runs initiated", icon: FileText },
                    { title: "Tokens Overheads", val: overviewData?.totalTokensUsed?.toLocaleString(), sub: "Used processing cost", icon: Coins },
                    { title: "Success Rate", val: overviewData?.successRate ? `${overviewData.successRate}%` : undefined, sub: "Pipeline completion efficiency", icon: Zap },
                    { title: "Bookmarked Items", val: overviewData?.totalFavorites, sub: "Saved favorite entries", icon: Star },
                ].map((card, idx) => (
                    <Card key={idx} className="bg-card border-border/60 rounded-sm shadow-xs">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                {card.title}
                            </CardTitle>
                            <card.icon className="h-4 w-4 text-primary opacity-80" />
                        </CardHeader>
                        <CardContent>
                            {isOverviewLoading ? (
                                <div className="space-y-1.5">
                                    <Skeleton className="h-7 w-20 bg-muted rounded-sm" />
                                    <Skeleton className="h-3 w-32 bg-muted rounded-sm" />
                                </div>
                            ) : (
                                <>
                                    <div className="text-xl font-bold font-mono tracking-tight text-foreground">
                                        {card.val ?? 0}
                                    </div>
                                    <p className="text-[11px] text-muted-foreground mt-0.5">{card.sub}</p>
                                </>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Operational Interactive Trends & Activity Grid Segment */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Interactive shadcn Chart Component Integration */}
                <Card className="lg:col-span-2 bg-card border-border/60 rounded-sm shadow-xs flex flex-col justify-between">
                    <CardHeader className="flex flex-col items-stretch border-b border-border/40 p-0 sm:flex-row justify-between">
                        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4">
                            <CardTitle className="text-sm font-bold tracking-tight">Generation Metrics Interactive</CardTitle>
                            <CardDescription className="text-xs">Select segment headers below to isolate trace parameters.</CardDescription>

                            {/* Time Period Controls */}
                            <div className="flex bg-muted/60 p-0.5 rounded-sm border border-border/40 w-fit mt-2">
                                {["7d", "30d", "90d"].map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPeriod(p)}
                                        className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${period === p ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Recharts Headings Panel */}
                        <div className="flex border-t border-border/40 sm:border-t-0 font-mono">
                            {(["total", "completed", "failed"] as const).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveChart(key)}
                                    className={`flex flex-1 flex-col justify-center gap-1 border-r border-border/30 last:border-r-0 px-5 py-3 text-left min-w-[85px] sm:min-w-[110px] transition-colors cursor-pointer hover:bg-muted/30 ${activeChart === key ? "bg-muted/60" : ""}`}
                                >
                                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
                                        {chartConfig[key].label}
                                    </span>
                                    <span className="text-base font-bold leading-none text-foreground sm:text-xl">
                                        {isChartLoading ? <Skeleton className="h-4 w-10 bg-muted mt-1" /> : totalMetrics[key].toLocaleString()}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </CardHeader>

                    <CardContent className="px-2 pt-4 sm:p-6 flex-1 flex flex-col justify-center">
                        {isChartLoading ? (
                            <Skeleton className="w-full h-[240px] bg-muted rounded-sm" />
                        ) : (
                            <ChartContainer config={chartConfig} className="aspect-auto h-[240px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={timelineData} margin={{ left: 12, right: 12, top: 10, bottom: 5 }}>
                                        <CartesianGrid vertical={false} stroke="rgba(var(--border), 0.15)" strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            minTickGap={32}
                                            style={{ fontSize: "10px", fontFamily: "var(--font-mono)", fill: "hsl(var(--muted-foreground))" }}
                                            tickFormatter={(value) => {
                                                const date = new Date(value);
                                                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                                            }}
                                        />
                                        <YAxis tickLine={false} axisLine={false} style={{ fontSize: "10px", fontFamily: "var(--font-mono)", fill: "hsl(var(--muted-foreground))" }} />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent
                                                    className="w-[160px] bg-popover border-border font-mono text-xs rounded-sm shadow-md"
                                                    nameKey={activeChart}
                                                    labelFormatter={(value) => {
                                                        return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                                                    }}
                                                />
                                            }
                                        />
                                        <Line
                                            dataKey={activeChart}
                                            type="monotone"
                                            stroke={chartConfig[activeChart].color}
                                            strokeWidth={2}
                                            dot={false}
                                            activeDot={{ r: 4, strokeWidth: 0, fill: chartConfig[activeChart].color }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Operations Log Activity Block */}
                <Card className="bg-card border-border/60 rounded-sm shadow-xs flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                        <div className="space-y-0.5">
                            <CardTitle className="text-sm font-bold tracking-tight">Recent Runs Activity</CardTitle>
                            <CardDescription className="text-xs">Your latest workflow payloads execution statuses.</CardDescription>
                        </div>
                        <Link href="/dashboard/history">
                            <span className="text-[11px] font-bold text-primary hover:underline flex items-center gap-0.5 cursor-pointer">
                                History <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </Link>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto max-h-[310px] pr-2 space-y-3">
                        {isActivityLoading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-2 gap-4">
                                    <div className="space-y-1.5 flex-1">
                                        <Skeleton className="h-3.5 w-3/4 bg-muted rounded-sm" />
                                        <Skeleton className="h-3 w-1/2 bg-muted rounded-sm" />
                                    </div>
                                    <Skeleton className="h-4 w-14 bg-muted rounded-sm" />
                                </div>
                            ))
                        ) : activityData?.recentGenerations && activityData.recentGenerations.length > 0 ? (
                            activityData.recentGenerations.map((job) => (
                                <div key={job.id} className="flex items-center justify-between gap-3 text-xs border-b border-border/30 pb-2.5 last:border-none last:pb-0">
                                    <div className="min-w-0 flex-1 space-y-0.5">
                                        <Link
                                            href={`/dashboard/generate/${job.id}`}
                                            className="font-medium text-foreground hover:text-primary transition-colors block truncate"
                                        >
                                            {job.generatedContent?.title || job.inputPrompt || "Untitled Generation Run"}
                                        </Link>
                                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                                            <span>{job.model}</span>
                                            <span>•</span>
                                            <span>{job.tokensUsed?.toLocaleString()} tkn</span>
                                        </div>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={`text-[9px] px-1.5 py-0 font-mono tracking-wide rounded-sm font-bold flex-shrink-0 ${job.status === "COMPLETED"
                                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                            : job.status === "FAILED"
                                                ? "bg-destructive/10 text-destructive border-destructive/20"
                                                : "bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse"
                                            }`}
                                    >
                                        {job.status}
                                    </Badge>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-muted-foreground">
                                <History className="w-6 h-6 opacity-30 mb-2" />
                                <p className="text-xs font-mono">No recent pipeline runs tracked yet.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}