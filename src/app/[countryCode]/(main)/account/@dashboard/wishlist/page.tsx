import WishlistProducts from "@modules/account/components/wishlist-products"

export const metadata = {
    title: "Wishlist – My Account | MTVZ",
    description: "View and manage your saved products.",
}

export default function WishlistPage() {
    return (
        <div className="w-full" data-testid="wishlist-page">
            <WishlistProducts />
        </div>
    )
}
