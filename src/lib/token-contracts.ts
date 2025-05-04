// Celo Network Stablecoin Smart Contract Addresses

export interface TokenContract {
  name: string
  symbol: string
  address: string
  decimals: number
  isActive: boolean
  logo?: string
}

export const STABLECOIN_CONTRACTS: Record<string, TokenContract> = {
  cUSD: {
    name: "Celo Dollar",
    symbol: "cUSD",
    address: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
    decimals: 18,
    isActive: true,
    logo: "💵",
  },
  USDT: {
    name: "Tether USD",
    symbol: "USDT",
    address: "0x617f3112bf5397D0467D315cC709EF968D9ba546",
    decimals: 6,
    isActive: true,
    logo: "🔷",
  },
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
    decimals: 6,
    isActive: false,
    logo: "🔵",
  },
  cEUR: {
    name: "Celo Euro",
    symbol: "cEUR",
    address: "0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73",
    decimals: 18,
    isActive: false,
    logo: "💶",
  },
  cREAL: {
    name: "Celo Real",
    symbol: "cREAL",
    address: "0xe8537a3d056da446677b9e9d6c5db704eaab4787",
    decimals: 18,
    isActive: false,
    logo: "💱",
  },
  XOF: {
    name: "CFA Franc BCEAO",
    symbol: "XOF",
    address: "0x73F93dcc49cB8A239e2032663e9475dd5ef29A08",
    decimals: 18,
    isActive: false,
    logo: "💰",
  },
  KES: {
    name: "Kenyan Shilling",
    symbol: "KES",
    address: "0x456a3D042C0DbD3db53D5489e98dFb038553B0d0",
    decimals: 18,
    isActive: false,
    logo: "💰",
  },
  PHP: {
    name: "Philippine Peso",
    symbol: "PHP",
    address: "0x105d4A9306D2E55a71d2Eb95B81553AE1dC20d7B",
    decimals: 18,
    isActive: false,
    logo: "💰",
  },
  COP: {
    name: "Colombian Peso",
    symbol: "COP",
    address: "0x8a567e2ae79ca692bd748ab832081c45de4041ea",
    decimals: 18,
    isActive: false,
    logo: "💰",
  },
  GHS: {
    name: "Ghanaian Cedi",
    symbol: "GHS",
    address: "0xfAeA5F3404bbA20D3cc2f8C4B0A888F55a3c7313",
    decimals: 18,
    isActive: false,
    logo: "💰",
  },
  GBP: {
    name: "British Pound",
    symbol: "GBP",
    address: "0xCCF663b1fF11028f0b19058d0f7B674004a40746",
    decimals: 18,
    isActive: false,
    logo: "💷",
  },
  ZAR: {
    name: "South African Rand",
    symbol: "ZAR",
    address: "0x4c35853A3B4e647fD266f4de678dCc8fEC410BF6",
    decimals: 18,
    isActive: false,
    logo: "💰",
  },
  "ZAR-ALT": {
    name: "South African Rand (alt)",
    symbol: "ZAR",
    address: "0xff4Ab19391af240c311c54200a492233052B6325",
    decimals: 18,
    isActive: false,
    logo: "💰",
  },
  AUD: {
    name: "Australian Dollar",
    symbol: "AUD",
    address: "0x7175504C455076F15c04A2F90a8e352281F492F9",
    decimals: 18,
    isActive: false,
    logo: "💰",
  },
}

// Helper function to get active stablecoins
export function getActiveStablecoins(): TokenContract[] {
  return Object.values(STABLECOIN_CONTRACTS).filter((token) => token.isActive)
}

// Helper function to get all stablecoins
export function getAllStablecoins(): TokenContract[] {
  return Object.values(STABLECOIN_CONTRACTS)
}

// Helper function to get stablecoin by symbol
export function getStablecoinBySymbol(symbol: string): TokenContract | undefined {
  return STABLECOIN_CONTRACTS[symbol]
}

// Helper function to get stablecoin by address
export function getStablecoinByAddress(address: string): TokenContract | undefined {
  return Object.values(STABLECOIN_CONTRACTS).find((token) => token.address.toLowerCase() === address.toLowerCase())
}
