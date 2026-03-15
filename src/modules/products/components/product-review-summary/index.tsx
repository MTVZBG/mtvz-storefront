/**
 * ProductReviewSummary
 *
 * Shared, reusable review summary row: star icons + "rating (count reviews)" text.
 *
 * Currently renders hardcoded defaults (4.8 / 83) while a real reviews
 * integration is pending. When dynamic data is available, pass `rating`
 * and `count` as props — no other changes needed.
 *
 * Future-ready:
 *   - Swap hardcoded defaults for live values from a reviews API/provider
 *   - Support partial stars by switching to a computed fill-width approach
 *   - Add a `href` prop to make the count a link to the reviews tab
 */

type ProductReviewSummaryProps = {
    /** Numeric rating (0–5). Defaults to 4.8 while hardcoded. */
    rating?: number
    /** Total review count. Defaults to 83 while hardcoded. */
    count?: number
    className?: string
}

const STAR_PATH =
    "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"

export default function ProductReviewSummary({
    rating = 4.8,
    count = 83,
    className = "",
}: ProductReviewSummaryProps) {
    return (
        <div className={["flex items-center gap-2 mb-2", className].join(" ")}>
            {/* Star icons */}
            <div className="flex gap-[2px] text-[#FFB800]">
                {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                    >
                        <path fillRule="evenodd" d={STAR_PATH} clipRule="evenodd" />
                    </svg>
                ))}
            </div>

            {/* Rating + count label */}
            <span className="text-[13px] font-medium text-gray-500">
                {rating.toFixed(1)} ({count} мнения)
            </span>
        </div>
    )
}
