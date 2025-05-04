/**
 * Payment Service - Handles payment processing and crypto-to-fiat conversions
 * This service would typically interact with your private payment APIs to facilitate
 * the actual fiat payments to service providers after a crypto payment is received.
 */

import { getStablecoinBySymbol } from '@/lib/token-contracts';

// Exchange rate cache with TTL mechanism
// In production, use Redis or another shared cache
interface ExchangeRateCache {
  [pair: string]: {
    rate: number;
    timestamp: number;
    ttl: number;
  };
}

// Memory cache for development - replace with persistent storage in production
const exchangeRates: ExchangeRateCache = {};
const RATE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Represents a payment transaction with all required details
 */
export interface PaymentTransaction {
  id: string;
  txHash: string;
  userAddress: string;
  tokenSymbol: string;
  tokenAmount: string;
  recipientAddress: string;
  fiatCurrency: string;
  fiatAmount: number;
  billReference: string;
  serviceProvider: string;
  serviceType: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  timestamp: string;
  error?: string;
}

/**
 * Verification result details
 */
export interface VerificationDetails {
  receipt?: Record<string, unknown>;
  actualRecipient?: string;
  actualAmount?: string;
  verified?: boolean;
  [key: string]: unknown;
}

/**
 * Fetches the current exchange rate for a crypto-fiat pair
 * In production, this would query an exchange API or oracle
 */
export async function getExchangeRate(cryptoCurrency: string, fiatCurrency: string): Promise<number> {
  const pair = `${cryptoCurrency}/${fiatCurrency}`;
  const cachedRate = exchangeRates[pair];
  
  // Check if we have a valid cached rate
  if (cachedRate && (Date.now() - cachedRate.timestamp) < cachedRate.ttl) {
    return cachedRate.rate;
  }
  
  try {
    // In production, fetch from an exchange rate API
    // For now, we'll use fixed rates for common Mento stablecoins
    let rate = 1.0; // Default 1:1 for stablecoins
    
    // Example rates - in production, fetch from external API
    if (cryptoCurrency === 'cUSD' && fiatCurrency === 'USD') rate = 1.0;
    else if (cryptoCurrency === 'cEUR' && fiatCurrency === 'EUR') rate = 1.0;
    else if (cryptoCurrency === 'cREAL' && fiatCurrency === 'BRL') rate = 1.0;
    else if (cryptoCurrency === 'eXOF' && fiatCurrency === 'XOF') rate = 1.0;
    else if (cryptoCurrency === 'cKES' && fiatCurrency === 'KES') rate = 1.0;
    else if (cryptoCurrency === 'PUSO' && fiatCurrency === 'PHP') rate = 1.0;
    else if (cryptoCurrency === 'cCOP' && fiatCurrency === 'COP') rate = 1.0;
    else {
      console.warn(`Exchange rate not predefined for ${pair}, using default 1:1 rate`);
    }
    
    // Update cache
    exchangeRates[pair] = {
      rate,
      timestamp: Date.now(),
      ttl: RATE_TTL
    };
    
    return rate;
  } catch (error) {
    console.error(`Failed to fetch exchange rate for ${pair}:`, error);
    
    // If we have an expired cached rate, use it as fallback
    if (cachedRate) {
      console.warn(`Using expired exchange rate for ${pair}`);
      return cachedRate.rate;
    }
    
    // Default to 1:1 if no rate is available
    return 1.0;
  }
}

/**
 * Converts a crypto amount to its fiat equivalent
 */
export async function convertCryptoToFiat(
  tokenSymbol: string,
  amount: string,
  fiatCurrency: string
): Promise<number> {
  const token = getStablecoinBySymbol(tokenSymbol);
  if (!token) {
    throw new Error(`Token ${tokenSymbol} not supported`);
  }
  
  // Get current exchange rate
  const rate = await getExchangeRate(tokenSymbol, fiatCurrency);
  
  // Convert amount to decimal 
  // In a real implementation, properly handle token decimals
  const decimalAmount = parseFloat(amount);
  
  // Convert to fiat
  return decimalAmount * rate;
}

/**
 * Processes a payment to a service provider
 * In production, this would integrate with your payment provider APIs
 */
export async function processProviderPayment(
  payment: PaymentTransaction
): Promise<{ success: boolean; reference?: string; error?: string }> {
  try {
    // Verify the payment details
    if (!payment.fiatAmount || !payment.fiatCurrency || !payment.billReference) {
      throw new Error('Invalid payment details');
    }
    
    // In a real implementation, you would:
    // 1. Call your payment provider's API to initiate the fiat payment
    // 2. Record the payment in your database
    // 3. Return the payment reference or transaction ID
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate a mock payment reference
    const paymentReference = `FIAT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    console.log(`Processed fiat payment for ${payment.fiatCurrency} ${payment.fiatAmount} to ${payment.serviceProvider} for bill ${payment.billReference}`);
    
    return {
      success: true,
      reference: paymentReference
    };
  } catch (error) {
    console.error('Error processing provider payment:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Verifies a transaction by calling the verify API
 */
export async function verifyTransaction(
  txHash: string,
  expectedAmount?: string,
  expectedRecipient?: string,
  tokenAddress?: string
): Promise<{ verified: boolean; details?: VerificationDetails; error?: string }> {
  try {
    const response = await fetch('/api/payments/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        txHash,
        expectedAmount,
        expectedRecipient,
        tokenAddress
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Transaction verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Transaction verification error:', error);
    return {
      verified: false,
      error: error.message
    };
  }
}

/**
 * Records a payment transaction in the database
 * In production, use a database instead of in-memory storage
 */
const transactionStore: Record<string, PaymentTransaction> = {};

/**
 * Saves a payment transaction to storage
 */
export function saveTransaction(transaction: PaymentTransaction): void {
  transactionStore[transaction.id] = transaction;
}

/**
 * Gets a payment transaction from storage
 */
export function getTransaction(id: string): PaymentTransaction | null {
  return transactionStore[id] || null;
}

/**
 * Updates a payment transaction in storage
 */
export function updateTransaction(
  id: string, 
  updates: Partial<PaymentTransaction>
): PaymentTransaction | null {
  const transaction = transactionStore[id];
  if (!transaction) return null;
  
  const updated = { ...transaction, ...updates };
  transactionStore[id] = updated;
  return updated;
} 