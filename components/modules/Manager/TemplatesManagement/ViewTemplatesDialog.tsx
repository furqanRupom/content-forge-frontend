"use client"

import { ViewTemplateAction } from "@/app/(dashboard)/manager/dashboard/manage-templates/_action"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    templateId: string | null
}

const formatDateTime = (value?: string) => {
    if (!value) return "N/A"
    const d = new Date(value)
    if (isNaN(d.getTime())) return "N/A"
    return format(d, "MMM dd, yyyy hh:mm a")
}

export default function ViewTemplatesDialog({
    open,
    onOpenChange,
    templateId,
}: Props) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["template-details", templateId],
        queryFn: () => ViewTemplateAction(templateId!),
        enabled: open && !!templateId,
    })

    const template = data?.success ? data.data : null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] max-w-5xl min-w-4xl w-full overflow-hidden p-0">
                <DialogHeader className="border-b px-6 py-5">
                    <DialogTitle>Template Information Details</DialogTitle>
                    <DialogDescription>
                        Detailed configuration matrix overview
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[calc(90vh-5rem)]">
                    <div className="space-y-4 px-6 py-5">
                        {isLoading && (
                            <p className="text-sm text-muted-foreground animate-pulse">Loading dataset configuration...</p>
                        )}

                        {isError && (
                            <p className="text-sm text-destructive">Failed to fetch template configurations</p>
                        )}

                        {template && (
                            <>
                                {/* Identity */}
                                <div className="rounded-lg border p-4 space-y-1">
                                    <h3 className="mb-2 font-semibold text-sm tracking-wide uppercase text-muted-foreground">Identity</h3>
                                    <p><b>System ID:</b> <span className="font-mono text-xs">{template.id}</span></p>
                                    <p><b>Unique Key:</b> <span className="font-mono text-xs text-teal-600">{template.key}</span></p>
                                    <p><b>Title:</b> {template.title}</p>
                                    <p><b>Description:</b> {template.description}</p>
                                </div>

                                {/* Routing Classification */}
                                <div className="rounded-lg border p-4">
                                    <h3 className="mb-2 font-semibold text-sm tracking-wide uppercase text-muted-foreground">Classification</h3>
                                    <p className="mb-2"><b>Category:</b> {template.category}</p>
                                    <div className="flex gap-2 items-center">
                                        <b>Engine Enum Context:</b>
                                        <Badge variant="outline" className="font-mono text-xs">{template.type}</Badge>
                                        <Badge variant={template.isActive ? "default" : "destructive"}>
                                            {template.isActive ? "Active" : "Disabled"}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Prompt Blueprint Engineering */}
                                <div className="rounded-lg border p-4">
                                    <h3 className="mb-2 font-semibold text-sm tracking-wide uppercase text-muted-foreground">Prompt Blueprint Hint</h3>
                                    <div className="rounded bg-muted p-3 text-sm font-mono whitespace-pre-wrap border">
                                        {template.promptHint || "No standard context parameters defined."}
                                    </div>
                                </div>

                                {/* Meta Execution Profiles */}
                                <div className="rounded-lg border p-4">
                                    <h3 className="mb-2 font-semibold text-sm tracking-wide uppercase text-muted-foreground">Execution Statistics</h3>
                                    <p><b>Total Compiled Executions:</b> {template._count?.generationJobs ?? 0}</p>
                                    <p><b>System Onboarding:</b> {formatDateTime(template.createdAt)}</p>
                                    <p><b>Last Layout Mutation:</b> {formatDateTime(template.updatedAt)}</p>
                                </div>
                            </>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}