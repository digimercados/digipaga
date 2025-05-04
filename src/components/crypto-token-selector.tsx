"use client"

import { Card, CardContent } from "@/components/ui/card"
import { getActiveStablecoins } from "@/lib/token-contracts"

interface CryptoTokenSelectorProps {
  onSelect: (token: string) => void
}

export function CryptoTokenSelector({ onSelect }: CryptoTokenSelectorProps) {
  // Get active stablecoins
  const activeStablecoins = getActiveStablecoins()

  // Add CELO native token
  const tokens = [
    { id: "CELO", name: "CELO", icon: "🟡", description: "Celo native token" },
    ...activeStablecoins.map((token) => ({
      id: token.symbol,
      name: token.name,
      icon: token.logo || "💱",
      description: `${token.symbol} stablecoin`,
    })),
  ]

  return (
    <div className="space-y-3">
      {tokens.map((token) => (
        <Card
          key={token.id}
          className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSelect(token.id)}
        >
          <CardContent className="p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <span className="text-xl">{token.icon}</span>
            </div>
            <div>
              <h3 className="font-medium">{token.name}</h3>
              <p className="text-sm text-gray-500">{token.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
