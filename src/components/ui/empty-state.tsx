import * as React from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode
    title: string
    description?: string
    action?: React.ReactNode
}

export function EmptyState({
    icon,
    title,
    description,
    action,
    className,
    ...props
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center text-center p-16 rounded-[48px] border-2 border-dashed border-gray-100 bg-white shadow-sm",
                className
            )}
            {...props}
        >
            {icon && (
                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[32px] bg-[#F9FAFB] text-gray-400 border border-gray-100 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(icon as React.ReactElement, { size: 40, strokeWidth: 1.5 })}
                </div>
            )}
            <h3 className="text-2xl font-black tracking-tight text-gray-900 mb-3 uppercase">{title}</h3>
            {description && (
                <p className="text-sm font-medium text-gray-400 max-w-[280px] mb-10 leading-relaxed">
                    {description}
                </p>
            )}
            {action && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                    {action}
                </div>
            )}
        </div>
    )
}
