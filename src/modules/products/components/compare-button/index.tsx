"use client"

/**
 * CompareButton
 *
 * Reusable compare trigger that can be attached to:
 *   - Product cards (ProductPreview)
 *   - PDP gallery overlay
 *   - Any product surface
 *
 * Accepts a `CompareItem` shape so the caller controls what data gets
 * passed into the compare store. This keeps the button decoupled from
 * any specific data-fetching layer.
 */

import { useCompare, CompareItem, MAX_COMPARE_ITEMS } from "@lib/compare"

type CompareButtonProps = {
    item: CompareItem
    /** Visual variant — icon only (for overlays) or with label  */
    variant?: "icon" | "label"
    className?: string
}

export default function CompareButton({
    item,
    variant = "label",
    className = "",
}: CompareButtonProps) {
    const { addItem, removeItem, isInCompare, items, openModal } = useCompare()

    const inCompare = isInCompare(item.id)
    const isFull = items.length >= MAX_COMPARE_ITEMS && !inCompare

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (inCompare) {
            removeItem(item.id)
        } else if (!isFull) {
            addItem(item)
            // Auto-open modal when 2+ items are selected
            if (items.length >= 1) {
                openModal()
            }
        }
    }

    if (variant === "icon") {
        return (
            <button
                onClick={handleClick}
                disabled={isFull}
                title={
                    inCompare
                        ? "Remove from compare"
                        : isFull
                            ? `Maximum ${MAX_COMPARE_ITEMS} products`
                            : "Add to compare"
                }
                className={[
                    "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200",
                    inCompare
                        ? "bg-black text-white"
                        : "bg-white/90 text-gray-700 hover:bg-white hover:text-black border border-white/20",
                    isFull && !inCompare ? "opacity-40 cursor-not-allowed" : "",
                    className,
                ].join(" ")}
            >
                {/* Scale/compare icon */}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l9-3 9 3M3 6v12l9 3 9-3V6M3 6l9 3 9-3" />
                </svg>
            </button>
        )
    }

    return (
        <button
            onClick={handleClick}
            disabled={isFull}
            className={[
                "flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-colors",
                inCompare
                    ? "text-black"
                    : "text-gray-400 hover:text-black",
                isFull && !inCompare ? "opacity-40 cursor-not-allowed" : "",
                className,
            ].join(" ")}
        >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l9-3 9 3M3 6v12l9 3 9-3V6M3 6l9 3 9-3" />
            </svg>
            {inCompare ? "In Compare" : isFull ? "Compare Full" : "Compare"}
        </button>
    )
}
