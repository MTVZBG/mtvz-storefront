import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-white pt-20 pb-10 px-6 md:px-12 w-full">
            <div className="flex flex-col md:flex-row gap-16 lg:gap-32 mb-16">
                <div className="w-full md:w-1/3 flex flex-col">
                    <Link href="/" className="inline-block mb-6">
                        <div className="w-[120px] h-[30px] bg-white text-black flex items-center justify-center font-bold text-lg tracking-widest uppercase">
                            MTVZ
                        </div>
                    </Link>
                    <p className="text-gray-400 text-[13px] leading-relaxed max-w-sm mb-8">
                        Engineered for the elements. Designed for the extreme. MTVZ provides premium gear for athletes and adventurers who demand the best from their equipment.
                    </p>
                    <div className="mt-auto flex gap-4">
                        {/* Social Icons Placeholder */}
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

                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 text-[13px] uppercase font-bold tracking-wider">
                    <div className="flex flex-col gap-5">
                        <h5 className="text-gray-600 mb-2">Shop</h5>
                        <Link href="/collections/apparel" className="hover:text-[#ff5500] transition-colors">Apparel</Link>
                        <Link href="/collections/footwear" className="hover:text-[#ff5500] transition-colors">Footwear</Link>
                        <Link href="/collections/equipment" className="hover:text-[#ff5500] transition-colors">Equipment</Link>
                        <Link href="/collections/accessories" className="hover:text-[#ff5500] transition-colors">Accessories</Link>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h5 className="text-gray-600 mb-2">Support</h5>
                        <Link href="/support/contact" className="hover:text-[#ff5500] transition-colors">Contact Us</Link>
                        <Link href="/support/shipping" className="hover:text-[#ff5500] transition-colors">Shipping & Returns</Link>
                        <Link href="/support/faq" className="hover:text-[#ff5500] transition-colors">Help Center</Link>
                        <Link href="/support/warranty" className="hover:text-[#ff5500] transition-colors">Warranty Info</Link>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h5 className="text-gray-600 mb-2">About</h5>
                        <Link href="/about" className="hover:text-[#ff5500] transition-colors">Our Story</Link>
                        <Link href="/careers" className="hover:text-[#ff5500] transition-colors">Careers</Link>
                        <Link href="/pro-team" className="hover:text-[#ff5500] transition-colors">Pro Team</Link>
                        <Link href="/journal" className="hover:text-[#ff5500] transition-colors">Journal</Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold tracking-widest uppercase text-gray-500">
                <p>&copy; 2026 MTVZ EQUIPMENT INC. ALL RIGHTS RESERVED.</p>
                <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
