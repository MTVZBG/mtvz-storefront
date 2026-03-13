"use client"

import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import { clx } from "@medusajs/ui"
import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("specifications")

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "shipping", label: "Shipping & Returns" },
    { id: "reviews", label: "Reviews" },
  ]

  return (
    <div className="w-full">
      {/* Desktop Tabs Header */}
      <div className="hidden md:flex gap-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clx(
              "pb-4 text-[15px] font-bold uppercase tracking-widest transition-colors relative outline-none",
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

      {/* Mobile Accordion & Desktop Content */}
      <div className="md:mt-8 flex flex-col gap-4 md:gap-0">
        {/* Description Section */}
        <div className={clx("md:hidden", { "md:block": activeTab === "description" })}>
          <button
            className="md:hidden w-full text-left font-bold text-lg border-b border-gray-200 pb-2 mb-2 uppercase tracking-widest"
            onClick={() => setActiveTab(activeTab === "description" ? "" : "description")}
          >
            Description
          </button>
          <div className={clx("text-gray-600 text-[15px] leading-relaxed", { "hidden md:block": activeTab !== "description" })}>
            {product.description || "No description available for this product."}
          </div>
        </div>

        {/* Specifications Section */}
        <div className={clx("md:hidden", { "md:block": activeTab === "specifications" })}>
          <button
            className="md:hidden w-full text-left font-bold text-lg border-b border-gray-200 pb-2 mb-2 mt-4 uppercase tracking-widest"
            onClick={() => setActiveTab(activeTab === "specifications" ? "" : "specifications")}
          >
            Specifications
          </button>
          <div className={clx("grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12", { "hidden md:grid": activeTab !== "specifications" })}>
            <SpecRow label="Material" value={product.material} />
            <SpecRow label="Origin" value={product.origin_country} />
            <SpecRow label="Type" value={product.type?.value} />
            <SpecRow label="Weight" value={product.weight ? `${product.weight} g` : null} />
            <SpecRow label="Dimensions" value={product.length && product.width && product.height ? `${product.length}L x ${product.width}W x ${product.height}H` : null} />
          </div>
        </div>

        {/* Shipping Section */}
        <div className={clx("md:hidden", { "md:block": activeTab === "shipping" })}>
          <button
            className="md:hidden w-full text-left font-bold text-lg border-b border-gray-200 pb-2 mb-2 mt-4 uppercase tracking-widest"
            onClick={() => setActiveTab(activeTab === "shipping" ? "" : "shipping")}
          >
            Shipping & Returns
          </button>
          <div className={clx("grid grid-cols-1 md:grid-cols-3 gap-8", { "hidden md:grid": activeTab !== "shipping" })}>
            <div className="flex flex-col gap-3">
              <FastDelivery />
              <span className="font-bold text-[15px] uppercase tracking-widest text-[#1a1a1a]">Fast Delivery</span>
              <p className="text-gray-500 text-sm leading-relaxed">Your package will arrive in 3-5 business days at your pick up location or in the comfort of your home.</p>
            </div>
            <div className="flex flex-col gap-3">
              <Refresh />
              <span className="font-bold text-[15px] uppercase tracking-widest text-[#1a1a1a]">Simple Exchanges</span>
              <p className="text-gray-500 text-sm leading-relaxed">Is the fit not quite right? No worries - we'll exchange your product for a new one.</p>
            </div>
            <div className="flex flex-col gap-3">
              <Back />
              <span className="font-bold text-[15px] uppercase tracking-widest text-[#1a1a1a]">Easy Returns</span>
              <p className="text-gray-500 text-sm leading-relaxed">Just return your product and we'll refund your money. No questions asked.</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className={clx("md:hidden", { "md:block": activeTab === "reviews" })}>
          <button
            className="md:hidden w-full text-left font-bold text-lg border-b border-gray-200 pb-2 mb-2 mt-4 uppercase tracking-widest"
            onClick={() => setActiveTab(activeTab === "reviews" ? "" : "reviews")}
          >
            Reviews
          </button>
          <div className={clx("flex flex-col gap-8", { "hidden md:flex": activeTab !== "reviews" })}>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">4.8</span>
                <div className="flex gap-[2px] text-[#FFB800] mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-medium mt-1">83 Reviews</span>
              </div>
              <div className="flex-1 flex flex-col gap-1 max-w-xs">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-500 w-2">{star}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FFB800]" style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '5%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <p className="text-[15px] text-gray-600 font-medium text-center">Reviews will appear here once connected to the reviews provider.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

const SpecRow = ({ label, value }: { label: string, value: string | null | undefined }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100">
    <span className="text-gray-500 text-[14px] font-semibold">{label}</span>
    <span className="text-[#1a1a1a] text-[15px] font-bold">{value || "-"}</span>
  </div>
)

export default ProductTabs
