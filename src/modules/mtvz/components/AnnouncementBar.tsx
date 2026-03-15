import Link from "next/link";

export default function AnnouncementBar() {
    return (
        <div className="w-full bg-black h-[30px] flex items-center justify-center">
            <Link href="/" className="text-white text-[13px] font-normal hover:underline">
                Безплатна доставка при поръчки над 50 €
            </Link>
        </div>
    );
}
