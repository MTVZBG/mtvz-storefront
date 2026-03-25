import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const seoContent = {
  title: "Онлайн магазин за риболовни принадлежности",
  paragraphs: [
    <React.Fragment key="p1">
      Добре дошли в MTVZ – вашият доверен партньор за съвременен и резултатен риболов. Ние предлагаме внимателно селектиран асортимент от висококачествени <LocalizedClientLink href="/categories/spinning-rods" className="text-neutral-900 font-medium hover:underline decoration-1 underline-offset-4 transition-all">въдици</LocalizedClientLink>, надеждни <LocalizedClientLink href="/categories/spinning-reels" className="text-neutral-900 font-medium hover:underline decoration-1 underline-offset-4 transition-all">макари</LocalizedClientLink> и специализирани <LocalizedClientLink href="/categories/fishing-lines" className="text-neutral-900 font-medium hover:underline decoration-1 underline-offset-4 transition-all">влакна</LocalizedClientLink>, проектирани да отговорят на изискванията както на начинаещи ентусиасти, така и на опитни професионалисти. Нашата мисия е да ви осигурим оборудване, което съчетава иновация, издръжливост и безкомпромисно представяне във всяка ситуация.
    </React.Fragment>,
    <React.Fragment key="p2">
      Разгледайте богатата ни колекция от доказани <LocalizedClientLink href="/categories/lures" className="text-neutral-900 font-medium hover:underline decoration-1 underline-offset-4 transition-all">примамки</LocalizedClientLink> и полезни <LocalizedClientLink href="/categories/fishing-accessories" className="text-neutral-900 font-medium hover:underline decoration-1 underline-offset-4 transition-all">аксесоари</LocalizedClientLink>, с които всяко излизане сред природата ще бъде подготвено до най-малкия детайл. Гордеем се с внимателно подбрания си каталог, изграден от водещи световни марки, което гарантира максимална сигурност и удоволствие на всяка крачка от вашето следващо риболовно приключение.
    </React.Fragment>
  ]
}

export default function HomeSeoBlock() {
  return (
    <section className="w-full bg-white px-6 md:px-12 pb-16 md:pb-24 pt-8 md:pt-14 border-t border-gray-100">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-lg md:text-xl font-extrabold text-neutral-900 tracking-wide uppercase">
          {seoContent.title}
        </h2>
        <div className="space-y-4 text-sm md:text-base text-gray-500 leading-relaxed font-normal">
          {seoContent.paragraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
