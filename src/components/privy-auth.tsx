"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Wallet } from "lucide-react"

export function PrivyAuth() {
  const [isOpen, setIsOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  const handleConnect = () => {
    setIsConnecting(true)

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false)
      setIsOpen(false)

      toast({
        title: "Wallet connected",
        description: "You&apos;ve successfully connected your wallet",
      })
    }, 1500)
  }

  return (
    <>
      <Button
        size="lg"
        className="rounded-xl bg-white text-primary border-2 border-primary hover:bg-primary/10"
        onClick={() => setIsOpen(true)}
      >
        <Wallet className="h-5 w-5 mr-2" />
        <span>Connect Wallet</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle>Connect your wallet</DialogTitle>
            <DialogDescription>
              Connect your wallet to access Digipaga services and pay with stablecoins on Celo.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Button
              onClick={handleConnect}
              className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white"
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect with Privy"}
            </Button>

            <div className="text-center text-sm text-gray-500">
              <p>New to Web3? We&apos;ll help you create a wallet.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
