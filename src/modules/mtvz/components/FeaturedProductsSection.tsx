import Link from "next/link";
import SectionHeading from "./SectionHeading";

export function FeaturedBanner({
    reversed,
    bgClass,
    preTitle,
    title,
    subtitle,
    ctaText,
}: {
    reversed?: boolean;
    bgClass: string;
    preTitle: string;
    title: string;
    subtitle: string;
    ctaText: string;
}) {
    return (
        <div className={`w-full flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} mb-8 lg:mb-12 shadow-sm border border-gray-100`}>
            <div className={`w-full lg:w-2/3 aspect-square lg:aspect-auto min-h-[500px] lg:min-h-[600px] ${bgClass} relative overflow-hidden group`}>
                <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-transparent duration-500" />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent lg:hidden" />
            </div>
            <div className="w-full lg:w-1/3 flex flex-col items-start justify-center p-10 md:p-14 lg:p-16 bg-white relative z-10 -min-mt-20 lg:mt-0">
                <span className="text-sm tracking-[0.2em] mb-4 text-gray-500 font-bold uppercase">{preTitle}</span>
                <h3 className="text-4xl md:text-5xl font-black uppercase text-[#1a1a1a] mb-4 leading-[1.0] tracking-tight">{title}</h3>
                <p className="text-gray-600 mb-8 text-[15px] leading-relaxed max-w-sm">{subtitle}</p>
                <Link href="/collections" className="inline-flex items-center justify-center bg-black text-white text-[13px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors w-full sm:w-[160px] h-[48px] rounded-full">
                    {ctaText}
                </Link>
            </div>
        </div>
    );
}

export default function FeaturedProductsSection() {
    return (
        <section className="px-6 md:px-12 py-14 md:py-18 bg-white w-full max-w-7xl mx-auto">
            <SectionHeading
                title="Featured Products"
                subtitle="Highlighted selections chosen for performance, reliability, and design."
            />

            <div className="mt-7 md:mt-10 flex flex-col">
                <FeaturedBanner
                    bgClass="bg-[#e2e8f0] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#f8fafc] to-[#cbd5e1]"
                    preTitle="Summit Series"
                    title="ULTRA LITE APEX"
                    subtitle="Engineered for high altitude and severe conditions. The lightest protection on the mountain."
                    ctaText="SHOP NOW"
                />
                <FeaturedBanner
                    reversed={true}
                    bgClass="bg-[#27272a] bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#52525b] to-[#18181b]"
                    preTitle="Field Tested"
                    title="NIGHT HAWK VISION"
                    subtitle="Unparalleled clarity and contrast for dawn-to-dusk operations and adventures."
                    ctaText="DISCOVER"
                />
            </div>
        </section>
    );
}
