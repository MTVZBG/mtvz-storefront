import type { InfoPageData } from "./types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

/**
 * InfoPageTemplate
 *
 * Single shared layout for all MTVZ informational/trust pages.
 * Used by: /secure-payment, /fast-shipping, /easy-returns, /warranty
 *
 * To add or edit content, update the corresponding content file in ./content/
 * This template file should not need changes for ordinary content updates.
 */
export default function InfoPageTemplate({ page }: { page: InfoPageData }) {
    return (
        <div className="w-full bg-white min-h-screen">
            {/* Top spacer — clears nav */}
            <div className="max-w-[760px] mx-auto px-6 md:px-10 pt-16 pb-24">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-widest text-gray-400 mb-12">
                    <LocalizedClientLink href="/" className="hover:text-black transition-colors">
                        MTVZ
                    </LocalizedClientLink>
                    <span className="text-gray-200">/</span>
                    <span className="text-gray-500">{page.title}</span>
                </nav>

                {/* Page header */}
                <header className="mb-14">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] tracking-tight leading-tight mb-6">
                        {page.title}
                    </h1>
                    <p className="text-[17px] md:text-[18px] text-gray-500 leading-relaxed max-w-prose">
                        {page.intro}
                    </p>
                </header>

                {/* Divider */}
                <hr className="border-gray-100 mb-14" />

                {/* Content sections */}
                <div className="flex flex-col gap-14">
                    {page.sections.map((section, i) => (
                        <section key={i}>
                            <h2 className="text-[18px] md:text-[20px] font-bold text-[#1a1a1a] mb-4 tracking-tight">
                                {section.heading}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {section.body.split("\n\n").map((paragraph, j) => (
                                    <p
                                        key={j}
                                        className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed"
                                    >
                                        {paragraph.trim()}
                                    </p>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                    <p className="text-sm text-gray-400">
                        Имате въпроси? Свържете се с нас по всяко време.
                    </p>
                    <LocalizedClientLink
                        href="/store"
                        className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-black border border-black px-5 py-2.5 rounded hover:bg-black hover:text-white transition-colors shrink-0"
                    >
                        Към магазина
                    </LocalizedClientLink>
                </div>
            </div>
        </div>
    )
}
