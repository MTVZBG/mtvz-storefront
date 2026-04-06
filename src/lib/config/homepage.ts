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
    ctaLink: "/categories/spinning-rods",
  },
  images: {
  fallback: `${homepageAssetBase}/static/1773846043544-Fishing.jpg`,
  categories: {
    "spinning": `${homepageAssetBase}/static/spinning-banner.jpg`,
    "method-feeder": `${homepageAssetBase}/static/method-feeder-banner.jpg`,
    "lines-leaders": `${homepageAssetBase}/static/lines-leaders-banner.jpg`,
    "sea": `${homepageAssetBase}/static/sea-banner.jpg`,
    "terminal-tackle": `${homepageAssetBase}/static/terminal-tackle-banner.jpg`,
    "spinning-rods": `${homepageAssetBase}/static/1773846043543-spinning-rods.jpg`,
    "spinning-reels": `${homepageAssetBase}/static/1773846043543-Reels.jpg`,
    "fishing-lines": `${homepageAssetBase}/static/1773846043542-fishing-lines.jpg`,
    "lures": `${homepageAssetBase}/static/1773846043542-lures.jpg`,
    "fishing-accessories": `${homepageAssetBase}/static/fishing-accessories-banner.jpg`,
  } as Record<string, string>,
  cards: {
    "spinning": `${homepageAssetBase}/static/spinning-home-card.jpg`,
    "method-feeder": `${homepageAssetBase}/static/method-feeder-home-card.jpg`,
    "lines-leaders": `${homepageAssetBase}/static/lines-leaders.jpg`,
    "terminal-tackle": `${homepageAssetBase}/static/terminal-tackle-home-banner.jpg`,
    "fishing-accessories": `${homepageAssetBase}/static/fishing-accessories-home-banner.jpg`,
    "spinning-rods": `${homepageAssetBase}/static/1773846043543-spinning-rods.jpg`,
    "spinning-reels": `${homepageAssetBase}/static/1773846043543-Reels.jpg`,
    "fishing-lines": `${homepageAssetBase}/static/1773846043542-fishing-lines.jpg`,
    "lures": `${homepageAssetBase}/static/1773846043542-lures.jpg`,
  } as Record<string, string>,
},
  labels: {
    categories: {
      "spinning-rods": "Спининг въдици",
    } as Record<string, string>,
  },
}

/**
 * Resolves the banner image for a category page hero.
 * Priority:
 * 1. category.metadata.image
 * 2. mapped banner image by handle
 * 3. fallback image
 */
export function resolveCategoryImage(
  category: HttpTypes.StoreProductCategory | any
): string {
  const metadata = category.metadata || {}
  const originalImage = metadata.image

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
 * Resolves the home/category-card image.
 * Priority:
 * 1. category.metadata.card_image
 * 2. category.metadata.thumbnail
 * 3. mapped card image by handle
 * 4. fallback image
 */
export function resolveCategoryCardImage(
  category: HttpTypes.StoreProductCategory | any
): string {
  const metadata = category.metadata || {}
  const cardImage = metadata.card_image || metadata.thumbnail

  if (cardImage) {
    return cardImage
  }

  const handle = category.handle as string
  if (handle && homepageConfig.images.cards[handle]) {
    return homepageConfig.images.cards[handle]
  }

  return homepageConfig.images.fallback
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
