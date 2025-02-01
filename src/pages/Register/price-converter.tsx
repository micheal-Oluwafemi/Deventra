import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import axios from "axios"
import CurrencyInput from "react-currency-input-field"

const CRYPTOCOMPARE_API = "https://min-api.cryptocompare.com/data"

const CURRENCIES = [
  { value: "usd", label: "USD", symbol: "$" },
  { value: "ngn", label: "NGN", symbol: "₦" },
  { value: "eur", label: "EUR", symbol: "€" },
  { value: "gbp", label: "GBP", symbol: "£" },
  { value: "jpy", label: "JPY", symbol: "¥" },
]

interface PriceConverterProps {
  ethAmount: number
  onChange: (amount: number) => void
}

export function PriceConverter({ ethAmount, onChange }: PriceConverterProps) {
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0])
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fiatAmount, setFiatAmount] = useState<number>(0)

  useEffect(() => {
    async function fetchExchangeRate() {
      if (!selectedCurrency) return
      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get(
          `${CRYPTOCOMPARE_API}/price?fsym=ETH&tsyms=${selectedCurrency.value.toUpperCase()}`
        )

        setExchangeRate(response.data[selectedCurrency.value.toUpperCase()])
      } catch (err) {
        setError("Failed to fetch exchange rate")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchExchangeRate()
  }, [selectedCurrency])

  useEffect(() => {
    if (exchangeRate && ethAmount) {
      setFiatAmount((ethAmount * exchangeRate))
    } else {
      setFiatAmount(0)
    }
  }, [ethAmount, exchangeRate])

  const handleEthChange = (value: number) => {
    if (value) {
      onChange(value)
    } else {
      onChange(0)
    }
  }

  const handleFiatChange = (value: number | undefined) => {
    if (value) {
      setFiatAmount(value)
      if (exchangeRate) {
        onChange((Number(value) / exchangeRate))
      }
    } else {
      setFiatAmount(0)
      onChange(0)
    }
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      <div className="space-y-4">
        <h4 className="font-medium dark:text-white">Entry Fee</h4>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <CurrencyInput
              value={ethAmount}
              onValueChange={v => handleEthChange(Number(v))}
              placeholder="0.0"
              decimalsLimit={6}
              className="w-32 rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm dark:border-gray-700 dark:text-white"
              allowDecimals
            />
            <span className="text-sm text-gray-500">ETH</span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCurrency.value}
              onChange={(e) => {
                const currency = CURRENCIES.find((c) => c.value === e.target.value)
                if (currency) setSelectedCurrency(currency)
              }}
              className="rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm dark:border-gray-700 dark:text-white"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency.value} value={currency.value} className="text-black dark:text-white bg-white dark:bg-black">
                  {currency.label}
                </option>
              ))}
            </select>

            {isLoading ? (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </div>
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : (
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500">{selectedCurrency.symbol}</span>
                <CurrencyInput
                  value={fiatAmount}
                  onValueChange={v => handleFiatChange(Number(v))}
                  placeholder="0.00"
                  allowDecimals
                  decimalsLimit={2}
                  className="w-32 rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm dark:border-gray-700 dark:text-white"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}