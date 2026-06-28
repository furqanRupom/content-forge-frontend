"use client"


import { DeleteTemplateAction } from "@/app/(dashboard)/manager/dashboard/manage-templates/_action"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ITemplate } from "@/types/template.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    template: ITemplate | null
}

const getTemplateLabel = (template: ITemplate | null) => {
    if (!template) return "this template"
    return `"${template.title}" (${template.key})`
}

export default function DeleteTemplateDialog({
    open,
    onOpenChange,
    template,
}: Props) {
    const queryClient = useQueryClient()
    const router = useRouter()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: deleteTemplateAction,
    })

    async function deleteTemplateAction(id: string) {
        const res = await DeleteTemplateAction(id)
        if (!res.success) {
            throw new Error(res.message || "Failed execution query path")
        }
        return res
    }

    const handleDelete = async () => {
        if (!template) {
            toast.error("Template profile context payload not mapped")
            return
        }

        try {
            await mutateAsync(template.id)

            toast.success("Template schema variant purged from records")
            onOpenChange(false)

            await queryClient.invalidateQueries({ queryKey: ["templates"] })
            router.refresh()
        } catch (err: any) {
            toast.error(err?.message || "Something went wrong during deletion execution steps")
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Purge Engine Template Configuration Mapping?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you completely sure you want to permanently delete {getTemplateLabel(template)}?
                        Any current background processes relying on this unique context pattern might fall back to error metrics.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Abort Step
                    </AlertDialogCancel>

                    <AlertDialogAction
                        variant="destructive"
                        disabled={isPending}
                        onClick={(e: any) => {
                            e.preventDefault()
                            void handleDelete()
                        }}
                    >
                        {isPending ? "Purging Record Matrix..." : "Confirm Purge"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}