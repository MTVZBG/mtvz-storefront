import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  // Basic mock check for Out of Stock or Pre Sale
  const isOutOfStock = product.variants?.every((v) => (v as any).inventory_quantity === 0 && (v as any).manage_inventory)
  const isPreSale = !isOutOfStock && product.tags?.some(tag => tag.value.toLowerCase() === "presale")
  const badgeText = isOutOfStock ? "Изчерпан" : isPreSale ? "Предварителна продажба" : null
  const CtaText = isOutOfStock ? "Изчерпан" : "Научи повече"

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group flex flex-col w-full h-full bg-white transition-all duration-300 hover:shadow-md hover:-translate-y-1 rounded-xl p-3 border border-transparent hover:border-gray-100"
    >
      <div data-testid="product-wrapper" className="relative w-full aspect-square overflow-hidden bg-[#f7f7f7] rounded-lg mb-4">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="square"
          isFeatured={isFeatured}
          className="!bg-transparent group-hover:scale-[1.02] transition-transform duration-500"
        />

        {/* Badges - Smaller and top-left */}
        {badgeText && (
          <div className="absolute top-2 left-2 text-[10px] px-1.5 py-0.5 bg-black/90 text-white font-bold uppercase tracking-widest rounded shadow-sm z-10">
            {badgeText}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 flex-1 px-1">
        <h3 className="text-[#1a1a1a] font-medium text-sm sm:text-[15px] leading-snug line-clamp-2 h-10 mt-1" data-testid="product-title">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <div className="text-black text-base font-bold">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
          <div className="text-ui-fg-interactive opacity-0 group-hover:opacity-100 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>

        <div className="mt-4 w-full">
          <div className="w-full border border-gray-200 py-2 text-[11px] font-bold uppercase tracking-widest transition-all group-hover:bg-black group-hover:text-white group-hover:border-black bg-white text-gray-500 rounded-md text-center">
            {CtaText}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
