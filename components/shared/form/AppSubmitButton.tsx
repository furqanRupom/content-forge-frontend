"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

type AppSubmitButtonProps = {
    isPending: boolean;
    children: React.ReactNode;
    pendingLabel?: string;
    className?: string;
    disabled?: boolean;
};

const AppSubmitButton = ({
    isPending,
    children,
    pendingLabel = "Submitting...",
    className,
    disabled = false,
}: AppSubmitButtonProps) => {
    const isDisabled = disabled || isPending;

    return (
        <Button
            type="submit"
            disabled={isDisabled}
            className={cn(
                "w-full h-9 rounded-sm text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-60 cursor-pointer select-none",
                className
            )}
        >
            {isPending ? (
                <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" aria-hidden="true" />
                    <span>{pendingLabel || children}</span>
                </>
            ) : (
                children
            )}
        </Button>
    );
};

export default AppSubmitButton;