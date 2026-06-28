// @/app/(dashboard)/dashboard/history/GenerationTableColumns.tsx
import DateCell from "@/components/shared/cell/DateCell"
import { Badge } from "@/components/ui/badge"
import { IGenerationJobPayload } from "@/types/generation.types"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { MoreHorizontal, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const getStatusBadgeClass = (status: string) => {
    switch (status) {
        case "COMPLETED":
            return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10"
        case "FAILED":
            return "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10"
        case "PROCESSING":
        case "QUEUED":
            return "bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse hover:bg-blue-500/10"
        default:
            return "bg-muted text-muted-foreground border-border"
    }
}

export const generationTableColumns: ColumnDef<IGenerationJobPayload>[] = [
    {
        id: "title",
        accessorKey: "title",
        header: "Generated Prompt Title",
        cell: ({ row }) => {
            const { id, inputPrompt, generatedContent } = row.original
            const displayTitle = generatedContent?.title || inputPrompt || "Untitled Generation Run"

            return (
                <div className="flex flex-col gap-0.5 max-w-xs sm:max-w-md">
                    <Link
                        href={`/dashboard/generate/${id}`}
                        className="font-medium line-clamp-1 text-foreground hover:text-primary hover:underline transition-all"
                    >
                        {displayTitle}
                    </Link>
                    <span className="text-[11px] text-muted-foreground font-mono truncate max-w-[280px]">
                        ID: {id}
                    </span>
                </div>
            )
        },
    },
    {
        id: "template",
        accessorKey: "template.title",
        header: "Blueprint Template",
        cell: ({ row }) => (
            <span className="text-sm font-medium text-foreground/80">
                {row.original.template?.title || <span className="text-muted-foreground italic font-normal">Custom Form Run</span>}
            </span>
        ),
    },
    {
        id: "model",
        accessorKey: "model",
        header: "Compute Model",
        cell: ({ row }) => (
            <Badge variant="outline" className="font-mono text-[10px] tracking-tight bg-muted/40 px-1.5 py-0">
                {row.original.model}
            </Badge>
        ),
    },
    {
        id: "status",
        accessorKey: "status",
        header: "Execution Status",
        cell: ({ row }) => {
            const status = row.original.status || "PROCESSING"
            return (
                <Badge variant="outline" className={`font-mono text-[10px] rounded-full uppercase tracking-wider px-2 ${getStatusBadgeClass(status)}`}>
                    {status}
                </Badge>
            )
        },
    },
    {
        id: "tokensUsed",
        accessorKey: "tokensUsed",
        header: "Overhead Cost",
        cell: ({ row }) => {
            const tokens = row.original.tokensUsed
            return (
                <span className="text-sm font-mono font-medium text-foreground">
                    {tokens ? `${tokens.toLocaleString()} tkn` : "0"}
                </span>
            )
        },
    },
    {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Executed At",
        cell: ({ row }) => {
            if (!row.original.createdAt) {
                return <span className="text-muted-foreground">N/A</span>
            }
            return (
                <DateCell
                    date={row.original.createdAt}
                    formatString="MMM dd, yyyy · hh:mm a"
                />
            )
        },
    },
    {
        id: "actions-2",
        header: "Actions",
        cell: ({ row, table }) => {
            const job = row.original
            // Pull the handlers out of your custom table actions meta mapping object
            const meta = table.options.meta as any

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 border-border bg-popover">
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href={`/dashboard/generate/${job.id}`}>
                                <Eye className="mr-2 h-3.5 w-3.5 opacity-60" />
                                View Details
                            </Link>
                        </DropdownMenuItem>
                     
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]