"use client"

/**
 * WishlistButton
 *
 * Reusable wishlist toggle for PDP gallery overlays, product cards, etc.
 *
 * Auth branching:
 *   authenticated  → toggle inline + brief visual feedback
 *   unauthenticated → redirect to login tab with ?redirect= return path
 *
 * Auth resolution order (highest priority first):
 *   1. `isAuthenticated` prop — passed explicitly by a parent that has
 *      reliable server-side customer data (e.g. ProductGalleryActions)
 *   2. WishlistContext.isAuthenticated — global state from AppProviders,
 *      initialized from retrieveCustomer() in the layout
 *
 * This double-source approach prevents false negatives when the context
 * state is stale or the provider initialization was ambiguous.
 */

import { useState, useCallback } from "react"
import { useWishlist, WishlistItem } from "@lib/wishlist"
import { useParams, usePathname, useRouter } from "next/navigation"

type WishlistButtonProps = {
    item: WishlistItem
    variant?: "icon" | "label"
    className?: string
    /**
     * Optional override — if the parent has reliable server-fetched auth state,
     * pass it here. When provided, this takes precedence over context value.
     */
    isAuthenticated?: boolean
}

export default function WishlistButton({
    item,
    variant = "label",
    className = "",
    isAuthenticated: isAuthProp,
}: WishlistButtonProps) {
    const {
        isAuthenticated: isAuthContext,
        isInWishlist,
        addItem,
        removeItem,
    } = useWishlist()

    const router = useRouter()
    const pathname = usePathname()
    const { countryCode } = useParams() as { countryCode: string }

    // Prop wins over context — gives parents a reliable escape hatch
    const isAuthenticated = isAuthProp !== undefined ? isAuthProp : isAuthContext

    const inWishlist = isInWishlist(item.id)

    // Brief "just added" success flash — resets after 1.5 s
    const [justAdded, setJustAdded] = useState(false)

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()

            if (!isAuthenticated) {
                // Not logged in — send to the login tab with a return path
                router.push(
                    `/${countryCode}/account?redirect=${encodeURIComponent(pathname)}`
                )
                return
            }

            // Authenticated — toggle inline
            if (inWishlist) {
                removeItem(item.id)
            } else {
                addItem(item)
                // Flash success state
                setJustAdded(true)
                setTimeout(() => setJustAdded(false), 1500)
            }
        },
        [isAuthenticated, inWishlist, item, addItem, removeItem, router, countryCode, pathname]
    )

    const heartIcon = (filled: boolean) => (
        <svg
            className="w-4 h-4"
            fill={filled ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
        </svg>
    )

    // -------------------------------------------------------------------------
    // Icon variant (used on gallery overlay)
    // -------------------------------------------------------------------------
    if (variant === "icon") {
        return (
            <button
                onClick={handleClick}
                title={
                    !isAuthenticated
                        ? "Влезте в профила си, за да запазите"
                        : inWishlist
                            ? "Премахни от желани"
                            : "Запази в желани"
                }
                className={[
                    "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200",
                    inWishlist || justAdded
                        ? "bg-red-500 text-white scale-110"
                        : "bg-white/90 text-gray-700 hover:bg-white hover:text-red-500 border border-white/20",
                    className,
                ].join(" ")}
            >
                {heartIcon(inWishlist || justAdded)}
            </button>
        )
    }

    // -------------------------------------------------------------------------
    // Label variant (used in buy box / cards)
    // -------------------------------------------------------------------------
    return (
        <button
            onClick={handleClick}
            className={[
                "flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-colors",
                inWishlist || justAdded
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500",
                className,
            ].join(" ")}
        >
            <span
                className={[
                    "shrink-0 transition-transform duration-150",
                    justAdded ? "scale-125" : "",
                ].join(" ")}
            >
                {heartIcon(inWishlist || justAdded)}
            </span>
            {!isAuthenticated
                ? "Запази"
                : justAdded
                    ? "Запазено ✓"
                    : inWishlist
                        ? "В желани"
                        : "Запази"}
        </button>
    )
}
