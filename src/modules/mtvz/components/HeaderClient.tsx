"use client"

/**
 * HeaderClient
 *
 * Client shell for the header. Manages the hamburger open/close state
 * and renders the CategoriesDrawer.
 *
 * Receives pre-fetched top-level categories from the server Header component
 * so no client-side data fetching is needed here.
 */

import { useState } from "react"
import Link from "next/link"
import { HttpTypes } from "@medusajs/types"
import CategoriesDrawer from "./CategoriesDrawer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import DesktopNav from "./DesktopNav"

type HeaderClientProps = {
    categories: HttpTypes.StoreProductCategory[]
}

export default function HeaderClient({ categories }: HeaderClientProps) {
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <>
            <header className="w-full bg-white h-[70px] flex items-center px-6 lg:px-12 border-b border-gray-100 shadow-sm relative">

                {/* MOBILE LEFT: Hamburger */}
                <button
                    onClick={() => setDrawerOpen(true)}
                    className="flex lg:hidden items-center justify-center w-10 h-10 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Отвори категории"
                    aria-expanded={drawerOpen}
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* LOGO */}
                <Link
                    href="/"
                    className="absolute left-1/2 -translate-x-1/2 lg:static lg:left-0 lg:translate-x-0 flex items-center transition-all"
                    aria-label="MTVZ начало"
                >
                    <div className="w-[120px] h-[38px] bg-black text-white flex items-center justify-center font-bold text-xl tracking-widest uppercase select-none">
                        MTVZ
                    </div>
                </Link>

                {/* DESKTOP CENTER: Nav */}
                <DesktopNav categories={categories} />

                {/* RIGHT: Search + Account + Cart */}
                <div className="flex items-center gap-5 ml-auto">
                    {/* Search */}
                    <button
                        className="text-black hover:opacity-70 transition-opacity"
                        aria-label="Търсене"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>

                    {/* Account — hidden on small mobile */}
                    <LocalizedClientLink
                        href="/account"
                        className="hidden sm:block text-black hover:opacity-70 transition-opacity"
                        aria-label="Акаунт"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </LocalizedClientLink>

                    {/* Cart */}
                    <LocalizedClientLink
                        href="/cart"
                        className="relative text-black hover:opacity-70 transition-opacity"
                        aria-label="Количка"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                    </LocalizedClientLink>
                </div>
            </header>

            {/* Categories drawer — portal-mounted, always accessible */}
            <CategoriesDrawer
                categories={categories}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
        </>
    )
}
