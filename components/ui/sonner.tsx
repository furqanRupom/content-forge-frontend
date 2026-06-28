"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4 text-[oklch(0.65_0.20_145)]" /> // Contextual dark-mode friendly semantic balance
        ),
        info: (
          <InfoIcon className="size-4 text-primary" /> // Unifies info notifications with your core theme tone
        ),
        warning: (
          <TriangleAlertIcon className="size-4 text-[oklch(0.78_0.16_85)]" />
        ),
        error: (
          <OctagonXIcon className="size-4 text-destructive" /> // Maps natively to your design token's error target
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin text-primary" />
        ),
      }}
      toastOptions={{
        classNames: {
          toast: "group-[.toaster]:bg-card group-[.toaster]:text-card-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-[var(--radius)]",
          description: "group-[.toast]:text-muted-foreground font-sans text-xs",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toast]:border-[oklch(0.65_0.20_145)]/30 group-[.toast]:bg-[oklch(0.65_0.20_145)]/[0.04]",
          error: "group-[.toast]:border-destructive/30 group-[.toast]:bg-destructive/[0.04]",
          warning: "group-[.toast]:border-[oklch(0.78_0.16_85)]/30 group-[.toast]:bg-[oklch(0.78_0.16_85)]/[0.04]",
          info: "group-[.toast]:border-primary/30 group-[.toast]:bg-primary/[0.04]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }