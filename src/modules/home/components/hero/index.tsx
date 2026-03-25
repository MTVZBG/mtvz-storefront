import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type HeroProps = {
  title: string
  subtitle: string
  image: string
  ctaText: string
  ctaLink: string
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, image, ctaText, ctaLink }) => {
  return (
    <div className="h-[380px] small:h-[500px] medium:h-[70vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle overflow-hidden">
      {/* Background Image with Light E-commerce Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-[center_30%] small:object-center"
        />
        <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 small:p-32 gap-4 small:gap-6">
        <div className="max-w-[800px] animate-in fade-in slide-in-from-bottom-4 duration-1000 mt-8 small:mt-0">
          <Heading
            level="h1"
            className="text-[38px] small:text-[48px] medium:text-[64px] leading-[0.95] text-white font-extrabold drop-shadow-md mb-4 small:mb-5 tracking-[-0.03em]"
          >
            {title}
          </Heading>
          <Heading
            level="h2"
            className="text-[18px] small:text-[20px] leading-snug text-white/95 font-semibold mb-8 small:mb-10 max-w-[650px] mx-auto px-2 drop-shadow-sm"
          >
            {subtitle}
          </Heading>

          <div className="flex flex-col small:flex-row items-center justify-center gap-4">
            <LocalizedClientLink href={ctaLink}>
              <Button size="large" className="w-[80vw] max-w-[280px] small:w-auto min-w-[200px] h-12 small:h-14 px-8 small:px-10 text-sm small:text-base font-extrabold uppercase tracking-wider rounded-xl shadow-lg shadow-black/20 transition-transform active:scale-95 hover:scale-[1.02]">
                {ctaText}
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

