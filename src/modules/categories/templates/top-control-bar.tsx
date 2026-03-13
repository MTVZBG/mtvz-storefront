"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type TopControlBarProps = {
    sortBy: SortOptions
}

const sortOptions = [
    { value: "created_at", label: "Latest Arrivals" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
]

export default function TopControlBar({ sortBy }: TopControlBarProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [sortOpen, setSortOpen] = useState(false)
    const currentSortLabel = sortOptions.find((s) => s.value === sortBy)?.label || "Latest Arrivals"

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    const handleSortChange = (value: string) => {
        router.push(`${pathname}?${createQueryString("sortBy", value)}`)
        setSortOpen(false)
    }

    return (
        <div className="flex justify-between items-center mb-6 px-1 md:px-0 bg-white">
            {/* Items per page / Display logic mock */}
            <div className="flex items-center gap-2 text-[14px] text-gray-500 font-medium">
                <span>View as:</span>
                <button className="hidden md:flex p-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                        <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                    </svg>
                </button>
            </div>

            {/* Sort By Dropdown */}
            <div className="relative">
                <button
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-[14px] font-semibold text-[#1a1a1a] uppercase bg-white hover:border-black transition-colors"
                    onClick={() => setSortOpen(!sortOpen)}
                >
                    {currentSortLabel}
                    <svg
                        className={`w-4 h-4 ml-2 transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {sortOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden z-[60]">
                        <ul className="flex flex-col py-1">
                            {sortOptions.map((option) => (
                                <li key={option.value}>
                                    <button
                                        className={`w-full text-left px-4 py-2.5 text-[14px] font-medium transition-colors hover:bg-gray-50 ${sortBy === option.value ? 'text-black font-bold bg-gray-50' : 'text-gray-600'}`}
                                        onClick={() => handleSortChange(option.value)}
                                    >
                                        {option.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}
