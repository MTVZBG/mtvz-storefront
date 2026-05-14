import { buildCategoryPath } from "@lib/data/categories"
import { generateCategoryMetadata } from "@lib/seo/category-metadata"

const SITE_URL = "https://mtvz.bg"

const buildCategoryAncestors = (category: any) => {
  const ancestors: any[] = []
  let current = category?.parent_category

  while (current) {
    ancestors.unshift(current)
    current = current.parent_category
  }

  return [...ancestors, category].filter(Boolean)
}

export const generateCategoryJsonLd = ({
  category,
  countryCode,
}: {
  category: any
  countryCode: string
}) => {
  const categoryPath = buildCategoryPath(category)
  const pageUrl = `${SITE_URL}/${countryCode}/${categoryPath.join("/")}`
  const metadata = generateCategoryMetadata(category)
  const categoryTrail = buildCategoryAncestors(category)

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Начало",
      item: `${SITE_URL}/${countryCode}`,
    },
    ...categoryTrail.map((item, index) => {
      const path = categoryPath.slice(0, index + 1).join("/")

      return {
        "@type": "ListItem",
        position: index + 2,
        name: item.name || item.handle,
        item: `${SITE_URL}/${countryCode}/${path}`,
      }
    }),
  ]

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: category.name,
      description: metadata.description,
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "MTVZ",
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    },
  ]
}
