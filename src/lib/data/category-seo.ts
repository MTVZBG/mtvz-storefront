import { sdk } from "@lib/config"

export type CategorySeoFaqItem = {
  question: string
  answer: string
}

export type CategorySeoIntroImage = {
  image_url: string
  alt: string
  caption: string
}

export type CategorySeoVideo = {
  video_url: string
  title: string
  description: string
}

export type CategorySeoBottomImage = {
  image_url: string
  alt: string
  title: string
  text: string
}

export type CategorySeoMediaSections = {
  intro_image: CategorySeoIntroImage | null
  video: CategorySeoVideo | null
  bottom_image: CategorySeoBottomImage | null
}

export type CategorySeoContent = {
  category_handle: string
  locale: string
  seo_title: string
  seo_description: string
  intro_text: string
  bottom_text: string
  faq: CategorySeoFaqItem[]
  media_sections?: CategorySeoMediaSections | null
}

type CategorySeoResponse = {
  category_seo_content: CategorySeoContent | null
}

const isValidImageUrl = (url: unknown): boolean => {
  if (typeof url !== "string") return false
  const trimmed = url.trim()
  if (!trimmed) return false
  if (trimmed.startsWith("file://")) return false
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://localhost:9000/")
  ) {
    return true
  }
  return false
}

const getEmbedVideoUrl = (url: unknown): string | null => {
  if (typeof url !== "string") return null
  const trimmed = url.trim()
  if (!trimmed) return null

  // Support ready YouTube embed URL
  if (trimmed.includes("youtube.com/embed/")) {
    return trimmed
  }

  try {
    const parsed = new URL(trimmed)
    
    // YouTube short: youtu.be/VIDEO_ID
    if (parsed.hostname === "youtu.be" || parsed.hostname.endsWith(".youtu.be")) {
      const videoId = parsed.pathname.substring(1)
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }
    }
    
    // YouTube watch URL: youtube.com/watch?v=VIDEO_ID
    if (parsed.hostname === "youtube.com" || parsed.hostname.endsWith(".youtube.com")) {
      const videoId = parsed.searchParams.get("v")
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }
    }
  } catch (e) {
    // Return null if not a parseable URL
  }

  return null
}

const normalizeMediaSections = (mediaSections: unknown): CategorySeoMediaSections | null => {
  if (!mediaSections || typeof mediaSections !== "object") {
    return null
  }

  const sections = mediaSections as Partial<Record<keyof CategorySeoMediaSections, any>>

  const intro_image = sections.intro_image
  const introImageNormalized: CategorySeoIntroImage | null =
    intro_image && typeof intro_image === "object" && isValidImageUrl(intro_image.image_url)
      ? {
          image_url: String(intro_image.image_url).trim(),
          alt: typeof intro_image.alt === "string" ? intro_image.alt.trim() : "",
          caption: typeof intro_image.caption === "string" ? intro_image.caption.trim() : "",
        }
      : null

  const video = sections.video
  const embedUrl = video && typeof video === "object" ? getEmbedVideoUrl(video.video_url) : null
  const videoNormalized: CategorySeoVideo | null =
    video && typeof video === "object" && embedUrl
      ? {
          video_url: embedUrl,
          title: typeof video.title === "string" ? video.title.trim() : "",
          description: typeof video.description === "string" ? video.description.trim() : "",
        }
      : null

  const bottom_image = sections.bottom_image
  const bottomImageNormalized: CategorySeoBottomImage | null =
    bottom_image && typeof bottom_image === "object" && isValidImageUrl(bottom_image.image_url)
      ? {
          image_url: String(bottom_image.image_url).trim(),
          alt: typeof bottom_image.alt === "string" ? bottom_image.alt.trim() : "",
          title: typeof bottom_image.title === "string" ? bottom_image.title.trim() : "",
          text: typeof bottom_image.text === "string" ? bottom_image.text.trim() : "",
        }
      : null

  if (!introImageNormalized && !videoNormalized && !bottomImageNormalized) {
    return null
  }

  return {
    intro_image: introImageNormalized,
    video: videoNormalized,
    bottom_image: bottomImageNormalized,
  }
}

const normalizeFaq = (faq: unknown): CategorySeoFaqItem[] => {
  if (!Array.isArray(faq)) {
    return []
  }

  return faq
    .map((item) => {
      const faqItem = item as Partial<CategorySeoFaqItem>

      return {
        question: String(faqItem.question || "").trim(),
        answer: String(faqItem.answer || "").trim(),
      }
    })
    .filter((item) => item.question || item.answer)
}

export const getCategorySeoContent = async (
  categoryHandle: string,
  locale = "bg"
) => {
  const handle = categoryHandle.trim()
  const normalizedLocale = locale.trim() || "bg"

  if (!handle) {
    return null
  }

  const search = new URLSearchParams({
    category_handle: handle,
    locale: normalizedLocale,
  })

  try {
    const res = await sdk.client.fetch<CategorySeoResponse>(
      `/store/category-seo?${search.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    )

    const content = res.category_seo_content

    if (!content) {
      return null
    }

    return {
      ...content,
      faq: normalizeFaq(content.faq),
      media_sections: normalizeMediaSections(content.media_sections),
    }
  } catch {
    return null
  }
}
