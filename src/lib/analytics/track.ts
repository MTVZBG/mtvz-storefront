import { HttpTypes } from "@medusajs/types"

export type AnalyticsEvent =
    | "add_to_cart"
    | "view_cart"
    | "remove_from_cart"
    | "begin_checkout"
    | "checkout_started"
    | "checkout_address_completed"
    | "checkout_shipping_completed"
    | "checkout_payment_method_selected"
    | "checkout_review_reached"
    | "purchase_attempt"
    | "purchase"

export type AnalyticsPayload = {
    cart_id?: string
    step?: string
    currency?: string
    value?: number
    items?: any[]
    user_logged_in?: boolean
    shipping_method?: string
    payment_method?: string
    order_id?: string
    [key: string]: any
}

/**
 * MTVZ Analytics Tracking Utility
 * 
 * Centralized place to log analytics events. 
 * Currently logs to console, but can be easily mapped to 
 * GA4, Segment, Mixpanel, etc.
 */
export const trackEvent = (event: AnalyticsEvent, payload: AnalyticsPayload = {}) => {
    const timestamp = new Date().toISOString()

    if (process.env.NODE_ENV === "development") {
        console.group(`[Analytics] ${event}`)
        console.log("Timestamp:", timestamp)
        console.log("Payload:", payload)
        console.groupEnd()
    }

    // Example for future GA4/DataLayer integration:
    // window.dataLayer = window.dataLayer || [];
    // window.dataLayer.push({ event, ...payload });
}

export const formatCartItems = (cart: HttpTypes.StoreCart | null) => {
    return cart?.items?.map((item) => ({
        item_id: item.variant_id,
        item_name: item.title,
        variant: item.variant?.title,
        quantity: item.quantity,
        price: item.unit_price,
    })) || []
}

export const getBasePayload = (cart: HttpTypes.StoreCart | null, customer?: HttpTypes.StoreCustomer | null) => {
    if (!cart) return {}
    return {
        cart_id: cart.id,
        currency: cart.currency_code,
        value: (cart.total || 0) / 100, // Medusa uses cents
        items: formatCartItems(cart),
        user_logged_in: !!customer,
    }
}
