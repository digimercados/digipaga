"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUp, ArrowDown } from "lucide-react"

interface ExchangeRate {
  currency: string
  code: string
  buyRate: number
  sellRate: number
  change: "up" | "down" | "stable"
}

export function ExchangeRates() {
  const [activeTab, setActiveTab] = useState("popular")

  // Mock exchange rates data - in a real app, this would come from an API
  const exchangeRates: Record<string, ExchangeRate[]> = {
    popular: [
      { currency: "US Dollar", code: "USD", buyRate: 1.0, sellRate: 1.0, change: "stable" },
      { currency: "Mexican Peso", code: "MXN", buyRate: 18.5, sellRate: 18.65, change: "down" },
      { currency: "Euro", code: "EUR", buyRate: 0.92, sellRate: 0.94, change: "up" },
      { currency: "British Pound", code: "GBP", buyRate: 0.79, sellRate: 0.81, change: "up" },
    ],
    crypto: [
      { currency: "Bitcoin", code: "BTC", buyRate: 62500.0, sellRate: 62700.0, change: "up" },
      { currency: "Ethereum", code: "ETH", buyRate: 3050.0, sellRate: 3080.0, change: "up" },
      { currency: "Celo", code: "CELO", buyRate: 0.75, sellRate: 0.78, change: "down" },
      { currency: "Celo Dollar", code: "cUSD", buyRate: 0.99, sellRate: 1.01, change: "stable" },
    ],
    all: [
      { currency: "US Dollar", code: "USD", buyRate: 1.0, sellRate: 1.0, change: "stable" },
      { currency: "Mexican Peso", code: "MXN", buyRate: 18.5, sellRate: 18.65, change: "down" },
      { currency: "Euro", code: "EUR", buyRate: 0.92, sellRate: 0.94, change: "up" },
      { currency: "British Pound", code: "GBP", buyRate: 0.79, sellRate: 0.81, change: "up" },
      { currency: "Colombian Peso", code: "COP", buyRate: 4000.0, sellRate: 4050.0, change: "down" },
      { currency: "Argentine Peso", code: "ARS", buyRate: 900.0, sellRate: 910.0, change: "down" },
      { currency: "South African Rand", code: "ZAR", buyRate: 18.5, sellRate: 18.7, change: "stable" },
      { currency: "Nigerian Naira", code: "NGN", buyRate: 1600.0, sellRate: 1620.0, change: "down" },
    ],
  }

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-3">Best Exchange Rates</h3>

        <Tabs defaultValue="popular" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          {Object.entries(exchangeRates).map(([key, rates]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="space-y-2">
                <div className="grid grid-cols-5 text-xs text-gray-500 font-medium py-1 border-b">
                  <div className="col-span-2">Currency</div>
                  <div className="text-right">Buy</div>
                  <div className="text-right">Sell</div>
                  <div className="text-right">Change</div>
                </div>

                {rates.map((rate) => (
                  <div key={rate.code} className="grid grid-cols-5 py-2 text-sm border-b border-gray-100">
                    <div className="col-span-2 flex items-center">
                      <span className="font-medium">{rate.code}</span>
                      <span className="ml-2 text-xs text-gray-500">{rate.currency}</span>
                    </div>
                    <div className="text-right font-medium">{rate.buyRate.toFixed(rate.buyRate < 10 ? 2 : 0)}</div>
                    <div className="text-right font-medium">{rate.sellRate.toFixed(rate.sellRate < 10 ? 2 : 0)}</div>
                    <div className="text-right">
                      {rate.change === "up" && <ArrowUp className="h-4 w-4 text-green-500 inline" />}
                      {rate.change === "down" && <ArrowDown className="h-4 w-4 text-red-500 inline" />}
                      {rate.change === "stable" && <span className="text-gray-400">—</span>}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
