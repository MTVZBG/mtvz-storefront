import { HttpTypes } from "@medusajs/types"

/**
 * Transforms a flat list of Medusa categories into a structured tree,
 * filtering out categories hidden from the menu, and sorting them
 * according to metadata.menu_order.
 */
export function buildMenuTree(allCategories: HttpTypes.StoreProductCategory[]): HttpTypes.StoreProductCategory[] {
    // 1. Filter out hidden categories
    const visible = allCategories.filter((cat) => {
        const show = cat.metadata?.show_in_menu
        if (show === "false" || show === false) return false
        return true
    })

    const getOrder = (c: HttpTypes.StoreProductCategory) => {
        const val = c.metadata?.menu_order
        if (val === null || val === undefined || val === "") return 9999
        const num = Number(val)
        return isNaN(num) ? 9999 : num
    }

    // 2. Sort categories based on menu_order numeric value, fallback to name
    const sorted = [...visible].sort((a, b) => {
        const orderA = getOrder(a)
        const orderB = getOrder(b)

        if (orderA !== orderB) {
            return orderA - orderB
        }
        return a.name.localeCompare(b.name)
    })

    // 3. Rebuild the tree relationships natively handling children ordering
    const map = new Map<string, HttpTypes.StoreProductCategory>()
    sorted.forEach((cat) => {
        // Deep clone safely so we don't mutate external cache if any,
        // and initialize empty children array to fill with ordered items.
        map.set(cat.id, { ...cat, category_children: [] })
    })

    const topLevel: HttpTypes.StoreProductCategory[] = []

    sorted.forEach((cat) => {
        const node = map.get(cat.id)!
        if (cat.parent_category_id && map.has(cat.parent_category_id)) {
            const parent = map.get(cat.parent_category_id)!
            // Because we iterate in sorted order, the children pushed will also be sorted
            parent.category_children!.push(node)
        } else if (!cat.parent_category_id) {
            topLevel.push(node)
        }
    })

    return topLevel
}
