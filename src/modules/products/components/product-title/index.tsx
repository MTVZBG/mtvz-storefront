import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductReviewSummary from "@modules/products/components/product-review-summary"

export default function ProductTitle({ product }: { product: HttpTypes.StoreProduct }) {
    return (
        <div className="flex flex-col">
            <ProductReviewSummary />

            {product.collection && (
                <LocalizedClientLink
                    href={`/collections/${product.collection.handle}`}
                    className="text-[13px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-2 block"
                >
                    {product.collection.title}
                </LocalizedClientLink>
            )}

            <h1
                className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] leading-tight mb-4"
                data-testid="product-title"
            >
                {product.title}
            </h1>
        </div>
    )
}
