"use client"

import { useState } from "react"
import { clx } from "@medusajs/ui"

const faqs = [
    {
        question: "What materials are used?",
        answer: "Our gear is crafted from aerospace-grade aluminum, high-density carbon fiber, and military-spec fabrics to ensure minimum weight with maximum durability in extreme environments."
    },
    {
        question: "How should items be maintained?",
        answer: "Always rinse with fresh water after use in saltwater environments. Air dry completely before storage. Store in a cool, dry place away from direct sunlight."
    },
    {
        question: "What is the price range?",
        answer: "Our premium equipment ranges from $45 for essential accessories up to $800+ for professional-grade gear systems, offering options for serious enthusiasts and touring professionals alike."
    },
    {
        question: "Why choose this category?",
        answer: "This curated collection represents the pinnacle of our engineering. Each item has been rigorously field-tested by our Pro Team to guarantee performance when it matters most."
    }
]

export default function SEOFaqAccordion({ categoryName }: { categoryName: string }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <div className="w-full max-w-3xl mx-auto mt-24 mb-16 px-6 md:px-0">
            <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-center">Frequently Asked Questions</h2>
            <div className="flex flex-col border-t border-gray-200">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index
                    return (
                        <div key={index} className="border-b border-gray-200">
                            <button
                                className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                            >
                                <span className={clx("font-semibold text-[15px] group-hover:text-black transition-colors", {
                                    "text-black": isOpen,
                                    "text-gray-700": !isOpen
                                })}>
                                    {faq.question}
                                </span>
                                <span className="ml-6 flex-shrink-0 text-gray-400">
                                    <svg
                                        className={clx("w-5 h-5 transform transition-transform duration-200", {
                                            "rotate-180": isOpen
                                        })}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>
                            <div
                                className={clx("overflow-hidden transition-all duration-300 ease-in-out", {
                                    "max-h-[500px] opacity-100 pb-5": isOpen,
                                    "max-h-0 opacity-0": !isOpen
                                })}
                            >
                                <p className="text-gray-600 text-[15px] leading-relaxed">
                                    {faq.answer.replace("this category", categoryName)}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
