"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Search, ArrowDown, ArrowUp } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Update transaction data to use Mexican services and currency

// Mock transaction data
const transactionData = [
  {
    id: "tx1",
    serviceName: "Electricity - CFE",
    amount: "MXN $850",
    cryptoAmount: "45.9 cUSD",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: "completed",
    type: "payment",
  },
  {
    id: "tx2",
    serviceName: "Mobile Data - Telcel",
    amount: "MXN $200",
    cryptoAmount: "10.8 cUSD",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: "completed",
    type: "payment",
  },
  {
    id: "tx3",
    serviceName: "Crypto Purchase",
    amount: "MXN $1,500",
    cryptoAmount: "81.1 cUSD",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    status: "completed",
    type: "buy",
  },
  {
    id: "tx4",
    serviceName: "Crypto Sale",
    amount: "MXN $750",
    cryptoAmount: "40.5 cUSD",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    status: "completed",
    type: "sell",
  },
  {
    id: "tx5",
    serviceName: "Water - SACMEX",
    amount: "MXN $320",
    cryptoAmount: "17.3 cUSD",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    status: "completed",
    type: "payment",
  },
]

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = transactionData.filter(
    (tx) =>
      tx.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.cryptoAmount.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Link href="/" className="mr-4">
            <ChevronLeft className="h-6 w-6 text-primary" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Transaction History</h1>
        </div>
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search transactions"
              className="pl-10 rounded-xl border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="space-y-3">
          {filteredTransactions.length === 0 ? (
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 text-center text-gray-500">No transactions found</CardContent>
            </Card>
          ) : (
            filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="mr-3 bg-primary/10 p-2 rounded-full">
                        {transaction.type === "payment" ? (
                          <ArrowUp className="h-4 w-4 text-primary" />
                        ) : transaction.type === "buy" ? (
                          <ArrowDown className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowUp className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{transaction.serviceName}</h3>
                        <p className="text-sm text-gray-500">
                          {formatDistanceToNow(transaction.date, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">{transaction.amount}</p>
                      <p className="text-sm text-gray-500">{transaction.cryptoAmount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
