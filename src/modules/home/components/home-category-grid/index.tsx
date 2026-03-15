import { HttpTypes } from "@medusajs/types"
import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

/**
 * CategoryCard component for the HomeCategoryGrid.
 * Displays a single category with its name and a background image.
 */
const CategoryCard = ({ category }: { category: HttpTypes.StoreProductCategory }) => {
    // Try to find image in metadata or use a high-quality placeholder
    const categoryImage = (category as any).metadata?.image || (category as any).metadata?.thumbnail || "https://images.unsplash.com/photo-1544642236-fa2a893c52a9?q=80&w=800&auto=format&fit=crop"
    const bgImage = `url('${categoryImage}')`

    return (
        <LocalizedClientLink
            href={`/categories/${category.handle}`}
            className="group relative block w-full aspect-[4/5] sm:aspect-[3/2] overflow-hidden bg-gray-100 rounded-lg shadow-sm border border-gray-100"
        >
            <div
                className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105 bg-cover bg-center"
                style={{ backgroundImage: bgImage }}
            >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <h3 className="text-white text-xl sm:text-2xl font-bold uppercase tracking-wider mb-2 drop-shadow-md">
                    {category.name}
                </h3>
                <div className="flex items-center text-white/90 text-sm font-semibold uppercase tracking-widest translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    Разгледай
                    <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </svg>
                </div>
            </div>
        </LocalizedClientLink>
    )
}

/**
 * HomeCategoryGrid component.
 * Fetches and displays top-level product categories in a responsive grid.
 */
export default async function HomeCategoryGrid() {
    // Fetch categories from Medusa Store API
    const categories = await listCategories()

    if (!categories || categories.length === 0) {
        return null
    }

    // Filter to show only top-level categories
    const topLevelCategories = categories.filter((c) => !c.parent_category_id)

    // Use top-level categories if available, otherwise fallback to all (first 6)
    const displayCategories = (topLevelCategories.length > 0 ? topLevelCategories : categories).slice(0, 6)

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full">
            {displayCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
            ))}
        </div>
    )
}
