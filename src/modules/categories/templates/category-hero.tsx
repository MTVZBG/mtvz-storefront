import { HttpTypes } from "@medusajs/types"
import { getCategorySiteAsset } from "@lib/data/site-assets"
import SmartImage from "@modules/common/components/smart-image"

export default async function CategoryHero({
  category,
}: {
  category: HttpTypes.StoreProductCategory
}) {
  const asset = category.handle
    ? await getCategorySiteAsset(category.handle, "hero")
    : null

  const image = asset?.image_url || null
  const imageAlt = asset?.alt_text || category.name

  return (
    <div className="relative w-full h-[180px] md:h-[300px] flex items-center justify-center overflow-hidden mb-8 md:mb-12 bg-neutral-900">
      {image && (
        <SmartImage
          src={image}
          alt={imageAlt}
          className="object-cover"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
        />
      )}

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
