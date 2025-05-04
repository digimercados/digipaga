import { type WalletClient, type Hash, createWalletClient, custom, parseUnits, formatUnits, type PublicClient, createPublicClient, http } from "viem"
import { celoAlfajores } from "viem/chains"
import { STABLECOIN_CONTRACTS } from "./token-contracts"

// Default fee currency (cUSD)
export const DEFAULT_FEE_CURRENCY = STABLECOIN_CONTRACTS.cUSD.address

// Check if running in MiniPay
export function isMiniPay(): boolean {
  return !!(window.ethereum && window.ethereum.isMiniPay)
}

// Get wallet client from MiniPay
export function getMiniPayWalletClient(): WalletClient | null {
  if (!isMiniPay()) return null
  
  return createWalletClient({
    chain: celoAlfajores,
    transport: custom(window.ethereum)
  })
}

// Get public client from MiniPay
export function getMiniPayPublicClient(): PublicClient | null {
  if (!isMiniPay()) return null
  
  // Use a simpler approach with http transport
  const transport = http()
  // @ts-expect-error - Ignoring type errors because of chain incompatibility
  return createPublicClient({
    chain: celoAlfajores,
    transport
  })
}

export async function getConnectedAccount(): Promise<string | null> {
  try {
    const walletClient = getMiniPayWalletClient()
    if (!walletClient) return null

    const accounts = await walletClient.getAddresses()
    return accounts[0] || null
  } catch (error) {
    console.error("Error getting connected account:", error)
    return null
  }
}

// Create transaction with fee currency
export function createTransaction(
  to: string,
  value: bigint,
  data = "0x",
  feeCurrency: string = DEFAULT_FEE_CURRENCY,
): { to: string; value: bigint; data: string; feeCurrency: string; gas: bigint } {
  return {
    to,
    value,
    data,
    feeCurrency,
    gas: BigInt(200000), // Default gas limit
  }
}

// Send transaction with fee abstraction
export async function sendTransaction(
  to: string,
  value: bigint,
  data = "0x",
  feeCurrency: string = DEFAULT_FEE_CURRENCY,
): Promise<Hash | null> {
  try {
    const walletClient = getMiniPayWalletClient()
    if (!walletClient) throw new Error("MiniPay wallet client not available")
    
    const account = await getConnectedAccount()
    if (!account) throw new Error("No account available")

    const tx = createTransaction(to, value, data, feeCurrency)
    
    // NOTE: Celo-specific feeCurrency option
    return await walletClient.sendTransaction({
      account: account as `0x${string}`,
      to: tx.to as `0x${string}`,
      value: tx.value,
      data: tx.data as `0x${string}`, 
      gas: tx.gas,
      feeCurrency: tx.feeCurrency as `0x${string}`,
      chain: celoAlfajores
    })
  } catch (error) {
    console.error("Error sending transaction:", error)
    return null
  }
}

// ERC20 transfer function selector and encoding helper
const ERC20_TRANSFER_SELECTOR = "0xa9059cbb" // transfer(address,uint256)

function encodeTransferData(to: string, amount: bigint): string {
  // Remove 0x prefix and pad to 32 bytes
  const paddedAddress = to.slice(2).padStart(64, '0')
  const paddedAmount = amount.toString(16).padStart(64, '0')
  
  return `${ERC20_TRANSFER_SELECTOR}${paddedAddress}${paddedAmount}`
}

// Send ERC20 token
export async function sendToken(
  tokenAddress: string,
  to: string,
  amount: bigint,
  feeCurrency: string = DEFAULT_FEE_CURRENCY,
): Promise<Hash | null> {
  try {
    const walletClient = getMiniPayWalletClient()
    if (!walletClient) throw new Error("MiniPay wallet client not available")
    
    const account = await getConnectedAccount()
    if (!account) throw new Error("No account available")

    // Encode transfer function call
    const data = encodeTransferData(to, amount)
    
    // Create transaction with fee currency and send it
    return await walletClient.sendTransaction({
      account: account as `0x${string}`,
      to: tokenAddress as `0x${string}`,
      value: BigInt(0),
      data: data as `0x${string}`,
      gas: BigInt(200000),
      feeCurrency: feeCurrency as `0x${string}`,
      chain: celoAlfajores
    })
  } catch (error) {
    console.error("Error sending token:", error)
    return null
  }
}

// ERC20 balanceOf function selector and encoding helper
const ERC20_BALANCE_OF_SELECTOR = "0x70a08231" // balanceOf(address)

function encodeBalanceOfData(owner: string): string {
  // Remove 0x prefix and pad to 32 bytes
  return `${ERC20_BALANCE_OF_SELECTOR}${owner.slice(2).padStart(64, '0')}`
}

// Get token balance
export async function getTokenBalance(tokenAddress: string, address?: string): Promise<bigint | null> {
  try {
    const publicClient = getMiniPayPublicClient()
    if (!publicClient) throw new Error("MiniPay public client not available")

    const accountToCheck = address || (await getConnectedAccount())
    if (!accountToCheck) throw new Error("No account available")

    // Encode balanceOf function call
    const data = encodeBalanceOfData(accountToCheck)
    
    // Call the contract
    const result = await publicClient.call({
      to: tokenAddress,
      data
    })
    
    // Parse the hex result to a bigint
    return result.data ? BigInt(result.data as string) : BigInt(0)
  } catch (error) {
    console.error("Error getting token balance:", error)
    return null
  }
}

// Format token amount for display
export function formatTokenAmount(amount: bigint | null, decimals: number): string {
  if (amount === null) return "0"
  return formatUnits(amount, decimals)
}

// Parse token amount from user input
export function parseTokenAmount(amount: string, decimals: number): bigint {
  try {
    return parseUnits(amount, decimals)
  } catch (error) {
    console.error("Error parsing token amount:", error)
    return BigInt(0)
  }
}
