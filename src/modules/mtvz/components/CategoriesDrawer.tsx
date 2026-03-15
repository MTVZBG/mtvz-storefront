"use client"

import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { usePathname } from "next/navigation"

type CategoriesDrawerProps = {
    categories: HttpTypes.StoreProductCategory[]
    isOpen: boolean
    onClose: () => void
}

export default function CategoriesDrawer({
    categories,
    isOpen,
    onClose,
}: CategoriesDrawerProps) {
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()

    // Close on route change
    useEffect(() => {
        onClose()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    useEffect(() => {
        setMounted(true)
    }, [])

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (!mounted) return
        document.body.style.overflow = isOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [isOpen, mounted])

    if (!mounted) return null

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={[
                    "fixed inset-0 z-[400] bg-black/50 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                ].join(" ")}
                aria-hidden="true"
            />

            {/* Drawer panel */}
            <div
                className={[
                    "fixed top-0 left-0 z-[401] h-full w-[85vw] max-w-[360px] bg-white shadow-2xl flex flex-col",
                    "transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                ].join(" ")}
                role="dialog"
                aria-modal="true"
                aria-label="Category navigation"
            >
                {/* Drawer header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        Категории
                    </span>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="Затвори менюто"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Category list — scrollable */}
                <nav className="flex-1 overflow-y-auto py-4">
                    {/* All Products link */}
                    <LocalizedClientLink
                        href="/store"
                        className="flex items-center justify-between px-6 py-4 text-[14px] font-bold uppercase tracking-widest text-gray-400 hover:text-black hover:bg-gray-50 transition-colors border-b border-gray-50"
                    >
                        <span>Всички продукти</span>
                        <svg className="w-4 h-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </LocalizedClientLink>

                    {/* Dynamic categories */}
                    {categories.map((cat) => (
                        <CategoryItem key={cat.id} category={cat} />
                    ))}
                </nav>

                {/* Drawer footer */}
                <div className="shrink-0 border-t border-gray-100 px-6 py-5">
                    <LocalizedClientLink
                        href="/account"
                        className="flex items-center gap-3 text-[13px] font-semibold text-gray-500 hover:text-black transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        Моят акаунт
                    </LocalizedClientLink>
                </div>
            </div>
        </>,
        document.body
    )
}

// ---------------------------------------------------------------------------
// Single category row — renders children inline if present
// ---------------------------------------------------------------------------

function CategoryItem({ category }: { category: HttpTypes.StoreProductCategory }) {
    const [expanded, setExpanded] = useState(false)
    const hasChildren = (category.category_children?.length ?? 0) > 0

    return (
        <div className="border-b border-gray-50 last:border-0">
            <div className="flex items-center">
                <LocalizedClientLink
                    href={`/categories/${category.handle}`}
                    className="flex-1 flex items-center px-6 py-4 text-[15px] font-bold uppercase tracking-wide text-[#1a1a1a] hover:text-black hover:bg-gray-50 transition-colors"
                >
                    {category.name}
                </LocalizedClientLink>
                {hasChildren && (
                    <button
                        onClick={() => setExpanded((v) => !v)}
                        className="px-4 py-4 text-gray-400 hover:text-black transition-colors"
                        aria-label={expanded ? "Скрий подкатегории" : "Покажи подкатегории"}
                    >
                        <svg
                            className={["w-4 h-4 transition-transform duration-200", expanded ? "rotate-90" : ""].join(" ")}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Children */}
            {hasChildren && expanded && (
                <div className="bg-gray-50 border-t border-gray-100">
                    {category.category_children!.map((child) => (
                        <LocalizedClientLink
                            key={child.id}
                            href={`/categories/${child.handle}`}
                            className="flex items-center px-10 py-3 text-[13px] font-semibold text-gray-500 hover:text-black hover:bg-gray-100 transition-colors uppercase tracking-wide"
                        >
                            {child.name}
                        </LocalizedClientLink>
                    ))}
                </div>
            )}
        </div>
    )
}
