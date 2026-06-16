import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"
import { generateProductMetadata } from "@lib/seo/product-metadata"
import { generateProductJsonLd } from "@lib/seo/product-schema"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

export const dynamic = "force-dynamic"

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products[0])

  if (!product) {
    notFound()
  }

  const metadata = generateProductMetadata(product)

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `/${params.countryCode}/products/${product.handle}`,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  if (!pricedProduct) {
    notFound()
  }

  const jsonLd = generateProductJsonLd({
    product: pricedProduct,
    countryCode: params.countryCode,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
        images={pricedProduct.images || []}
        isAuthenticated={false}
      />
    </>
  )
}
