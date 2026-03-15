import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import SectionHeading from "@modules/mtvz/components/SectionHeading"
import React from "react"

/**
 * HomeBestsellers component.
 * Fetches and displays a grid of popular products on the homepage.
 */
export default async function HomeBestsellers({ countryCode }: { countryCode: string }) {
    // Fetch products from Medusa Store API
    const {
        response: { products },
    } = await listProducts({
        countryCode,
        queryParams: {
            limit: 8,
            fields: "*variants.calculated_price,+variants.inventory_quantity,*variants.images,+metadata,+tags,",
        },
    })

    // Get current region details for pricing display
    const region = await getRegion(countryCode)

    if (!products || products.length === 0 || !region) {
        return null
    }

    return (
        <section className="px-6 md:px-12 py-14 md:py-18 bg-white w-full max-w-7xl mx-auto border-t border-gray-100">
            <SectionHeading
                title="Най-продавани"
                subtitle="Разгледайте нашите най-популярни продукти, избрани от риболовците."
            />

            <div className="mt-8 md:mt-10 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6 lg:gap-8">
                {products.map((product) => (
                    <ProductPreview key={product.id} product={product} region={region} />
                ))}
            </div>
        </section>
    )
}
