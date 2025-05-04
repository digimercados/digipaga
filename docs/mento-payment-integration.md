# Mento Stablecoin Payment Integration

This document provides a comprehensive guide to integrating Mento stablecoins for processing bill payments in DigiPaga, with automatic crypto-to-fiat conversion for service providers.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Installation](#installation)
4. [API Endpoints](#api-endpoints)
5. [Frontend Components](#frontend-components)
6. [Security Considerations](#security-considerations)
7. [Production Deployment](#production-deployment)
8. [Troubleshooting](#troubleshooting)

## Overview

The Mento stablecoin payment integration allows DigiPaga users to pay bills using Mento stablecoins (cUSD, cEUR, cREAL, eXOF, etc.) while service providers receive payments in their preferred fiat currency. The system handles the entire payment flow:

1. User initiates payment with Mento stablecoins via the MiniPay wallet
2. Payment is verified on the blockchain
3. Backend logs the transaction and performs crypto-to-fiat conversion
4. Fiat payment is sent to the service provider via private API
5. Transaction details are stored for user reference

This integration leverages the stability and low transaction costs of Mento stablecoins while abstracting the complexity of cryptocurrency from service providers.

## Architecture

The integration consists of the following components:

### Backend Services

- **API Routes**: Next.js API routes that handle payment processing and verification
- **Payment Service**: Library for crypto-to-fiat conversion and payment processing
- **Transaction Logging**: In-memory store (to be replaced with a database in production)

### Frontend Components

- **MentoPaymentProcessor**: React component that handles the payment flow
- **TransactionStatus**: Component that displays payment details after completion

### External Services

- **Celo Blockchain**: Used for stablecoin transactions
- **MiniPay Wallet**: User-friendly wallet for sending stablecoin payments
- **Payment Provider API**: (To be implemented) For sending fiat payments to service providers

## Installation

### Dependencies

Add the required dependencies:

```bash
npm install uuid @types/uuid
# or
yarn add uuid @types/uuid
# or
bun add uuid @types/uuid
```

### Configuration

1. **Environment Variables**:

Create or update your `.env.local` file with the following variables:

```
# Blockchain Configuration
NEXT_PUBLIC_CELO_RPC_URL=https://alfajores-forno.celo-testnet.org
NEXT_PUBLIC_DEFAULT_FEE_CURRENCY=0x765DE816845861e75A25fCA122bb6898B8B1282a

# API Configuration
PAYMENT_API_KEY=your_private_api_key
PAYMENT_API_SECRET=your_private_api_secret
PAYMENT_API_URL=https://your-payment-provider.com/api

# Security
NEXT_PUBLIC_MAX_TRANSACTION_AMOUNT=5000
```

2. **Database Setup** (for production):

Replace the in-memory storage with a proper database like PostgreSQL, MongoDB, or Supabase for production deployment.

## API Endpoints

### `/api/payments`

**POST** - Process a new payment

Request body:
```json
{
  "paymentId": "unique-uuid",
  "tokenSymbol": "cUSD",
  "amount": "10.50",
  "recipientAddress": "0x...",
  "billReference": "ACC123456",
  "serviceProvider": "Electric Company",
  "serviceType": "electricity",
  "txHash": "0x..."
}
```

Response:
```json
{
  "success": true,
  "message": "Payment processed successfully",
  "paymentId": "unique-uuid",
  "status": "completed",
  "fiatAmount": 10.50,
  "fiatCurrency": "USD"
}
```

### `/api/payments/verify`

**POST** - Verify a blockchain transaction

Request body:
```json
{
  "txHash": "0x...",
  "expectedAmount": "10.50",
  "expectedRecipient": "0x...",
  "tokenAddress": "0x..."
}
```

Response:
```json
{
  "verified": true,
  "details": {
    "receipt": { /* Transaction receipt */ },
    "actualRecipient": "0x...",
    "actualAmount": "10.50"
  }
}
```

### `/api/payments?paymentId=unique-uuid`

**GET** - Get payment status

Response:
```json
{
  "paymentId": "unique-uuid",
  "status": "completed",
  "timestamp": "2025-04-12T15:30:45.123Z"
}
```

## Frontend Components

### MentoPaymentProcessor

The `MentoPaymentProcessor` component handles:

- Connecting to the MiniPay wallet
- Sending the stablecoin transaction
- Verifying the transaction on the blockchain
- Sending payment details to the backend
- Updating the UI with the payment status

#### Props

```typescript
interface MentoPaymentProcessorProps {
  amount: string
  tokenSymbol: string
  recipientAddress: string
  billReference: string
  serviceProvider: string
  serviceType: string
  onSuccess: (paymentDetails: {
    txHash: string
    paymentId: string
    fiatAmount: number
    fiatCurrency: string
  }) => void
  onError: (error: string) => void
  onProcessing?: (status: string) => void
}
```

#### Usage

```jsx
<MentoPaymentProcessor
  recipientAddress="0x1234..."
  amount="10.50"
  tokenSymbol="cUSD"
  billReference="ACC123456"
  serviceProvider="Electric Company"
  serviceType="electricity"
  onSuccess={handlePaymentSuccess}
  onError={handlePaymentError}
  onProcessing={handleProcessingStatus}
/>
```

### TransactionStatus

The `TransactionStatus` component displays:

- Transaction status (success/failure)
- Payment details (amount, currency, service provider)
- Transaction hash with links to the blockchain explorer
- Payment ID for reference

#### Props

```typescript
interface TransactionStatusProps {
  success: boolean
  txHash: string
  tokenSymbol?: string
  paymentId?: string
  fiatAmount?: number
  fiatCurrency?: string
  billReference?: string
  serviceProvider?: string
}
```

## Security Considerations

### Preventing Replay Attacks

The system prevents replay attacks by:

1. Using unique transaction IDs (UUIDs)
2. Tracking processed transaction hashes
3. Verifying transaction details on the blockchain

### Transaction Verification

All transactions are verified on the blockchain before processing to ensure:

1. The transaction was successful
2. The correct amount was sent
3. The recipient address matches
4. The token used matches the expected token

### Rate Limiting

Implement rate limiting in production to prevent abuse:

1. Limit the number of payment requests per user/IP
2. Add Captcha for suspicious activities
3. Set maximum transaction amounts

### Server-Side Security

For production deployment:

1. Use environment variables for sensitive data
2. Implement proper authentication for API routes
3. Use HTTPS for all communications
4. Store transaction logs securely
5. Use a trusted database with encryption at rest

## Production Deployment

For production deployment, several enhancements should be made:

### Database Integration

Replace the in-memory storage with a database:

1. Create proper schemas for transactions
2. Implement database migrations
3. Add indexes for efficient querying

### Payment Provider Integration

Integrate with a payment provider API:

1. Implement webhook handlers for payment notifications
2. Add proper error handling and retry logic
3. Store payment provider responses

### Monitoring and Logging

Add monitoring and logging:

1. Set up application monitoring (New Relic, DataDog, etc.)
2. Implement structured logging
3. Create alerts for failed payments

### Scalability

Ensure the system can scale:

1. Use a serverless architecture for API routes
2. Implement caching for exchange rates
3. Use a message queue for processing payments asynchronously

## Troubleshooting

### Common Issues

1. **Transaction Failed**: Check the blockchain explorer for the transaction status
2. **Wallet Connection**: Ensure MiniPay is properly installed and connected
3. **API Errors**: Check server logs for detailed error messages

### Debugging Tools

1. **Blockchain Explorer**: Use [Celo Explorer](https://explorer.celo.org/alfajores) for testnet transactions
2. **Network Monitor**: Check the browser console for network request issues
3. **Server Logs**: Check the server logs for backend errors

### Support Channels

For additional support:

1. Discord: [Mento Protocol Discord](https://discord.gg/mento)
2. Documentation: [Mento Protocol Docs](https://docs.mento.org)
3. GitHub: [Mento Protocol GitHub](https://github.com/mento-protocol) 