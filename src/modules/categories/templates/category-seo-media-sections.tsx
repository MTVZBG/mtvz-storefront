import React from "react"
import type { CategorySeoMediaSections as MediaSectionsType } from "@lib/data/category-seo"

interface CategorySeoMediaSectionsProps {
  mediaSections: MediaSectionsType | null | undefined
  type: "intro_image" | "video" | "bottom_image"
}

export default function CategorySeoMediaSections({
  mediaSections,
  type,
}: CategorySeoMediaSectionsProps) {
  if (!mediaSections) {
    return null
  }

  if (type === "intro_image") {
    const introImage = mediaSections.intro_image
    if (!introImage || !introImage.image_url) {
      return null
    }

    return (
      <div className="mb-8 w-full max-w-3xl overflow-hidden rounded-lg border border-gray-100 bg-gray-50/50 p-2 shadow-sm">
        <img
          src={introImage.image_url}
          alt={introImage.alt || "Category Intro Image"}
          className="w-full h-auto object-cover rounded-md max-h-[400px]"
          loading="lazy"
        />
        {introImage.caption && (
          <p className="mt-2 text-xs md:text-sm text-gray-500 text-center italic leading-relaxed">
            {introImage.caption}
          </p>
        )}
      </div>
    )
  }

  if (type === "video") {
    const video = mediaSections.video
    if (!video || !video.video_url) {
      return null
    }

    return (
      <div className="w-full max-w-3xl mx-auto mb-12 flex flex-col">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md border border-gray-150 bg-black">
          <iframe
            src={video.video_url}
            title={video.title || "YouTube Video Playback"}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
        {(video.title || video.description) && (
          <div className="mt-4 px-1">
            {video.title && (
              <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug tracking-tight">
                {video.title}
              </h3>
            )}
            {video.description && (
              <p className="mt-2 text-[14px] md:text-[15px] leading-relaxed text-gray-600">
                {video.description}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }

  if (type === "bottom_image") {
    const bottomImage = mediaSections.bottom_image
    if (!bottomImage || !bottomImage.image_url) {
      return null
    }

    const hasTextContent = !!(bottomImage.title || bottomImage.text)

    return (
      <div className="w-full max-w-3xl mx-auto mt-12 bg-gray-50/50 p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className={`w-full ${hasTextContent ? "md:w-1/2" : "w-full"} overflow-hidden rounded-lg`}>
          <img
            src={bottomImage.image_url}
            alt={bottomImage.alt || "Category Bottom Image"}
            className="w-full h-auto object-cover rounded-lg max-h-[350px]"
            loading="lazy"
          />
        </div>
        {hasTextContent && (
          <div className="flex-1 flex flex-col justify-start w-full">
            {bottomImage.title && (
              <h4 className="text-base md:text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider">
                {bottomImage.title}
              </h4>
            )}
            {bottomImage.text && (
              <p className="text-[14px] md:text-[15px] leading-relaxed text-gray-600">
                {bottomImage.text}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }

  return null
}
