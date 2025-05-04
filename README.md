# DigiPaga ― Pay Utility Bills with Crypto

<div align="center">
  
  ![DigiPaga Logo](https://via.placeholder.com/200x200.png?text=DigiPaga)
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Celo](https://img.shields.io/badge/Celo-FCFF52?style=flat&logo=celo&logoColor=000000)](https://celo.org/)
  [![Global Stablecoin Hackathon](https://img.shields.io/badge/Hackathon-May_2025-blue)](https://mentolabs.notion.site/Global-Stablecoin-Hackathon-1c1a2148cc5c808aa42ddee1e3df7883)

  ### **Making crypto useful for everyday essentials** 💡
  
  *Pay electricity, water, internet & more with stablecoins on Celo*
</div>

## 🌟 What is DigiPaga?

DigiPaga lets users pay real-world utility bills directly with crypto, specifically stablecoins on the Celo network. It acts as a Web3 BillPay solution, aiming to make crypto practical for everyday financial needs, especially in emerging markets.

**Problem**: Millions lack access to reliable tools for paying essential services with crypto or easily converting between fiat and digital assets. High fees, delays, and lack of infrastructure create barriers.

**Solution**: A mobile-first app enabling instant, secure utility payments using Celo stablecoins. DigiPaga aims to bridge the gap between crypto and essential services, promoting financial freedom and real-world adoption.

## 💫 Key Features (Planned)

| Feature | Description |
|---------|-------------|
| 🧾 **Utility Payments** | Pay electricity, water, internet, mobile top-ups, etc. |
| 💰 **Stablecoin Powered** | Utilizes cUSD, cEUR, and other Mento stablecoins on Celo |
| 🌍 **Hispanic Focus** | Initial rollout targeting Mexico & Colombia, expanding across LatAm |
| 🔄 **On/Off Ramp** | Integrated fiat-crypto conversion (Future Scope) |
| 📱 **Mobile First** | Designed for easy access on smartphones |

## 🏗️ How It Works (Utility Payment Flow)

<div align="center">
  
```
┌───────────┐     ┌──────────────┐     ┌───────────────┐     ┌───────────────┐
│           │     │              │     │ Utility Bill  │     │ Utility       │
│ User App  │────▶│ DigiPaga UI  │────▶│ Payment       │────▶│ Provider      │
│ (Mobile)  │     │ (Next.js)    │     │ Contract      │     │ (via API/Agg.)│
│           │     │              │     │ (Celo)        │     │               │
└───────────┘     └──────────────┘     └───────────────┘     └───────────────┘
                         │                   ▲
                         │                   │ Stablecoin
                         ▼                   │ Transfer
                  ┌──────────────┐     ┌───────────────┐
                  │ User Wallet  │────▶│ Fee Contract? │
                  │ (e.g. MiniPay)│     │ (Optional)    │
                  └──────────────┘     └───────────────┘
```

</div>

1. **Select Bill** ― User chooses utility provider and enters account details.
2. **Confirm Payment** ― App shows amount due in stablecoin, user approves.
3. **Pay via Contract** ― Funds are sent to the DigiPaga smart contract on Celo.
4. **Settle Bill** ― Contract interacts with utility aggregator/API to pay the bill.

## 🧰 Tech Stack

<div align="center">
  
| Frontend | Web3 | Contracts | Platform |
|:--------:|:----:|:---------:|:--------:|
| Next.js 14 | Wagmi | Solidity | Celo |
| TypeScript | Viem | Foundry | MiniPay |
| Tailwind CSS | | | Bun |

</div>

## 🚀 Getting Started

### Prerequisites

You'll need:
- [Bun](https://bun.sh/docs/installation) (v1.0+)
- [Git](https://git-scm.com/)
- [Foundry](https://book.getfoundry.sh/getting-started/installation)

### Quick Setup

```bash
# Clone the repo with submodules
git clone --recurse-submodules https://github.com/ReFi-Starter/digipaga.git
cd digipaga

# Install dependencies
bun install

# Compile contracts (if needed, initially empty)
# cd contracts && forge build && cd ..

# Generate contract hooks (will be empty initially)
# bunx wagmi generate

# Start development server
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

*(Note: Contract compilation and Wagmi generation steps are placeholders until contracts are developed)*

## 📝 Project Status

Current milestone: **Initial Project & Repository Setup** (April-May 2025)
- ✅ Frontend (`digipaga`) and Contracts (`digipaga-contracts`) repos created.
- ✅ Frontend bootstrapped with Next.js & Bun.
- ✅ Contracts repo scaffolded with Foundry.
- ✅ Contracts integrated as git submodule.
- 🔜 Define core contract logic & interfaces.
- 🔜 Set up Wagmi CLI.
- 🔜 Build initial UI components.

[View detailed progress →](./docs/milestones/001-project-setup.md)

## 👥 Team

- **digipaga.eth** - Project Lead
- **ozkite.eth** - Smart Contract Developer
- **0xb343...9753e1** - Frontend Developer

## 🔗 Links

- [Demo Video](https://example.com) (Coming soon)
- [Pitch Deck](https://example.com) (Coming soon)
- [KarmaGAP Profile](https://gap.karmahq.xyz/project/digipagaeth)

---

<div align="center">
  
  *Built for the [Global Stablecoin Hackathon](https://mentolabs.notion.site/Global-Stablecoin-Hackathon-1c1a2148cc5c808aa42ddee1e3df7883) (May 2025)*
  
  **ReFi Starter** | [GitHub](https://github.com/ReFi-Starter) | [Website](https://example.com)
</div>
