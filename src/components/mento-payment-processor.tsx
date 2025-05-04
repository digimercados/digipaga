"use client"

import { useState, useCallback } from "react"
import { v4 as uuidv4 } from 'uuid'
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useMiniPay } from "@/contexts/minipay-context"
import { sendToken, DEFAULT_FEE_CURRENCY, parseTokenAmount } from "@/lib/minipay"
import { getStablecoinBySymbol } from "@/lib/token-contracts"
import { 
  verifyTransaction, 
  convertCryptoToFiat, 
  PaymentTransaction 
} from "@/lib/payment-service"

interface MentoPaymentProcessorProps {
  amount: string
  tokenSymbol: string
  recipientAddress: string
  billReference: string
  serviceProvider: string
  serviceType: string
  onSuccess: (paymentDetails: {
    txHash: string
    paymentId: string
    fiatAmount: number
    fiatCurrency: string
  }) => void
  onError: (error: string) => void
  onProcessing?: (status: string) => void
}

export function MentoPaymentProcessor({
  amount,
  tokenSymbol,
  recipientAddress,
  billReference,
  serviceProvider,
  serviceType,
  onSuccess,
  onError,
  onProcessing
}: MentoPaymentProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState<string>('idle')
  const { toast } = useToast()
  const { isConnected, isMiniPayBrowser, account } = useMiniPay()

  // Update processing status if provided
  const updateProcessingStatus = useCallback((status: string) => {
    setStep(status)
    if (onProcessing) {
      onProcessing(status)
    }
  }, [onProcessing])

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
    updateProcessingStatus('initiating')

    try {
      // Generate a unique payment ID
      const paymentId = uuidv4()
      
      // Get token details
      const token = getStablecoinBySymbol(tokenSymbol)
      if (!token) {
        throw new Error(`Token ${tokenSymbol} not found`)
      }

      // Convert amount to token units
      const amountInWei = parseTokenAmount(amount, token.decimals)
      updateProcessingStatus('sending')

      // Send blockchain transaction with fee abstraction
      const txHash = await sendToken(token.address, recipientAddress, amountInWei, DEFAULT_FEE_CURRENCY)
      if (!txHash) {
        throw new Error("Transaction failed to submit")
      }
      
      updateProcessingStatus('verifying')
      
      // Wait for the transaction to be verified (in a real app, this might be a webhook or polling)
      const verificationResult = await verifyTransaction(
        txHash,
        amount,
        recipientAddress,
        token.address
      )
      
      if (!verificationResult.verified) {
        throw new Error(`Transaction verification failed: ${verificationResult.error || 'Unknown error'}`)
      }
      
      updateProcessingStatus('processing')
      
      // Calculate fiat amount - in a real implementation, use a price oracle
      const fiatCurrency = tokenSymbol === 'cUSD' ? 'USD' : 
                          tokenSymbol === 'cEUR' ? 'EUR' :
                          tokenSymbol === 'cREAL' ? 'BRL' :
                          tokenSymbol === 'eXOF' ? 'XOF' :
                          tokenSymbol === 'cKES' ? 'KES' : 'USD'
      
      const fiatAmount = await convertCryptoToFiat(tokenSymbol, amount, fiatCurrency)

      // Prepare payment record
      const paymentRecord: PaymentTransaction = {
        id: paymentId,
        txHash,
        userAddress: account || '',
        tokenSymbol,
        tokenAmount: amount,
        recipientAddress,
        fiatCurrency,
        fiatAmount,
        billReference,
        serviceProvider,
        serviceType,
        status: 'pending',
        timestamp: new Date().toISOString(),
      }
      
      // Send to backend API
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentRecord),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to process payment')
      }
      
      // Process completed successfully
      await response.json() // Just consume the response
      updateProcessingStatus('complete')

      // Call onSuccess with payment details
      onSuccess({
        txHash,
        paymentId,
        fiatAmount,
        fiatCurrency,
      })
    } catch (error) {
      console.error("Payment error:", error)
      updateProcessingStatus('failed')
      onError(error instanceof Error ? error.message : "Unknown error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  const getButtonText = () => {
    if (isProcessing) {
      switch (step) {
        case 'initiating':
          return 'Preparing Transaction...'
        case 'sending':
          return 'Sending Payment...'
        case 'verifying':
          return 'Verifying Transaction...'
        case 'processing':
          return 'Processing Payment...'
        default:
          return 'Processing...'
      }
    }
    return 'Pay Now'
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
          {getButtonText()}
        </>
      ) : (
        "Pay Now"
      )}
    </Button>
  )
} 