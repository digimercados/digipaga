import type { ReactNode } from "react"

interface PromoBannerProps {
  title: ReactNode
  subtitle: ReactNode
  highlight?: ReactNode
  bgColor?: string
  size?: "small" | "large"
}

export function PromoBanner({ title, subtitle, highlight, bgColor = "bg-indigo-600", size = "large" }: PromoBannerProps) {
  return (
    <div className={`rounded-xl overflow-hidden shadow-md ${bgColor}`}>
      <div className={`${size === "small" ? "p-3" : "p-6"} text-center relative`}>
        <div className="absolute top-0 right-0 left-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />

        <div className="relative z-10">
          <h2 className={`${size === "small" ? "text-lg" : "text-3xl"} font-bold mb-1 text-white`}>{title}</h2>
          <p className={`${size === "small" ? "text-lg" : "text-4xl"} font-black mb-1 text-white`}>{subtitle}</p>
          {highlight && (
            <div
              className={`${size === "small" ? "text-xl" : "text-3xl"} font-bold text-yellow-300 flex items-center justify-center`}
            >
              <span className="mr-2">🪙</span>
              {highlight}
              <span className="ml-2">🪙</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
