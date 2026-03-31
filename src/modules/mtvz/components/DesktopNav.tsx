"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type DesktopNavProps = {
  categories: HttpTypes.StoreProductCategory[]
}

type MenuAlign = "left" | "center" | "right"

export default function DesktopNav({ categories }: DesktopNavProps) {
  return (
    <nav className="hidden lg:flex items-center h-full ml-10 flex-1">
      <ul className="flex items-center gap-6 h-full">
        {categories.map((category, index) => (
          <DesktopNavItem
            key={category.id}
            category={category}
            align={
              index === 0
                ? "left"
                : index === categories.length - 1
                  ? "right"
                  : "center"
            }
          />
        ))}
      </ul>
    </nav>
  )
}

function DesktopNavItem({
  category,
  align,
}: {
  category: HttpTypes.StoreProductCategory
  align: MenuAlign
}) {
  const hasChildren = (category.category_children?.length ?? 0) > 0

  const childrenList = category.category_children || []
  const groups: Record<string, HttpTypes.StoreProductCategory[]> = {}
  const defaultGroup: HttpTypes.StoreProductCategory[] = []

  childrenList.forEach((child) => {
    const groupName = child.metadata?.menu_group as string
    if (groupName) {
      if (!groups[groupName]) groups[groupName] = []
      groups[groupName].push(child)
    } else {
      defaultGroup.push(child)
    }
  })

  const hasGroups = Object.keys(groups).length > 0 || defaultGroup.length > 0

  const dropdownPositionClass =
    align === "left"
      ? "left-0"
      : align === "right"
        ? "right-0"
        : "left-1/2 -translate-x-1/2"

  return (
    <li className="relative group h-full flex items-center">
      <LocalizedClientLink
        href={`/categories/${category.handle}`}
        className="text-[13px] font-bold uppercase tracking-widest text-[#1a1a1a] hover:opacity-60 transition-opacity flex items-center gap-1.5 h-full py-2"
      >
        {(category.metadata?.menu_label as string) || category.name}
        {hasChildren && (
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </LocalizedClientLink>

      {hasChildren && hasGroups && (
        <div
          className={`absolute top-full pt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${dropdownPositionClass}`}
        >
          <div className="bg-white border-t-2 border-t-black border text-black border-gray-100 shadow-xl px-8 py-7 flex gap-8 mt-0 w-max max-w-[80vw]">
            <div className="flex gap-10 bg-white">
              {Object.entries(groups).map(([groupName, items]) => (
                <div key={groupName} className="flex flex-col min-w-[140px]">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">
                    {groupName}
                  </span>
                  <div className="flex flex-col gap-3.5">
                    {items.map((item) => (
                      <LocalizedClientLink
                        key={item.id}
                        href={`/categories/${item.handle}`}
                        className="text-[14px] font-semibold text-gray-700 hover:text-black hover:underline transition-colors block"
                      >
                        {(item.metadata?.menu_label as string) || item.name}
                      </LocalizedClientLink>
                    ))}
                  </div>
                </div>
              ))}

              {defaultGroup.length > 0 && (
                <div className="flex flex-col min-w-[140px]">
                  {Object.keys(groups).length > 0 && (
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">
                      Още
                    </span>
                  )}
                  <div className="flex flex-col gap-3.5">
                    {defaultGroup.map((item) => (
                      <LocalizedClientLink
                        key={item.id}
                        href={`/categories/${item.handle}`}
                        className="text-[14px] font-semibold text-gray-700 hover:text-black hover:underline transition-colors block"
                      >
                        {(item.metadata?.menu_label as string) || item.name}
                      </LocalizedClientLink>
                    ))}
                  </div>
                </div>
              )}
            </div>

           <div className="flex flex-col items-start border-l border-gray-100 pl-6 w-[300px]">
              <div className="mb-auto">
                <span className="text-[14px] font-bold text-black uppercase block mb-2">
                  {(category.metadata?.menu_label as string) || category.name}
                </span>
                <span className="text-[13px] text-gray-500 leading-6 max-w-[220px]">
                  Разгледай цялата категория и всички налични продукти в нея.
                </span>
              </div>
              <LocalizedClientLink
                href={`/categories/${category.handle}`}
               className="text-[12px] font-bold uppercase tracking-widest text-black hover:underline flex items-center gap-2 mt-8 inline-flex"
              >
                Към категорията
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      )}
    </li>
  )
}