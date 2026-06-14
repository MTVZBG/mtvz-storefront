export type CxValue =
  | string
  | false
  | null
  | undefined
  | Record<string, boolean | null | undefined>

export const cx = (...classes: CxValue[]) => {
  const result: string[] = []

  for (const item of classes) {
    if (!item) continue

    if (typeof item === "string") {
      result.push(item)
      continue
    }

    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key) && item[key]) {
        result.push(key)
      }
    }
  }

  return result.join(" ")
}
