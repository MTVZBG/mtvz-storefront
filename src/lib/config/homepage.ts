import { HttpTypes } from "@medusajs/types"

export const homepageConfig = {
  hero: {
    title: "Риболовът започва тук",
    subtitle: "Премиум екипировка за всеки риболовец",
    image: "https://api.mtvz.bg/static/1773846075596-hero%20(2).jpg",
    ctaText: "Разгледай продуктите",
    ctaLink: "/categories/spinning-rods"
  },
  images: {
    fallback: "https://api.mtvz.bg/static/1773846043544-Fishing.jpg",
    categories: {
      "spinning-rods": "https://api.mtvz.bg/static/1773846043543-spinning-rods.jpg",
      "spinning-reels": "https://api.mtvz.bg/static/1773846043543-Reels.jpg",
      "fishing-lines": "https://api.mtvz.bg/static/1773846043542-fishing-lines.jpg",
      "lures": "https://api.mtvz.bg/static/1773846043542-lures.jpg",
      "fishing-accessories": "https://api.mtvz.bg/static/1773846043540-fishing-accessories.jpg",
    } as Record<string, string>
  },
  labels: {
    categories: {
      "spinning-rods": "Спининг въдици",
    } as Record<string, string>
  }
}

/**
 * Resolves the image for a category based on priority:
 * 1. category.metadata.image (or thumbnail)
 * 2. homepageConfig mapped image by handle
 * 3. homepageConfig fallback image
 */
export function resolveCategoryImage(category: HttpTypes.StoreProductCategory | any): string {
  const metadata = category.metadata || {}
  const originalImage = metadata.image || metadata.thumbnail

  if (originalImage) {
    return originalImage
  }

  const handle = category.handle as string
  if (handle && homepageConfig.images.categories[handle]) {
    return homepageConfig.images.categories[handle]
  }

  return homepageConfig.images.fallback
}

/**
 * Resolves the storefront display name for a category.
 * Falls back to the backend category name if no mapping exists.
 */
export function resolveCategoryName(category: HttpTypes.StoreProductCategory | any): string {
  const handle = category.handle as string
  if (handle && homepageConfig.labels.categories[handle]) {
    return homepageConfig.labels.categories[handle]
  }
  return category.name
}
