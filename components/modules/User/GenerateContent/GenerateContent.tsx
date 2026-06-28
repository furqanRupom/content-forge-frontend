"use client"

import { useEffect, useRef, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import Link from "next/link"
import {
    ArrowUp, Check, Copy, History, RefreshCw,
    Wand2, FileText, Cpu, Clock, Loader2, ChevronDown, Sparkles
} from "lucide-react"

// Shadcn Primitives (Ensure these are installed via npx shadcn@latest add dropdown-menu)
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { CreateGenerationAction, GetGenerationAction } from "@/app/(dashboard)/dashboard/generate/_action"
import { getAllTemplates } from "@/services/template.service"
import { IGenerationJobPayload, IGenerationSuccessPayload } from "@/types/generation.types"
import { ICreateGenerationPayload } from "@/zod/generation.validation"
import { ITemplate } from "@/types/template.types"

// ─── Constants ────────────────────────────────────────────────────────────────
const TONES = ["Professional", "Casual", "Formal", "Friendly", "Persuasive", "Playful", "Urgent", "Creative"]

const MODELS = [
    { value: "gemini-3.5-flash", label: "Flash — fast" },
]

type MsgRole = "user" | "assistant"

interface ConfigSnapshot {
    templateId: string
    templateTitle: string
    tone: string
    model: string
    prompt: string
}

interface ChatMessage {
    id: string
    role: MsgRole
    config?: ConfigSnapshot
    outputJob?: IGenerationSuccessPayload
    text?: string
    isTyping?: boolean
}

// ─── Typing Indicator ──────────────────────────────────────────────────────────
function TypingDots() {
    return (
        <span className="flex items-center gap-1 py-1">
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
                />
            ))}
        </span>
    )
}

