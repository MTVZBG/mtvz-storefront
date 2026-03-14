import Link from "next/link"

// ---------------------------------------------------------------------------
// Footer navigation configuration
//
// All footer links are defined here — one location for all updates.
// "href: null" = page not yet created; renders as plain text instead of link.
// ---------------------------------------------------------------------------

type FooterLink = { label: string; href: string | null }

const FOOTER_SHOP: FooterLink[] = [
    { label: "Всички продукти", href: "/store" },
    { label: "Категории", href: "/categories" },
    { label: "Нови продукти", href: "/store" },
    { label: "Промоции", href: "/store" },
]

const FOOTER_SUPPORT: FooterLink[] = [
    { label: "Контакти", href: null },          // FUTURE: "/contact"
    { label: "Сигурно плащане", href: "/secure-payment" },
    { label: "Бърза доставка", href: "/fast-shipping" },
    { label: "Лесно връщане", href: "/easy-returns" },
    { label: "Гаранция", href: "/warranty" },
]

const FOOTER_ABOUT: FooterLink[] = [
    { label: "За нас", href: null }, // FUTURE: "/about"
    { label: "Журнал", href: null }, // FUTURE: "/journal"
]

const FOOTER_LEGAL: FooterLink[] = [
    { label: "Поверителност", href: null }, // FUTURE: "/privacy"
    { label: "Общи условия", href: null }, // FUTURE: "/terms"
]

// ---------------------------------------------------------------------------
// Helper — renders a config link as <Link> or plain <span>
// ---------------------------------------------------------------------------

function FooterNavLink({ link }: { link: FooterLink }) {
    const cls = "hover:text-[#ff5500] transition-colors"
    if (link.href) {
        return <Link href={link.href} className={cls}>{link.label}</Link>
    }
    return <span className="text-gray-500 cursor-default">{link.label}</span>
}

// ---------------------------------------------------------------------------
// Footer component
// ---------------------------------------------------------------------------

export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-white pt-20 pb-10 px-6 md:px-12 w-full">
            <div className="flex flex-col md:flex-row gap-16 lg:gap-32 mb-16">

                {/* Brand column */}
                <div className="w-full md:w-1/3 flex flex-col">
                    <Link href="/" className="inline-block mb-6">
                        <div className="w-[120px] h-[30px] bg-white text-black flex items-center justify-center font-bold text-lg tracking-widest uppercase">
                            MTVZ
                        </div>
                    </Link>
                    <p className="text-gray-400 text-[13px] leading-relaxed max-w-sm mb-8">
                        Оборудване за риболов и природата. MTVZ предлага премиум продукти за ентусиасти, които не правят компромис с качеството.
                    </p>
                    <div className="mt-auto flex gap-4">
                        <div className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer rounded-full">
                            <span className="sr-only">Instagram</span>
                            IG
                        </div>
                        <div className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer rounded-full">
                            <span className="sr-only">YouTube</span>
                            YT
                        </div>
                    </div>
                </div>

                {/* Nav columns */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 text-[13px] uppercase font-bold tracking-wider">

                    {/* Shop */}
                    <div className="flex flex-col gap-5">
                        <h5 className="text-gray-600 mb-2">Магазин</h5>
                        {FOOTER_SHOP.map((link) => (
                            <FooterNavLink key={link.label} link={link} />
                        ))}
                    </div>

                    {/* Support — real trust pages */}
                    <div className="flex flex-col gap-5">
                        <h5 className="text-gray-600 mb-2">Поддръжка</h5>
                        {FOOTER_SUPPORT.map((link) => (
                            <FooterNavLink key={link.label} link={link} />
                        ))}
                    </div>

                    {/* About */}
                    <div className="flex flex-col gap-5">
                        <h5 className="text-gray-600 mb-2">За MTVZ</h5>
                        {FOOTER_ABOUT.map((link) => (
                            <FooterNavLink key={link.label} link={link} />
                        ))}
                    </div>

                </div>
            </div>

            {/* Legal bar */}
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold tracking-widest uppercase text-gray-500">
                <p>&copy; 2026 MTVZ. Всички права запазени.</p>
                <div className="flex gap-6">
                    {FOOTER_LEGAL.map((link) => (
                        <FooterNavLink key={link.label} link={link} />
                    ))}
                </div>
            </div>
        </footer>
    )
}
