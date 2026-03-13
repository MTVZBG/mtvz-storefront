import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductActionsWrapper from "./product-actions-wrapper"

// USP Component for bottom of product
const USPStrip = () => (
  <div className="w-full border-t border-b border-gray-200 py-10 my-16 bg-white">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
      <div className="flex flex-col items-center">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 mb-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9.75M21 9.75M3 9.75v-2.25c0-.414.336-.75.75-.75h16.5c.414 0 .75.336.75.75v2.25M3 9.75h18" /></svg>
        <span className="font-semibold text-sm uppercase tracking-widest text-[#1a1a1a]">Premium Materials</span>
        <p className="text-sm text-gray-500 mt-2">Engineered for maximum durability.</p>
      </div>
      <div className="flex flex-col items-center">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 mb-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
        <span className="font-semibold text-sm uppercase tracking-widest text-[#1a1a1a]">Fast Shipping</span>
        <p className="text-sm text-gray-500 mt-2">Dispatched within 24 hours.</p>
      </div>
      <div className="flex flex-col items-center">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 mb-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
        <span className="font-semibold text-sm uppercase tracking-widest text-[#1a1a1a]">Official Warranty</span>
        <p className="text-sm text-gray-500 mt-2">2-year comprehensive coverage.</p>
      </div>
      <div className="flex flex-col items-center">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 mb-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
        <span className="font-semibold text-sm uppercase tracking-widest text-[#1a1a1a]">Easy Returns</span>
        <p className="text-sm text-gray-500 mt-2">30-day hassle-free exchanges.</p>
      </div>
    </div>
  </div>
)

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  // Find category for breadcrumbs
  const category = product.categories?.[0]

  return (
    <div className="w-full bg-white pb-16" data-testid="product-container">

      {/* Container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8">

        {/* 1. Breadcrumb */}
        <div className="flex gap-2 text-[13px] text-gray-500 mb-8 uppercase tracking-widest font-bold">
          <LocalizedClientLink href="/" className="hover:text-black transition-colors">Home</LocalizedClientLink>
          {category && (
            <span> / <LocalizedClientLink href={`/categories/${category.handle}`} className="hover:text-black hover:underline px-1 transition-colors">{category.name}</LocalizedClientLink></span>
          )}
          <span>/ <span className="text-black ml-1 border-b border-black">{product.title}</span></span>
        </div>

        {/* 2. Main Product Section (2 columns on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left: Product Gallery (7 cols) */}
          <div className="lg:col-span-7">
            <ImageGallery images={images} />
          </div>

          {/* Right: Buy Box & Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-0">
            <div className="sticky top-[100px]">
              <ProductInfo product={product} />

              <Suspense
                fallback={
                  <ProductActions
                    disabled={true}
                    product={product}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* 3. USP Strip */}
      <USPStrip />

      {/* 4. Product Details (Tabs) */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 mt-4 mb-24">
        <ProductTabs product={product} />
      </div>

      {/* 5. Related Products */}
      <div
        className="w-full border-t border-gray-100 pt-20"
        data-testid="related-products-container"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-[#1a1a1a] mb-12 text-center w-full">
            You May Also Like
          </h2>
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate
