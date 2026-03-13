export default function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div className="flex flex-col items-start w-full max-w-7xl mx-auto">
            <h2 className="text-[36px] md:text-[40px] lg:text-[48px] font-bold md:font-semibold text-[#1a1a1a] leading-tight tracking-tight">
                {title}
            </h2>
            <p className="text-[17px] md:text-[20px] font-medium text-gray-500 mt-2 md:mt-3.5 max-w-[820px] leading-relaxed">
                {subtitle}
            </p>
        </div>
    );
}
