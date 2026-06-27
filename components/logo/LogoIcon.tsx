"use client";

import { Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    iconClassName?: string;
    textClassName?: string;
    href?: string;
    showText?: boolean;
}

export default function Logo({
    className,
    iconClassName,
    textClassName,
    href = "/",
    showText = true,
}: LogoProps) {
    return (
        <Link
            href={href}
            className={cn("flex items-center gap-2 tracking-tight group select-none", className)}
        >
            {/* Dynamic Icon Container Wrapper */}
            <div className={cn(
                "relative w-7 h-7 rounded-sm flex items-center justify-center bg-primary text-primary-foreground shadow-sm transition-shadow duration-200 group-hover:shadow-md",
                iconClassName
            )}>
                <Zap
                    className="w-3.5 h-3.5 fill-current transition-transform duration-200 group-hover:scale-110"
                    strokeWidth={2}
                />
            </div>

            {/* Conditional Platform Text Component */}
            {showText && (
                <span className={cn(
                    "font-sans font-bold text-base text-foreground tracking-tight transition-colors duration-150",
                    textClassName
                )}>
                    Content <span className="text-primary transition-opacity duration-150 group-hover:opacity-90 uppercase">Forge</span>
                    <span className="text-[10px] font-bold ml-0.5 text-muted-foreground/80 uppercase">AI</span>
                </span>
            )}
        </Link>
    );
}