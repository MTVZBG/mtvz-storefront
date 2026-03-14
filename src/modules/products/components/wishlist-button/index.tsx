"use client"

/**
 * WishlistButton
 *
 * Reusable wishlist toggle that can be attached to:
 *   - Product cards (ProductPreview)
 *   - PDP gallery overlay
 *   - Any product surface
 *
 * Authentication behavior:
 *   - If not authenticated → redirect to /account login flow
 *   - If authenticated     → toggle item in wishlist store
 *
 * The redirect preserves the current page path as `?redirect`
 * so the login page can bounce back after successful authentication.
 */

import { useWishlist, WishlistItem } from "@lib/wishlist"
import { useParams, usePathname, useRouter } from "next/navigation"

type WishlistButtonProps = {
    item: WishlistItem
    variant?: "icon" | "label"
    className?: string
}

export default function WishlistButton({
    item,
    variant = "label",
    className = "",
}: WishlistButtonProps) {
    const { isAuthenticated, isInWishlist, addItem, removeItem } = useWishlist()
    const router = useRouter()
    const pathname = usePathname()
    const { countryCode } = useParams() as { countryCode: string }

    const inWishlist = isInWishlist(item.id)

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isAuthenticated) {
            // Redirect to account/login with return path
            router.push(`/${countryCode}/account?redirect=${encodeURIComponent(pathname)}`)
            return
        }

        if (inWishlist) {
            removeItem(item.id)
        } else {
            addItem(item)
        }
    }

    if (variant === "icon") {
        return (
            <button
                onClick={handleClick}
                title={
                    !isAuthenticated
                        ? "Sign in to save to wishlist"
                        : inWishlist
                            ? "Remove from wishlist"
                            : "Save to wishlist"
                }
                className={[
                    "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200",
                    inWishlist
                        ? "bg-red-500 text-white"
                        : "bg-white/90 text-gray-700 hover:bg-white hover:text-red-500 border border-white/20",
                    className,
                ].join(" ")}
            >
                <svg
                    className="w-4 h-4"
                    fill={inWishlist ? "currentColor" : "none"}
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
            </button>
        )
    }

    return (
        <button
            onClick={handleClick}
            className={[
                "flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-colors",
                inWishlist
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500",
                className,
            ].join(" ")}
        >
            <svg
                className="w-4 h-4 shrink-0"
                fill={inWishlist ? "currentColor" : "none"}
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
            {!isAuthenticated
                ? "Save"
                : inWishlist
                    ? "Saved"
                    : "Wishlist"}
        </button>
    )
}
