import { HttpTypes } from "@medusajs/types"

export const buildCategoryPathFromCategory = (
  category: HttpTypes.StoreProductCategory | any
) => {
  const parents: string[] = []
  let current = category?.parent_category

  while (current) {
    if (current.handle) {
      parents.unshift(current.handle.replace(/^\/+/, "").trim())
    }

    current = current.parent_category
  }

  const handle = category?.handle?.replace(/^\/+/, "").trim()

  return [...parents, handle].filter(Boolean)
}

export const getCategoryHref = (
  category: HttpTypes.StoreProductCategory | any
) => {
  const path = buildCategoryPathFromCategory(category)

  if (!path.length) {
    return "/"
  }

  return `/${path.join("/")}`
}
