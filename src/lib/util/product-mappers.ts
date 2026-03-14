/**
 * Product Mappers
 *
 * Centralized pure functions that transform a raw Medusa StoreProduct
 * into the normalized shapes required by Compare and Wishlist systems.
 *
 * Rules:
 * - These are pure functions — no side effects, no API calls.
 * - Call them at the outermost component layer (ProductTemplate, CategoryCard, etc.)
 * - Pass the resulting objects down into CompareButton / WishlistButton.
 * - CompareButton and WishlistButton never see raw Medusa product shapes.
 *
 * This keeps the button components decoupled from the Medusa data model,
 * making them portable to any product surface (PDP, cards, collections, etc.).
 */

import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "./get-product-price"
import type { CompareItem } from "@lib/compare"
import type { WishlistItem } from "@lib/wishlist"

// ---------------------------------------------------------------------------
// product → CompareItem
// ---------------------------------------------------------------------------

/**
 * Maps a Medusa StoreProduct to a CompareItem.
 *
 * Spec extraction is intentionally flexible: any Medusa product field that
 * has a value is included. Unknown fields are safely omitted (null values
 * render as "—" in the Compare modal).
 *
 * `globalRating` is always null — it is a reserved placeholder field.
 * Connect it to a 3rd-party rating API here when available.
 */
export function productToCompareItem(product: HttpTypes.StoreProduct): CompareItem {
    // Price — use cheapest available variant price
    let price: string | null = null
    let priceNumber: number | null = null

    try {
        const { cheapestPrice } = getProductPrice({ product })
        price = cheapestPrice?.calculated_price ?? null
        priceNumber = cheapestPrice?.calculated_price_number ?? null
    } catch {
        // Product may not have pricing yet — safe fallback
    }

    // Build spec map from available product fields
    const comparableSpecs: Record<string, string | null> = {}

    if (product.material) comparableSpecs["Material"] = product.material
    if (product.type?.value) comparableSpecs["Type"] = product.type.value
    if (product.origin_country) comparableSpecs["Origin"] = product.origin_country
    if (product.weight) comparableSpecs["Weight"] = `${product.weight}g`
    if (product.length) comparableSpecs["Length"] = `${product.length}mm`
    if (product.width) comparableSpecs["Width"] = `${product.width}mm`
    if (product.height) comparableSpecs["Height"] = `${product.height}mm`

    return {
        id: product.id!,
        handle: product.handle!,
        title: product.title ?? "Unknown product",
        thumbnail: product.thumbnail ?? null,
        price,
        priceNumber,
        // FUTURE: replace with real site review score from review provider
        siteRating: null,
        // RESERVED: always null — connect to 3rd-party global rating API when ready
        globalRating: null,
        comparableSpecs,
    }
}

// ---------------------------------------------------------------------------
// product → WishlistItem
// ---------------------------------------------------------------------------

/**
 * Maps a Medusa StoreProduct to a WishlistItem.
 * Minimal shape — wishlist only needs identity + display data.
 */
export function productToWishlistItem(product: HttpTypes.StoreProduct): WishlistItem {
    let price: string | null = null

    try {
        const { cheapestPrice } = getProductPrice({ product })
        price = cheapestPrice?.calculated_price ?? null
    } catch {
        // Safe fallback — no pricing available yet
    }

    return {
        id: product.id!,
        handle: product.handle!,
        title: product.title ?? "Unknown product",
        thumbnail: product.thumbnail ?? null,
        price,
    }
}
