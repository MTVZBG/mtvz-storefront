import { sdk } from "@lib/config"

export type CategorySeoFaqItem = {
  question: string
  answer: string
}

export type CategorySeoContent = {
  category_handle: string
  locale: string
  seo_title: string
  seo_description: string
  intro_text: string
  bottom_text: string
  faq: CategorySeoFaqItem[]
}

type CategorySeoResponse = {
  category_seo_content: CategorySeoContent | null
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
    }
  } catch {
    return null
  }
}
