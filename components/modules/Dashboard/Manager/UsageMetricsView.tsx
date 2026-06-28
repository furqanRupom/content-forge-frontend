"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserPerformanceMetrics, getPerformanceMetrics } from "@/services/dashboard.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { Users, BarChart3, TrendingUp, Star } from "lucide-react";

export default function UsageMetricsView() {
    const [period, setPeriod] = useState<string>("30d");

    const { data: userResponse, isLoading: isUserLoading } = useQuery({
        queryKey: ["manager", "user-performance", period],
        queryFn: () => getUserPerformanceMetrics(`period=${period}`).then((res) => res.data),
    });

    const { data: performanceResponse, isLoading: isPerfLoading } = useQuery({
        queryKey: ["manager", "engine-performance"],
        queryFn: () => getPerformanceMetrics().then((res) => res.data),
    });

    const summary = userResponse?.summary;
    const growthTimeline = userResponse?.growthTimeline || [];
    const modelDistribution = performanceResponse?.modelDistribution || [];
    const topTemplates = performanceResponse?.topTemplates || [];

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl min-w-full mx-auto">

            {/* View Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
                <div className="space-y-0.5">
                    <h1 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                        Platform Distribution Metrics
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        Monitor infrastructure configuration footprint curves and blueprint run dependencies across computational nodes.
                    </p>
                </div>
                <div className="flex bg-muted/60 p-0.5 rounded-sm border border-border/40 self-start sm:self-auto">
                    {["7d", "30d", "90d"].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${period === p ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { title: "Total Registered Platform Users", val: summary?.totalUsers, sub: "Total base accounts signature", icon: Users },
                    { title: "Period Registrations Velocity", val: summary?.newUsersCount, sub: `Net growth within trailing ${period}`, icon: TrendingUp },
                    { title: "Velocity Growth Index", val: summary?.growthPercentage ? `${summary.growthPercentage}%` : undefined, sub: "Comparative structural scale velocity", icon: BarChart3 },
                ].map((card, idx) => (
                    <Card key={idx} className="bg-card border-border/60 rounded-sm shadow-xs">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                {card.title}
                            </CardTitle>
                            <card.icon className="h-3.5 w-3.5 text-primary opacity-80" />
                        </CardHeader>
                        <CardContent>
                            {isUserLoading ? (
                                <Skeleton className="h-6 w-16 bg-muted rounded-sm" />
                            ) : (
                                <div className="text-lg font-bold font-mono text-foreground">{card.val ?? 0}</div>
                            )}
                            <p className="text-[10px] text-muted-foreground mt-0.5">{card.sub}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Charts Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* User Registration Velocity Chart */}
                <Card className="lg:col-span-2 bg-card border-border/60 rounded-sm shadow-xs flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold tracking-tight">Identity Registration Trajectory</CardTitle>
                        <CardDescription className="text-xs">Account signups mapped chronologically.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px] w-full pt-2">
                        {isUserLoading ? (
                            <Skeleton className="w-full h-full bg-muted rounded-sm" />
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={growthTimeline} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="userGrowth" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--border), 0.15)" />
                                    <XAxis dataKey="date" style={{ fontSize: "10px", fontFamily: "var(--font-mono)", fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                                    <YAxis style={{ fontSize: "10px", fontFamily: "var(--font-mono)", fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "hsl(var(--popover))", borderRadius: "4px", borderColor: "hsl(var(--border))" }}
                                        labelStyle={{ fontSize: "11px", fontWeight: "bold", fontFamily: "var(--font-mono)", color: "hsl(var(--foreground))" }}
                                        itemStyle={{ fontSize: "11px", fontFamily: "var(--font-mono)" }}
                                    />
                                    <Area type="monotone" dataKey="registrations" name="Signups" stroke="var(--chart-1)" strokeWidth={1.5} fillOpacity={1} fill="url(#userGrowth)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                {/* Model Calls Volume Profile */}
                <Card className="bg-card border-border/60 rounded-sm shadow-xs flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold tracking-tight">Infrastructure Model Loads</CardTitle>
                        <CardDescription className="text-xs">Aggregated run distribution metrics.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px] w-full">
                        {isPerfLoading ? (
                            <Skeleton className="w-full h-full bg-muted rounded-sm" />
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={modelDistribution} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--border), 0.15)" />
                                    <XAxis dataKey="model" style={{ fontSize: "9px", fontFamily: "var(--font-mono)", fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                                    <YAxis style={{ fontSize: "10px", fontFamily: "var(--font-mono)", fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "hsl(var(--popover))", borderRadius: "4px", borderColor: "hsl(var(--border))" }}
                                        itemStyle={{ fontSize: "11px", fontFamily: "var(--font-mono)" }}
                                    />
                                    <Bar dataKey="usageCount" name="Calls Count" fill="var(--chart-2)" radius={[2, 2, 0, 0]} maxBarSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Top Performing Templates Grid Segment */}
            <Card className="bg-card border-border/60 rounded-sm shadow-xs">
                <CardHeader>
                    <CardTitle className="text-sm font-bold tracking-tight">Top Performing Layout Blueprints</CardTitle>
                    <CardDescription className="text-xs">Most requested template presets ordered across total compilation volume parameters.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {isPerfLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="p-4 border border-border/40 rounded-sm bg-muted/10 flex justify-between items-center">
                                    <div className="space-y-1.5 flex-1">
                                        <Skeleton className="h-4 w-3/4 bg-muted rounded-sm" />
                                        <Skeleton className="h-3 w-1/4 bg-muted rounded-sm" />
                                    </div>
                                    <Skeleton className="h-5 w-10 bg-muted rounded-sm" />
                                </div>
                            ))
                        ) : topTemplates.length > 0 ? (
                            topTemplates.map((template, index) => (
                                <div key={template.id} className="p-3.5 border border-border/50 rounded-sm bg-muted/20 flex items-center justify-between gap-3 text-xs">
                                    <div className="min-w-0 flex-1 space-y-0.5">
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-mono text-[10px] text-primary font-bold">#0{index + 1}</span>
                                            <p className="font-semibold text-foreground truncate">{template.title}</p>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground font-mono">ID: {template.id.slice(0, 8)}...</p>
                                    </div>
                                    <div className="flex items-center gap-1 font-bold font-mono bg-primary/10 text-primary px-2 py-0.5 border border-primary/20 rounded-xs text-[11px] flex-shrink-0">
                                        <Star className="w-3 h-3 fill-current" />
                                        {template.count}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-8 text-center text-xs font-mono text-muted-foreground">
                                No blueprint usage histories analyzed yet.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}