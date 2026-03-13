import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  return (
    <div className="flex flex-col text-[#1a1a1a] mb-2">
      <div className="flex items-center gap-3">
        <span
          className={clx("text-2xl md:text-3xl font-bold", {
            "text-red-600": selectedPrice.price_type === "sale",
          })}
        >
          {!variant && "From "}
          <span
            data-testid="product-price"
            data-value={selectedPrice.calculated_price_number}
          >
            {selectedPrice.calculated_price}
          </span>
        </span>

        {selectedPrice.price_type === "sale" && (
          <div className="flex items-center gap-2">
            <span
              className="text-gray-400 line-through text-lg font-medium"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
            <span className="text-[12px] font-bold uppercase tracking-wider bg-red-100 text-red-700 px-2.5 py-1 rounded">
              Save {selectedPrice.percentage_diff}%
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
