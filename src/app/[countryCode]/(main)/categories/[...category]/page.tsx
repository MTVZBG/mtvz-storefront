import { Metadata } from "next"
import { notFound } from "next/navigation"

import { buildCategoryPath, getCategoryByHandle } from "@lib/data/categories"
import { getCategorySeoContent } from "@lib/data/category-seo"
import { generateCategoryJsonLd } from "@lib/seo/category-schema"
import { generateCategoryMetadata } from "@lib/seo/category-metadata"
import CategoryTemplate from "@modules/categories/templates"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
}

const normalizeCategoryPath = (category?: string[]) => {
  if (!category?.length) {
    return []
  }

  return category.map((part) => part.replace(/^\/+/, "").trim()).filter(Boolean)
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const normalizedCategory = normalizeCategoryPath(params.category)

  if (!normalizedCategory.length) {
    notFound()
  }

  try {
    const productCategory = await getCategoryByHandle(normalizedCategory)

    if (!productCategory) {
      notFound()
    }

    const metadata = generateCategoryMetadata(productCategory)
    const canonicalCategoryPath = buildCategoryPath(productCategory)
    const categoryHandle =
      productCategory.handle?.replace(/^\/+/, "").trim() ||
      normalizedCategory[normalizedCategory.length - 1]
    const categorySeoContent = await getCategorySeoContent(categoryHandle)

    return {
      title: categorySeoContent?.seo_title || metadata.title,
      description: categorySeoContent?.seo_description || metadata.description,
      alternates: {
        canonical: `/${params.countryCode}/${canonicalCategoryPath.join("/")}`,
      },
    }
  } catch {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const params = await props.params
  const normalizedCategory = normalizeCategoryPath(params.category)

  if (!normalizedCategory.length) {
    notFound()
  }

  const productCategory = await getCategoryByHandle(normalizedCategory)

  if (!productCategory) {
    notFound()
  }

  const categoryHandle =
    productCategory.handle?.replace(/^\/+/, "").trim() ||
    normalizedCategory[normalizedCategory.length - 1]
  const categorySeoContent = await getCategorySeoContent(categoryHandle)

  const jsonLd = generateCategoryJsonLd({
    category: productCategory,
    countryCode: params.countryCode,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <CategoryTemplate
        category={productCategory}
        categorySeoContent={categorySeoContent}
        sortBy={undefined}
        page={undefined}
        countryCode={params.countryCode}
      />
    </>
  )
}
