import { HttpTypes } from "@medusajs/types"
import { resolveCategoryImage } from "@lib/config/homepage"

export default function CategoryHero({
  category,
}: {
  category: HttpTypes.StoreProductCategory
}) {
  const image = resolveCategoryImage(category)

  return (
    <div className="relative w-full h-[180px] md:h-[300px] flex items-center justify-center overflow-hidden mb-8 md:mb-12">
      <img
        src={image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 text-center px-6">
        <h1 className="text-white font-bold text-4xl md:text-5xl uppercase tracking-widest text-shadow-md drop-shadow-lg">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-4 text-white/90 text-sm md:text-base max-w-2xl mx-auto font-medium tracking-wide">
            {category.description}
          </p>
        )}
      </div>
    </div>
  )
}