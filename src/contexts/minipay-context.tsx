"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import { isMiniPay, getMiniPayWalletClient, getMiniPayPublicClient, getConnectedAccount, getTokenBalance } from "@/lib/minipay"
import { STABLECOIN_CONTRACTS } from "@/lib/token-contracts"
import { type WalletClient, type PublicClient } from "viem"

// Add the ethereum property to the Window interface
declare global {
  interface Window {
    ethereum?: {
      isMiniPay?: boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request: (args: { method: string; params?: any[] }) => Promise<unknown>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeAllListeners: (event: string) => void;
    }
  }
}

interface MiniPayContextType {
  isConnected: boolean
  account: string | null
  provider: PublicClient | null
  walletClient: WalletClient | null
  isMiniPayBrowser: boolean
  tokenBalances: Record<string, bigint>
  refreshBalances: () => Promise<void>
}

const MiniPayContext = createContext<MiniPayContextType>({
  isConnected: false,
  account: null,
  provider: null,
  walletClient: null,
  isMiniPayBrowser: false,
  tokenBalances: {},
  refreshBalances: async () => {},
})

export const useMiniPay = () => useContext(MiniPayContext)

interface MiniPayProviderProps {
  children: ReactNode
}

export function MiniPayProvider({ children }: MiniPayProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [provider, setProvider] = useState<PublicClient | null>(null)
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null)
  const [isMiniPayBrowser, setIsMiniPayBrowser] = useState(false)
  const [tokenBalances, setTokenBalances] = useState<Record<string, bigint>>({})

  const refreshTokenBalances = useCallback(async (currentAccount?: string | null) => {
    const accountToUse = currentAccount || account

    if (!accountToUse) return

    const balances: Record<string, bigint> = {}

    // Get balances for active stablecoins
    for (const [symbol, token] of Object.entries(STABLECOIN_CONTRACTS)) {
      if (token.isActive) {
        try {
          const balance = await getTokenBalance(token.address, accountToUse)
          if (balance !== null) {
            balances[symbol] = balance
          }
        } catch (error) {
          console.error(`Error getting ${symbol} balance:`, error)
        }
      }
    }

    setTokenBalances(balances)
  }, [account])

  useEffect(() => {
    const init = async () => {
      // Check if running in MiniPay browser
      const miniPayDetected = isMiniPay()
      setIsMiniPayBrowser(miniPayDetected)

      if (miniPayDetected && window.ethereum) {
        // Get provider and wallet client
        const publicClient = getMiniPayPublicClient()
        const client = getMiniPayWalletClient()
        
        setProvider(publicClient)
        setWalletClient(client)

        try {
          // Request accounts access
          if (client) {
            await window.ethereum.request({ method: "eth_requestAccounts" })
            
            // Get connected account
            const connectedAccount = await getConnectedAccount()

            if (connectedAccount) {
              setAccount(connectedAccount)
              setIsConnected(true)

              // Refresh balances
              await refreshTokenBalances(connectedAccount)
            }
          }
        } catch (error) {
          console.error("Error connecting to MiniPay:", error)
        }
      }
    }

    init()

    // Setup account change listener
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsConnected(true)
          refreshTokenBalances(accounts[0])
        } else {
          setAccount(null)
          setIsConnected(false)
        }
      })
    }

    return () => {
      // Clean up listeners
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged")
      }
    }
  }, [refreshTokenBalances])

  return (
    <MiniPayContext.Provider
      value={{
        isConnected,
        account,
        provider,
        walletClient,
        isMiniPayBrowser,
        tokenBalances,
        refreshBalances: async () => refreshTokenBalances(),
      }}
    >
      {children}
    </MiniPayContext.Provider>
  )
}
