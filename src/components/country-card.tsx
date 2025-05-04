import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface CountryCardProps {
  country: {
    code: string
    name: string
  }
}

export function CountryCard({ country }: CountryCardProps) {
  // Convert country code to regional indicator symbols for flag emoji
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  return (
    <Link href={`/pay-services/${country.code.toLowerCase()}`}>
      <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
            <span className="text-xl">{getFlagEmoji(country.code)}</span>
          </div>
          <span className="font-medium text-lg">{country.name}</span>
        </CardContent>
      </Card>
    </Link>
  )
}
