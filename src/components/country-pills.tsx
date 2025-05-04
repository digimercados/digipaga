"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export function CountryPills() {
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
  ]

  const [activeCountry, setActiveCountry] = useState("MX")
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Scroll to active country pill
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector(`[data-country="${activeCountry}"]`)
      if (activeElement) {
        const containerRect = scrollContainerRef.current.getBoundingClientRect()
        const activeRect = activeElement.getBoundingClientRect()
        const offset = activeRect.left - containerRect.left - containerRect.width / 2 + activeRect.width / 2

        scrollContainerRef.current.scrollTo({
          left: scrollContainerRef.current.scrollLeft + offset,
          behavior: "smooth",
        })
      }
    }
  }, [activeCountry])

  return (
    <div className="flex overflow-x-auto py-4 scrollbar-hide snap-x snap-mandatory" ref={scrollContainerRef}>
      <div className="flex space-x-2 px-2 min-w-max">
        {countries.map((country) => (
          <button
            key={country.code}
            data-country={country.code}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors snap-start",
              activeCountry === country.code ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
            onClick={() => setActiveCountry(country.code)}
          >
            {country.name}
          </button>
        ))}
      </div>
    </div>
  )
}
