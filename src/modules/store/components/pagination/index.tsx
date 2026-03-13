"use client"

import { clx } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function Pagination({
  page,
  totalPages,
  count,
  limit,
  'data-testid': dataTestid
}: {
  page: number
  totalPages: number
  count?: number
  limit?: number
  'data-testid'?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, index) => start + index)

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const renderPageButton = (
    p: number,
    label: string | number,
    isCurrent: boolean
  ) => (
    <button
      key={p}
      className={clx("text-[14px] font-semibold transition-colors", {
        "text-black": isCurrent,
        "text-gray-400 hover:text-black": !isCurrent,
      })}
      disabled={isCurrent}
      onClick={() => handlePageChange(p)}
    >
      {label}
    </button>
  )

  const renderEllipsis = (key: string) => (
    <span key={key} className="text-[14px] font-semibold text-gray-400 cursor-default">
      ...
    </span>
  )

  const renderPageButtons = () => {
    const buttons = []

    // Using fragments to wrap with pipes. Wait, we'll just push buttons and join with separators in the JSX map below.

    if (totalPages <= 7) {
      buttons.push(...arrayRange(1, totalPages).map((p) => ({ id: `p-${p}`, el: renderPageButton(p, p, p === page) })))
    } else {
      if (page <= 4) {
        buttons.push(...arrayRange(1, 5).map((p) => ({ id: `p-${p}`, el: renderPageButton(p, p, p === page) })))
        buttons.push({ id: 'e1', el: renderEllipsis("ellipsis1") })
        buttons.push({ id: `p-${totalPages}`, el: renderPageButton(totalPages, totalPages, totalPages === page) })
      } else if (page >= totalPages - 3) {
        buttons.push({ id: 'p-1', el: renderPageButton(1, 1, 1 === page) })
        buttons.push({ id: 'e2', el: renderEllipsis("ellipsis2") })
        buttons.push(
          ...arrayRange(totalPages - 4, totalPages).map((p) => ({ id: `p-${p}`, el: renderPageButton(p, p, p === page) }))
        )
      } else {
        buttons.push({ id: 'p-1', el: renderPageButton(1, 1, 1 === page) })
        buttons.push({ id: 'e3', el: renderEllipsis("ellipsis3") })
        buttons.push(...arrayRange(page - 1, page + 1).map((p) => ({ id: `p-${p}`, el: renderPageButton(p, p, p === page) })))
        buttons.push({ id: 'e4', el: renderEllipsis("ellipsis4") })
        buttons.push({ id: `p-${totalPages}`, el: renderPageButton(totalPages, totalPages, totalPages === page) })
      }
    }
    return buttons
  }

  const buttons = renderPageButtons()

  const startItem = limit ? (page - 1) * limit + 1 : 1
  const endItem = limit && count ? Math.min(page * limit, count) : limit ? Math.min(page * limit, totalPages * limit) : 20

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full mt-10 p-4 border-t border-gray-100 gap-4 md:gap-0">
      <div className="text-[13px] font-bold text-gray-500 uppercase tracking-widest">
        {count && limit ? `Showing ${startItem}–${endItem} of ${count} products` : "Products"}
      </div>
      <div className="flex items-center gap-3" data-testid={dataTestid}>
        {page > 1 && (
          <button onClick={() => handlePageChange(page - 1)} className="text-[14px] font-semibold text-gray-400 hover:text-black uppercase mr-2 transition-colors">Prev</button>
        )}

        {buttons.map((btn, i) => (
          <div key={btn.id} className="flex items-center gap-3">
            {btn.el}
            {i < buttons.length - 1 && <span className="text-gray-300">|</span>}
          </div>
        ))}

        {page < totalPages && (
          <button onClick={() => handlePageChange(page + 1)} className="text-[14px] font-semibold text-gray-400 hover:text-black uppercase ml-2 transition-colors">Next</button>
        )}
      </div>
    </div>
  )
}
