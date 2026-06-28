import { getGeneration } from "@/services/generation.service";
import { Metadata } from "next";
import Link from "next/link";
import {
    Wand2, Calendar, Cpu, Clock, AlertTriangle,
    ChevronLeft, FileText, CheckCircle2, XCircle, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Generation Details | ContentForge AI",
    description: "Deep dive execution metrics and outputs generated via ContentForge AI pipeline models.",
};

interface IGenerationDetailsProps {
    params: Promise<{ id: string }>;
}

const GenerationDetailsPage = async ({ params }: IGenerationDetailsProps) => {
    const { id } = await params;
    const response = await getGeneration(id);

    // If the HTTP context failed completely or data missing
    if (!response || !response.success || !response.data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4">
                <AlertTriangle className="h-10 w-10 text-destructive animate-pulse" />
                <h2 className="text-base font-semibold text-foreground">Failed to Load Generation Payload</h2>
                <p className="text-xs font-mono text-muted-foreground text-center max-w-sm">
                    The requested execution context identifier could not be successfully retrieved from the persistence cluster matrix.
                </p>
                <Button variant="outline" size="sm" asChild className="rounded-full font-mono text-xs">
                    <Link href="/dashboard/generate">
                        <ChevronLeft className="mr-1 h-3.5 w-3.5" /> Return to Studio
                    </Link>
                </Button>
            </div>
        );
    }

    const job = response.data;
    const isFailed = job.status === "FAILED";
    const outputText = job.generatedContent?.outputText || "";

    // Parse timestamp metrics safely
    const executionDate = new Date(job.createdAt).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
    });

    return (
        <main className="flex-1 overflow-y-auto bg-background p-6 space-y-6">

            {/* Header Navigation Segment */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                        <Link href="/dashboard/generate" className="hover:text-primary transition-colors flex items-center gap-0.5">
                            Studio
                        </Link>
                        <span>/</span>
                        <span className="text-foreground truncate max-w-[200px]">ID: {job.id.slice(0, 8)}...</span>
                    </div>
                    <h1 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
                        <Wand2 className="h-4 w-4 text-primary" />
                        {job.template?.title || "Custom Generated Space Layout"}
                    </h1>
                </div>

                <Button variant="outline" size="sm" asChild className="rounded-full font-mono text-xs shrink-0 self-start sm:self-center">
                    <Link href="/dashboard/generate">
                        <ChevronLeft className="mr-1 h-3.5 w-3.5" /> Back to Workspace
                    </Link>
                </Button>
            </div>

            {/* Runtime Diagnostic Error Warning Flag */}
            {isFailed && (
                <div className="rounded-[var(--radius)] border border-destructive/20 bg-destructive/10 p-4 flex gap-3 items-start">
                    <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-destructive font-mono uppercase tracking-wider">Pipeline Execution Failure</p>
                        <p className="text-xs font-mono text-foreground/90 leading-relaxed">
                            {job.errorMessage || "An unexpected error occurred during model serialization processing cycles."}
                        </p>
                    </div>
                </div>
            )}

            {/* Split UI Data Architecture Map Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Generated Contents Block Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-[var(--radius)] border border-border bg-card shadow-xs overflow-hidden">
                        <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
                            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                                Output Payload Stream
                            </span>

                            {/* Fallback Display Badge */}
                            {isFailed && outputText && (
                                <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/10 text-amber-600 border border-amber-500/20 rounded-full">
                                    Partial Yield Preserved
                                </span>
                            )}
                        </div>

                        <div className="p-5">
                            {outputText ? (
                                <article className="prose prose-sm dark:prose-invert max-w-none">
                                    <pre className="text-xs leading-relaxed font-sans text-foreground whitespace-pre-wrap bg-transparent p-0 border-none">
                                        {outputText}
                                    </pre>
                                </article>
                            ) : (
                                <div className="text-center py-12 space-y-2">
                                    <AlertTriangle className="h-6 w-6 text-muted-foreground mx-auto opacity-40" />
                                    <p className="text-xs font-mono text-muted-foreground">No structural content yield parsed for this run configuration instance.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Original User Parameter Inputs Segment */}
                    <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-3">
                        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground">Original Prompt Arguments</h3>
                        <div className="rounded-[var(--radius)] bg-muted/40 border border-border p-3 text-xs text-foreground font-mono whitespace-pre-wrap leading-relaxed">
                            {job.inputPrompt}
                        </div>
                    </div>
                </div>

                {/* System Configuration Telemetry Column */}
                <div className="space-y-6">
                    <div className="rounded-[var(--radius)] border border-border bg-card p-5 space-y-4">
                        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
                            Runtime Attributes
                        </h3>

                        <div className="space-y-3.5 text-xs">
                            {/* Status Segment */}
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Job Status</span>
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border ${job.status === "COMPLETED"
                                        ? "bg-primary/10 border-primary/20 text-primary"
                                        : job.status === "PROCESSING"
                                            ? "bg-blue-500/10 border-blue-500/20 text-blue-500"
                                            : "bg-destructive/10 border-destructive/20 text-destructive"
                                    }`}>
                                    {job.status === "COMPLETED" && <CheckCircle2 className="h-2.5 w-2.5" />}
                                    {job.status === "PROCESSING" && <RefreshCw className="h-2.5 w-2.5 animate-spin" />}
                                    {job.status === "FAILED" && <XCircle className="h-2.5 w-2.5" />}
                                    {job.status}
                                </span>
                            </div>

                            {/* Compute Model Segment */}
                            <div className="flex justify-between items-center border-t border-border/40 pt-2.5">
                                <span className="text-muted-foreground flex items-center gap-1">
                                    <Cpu className="h-3 w-3" /> Compute Core
                                </span>
                                <span className="font-mono text-[11px] text-foreground bg-muted px-1.5 py-0.5 rounded">{job.model}</span>
                            </div>

                            {/* Token Overhead Metrics */}
                            <div className="flex justify-between items-center border-t border-border/40 pt-2.5">
                                <span className="text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> Token Payload Weight
                                </span>
                                <span className="font-mono font-semibold text-foreground">
                                    {job.tokensUsed ? job.tokensUsed.toLocaleString() : "0"} units
                                </span>
                            </div>

                            {/* Volume Metric */}
                            {job.generatedContent?.wordCount && (
                                <div className="flex justify-between items-center border-t border-border/40 pt-2.5">
                                    <span className="text-muted-foreground flex items-center gap-1">
                                        <FileText className="h-3 w-3" /> Volumetric Count
                                    </span>
                                    <span className="font-mono text-foreground">{job.generatedContent.wordCount} words</span>
                                </div>
                            )}

                            {/* Operational Vocal Tone Dialect */}
                            {job.inputPayload?.tone && (
                                <div className="flex justify-between items-center border-t border-border/40 pt-2.5">
                                    <span className="text-muted-foreground">Assigned Vocal Tone</span>
                                    <span className="px-2 py-0.5 rounded-[var(--radius)] bg-secondary text-secondary-foreground text-[10px] font-mono border border-border">
                                        {job.inputPayload.tone}
                                    </span>
                                </div>
                            )}

                            {/* Timestamp Allocation */}
                            <div className="flex flex-col gap-1 border-t border-border/40 pt-2.5">
                                <span className="text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-3 w-3" /> Timestamp Frame
                                </span>
                                <span className="font-mono text-[11px] text-foreground/80 pl-4">{executionDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default GenerationDetailsPage;