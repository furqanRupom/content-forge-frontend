"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getContentLogsMetrics } from "@/services/dashboard.service";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Search, RefreshCw, Layers, CheckCircle2, XCircle } from "lucide-react";
import { IContentLogsMetrics } from "@/types/dashboard.types";

export default function ContentLogsView() {
    const [searchTerm, setSearchTerm] = useState("");

    const { data: response, isLoading, refetch, isFetching } = useQuery({
        queryKey: ["manager", "detailed-content-logs"],
        queryFn: () => getContentLogsMetrics().then((res) => res.data),
    });

    const logsData: IContentLogsMetrics["summary"] | undefined = response?.summary;
    const logsList = response?.recentLogs || [];

    // Local filtering based on prompt or user context strings
    const filteredLogs = logsList.filter((log) => {
        const term = searchTerm.toLowerCase();
        return (
            log.inputPrompt.toLowerCase().includes(term) ||
            log.model.toLowerCase().includes(term) ||
            log.user?.name.toLowerCase().includes(term) ||
            log.user?.email.toLowerCase().includes(term)
        );
    });

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl min-w-full mx-auto">

            {/* View Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
                <div className="space-y-0.5">
                    <h1 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                        Pipeline Generation Logs
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        Audit system transactional histories, trace model input parameters, and analyze generation health states.
                    </p>
                </div>
                <button
                    onClick={() => refetch()}
                    disabled={isFetching}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-muted text-xs font-bold border border-border/60 hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer disabled:opacity-50"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
                    Sync Core Buffer
                </button>
            </div>

            {/* Stability Metrics Cards Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: "Total Tracked Runs", val: logsData?.totalRuns, sub: "Historical operations index", icon: Layers },
                    { title: "Current Executions", val: logsData?.processingRuns, sub: "Active parsing buffers", icon: RefreshCw },
                    { title: "Failed Lifecycles", val: logsData?.failedRuns, sub: "Terminated compilation traces", icon: XCircle },
                    { title: "Stability Yield", val: logsData?.stabilityRate ? `${logsData.stabilityRate}%` : undefined, sub: "Total operational uptime efficiency", icon: CheckCircle2 },
                ].map((card, idx) => (
                    <Card key={idx} className="bg-card border-border/60 rounded-sm shadow-xs">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                {card.title}
                            </CardTitle>
                            <card.icon className="h-3.5 w-3.5 text-primary opacity-80" />
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <Skeleton className="h-6 w-16 bg-muted rounded-sm" />
                            ) : (
                                <div className="text-lg font-bold font-mono text-foreground">{card.val ?? 0}</div>
                            )}
                            <p className="text-[10px] text-muted-foreground mt-0.5">{card.sub}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filter and Audit Shell Section */}
            <Card className="bg-card border-border/60 rounded-sm shadow-xs">
                <CardHeader className="pb-3">
                    <div className="max-w-md relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <Input
                            placeholder="Filter logs by user email, model name, prompt text..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 h-9 rounded-sm bg-muted/20 border-border/60 focus-visible:ring-1 focus-visible:ring-ring text-xs transition-colors"
                        />
                    </div>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <div className="w-full min-w-[800px] space-y-2 text-xs">
                        <div className="grid grid-cols-12 gap-4 font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2 px-2 text-[10px]">
                            <div className="col-span-3">User Node</div>
                            <div className="col-span-2">Engine Target</div>
                            <div className="col-span-4">Input Snippet Context</div>
                            <div className="col-span-2">Timestamp Execution</div>
                            <div className="col-span-1 text-right">Status</div>
                        </div>

                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="grid grid-cols-12 gap-4 py-3 border-b border-border/20 items-center px-2">
                                    <div className="col-span-3"><Skeleton className="h-3.5 w-3/4 bg-muted rounded-sm" /></div>
                                    <div className="col-span-2"><Skeleton className="h-3.5 w-1/2 bg-muted rounded-sm" /></div>
                                    <div className="col-span-4"><Skeleton className="h-3.5 w-5/6 bg-muted rounded-sm" /></div>
                                    <div className="col-span-2"><Skeleton className="h-3.5 w-2/3 bg-muted rounded-sm" /></div>
                                    <div className="col-span-1"><Skeleton className="h-4 w-12 bg-muted rounded-sm ml-auto" /></div>
                                </div>
                            ))
                        ) : filteredLogs.length > 0 ? (
                            filteredLogs.map((log) => (
                                <div key={log.id} className="grid grid-cols-12 gap-4 py-3 border-b border-border/20 last:border-none items-center px-2 hover:bg-muted/20 transition-colors rounded-xs">
                                    <div className="col-span-3 min-w-0">
                                        <p className="font-semibold text-foreground truncate">{log.user?.name || "Anonymous Operator"}</p>
                                        <p className="text-[10px] text-muted-foreground font-mono truncate">{log.user?.email || "N/A"}</p>
                                    </div>
                                    <div className="col-span-2 font-mono text-[11px] text-muted-foreground truncate">
                                        {log.model}
                                    </div>
                                    <div className="col-span-4 text-muted-foreground min-w-0">
                                        <p className="truncate text-foreground font-medium">"{log.generatedContent?.title || "Untitled Context Execution"}"</p>
                                        <p className="truncate text-[10px] text-muted-foreground/80 font-mono mt-0.5">{log.inputPrompt}</p>
                                    </div>
                                    <div className="col-span-2 text-muted-foreground font-mono text-[10px]">
                                        {new Date(log.createdAt).toLocaleString(undefined, { dateStyle: "short", timeStyle: "medium" })}
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
                            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground text-center">
                                <ShieldAlert className="w-8 h-8 opacity-20 mb-2" />
                                <p className="font-mono text-xs">No active pipeline generation matching filter criteria.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}