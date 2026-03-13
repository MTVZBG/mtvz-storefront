"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface SlideData {
    id: number;
    preHeadline?: string;
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
    badgeText?: string;
    specs?: string[];
    bgClass: string;
    styleMode: "slide1" | "slide2" | "slide3" | "slide4";
}

const slides: SlideData[] = [
    {
        id: 1,
        preHeadline: "THE NEW STANDARD",
        headline: "ELEVATE YOUR GAME",
        subheadline: "Precision engineered for peak performance.",
        ctaText: "Shop Now",
        ctaLink: "#",
        bgClass: "bg-gradient-to-r from-neutral-900 to-neutral-700",
        styleMode: "slide1",
    },
    {
        id: 2,
        badgeText: "PRO EXCLUSIVE",
        headline: "STUDIO RENDER",
        subheadline: "Next generation materials",
        specs: ["Carbon Fiber", "Ultra-light", "Breathable"],
        ctaText: "Discover",
        ctaLink: "#",
        bgClass: "bg-gradient-to-b from-blue-900 to-indigo-950",
        styleMode: "slide2",
    },
    {
        id: 3,
        headline: "IGNITE",
        subheadline: "Unleash explosive power.",
        ctaText: "Get Yours",
        ctaLink: "#",
        bgClass: "bg-gradient-to-br from-orange-900 via-stone-900 to-black",
        styleMode: "slide3",
    },
    {
        id: 4,
        preHeadline: "WINTER COLLECTION",
        headline: "ARCTIC APPAREL",
        subheadline: "Stay warm. Keep moving.",
        ctaText: "Shop Winter",
        ctaLink: "#",
        bgClass: "bg-gradient-to-t from-zinc-900 to-zinc-800",
        styleMode: "slide4",
    },
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <div className="relative w-full h-[580px] lg:h-[600px] overflow-hidden bg-black">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        } ${slide.bgClass}`}
                >
                    {/* Overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-black/30" />

                    <div className="relative z-20 w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">

                        {slide.styleMode === "slide1" && (
                            <div className="max-w-2xl">
                                {slide.preHeadline && (
                                    <p className="text-white/80 text-sm tracking-[0.2em] mb-4 font-medium uppercase">
                                        {slide.preHeadline}
                                    </p>
                                )}
                                <h2 className="text-5xl md:text-7xl font-bold italic text-white uppercase tracking-tight mb-4 leading-none">
                                    {slide.headline}
                                </h2>
                                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                                    {slide.subheadline}
                                </p>
                                <Link
                                    href={slide.ctaLink}
                                    className="inline-flex items-center justify-center bg-white text-black px-10 py-4 text-sm font-bold tracking-wider uppercase hover:bg-gray-100 transition-colors"
                                >
                                    {slide.ctaText}
                                </Link>
                            </div>
                        )}

                        {slide.styleMode === "slide2" && (
                            <div className="max-w-2xl flex flex-col items-center text-center mx-auto">
                                {slide.badgeText && (
                                    <span className="border border-white/30 text-white text-xs px-3 py-1 mb-6 tracking-widest uppercase">
                                        {slide.badgeText}
                                    </span>
                                )}
                                <h2 className="text-5xl md:text-6xl font-black italic text-white uppercase mb-4">
                                    {slide.headline}
                                </h2>
                                <p className="text-xl text-white/80 mb-6">{slide.subheadline}</p>
                                {slide.specs && (
                                    <div className="flex items-center gap-4 text-white/60 text-sm mb-8">
                                        {slide.specs.map((spec, i) => (
                                            <span key={i} className="flex items-center">
                                                {spec}
                                                {i < slide.specs!.length - 1 && (
                                                    <span className="mx-4 text-white/20">|</span>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <Link
                                    href={slide.ctaLink}
                                    className="inline-flex items-center justify-center bg-white text-black px-10 py-4 text-sm font-bold tracking-wider uppercase hover:bg-gray-100 transition-colors"
                                >
                                    {slide.ctaText}
                                </Link>
                            </div>
                        )}

                        {slide.styleMode === "slide3" && (
                            <div className="max-w-2xl md:ml-auto md:text-right">
                                <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-2" style={{ textShadow: "0 0 40px rgba(255,85,0,0.5)" }}>
                                    {slide.headline}
                                </h2>
                                <p className="text-2xl text-white/90 font-medium mb-3">{slide.subheadline}</p>
                                <p className="text-white/70 mb-8 max-w-md md:ml-auto">
                                    Engineered with maximum power return and dynamic stability mechanics.
                                </p>
                                <Link
                                    href={slide.ctaLink}
                                    className="inline-flex items-center justify-center bg-[#FF5500] text-white rounded-full px-10 py-4 text-sm font-bold tracking-wider uppercase hover:bg-[#ff6a1a] transition-colors"
                                >
                                    {slide.ctaText}
                                </Link>
                            </div>
                        )}

                        {slide.styleMode === "slide4" && (
                            <div className="max-w-xl">
                                {slide.preHeadline && (
                                    <p className="text-white/80 text-sm tracking-widest mb-4 font-semibold uppercase relative inline-block">
                                        <span className="absolute -left-12 top-1/2 w-8 h-[1px] bg-white/50"></span>
                                        {slide.preHeadline}
                                    </p>
                                )}
                                <h2 className="text-5xl md:text-6xl font-bold text-white uppercase mb-4 leading-[1.1]">
                                    {slide.headline}
                                </h2>
                                <p className="text-lg text-white/80 mb-8">
                                    {slide.subheadline}
                                </p>
                                <Link
                                    href={slide.ctaLink}
                                    className="inline-flex items-center justify-center bg-white text-black px-10 py-4 text-sm font-bold tracking-wider uppercase hover:bg-gray-100 transition-colors"
                                >
                                    {slide.ctaText}
                                </Link>
                            </div>
                        )}

                    </div>
                </div>
            ))}

            {/* Navigation Dots */}
            <div className="absolute bottom-[20px] left-0 right-0 z-30 flex justify-center gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`w-[10px] h-[10px] rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white" : "bg-white/40 hover:bg-white/60"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
