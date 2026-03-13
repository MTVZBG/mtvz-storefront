import Image, { ImageProps, StaticImageData } from "next/image"
import React from "react"

const isExternalUrl = (src: string | StaticImageData | any): src is string => {
    return typeof src === "string" && /^https?:\/\//i.test(src)
}

export default function SmartImage(props: ImageProps) {
    const { src, alt, className, priority, loading, quality, fill, sizes, ...rest } = props

    if (isExternalUrl(src)) {
        return (
            <img
                src={src as string}
                alt={alt}
                className={className}
                loading={priority ? undefined : (loading || "lazy")}
                decoding="async"
                {...(rest as any)}
            />
        )
    }

    return <Image {...props} />
}
