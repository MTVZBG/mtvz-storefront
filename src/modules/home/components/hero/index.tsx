import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-black overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544551763-47a0160a221b?auto=format&fit=crop&q=80&w=2070"
          alt="Риболов Бул"
          className="w-full h-full object-cover grayscale-[0.1] brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6 small:p-32 gap-6">
        <div className="max-w-[720px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Heading
            level="h1"
            className="text-4xl small:text-7xl leading-[1.1] text-white font-bold drop-shadow-2xl mb-6 tracking-tight"
          >
            Спининг риболов на <span className="text-ui-fg-interactive">ново ниво</span>
          </Heading>
          <Heading
            level="h2"
            className="text-lg small:text-2xl leading-relaxed text-gray-200 font-normal mb-10 max-w-[600px] mx-auto"
          >
            Подбрани въдици, макари и примамки за модерния риболовец.
          </Heading>

          <div className="flex flex-col small:flex-row items-center justify-center gap-4">
            <LocalizedClientLink href="/categories/spinning-rods">
              <Button size="large" className="w-full small:w-auto min-w-[200px] h-14 text-base font-bold uppercase tracking-wider">
                Виж въдиците
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/categories/spinning-reels">
              <Button
                variant="secondary"
                size="large"
                className="w-full small:w-auto min-w-[200px] h-14 text-base font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border-white/20 backdrop-blur-md transition-all duration-300"
              >
                Виж макарите
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

