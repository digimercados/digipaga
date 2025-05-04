"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMiniPay } from "@/contexts/minipay-context"
import { LogOut, User, Settings, CreditCard, History } from "lucide-react"
import Link from "next/link"

export function UserAvatar() {
  const { account } = useMiniPay()

  // Generate initials from address
  const getInitials = () => {
    if (!account) return "G"
    return account.substring(2, 4).toUpperCase()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer group">
          {/* Wider green border with purple accent */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-green-400 to-green-500 p-[3px]">
            <div className="h-full w-full rounded-full bg-white"></div>
          </div>

          {/* Avatar with image */}
          <Avatar className="relative h-10 w-10">
            <AvatarImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lena%20Avatar.jpg-PYPYOOdiIrK3rZ2auc7f0iH7opIXQh.jpeg"
              alt="Lena"
              className="object-cover"
            />
            <AvatarFallback className="bg-primary text-white">{getInitials()}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lena%20Avatar.jpg-PYPYOOdiIrK3rZ2auc7f0iH7opIXQh.jpeg"
              alt="Lena"
            />
          </Avatar>
          <span>Lena</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/transactions">
          <DropdownMenuItem className="cursor-pointer">
            <History className="mr-2 h-4 w-4" />
            <span>Transaction History</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/saved-items">
          <DropdownMenuItem className="cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Saved Items</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/settings">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
