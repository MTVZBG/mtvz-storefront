"use client"

import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { useCompare, CompareItem, MAX_COMPARE_ITEMS } from "@lib/compare"
import SmartImage from "@modules/common/components/smart-image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function StarRow({ rating }: { rating: number | null }) {
    if (rating === null) {
        return <span className="text-gray-400 text-sm">—</span>
    }
    return (
        <div className="flex items-center gap-1">
            <div className="flex gap-[2px] text-[#FFB800]">
                {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={i <= Math.round(rating) ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-3.5 h-3.5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                        />
                    </svg>
                ))}
            </div>
            <span className="text-sm font-bold text-[#1a1a1a]">{rating.toFixed(1)}</span>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Spec merging — build a unified sorted key list across all compared items
// ---------------------------------------------------------------------------

function mergeSpecKeys(items: CompareItem[]): string[] {
    const keySet = new Set<string>()
    items.forEach((item) => {
        Object.keys(item.comparableSpecs).forEach((k) => keySet.add(k))
    })
    return Array.from(keySet)
}

// ---------------------------------------------------------------------------
// Main modal
// ---------------------------------------------------------------------------

export default function CompareModal() {
    const { items, removeItem, clearCompare, isModalOpen, closeModal } = useCompare()
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])

    if (!mounted || !isModalOpen) return null

    const specKeys = mergeSpecKeys(items)

    const modalContent = (
        // Backdrop
        <div
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8"
            aria-modal="true"
            role="dialog"
        >
            {/* Semi-transparent backdrop — page still visible at edges */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={closeModal}
            />

            {/* Modal panel — ~85% width, up to 960px max, vertically scrollable */}
            <div className="relative z-10 w-full max-w-[960px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-gray-100 shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-[#1a1a1a] tracking-tight">Compare Products</h2>
                        <p className="text-sm text-gray-400 mt-0.5">
                            {items.length} of {MAX_COMPARE_ITEMS} selected
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {items.length > 0 && (
                            <button
                                onClick={clearCompare}
                                className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
                            >
                                Clear all
                            </button>
                        )}
                        <button
                            onClick={closeModal}
                            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            aria-label="Close compare"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Scrollable content */}
                <div className="overflow-auto flex-1">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <svg className="w-12 h-12 text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-gray-500 font-medium">No products selected for comparison.</p>
                            <p className="text-gray-400 text-sm mt-1">Use the Compare button on product cards or pages.</p>
                        </div>
                    ) : (
                        <table className="w-full border-collapse text-sm">
                            <colgroup>
                                <col className="w-[140px] md:w-[180px]" />
                                {items.map((item) => (
                                    <col key={item.id} />
                                ))}
                            </colgroup>

                            {/* Product cards row */}
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="px-4 py-5 text-left text-xs font-bold uppercase tracking-widest text-gray-400 align-bottom">
                                        Product
                                    </th>
                                    {items.map((item) => (
                                        <th key={item.id} className="px-4 py-5 align-top text-left">
                                            <div className="flex flex-col gap-2 relative">
                                                {/* Remove button */}
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                    aria-label={`Remove ${item.title}`}
                                                >
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>

                                                {/* Thumbnail */}
                                                <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                                    {item.thumbnail ? (
                                                        <SmartImage
                                                            src={item.thumbnail}
                                                            alt={item.title}
                                                            className="absolute inset-0 w-full h-full object-cover"
                                                            fill
                                                            sizes="200px"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Title */}
                                                <LocalizedClientLink
                                                    href={`/products/${item.handle}`}
                                                    className="font-semibold text-[#1a1a1a] text-sm leading-tight hover:underline"
                                                    onClick={closeModal}
                                                >
                                                    {item.title}
                                                </LocalizedClientLink>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {/* Price row */}
                                <CompareRow label="Price">
                                    {items.map((item) => (
                                        <td key={item.id} className="px-4 py-4 align-middle border-b border-gray-50">
                                            <span className="font-bold text-[#1a1a1a] text-base">
                                                {item.price ?? "—"}
                                            </span>
                                        </td>
                                    ))}
                                </CompareRow>

                                {/* Site Rating */}
                                <CompareRow label="Site Rating">
                                    {items.map((item) => (
                                        <td key={item.id} className="px-4 py-4 align-middle border-b border-gray-50">
                                            <StarRow rating={item.siteRating} />
                                        </td>
                                    ))}
                                </CompareRow>

                                {/* Global Rating — reserved placeholder */}
                                <CompareRow label="Global Rating" badge="Coming soon">
                                    {items.map((item) => (
                                        <td key={item.id} className="px-4 py-4 align-middle border-b border-gray-50">
                                            <span className="text-gray-300 text-xs font-medium italic">
                                                Not yet available
                                            </span>
                                        </td>
                                    ))}
                                </CompareRow>

                                {/* Dynamic spec rows */}
                                {specKeys.map((key) => (
                                    <CompareRow key={key} label={key}>
                                        {items.map((item) => (
                                            <td key={item.id} className="px-4 py-4 align-middle border-b border-gray-50">
                                                <span className={item.comparableSpecs[key] ? "text-[#1a1a1a] font-medium" : "text-gray-300"}>
                                                    {item.comparableSpecs[key] ?? "—"}
                                                </span>
                                            </td>
                                        ))}
                                    </CompareRow>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
}

// ---------------------------------------------------------------------------
// Reusable table row helper
// ---------------------------------------------------------------------------

function CompareRow({
    label,
    badge,
    children,
}: {
    label: string
    badge?: string
    children: React.ReactNode
}) {
    return (
        <tr className="hover:bg-gray-50/50 transition-colors">
            <td className="px-4 py-4 font-semibold text-gray-500 text-xs uppercase tracking-widest border-b border-gray-50 align-middle whitespace-nowrap">
                <div className="flex flex-col gap-1">
                    {label}
                    {badge && (
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider border border-gray-200 rounded px-1.5 py-0.5 self-start">
                            {badge}
                        </span>
                    )}
                </div>
            </td>
            {children}
        </tr>
    )
}
