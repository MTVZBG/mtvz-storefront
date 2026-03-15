"use client"

import { useEffect } from "react"
import { trackEvent, getBasePayload } from "@lib/analytics/track"

export default function CartTracking({ cart }: { cart: any }) {
  useEffect(() => {
    if (!cart) return

    trackEvent("view_cart", {
      ...getBasePayload(cart),
    })
  }, [cart])

  return null
}