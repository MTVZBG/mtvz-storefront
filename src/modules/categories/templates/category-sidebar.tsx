"use client"

import { useState } from "react"
import { clx } from "@medusajs/ui"

const filterGroups = [
    {
        title: "CATEGORIES",
        options: [
            { label: "Baitcasting Reels", count: 24 },
            { label: "Spinning Reels", count: 18 },
            { label: "Spincast Reels", count: 8 },
            { label: "Round Baitcast Reels", count: 4 },
            { label: "Ice Fishing Reels", count: 2 },
        ]
    },
    {
        title: "PRICE RANGE",
        options: [
            { label: "Under $50", count: 12 },
            { label: "$50 - $100", count: 28 },
            { label: "$100 - $200", count: 15 },
            { label: "Over $200", count: 5 },
        ]
    },
    {
        title: "RETRIEVE",
        options: [
            { label: "Left", count: 20 },
            { label: "Right", count: 18 },
        ]
    },
    {
        title: "WATER TYPE",
        options: [
            { label: "Freshwater", count: 35 },
            { label: "Saltwater", count: 25 },
        ]
    },
    {
        title: "GEAR RATIO",
        options: [
            { label: "5.1:1 - 6.0:1", count: 10 },
            { label: "6.1:1 - 7.0:1", count: 22 },
            { label: "7.1:1 - 8.0:1", count: 14 },
            { label: "8.1:1 +", count: 8 },
        ]
    }
]

export default function CategorySidebar() {
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
        CATEGORIES: true,
        "PRICE RANGE": true,
        RETRIEVE: true,
        "WATER TYPE": true,
        "GEAR RATIO": true,
    })

    const toggleGroup = (title: string) => {
        setOpenGroups(prev => ({ ...prev, [title]: !prev[title] }))
    }

    return (
        <div className="w-full h-full flex flex-col gap-6 select-none bg-white">
            {filterGroups.map((group) => {
                const isOpen = openGroups[group.title]

                return (
                    <div key={group.title} className="border-b border-gray-100 pb-5">
                        <button
                            className="w-full flex items-center justify-between focus:outline-none mb-3"
                            onClick={() => toggleGroup(group.title)}
                        >
                            <h3 className="font-bold text-[14px] uppercase tracking-widest text-[#1a1a1a]">
                                {group.title}
                            </h3>
                            <span className="text-gray-400">
                                {isOpen ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                                        <path d="M5 12h14"></path>
                                    </svg>
                                ) : (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                                        <path d="M12 5v14M5 12h14"></path>
                                    </svg>
                                )}
                            </span>
                        </button>
                        <div
                            className={clx("flex flex-col gap-3 overflow-hidden transition-all duration-300", {
                                "max-h-[500px] opacity-100 mt-4": isOpen,
                                "max-h-0 opacity-0": !isOpen
                            })}
                        >
                            {group.options.map((option, idx) => (
                                <label key={idx} className="flex items-center group cursor-pointer">
                                    <div className="relative flex items-center justify-center w-[18px] h-[18px] border border-gray-300 group-hover:border-black transition-colors rounded-sm mr-3">
                                        <input type="checkbox" className="absolute opacity-0 cursor-pointer w-full h-full" />
                                        {/* SVG checkmark for checked state (mock) */}
                                    </div>
                                    <span className="text-[14px] text-gray-700 group-hover:text-black transition-colors flex-1">
                                        {option.label}
                                    </span>
                                    <span className="text-[13px] text-gray-400">
                                        ({option.count})
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
