"use client"

import { useState } from "react"
import CategorySidebar from "./category-sidebar"

export default function MobileFilterDrawer() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="lg:hidden w-full mb-6">
            <button
                onClick={() => setIsOpen(true)}
                className="w-full py-3 flex items-center justify-center gap-2 border border-black/20 font-bold uppercase tracking-widest text-[14px]"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"></path>
                </svg>
                Filter By
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex">
                    <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={() => setIsOpen(false)} />

                    <div className="relative w-[320px] max-w-[85vw] h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="font-bold text-lg uppercase tracking-widest text-black">Filters</h2>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 hidden-scrollbar">
                            <CategorySidebar />
                        </div>

                        <div className="p-6 border-t border-gray-100">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-[13px] hover:bg-gray-800 transition-colors"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
