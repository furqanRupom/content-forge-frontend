// @/app/(dashboard)/dashboard/history/DeleteGenerationDialog.tsx
"use client"


import { DeleteGenerationAction } from "@/app/(dashboard)/dashboard/generate/_action"
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
import { IGenerationJobPayload } from "@/types/generation.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    generation: IGenerationJobPayload | null
}

export default function DeleteGenerationDialog({
    open,
    onOpenChange,
    generation,
}: Props) {
    const queryClient = useQueryClient()
    const router = useRouter()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (id: string) => {
            const res = await DeleteGenerationAction(id)
            if (!res.success) {
                throw new Error(res.message || "Failed execution query path")
            }
            return res
        },
    })

    const handleDelete = async () => {
        if (!generation) {
            toast.error("Generation payload context is missing")
            return
        }

        try {
            await mutateAsync(generation.id)
            toast.success("Generation record purged from history")
            onOpenChange(false)

            await queryClient.invalidateQueries({ queryKey: ["generations-history"] })
            router.refresh()
        } catch (err: any) {
            toast.error(err?.message || "Something went wrong during deletion execution steps")
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="border-border bg-background">
                <AlertDialogHeader>
                    <AlertDialogTitle>Purge Generation Record History Entry?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this generation metric entry?
                        This action cannot be undone and will clear this execution instance data output from your log sequence logs.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending} className="border-border">
                        Abort Step
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        disabled={isPending}
                        onClick={(e) => {
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