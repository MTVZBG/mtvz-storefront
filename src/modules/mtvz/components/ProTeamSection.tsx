import Link from "next/link";
import SectionHeading from "./SectionHeading";
import Divider from "./Divider";

interface ProMember {
    id: string;
    name: string;
    role: string;
    bgClass: string;
}

const proMembers: ProMember[] = [
    { id: "1", name: "ALEXANDER R.", role: "Alpine Climber", bgClass: "bg-slate-700" },
    { id: "2", name: "SARAH V.", role: "Trail Runner", bgClass: "bg-neutral-600" },
    { id: "3", name: "MARCUS T.", role: "Extreme Snowboarder", bgClass: "bg-zinc-800" },
    { id: "4", name: "JESSICA MILO", role: "Free Diver", bgClass: "bg-sky-900" },
];

export function ProCard({ member }: { member: ProMember }) {
    return (
        <div className="relative group overflow-hidden w-[85vw] md:w-[45vw] lg:w-[32%] shrink-0 aspect-[3/4] snap-start bg-gray-200 cursor-pointer">
            <div className={`absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105 ${member.bgClass} flex items-center justify-center`}>
                <div className="w-full h-full opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/30 to-black"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end">
                <h4 className="text-white text-3xl font-black uppercase tracking-wide leading-none mb-1">
                    {member.name}
                </h4>
                <p className="text-gray-300 font-medium tracking-widest text-sm uppercase">
                    {member.role}
                </p>
            </div>
        </div>
    );
}

export default function ProTeamSection() {
    return (
        <section className="px-6 md:px-12 py-14 md:py-18 bg-white w-full max-w-7xl mx-auto overflow-hidden">
            <SectionHeading
                title="MTVZ Pro Team"
                subtitle="Meet the people behind the brand and the products they rely on."
            />

            <div className="mt-7 md:mt-10 relative">
                <div className="flex overflow-x-auto gap-4 lg:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
                    {proMembers.map((member) => (
                        <ProCard key={member.id} member={member} />
                    ))}
                    <div className="w-4 shrink-0 lg:hidden"></div>
                </div>

                {/* Navigation Arrows for UI representation */}
                <div className="hidden lg:flex absolute -top-20 right-0 gap-3">
                    <button className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors" aria-label="Previous">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors" aria-label="Next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="mt-10 flex justify-end">
                <Link href="/pro-team" className="inline-flex items-center justify-between bg-black text-white px-8 text-[13px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors w-full sm:w-[260px] h-[48px]">
                    <span>View Full MTVZ Pro Team</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}
