"use client"

import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import { clx } from "@medusajs/ui"

type ProductDetailsProps = {
    product: HttpTypes.StoreProduct
}

const ProductDetailsSection = ({ product }: ProductDetailsProps) => {
    const [activeTab, setActiveTab] = useState("description")

    const tabs = [
        { id: "description", label: "Описание" },
        { id: "specifications", label: "Спецификации" },
        { id: "reviews", label: "Мнения" },
    ]

    return (
        <div className="w-full mt-10 md:mt-24 border-t border-gray-100 pt-10 md:pt-16 mb-24 max-w-[1000px] mx-auto px-6 md:px-12">
            {/* Mobile && Desktop Tab Header */}
            <div className="flex w-full md:gap-8 gap-0 border-b border-gray-200 justify-between md:justify-start">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={clx(
                            "flex-1 md:flex-none pb-4 text-[13px] md:text-[15px] font-bold uppercase tracking-[0.1em] md:tracking-widest transition-colors relative outline-none",
                            {
                                "text-black": activeTab === tab.id,
                                "text-gray-400 hover:text-black": activeTab !== tab.id,
                            }
                        )}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-black" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content Panels */}
            <div className="mt-8 md:mt-12 flex flex-col gap-4">

                {/* Description */}
                <div className={clx({ "hidden": activeTab !== "description", "block": activeTab === "description" })}>
                    <div className="text-gray-600 text-[15px] md:text-base leading-relaxed max-w-3xl">
                        {product.description || "Няма налично описание за този продукт."}
                    </div>
                </div>

                {/* Specifications Section */}
                <div className={clx({ "hidden": activeTab !== "specifications", "block": activeTab === "specifications" })}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                        <SpecRow label="Материал" value={product.material} />
                        <SpecRow label="Страна на произход" value={product.origin_country} />
                        <SpecRow label="Тип" value={product.type?.value} />
                        <SpecRow label="Тегло" value={product.weight ? `${product.weight} g` : null} />
                        <SpecRow label="Размери" value={product.length && product.width && product.height ? `${product.length}L x ${product.width}W x ${product.height}H` : null} />
                    </div>
                </div>

                {/* Reviews Section Placeholder */}
                <div className={clx({ "hidden": activeTab !== "reviews", "block": activeTab === "reviews" })}>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 bg-gray-50 rounded-2xl p-8 md:p-12">
                        <div className="flex flex-col items-center">
                            <span className="text-5xl md:text-6xl font-bold text-[#1a1a1a]">4.8</span>
                            <div className="flex gap-[3px] text-[#FFB800] mt-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-400 font-medium mt-2">83 мнения</span>
                        </div>

                        <div className="flex-1 flex flex-col gap-2 w-full max-w-sm">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-gray-400 w-3">{star}</span>
                                    <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#FFB800]" style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '5%' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 text-center text-gray-500 text-sm">
                        Мненията ще се появят тук след интегриране на система за обратна връзка.
                    </div>
                </div>

            </div>
        </div>
    )
}

const SpecRow = ({ label, value }: { label: string, value: string | null | undefined }) => (
    <div className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors px-2">
        <span className="text-gray-500 text-[14px] font-semibold">{label}</span>
        <span className="text-[#1a1a1a] text-[15px] font-bold text-right">{value || "-"}</span>
    </div>
)

export default ProductDetailsSection
