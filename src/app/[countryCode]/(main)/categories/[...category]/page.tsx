import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
}

const normalizeCategoryPath = (category?: string[]) => {
  if (!category?.length) {
    return []
  }

  return category.map((part) => part.replace(/^\/+/, "").trim()).filter(Boolean)
}

export async function generateStaticParams() {
  const productCategories = await listCategories()

  if (!productCategories?.length) {
    return []
  }

  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions?.flatMap((r) => r.countries?.map((c) => c.iso_2).filter(Boolean) || [])
  )

  const categoryHandles = productCategories
    .map((category: any) => category.handle?.replace(/^\/+/, "").trim())
    .filter(Boolean)

  return (
    countryCodes?.flatMap((countryCode: string | undefined) =>
      categoryHandles.map((handle: string) => ({
        countryCode,
        category: [handle],
      }))
    ) || []
  )
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

    const title = `${productCategory.name} | MTVZ`
    const description =
      productCategory.description || `${productCategory.name} category.`

    return {
      title,
      description,
      alternates: {
        canonical: `/${params.countryCode}/categories/${normalizedCategory.join("/")}`,
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

  return (
    <CategoryTemplate
      category={productCategory}
      sortBy={undefined}
      page={undefined}
      countryCode={params.countryCode}
    />
  )
}
