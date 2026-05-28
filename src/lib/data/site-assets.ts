import { sdk } from "@lib/config"

export type SiteAsset = {
  key: string
  scope: string
  entity_type: string
  entity_handle: string | null
  slot: string
  label: string
  image_url: string
  alt_text: string
  content?: unknown
  is_active?: boolean
  sort_order?: number
}

type SiteAssetsResponse = {
  site_assets: SiteAsset[]
}

const backendUrl =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

const normalizeImageUrl = (imageUrl: unknown): string | null => {
  if (typeof imageUrl !== "string") {
    return null
  }

  const trimmed = imageUrl.trim()

  if (!trimmed) {
    return null
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed
  }

  if (trimmed.startsWith("/static/")) {
    return `${backendUrl}${trimmed}`
  }

  return null
}

const normalizeSiteAsset = (asset: SiteAsset): SiteAsset | null => {
  const imageUrl = normalizeImageUrl(asset.image_url)

  if (!imageUrl) {
    return null
  }

  return {
    ...asset,
    image_url: imageUrl,
  }
}

export const getCategorySiteAsset = async (
  categoryHandle: string,
  slot: "hero" | "card"
): Promise<SiteAsset | null> => {
  const handle = categoryHandle.trim()

  if (!handle) {
    return null
  }

  const search = new URLSearchParams({
    scope: "category",
    entity_type: "product_category",
    entity_handle: handle,
    slot,
  })

  try {
    const res = await sdk.client.fetch<SiteAssetsResponse>(
      `/store/site-assets?${search.toString()}`,
      {
        cache: "no-store",
      }
    )

    const asset = res.site_assets?.[0]

    return asset ? normalizeSiteAsset(asset) : null
  } catch (e) {
    return null
  }
}

export const getCategoryCardSiteAssets = async (): Promise<
  Record<string, SiteAsset>
> => {
  const search = new URLSearchParams({
    scope: "category",
    entity_type: "product_category",
    slot: "card",
  })

  try {
    const res = await sdk.client.fetch<SiteAssetsResponse>(
      `/store/site-assets?${search.toString()}`,
      {
        cache: "no-store",
      }
    )

    return (res.site_assets || []).reduce<Record<string, SiteAsset>>(
      (acc, asset) => {
        const normalized = normalizeSiteAsset(asset)

        if (normalized?.entity_handle) {
          acc[normalized.entity_handle] = normalized
        }

        return acc
      },
      {}
    )
  } catch (e) {
    return {}
  }
}
