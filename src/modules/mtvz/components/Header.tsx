/**
 * Header — Server Component
 *
 * Fetches top-level product categories from Medusa and passes them
 * to HeaderClient (client component) which manages interaction.
 *
 * Top-level detection:
 *   A category is top-level when parent_category_id is null/undefined.
 *   listCategories fetches all categories; we filter client-side to avoid
 *   an extra API parameter that may not be supported in all Medusa versions.
 */

import AnnouncementBar from "./AnnouncementBar"
import HeaderClient from "./HeaderClient"
import { listCategories } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"

export default async function Header() {
    let topLevelCategories: HttpTypes.StoreProductCategory[] = []

    try {
        const allCategories = await listCategories()
        // Top-level = no parent category
        topLevelCategories = allCategories.filter(
            (cat) => !cat.parent_category_id
        )
    } catch {
        // If the categories API is unavailable, the header still renders
        topLevelCategories = []
    }

    return (
        <div className="sticky top-0 z-50 w-full flex flex-col">
            <AnnouncementBar />
            <HeaderClient categories={topLevelCategories} />
        </div>
    )
}
