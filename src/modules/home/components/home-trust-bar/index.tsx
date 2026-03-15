import { Text } from "@medusajs/ui"
import React from "react"

const TrustItem = ({ emoji, text }: { emoji: string, text: string }) => (
    <div className="flex items-center gap-x-4 p-4 sm:p-6 justify-center sm:justify-start border-b sm:border-b-0 sm:border-r last:border-0 border-gray-100 group transition-colors hover:bg-gray-50/50">
        <div className="flex-shrink-0 text-2xl group-hover:scale-110 transition-transform duration-300">
            {emoji}
        </div>
        <Text className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a]">
            {text}
        </Text>
    </div>
)

export default function HomeTrustBar() {
    const items = [
        {
            emoji: "🚚",
            text: "Бърза доставка",
        },
        {
            emoji: "✔",
            text: "Подбрани риболовни продукти",
        },
        {
            emoji: "🔒",
            text: "Сигурно пазаруване",
        },
        {
            emoji: "📞",
            text: "Коректно обслужване",
        },
    ]

    return (
        <div className="w-full bg-white py-2 border-y border-gray-100 shadow-sm relative z-20">
            <div className="content-container max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 px-0 sm:px-6">
                {items.map((item, index) => (
                    <TrustItem key={index} emoji={item.emoji} text={item.text} />
                ))}
            </div>
        </div>
    )
}
