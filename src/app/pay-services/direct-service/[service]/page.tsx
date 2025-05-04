"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ChevronLeft, Loader2 } from "lucide-react"

// Define the type for params
interface PageParams {
  service: string;
}

export default function ServicePaymentPage({ params }) {
  // Unwrap the params Promise using React.use()
  const unwrappedParams = use(params) as PageParams;
  const { service } = unwrappedParams;
  
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [accountNumber, setAccountNumber] = useState("")
  const [amount, setAmount] = useState("")

  // Get service name based on service parameter
  const getServiceName = () => {
    switch (service) {
      case "mobile-recharge":
        return "Mobile Recharge"
      case "mobile-plan":
        return "Mobile Plan"
      case "electricity":
        return "Electricity"
      case "tv-phone-internet":
        return "TV / Phone / Internet"
      case "gas":
        return "Gas"
      case "water":
        return "Water"
      case "transportation":
        return "Transportation"
      case "memberships":
        return "Memberships"
      case "credit-card":
        return "Credit Card"
      case "taxes":
        return "Taxes"
      case "mortgage":
        return "Mortgage"
      case "others":
        return "Other Service"
      default:
        return "Service"
    }
  }

  const handlePayment = () => {
    if (!accountNumber || !amount) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to continue",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Payment successful",
        description: `You have paid ${amount} USDC for ${getServiceName()}`,
      })
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Link href="/pay-services" className="mr-4">
            <ChevronLeft className="h-6 w-6 text-primary" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">{getServiceName()}</h1>
        </div>
      </header>

      <main className="flex-1 p-4">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-primary">Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select defaultValue="default">
                <SelectTrigger id="provider" className="rounded-xl">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Select a provider</SelectItem>
                  {service === "mobile-recharge" && (
                    <>
                      <SelectItem value="telcel">Telcel</SelectItem>
                      <SelectItem value="att">AT&T</SelectItem>
                      <SelectItem value="movistar">Movistar</SelectItem>
                    </>
                  )}
                  {service === "electricity" && <SelectItem value="cfe">CFE</SelectItem>}
                  {/* Add more provider options based on service ID */}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number / Reference</Label>
              <Input
                id="account-number"
                placeholder="Enter account number"
                className="rounded-xl"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-amount">Amount (USDC)</Label>
              <Input
                id="payment-amount"
                type="number"
                placeholder="0.00"
                className="rounded-xl"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800">
                You&apos;ll be paying with USDC stablecoin on the Celo blockchain. Transaction fees are minimal.
              </p>
            </div>

            <div className="text-center text-lg font-medium mt-8">
              Send payment for {getServiceName()}
            </div>
            <div className="text-center text-primary font-medium text-sm mt-1">
              You&apos;ll pay with any stablecoin on Celo
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90"
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                "Pay Now"
              )}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
