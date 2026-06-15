import type { HttpTypes } from "@medusajs/types"

type ProductDetailsProps = {
    product: HttpTypes.StoreProduct
}

const ProductDetailsSection = ({ product }: ProductDetailsProps) => {
    return (
        <div className="w-full mt-10 md:mt-24 border-t border-gray-100 pt-10 md:pt-16 mb-24 max-w-[1000px] mx-auto px-6 md:px-12">
            <div className="mtvz-product-details-tabs">
                <input
                    id="mtvz-product-details-description"
                    name="mtvz-product-details-tabs"
                    type="radio"
                    className="sr-only"
                    defaultChecked
                />
                <input
                    id="mtvz-product-details-specifications"
                    name="mtvz-product-details-tabs"
                    type="radio"
                    className="sr-only"
                />
                <input
                    id="mtvz-product-details-reviews"
                    name="mtvz-product-details-tabs"
                    type="radio"
                    className="sr-only"
                />

                {/* Mobile && Desktop Tab Header */}
                <div className="mtvz-product-details-tab-header flex w-full md:gap-8 gap-0 border-b border-gray-200 justify-between md:justify-start">
                    <label
                        htmlFor="mtvz-product-details-description"
                        className="mtvz-product-details-tab flex-1 md:flex-none pb-4 text-[13px] md:text-[15px] font-bold uppercase tracking-[0.1em] md:tracking-widest transition-colors relative outline-none text-gray-400 hover:text-black border-b-2 border-transparent mb-[-1px] cursor-pointer"
                    >
                        Описание
                    </label>
                    <label
                        htmlFor="mtvz-product-details-specifications"
                        className="mtvz-product-details-tab flex-1 md:flex-none pb-4 text-[13px] md:text-[15px] font-bold uppercase tracking-[0.1em] md:tracking-widest transition-colors relative outline-none text-gray-400 hover:text-black border-b-2 border-transparent mb-[-1px] cursor-pointer"
                    >
                        Спецификации
                    </label>
                    <label
                        htmlFor="mtvz-product-details-reviews"
                        className="mtvz-product-details-tab flex-1 md:flex-none pb-4 text-[13px] md:text-[15px] font-bold uppercase tracking-[0.1em] md:tracking-widest transition-colors relative outline-none text-gray-400 hover:text-black border-b-2 border-transparent mb-[-1px] cursor-pointer"
                    >
                        Мнения
                    </label>
                </div>

                {/* Tab Content Panels */}
                <div className="mtvz-product-details-panels mt-8 md:mt-12 flex flex-col gap-4">
                    {/* Description */}
                    <div className="mtvz-product-details-panel mtvz-product-details-description-panel">
                        <div className="text-gray-600 text-[15px] md:text-base leading-relaxed max-w-3xl">
                            {product.description || "Няма налично описание за този продукт."}
                        </div>
                    </div>

                    {/* Specifications Section */}
                    <div className="mtvz-product-details-panel mtvz-product-details-specifications-panel">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                            <SpecRow label="Материал" value={product.material} />
                            <SpecRow label="Страна на произход" value={product.origin_country} />
                            <SpecRow label="Тип" value={product.type?.value} />
                            <SpecRow label="Тегло" value={product.weight ? `${product.weight} g` : null} />
                            <SpecRow
                                label="Размери"
                                value={
                                    product.length && product.width && product.height
                                        ? `${product.length}L x ${product.width}W x ${product.height}H`
                                        : null
                                }
                            />
                        </div>
                    </div>

                    {/* Reviews Section Placeholder */}
                    <div className="mtvz-product-details-panel mtvz-product-details-reviews-panel">
                        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
                            <p className="text-gray-600 text-[15px] md:text-base leading-relaxed">
                                Мненията ще се появят тук след интегриране на система за обратна връзка.
                            </p>
                        </div>
                    </div>
                </div>

                <style>{`
                    .mtvz-product-details-panel {
                        display: none;
                    }

                    #mtvz-product-details-description:checked ~ .mtvz-product-details-tab-header label[for="mtvz-product-details-description"],
                    #mtvz-product-details-specifications:checked ~ .mtvz-product-details-tab-header label[for="mtvz-product-details-specifications"],
                    #mtvz-product-details-reviews:checked ~ .mtvz-product-details-tab-header label[for="mtvz-product-details-reviews"] {
                        color: #000;
                        border-bottom-color: #000;
                    }

                    #mtvz-product-details-description:focus-visible ~ .mtvz-product-details-tab-header label[for="mtvz-product-details-description"],
                    #mtvz-product-details-specifications:focus-visible ~ .mtvz-product-details-tab-header label[for="mtvz-product-details-specifications"],
                    #mtvz-product-details-reviews:focus-visible ~ .mtvz-product-details-tab-header label[for="mtvz-product-details-reviews"] {
                        outline: 2px solid #000;
                        outline-offset: 4px;
                    }

                    #mtvz-product-details-description:checked ~ .mtvz-product-details-panels .mtvz-product-details-description-panel,
                    #mtvz-product-details-specifications:checked ~ .mtvz-product-details-panels .mtvz-product-details-specifications-panel,
                    #mtvz-product-details-reviews:checked ~ .mtvz-product-details-panels .mtvz-product-details-reviews-panel {
                        display: block;
                    }
                `}</style>
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