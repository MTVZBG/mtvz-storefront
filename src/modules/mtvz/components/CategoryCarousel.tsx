import Link from "next/link";
import { HttpTypes } from "@medusajs/types";
import { listCategories } from "@lib/data/categories";

export function CategoryCard({ category }: { category: HttpTypes.StoreProductCategory }) {
    // Fallback atmospheric background
    const bgImage = "url('https://images.unsplash.com/photo-1544642236-fa2a893c52a9?q=80&w=800&auto=format&fit=crop')";

    return (
        <Link
            href={`/categories/${category.handle}`}
            className="group relative block w-[82vw] md:w-[45vw] lg:w-[32%] shrink-0 min-h-[360px] aspect-[4/5] md:min-h-0 md:aspect-[380/245] overflow-hidden bg-gray-200 rounded-2xl md:rounded-none shadow-md md:shadow-none snap-start"
        >
            <div
                className="absolute inset-0 w-full h-full transition-transform duration-700 md:group-hover:scale-105 bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: bgImage, filter: 'grayscale(30%)' }}
            >
                <div className="w-full h-full opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
            </div>
            {/* Smooth dark gradient overlay for readable text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10 transition-opacity duration-300 md:group-hover:bg-black/30" />

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-white text-[28px] md:text-[24px] font-bold tracking-tight md:uppercase md:tracking-widest md:text-center leading-tight">
                    {category.name}
                </h3>
                {/* Mobile-only helper text for better UX */}
                <div className="mt-2 md:hidden flex items-center text-white/80 text-[15px] font-medium group-hover:text-white transition-colors">
                    Shop collection
                    <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </svg>
                </div>
            </div>
        </Link>
    );
}

export default async function CategoryCarousel() {
    // Fetch categories from Medusa
    const categories = await listCategories();

    if (!categories || categories.length === 0) {
        return null; // Return null if no categories exist
    }

    // Usually we only want to show top-level categories on the home page
    const topLevelCategories = categories.filter(c => !c.parent_category_id);

    // If there are no top-level categories, fallback to all categories
    const displayCategories = topLevelCategories.length > 0 ? topLevelCategories : categories;

    return (
        <div className="w-full">
            <div className="flex overflow-x-auto gap-4 lg:gap-6 pb-4 md:pb-8 snap-x snap-mandatory hide-scrollbar px-4 md:px-12">
                {displayCategories.map((cat) => (
                    <CategoryCard key={cat.id} category={cat} />
                ))}
                {/* Adds padding to the end of scroll area to balance the leading padding */}
                <div className="w-2 md:w-4 shrink-0 lg:hidden block"></div>
            </div>
        </div>
    );
}
