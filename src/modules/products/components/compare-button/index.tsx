"use client"

/**
 * CompareButton
 *
 * Reusable compare trigger for PDP gallery overlays, product cards, etc.
 *
 * Interaction flow:
 *   Adding 1st item → add to store + show temporary guidance bubble ("Избери втори продукт")
 *   Adding 2nd+ item → add to store + open compare overlay immediately
 *   Removing       → remove from store; if modal was open it stays open
 *   Full (4 items) → button is disabled unless this item is already in compare
 *
 * The bubble is absolutely positioned inside a relative wrapper so it
 * never shifts layout or increases page scroll.
 */

import { useState, useCallback, useEffect, useRef } from "react"
import { useCompare, CompareItem, MAX_COMPARE_ITEMS } from "@lib/compare"

type CompareButtonProps = {
    item: CompareItem
    /** Visual variant — icon only (for overlays) or with label */
    variant?: "icon" | "label"
    className?: string
}

const GUIDANCE_DURATION_MS = 1500

export default function CompareButton({
    item,
    variant = "label",
    className = "",
}: CompareButtonProps) {
    const { addItem, removeItem, isInCompare, items, openModal } = useCompare()

    const inCompare = isInCompare(item.id)
    const isFull = items.length >= MAX_COMPARE_ITEMS && !inCompare

    // Temporary guidance bubble — shown only after the FIRST item is added
    const [showGuidance, setShowGuidance] = useState(false)
    const guidanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    // Clear timer on unmount to prevent setState on unmounted component
    useEffect(() => {
        return () => {
            if (guidanceTimer.current) clearTimeout(guidanceTimer.current)
        }
    }, [])

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()

            if (inCompare) {
                removeItem(item.id)
                return
            }

            if (isFull) return

            // Snapshot current count BEFORE adding — determines which branch to take
            const countBeforeAdd = items.length
            addItem(item)

            if (countBeforeAdd === 0) {
                // This was the first item — show guidance bubble, do NOT open modal
                setShowGuidance(true)
                if (guidanceTimer.current) clearTimeout(guidanceTimer.current)
                guidanceTimer.current = setTimeout(() => {
                    setShowGuidance(false)
                }, GUIDANCE_DURATION_MS)
            } else {
                // Second item or more — open modal immediately
                openModal()
            }
        },
        [inCompare, isFull, items.length, item, addItem, removeItem, openModal]
    )

    const compareIcon = (
        <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l9-3 9 3M3 6v12l9 3 9-3V6M3 6l9 3 9-3" />
        </svg>
    )

    // ---------------------------------------------------------------------------
    // Guidance bubble — floats above/beside the button, never shifts layout
    // ---------------------------------------------------------------------------
    const guidanceBubble = showGuidance && (
        <div
            aria-live="polite"
            className={[
                // Position: above the button in icon variant, to the right in label variant
                variant === "icon"
                    ? "absolute bottom-full right-0 mb-2"
                    : "absolute left-full top-1/2 -translate-y-1/2 ml-2",
                "z-10 whitespace-nowrap pointer-events-none",
                "bg-[#1a1a1a] text-white text-[11px] font-bold uppercase tracking-wider",
                "px-3 py-1.5 rounded-full shadow-lg",
                "animate-fade-in",
            ].join(" ")}
        >
            Избери втори продукт
            {/* Small arrow pointing down (icon variant) or left (label variant) */}
            <span
                className={[
                    "absolute border-4 border-transparent border-t-[#1a1a1a]",
                    variant === "icon"
                        ? "top-full right-3"
                        : "right-full top-1/2 -translate-y-1/2 border-t-transparent border-r-[#1a1a1a]",
                ].join(" ")}
            />
        </div>
    )

    // ---------------------------------------------------------------------------
    // Icon variant
    // ---------------------------------------------------------------------------
    if (variant === "icon") {
        return (
            <div className="relative">
                {guidanceBubble}
                <button
                    onClick={handleClick}
                    disabled={isFull}
                    title={
                        inCompare
                            ? "Премахни от сравнение"
                            : isFull
                                ? `Максимум ${MAX_COMPARE_ITEMS} продукта`
                                : "Добави за сравнение"
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
                    {compareIcon}
                </button>
            </div>
        )
    }

    // ---------------------------------------------------------------------------
    // Label variant
    // ---------------------------------------------------------------------------
    return (
        <div className="relative inline-flex">
            {guidanceBubble}
            <button
                onClick={handleClick}
                disabled={isFull}
                className={[
                    "flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-colors",
                    inCompare ? "text-black" : "text-gray-400 hover:text-black",
                    isFull && !inCompare ? "opacity-40 cursor-not-allowed" : "",
                    className,
                ].join(" ")}
            >
                {compareIcon}
                {inCompare ? "В сравнение" : isFull ? "Сравнението е пълно" : "Сравни"}
            </button>
        </div>
    )
}
