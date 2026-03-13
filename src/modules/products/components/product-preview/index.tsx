import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

const StarRating = () => (
  <div className="flex gap-[2px] text-black">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
      </svg>
    ))}
  </div>
)

export default async function ProductPreview({
  product,
  isFeatured,
  region,
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
  const badgeText = isOutOfStock ? "Out of Stock" : isPreSale ? "Pre Sale" : null
  const CtaText = isOutOfStock ? "Out of Stock" : "Learn More"

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group flex flex-col w-full h-full">
      <div data-testid="product-wrapper" className="relative w-full overflow-hidden bg-gray-100 rounded-lg">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        {/* Badges */}
        {badgeText && (
          <div className="absolute top-3 left-3 text-xs px-2 py-1 bg-black text-white font-bold uppercase tracking-wider rounded z-10 shadow-sm">
            {badgeText}
          </div>
        )}
      </div>
      <div className="flex flex-col mt-4 gap-1.5 flex-1">
        <StarRating />
        <h3 className="text-[#1a1a1a] font-semibold text-base leading-tight mt-1" data-testid="product-title">
          {product.title}
        </h3>
        <div className="flex items-center gap-x-2 text-gray-800 text-sm font-bold mt-1">
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
        </div>

        <div className="mt-auto pt-4 w-full">
          <div className="w-full border border-black/20 py-2.5 text-[13px] font-bold uppercase tracking-widest transition-colors group-hover:bg-black group-hover:text-white bg-transparent text-black rounded text-center">
            {CtaText}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
