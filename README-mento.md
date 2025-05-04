# Mento Stablecoin Integration for DigiPaga

![Mento Logo](https://www.mento.org/og-image.png)

> Enabling service payments with stablecoins, with automatic crypto-to-fiat conversion

## Overview

This project integrates Mento stablecoins into DigiPaga for seamless bill payments. Users can pay with stablecoins while service providers receive fiat currency. The integration handles the complexity of blockchain transactions and conversion between crypto and fiat currencies.

## Key Features

- **Multi-Currency Support**: Pay with cUSD, cEUR, cREAL, eXOF, and other Mento stablecoins
- **Automatic Fiat Conversion**: Backend automatically converts crypto to fiat for service providers
- **Transaction Verification**: All blockchain transactions are verified before processing
- **Payment Status Tracking**: Real-time payment status updates
- **MiniPay Integration**: Seamless experience with the MiniPay wallet

## Quick Start

### Prerequisites

- Node.js 16+
- MiniPay wallet extension
- Test CELO and stablecoins for development (from [Celo Faucet](https://faucet.celo.org))

### Installation

1. Install dependencies:

```bash
# Add uuid dependency for payment tracking
npm install uuid @types/uuid
# or
yarn add uuid @types/uuid
# or
bun add uuid @types/uuid
```

2. Set up environment variables:

Create a `.env.local` file with:
```
NEXT_PUBLIC_CELO_RPC_URL=https://alfajores-forno.celo-testnet.org
NEXT_PUBLIC_DEFAULT_FEE_CURRENCY=0x765DE816845861e75A25fCA122bb6898B8B1282a
```

3. Start the development server:

```bash
npm run dev
```

## Usage

### Making Payments

1. Navigate to the payment service page
2. Select a provider and enter account/bill reference
3. Enter payment amount
4. Select the stablecoin to use for payment
5. Click "Pay Now" to process the payment
6. Approve the transaction in your MiniPay wallet
7. Wait for transaction confirmation

### Viewing Payment History

Payment details are stored and can be viewed in the transaction receipt page, showing:
- Payment amount and currency
- Service provider and account reference
- Transaction hash with blockchain explorer link
- Payment ID for reference

## Architecture

The integration consists of:

1. **Frontend Components**:
   - `MentoPaymentProcessor`: Handles payment flow and UI updates
   - `TransactionStatus`: Displays payment details after completion

2. **Backend Services**:
   - API Routes: Process payments and verify transactions
   - Payment Service: Handles conversion and payment processing

3. **External Services**:
   - Celo Blockchain: For stablecoin transactions
   - MiniPay Wallet: User-friendly wallet for payments
   - Payment Provider API: For service provider fiat payments

## Development Notes

### Testing Payments

For testing, you can obtain test tokens from the [Celo Faucet](https://faucet.celo.org). The integration is configured to work with the Celo Alfajores testnet by default.

### Adding New Stablecoins

To add support for new Mento stablecoins:

1. Add the token contract information to `src/lib/token-contracts.ts`
2. Add the fiat currency mapping in `src/app/api/payments/route.ts`
3. Update exchange rate information in `src/lib/payment-service.ts`

### Security Considerations

- Always verify transactions on the blockchain
- Use unique transaction IDs to prevent replay attacks
- Implement proper rate limiting in production
- Store sensitive data securely using environment variables

## Production Deployment

For production deployment:

1. Replace in-memory storage with a database
2. Implement proper authentication for API routes
3. Set up monitoring and logging
4. Configure webhooks for payment notifications

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build the project for production
- `npm run start`: Start production server
- `npm run lint`: Run linting

## Documentation

For detailed documentation, see the following:

- [Mento Payment Integration](./docs/mento-payment-integration.md)
- [Mento Protocol Documentation](https://docs.mento.org)
- [Celo Developer Documentation](https://docs.celo.org)

## License

MIT 