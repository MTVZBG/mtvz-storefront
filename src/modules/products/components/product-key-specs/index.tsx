import { HttpTypes } from "@medusajs/types"

export default function ProductKeySpecs({ product }: { product: HttpTypes.StoreProduct }) {
    // compact specs intended for quick view
    const specs = [
        { label: "Material", value: product.material },
        { label: "Weight", value: product.weight ? `${product.weight}g` : null },
        { label: "Type", value: product.type?.value },
    ].filter(s => !!s.value)

    if (specs.length === 0) return null;

    return (
        <div className="flex flex-col gap-2 mb-6 pt-6 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Key Specs</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {specs.map(spec => (
                    <div key={spec.label} className="flex flex-col">
                        <span className="text-gray-400 text-xs font-semibold">{spec.label}</span>
                        <span className="text-[#1a1a1a] text-[15px] font-bold mt-1">{spec.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