// ─── Code / Text Yield Block Card ─────────────────────────────────────────────
function OutputCard({
    job,
    onRegenerate,
    isRegenerating,
}: {
    job: IGenerationSuccessPayload
    onRegenerate: () => void
    isRegenerating: boolean
}) {
    const [copied, setCopied] = useState(false)
    const text = job.generatedContent?.outputText ?? ""

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        toast.success("Copied to clipboard")
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDownload = () => {
        const blob = new Blob([text], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${(job.generatedContent?.title ?? "output").replace(/\s+/g, "-").toLowerCase()}.txt`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="mt-2 rounded-[var(--radius)] border border-border bg-card overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
                <div className="flex items-center gap-2">
                    <Wand2 className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs font-semibold text-foreground">
                        {job.generatedContent?.title ?? job.template?.title ?? "Generated Content"}
                    </span>
                    {job.generatedContent?.tone && (
                        <span className="text-[10px] px-2 py-0.5 rounded-[var(--radius)] bg-primary/10 text-primary font-medium border border-primary/20">
                            {job.generatedContent.tone}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={onRegenerate}
                        disabled={isRegenerating}
                        className="h-6 px-2 rounded-[var(--radius)] border border-border bg-transparent text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1 transition-colors disabled:opacity-40"
                    >
                        <RefreshCw className={`w-3 h-3 ${isRegenerating ? "animate-spin" : ""}`} />
                        {isRegenerating ? "Regenerating…" : "Regenerate"}
                    </button>
                    <button
                        onClick={handleDownload}
                        title="Download"
                        className="h-6 w-6 rounded-[var(--radius)] border border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-colors"
                    >
                        <FileText className="w-3 h-3" />
                    </button>
                    <button
                        onClick={handleCopy}
                        className={`h-6 px-2 rounded-[var(--radius)] border text-[11px] font-medium flex items-center gap-1 transition-all ${copied
                            ? "border-primary/30 bg-primary/10 text-primary"
                            : "border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                    >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? "Copied" : "Copy"}
                    </button>
                </div>
            </div>

            <div className="px-4 py-3">
                <pre className="text-[13px] leading-relaxed text-foreground whitespace-pre-wrap font-mono">
                    {text}
                </pre>
            </div>

            <div className="flex items-center gap-4 px-4 py-2 border-t border-border bg-muted/10">
                {(job.generatedContent?.wordCount ?? 0) > 0 && (
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <FileText className="w-3 h-3" />
                        {job.generatedContent!.wordCount} words
                    </span>
                )}
                {job.tokensUsed > 0 && (
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Cpu className="w-3 h-3" />
                        {job.tokensUsed.toLocaleString()} tokens
                    </span>
                )}
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {job.model}
                </span>
                <Link
                    href={`/dashboard/generate/${job.id}`}
                    className="ml-auto text-[10px] font-semibold text-primary hover:underline underline-offset-2"
                >
                    View Full Page →
                </Link>
            </div>
        </div>
    )
}

function ConfigBubble({ config }: { config: ConfigSnapshot }) {
    return (
        <div className="mt-2 rounded-[var(--radius)] border border-border bg-muted/20 px-3 py-2.5 text-xs space-y-1.5 w-full">
            <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-16 text-[10px] uppercase tracking-wider font-mono shrink-0">Template</span>
                <span className="px-2 py-0.5 rounded-[var(--radius)] bg-primary/10 text-primary border border-primary/20 text-[10px] font-medium">
                    {config.templateTitle}
                </span>
            </div>
            {config.tone && (
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-16 text-[10px] uppercase tracking-wider font-mono shrink-0">Tone</span>
                    <span className="px-2 py-0.5 rounded-[var(--radius)] bg-secondary text-secondary-foreground border border-border text-[10px] font-medium">
                        {config.tone}
                    </span>
                </div>
            )}
            <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-16 text-[10px] uppercase tracking-wider font-mono shrink-0">Model</span>
                <span className="text-foreground font-mono text-[10px]">{config.model}</span>
            </div>
        </div>
    )
}

// ─── Main Hub Content Component ────────────────────────────────────────────────
export default function GenerateContentPage() {
    const queryClient = useQueryClient()
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const [prompt, setPrompt] = useState("")
    const [templateId, setTemplateId] = useState("")
    const [tone, setTone] = useState("")
    const [model, setModel] = useState("gemini-1.5-flash")
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "greeting",
            role: "assistant",
            text: "Welcome to ContentForge. Choose a target metadata template mapping layout sequence configuration context to start.",
        },
    ])

    const [regeneratingId, setRegeneratingId] = useState<string | null>(null)

    // ── Fetch active templates ────────────────────────────────────────────────
    const { data: templatesRes, isLoading: templatesLoading } = useQuery({
        queryKey: ["templates", "active"],
        queryFn: async () => {
            const res = await getAllTemplates("isActive=true&limit=100")
            return res
        },
    })

    const templates: ITemplate[] = templatesRes?.data ?? []
    console.log(templates)
    const selectedTemplate = templates.find((t) => t.id === templateId)

    const createMutation = useMutation({
        mutationFn: (payload: ICreateGenerationPayload) => CreateGenerationAction(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["generations"] })
        },
    })

    const regenMutation = useMutation({
        mutationFn: async (jobId: string) => {
            const { reGenerate } = await import("@/services/generation.service")
            return reGenerate(jobId)
        },
        onSettled: () => setRegeneratingId(null),
    })

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSend = async () => {
        const trimmed = prompt.trim()
        if (!trimmed || createMutation.isPending) return

        if (!templateId) {
            toast.error("Please assign a layout template mapping first")
            return
        }

        const msgId = crypto.randomUUID()
        const config: ConfigSnapshot = {
            templateId,
            templateTitle: selectedTemplate?.title ?? "Template",
            tone,
            model,
            prompt: trimmed,
        }

        setMessages((prev) => [
            ...prev,
            { id: msgId + "-user", role: "user", config, text: trimmed },
            { id: msgId + "-typing", role: "assistant", isTyping: true },
        ])
        setPrompt("")
        if (textareaRef.current) textareaRef.current.style.height = "auto"

        const payload: ICreateGenerationPayload = {
            templateId,
            prompt: trimmed,
            model,
            metadata: { tone, language: "en", title: trimmed.slice(0, 60) },
        }

        const result = await createMutation.mutateAsync(payload)

        setMessages((prev) =>
            prev.map((m) =>
                m.id === msgId + "-typing"
                    ? result.success
                        ? { id: msgId + "-ai", role: "assistant", outputJob: result.data }
                        : { id: msgId + "-ai", role: "assistant", text: result.message ?? "Generation streaming pipeline error context encountered." }
                    : m
            )
        )
    }

    const handleRegenerate = async (msgId: string, jobId: string) => {
        setRegeneratingId(jobId)
        const result = await regenMutation.mutateAsync(jobId)

        if ((result as any)?.data) {
            const updated = await GetGenerationAction(jobId)
            if (updated.success) {
                setMessages((prev) =>
                    prev.map((m) =>
                        m.id === msgId ? { ...m, outputJob: updated.data as any } : m
                    )
                )
            }
        }
    }

    const isGenerating = createMutation.isPending || regenMutation.isPending

    // ── Global Loading State Boundary Interceptor ─────────────────────────────
    if (templatesLoading) {
        return (
            <div className="flex h-[calc(100vh-57px)] w-full flex-col items-center justify-center bg-background space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-xs font-mono text-muted-foreground animate-pulse">
                    Bootstrapping template schemas and orchestration parameters...
                </p>
            </div>
        )
    }

    return (
        <div className="flex h-[calc(100vh-57px)] flex-col overflow-hidden bg-background">

            {/* Topbar Layout */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-border bg-card/40 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-(--radius) bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Wand2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-foreground leading-tight">Content Pipeline Studio</p>
                        <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                            {isGenerating
                                ? "Streaming generation logs…"
                                : templateId
                                    ? `${selectedTemplate?.title}${tone ? ` // ${tone}` : ""}`
                                    : "Awaiting template structure binding allocation"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <Link
                        href="/dashboard/generate/history"
                        className="h-8 w-8 rounded-(--radius) border border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-colors"
                        title="Historical Execution Matrix"
                    >
                        <History className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>

            {/* Conversational Stream Section */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex gap-3 items-start ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[11px] font-mono font-semibold ${msg.role === "assistant"
                                ? "bg-primary/10 border border-primary/20 text-primary"
                                : "bg-muted border border-border text-muted-foreground"
                                }`}
                        >
                            {msg.role === "assistant" ? <Wand2 className="w-4 h-4" /> : "U"}
                        </div>

                        <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                            <div
                                className={`rounded-[var(--radius)] px-4 py-3 text-[13px] leading-relaxed border shadow-2xs ${msg.role === "assistant"
                                    ? "bg-card border-border text-foreground"
                                    : "bg-muted/40 border-border text-foreground"
                                    }`}
                            >
                                {msg.isTyping ? (
                                    <TypingDots />
                                ) : msg.role === "user" ? (
                                    <div className="w-full">
                                        <p className="font-sans whitespace-pre-wrap">{msg.text}</p>
                                        {msg.config && <ConfigBubble config={msg.config} />}
                                    </div>
                                ) : msg.outputJob ? (
                                    <div className="w-full">
                                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                                            <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                                            Execution Payload Results:
                                        </p>
                                        <OutputCard
                                            job={msg.outputJob}
                                            onRegenerate={() => handleRegenerate(msg.id, msg.outputJob!.id)}
                                            isRegenerating={regeneratingId === msg.outputJob.id}
                                        />
                                    </div>
                                ) : (
                                    <p className="font-sans whitespace-pre-wrap">{msg.text}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Contextual Composer Block */}
            <div className="border-t border-border bg-card/40 px-6 pt-4 pb-5 shrink-0">

                {/* Configuration Dropdowns Row */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">

                    {/* Template Shadcn Trigger */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className={`h-8 rounded-full text-[11px] font-mono border-border ${templateId ? 'border-primary/40 text-primary bg-primary/5 hover:bg-primary/10' : 'text-muted-foreground'}`}
                            >
                                {selectedTemplate ? selectedTemplate.title : "Template Block Selection"}
                                <ChevronDown className="ml-1 h-3 w-3 opacity-60" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="max-h-60 overflow-y-auto font-mono text-xs rounded-[var(--radius)] border-border bg-popover">
                            {templates.map((t) => (
                                <DropdownMenuItem key={t.id} onClick={() => setTemplateId(t.id)} className="cursor-pointer">
                                    {t.title}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Tone Shadcn Trigger */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className={`h-8 rounded-full text-[11px] font-mono border-border ${tone ? 'border-primary/40 text-primary bg-primary/5 hover:bg-primary/10' : 'text-muted-foreground'}`}
                            >
                                {tone || "Vocal Tone Dialect"}
                                <ChevronDown className="ml-1 h-3 w-3 opacity-60" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="font-mono text-xs rounded-[var(--radius)] border-border bg-popover">
                            {TONES.map((t) => (
                                <DropdownMenuItem key={t} onClick={() => setTone(t)} className="cursor-pointer">
                                    {t}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Model Shadcn Trigger */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 rounded-full text-[11px] font-mono border-border text-muted-foreground">
                                {MODELS.find(m => m.value === model)?.label || "Compute Engine Engine"}
                                <ChevronDown className="ml-1 h-3 w-3 opacity-60" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="font-mono text-xs rounded-[var(--radius)] border-border bg-popover">
                            {MODELS.map((m) => (
                                <DropdownMenuItem key={m.value} onClick={() => setModel(m.value)} className="cursor-pointer">
                                    {m.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Textarea Processing Entry */}
                <div className="flex items-end gap-2.5">
                    <textarea
                        ref={textareaRef}
                        value={prompt}
                        onChange={(e) => {
                            setPrompt(e.target.value)
                            e.target.style.height = "auto"
                            e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px"
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                handleSend()
                            }
                        }}
                        rows={1}
                        placeholder="Define optimization context prompt arguments here…"
                        disabled={isGenerating}
                        className="flex-1 resize-none rounded-[var(--radius)] border border-border bg-background px-4 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all leading-relaxed disabled:opacity-50 max-h-36 font-sans"
                    />
                    <Button
                        onClick={handleSend}
                        disabled={!prompt.trim() || isGenerating}
                        size="icon"
                        className="w-10 h-10 rounded-full bg-primary text-primary-foreground shrink-0 hover:opacity-90 disabled:opacity-30 transition-opacity"
                    >
                        {isGenerating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <ArrowUp className="w-4 h-4" />
                        )}
                    </Button>
                </div>
                <p className="text-[10px] text-muted-foreground text-center mt-2 font-mono">
                    [Enter] execute prompt stream · [Shift+Enter] insert break logic
                </p>
            </div>
        </div>
    )
}