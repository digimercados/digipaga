import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { MiniPayProvider } from "@/contexts/minipay-context"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Digipaga - Web3 Bill Payments",
  description: "Your all-in-one app to pay bills with crypto and fiat converter.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={outfit.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MiniPayProvider>
            {children}
            <Toaster />
          </MiniPayProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
