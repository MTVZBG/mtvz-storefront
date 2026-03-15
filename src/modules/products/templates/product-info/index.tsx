import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductReviewSummary from "@modules/products/components/product-review-summary"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info" className="flex flex-col mb-6">
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

export default ProductInfo
