import { Heading, Text } from "@medusajs/ui"
import { CheckCircleSolid } from "@medusajs/icons"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="small:sticky small:top-[120px] small:h-fit flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0 ">
      <div className="w-full bg-white flex flex-col">
        <Divider className="my-6 small:hidden" />
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular items-baseline"
        >
          В количката
        </Heading>
        <Divider className="my-6" />
        <CartTotals totals={cart} />
        <ItemsPreviewTemplate cart={cart} />
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>

        <Divider className="my-6" />

        <ul className="flex flex-col gap-y-4 pb-4">
          <li className="flex items-center gap-x-3 text-ui-fg-subtle txt-small">
            <CheckCircleSolid className="text-ui-fg-interactive" />
            <Text>Плащане при доставка</Text>
          </li>
          <li className="flex items-center gap-x-3 text-ui-fg-subtle txt-small">
            <CheckCircleSolid className="text-ui-fg-interactive" />
            <Text>14 дни право на връщане</Text>
          </li>
          <li className="flex items-center gap-x-3 text-ui-fg-subtle txt-small">
            <CheckCircleSolid className="text-ui-fg-interactive" />
            <Text>Бърза доставка от България</Text>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CheckoutSummary
