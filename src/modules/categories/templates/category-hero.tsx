import { HttpTypes } from "@medusajs/types"

export default function CategoryHero({ category }: { category: HttpTypes.StoreProductCategory }) {
    // Use a generic atmospheric placeholder image for now, ensuring dark overly is applied.
    const bgImage = "url('https://images.unsplash.com/photo-1544642236-fa2a893c52a9?q=80&w=2600&auto=format&fit=crop')"

    return (
        <div className="relative w-full h-[180px] md:h-[300px] flex items-center justify-center overflow-hidden mb-8 md:mb-12">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full grayscale-[50%]"
                style={{ backgroundImage: bgImage }}
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 text-center px-6">
                <h1 className="text-white font-bold text-4xl md:text-5xl uppercase tracking-widest text-shadow-md drop-shadow-lg">
                    {category.name}
                </h1>
                {category.description && (
                    <p className="mt-4 text-white/90 text-sm md:text-base max-w-2xl mx-auto font-medium tracking-wide">
                        {category.description}
                    </p>
                )}
            </div>
        </div>
    )
}
