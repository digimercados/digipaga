"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, Wallet, ChevronDown } from "lucide-react"
import { RecentTransactions } from "@/components/recent-transactions"
import { ServiceCategory } from "@/components/service-category"
import { PromoBanner } from "@/components/promo-banner"
import { ExchangeRates } from "@/components/exchange-rates"
import { MiniPayStatus } from "@/components/minipay-status"
import { MiniPayBrowserNotice } from "@/components/minipay-browser-notice"
import { UserAvatar } from "@/components/user-avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getCountryName } from "@/lib/country-services"
import { PurpleRefreshIcon } from "@/components/icons/purple-refresh"

export default function WelcomePage() {
  const [selectedCountry, setSelectedCountry] = useState("MX")

  // List of supported countries
  const countries = [
    { code: "MX", name: "Mexico" },
    { code: "ES", name: "Spain" },
    { code: "CO", name: "Colombia" },
    { code: "AR", name: "Argentina" },
    { code: "UY", name: "Uruguay" },
    { code: "CL", name: "Chile" },
    { code: "PE", name: "Peru" },
    { code: "SV", name: "El Salvador" },
    { code: "BR", name: "Brazil" },
    { code: "NG", name: "Nigeria" },
    { code: "KE", name: "Kenya" },
    { code: "GH", name: "Ghana" },
    { code: "ZA", name: "South Africa" },
  ]

  // Convert country code to regional indicator symbols for flag emoji
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  // Updated service categories - removed Mobile Plan and Phone, added Carbon Offset
  const serviceCategories = [
    { id: "mobile-data", name: "Mobile Data", icon: "smartphone" },
    { id: "electricity", name: "Electricity", icon: "lightbulb" },
    { id: "tv-phone-internet", name: "Internet", icon: "wifi" },
    { id: "tv-phone-internet", name: "TV Service", icon: "tv" },
    { id: "memberships", name: "Memberships", icon: "gift" },
    { id: "water", name: "Water", icon: "droplet" },
    { id: "gas", name: "Gas", icon: "flame" },
    { id: "carbon-offset", name: "Carbon Offset", icon: "leaf" },
    { id: "taxes", name: "Taxes", icon: "landmark" },
    { id: "mortgage", name: "Mortgage", icon: "home" },
    { id: "insurance", name: "Insurance", icon: "shield" },
    { id: "car-loan", name: "Car Loan", icon: "car" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 flex flex-col p-4 space-y-6">
        {/* Logo and Welcome with Avatar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-[60px] h-[60px]">
              <Image
                src="https://raw.githubusercontent.com/digimercados/Graphics/refs/heads/main/D%20of%20DigiPaya%20Fury%20logo.jpg"
                alt="Digipaga Logo"
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-800">Digipaga</h1>
              <p className="text-sm text-gray-500">Crypto-powered payments</p>
            </div>
          </div>
          <div>
            <UserAvatar />
          </div>
        </div>

        {/* MiniPay Status - Only shows when in MiniPay browser */}
        <MiniPayStatus />

        {/* Promo Banner - Adjusted text sizes */}
        <PromoBanner
          title="Pay your utility bills"
          subtitle="INSTANTLY"
          highlight="WITH CRYPTO"
          bgColor="bg-indigo-600"
          size="small"
        />

        {/* Country Selector */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <span className="mr-2 text-xl">{getFlagEmoji(selectedCountry)}</span>
                  <span>{getCountryName(selectedCountry)}</span>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
              {countries.map((country) => (
                <DropdownMenuItem
                  key={country.code}
                  onClick={() => setSelectedCountry(country.code)}
                  className="cursor-pointer"
                >
                  <span className="mr-2">{getFlagEmoji(country.code)}</span>
                  {country.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Service Categories - Updated list */}
        <div className="grid grid-cols-4 gap-2">
          {serviceCategories.map((category) => (
            <ServiceCategory
              key={`${category.id}-${category.name}`}
              id={category.id}
              name={category.name}
              icon={category.icon}
              country={selectedCountry}
            />
          ))}
        </div>

        {/* Additional space after service buttons - reduced to one line */}
        <div className="h-8"></div>

        {/* Divider with CRYPTO CONVERSION title */}
        <div className="flex items-center gap-4 py-2">
          <div className="h-px bg-gray-200 flex-1"></div>
          <h2 className="text-xl font-bold text-gray-800 uppercase">CRYPTO CONVERSION</h2>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        {/* Wallet Icon centered between title and button */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <Wallet className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        {/* CRYPTO CONVERSION Section - Just the button and content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Button - Replacing the title */}
          <Link href="/convert" className="block w-full mb-4">
            <Button
              className="w-full py-6 text-lg rounded-xl bg-yellow-300 hover:bg-yellow-400 text-indigo-700 font-bold"
              size="lg"
            >
              <span className="flex items-center justify-center">
                FIAT{" "}
                <span className="mx-2">
                  <PurpleRefreshIcon className="h-6 w-6" />
                </span>{" "}
                Crypto
              </span>
            </Button>
          </Link>

          {/* Subtitle */}
          <p className="text-sm text-gray-500 text-center mb-6">
            Swap your local currency for crypto and vice versa instantly with the lowest fee available
          </p>

          {/* Exchange Rates */}
          <ExchangeRates />
        </div>

        {/* More space before Recent Transactions */}
        <div className="h-4"></div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
            <Link href="/transactions" className="text-indigo-600 text-sm flex items-center">
              View All
              <Clock className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <RecentTransactions />
        </div>

        {/* MiniPay Browser Notice - Only shows when not in MiniPay browser */}
        <MiniPayBrowserNotice />
      </main>
    </div>
  )
}
