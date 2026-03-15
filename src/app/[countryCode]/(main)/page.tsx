import { Metadata } from "next"

import HeroSlider from "@modules/mtvz/components/HeroSlider"
import HomeTrustBar from "@modules/home/components/home-trust-bar"
import HomeCategoryGrid from "@modules/home/components/home-category-grid"
import HomeBestsellers from "@modules/home/components/home-bestsellers"
import SectionHeading from "@modules/mtvz/components/SectionHeading"

export const metadata: Metadata = {
  title: "MTVZ | Риболовни принадлежности",
  description:
    "Онлайн магазин за въдици, макари и примамки за спининг риболов.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  return (
    <main className="flex flex-col w-full bg-white selection:bg-black selection:text-white overflow-hidden">

      <HeroSlider />

      <section className="py-14 md:py-18 bg-white w-full">
        <div className="px-6 md:px-12 w-full max-w-7xl mx-auto">
          <SectionHeading
            title="Категории"
            subtitle="Разгледайте основните групи продукти."
          />
        </div>

        <div className="mt-7 md:mt-10 w-full max-w-7xl mx-auto px-6 md:px-12">
          <HomeCategoryGrid />
        </div>
      </section>

      <HomeBestsellers countryCode={params.countryCode} />

      <HomeTrustBar />

    </main>
  )
}