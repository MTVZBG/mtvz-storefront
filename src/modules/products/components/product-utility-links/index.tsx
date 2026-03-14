/**
 * ProductUtilityLinks
 *
 * A compact row of utility navigation links beneath the buy box.
 * These link to future informational pages (e.g. /shipping, /returns).
 *
 * Future-ready pattern:
 *   Each item has an `href` field. Until real destination pages exist,
 *   href is set to `null`. When a page is created, set the href string —
 *   the component automatically upgrades to a real <a> link without
 *   any JSX changes in the caller.
 *
 * Design:
 *   - Compact single row, no heavy tiles or icon cards
 *   - Visible but not dominant — utility line above/below purchase area
 *   - Subtle divider between items
 *   - Hover underline affordance on desktop; tap-safe on mobile
 */

import LocalizedClientLink from "@modules/common/components/localized-client-link"

// ---------------------------------------------------------------------------
// Data — edit hrefs here when destination pages are ready
// ---------------------------------------------------------------------------
type UtilityLink = {
    label: string
    /** Set to a string path when the destination page exists, null until then */
    href: string | null
    icon: React.ReactNode
}

const UTILITY_LINKS: UtilityLink[] = [
    {
        label: "Сигурно плащане",
        href: "/secure-payment",
        icon: (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        label: "Бърза доставка",
        href: "/fast-shipping",
        icon: (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
        ),
    },
    {
        label: "Лесно връщане",
        href: "/easy-returns",
        icon: (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        ),
    },
    {
        label: "Гаранция",
        href: "/warranty",
        icon: (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        ),
    },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProductUtilityLinks() {
    return (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 pt-5 border-t border-gray-100">
            {UTILITY_LINKS.map((link) => {
                const inner = (
                    <span className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-600 group-hover:text-black transition-colors duration-150">
                        {link.icon}
                        {link.label}
                    </span>
                )

                if (link.href) {
                    return (
                        <LocalizedClientLink
                            key={link.label}
                            href={link.href}
                            className="group underline-offset-2 hover:underline"
                        >
                            {inner}
                        </LocalizedClientLink>
                    )
                }

                // No destination page yet — render as non-navigating, accessible span
                return (
                    <span key={link.label} className="group cursor-default" title="Информация идва скоро">
                        {inner}
                    </span>
                )
            })}
        </div>
    )
}
