import { Dialog, Transition } from "@headlessui/react"
import { clx } from "@medusajs/ui"
import React, { Fragment, useMemo, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import useToggleState from "@lib/hooks/use-toggle-state"
import X from "@modules/common/icons/x"
import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "../product-actions/option-select"
import { HttpTypes } from "@medusajs/types"
import { isSimpleProduct } from "@lib/util/product"
import SmartImage from "@modules/common/components/smart-image"

export type MobileStickyPurchaseBarProps = {
    product: HttpTypes.StoreProduct
    variant?: HttpTypes.StoreProductVariant
    options: Record<string, string | undefined>
    updateOptions: (title: string, value: string) => void
    inStock?: boolean
    handleAddToCart: () => void
    isAdding?: boolean
    show: boolean
    optionsDisabled: boolean
}

const MobileStickyPurchaseBar: React.FC<MobileStickyPurchaseBarProps> = ({
    product,
    variant,
    options,
    updateOptions,
    inStock,
    handleAddToCart,
    isAdding,
    show,
    optionsDisabled,
}) => {
    const { state, open, close } = useToggleState()

    // SSR-safe portal mount — only render portal after client hydration
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])

    const price = getProductPrice({
        product: product,
        variantId: variant?.id,
    })

    const selectedPrice = useMemo(() => {
        if (!price) {
            return null
        }
        const { variantPrice, cheapestPrice } = price

        return variantPrice || cheapestPrice || null
    }, [price])

    const isSimple = isSimpleProduct(product)

    if (!mounted) return null

    return createPortal(
        <>
            <div
                className={clx("lg:hidden inset-x-0 bottom-0 fixed z-[200]", {
                    "pointer-events-none": !show,
                })}
            >
                <Transition
                    as={Fragment}
                    show={show}
                    enter="ease-in-out duration-300 transform"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="ease-in duration-300 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"
                >
                    <div
                        className="bg-white flex justify-between items-center p-4 border-t border-gray-200 drop-shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom,16px)]"
                        data-testid="mobile-actions"
                    >
                        {/* Left Box: Thumbnail + Price */}
                        <div className="flex items-center gap-3">
                            {product.thumbnail && (
                                <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                    <SmartImage src={product.thumbnail} alt={product.title} className="absolute inset-0 w-full h-full object-cover" fill sizes="48px" />
                                </div>
                            )}
                            <div className="flex flex-col">
                                {selectedPrice ? (
                                    <div className="flex flex-col">
                                        <span
                                            className={clx("text-lg font-bold text-[#1a1a1a] leading-none", {
                                                "text-red-600": selectedPrice.price_type === "sale",
                                            })}
                                        >
                                            {selectedPrice.calculated_price}
                                        </span>
                                        {selectedPrice.price_type === "sale" && (
                                            <span className="line-through text-xs text-gray-400 mt-0.5">
                                                {selectedPrice.original_price}
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <div className="h-6 w-16 bg-gray-100 animate-pulse rounded" />
                                )}
                            </div>
                        </div>

                        {/* Right Box: Buttons */}
                        <div className={clx("flex gap-2 w-1/2 max-w-[200px]", {
                            "!w-auto flex-1 ml-4": isSimple,
                        })}>
                            {!isSimple && (
                                <button
                                    onClick={open}
                                    className="flex-1 flex items-center justify-center border border-gray-300 rounded text-[#1a1a1a] font-bold text-xs uppercase tracking-widest px-2"
                                >
                                    {variant ? 'Редактирай' : 'Избери'}
                                </button>
                            )}
                            <button
                                onClick={handleAddToCart}
                                disabled={!inStock || isAdding || (!isSimple && !variant)}
                                className={clx("flex-[2] h-12 rounded bg-black text-white font-bold text-xs uppercase tracking-widest text-center flex items-center justify-center", {
                                    "bg-gray-200 text-gray-500 cursor-not-allowed": !inStock || isAdding || (!isSimple && !variant)
                                })}
                            >
                                {(!isSimple && !variant) ? "Избери" : (!inStock ? "Изчерпан" : "Добави в количката")}
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>

            {/* Options Modal */}
            <Transition appear show={state} as={Fragment}>
                <Dialog as="div" className="relative z-[75]" onClose={close}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed bottom-0 inset-x-0">
                        <div className="flex min-h-full h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Panel
                                    className="w-full h-full transform overflow-hidden text-left flex flex-col gap-y-3"
                                    data-testid="mobile-actions-modal"
                                >
                                    <div className="w-full flex justify-end pr-6">
                                        <button
                                            onClick={close}
                                            className="bg-white w-12 h-12 rounded-full text-ui-fg-base flex justify-center items-center shadow-lg"
                                            data-testid="close-modal-button"
                                        >
                                            <X />
                                        </button>
                                    </div>
                                    <div className="bg-white px-6 py-12 pb-[env(safe-area-inset-bottom,48px)] rounded-t-3xl shadow-2xl">
                                        <h3 className="text-xl font-bold mb-6 text-center uppercase tracking-widest">Избери вариант</h3>
                                        {(product.variants?.length ?? 0) > 1 && (
                                            <div className="flex flex-col gap-y-8">
                                                {(product.options || []).map((option) => {
                                                    return (
                                                        <div key={option.id}>
                                                            <OptionSelect
                                                                option={option}
                                                                current={options[option.id]}
                                                                updateOption={updateOptions}
                                                                title={option.title ?? ""}
                                                                disabled={optionsDisabled}
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}

                                        <button
                                            onClick={close}
                                            className="w-full h-14 bg-black text-white rounded font-bold uppercase tracking-widest mt-10"
                                        >
                                            Готово
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>,
        document.body
    )
}

export default MobileStickyPurchaseBar
