import { Container, clx } from "@medusajs/ui"
import React from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: { url?: string | null }[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}
import SmartImage from "@modules/common/components/smart-image"

const isValidImageSrc = (src?: string | null): src is string => {
  return typeof src === "string" && src.trim().length > 0
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = isValidImageSrc(thumbnail)
    ? thumbnail
    : isValidImageSrc(images?.[0]?.url)
      ? images?.[0]?.url
      : null

  const hoverImage =
    isValidImageSrc(images?.[1]?.url) ? images?.[1]?.url : null

  return (
    <Container
      className={clx(
        "group relative w-full overflow-hidden p-0 bg-transparent shadow-none border-transparent rounded-none transition-shadow ease-in-out duration-150",
        className,
        {
          "aspect-[11/14]": isFeatured,
          "aspect-[4/5]": !isFeatured && size !== "square",
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      {initialImage ? (
        <SmartImage
          src={initialImage}
          alt="Thumbnail"
          className={clx(
            "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500",
            {
              "group-hover:opacity-0": !!hoverImage,
            }
          )}
          fill
          sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gray-100">
          <PlaceholderImage size={size === "small" ? 16 : 24} />
        </div>
      )}

      {hoverImage && (
        <SmartImage
          src={hoverImage}
          alt="Thumbnail hover"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          fill
          sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
          draggable={false}
        />
      )}
    </Container>
  )
}

export default Thumbnail