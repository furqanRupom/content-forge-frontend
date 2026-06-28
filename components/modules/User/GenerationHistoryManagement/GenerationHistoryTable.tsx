"use client"

import DataTable from "@/components/shared/table/DataTable"
import { PaginationMeta } from "@/types/api.types"
import { IGenerationJobPayload } from "@/types/generation.types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import DeleteGenerationDialog from "./DeleteGenerationDialog"
import { useRowActionModalState } from "@/hooks/useRowActionModalState"
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable"
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wand2 } from "lucide-react"
import { getAllGenerations } from "@/services/generation.service"
import { generationTableColumns } from "./GenerationHistoryColumns"

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

const GenerationsHistoryTable = ({ initialQueryString }: { initialQueryString: string }) => {
    const searchParams = useSearchParams()

    // Fully typed hooks capturing the structural configuration state of the row selection matrix
    const {
        deletingItem,
        isDeleteDialogOpen,
        onDeleteOpenChange,
        tableActions,
    } = useRowActionModalState<IGenerationJobPayload>({
        enableView:false,
        enableEdit:false,
        enableDelete:false
    })

    const {
        queryStringFromUrl,
        optimisticSortingState,
        optimisticPaginationState,
        isRouteRefreshPending,
        handleSortingChange,
        handlePaginationChange,
        updateParams,
    } = useServerManagedDataTable({
        searchParams,
        defaultPage: DEFAULT_PAGE,
        defaultLimit: DEFAULT_LIMIT,
        
    })

    const queryString = queryStringFromUrl || initialQueryString

    const {
        searchTermFromUrl,
        handleDebouncedSearchChange,
    } = useServerManagedDataTableSearch({
        searchParams,
        updateParams,
    
    })

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["generations-history", queryString],
        queryFn: () => getAllGenerations(queryString),
    })

    const records = data?.success ? data?.data : []
    const meta: PaginationMeta | undefined = data?.success ? data?.meta : undefined

    return (
        <>
            <div className="space-y-4">
                {/* Upper Engine Bar Controller */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 max-w-sm" />

                    <Link href="/dashboard/generate">
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-8 px-3.5 font-bold rounded-sm shadow-sm transition-all cursor-pointer">
                            <Wand2 className="mr-2 h-3.5 w-3.5" />
                            Launch AI Studio
                        </Button>
                    </Link>
                </div>

                <DataTable
                    data={records}
                    columns={generationTableColumns}
                    isLoading={isLoading || isFetching || isRouteRefreshPending}
                    emptyMessage="No historical AI generations logged on this footprint profile."
                    sorting={{
                        state: optimisticSortingState,
                        onSortingChange: handleSortingChange,
                    }}
                    pagination={{
                        state: optimisticPaginationState,
                        onPaginationChange: handlePaginationChange,
                    }}
                    search={{
                        initialValue: searchTermFromUrl,
                        placeholder: "Search generations by prompt topic context...",
                        debounceMs: 700,
                        onDebouncedChange: handleDebouncedSearchChange,
                    }}
                    meta={meta}
                    // actions={tableActions}
                />
            </div>

            {/* Mount the dedicated Generation deletion alert dialog layout structure */}
            <DeleteGenerationDialog
                open={isDeleteDialogOpen}
                onOpenChange={onDeleteOpenChange}
                generation={deletingItem}
            />
        </>
    )
}

export default GenerationsHistoryTable