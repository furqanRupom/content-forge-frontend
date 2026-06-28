"use client"


import AppField from "@/components/shared/form/AppField"
import AppSubmitButton from "@/components/shared/form/AppSubmitButton"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ITemplate } from "@/types/template.types"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { toast } from "sonner"
import { UpdateTemplateAction } from "@/app/(dashboard)/manager/dashboard/manage-templates/_action"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    template: ITemplate | null
}

const getInitialValues = (template: ITemplate | null) => ({
    title: template?.title ?? "",
    description: template?.description ?? "",
    category: template?.category ?? "",
    promptHint: template?.promptHint ?? "",
    isActive: template?.isActive ?? true,
})

export default function EditTemplatesModal({
    open,
    onOpenChange,
    template,
}: Props) {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: any }) =>
            UpdateTemplateAction(id, payload),
    })

    const form = useForm({
        defaultValues: getInitialValues(template),
        onSubmit: async ({ value }) => {
            if (!template) {
                toast.error("Template profile identification failed")
                return
            }

            const res = await mutateAsync({
                id: template.id,
                payload: value,
            })

            if (!res.success) {
                toast.error(res.message || "Template modification failed")
                return
            }

            toast.success("Template matrix updated successfully")
            onOpenChange(false)

            await queryClient.invalidateQueries({ queryKey: ["templates", "template-details"] })
        },
    })

    useEffect(() => {
        if (open) {
            form.reset(getInitialValues(template))
        }
    }, [template, open, form])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] max-w-4xl min-w-4xl overflow-hidden p-0">
                <DialogHeader className="border-b px-6 py-5">
                    <DialogTitle>Modify Blueprint Template</DialogTitle>
                    <DialogDescription>
                        Update engine context schemas and operational attributes.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[calc(90vh-5rem)]">
                    <div className="px-6 py-5">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                form.handleSubmit()
                            }}
                            className="space-y-5"
                        >
                            {/* Title */}
                            <form.Field name="title">
                                {(field) => <AppField field={field} label="Template Title" />}
                            </form.Field>

                            {/* Description */}
                            <form.Field name="description">
                                {(field) => <AppField field={field} label="Display Description" />}
                            </form.Field>

                            {/* Category */}
                            <form.Field name="category">
                                {(field) => <AppField field={field} label="Group Category" />}
                            </form.Field>

                            {/* Prompt Hint */}
                            <form.Field name="promptHint">
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label="System Input Dynamic Prompt Hint"
                                    />
                                )}
                            </form.Field>

                            {/* Active Toggle Switch Status */}
                            <form.Field name="isActive">
                                {(field) => (
                                    <div className="flex items-center space-x-3 rounded-md border p-4 shadow-sm">
                                        <Switch
                                            id="isActiveToggle"
                                            checked={field.state.value}
                                            onCheckedChange={(checked) => field.setValue(checked)}
                                        />
                                        <div className="space-y-0.5">
                                            <Label htmlFor="isActiveToggle" className="text-sm font-medium cursor-pointer">
                                                Active Structural Visibility
                                            </Label>
                                            <p className="text-xs text-muted-foreground">
                                                Toggling visibility handles search index mapping display limits across client dashboards.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </form.Field>

                            {/* Form Action Blocks */}
                            <div className="flex justify-end gap-3 border-t pt-4">
                                <DialogClose asChild>
                                    <Button variant="outline" type="button">Cancel</Button>
                                </DialogClose>

                                <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
                                    {([canSubmit, isSubmitting]) => (
                                        <AppSubmitButton
                                            isPending={isSubmitting || isPending}
                                            disabled={!canSubmit}
                                        >
                                            Save Configurations
                                        </AppSubmitButton>
                                    )}
                                </form.Subscribe>
                            </div>
                        </form>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}