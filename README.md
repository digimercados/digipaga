# DigiPaga — Pay Utility Bills with Mento Stablecoins

<div align="center">
  
  <!-- ![DigiPaga Logo](https://raw.githubusercontent.com/mento-protocol/reserve-site/main/public/images/logo.svg) -->
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Celo](https://img.shields.io/badge/Celo-FCFF52?style=flat&logo=celo&logoColor=000000)](https://celo.org/)
  [![Mento](https://img.shields.io/badge/Mento-Stablecoins-blue)](https://www.mento.org/)
  [![Global Stablecoin Hackathon](https://img.shields.io/badge/Hackathon-May_2025-blue)](https://mentolabs.notion.site/Global-Stablecoin-Hackathon-1c1a2148cc5c808aa42ddee1e3df7883)

  ### **Making crypto useful for everyday essentials** 💡
  
  *Pay electricity, water, internet & more with stablecoins on Celo*
</div>

## 📋 Table of Contents

- [DigiPaga — Pay Utility Bills with Mento Stablecoins](#digipaga--pay-utility-bills-with-mento-stablecoins)
    - [**Making crypto useful for everyday essentials** 💡](#making-crypto-useful-for-everyday-essentials-)
  - [📋 Table of Contents](#-table-of-contents)
  - [🌟 Overview](#-overview)
  - [🔍 The Problem \& Solution](#-the-problem--solution)
  - [💫 Key Features](#-key-features)
  - [🏗️ System Architecture](#️-system-architecture)
  - [📊 Payment Flow](#-payment-flow)
  - [🧰 Tech Stack](#-tech-stack)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Quick Setup](#quick-setup)
  - [🔒 Security Architecture](#-security-architecture)
  - [📝 Project Status](#-project-status)
  - [👥 Team](#-team)
  - [📚 Documentation](#-documentation)
  - [🔗 Links](#-links)

## 🌟 Overview

DigiPaga bridges the gap between crypto and everyday utility payments. Our platform allows users to pay real-world bills directly with Mento stablecoins on the Celo network, providing a seamless experience between digital currency and essential services.

**Demo Video:** [Watch how DigiPaga works](https://drive.google.com/file/d/1EBRKIy38aabT9Ov2uxNkunGZn6CeLA2h/view?usp=drivesdk) *(Stablecoin Mento Celo MiniPay Hackathon)*

## 🔍 The Problem & Solution

**Problem:** Millions lack access to reliable tools for paying essential services with crypto. In emerging markets, high fees, delays, and infrastructure gaps create significant barriers between digital assets and real-world utilities.

**Solution:** DigiPaga provides a mobile-first platform enabling instant, secure utility payments using Mento stablecoins. Our integration handles the complexity of blockchain transactions and automatically converts crypto to fiat for service providers, enabling:

- **For Users:** Pay bills anytime with low fees using stablecoins
- **For Providers:** Receive payments in local currency without blockchain knowledge

## 💫 Key Features

| Feature | Description |
|---------|-------------|
| 🧾 **Multi-Currency Support** | Pay with cUSD, cEUR, cREAL, eXOF, and other Mento stablecoins |
| 💱 **Automatic Fiat Conversion** | Backend converts crypto to fiat for service providers |
| 🔍 **Transaction Verification** | On-chain verification with transparent tracking |
| 🌎 **Multi-Country Support** | Initial focus on Mexico & Colombia, expanding across LatAm |
| 📱 **MiniPay Integration** | Seamless experience with the MiniPay wallet |
| 🔄 **Status Tracking** | Real-time payment status updates |

## 🏗️ System Architecture

```
┌───────────────────┐     ┌──────────────────┐     ┌───────────────────┐
│    Client Side    │     │   Backend Layer   │     │ External Services │
├───────────────────┤     ├──────────────────┤     ├───────────────────┤
│  ┌─────────────┐  │     │  ┌────────────┐  │     │  ┌─────────────┐  │
│  │  Next.js UI │──┼─────┼─▶│ API Routes │  │     │  │   Payment   │  │
│  └─────────────┘  │     │  └────────────┘  │     │  │  Providers  │  │
│  ┌─────────────┐  │     │  ┌────────────┐  │     │  └─────────────┘  │
│  │  MiniPay    │◀─┼─────┼─▶│  Payment   │  │     │  ┌─────────────┐  │
│  │   Wallet    │  │     │  │  Service   │◀─┼─────┼─▶│    Celo     │  │
│  └─────────────┘  │     │  └────────────┘  │     │  │ Blockchain  │  │
└───────────────────┘     └──────────────────┘     └───────────────────┘
```

## 📊 Payment Flow

```
┌─────────┐    ┌──────────┐    ┌─────────────┐    ┌──────────────┐
│  User   │───▶│ DigiPaga │───▶│   MiniPay   │───▶│    Celo      │
│         │    │          │    │   Wallet    │    │  Blockchain   │
└─────────┘    └──────────┘    └─────────────┘    └──────────────┘
     │              │                 │                   │
     │              │                 │                   │
     │              │                 │            Verify │
     │              │          Send   │          Transaction
     │              │      Transaction│                   │
     │              │                 │                   │
     │         Show │                 │                   │
     │       Status │                 │                   │
     │              │                 │                   │
     ▼              ▼                 ▼                   ▼
```

## 🧰 Tech Stack

| Frontend | Backend | Blockchain | Integration |
|:--------:|:-------:|:----------:|:-----------:|
| Next.js 15 | API Routes | Celo Network | Payment APIs |
| React 19 | Payment Service | Mento Stablecoins | Provider APIs |
| TypeScript | Verification API | MiniPay Wallet | Status APIs |
| TailwindCSS | Transaction Logger | Smart Contracts | Analytics |
| Shadcn UI | | | |
| Wagmi/Viem | | | |

## 🚀 Getting Started

### Prerequisites

You'll need:
- [Bun](https://bun.sh/docs/installation) (v1.0+)
- [Git](https://git-scm.com/)
- [MiniPay wallet](https://minipay.celo.co/) for transactions
- Test CELO and stablecoins from [Celo Faucet](https://faucet.celo.org)

### Quick Setup

```bash
# Clone the repo with submodules
git clone --recurse-submodules https://github.com/digimercados/digipaga.git
cd digipaga

# Install dependencies
bun install

# Install additional dependencies for Mento integration
bun add uuid @types/uuid

# Set up environment variables
echo "NEXT_PUBLIC_CELO_RPC_URL=https://alfajores-forno.celo-testnet.org
NEXT_PUBLIC_DEFAULT_FEE_CURRENCY=0x765DE816845861e75A25fCA122bb6898B8B1282a" > .env.local

# Start development server
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Security Architecture

```
┌─────────────────────┐
│   Authentication    │
├─────────────────────┤
│ - Wallet Auth      │
│ - API Protection   │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│ Transaction Security│
├─────────────────────┤
│ - Payment IDs      │
│ - Verification     │
│ - Validation       │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│  Data Protection    │
├─────────────────────┤
│ - Env Variables    │
│ - Secure Storage   │
│ - HTTPS            │
└─────────────────────┘
```

## 📝 Project Status

Current milestone: **Mento Stablecoin Integration** (May 2025)
- ✅ Frontend UI for service selection and payment
- ✅ MiniPay wallet integration
- ✅ Mento stablecoin payment processing
- ✅ Transaction verification and logging
- ✅ Payment receipt generation
- 🔜 Service provider API integration
- 🔜 Multi-country expansion
- 🔜 Payment history and analytics

## 👥 Team

- **digipaga.eth** - Project Lead
- **ottox.eth** - Blockchain and Smart Contract Developer
- **ozkite.eth** - Frontend Developer and Product

## 📚 Documentation

- [Mento Payment Integration](./docs/mento-payment-integration.md) - Detailed technical documentation
- [API Reference](./docs/api-reference.md) - API endpoints and usage
- [Stablecoin Integration Guide](README-mento.md) - Guide for developers

## 🔗 Links

- [Demo Video](https://drive.google.com/file/d/1EBRKIy38aabT9Ov2uxNkunGZn6CeLA2h/view?usp=drivesdk) (Stablecoin Mento Celo MiniPay Hackathon)
- [Pitch Deck](https://docs.google.com/presentation/d/1N8hZBFzToFdz2P6cBeOaKRubEp4MIh6XRI-McPTWDK8/edit?usp=sharing)
- [KarmaGAP Profile](https://gap.karmahq.xyz/project/digipagaeth)
- [Mento Protocol](https://www.mento.org/)
- [Celo Platform](https://celo.org/)

---

<div align="center">
  
  *Built for the [Global Stablecoin Hackathon](https://mentolabs.notion.site/Global-Stablecoin-Hackathon-1c1a2148cc5c808aa42ddee1e3df7883) (May 2025)*
  
  **DigiPaga** | [GitHub](https://github.com/digimercados/Digipaga) | [Website](https://digipaga.com)
</div>
