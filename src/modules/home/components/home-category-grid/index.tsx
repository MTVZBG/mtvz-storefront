import { HttpTypes } from "@medusajs/types"
import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"
import { resolveCategoryImage, resolveCategoryName } from "@lib/config/homepage"

/**
 * CategoryCard component for the HomeCategoryGrid.
 * Displays a single category with a top image area and a distinct bottom title bar.
 */
const CategoryCard = ({ category }: { category: HttpTypes.StoreProductCategory }) => {
    const categoryImage = resolveCategoryImage(category)
    const categoryName = resolveCategoryName(category)

    return (
        <LocalizedClientLink
            href={`/categories/${category.handle}`}
            className="group flex flex-col w-full overflow-hidden bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-ui-border-base"
        >
            {/* Image Area */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-ui-bg-subtle border-b border-ui-border-base">
                {categoryImage ? (
                    <div
                        className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-[1.05] bg-cover bg-center"
                        style={{ backgroundImage: `url('${categoryImage}')` }}
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full bg-ui-bg-component transition-transform duration-500 group-hover:scale-[1.05]" />
                )}
            </div>

            {/* Bottom Title Bar */}
            <div className="w-full bg-[#23201D] text-white px-4 py-3 sm:py-4 flex items-center justify-center transition-colors duration-300 group-hover:bg-black">
                <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider m-0 text-center">
                    {categoryName}
                </h3>
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
