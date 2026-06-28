"use client"

import { AddNewTemplateAction } from "@/app/(dashboard)/manager/dashboard/add-template/_action"
import AppField from "@/components/shared/form/AppField"
import AppSubmitButton from "@/components/shared/form/AppSubmitButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Extracted from your provided enum context for form mapping option structures
const TEMPLATE_TYPES = [
    // Social Media
    "LINKEDIN_POST", "X_POST", "TWITTER_THREAD", "FACEBOOK_POST", "INSTAGRAM_CAPTION", "TIKTOK_CAPTION", "YOUTUBE_DESCRIPTION", "REDDIT_POST", "PINTEREST_DESCRIPTION",
    // Blogging
    "BLOG_DRAFT", "BLOG_OUTLINE", "BLOG_INTRODUCTION", "BLOG_CONCLUSION", "ARTICLE", "NEWSLETTER", "GUEST_POST",
    // SEO
    "SEO_ARTICLE", "META_TITLE", "META_DESCRIPTION", "FAQ", "KEYWORD_CLUSTER", "SEO_BRIEF",
    // Marketing
    "LANDING_PAGE", "AD_COPY", "SALES_COPY", "MARKETING_COPY", "PROMOTIONAL_CONTENT", "CALL_TO_ACTION", "BRAND_STORY",
    // Sales
    "SALES_EMAIL", "COLD_EMAIL", "FOLLOW_UP_EMAIL", "SALES_SCRIPT", "PRODUCT_PITCH",
    // Email
    "EMAIL", "EMAIL_SEQUENCE", "EMAIL_SUBJECT", "WELCOME_EMAIL", "ANNOUNCEMENT_EMAIL",
    // Business
    "BUSINESS_PROPOSAL", "BUSINESS_PLAN", "CASE_STUDY", "EXECUTIVE_SUMMARY", "MEETING_SUMMARY", "REPORT", "PRESS_RELEASE",
    // Documentation
    "DOCUMENTATION", "API_DOCUMENTATION", "README", "CHANGELOG", "RELEASE_NOTES", "USER_GUIDE",
    // Development
    "CODE_EXPLANATION", "CODE_REVIEW", "CODE_GENERATION", "DEBUGGING", "COMMIT_MESSAGE", "PULL_REQUEST_DESCRIPTION", "BUG_REPORT", "TECHNICAL_SPECIFICATION",
    // Education
    "STUDY_NOTES", "LESSON_PLAN", "QUIZ", "FLASHCARDS", "EXPLANATION", "TUTORIAL",
    // Creative
    "STORY", "SHORT_STORY", "POEM", "SCRIPT", "CHARACTER_DESCRIPTION", "BOOK_OUTLINE",
    // Productivity
    "SUMMARY", "ACTION_ITEMS", "CHECKLIST", "TODO_LIST", "BRAINSTORM", "IDEA_GENERATION",
    // E-commerce
    "PRODUCT_DESCRIPTION", "AMAZON_LISTING", "SHOPIFY_DESCRIPTION", "CATEGORY_DESCRIPTION",
    // Customer Support
    "SUPPORT_REPLY", "KNOWLEDGE_BASE", "HELP_CENTER_ARTICLE", "CHAT_RESPONSE",
    // Research
    "RESEARCH_SUMMARY", "LITERATURE_REVIEW", "WHITEPAPER"
] as const;

export default function AddNewTemplateForm() {
    const router = useRouter()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: AddNewTemplateAction,
    })

    const form = useForm({
        defaultValues: {
            key: "",
            title: "",
            description: "",
            type: "",
            category: "",
            promptHint: "",
            isActive: true,
        },
        onSubmit: async ({ value }) => {
            try {
                const res = await mutateAsync({
                    ...value,
                    // Fallback parsing just in case optional strings hold empty whitespace strings
                    promptHint: value.promptHint.trim() || undefined,
                })

                if (!res.success) {
                    toast.error(res.message || "Failed to create blueprint template.")
                    return
                }

                toast.success("New structural template onboarded successfully")
                router.push("/admin/dashboard/templates-management")
                router.refresh()
            } catch (error) {
                toast.error("An unexpected execution block error occurred.")
            }
        },
    })

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Create Blueprint Variant</CardTitle>
                <CardDescription>
                    Onboard new template prompt generation rules down to client-side orchestration arrays.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                    className="space-y-5"
                >
                    {/* Unique Key Identifier */}
                    <form.Field name="key">
                        {(field) => (
                            <AppField
                                field={field}
                                label="Unique Template Key Identifier"
                                placeholder="e.g., dev-git-commit-optimizer"
                            />
                        )}
                    </form.Field>

                    {/* Title */}
                    <form.Field name="title">
                        {(field) => (
                            <AppField
                                field={field}
                                label="Template Display Title"
                                placeholder="e.g., Conventional Git Commit Builder"
                            />
                        )}
                    </form.Field>

                    {/* Description */}
                    <form.Field name="description">
                        {(field) => (
                            <AppField
                                field={field}
                                label="System Layout Description"
                                placeholder="Describe what core parsing problem this template blueprint solves..."
                            />
                        )}
                    </form.Field>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Category */}
                        <form.Field name="category">
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Display Group Category"
                                    placeholder="e.g., Development, SEO, Marketing"
                                />
                            )}
                        </form.Field>

                        {/* Enum Engine Type Selection */}
                        <form.Field name="type">
                            {(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name} className="text-sm font-medium">
                                        Engine Runtime Enum Type
                                    </Label>
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.setValue(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="" disabled>Select active type target...</option>
                                        {TEMPLATE_TYPES.map((type) => (
                                            <option key={type} value={type}>
                                                {type.replace(/_/g, " ")}
                                            </option>
                                        ))}
                                    </select>
                                    {field.state.meta.errors && (
                                        <p className="text-xs text-destructive">{field.state.meta.errors.join(", ")}</p>
                                    )}
                                </div>
                            )}
                        </form.Field>
                    </div>

                    {/* Prompt Hint Text Input Layout */}
                    <form.Field name="promptHint">
                        {(field) => (
                            <AppField
                                field={field}
                                label="Prompt Blueprint Instructions (Optional)"
                                placeholder="Provide helper placeholders or guidelines to assist the prompt engine generation configuration matrix..."
                            />
                        )}
                    </form.Field>

                    {/* Active Lifecycle Toggle Status */}
                    <form.Field name="isActive">
                        {(field) => (
                            <div className="flex items-center space-x-3 rounded-md border p-4 shadow-sm bg-zinc-50/50 dark:bg-zinc-900/50">
                                <Switch
                                    id="isActive"
                                    checked={field.state.value}
                                    onCheckedChange={(checked) => field.setValue(checked)}
                                />
                                <div className="space-y-0.5">
                                    <Label htmlFor="isActive" className="text-sm font-medium cursor-pointer">
                                        Immediate Operational Indexing
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        Determines if this layout profile is queryable across template indexing tables on save.
                                    </p>
                                </div>
                            </div>
                        )}
                    </form.Field>

                    {/* Action Trigger Controls */}
                    <div className="flex items-center justify-end gap-3 border-t pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>

                        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
                            {([canSubmit, isSubmitting]) => (
                                <AppSubmitButton
                                    isPending={isSubmitting || isPending}
                                    disabled={!canSubmit}
                                >
                                    Onboard Template
                                </AppSubmitButton>
                            )}
                        </form.Subscribe>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}