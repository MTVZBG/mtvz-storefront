export const generateCategoryMetadata = (category: any) => {
  const categoryName = category?.name?.trim()

  if (!categoryName) {
    return {
      title: "Риболовни принадлежности | MTVZ",
      description: "Онлайн магазин за риболовни принадлежности, такъми и оборудване.",
    }
  }

  return {
    title: `${categoryName} | Риболовни принадлежности | MTVZ`,
    description:
      category.description?.trim() ||
      `Разгледайте продукти в категория ${categoryName} в MTVZ. Подбрани риболовни принадлежности, такъми и оборудване за онлайн поръчка.`,
  }
}
