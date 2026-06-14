import { notFound } from "next/navigation"
import { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import type { SortOptions } from "@modules/store/types/sort-options"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getCategoryHref } from "@lib/util/category-href"
import type { CategorySeoContent } from "@lib/data/category-seo"

import CategoryHero from "./category-hero"
import TopControlBar from "./top-control-bar"
import SEOFaqAccordion from "./seo-faq-accordion"
import CategorySeoMediaSections from "./category-seo-media-sections"
import CategorySeoRichText from "../components/category-seo-rich-text"

export default function CategoryTemplate({
  category,
  categorySeoContent,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  categorySeoContent?: CategorySeoContent | null
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (cat: HttpTypes.StoreProductCategory) => {
    if (cat.parent_category) {
      parents.push(cat.parent_category)
      getParents(cat.parent_category)
    }
  }

  getParents(category)


  return (
    <div className="flex flex-col w-full bg-white pb-0" data-testid="category-container">
      {/* 3. Category Hero Section */}
      <CategoryHero category={category} />

      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 mt-6 mb-24 flex flex-col items-start gap-10">

        {/* 4. Breadcrumb Navigation */}
        <div className="flex gap-2 text-sm text-gray-500 mb-6 uppercase tracking-widest font-bold">
          <LocalizedClientLink href="/" className="hover:text-black transition-colors">Home</LocalizedClientLink>
          {parents.map((p) => (
            <span key={p.id}> / <LocalizedClientLink href={getCategoryHref(p)} className="hover:text-black hover:underline px-1 transition-colors">{p.name}</LocalizedClientLink></span>
          ))}
          <span>/ <span className="text-black ml-1 border-b border-black">{category.name}</span></span>
        </div>

        {/* 5. Main Content Layout */}
        <div className="w-full">

            {/* Products & Controls */}
            <div className="flex flex-col w-full">

            {categorySeoContent?.intro_text ? (
              <CategorySeoRichText
                html={categorySeoContent.intro_text}
                className="mb-8"
              />
            ) : null}

            <CategorySeoMediaSections
              mediaSections={categorySeoContent?.media_sections}
              type="intro_image"
            />

            {/* 7. Control Bar */}
            <TopControlBar sortBy={sort} />

            {/* 8. Product Grid */}
            <Suspense fallback={<SkeletonProductGrid numberOfProducts={category.products?.length ?? 12} />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                categoryId={category.id}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>

        {categorySeoContent?.bottom_text ? (
          <CategorySeoRichText
            html={categorySeoContent.bottom_text}
            className="w-full max-w-3xl mx-auto mt-12"
          />
        ) : null}

        <CategorySeoMediaSections
          mediaSections={categorySeoContent?.media_sections}
          type="bottom_image"
        />

        <CategorySeoMediaSections
          mediaSections={categorySeoContent?.media_sections}
          type="video"
        />

        {categorySeoContent?.faq?.length ? (
          <SEOFaqAccordion faq={categorySeoContent.faq} />
        ) : null}

        {/* Categories Children links as tags for SEO / Discovery */}
        {category.category_children && category.category_children.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-100 w-full">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Related Categories</h3>
            <div className="flex flex-wrap gap-2">
              {category.category_children?.map((c) => {
                const childCategory = {
                  ...c,
                  parent_category: c.parent_category || category,
                }

                return (
                  <LocalizedClientLink
                    key={c.id}
                    href={getCategoryHref(childCategory)}
                    className="px-4 py-2 bg-gray-50 text-gray-700 text-[13px] font-semibold uppercase hover:bg-black hover:text-white transition-colors rounded-sm"
                  >
                    {c.name}
                  </LocalizedClientLink>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
