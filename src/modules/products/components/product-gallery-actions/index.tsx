"use client"

/**
 * ProductGalleryActions
 *
 * Renders the Wishlist + Compare action buttons as an overlay on the
 * product gallery (top-right corner, visible on hover / always on mobile).
 *
 * Receives pre-mapped items (CompareItem, WishlistItem) — it does NOT
 * know about the raw Medusa product shape. Mapping is the caller's job.
 *
 * Usage: rendered inside ProductTemplate alongside <ImageGallery>.
 */

import type { CompareItem } from "@lib/compare"
import type { WishlistItem } from "@lib/wishlist"
import CompareButton from "@modules/products/components/compare-button"
import WishlistButton from "@modules/products/components/wishlist-button"

type ProductGalleryActionsProps = {
    compareItem: CompareItem
    wishlistItem: WishlistItem
}

export default function ProductGalleryActions({
    compareItem,
    wishlistItem,
}: ProductGalleryActionsProps) {
    return (
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
            <WishlistButton item={wishlistItem} variant="icon" />
            <CompareButton item={compareItem} variant="icon" />
        </div>
    )
}
