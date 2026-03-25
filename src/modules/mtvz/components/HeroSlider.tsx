"use client";

import Link from "next/link";
import { Button, Heading, Text } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

/**
 * Hero component for the homepage.
 * Replaces the previous slider with a single, strong fishing-focused message.
 */
export default function HeroSlider() {
    return (
        <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden bg-black text-white">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0 select-none">
                <img
                    src="https://images.unsplash.com/photo-1544521848-f94602bb63c4?auto=format&fit=crop&q=80&w=2600"
                    alt="Fishing Background"
                    className="w-full h-full object-cover object-[70%_center] lg:object-right brightness-[0.4] lg:brightness-[0.6]"
                />
                {/* Gradient overlay for text readability on smaller screens and mobile blending */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent lg:via-black/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto flex items-center px-6 md:px-12 lg:px-24">
                <div className="w-full lg:w-3/5 flex flex-col items-start gap-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="space-y-4">
                        <Heading
                            level="h1"
                            className="text-[42px] leading-[1.1] md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white drop-shadow-2xl"
                        >
                            Спининг риболов на <br />
                            <span className="text-ui-fg-interactive">ново ниво</span>
                        </Heading>
                        <Text className="text-lg md:text-2xl text-gray-200 max-w-[540px] leading-relaxed font-medium">
                            Подбрани въдици, макари и примамки за модерния риболовец.
                        </Text>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <LocalizedClientLink href="/categories/spinning-rods" className="w-full sm:w-auto">
                            <Button
                                size="large"
                                className="w-full h-14 px-10 text-base font-bold uppercase tracking-widest transition-all hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
                            >
                                Разгледай въдиците
                            </Button>
                        </LocalizedClientLink>

                        <LocalizedClientLink href="/categories/spinning-reels" className="w-full sm:w-auto">
                            <Button
                                variant="secondary"
                                size="large"
                                className="w-full h-14 px-10 text-base font-bold uppercase tracking-widest bg-white/5 border-white/20 text-white backdrop-blur-md transition-all hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
                            >
                                Виж макарите
                            </Button>
                        </LocalizedClientLink>
                    </div>
                </div>
            </div>

            {/* Subtle bottom fade to blend with the content below */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </section>
    );
}

