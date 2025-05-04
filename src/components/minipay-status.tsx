"use client"

import { useMiniPay } from "@/contexts/minipay-context"
import { Card, CardContent } from "@/components/ui/card"
import { formatTokenAmount } from "@/lib/minipay"
import { STABLECOIN_CONTRACTS } from "@/lib/token-contracts"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function MiniPayStatus() {
  const { isConnected, account, isMiniPayBrowser, tokenBalances, refreshBalances } = useMiniPay()

  // Don't show anything if not in MiniPay browser
  if (!isMiniPayBrowser) {
    return null
  }

  if (!isConnected) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="p-4">
          <div className="text-center py-2">
            <p className="text-amber-600 text-sm font-medium">Wallet not connected</p>
            <p className="text-xs text-gray-500 mt-1">Please connect your MiniPay wallet to continue.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold">MiniPay Wallet</h3>
          <Button variant="ghost" size="sm" onClick={() => refreshBalances()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-sm mb-3">
          <span className="text-gray-500">Address: </span>
          <span className="font-mono">{formatAddress(account || "")}</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500">Balances:</h4>
          {Object.entries(tokenBalances).map(([symbol, balance]) => {
            const token = STABLECOIN_CONTRACTS[symbol as keyof typeof STABLECOIN_CONTRACTS]
            if (!token) return null

            return (
              <div key={symbol} className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="mr-2">{token.logo}</span>
                  <span>{symbol}</span>
                </div>
                <span className="font-medium">{formatTokenAmount(balance, token.decimals)}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
