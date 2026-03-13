"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

interface Article {
    id: string;
    title: string;
    category: string;
    bgClass: string;
}

const articlesData: Record<string, Article[]> = {
    "Buying Guides": [
        { id: "1", title: "HOW TO CHOOSE THE RIGHT CLIMBING SHOE", category: "Buying Guides", bgClass: "bg-gray-800" },
        { id: "2", title: "THE ULTIMATE TENT COMPARISON FOR 2026", category: "Buying Guides", bgClass: "bg-zinc-700" },
        { id: "3", title: "WHAT TO LOOK FOR IN A TRAIL RUNNING PACK", category: "Buying Guides", bgClass: "bg-neutral-800" },
    ],
    "Skills": [
        { id: "4", title: "ESSENTIAL KNOTS FOR MOUNTAINEERING", category: "Skills", bgClass: "bg-stone-800" },
        { id: "5", title: "IMPROVING YOUR DOWNHILL TRAIL PACE", category: "Skills", bgClass: "bg-gray-700" },
        { id: "6", title: "SCRAMBLING TECHNIQUES 101", category: "Skills", bgClass: "bg-slate-800" },
    ]
};

const tabs = ["Buying Guides", "Skills", "How To", "Stories", "News"];

export function ArticleCard({ article }: { article: Article }) {
    return (
        <div className="flex flex-col w-[85vw] md:w-[45vw] lg:w-[32%] shrink-0 snap-start group border border-gray-100 bg-white">
            <div className={`w-full aspect-video ${article.bgClass} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 transition-opacity group-hover:bg-transparent duration-500" />
            </div>
            <div className="p-8 flex flex-col items-center text-center flex-1 bg-white">
                <span className="text-[11px] font-bold tracking-[0.15em] text-[#ff5500] uppercase mb-4">
                    {article.category}
                </span>
                <h4 className="text-[22px] font-black uppercase tracking-tight text-[#1a1a1a] mb-8 leading-snug">
                    {article.title}
                </h4>
                <div className="mt-auto">
                    <Link href={`/articles/${article.id}`} className="inline-flex items-center justify-center bg-black text-white px-8 text-[12px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors h-[40px] rounded-full w-[160px]">
                        Learn More
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function LatestArticlesSection() {
    const [activeTab, setActiveTab] = useState("Buying Guides");
    const currentArticles = articlesData[activeTab] || articlesData["Buying Guides"];

    return (
        <section className="px-6 md:px-12 py-14 md:py-18 bg-white w-full max-w-7xl mx-auto overflow-hidden">
            <SectionHeading
                title="Our Latest Articles"
                subtitle="Guides, stories, and useful knowledge from the world of fishing."
            />

            {/* Tabs */}
            <div className="flex overflow-x-auto gap-3 mt-7 md:mt-10 mb-8 md:mb-10 hide-scrollbar pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap px-6 h-[44px] rounded-full text-[13px] font-bold tracking-widest uppercase transition-colors ${activeTab === tab
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-black"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Article Slider */}
            <div className="flex overflow-x-auto gap-4 lg:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
                {currentArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
                {/* Placeholder if less than 3 cards */}
                {currentArticles.length < 3 && (
                    <div className="hidden lg:flex flex-col w-[32%] shrink-0 border border-gray-100 bg-gray-50 items-center justify-center min-h-[400px]">
                        <span className="text-gray-400 font-bold tracking-widest text-sm uppercase">More Content Coming Soon</span>
                    </div>
                )}
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 flex justify-end">
                <Link href="/articles" className="inline-flex items-center justify-between bg-black text-white px-8 text-[13px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors w-full sm:w-[260px] h-[48px]">
                    <span>View More</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}
