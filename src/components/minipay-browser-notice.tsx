"use client"

import { useMiniPay } from "@/contexts/minipay-context"
import { Card, CardContent } from "@/components/ui/card"

export function MiniPayBrowserNotice() {
  const { isMiniPayBrowser } = useMiniPay()

  // Only show if not in MiniPay browser
  if (isMiniPayBrowser) {
    return null
  }

  return (
    <Card className="border-none shadow-md mt-6">
      <CardContent className="p-4">
        <div className="text-center py-2">
          <p className="text-amber-600 text-sm font-medium">Not running in MiniPay browser</p>
          <p className="text-xs text-gray-500 mt-1">For the best experience, open this app in MiniPay.</p>
        </div>
      </CardContent>
    </Card>
  )
}
