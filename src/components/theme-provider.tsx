'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

// Define the props type based on the NextThemesProvider component
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

// Dynamically import ThemeProvider with SSR disabled to prevent hydration mismatches
const DynamicThemeProvider = dynamic(
  () => import('next-themes').then((mod) => mod.ThemeProvider),
  { ssr: false }
)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <DynamicThemeProvider {...props}>{children}</DynamicThemeProvider>
}
