import Link from "next/link"
import {
  Smartphone,
  Lightbulb,
  Wifi,
  Tv,
  GiftIcon as GiftCard,
  Droplet,
  Flame,
  Phone,
  PhoneCall,
  Receipt,
  MoreHorizontal,
  Landmark,
  Home,
  Shield,
  Car,
  Leaf,
  type LucideIcon,
} from "lucide-react"

interface ServiceCategoryProps {
  id: string
  name: string
  icon: string
  country: string
  isActive?: boolean
}

export function ServiceCategory({ id, name, icon, country, isActive = false }: ServiceCategoryProps) {
  // Map icon string to Lucide icon component
  const getIcon = (): LucideIcon => {
    switch (icon) {
      case "smartphone":
        return Smartphone
      case "lightbulb":
        return Lightbulb
      case "wifi":
        return Wifi
      case "tv":
        return Tv
      case "gift":
        return GiftCard
      case "droplet":
        return Droplet
      case "flame":
        return Flame
      case "phone":
        return Phone
      case "phone-call":
        return PhoneCall
      case "receipt":
        return Receipt
      case "landmark":
        return Landmark
      case "home":
        return Home
      case "shield":
        return Shield
      case "car":
        return Car
      case "leaf":
        return Leaf
      case "more":
        return MoreHorizontal
      default:
        return Smartphone
    }
  }

  const IconComponent = getIcon()

  return (
    <Link href={`/pay-services/${country.toLowerCase()}/${id}`}>
      <div
        className={`flex flex-col items-center p-2 rounded-lg ${
          isActive ? "bg-indigo-100" : "bg-white hover:bg-gray-50"
        } transition-colors shadow-sm`}
      >
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mb-1">
          <IconComponent className="h-5 w-5 text-indigo-600" />
        </div>
        <span className="text-xs text-center font-medium">{name}</span>
      </div>
    </Link>
  )
}
