import { Card, CardContent } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

// Mock recent transactions data with Mexican services
const recentTransactions = [
  {
    id: "tx1",
    serviceName: "Electricity - CFE",
    amount: "MXN $850",
    cryptoAmount: "45.9 cUSD",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: "completed",
  },
  {
    id: "tx2",
    serviceName: "Mobile Data - Telcel",
    amount: "MXN $200",
    cryptoAmount: "10.8 cUSD",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: "completed",
  },
  {
    id: "tx3",
    serviceName: "Crypto Purchase",
    amount: "MXN $1,500",
    cryptoAmount: "81.1 cUSD",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    status: "completed",
  },
]

export function RecentTransactions() {
  if (recentTransactions.length === 0) {
    return (
      <Card className="border-none shadow-sm">
        <CardContent className="p-4 text-center text-gray-500">No recent transactions</CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {recentTransactions.map((transaction) => (
        <Card key={transaction.id} className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">{transaction.serviceName}</h3>
                <p className="text-sm text-gray-500">{formatDistanceToNow(transaction.date, { addSuffix: true })}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800">{transaction.amount}</p>
                <p className="text-sm text-gray-500">{transaction.cryptoAmount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
