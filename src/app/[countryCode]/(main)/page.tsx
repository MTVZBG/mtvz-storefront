import { Metadata } from "next"

import HeroSlider from "@modules/mtvz/components/HeroSlider"
import CategoryCarousel from "@modules/mtvz/components/CategoryCarousel"
import FeaturedProductsSection from "@modules/mtvz/components/FeaturedProductsSection"
import ProTeamSection from "@modules/mtvz/components/ProTeamSection"
import LatestArticlesSection from "@modules/mtvz/components/LatestArticlesSection"
import SectionHeading from "@modules/mtvz/components/SectionHeading"
import Divider from "@modules/mtvz/components/Divider"

export const metadata: Metadata = {
  title: "MTVZ | Premium Equipment & Apparel",
  description:
    "Engineered for the elements. Designed for the extreme. MTVZ provides premium gear.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  // We keep the params around to not break NextJS types for NextJS 15 layouts
  const params = await props.params;

  return (
    <main className="flex flex-col w-full bg-white selection:bg-black selection:text-white pb-0 overflow-hidden">
      <HeroSlider />

      <section className="py-14 md:py-18 bg-white w-full">
        <div className="px-6 md:px-12 w-full max-w-7xl mx-auto">
          <SectionHeading
            title="Shop by Category"
            subtitle="Explore the main product groups and find the right gear faster."
          />
        </div>
        <div className="mt-7 md:mt-10 w-full max-w-7xl mx-auto">
          <CategoryCarousel />
        </div>
      </section>

      <FeaturedProductsSection />

      <ProTeamSection />

      <LatestArticlesSection />
    </main>
  )
}
