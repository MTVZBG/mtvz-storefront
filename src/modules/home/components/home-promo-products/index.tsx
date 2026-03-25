import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import SectionHeading from "@modules/mtvz/components/SectionHeading"
import React from "react"

/**
 * HomePromoProducts component.
 * Displays "Top Offers" or accent products.
 * [TEMPORARY MOCK]: Currently fetches an offset of products to simulate different promos.
 * Easily swappable to fetch by collection handle, tag, or discount status when data is ready.
 */
export default async function HomePromoProducts({ countryCode }: { countryCode: string }) {
    // Fetch products from Medusa Store API with offset to simulate different "Promo" products
    const {
        response: { products },
    } = await listProducts({
        countryCode,
        queryParams: {
            limit: 8,
            offset: 8, // Temporary mock: fetch next 8 products
            fields: "*variants.calculated_price,+variants.inventory_quantity,*variants.images,+metadata,+tags,",
        },
    })

    const region = await getRegion(countryCode)

    if (!products || products.length === 0 || !region) {
        return null
    }

    return (
        <section className="px-6 md:px-12 py-14 md:py-18 bg-white w-full max-w-7xl mx-auto border-t border-gray-100">
            <SectionHeading
                title="Топ предложения"
                subtitle="Специално подбрани промоции и акценти за сезона."
            />

            <div className="mt-8 md:mt-10 flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-4 md:grid-cols-3 gap-4 lg:gap-8 pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {products.map((product) => (
                    <div key={product.id} className="w-[75vw] sm:w-[45vw] md:w-auto snap-start shrink-0">
                        <ProductPreview product={product} region={region} />
                    </div>
                ))}
            </div>
        </section>
    )
}
