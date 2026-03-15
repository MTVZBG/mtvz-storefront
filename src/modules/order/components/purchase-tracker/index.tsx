"use client"

import { useEffect, useRef } from "react"
import { trackEvent } from "@lib/analytics/track"
import { HttpTypes } from "@medusajs/types"

/**
 * Client-side component to track successful purchase on the order confirmation page.
 * Since the order placement redirects from a server action, this is the most reliable
 * place to track the final 'purchase' event. 
 */
export default function PurchaseTracker({ order }: { order: HttpTypes.StoreOrder }) {
    const tracked = useRef(false)

    useEffect(() => {
        if (!tracked.current) {
            trackEvent("purchase", {
                order_id: order.id,
                display_id: order.display_id,
                currency: order.currency_code,
                value: (order.total || 0) / 100,
                email: order.email,
                items: order.items?.map((item) => ({
                    item_id: item.variant_id,
                    item_name: item.title,
                    quantity: item.quantity,
                    price: item.unit_price,
                })),
                shipping_method: order.shipping_methods?.[0]?.name,
                payment_method: order.payment_collections?.[0]?.payment_sessions?.[0]?.provider_id
            })
            tracked.current = true
        }
    }, [order.id])

    return null
}
