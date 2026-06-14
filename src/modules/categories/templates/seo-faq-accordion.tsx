"use client"

import { useState } from "react"
import { cx } from "@lib/util/cx"
import type { CategorySeoFaqItem } from "@lib/data/category-seo"

type SEOFaqAccordionProps = {
  faq: CategorySeoFaqItem[]
}

export default function SEOFaqAccordion({ faq }: SEOFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const visibleFaq = faq.filter(
    (item) => item.question?.trim() && item.answer?.trim()
  )

  if (!visibleFaq.length) {
    return null
  }

  return (
    <section className="w-full max-w-3xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-center">
        Често задавани въпроси
      </h2>

      <div className="flex flex-col border-t border-gray-200">
        {visibleFaq.map((item, index) => {
          const isOpen = openIndex === index

          return (
            <div key={`${item.question}-${index}`} className="border-b border-gray-200">
              <button
                type="button"
                className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span
                  className={cx(
                    "font-semibold text-[15px] group-hover:text-black transition-colors",
                    {
                      "text-black": isOpen,
                      "text-gray-700": !isOpen,
                    }
                  )}
                >
                  {item.question}
                </span>

                <span
                  className={cx(
                    "ml-6 flex-shrink-0 text-gray-400 transform transition-transform duration-200",
                    {
                      "rotate-180": isOpen,
                    }
                  )}
                >
                  ↓
                </span>
              </button>

              <div
                className={cx("overflow-hidden transition-all duration-300 ease-in-out", {
                  "max-h-[500px] opacity-100 pb-5": isOpen,
                  "max-h-0 opacity-0": !isOpen,
                })}
              >
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
