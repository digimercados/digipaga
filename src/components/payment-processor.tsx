"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useMiniPay } from "@/contexts/minipay-context"
import { sendToken, DEFAULT_FEE_CURRENCY, parseTokenAmount } from "@/lib/minipay"
import { getStablecoinBySymbol } from "@/lib/token-contracts"

interface PaymentProcessorProps {
  amount: string
  tokenSymbol: string
  recipientAddress: string
  onSuccess: (txHash: string) => void
  onError: (error: string) => void
}

export function PaymentProcessor({ amount, tokenSymbol, recipientAddress, onSuccess, onError }: PaymentProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const { isConnected, isMiniPayBrowser } = useMiniPay()

  const handlePayment = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your MiniPay wallet to continue",
        variant: "destructive",
      })
      return
    }

    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const token = getStablecoinBySymbol(tokenSymbol)

      if (!token) {
        throw new Error(`Token ${tokenSymbol} not found`)
      }

      // Convert amount to token units
      const amountInWei = parseTokenAmount(amount, token.decimals)

      // Send transaction with fee abstraction
      const txHash = await sendToken(token.address, recipientAddress, amountInWei, DEFAULT_FEE_CURRENCY)

      if (!txHash) {
        throw new Error("Transaction failed")
      }

      onSuccess(txHash)
    } catch (error) {
      console.error("Payment error:", error)
      onError(error instanceof Error ? error.message : "Unknown error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Button
      className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white"
      onClick={handlePayment}
      disabled={isProcessing || !isConnected || !isMiniPayBrowser}
    >
      {isProcessing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing Payment...
        </>
      ) : (
        "Pay Now"
      )}
    </Button>
  )
}
