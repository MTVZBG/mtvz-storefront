import Image, { ImageProps, StaticImageData } from "next/image"
import React from "react"

const OPTIMIZED_EXTERNAL_IMAGE_HOSTNAMES = new Set([
  "www.anglingdirect.co.uk",
  "www.mftackle.com",
  "nasluka-shop.com",
  "fishingindustry.bg",
  "s13emagst.akamaized.net",
  "www.angel-domaene.de",
  "foxcdn1.blob.core.windows.net",
  "www.prestoninnovations.com",
  "matchfishing.hr",
  "hobbyhome.co.uk",
  "cbu01.alicdn.com",
  "api.mtvz.bg",
])

const isExternalUrl = (src: string | StaticImageData | unknown): src is string => {
  return typeof src === "string" && /^https?:\/\//i.test(src)
}

const isOptimizedExternalUrl = (src: string) => {
  try {
    const { hostname } = new URL(src)

    return OPTIMIZED_EXTERNAL_IMAGE_HOSTNAMES.has(hostname.toLowerCase())
  } catch {
    return false
  }
}

export default function SmartImage(props: ImageProps) {
  const {
    src,
    alt,
    className,
    priority,
    loading,
    quality,
    fill,
    sizes,
    placeholder,
    blurDataURL,
    ...rest
  } = props

  if (isExternalUrl(src)) {
    if (isOptimizedExternalUrl(src)) {
      return <Image {...props} />
    }

    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? undefined : loading || "lazy"}
        decoding="async"
        {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    )
  }

  return <Image {...props} />
}
