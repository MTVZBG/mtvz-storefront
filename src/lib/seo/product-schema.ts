const SITE_URL = "https://mtvz.bg"

export const generateProductJsonLd = ({
  product,
  countryCode,
}: {
  product: any
  countryCode: string
}) => {
  const productUrl = `${SITE_URL}/${countryCode}/products/${product.handle}`
  const images = Array.from(
    new Set([
      product.thumbnail,
      ...(product.images?.map((image: any) => image.url) || []),
    ].filter(Boolean))
  )

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || product.title,
    image: images,
    sku: product.variants?.[0]?.sku || product.handle,
    brand: {
      "@type": "Brand",
      name: "MTVZ",
    },
    url: productUrl,
  }
}
