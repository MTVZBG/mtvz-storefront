import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listCategories = async (query?: Record<string, any>) => {
  const next = {
    ...(await getCacheOptions("categories")),
  }

  const limit = query?.limit || 100

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      "/store/product-categories",
      {
        query: {
          fields:
            "*category_children,*category_children.metadata,*products,*parent_category,*parent_category.parent_category,+metadata",
          limit,
          ...query,
        },
        next,
        cache: "force-cache",
      }
    )
    .then(({ product_categories }) => product_categories)
}

export const buildCategoryPath = (category: any) => {
  const parents: string[] = []
  let current = category.parent_category

  while (current) {
    if (current.handle) {
      parents.unshift(current.handle.replace(/^\/+/, "").trim())
    }

    current = current.parent_category
  }

  return [...parents, category.handle?.replace(/^\/+/, "").trim()].filter(Boolean)
}

export const getCategoryByHandle = async (categoryPath: string[]) => {
  const normalizedPath = categoryPath
    .map((part) => part.replace(/^\/+/, "").trim())
    .filter(Boolean)

  if (!normalizedPath.length) {
    return null
  }

  const handle = normalizedPath[normalizedPath.length - 1]

  const next = {
    ...(await getCacheOptions("categories")),
  }

  const productCategory = await sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(
      "/store/product-categories",
      {
        query: {
          fields:
            "*category_children,*category_children.metadata,*products,*parent_category,*parent_category.parent_category,+metadata",
          handle,
        },
        next,
        cache: "force-cache",
      }
    )
    .then(({ product_categories }) => product_categories[0])

  if (!productCategory) {
    return null
  }

  if (normalizedPath.length === 1) {
    return productCategory
  }

  const actualPath = buildCategoryPath(productCategory)

  if (actualPath.join("/") !== normalizedPath.join("/")) {
    return null
  }

  return productCategory
}
