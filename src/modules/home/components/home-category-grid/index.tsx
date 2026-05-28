import { HttpTypes } from "@medusajs/types"
import { listCategories } from "@lib/data/categories"
import { getCategoryCardSiteAssets } from "@lib/data/site-assets"
import { resolveCategoryName } from "@lib/config/homepage"
import { getCategoryHref } from "@lib/util/category-href"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CategoryCard = ({
  category,
  categoryImage,
}: {
  category: HttpTypes.StoreProductCategory
  categoryImage: string | null
}) => {
  const categoryName = resolveCategoryName(category)

  return (
    <LocalizedClientLink
      href={getCategoryHref(category)}
      className="group flex flex-col w-full overflow-hidden bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-ui-border-base"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-ui-bg-subtle border-b border-ui-border-base">
        {categoryImage ? (
          <div
            className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-[1.05] bg-cover bg-center"
            style={{ backgroundImage: `url('${categoryImage}')` }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-[1.05] bg-ui-bg-subtle" />
        )}
      </div>

      <div className="w-full bg-[#23201D] text-white px-4 py-3 sm:py-4 flex items-center justify-center transition-colors duration-300 group-hover:bg-black">
        <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider m-0 text-center">
          {categoryName}
        </h3>
      </div>
    </LocalizedClientLink>
  )
}

export default async function HomeCategoryGrid() {
  const [categories, categoryCardAssets] = await Promise.all([
    listCategories(),
    getCategoryCardSiteAssets(),
  ])

  if (!categories || categories.length === 0) {
    return null
  }

  const topLevelCategories = categories.filter((c) => !c.parent_category_id)
  const displayCategories = (
    topLevelCategories.length > 0 ? topLevelCategories : categories
  ).slice(0, 6)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full">
      {displayCategories.map((category) => {
        const categoryImage = category.handle
          ? categoryCardAssets[category.handle]?.image_url || null
          : null

        return (
          <CategoryCard
            key={category.id}
            category={category}
            categoryImage={categoryImage}
          />
        )
      })}
    </div>
  )
}
