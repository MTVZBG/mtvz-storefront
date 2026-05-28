import { HttpTypes } from "@medusajs/types"

const homepageAssetBase =
  process.env.NEXT_PUBLIC_HOMEPAGE_ASSET_BASE_URL ||
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
  "http://localhost:9000"

export const homepageConfig = {
  hero: {
    title: "Риболовът започва тук",
    subtitle: "Премиум екипировка за всеки риболовец",
    image: `${homepageAssetBase}/static/1773846075596-hero%20(2).jpg`,
    ctaText: "Разгледай продуктите",
    ctaLink: "/spinning/spinning-rods",
  },
  labels: {
    categories: {
      "spinning-rods": "Спининг въдици",
    } as Record<string, string>,
  },
}

/**
 * Resolves the storefront display name for a category.
 * Falls back to the backend category name if no mapping exists.
 */
export function resolveCategoryName(
  category: HttpTypes.StoreProductCategory | any
): string {
  const handle = category.handle as string

  if (handle && homepageConfig.labels.categories[handle]) {
    return homepageConfig.labels.categories[handle]
  }

  return category.name
}
