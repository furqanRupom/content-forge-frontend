"use client"

import DataTable from "@/components/shared/table/DataTable"

import { getAllTemplates } from "@/services/template.service"
import { PaginationMeta } from "@/types/api.types"
import { ITemplate } from "@/types/template.types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { templateTableColumns } from "./TemplateTableColumns"
import EditTemplatesModal from "./EditTemplatesModal"
import DeleteTemplateDialog from "./DeleteTemplateDialog"
import ViewTemplatesDialog from "./ViewTemplatesDialog"
import { useRowActionModalState } from "@/hooks/useRowActionModalState"
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable"
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Plus } from "lucide-react"

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

const TemplatesTable = ({ initialQueryString }: { initialQueryString: string }) => {
    const searchParams = useSearchParams()

    const {
        viewingItem,
        editingItem,
        deletingItem,
        isViewDialogOpen,
        isEditModalOpen,
        isDeleteDialogOpen,
        onViewOpenChange,
        onEditOpenChange,
        onDeleteOpenChange,
        tableActions,
    } = useRowActionModalState<ITemplate>()

    const {
        queryStringFromUrl,
        optimisticSortingState,
        optimisticPaginationState,
        isRouteRefreshPending,
        updateParams,
        handleSortingChange,
        handlePaginationChange,
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
        queryKey: ["templates", queryString],
        queryFn: () => getAllTemplates(queryString),
    })

    const templates = data?.success ? data?.data : []
    const meta: PaginationMeta | undefined = data?.success ? data?.meta : undefined

    return (
        <>
            <div className="space-y-4">
                {/* Top Control Bar holding global table action options */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 max-w-sm">
                
                    </div>

                    <Link
                        href="/manager/dashboard/add-template"
                        className=""
                    >
                  
                        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-8 px-3.5 font-bold rounded-sm shadow-sm transition-all cursor-pointer">
                            <Plus className="mr-2 h-4 w-4" />
                           Add Template
                        </Button>
                    </Link>
                </div>
            <DataTable
                data={templates}
                columns={templateTableColumns}
                isLoading={isLoading || isFetching || isRouteRefreshPending}
                emptyMessage="No templates found."
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
                    placeholder: "Search templates by title, key or category...",
                    debounceMs: 700,
                    onDebouncedChange: handleDebouncedSearchChange,
                }}
                meta={meta}
                actions={tableActions}
            />
            </div>

            <EditTemplatesModal
                open={isEditModalOpen}
                onOpenChange={onEditOpenChange}
                template={editingItem}
            />

            <DeleteTemplateDialog
                open={isDeleteDialogOpen}
                onOpenChange={onDeleteOpenChange}
                template={deletingItem}
            />

            <ViewTemplatesDialog
                open={isViewDialogOpen}
                onOpenChange={onViewOpenChange}
                templateId={viewingItem?.id ?? null}
            />
        </>
    )
}

export default TemplatesTable