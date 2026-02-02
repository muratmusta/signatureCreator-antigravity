import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg"
    text?: string
}

const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
}

export function LoadingSpinner({
    size = "md",
    text,
    className,
    ...props
}: LoadingSpinnerProps) {
    return (
        <div
            className={cn("flex flex-col items-center justify-center gap-3", className)}
            {...props}
        >
            <Loader2 className={cn("animate-spin text-muted-foreground", sizeClasses[size])} />
            {text && <p className="text-sm text-muted-foreground">{text}</p>}
        </div>
    )
}
