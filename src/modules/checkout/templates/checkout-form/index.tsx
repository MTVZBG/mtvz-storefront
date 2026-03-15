import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <div className="w-full bg-white p-6 small:p-10 rounded-lg shadow-sm border border-ui-border-base flex flex-col gap-y-12">
      <div>
        <Addresses cart={cart} customer={customer} />
      </div>

      <Divider />

      <div>
        <Shipping cart={cart} availableShippingMethods={shippingMethods} />
      </div>

      <Divider />

      <div>
        <Payment cart={cart} availablePaymentMethods={paymentMethods} />
      </div>

      <Divider />

      <div>
        <Review cart={cart} />
      </div>
    </div>
  )
}

const Divider = () => <div className="w-full h-px bg-ui-border-base" />

