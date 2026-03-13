"use client"

import { HttpTypes } from "@medusajs/types"
import SmartImage from "@modules/common/components/smart-image"
import { useState } from "react"
import { clx } from "@medusajs/ui"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const activeImage = images[activeIndex]

  return (
    <div className="flex flex-col gap-4 w-full h-full select-none">

      {/* Mobile Swipe Gallery & Desktop Main Image Container */}
      <div className="relative aspect-square w-full md:rounded-xl overflow-hidden bg-gray-100 flex md:block snap-x snap-mandatory md:snap-none overflow-x-auto md:overflow-hidden hide-scrollbar">
        {images.map((img, idx) => (
          <div
            key={img.id}
            className="group relative min-w-full min-h-full snap-start md:absolute md:inset-0 md:transition-opacity md:duration-500 ease-in-out cursor-zoom-in"
            style={{ opacity: idx === activeIndex ? 1 : 0, zIndex: idx === activeIndex ? 10 : 0 }}
          >
            {!!img.url && (
              <SmartImage
                src={img.url}
                priority={idx === 0}
                className="absolute inset-0 object-cover object-center w-full h-full md:group-hover:scale-110 transition-transform duration-500 origin-center"
                alt={`Product image ${idx + 1}`}
                fill
                sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 800px"
                draggable={false}
              />
            )}
          </div>
        ))}
      </div>

      {/* Thumbnails (Desktop + Tablet) */}
      {images.length > 1 && (
        <div className="hidden md:flex flex-row gap-3 overflow-x-auto hide-scrollbar pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setActiveIndex(index)}
              className={clx(
                "relative h-24 w-24 aspect-square shrink-0 rounded-lg overflow-hidden border-2 transition-all transition-colors duration-200",
                {
                  "border-black opacity-100": index === activeIndex,
                  "border-transparent opacity-60 hover:opacity-100": index !== activeIndex,
                }
              )}
            >
              {!!image.url && (
                <SmartImage
                  src={image.url}
                  className="absolute inset-0 object-cover object-center w-full h-full"
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="96px"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Mobile Dots */}
      {images.length > 1 && (
        <div className="md:hidden flex items-center justify-center gap-2 mt-2">
          {images.map((_, dotIdx) => (
            <div
              key={dotIdx}
              className={clx("w-1.5 h-1.5 rounded-full transition-all duration-300", {
                "bg-black w-4": dotIdx === activeIndex,
                "bg-gray-300": dotIdx !== activeIndex
              })}
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default ImageGallery
