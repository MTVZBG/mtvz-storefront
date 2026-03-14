import { HttpTypes } from "@medusajs/types"

export default function ProductStockStatus({
    inStock,
    selectedVariant,
}: {
    inStock: boolean
    selectedVariant: HttpTypes.StoreProductVariant | undefined | null
}) {
    if (!selectedVariant) return null;

    return (
        <p className={`text-sm font-semibold tracking-wide ${inStock ? "text-green-600" : "text-red-500"}`}>
            {inStock ? "In Stock" : "Out of Stock"}
        </p>
    )
}
