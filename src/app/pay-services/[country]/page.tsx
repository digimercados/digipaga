"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { ServiceCategory } from "@/components/service-category"
import { ChevronLeft, Search } from "lucide-react"
import { getCountryName, getServicesByCountry } from "@/lib/country-services"

// Define the type for params
interface PageParams {
  country: string;
}

export default function CountryServicePage({ params }) {
  // Unwrap the params Promise using React.use()
  const unwrappedParams = use(params) as PageParams;
  const { country } = unwrappedParams;
  
  const countryCode = country.toUpperCase()
  const countryName = getCountryName(countryCode)
  const [searchQuery, setSearchQuery] = useState("")

  // Get services for the country
  const services = getServicesByCountry(countryCode)

  // Filter services based on search query
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.providers.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Convert country code to regional indicator symbols for flag emoji
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  // Map service IDs to icons
  const serviceIcons: Record<string, string> = {
    "mobile-data": "smartphone",
    "mobile-plan": "smartphone",
    electricity: "lightbulb",
    "tv-phone-internet": "tv",
    gas: "flame",
    water: "droplet",
    transportation: "receipt",
    memberships: "gift",
    "credit-card": "receipt",
    taxes: "receipt",
    mortgage: "receipt",
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Link href="/pay-services" className="mr-4">
            <ChevronLeft className="h-6 w-6 text-primary" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Pay Services</h1>
            <div className="flex items-center">
              <span className="mr-2">{getFlagEmoji(countryCode)}</span>
              <p className="text-sm text-gray-500">{countryName}</p>
            </div>
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search services or providers"
              className="pl-10 rounded-xl border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {filteredServices.slice(0, 9).map((service) => (
            <ServiceCategory
              key={service.id}
              id={service.id}
              name={service.name}
              icon={serviceIcons[service.id] || "receipt"}
              country={countryCode}
            />
          ))}
          {filteredServices.length > 9 && <ServiceCategory id="more" name="More" icon="more" country={countryCode} />}
        </div>

        {searchQuery && filteredServices.length === 0 && (
          <div className="text-center p-8">
            <p className="text-gray-500">No services found matching &quot;{searchQuery}&quot;</p>
          </div>
        )}
      </main>
    </div>
  )
}
