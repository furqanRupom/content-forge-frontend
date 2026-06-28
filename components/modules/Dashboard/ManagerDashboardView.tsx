"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getContentLogsMetrics, getUserPerformanceMetrics, getPerformanceMetrics } from "@/services/dashboard.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { ShieldCheck, Users, Activity, Percent, ArrowUpRight, ShieldAlert } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";

interface ManagerDashboardViewProps {
    initialUser: any;
}

// Map directly onto your global OKLCH dynamic theme tokens
const velocityChartConfig = {
    registrations: {
        label: "Signups",
        color: "var(--chart-1)", // Uses your design system primary chart token
    },
} satisfies ChartConfig;

const distributionChartConfig = {
    usageCount: {
        label: "Calls Count",
        color: "var(--chart-2)", // Uses your design system secondary chart token
    },
} satisfies ChartConfig;

export default function ManagerDashboardView({ initialUser }: ManagerDashboardViewProps) {
    const [period, setPeriod] = useState<string>("30d");

    const greeting = React.useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    }, []);

    const { data: contentLogs, isLoading: isLogsLoading } = useQuery({
        queryKey: ["manager", "content-logs"],
        queryFn: () => getContentLogsMetrics().then((res) => res.data),
    });

    const { data: userMetrics, isLoading: isUserLoading } = useQuery({
        queryKey: ["manager", "user-metrics", period],
        queryFn: () => getUserPerformanceMetrics(`period=${period}`).then((res) => res.data),
    });

    const { data: engineMetrics, isLoading: isEngineLoading } = useQuery({
        queryKey: ["manager", "performance-metrics"],
        queryFn: () => getPerformanceMetrics().then((res) => res.data),
    });

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl min-w-full mx-auto">

            {/* Executive Spotlight Card */}
            <div className="relative bg-card border border-border/60 rounded-sm p-6 overflow-hidden shadow-xs">
                <div className="absolute w-64 h-64 -right-12 -top-12 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-1 text-primary bg-primary/5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm mb-1">
                            <ShieldCheck className="w-3 h-3" /> Management Control
                        </div>
                        <h1 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            {greeting}, <span className="text-primary capitalize">{initialUser?.name || "Manager"}</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
                            Overseeing platform velocity metrics, infrastructure load rates, registration velocity vectors, and engine run logs.
                        </p>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono bg-muted/50 px-3 py-1.5 border border-border/40 rounded-sm self-start sm:self-auto">
                        Operator ID: <span className="text-foreground font-bold">{initialUser?.id?.slice(0, 8) || "N/A"}</span>
                    </div>
                </div>
            </div>

            {/* Admin Metrics Dashboard Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: "Total User Accounts", val: userMetrics?.summary?.totalUsers, sub: "Total base footprint", icon: Users },
                    { title: "Registration Velocity", val: userMetrics?.summary?.newUsersCount, sub: `New signups (${period})`, icon: ArrowUpRight },
                    { title: "Pipeline Stability", val: contentLogs?.summary?.stabilityRate ? `${contentLogs.summary.stabilityRate}%` : undefined, sub: "Global compilation metrics", icon: Percent },
                    { title: "Active Logs Queued", val: contentLogs?.summary?.processingRuns, sub: "Processes currently executing", icon: Activity },
                ].map((card, idx) => (
                    <Card key={idx} className="bg-card border-border/60 rounded-sm shadow-xs">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                {card.title}
                            </CardTitle>
                            <card.icon className="h-4 w-4 text-primary opacity-80" />
                        </CardHeader>
                        <CardContent>
                            {isLogsLoading || isUserLoading ? (
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

            {/* Graphical Trends Analysis Block Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Identity Registration Velocity Area Chart */}
                <Card className="lg:col-span-2 bg-card border-border/60 rounded-sm shadow-xs flex flex-col justify-between">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 gap-4">
                        <div className="space-y-0.5">
                            <CardTitle className="text-sm font-bold tracking-tight">Identity Registration Velocity</CardTitle>
                            <CardDescription className="text-xs">Timeline vectors plotting account creation curves.</CardDescription>
                        </div>
                        <div className="flex bg-muted/60 p-0.5 rounded-sm border border-border/40">
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
                    </CardHeader>
                    <CardContent className="px-2 pt-2 sm:p-6 flex-1 flex flex-col justify-center">
                        {isUserLoading ? (
                            <Skeleton className="w-full h-[240px] bg-muted rounded-sm" />
                        ) : (
                            <ChartContainer config={velocityChartConfig} className="aspect-auto h-[240px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={userMetrics?.growthTimeline || []} margin={{ left: 12, right: 12, top: 10, bottom: 5 }}>
                                        <defs>
                                            <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-registrations)" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="var(--color-registrations)" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
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
                                                    className="w-[150px] bg-popover border-border font-mono text-xs rounded-sm shadow-md"
                                                    nameKey="registrations"
                                                    labelFormatter={(value) => {
                                                        return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                                                    }}
                                                />
                                            }
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="registrations"
                                            stroke="var(--color-registrations)"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorRegistrations)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        )}
                    </CardContent>
                </Card>

                {/* Model Distribution Analytics Bar Chart */}
                <Card className="bg-card border-border/60 rounded-sm shadow-xs flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold tracking-tight">Model Call Allocations</CardTitle>
                        <CardDescription className="text-xs">Usage density across discrete processing engines.</CardDescription>
                    </CardHeader>
                    <CardContent className="px-2 pt-2 sm:p-6 flex-1 flex flex-col justify-center">
                        {isEngineLoading ? (
                            <Skeleton className="w-full h-[240px] bg-muted rounded-sm" />
                        ) : (
                            <ChartContainer config={distributionChartConfig} className="aspect-auto h-[240px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={engineMetrics?.modelDistribution || []} margin={{ left: 12, right: 12, top: 10, bottom: 5 }}>
                                        <CartesianGrid vertical={false} stroke="rgba(var(--border), 0.15)" strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="model"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            style={{ fontSize: "9px", fontFamily: "var(--font-mono)", fill: "hsl(var(--muted-foreground))" }}
                                        />
                                        <YAxis tickLine={false} axisLine={false} style={{ fontSize: "10px", fontFamily: "var(--font-mono)", fill: "hsl(var(--muted-foreground))" }} />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent
                                                    className="w-[150px] bg-popover border-border font-mono text-xs rounded-sm shadow-md"
                                                    nameKey="usageCount"
                                                />
                                            }
                                        />
                                        <Bar
                                            dataKey="usageCount"
                                            fill="var(--color-usageCount)"
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={32}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Global Pipelines Content Logs Activity Feed Row */}
            <Card className="bg-card border-border/60 rounded-sm shadow-xs">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <div className="space-y-0.5">
                        <CardTitle className="text-sm font-bold tracking-tight">Live Pipeline Content Logs</CardTitle>
                        <CardDescription className="text-xs">System-wide transactional workspace generation events.</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono tracking-wider font-bold bg-muted text-foreground rounded-sm">
                        Realtime Tracking
                    </Badge>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <div className="w-full min-w-[600px] space-y-2 text-xs">
                        <div className="grid grid-cols-12 gap-4 font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2 px-2 text-[10px]">
                            <div className="col-span-3">User Node</div>
                            <div className="col-span-2">Engine Model</div>
                            <div className="col-span-4">Input Snippet Context</div>
                            <div className="col-span-2">Timestamp</div>
                            <div className="col-span-1 text-right">Status</div>
                        </div>

                        {isLogsLoading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="grid grid-cols-12 gap-4 py-3 border-b border-border/20 items-center px-2">
                                    <div className="col-span-3"><Skeleton className="h-3.5 w-3/4 bg-muted rounded-sm" /></div>
                                    <div className="col-span-2"><Skeleton className="h-3.5 w-1/2 bg-muted rounded-sm" /></div>
                                    <div className="col-span-4"><Skeleton className="h-3.5 w-5/6 bg-muted rounded-sm" /></div>
                                    <div className="col-span-2"><Skeleton className="h-3.5 w-2/3 bg-muted rounded-sm" /></div>
                                    <div className="col-span-1 text-right"><Skeleton className="h-4 w-12 bg-muted rounded-sm ml-auto" /></div>
                                </div>
                            ))
                        ) : contentLogs?.recentLogs && contentLogs.recentLogs.length > 0 ? (
                            contentLogs.recentLogs.map((log) => (
                                <div key={log.id} className="grid grid-cols-12 gap-4 py-2.5 border-b border-border/20 last:border-none items-center px-2 hover:bg-muted/20 transition-colors rounded-xs">
                                    <div className="col-span-3 min-w-0">
                                        <p className="font-medium text-foreground truncate">{log.user?.name || "Unknown Operator"}</p>
                                        <p className="text-[10px] text-muted-foreground font-mono truncate">{log.user?.email || "N/A"}</p>
                                    </div>
                                    <div className="col-span-2 font-mono text-[11px] text-muted-foreground truncate">
                                        {log.model}
                                    </div>
                                    <div className="col-span-4 text-muted-foreground truncate italic">
                                        "{log.generatedContent?.title || log.inputPrompt || "Empty Context Body"}"
                                    </div>
                                    <div className="col-span-2 text-muted-foreground font-mono text-[10px]">
                                        {new Date(log.createdAt).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}
                                    </div>
                                    <div className="col-span-1 text-right">
                                        <Badge
                                            variant="outline"
                                            className={`text-[9px] px-1.5 py-0 font-mono tracking-wide rounded-xs font-bold ${log.status === "COMPLETED"
                                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                                : log.status === "FAILED"
                                                    ? "bg-destructive/10 text-destructive border-destructive/20"
                                                    : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                                }`}
                                        >
                                            {log.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                <ShieldAlert className="w-8 h-8 opacity-20 mb-2" />
                                <p className="font-mono text-xs">No workspace engine run logs available.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}