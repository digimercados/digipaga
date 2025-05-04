"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CheckCircle, XCircle, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { getStablecoinBySymbol } from "@/lib/token-contracts"

interface TransactionStatusProps {
  success: boolean
  txHash: string
  tokenSymbol?: string
}

export function TransactionStatus({ success, txHash, tokenSymbol = "cUSD" }: TransactionStatusProps) {
  const { toast } = useToast()
  const token = tokenSymbol ? getStablecoinBySymbol(tokenSymbol) : null

  const handleCopyTxHash = () => {
    navigator.clipboard.writeText(txHash)
    toast({
      title: "Copied to clipboard",
      description: "Transaction hash copied to clipboard",
    })
  }

  const handleCopyContractAddress = () => {
    if (token) {
      navigator.clipboard.writeText(token.address)
      toast({
        title: "Copied to clipboard",
        description: "Contract address copied to clipboard",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 p-4 flex flex-col items-center justify-center">
        <Card className="border-none shadow-md w-full max-w-md">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              {success ? (
                <CheckCircle className="h-10 w-10 text-green-600" />
              ) : (
                <XCircle className="h-10 w-10 text-red-600" />
              )}
            </div>

            <h2 className="text-2xl font-bold mb-2">{success ? "Transaction Successful" : "Transaction Failed"}</h2>

            <p className="text-gray-600 mb-6">
              {success
                ? "Your transaction has been confirmed on the blockchain."
                : "There was an issue with your transaction. Please try again."}
            </p>

            {txHash && (
              <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Transaction Hash:</span>
                  <div className="flex space-x-2">
                    <button onClick={handleCopyTxHash}>
                      <Copy className="h-4 w-4 text-gray-500 hover:text-primary" />
                    </button>
                    <a
                      href={`https://explorer.celo.org/mainnet/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 text-gray-500 hover:text-primary" />
                    </a>
                  </div>
                </div>
                <p className="text-xs font-mono mt-1 break-all">{txHash}</p>
              </div>
            )}

            {token && (
              <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Token Contract ({token.symbol}):</span>
                  <div className="flex space-x-2">
                    <button onClick={handleCopyContractAddress}>
                      <Copy className="h-4 w-4 text-gray-500 hover:text-primary" />
                    </button>
                    <a
                      href={`https://explorer.celo.org/mainnet/address/${token.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 text-gray-500 hover:text-primary" />
                    </a>
                  </div>
                </div>
                <p className="text-xs font-mono mt-1 break-all">{token.address}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Link href="/" className="w-full">
              <Button className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white">
                Return to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
