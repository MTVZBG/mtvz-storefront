import Link from "next/link";
import AnnouncementBar from "./AnnouncementBar";

export default function Header() {
    const navLinks = [
        { name: "Products", href: "#" },
        { name: "Collections", href: "#" },
        { name: "Innovation", href: "#" },
        { name: "About Us", href: "#" },
        { name: "Support", href: "#" },
        { name: "Rewards & Benefits", href: "#" },
    ];

    return (
        <div className="sticky top-0 z-50 w-full flex flex-col group">
            <AnnouncementBar />
            <header className="w-full bg-white h-[70px] flex items-center justify-between px-6 lg:px-12 border-b border-gray-100 shadow-sm transition-all duration-300">
                {/* LOGO Placeholder */}
                <Link href="/" className="flex items-center">
                    <div className="w-[160px] h-[40px] bg-black text-white flex items-center justify-center font-bold text-xl tracking-widest uppercase">
                        MTVZ
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[15px] font-medium text-[#333333] hover:text-black transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Icons */}
                <div className="flex items-center gap-6">
                    <button className="text-black hover:opacity-70 transition-opacity" aria-label="Search">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>

                    <button className="hidden sm:block text-black hover:opacity-70 transition-opacity" aria-label="Account">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </button>

                    <Link href="/cart" className="relative text-black hover:opacity-70 transition-opacity" aria-label="Cart">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span className="absolute -top-1.5 -right-2 bg-[#FF5500] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            0
                        </span>
                    </Link>
                </div>
            </header>
        </div>
    );
}
