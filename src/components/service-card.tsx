import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  Smartphone,
  Phone,
  Zap,
  Tv,
  Flame,
  Droplet,
  Car,
  CreditCard,
  Landmark,
  Home,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react"

interface ServiceCardProps {
  id: string
  name: string
  providers: string
  icon: string
  country: string
}

export function ServiceCard({ id, name, providers, icon, country }: ServiceCardProps) {
  // Map icon string to Lucide icon component
  const getIcon = (): LucideIcon => {
    switch (icon) {
      case "smartphone":
        return Smartphone
      case "phone":
        return Phone
      case "zap":
        return Zap
      case "tv":
        return Tv
      case "flame":
        return Flame
      case "droplet":
        return Droplet
      case "car":
        return Car
      case "credit-card":
        return CreditCard
      case "landmark":
        return Landmark
      case "home":
        return Home
      case "more-horizontal":
        return MoreHorizontal
      default:
        return CreditCard
    }
  }

  const IconComponent = getIcon()

  return (
    <Link href={`/pay-services/${country.toLowerCase()}/${id}`}>
      <Card className="hover:shadow-md transition-shadow border-none shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-primary uppercase">{name}</h3>
            <div className="bg-primary/10 p-3 rounded-full">
              <IconComponent className="h-5 w-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-secondary">Providers: {providers}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
