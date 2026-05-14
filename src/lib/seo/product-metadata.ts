export const generateProductMetadata = (product: any) => {
  const productTitle = product?.title?.trim()

  if (!productTitle) {
    return {
      title: "Риболовен продукт | MTVZ",
      description: "Риболовни принадлежности, такъми и оборудване от MTVZ.",
    }
  }

  return {
    title: `${productTitle} | MTVZ`,
    description:
      product.description?.trim() ||
      `Купете ${productTitle} от MTVZ. Подбрани риболовни принадлежности, такъми и оборудване за онлайн поръчка.`,
  }
}
