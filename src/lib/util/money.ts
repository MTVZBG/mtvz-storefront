import { isEmpty } from "./isEmpty"

type ConvertToLocaleParams = {
  amount: number
  currency_code: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = "bg-BG",
}: ConvertToLocaleParams) => {
  const hasDecimals = !Number.isInteger(amount)

  return currency_code && !isEmpty(currency_code)
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency_code,
        minimumFractionDigits: minimumFractionDigits ?? (hasDecimals ? 2 : 0),
        maximumFractionDigits: maximumFractionDigits ?? (hasDecimals ? 2 : 0),
      }).format(amount)
    : amount.toString()
}
