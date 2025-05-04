"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ChevronLeft, BookmarkPlus, Info } from "lucide-react"
import { getCountryName, getCurrencyByCountry, getProvidersByCountryAndCategory } from "@/lib/country-services"
import { getActiveStablecoins } from "@/lib/token-contracts"
import { TokenContractDetails } from "@/components/token-contract-details"
import { TransactionStatus } from "@/components/transaction-status"
import { PaymentProcessor } from "@/components/payment-processor"
import { MiniPayStatus } from "@/components/minipay-status"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock recipient address - in a real app, this would come from your backend
const MOCK_RECIPIENT_ADDRESS = "0x1234567890123456789012345678901234567890"

export default function ServicePaymentPage({ params }) {
  // Unwrap the params Promise using React.use()
  const unwrappedParams = use(params);
  const { country, service } = unwrappedParams;
  
  const countryCode = country.toUpperCase()
  const countryName = getCountryName(countryCode)
  const currency = getCurrencyByCountry(countryCode)
  const providers = getProvidersByCountryAndCategory(countryCode, service)
  const activeStablecoins = getActiveStablecoins()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [provider, setProvider] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [selectedPackage, setSelectedPackage] = useState("")
  const [selectedToken, setSelectedToken] = useState(activeStablecoins[0]?.symbol || "cUSD")
  const [isComplete, setIsComplete] = useState(false)
  const [txHash, setTxHash] = useState("")

  // Get service name based on service
  const getServiceName = () => {
    switch (service) {
      case "mobile-data":
        return "Mobile Data Packages"
      case "electricity":
        return "Electricity"
      case "tv-phone-internet":
        return "TV / Internet / Phone"
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
      case "carbon-offset":
        return "Carbon Offset"
      default:
        return "Service"
    }
  }

  // Mock packages for mobile data
  const getPackages = () => {
    if (service === "mobile-data" && provider) {
      return [
        { id: "p1", name: "10GB - 30 days", price: "200" },
        { id: "p2", name: "15GB - 30 days", price: "300" },
        { id: "p3", name: "Unlimited - 30 days", price: "500" },
      ]
    }
    return []
  }

  const packages = getPackages()

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId)
    const pkg = packages.find((p) => p.id === packageId)
    if (pkg) {
      setAmount(pkg.price)
    }
  }

  const handleSaveService = () => {
    if (!accountNumber || !provider) {
      toast({
        title: "Missing information",
        description: "Please select a provider and enter an account number",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Saved successfully",
        description: "This service has been added to your saved items",
      })
    }, 1000)
  }

  const handlePaymentSuccess = (hash: string) => {
    setTxHash(hash)
    setIsComplete(true)
  }

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment failed",
      description: error,
      variant: "destructive",
    })
  }

  // Calculate crypto amount based on local currency amount
  const exchangeRate = 18.5 // Example: 1 cUSD = 18.5 MXN
  const cryptoAmount = amount ? (Number(amount) / exchangeRate).toFixed(2) : "0.00"

  if (isComplete) {
    return <TransactionStatus success txHash={txHash} tokenSymbol={selectedToken} />
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Link href={`/pay-services/${country}`} className="mr-4">
            <ChevronLeft className="h-6 w-6 text-primary" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{getServiceName()}</h1>
            <p className="text-sm text-gray-500">{countryName}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary ml-auto"
            onClick={handleSaveService}
            disabled={isSaving}
          >
            <BookmarkPlus className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4">
        {/* MiniPay Status */}
        <div className="mb-4">
          <MiniPayStatus />
        </div>

        <Card className="border-none shadow-md mb-4">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select onValueChange={setProvider}>
                <SelectTrigger id="provider" className="rounded-xl">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-number">
                {service === "mobile-data" ? "Phone Number (10 digits)" : "Account Number / Reference"}
              </Label>
              <Input
                id="account-number"
                placeholder={service === "mobile-data" ? "Enter phone number" : "Enter account number"}
                className="rounded-xl"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            {service === "mobile-data" && provider && (
              <div className="space-y-2">
                <Label>Select Package</Label>
                <div className="grid gap-2">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`p-3 border rounded-lg cursor-pointer ${
                        selectedPackage === pkg.id ? "border-primary bg-primary/5" : "border-gray-200"
                      }`}
                      onClick={() => handlePackageSelect(pkg.id)}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{pkg.name}</span>
                        <span className="font-bold">
                          {currency} ${pkg.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service !== "mobile-data" && (
              <div className="space-y-2">
                <Label htmlFor="payment-amount">Amount ({currency})</Label>
                <Input
                  id="payment-amount"
                  type="number"
                  placeholder="0.00"
                  className="rounded-xl"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="token">Payment Token</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                      <Info className="h-3 w-3 mr-1" />
                      View Contract
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Token Contract Details</DialogTitle>
                      <DialogDescription>
                        View the smart contract details for the selected token
                      </DialogDescription>
                    </DialogHeader>
                    <TokenContractDetails tokenSymbol={selectedToken} />
                  </DialogContent>
                </Dialog>
              </div>
              <Select value={selectedToken} onValueChange={setSelectedToken}>
                <SelectTrigger id="token" className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {activeStablecoins.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.name} ({token.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between px-3 py-2 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Equivalent Amount</p>
                <p className="text-sm text-gray-600">
                  {cryptoAmount} {selectedToken}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Exchange Rate</p>
                <p className="text-sm text-gray-600">
                  1 {selectedToken} = {currency} ${exchangeRate}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-6 pb-6">
            <PaymentProcessor
              recipientAddress={MOCK_RECIPIENT_ADDRESS}
              amount={cryptoAmount}
              tokenSymbol={selectedToken}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
