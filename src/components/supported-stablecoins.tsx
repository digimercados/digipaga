"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getActiveStablecoins, getAllStablecoins } from "@/lib/token-contracts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function SupportedStablecoins() {
  const [activeTab, setActiveTab] = useState("active")
  const { toast } = useToast()

  const activeStablecoins = getActiveStablecoins()
  const allStablecoins = getAllStablecoins()

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Address copied",
      description: "Contract address copied to clipboard",
    })
  }

  const openExplorer = (address: string) => {
    window.open(`https://explorer.celo.org/mainnet/address/${address}`, "_blank")
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Supported Stablecoins</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-4">
              {activeStablecoins.map((token) => (
                <div key={token.symbol} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">{token.logo}</span>
                    <span className="font-bold">{token.name}</span>
                    <span className="ml-2 text-sm text-gray-500">({token.symbol})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-xs font-mono break-all">{token.address.substring(0, 18)}...</code>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleCopyAddress(token.address)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openExplorer(token.address)}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="space-y-4">
              {allStablecoins.map((token) => (
                <div key={token.symbol + token.address} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">{token.logo}</span>
                    <span className="font-bold">{token.name}</span>
                    <span className="ml-2 text-sm text-gray-500">({token.symbol})</span>
                    {token.isActive ? (
                      <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                    ) : (
                      <span className="ml-auto text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Inactive</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-xs font-mono break-all">{token.address.substring(0, 18)}...</code>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleCopyAddress(token.address)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openExplorer(token.address)}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
