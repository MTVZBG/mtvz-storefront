"use client"

/**
 * Wishlist System – Auth-gated Client-Side State
 *
 * Wishlist belongs to authenticated users only.
 * - If the user is not logged in, actions redirect to the auth flow.
 * - State is local/transient today; a clear integration boundary
 *   is maintained for future Medusa customer metadata persistence.
 *
 * Future integration path:
 *   When Medusa supports custom customer attributes or a wishlist plugin,
 *   the `addItem` / `removeItem` handlers in this provider can be extended
 *   to call the Medusa API. The hook consumers (WishlistButton, etc.)
 *   will not need to change their interface.
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

export type WishlistItem = {
    id: string
    handle: string
    title: string
    thumbnail: string | null
    /** Formatted display price */
    price: string | null
}

type WishlistContextValue = {
    items: WishlistItem[]
    /** Returns true if the current session has an authenticated customer */
    isAuthenticated: boolean
    /** Call this from the provider with the real customer value */
    setAuthenticated: (value: boolean) => void
    addItem: (item: WishlistItem) => void
    removeItem: (id: string) => void
    isInWishlist: (id: string) => boolean
    clearWishlist: () => void
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const WishlistContext = createContext<WishlistContextValue | null>(null)

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function WishlistProvider({
    children,
    initialAuthenticated = false,
}: {
    children: ReactNode
    /** Pass `!!customer` from the server component that wraps this provider */
    initialAuthenticated?: boolean
}) {
    const [items, setItems] = useState<WishlistItem[]>([])
    const [isAuthenticated, setAuthState] = useState(initialAuthenticated)

    const setAuthenticated = useCallback((value: boolean) => {
        setAuthState(value)
        if (!value) {
            // Clear wishlist on logout to avoid cross-session data leaking
            setItems([])
        }
    }, [])

    const addItem = useCallback((item: WishlistItem) => {
        setItems((prev) => {
            if (prev.find((i) => i.id === item.id)) return prev
            return [...prev, item]
        })
        // FUTURE: await medusaClient.customers.update({ metadata: { wishlist: [...] } })
    }, [])

    const removeItem = useCallback((id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id))
        // FUTURE: sync removal to Medusa customer metadata
    }, [])

    const isInWishlist = useCallback(
        (id: string) => items.some((i) => i.id === id),
        [items]
    )

    const clearWishlist = useCallback(() => setItems([]), [])

    return (
        <WishlistContext.Provider
            value={{
                items,
                isAuthenticated,
                setAuthenticated,
                addItem,
                removeItem,
                isInWishlist,
                clearWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    )
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useWishlist(): WishlistContextValue {
    const ctx = useContext(WishlistContext)
    if (!ctx) {
        throw new Error("useWishlist must be used inside a <WishlistProvider>")
    }
    return ctx
}
