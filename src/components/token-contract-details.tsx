"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStablecoinBySymbol } from "@/lib/token-contracts"
import { Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface TokenContractDetailsProps {
  tokenSymbol: string
}

export function TokenContractDetails({ tokenSymbol }: TokenContractDetailsProps) {
  const { toast } = useToast()
  const token = getStablecoinBySymbol(tokenSymbol)

  if (!token) {
    return null
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(token.address)
    toast({
      title: "Address copied",
      description: "Token contract address copied to clipboard",
    })
  }

  const openExplorer = () => {
    window.open(`https://explorer.celo.org/mainnet/address/${token.address}`, "_blank")
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span className="mr-2">{token.logo}</span>
          {token.name} ({token.symbol})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Contract Address (Celo Network)</p>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
            <code className="text-xs font-mono break-all">{token.address}</code>
            <div className="flex space-x-2 ml-2">
              <Button variant="ghost" size="sm" onClick={handleCopyAddress}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={openExplorer}>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Decimals</p>
            <p className="font-medium">{token.decimals}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <p className={`font-medium ${token.isActive ? "text-green-600" : "text-gray-500"}`}>
              {token.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
