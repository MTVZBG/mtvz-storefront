"use client"

/**
 * WishlistProducts
 *
 * Account dashboard section that renders all saved wishlist products.
 *
 * This component is auth-gated — it should only render inside the
 * authenticated account layout (the @dashboard slot).
 *
 * Current state: Uses WishlistProvider local state.
 *
 * Future integration path:
 *   Replace `useWishlist().items` with real data fetched from
 *   Medusa customer metadata or a wishlist plugin endpoint.
 *   The component interface will not need to change.
 */

import { useWishlist } from "@lib/wishlist"
import SmartImage from "@modules/common/components/smart-image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function WishlistProducts() {
    const { items, removeItem } = useWishlist()

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <svg
                    className="w-14 h-14 text-gray-200 mb-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">Your wishlist is empty</h3>
                <p className="text-gray-400 text-sm max-w-xs">
                    Save products you love while browsing. They&apos;ll appear here.
                </p>
                <LocalizedClientLink
                    href="/store"
                    className="mt-6 inline-flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded hover:bg-gray-900 transition-colors"
                >
                    Browse Products
                </LocalizedClientLink>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-[#1a1a1a]">
                    Wishlist
                    <span className="ml-2 text-gray-400 text-base font-normal">({items.length})</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="group relative flex flex-col rounded-xl border border-gray-100 overflow-hidden bg-white hover:shadow-md transition-shadow duration-200"
                    >
                        {/* Remove button */}
                        <button
                            onClick={() => removeItem(item.id)}
                            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors shadow-sm"
                            aria-label={`Remove ${item.title} from wishlist`}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </button>

                        {/* Thumbnail */}
                        <LocalizedClientLink
                            href={`/products/${item.handle}`}
                            className="block relative w-full aspect-square bg-gray-100"
                        >
                            {item.thumbnail ? (
                                <SmartImage
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-200">
                                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                        </LocalizedClientLink>

                        {/* Info */}
                        <div className="p-4 flex flex-col gap-2 flex-1">
                            <LocalizedClientLink
                                href={`/products/${item.handle}`}
                                className="font-semibold text-[#1a1a1a] text-sm leading-snug hover:underline"
                            >
                                {item.title}
                            </LocalizedClientLink>

                            {item.price && (
                                <span className="text-base font-bold text-[#1a1a1a]">{item.price}</span>
                            )}

                            <LocalizedClientLink
                                href={`/products/${item.handle}`}
                                className="mt-auto pt-3 w-full text-center border border-black/20 py-2.5 text-[13px] font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white rounded text-black"
                            >
                                View Product
                            </LocalizedClientLink>
                        </div>
                    </div>
                ))}
            </div>

            {/* Future integration notice */}
            <p className="mt-10 text-xs text-gray-300 text-center">
                Wishlist is stored locally in this session. Persistent wishlist sync is coming soon.
            </p>
        </div>
    )
}
