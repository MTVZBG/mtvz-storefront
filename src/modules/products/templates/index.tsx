import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTitle from "@modules/products/components/product-title"
import ProductShortDescription from "@modules/products/components/product-short-description"
import ProductKeySpecs from "@modules/products/components/product-key-specs"
import ProductDetailsSection from "@modules/products/components/product-details-section"
import ProductGalleryActions from "@modules/products/components/product-gallery-actions"
import ProductUtilityLinks from "@modules/products/components/product-utility-links"

import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductActionsWrapper from "./product-actions-wrapper"
import { productToCompareItem, productToWishlistItem } from "@lib/util/product-mappers"


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

  // --- Mapping layer ---
  // Performed once at the highest PDP container, not inside child components.
  // CompareButton and WishlistButton receive these pre-mapped shapes;
  // they never touch the raw Medusa product directly.
  const compareItem = productToCompareItem(product)
  const wishlistItem = productToWishlistItem(product)

  // Find category for breadcrumbs
  const category = product.categories?.[0]

  return (
    <div className="w-full bg-white pb-[calc(100px+env(safe-area-inset-bottom,16px))] lg:pb-16" data-testid="product-container">

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
            {/* Wrapper is relative + group so the overlay can animate on hover */}
            <div className="relative group">
              <ImageGallery images={images} />
              <ProductGalleryActions
                compareItem={compareItem}
                wishlistItem={wishlistItem}
              />
            </div>
          </div>

          {/* Right: Buy Box & Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-0">
            <div className="sticky top-[100px]">

              <ProductTitle product={product} />

              <ProductShortDescription product={product} />

              <ProductKeySpecs product={product} />

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

              <ProductUtilityLinks />

            </div>
          </div>
        </div>
      </div>

      {/* 3. Product Details (Tabs) */}
      <ProductDetailsSection product={product} />

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
