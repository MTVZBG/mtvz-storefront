import { HttpTypes } from "@medusajs/types"

export default function ProductShortDescription({ product }: { product: HttpTypes.StoreProduct }) {
    if (!product.subtitle && !product.description) return null;

    return (
        <div className="flex flex-col mb-6">
            {product.subtitle && (
                <p className="text-gray-600 text-[15px] leading-relaxed mb-2 max-w-lg">
                    {product.subtitle}
                </p>
            )}

            {product.description && !product.subtitle && (
                <p
                    className="text-gray-600 text-[15px] leading-relaxed max-w-lg line-clamp-3"
                    data-testid="product-description"
                >
                    {product.description}
                </p>
            )}
        </div>
    )
}
