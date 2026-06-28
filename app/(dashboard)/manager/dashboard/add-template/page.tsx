import Link from "next/link";
import { ArrowLeft, Sparkles, Sliders, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import AddNewTemplateForm from "@/components/modules/Manager/TemplatesManagement/AddNewTemplateForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add Template - ContentForge AI",
    description: "Manager dashboard page to orchestrate and bootstrap new system generation models."
};

export default function ManagerDashboardPage() {
    return (
        <main className="flex-1 space-y-6 p-8 pt-6 max-w-7xl mx-auto">
            {/* Top Navigation Row */}
            <div className="flex items-center justify-between">
                <Link
                    href="/manager/dashboard/manage-templates"
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Templates Matrix
                </Link>
            </div>

            {/* Content Architecture Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Template Provisioning Console
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Configure, tokenize, and wire new layout schemas into the system pipeline.
                    </p>
                </div>
            </div>

            {/* Split Screen Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Form Processing Center (Takes 2 columns) */}
                <div className="lg:col-span-2 space-y-4">
                    <AddNewTemplateForm />
                </div>

                {/* Meta System Guidelines Sidebar (Takes 1 column) */}
                <div className="space-y-6 lg:sticky lg:top-6">
                    <div className="rounded-xl border bg-card text-card-foreground p-5 shadow-sm space-y-4">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-teal-600" />
                            Blueprint Architecture Rules
                        </h3>

                        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                            <div className="flex gap-3">
                                <Sliders className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                                <p>
                                    <strong className="text-zinc-700 dark:text-zinc-300 block">Unique Key Constraint</strong>
                                    Ensure keys utilize alphanumeric lowercase naming schemas delimited by hyphens (e.g., <code className="bg-muted px-1 py-0.5 rounded text-teal-600">mkt-seo-landing</code>) to prevent runtime parsing conflicts.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <ShieldCheck className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                                <p>
                                    <strong className="text-zinc-700 dark:text-zinc-300 block">Prompt Engineering Hints</strong>
                                    The context parameters outlined here appear directly within user injection views to guide structure processing before passing down into the LLM context pool.
                                </p>
                            </div>
                        </div>

                        <hr className="border-zinc-100 dark:border-zinc-800" />

                        <div>
                            <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase block mb-2">
                                System Capabilities Overview
                            </span>
                            <div className="flex flex-wrap gap-1.5 max-h-[160px] overflow-y-auto pr-1 text-[11px] font-mono scrollbar-thin">
                                <span className="px-2 py-0.5 bg-muted rounded">Social Copy</span>
                                <span className="px-2 py-0.5 bg-muted rounded">Blogging Tools</span>
                                <span className="px-2 py-0.5 bg-muted rounded">SEO Structs</span>
                                <span className="px-2 py-0.5 bg-muted rounded">Technical Docs</span>
                                <span className="px-2 py-0.5 bg-muted rounded">Ecommerce Variants</span>
                                <span className="px-2 py-0.5 bg-muted rounded">Developer Semantics</span>
                                <span className="px-2 py-0.5 bg-muted rounded">Support Templates</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}