"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Search, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Update saved items to use Mexican services

// Mock saved items data
const savedItemsData = [
  {
    id: "item1",
    serviceName: "Electricity - CFE",
    accountNumber: "123456789012",
    country: "MX",
    category: "electricity",
  },
  {
    id: "item2",
    serviceName: "Mobile Data - Telcel",
    accountNumber: "5512345678",
    country: "MX",
    category: "mobile-data",
  },
  {
    id: "item3",
    serviceName: "Water - SACMEX",
    accountNumber: "AGUA123456",
    country: "MX",
    category: "water",
  },
]

export default function SavedItemsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState(savedItemsData)
  const { toast } = useToast()

  const filteredItems = items.filter(
    (item) =>
      item.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "The saved item has been removed",
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Link href="/" className="mr-4">
            <ChevronLeft className="h-6 w-6 text-primary" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Saved Items</h1>
        </div>
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search saved items"
              className="pl-10 rounded-xl border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 text-center text-gray-500">No saved items found</CardContent>
            </Card>
          ) : (
            filteredItems.map((item) => (
              <Card key={item.id} className="border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-800">{item.serviceName}</h3>
                      <p className="text-sm text-gray-500">Account: {item.accountNumber}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/pay-services/${item.country.toLowerCase()}/${item.category}`}>
                        <Button variant="outline" size="sm" className="text-primary border-primary">
                          Pay
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
