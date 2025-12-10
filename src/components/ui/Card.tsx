import * as React from "react"
import { cn } from "@/utils/cn"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }
>(({ className, hover = false, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-3xl border border-zinc-800 bg-zinc-900/50 text-zinc-100 shadow-sm backdrop-blur-xl transition-all duration-300",
            hover ? "hover:border-zinc-700 hover:bg-zinc-800/50 hover:shadow-lg hover:-translate-y-1" : "",
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

export { Card }
