import DateCell from "@/components/shared/cell/DateCell"
import { Badge } from "@/components/ui/badge"
import { ITemplate } from "@/types/template.types"
import { ColumnDef } from "@tanstack/react-table"

const getStatusVariant = (isActive: boolean) => {
    return isActive ? "default" : "destructive"
}

export const templateTableColumns: ColumnDef<ITemplate>[] = [
    {
        id: "title",
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <div className="flex flex-col gap-0.5 max-w-60">
                <span className="font-medium line-clamp-1">
                    {row.original.title}
                </span>
                <span className="text-xs text-muted-foreground font-mono line-clamp-1">
                    {row.original.key}
                </span>
            </div>
        ),
    },
    {
        id: "category",
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
            <span className="text-sm text-muted-foreground font-medium">
                {row.original.category}
            </span>
        ),
    },
    {
        id: "type",
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
            <Badge variant="outline" className="font-mono text-[11px]">
                {row.original.type}
            </Badge>
        ),
    },
    {
        id: "isActive",
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant={getStatusVariant(row.original.isActive)}>
                {row.original.isActive ? "Active" : "Inactive"}
            </Badge>
        ),
    },
    {
        id: "generationJobs",
        accessorKey: "_count.generationJobs",
        header: "Jobs Run",
        cell: ({ row }) => (
            <span className="text-sm font-medium pl-4">
                {row.original._count?.generationJobs ?? 0}
            </span>
        ),
    },
    {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            if (!row.original.createdAt) {
                return <span className="text-muted-foreground">N/A</span>
            }

            return (
                <DateCell
                    date={row.original.createdAt}
                    formatString="MMM dd, yyyy"
                />
            )
        },
    },
]