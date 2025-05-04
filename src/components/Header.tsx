"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { UserAvatar } from "@/components/user-avatar"
import { PrivyAuth } from "@/components/privy-auth"
import { useMiniPay } from "@/contexts/minipay-context"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { isConnected, isMiniPayBrowser } = useMiniPay()

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setIsScrolled(offset > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Digipaga</span>
          </Link>
        </div>

        {isConnected ? (
          <div className="flex items-center space-x-4">
            <UserAvatar />
          </div>
        ) : (
          <div>{isMiniPayBrowser ? <PrivyAuth /> : null}</div>
        )}
      </div>
    </header>
  )
}
