"use client"

import { Card, CardContent } from "@/components/ui/card"

interface CountrySelectorProps {
  onSelect: (countryCode: string) => void
  searchQuery?: string
  defaultCountry?: string
}

export function CountrySelector({ onSelect, searchQuery = "", defaultCountry }: CountrySelectorProps) {
  // List of supported countries with their names
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

  // If defaultCountry is provided, move it to the top of the list
  let sortedCountries = [...countries]
  if (defaultCountry) {
    sortedCountries = [
      ...countries.filter((c) => c.code === defaultCountry),
      ...countries.filter((c) => c.code !== defaultCountry),
    ]
  }

  const filteredCountries = sortedCountries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Convert country code to regional indicator symbols for flag emoji
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  return (
    <div className="space-y-3">
      {filteredCountries.map((country) => (
        <Card
          key={country.code}
          className={`border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
            defaultCountry === country.code ? "border-2 border-primary" : ""
          }`}
          onClick={() => onSelect(country.code)}
        >
          <CardContent className="p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <span className="text-xl">{getFlagEmoji(country.code)}</span>
            </div>
            <span className="font-medium">{country.name}</span>
            {defaultCountry === country.code && (
              <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Default</span>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
