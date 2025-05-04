"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { ChevronLeft, CreditCard, Building2, Loader2 } from "lucide-react"
import { CryptoTokenSelector } from "@/components/crypto-token-selector"
import { TransactionStatus } from "@/components/transaction-status"

export default function SellCryptoPage() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [depositMethod, setDepositMethod] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [bankName, setBankName] = useState("")
  const [selectedToken, setSelectedToken] = useState("")
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [txHash, setTxHash] = useState("")
  const [fullName, setFullName] = useState("")

  const handleDepositMethodSubmit = () => {
    if (!depositMethod) {
      toast({
        title: "Missing selection",
        description: "Please select where to deposit your funds",
        variant: "destructive",
      })
      return
    }
    setStep(2)
  }

  const handleAccountNumberSubmit = () => {
    if (!accountNumber || accountNumber.length < 10) {
      toast({
        title: "Invalid account number",
        description: "Please enter a valid account or card number",
        variant: "destructive",
      })
      return
    }

    if (!fullName || !bankName) {
      toast({
        title: "Missing information",
        description: "Please enter your full name and bank name",
        variant: "destructive",
      })
      return
    }

    setStep(3)
  }

  const handleTokenSelect = (token: string) => {
    setSelectedToken(token)
    setStep(4)
  }

  const handleAmountSubmit = () => {
    if (!amount || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }
    setStep(5)
  }

  const handleConfirmTransaction = () => {
    setIsProcessing(true)

    // Simulate transaction processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      setTxHash("0x" + Math.random().toString(16).substring(2, 34))
    }, 3000)
  }

  // Update to use MXN as default currency

  // Example exchange rate - in a real app, this would come from an API
  const exchangeRate = 18.5 // 1 cUSD = 18.5 MXN
  const fiatAmount = amount ? (Number(amount) * exchangeRate).toFixed(2) : "0.00"

  const renderStepIndicator = () => {
    return (
      <div className="w-full flex justify-between mb-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className={`h-1 flex-1 mx-0.5 rounded-full ${s <= step ? "bg-primary" : "bg-gray-200"}`} />
        ))}
      </div>
    )
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="border-none shadow-md">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label>Deposit To</Label>
                <RadioGroup onValueChange={setDepositMethod} className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="debit-card" id="debit-card" />
                    <Label htmlFor="debit-card" className="flex items-center cursor-pointer">
                      <CreditCard className="h-5 w-5 mr-2 text-primary" />
                      <div>
                        <p className="font-medium">Debit Card 💳</p>
                        <p className="text-sm text-gray-500">Instant processing</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="bank-account" id="bank-account" />
                    <Label htmlFor="bank-account" className="flex items-center cursor-pointer">
                      <Building2 className="h-5 w-5 mr-2 text-primary" />
                      <div>
                        <p className="font-medium">Bank Account 🏦</p>
                        <p className="text-sm text-gray-500">Instant processing</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white"
                onClick={handleDepositMethodSubmit}
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        )
      case 2:
        return (
          <Card className="border-none shadow-md">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="account-number">
                  {depositMethod === "debit-card" ? "Enter 16-digit card number" : "Enter bank account number"}
                </Label>
                <Input
                  id="account-number"
                  placeholder={depositMethod === "debit-card" ? "XXXX XXXX XXXX XXXX" : "Account number"}
                  className="rounded-xl"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  placeholder="Enter your full name"
                  className="rounded-xl"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Input
                  id="bank-name"
                  placeholder="Enter your bank name"
                  className="rounded-xl"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  Your information is encrypted and secure. We never store your full card or account details.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white"
                onClick={handleAccountNumberSubmit}
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center mb-6">Select Token to Sell</h2>
            <CryptoTokenSelector onSelect={handleTokenSelect} />
          </div>
        )
      case 4:
        return (
          <Card className="border-none shadow-md">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ({selectedToken})</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="rounded-xl"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  Current exchange rate: 1 {selectedToken} = {exchangeRate} MXN
                </p>
              </div>
              <div className="space-y-2">
                <Label>You&apos;ll receive (estimated)</Label>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
                  <span className="text-lg font-medium">{fiatAmount}</span>
                  <span className="text-gray-500">MXN</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white"
                onClick={handleAmountSubmit}
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        )
      case 5:
        return (
          <Card className="border-none shadow-md">
            <CardContent className="pt-6 space-y-6">
              <h2 className="text-xl font-bold text-center">Transaction Summary</h2>

              <div className="space-y-4 py-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Deposit To:</span>
                  <span className="font-medium">{depositMethod === "debit-card" ? "Debit Card" : "Bank Account"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account:</span>
                  <span className="font-medium">
                    {accountNumber.substring(0, 4)}...{accountNumber.substring(accountNumber.length - 4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Full Name:</span>
                  <span className="font-medium">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank Name:</span>
                  <span className="font-medium">{bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Selling:</span>
                  <span className="font-medium">
                    {amount} {selectedToken}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">You&apos;ll Receive:</span>
                  <span className="font-medium">MXN ${fiatAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network:</span>
                  <span className="font-medium">Celo</span>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">No additional fees. Rate based on current market price.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white"
                onClick={handleConfirmTransaction}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Transaction"
                )}
              </Button>
            </CardFooter>
          </Card>
        )
      default:
        return null
    }
  }

  if (isComplete) {
    return <TransactionStatus success txHash={txHash} />
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center p-4">
          <button onClick={() => (step > 1 ? setStep(step - 1) : null)} className="mr-4" disabled={step === 1}>
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Sell Crypto</h1>
        </div>
        {step > 1 && <div className="px-4 pb-2">{renderStepIndicator()}</div>}
      </header>

      <main className="flex-1 p-4">{renderStep()}</main>
    </div>
  )
}
