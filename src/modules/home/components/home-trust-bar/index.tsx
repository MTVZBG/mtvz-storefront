import { Text } from "@medusajs/ui"
import React from "react"

const TrustItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-y-2 sm:gap-x-3 px-2 sm:px-6 py-4 justify-center group">
        <div className="text-ui-fg-subtle group-hover:text-ui-fg-interactive transition-colors duration-300">
            {icon}
        </div>
        <Text className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.05em] sm:tracking-[0.1em] text-gray-600 transition-colors group-hover:text-black">
            {text}
        </Text>
    </div>
)

export default function HomeTrustBar() {
    const items = [
        {
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
            ),
            text: "Бърза доставка",
        },
        {
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            ),
            text: "Подбрани риболовни продукти",
        },
        {
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
            ),
            text: "Сигурно пазаруване",
        },
        {
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.81 12.81 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
            ),
            text: "Коректно обслужване",
        },
    ]

    return (
        <section className="w-full py-6 md:py-12 px-6 md:px-12 bg-white flex justify-center">
            <div className="w-full max-w-7xl bg-gray-50 rounded-2xl border border-gray-100 p-4 md:p-0 shadow-sm overflow-hidden">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 md:gap-y-0 md:divide-x divide-gray-200/50">
                    {items.map((item, index) => (
                        <TrustItem key={index} icon={item.icon} text={item.text} />
                    ))}
                </div>
            </div>
        </section>
    )
}
