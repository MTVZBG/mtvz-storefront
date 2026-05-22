type CategorySeoRichTextProps = {
  html: string
  className?: string
}

export default function CategorySeoRichText({
  html,
  className = "",
}: CategorySeoRichTextProps) {
  if (!html) {
    return null
  }

  return (
    <div
      className={[
        "category-seo-rich-text text-[15px] leading-7 text-gray-700",
        "[&_p]:mb-4 [&_p:last-child]:mb-0",
        "[&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-gray-950",
        "[&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:text-gray-950",
        "[&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc",
        "[&_ol]:mb-4 [&_ol]:ml-6 [&_ol]:list-decimal",
        "[&_li]:mb-2 [&_li]:pl-1",
        "[&_a]:font-semibold [&_a]:text-gray-950 [&_a]:underline [&_a]:decoration-gray-400 [&_a]:decoration-1 [&_a]:underline-offset-4",
        "[&_a:hover]:text-black [&_a:hover]:decoration-black",
        className,
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
