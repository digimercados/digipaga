import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { SupportedStablecoins } from "@/components/supported-stablecoins"
import { PurpleRefreshIcon } from "@/components/icons/purple-refresh"
import { UserAvatar } from "@/components/user-avatar"
import { MiniPayBrowserNotice } from "@/components/minipay-browser-notice"

export default function ConvertPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ChevronLeft className="h-6 w-6 text-primary" />
            </Link>
            <h1 className="text-xl font-bold text-gray-800">
              <span className="flex items-center">
                FIAT{" "}
                <span className="mx-2 flex items-center">
                  <PurpleRefreshIcon className="h-5 w-5" />
                </span>{" "}
                Crypto
              </span>
            </h1>
          </div>
          <UserAvatar />
        </div>
      </header>

      <main className="flex-1 p-4 flex flex-col">
        <div className="w-full max-w-md mx-auto space-y-8">
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">💵</span>
              </div>
              <h2 className="text-xl font-bold text-center mb-2">Buy Crypto</h2>
              <p className="text-gray-500 text-center mb-4">Swap your local currency to cryptocurrency instantly</p>
              <Link href="/convert/buy" className="w-full">
                <Button className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white">Buy Crypto</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🪙</span>
              </div>
              <h2 className="text-xl font-bold text-center mb-2">Sell Crypto</h2>
              <p className="text-gray-500 text-center mb-4">Swap your cryptocurrency to local currency instantly</p>
              <Link href="/convert/sell" className="w-full">
                <Button className="w-full py-6 rounded-xl bg-secondary hover:bg-secondary/90 text-primary font-bold">
                  Sell Crypto
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Supported Stablecoins */}
          <SupportedStablecoins />

          {/* MiniPay Browser Notice */}
          <MiniPayBrowserNotice />
        </div>
      </main>
    </div>
  )
}
