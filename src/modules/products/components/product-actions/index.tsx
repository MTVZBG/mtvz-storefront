"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button, clx } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import ProductStockStatus from "../product-stock-status"
import MobileStickyPurchaseBar from "../mobile-sticky-purchase-bar"
import { useRouter } from "next/navigation"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity,
      countryCode,
    })

    setIsAdding(false)
  }

  return (
    <>
      <div className="flex flex-col gap-y-2 mt-4" ref={actionsRef}>
        <div>
          <ProductPrice product={product} variant={selectedVariant} />

          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col mt-6">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <ProductStockStatus inStock={inStock} selectedVariant={selectedVariant} />

          <div className="flex items-center gap-3 w-full">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-gray-300 rounded-lg h-14 bg-white overflow-hidden min-w-[120px]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 h-full text-lg hover:bg-gray-100 transition-colors focus:outline-none"
                disabled={!inStock || !!disabled || isAdding}
              >
                -
              </button>
              <span className="flex-1 text-center font-bold text-[15px]">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 h-full text-lg hover:bg-gray-100 transition-colors focus:outline-none"
                disabled={!inStock || !!disabled || isAdding}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={
                !inStock ||
                !selectedVariant ||
                !!disabled ||
                isAdding ||
                !isValidVariant
              }
              className={clx(
                "flex-1 h-14 rounded-lg font-bold uppercase tracking-widest transition-colors flex items-center justify-center",
                {
                  "bg-black text-white hover:bg-gray-900": inStock && selectedVariant && isValidVariant && !disabled && !isAdding,
                  "bg-gray-200 text-gray-500 cursor-not-allowed": !inStock || !selectedVariant || disabled || isAdding || !isValidVariant
                }
              )}
              data-testid="add-product-button"
            >
              {isAdding ? "Adding..." :
                (!selectedVariant && !options
                  ? "Select variant"
                  : !inStock || !isValidVariant
                    ? "Out of stock"
                    : "Add to cart")}
            </button>
          </div>
        </div>

        <MobileStickyPurchaseBar
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
