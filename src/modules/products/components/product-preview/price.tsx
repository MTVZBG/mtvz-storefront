import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <>
      {price.price_type === "sale" && (
        <span
          className="line-through text-ui-fg-muted"
          data-testid="original-price"
        >
          {price.original_price}
        </span>
      )}

      <span
        className={`text-ui-fg-muted ${
          price.price_type === "sale" ? "text-ui-fg-interactive" : ""
        }`}
        data-testid="price"
      >
        {price.calculated_price}
      </span>
    </>
  )
}