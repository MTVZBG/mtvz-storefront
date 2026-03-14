"use client"

/**
 * AppProviders
 *
 * Wraps the subtree with all global client-side context providers.
 * This is the single location to register new providers — keeping
 * the root layout.tsx free of client-side provider noise.
 *
 * Current providers:
 * - CompareProvider  (guest-friendly, no auth required)
 * - WishlistProvider (auth-gated; initialAuthenticated is passed from server)
 */

import React, { ReactNode } from "react"
import { CompareProvider } from "@lib/compare"
import { WishlistProvider } from "@lib/wishlist"
import CompareModal from "@modules/products/components/compare-modal"

export default function AppProviders({
    children,
    isAuthenticated = false,
}: {
    children: ReactNode
    isAuthenticated?: boolean
}) {
    return (
        <WishlistProvider initialAuthenticated={isAuthenticated}>
            <CompareProvider>
                {children}
                {/* Compare modal is mounted here so it is always above all page content */}
                <CompareModal />
            </CompareProvider>
        </WishlistProvider>
    )
}
