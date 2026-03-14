"use client"

/**
 * Compare System – Centralized Client-Side State
 *
 * Guest-friendly: no authentication required.
 * Wraps the entire app via <CompareProvider> placed in the root layout.
 *
 * Data Shape:
 *   CompareItem mirrors real Medusa product data with a reserved
 *   `globalRating` field that is intentionally null today and will be
 *   connected to an external rating provider in the future.
 */

import React, {
    createContext,
    useCallback,
    useContext,
    useState,
    ReactNode,
} from "react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * A single item in the compare list.
 * `globalRating` is intentionally null — reserved for future integration
 * with a 3rd-party or community product rating system.
 */
export type CompareItem = {
    id: string
    handle: string
    title: string
    thumbnail: string | null
    /** Formatted display price, e.g. "€89.99" */
    price: string | null
    /** Raw numeric price for sorting (optional) */
    priceNumber: number | null
    /**
     * Site rating aggregated from MTVZ internal reviews.
     * null = not yet available / review system not yet connected.
     */
    siteRating: number | null
    /**
     * Global rating from external source.
     * RESERVED — always null until a global rating provider is integrated.
     */
    globalRating: null
    /**
     * Flexible key-value spec map.
     * Keys are human-readable labels (e.g. "Material", "Length", "Weight").
     * Values are nullable strings — missing specs render as "–".
     */
    comparableSpecs: Record<string, string | null>
}

type CompareContextValue = {
    items: CompareItem[]
    addItem: (item: CompareItem) => void
    removeItem: (id: string) => void
    isInCompare: (id: string) => boolean
    clearCompare: () => void
    isModalOpen: boolean
    openModal: () => void
    closeModal: () => void
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const CompareContext = createContext<CompareContextValue | null>(null)

const MAX_COMPARE_ITEMS = 4

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function CompareProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CompareItem[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const addItem = useCallback((item: CompareItem) => {
        setItems((prev) => {
            if (prev.find((i) => i.id === item.id)) return prev
            if (prev.length >= MAX_COMPARE_ITEMS) return prev
            return [...prev, item]
        })
    }, [])

    const removeItem = useCallback((id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id))
    }, [])

    const isInCompare = useCallback(
        (id: string) => items.some((i) => i.id === id),
        [items]
    )

    const clearCompare = useCallback(() => setItems([]), [])

    const openModal = useCallback(() => setIsModalOpen(true), [])
    const closeModal = useCallback(() => setIsModalOpen(false), [])

    return (
        <CompareContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                isInCompare,
                clearCompare,
                isModalOpen,
                openModal,
                closeModal,
            }}
        >
            {children}
        </CompareContext.Provider>
    )
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useCompare(): CompareContextValue {
    const ctx = useContext(CompareContext)
    if (!ctx) {
        throw new Error("useCompare must be used inside a <CompareProvider>")
    }
    return ctx
}

export { MAX_COMPARE_ITEMS }
